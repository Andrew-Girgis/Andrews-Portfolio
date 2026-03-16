#!/usr/bin/env node
/**
 * Automated project discovery script.
 * Fetches public repos from GitHub, uses OpenAI to generate project metadata,
 * and updates src/data/projects.ts with new entries.
 *
 * Required env vars:
 *   GITHUB_TOKEN   — GitHub personal access token (or Actions-provided token)
 *   OPENAI_API_KEY — OpenAI API key for generating descriptions/tags
 *
 * Usage:
 *   node scripts/update-projects.mjs
 *   node scripts/update-projects.mjs --dry-run   (preview without writing)
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PROJECTS_FILE = path.join(ROOT, "src", "data", "projects.ts");
const GITHUB_USER = "Andrew-Girgis";
const DRY_RUN = process.argv.includes("--dry-run");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error("Missing OPENAI_API_KEY");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// GitHub helpers
// ---------------------------------------------------------------------------

const ghHeaders = {
  Accept: "application/vnd.github.v3+json",
  "User-Agent": "portfolio-updater",
  ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
};

async function fetchGitHubRepos() {
  const repos = [];
  let page = 1;
  while (true) {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&page=${page}&sort=updated`,
      { headers: ghHeaders }
    );
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    const data = await res.json();
    if (data.length === 0) break;
    repos.push(...data);
    page++;
  }
  return repos;
}

async function fetchReadme(repo) {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USER}/${repo}/readme`,
      { headers: { ...ghHeaders, Accept: "application/vnd.github.v3.raw" } }
    );
    if (!res.ok) return null;
    const text = await res.text();
    // Truncate to ~3000 chars to save tokens
    return text.slice(0, 3000);
  } catch {
    return null;
  }
}

async function fetchLanguages(repo) {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_USER}/${repo}/languages`,
    { headers: ghHeaders }
  );
  if (!res.ok) return {};
  return res.json();
}

async function fetchLastCodeCommitDate(repo) {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_USER}/${repo}/commits?per_page=10`,
    { headers: ghHeaders }
  );
  if (!res.ok) return null;
  const commits = await res.json();

  for (const commit of commits) {
    const detailRes = await fetch(commit.url, { headers: ghHeaders });
    if (!detailRes.ok) continue;
    const detail = await detailRes.json();
    const hasCode = detail.files?.some(
      (f) => !f.filename.endsWith(".md") && !f.filename.endsWith(".txt")
    );
    if (hasCode) return commit.commit.committer.date;
  }
  return commits[0]?.commit?.committer?.date ?? null;
}

// ---------------------------------------------------------------------------
// OpenAI helper
// ---------------------------------------------------------------------------

async function generateProjectMetadata(repo, readme, languages) {
  const languageList = Object.keys(languages).join(", ");
  const topicsList = (repo.topics || []).join(", ");

  const prompt = `You are helping maintain a portfolio website for a Data Scientist & Economist.
Given the following GitHub repository information, generate structured metadata for a project card.

Repository: ${repo.full_name}
Description: ${repo.description || "N/A"}
Topics: ${topicsList || "N/A"}
Languages: ${languageList || "N/A"}
README (truncated):
${readme || "No README available."}

Generate a JSON object with EXACTLY these fields:
{
  "title": "Short project title (2-5 words, no repo name formatting)",
  "subtitle": "One-line subtitle describing the project (or null if not needed)",
  "description": "2-4 sentence description for a portfolio card. Be specific about what the project does, key features, and technologies. Write in third person.",
  "tags": {
    "technology": ["kebab-case tech tags, e.g. python, react, tensorflow"],
    "domain": ["kebab-case domain tags, e.g. finance, machine-learning"],
    "type": ["kebab-case type tags, e.g. full-stack-app, research, dashboard"],
    "method": ["kebab-case method tags, e.g. regression-analysis, web-scraping"]
  }
}

Rules:
- Tags MUST be kebab-case (lowercase with hyphens)
- Keep technology tags to the main 3-5 technologies
- Keep other tag categories to 2-3 items each
- Description should be engaging but factual
- If the repo is trivial (config files, dotfiles, profile README), return null instead of JSON

Return ONLY valid JSON (or the word null). No markdown, no explanation.`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 600,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(`OpenAI API error: ${res.status} - ${err}`);
    return null;
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content?.trim();

  if (!content || content === "null") return null;

  try {
    // Strip markdown code fences if present
    const cleaned = content.replace(/^```json?\n?/g, "").replace(/\n?```$/g, "");
    return JSON.parse(cleaned);
  } catch (e) {
    console.error(`Failed to parse OpenAI response for ${repo.name}:`, content);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Projects file manipulation
// ---------------------------------------------------------------------------

function extractExistingIds(fileContent) {
  const idRegex = /id:\s*["']([^"']+)["']/g;
  const ids = new Set();
  let match;
  while ((match = idRegex.exec(fileContent)) !== null) {
    ids.add(match[1]);
  }
  return ids;
}

function extractExistingRepos(fileContent) {
  const repoRegex = /githubRepo:\s*["']([^"']+)["']/g;
  const repos = new Set();
  let match;
  while ((match = repoRegex.exec(fileContent)) !== null) {
    repos.add(match[1].toLowerCase());
  }
  return repos;
}

function repoNameToId(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function formatProjectEntry(project) {
  const lines = [];
  lines.push("  {");
  lines.push(`    id: "${project.id}",`);
  lines.push(`    title: "${escapeStr(project.title)}",`);
  if (project.subtitle) {
    lines.push(`    subtitle: "${escapeStr(project.subtitle)}",`);
  }
  lines.push(`    description:`);
  lines.push(`      "${escapeStr(project.description)}",`);
  if (project.lastCommitDate) {
    lines.push(`    lastCommitDate: "${project.lastCommitDate}",`);
  }
  lines.push(`    status: "available",`);
  lines.push(`    link: "${project.link}",`);
  lines.push(`    githubRepo: "${project.githubRepo}",`);

  if (project.tags) {
    lines.push("    tags: {");
    for (const [category, tags] of Object.entries(project.tags)) {
      if (tags && tags.length > 0) {
        const tagStr = tags.map((t) => `"${escapeStr(t)}"`).join(", ");
        lines.push(`      ${category}: [${tagStr}],`);
      }
    }
    lines.push("    },");
  }

  lines.push("  },");
  return lines.join("\n");
}

function escapeStr(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("Fetching GitHub repos...");
  const allRepos = await fetchGitHubRepos();

  // Filter: public, not fork, not archived, not the portfolio repo itself
  const candidateRepos = allRepos.filter(
    (r) =>
      !r.fork &&
      !r.archived &&
      !r.private &&
      r.name.toLowerCase() !== "andrew-girgis" && // profile README repo
      r.name.toLowerCase() !== "andrews-portfolio" &&
      r.name.toLowerCase() !== ".github"
  );

  console.log(`Found ${candidateRepos.length} candidate repos`);

  const fileContent = fs.readFileSync(PROJECTS_FILE, "utf-8");
  const existingIds = extractExistingIds(fileContent);
  const existingRepos = extractExistingRepos(fileContent);

  // Find repos not already in projects.ts
  const newRepos = candidateRepos.filter((r) => {
    const fullName = `${GITHUB_USER}/${r.name}`.toLowerCase();
    const id = repoNameToId(r.name);
    return !existingRepos.has(fullName) && !existingIds.has(id);
  });

  if (newRepos.length === 0) {
    console.log("No new repos to add. Projects are up to date!");
    // Still update commit dates for existing projects
    await updateExistingDates(fileContent);
    return;
  }

  console.log(`Found ${newRepos.length} new repos to process:`);
  newRepos.forEach((r) => console.log(`  - ${r.name}`));

  const newProjects = [];

  for (const repo of newRepos) {
    console.log(`\nProcessing ${repo.name}...`);

    const [readme, languages, lastCommitDate] = await Promise.all([
      fetchReadme(repo.name),
      fetchLanguages(repo.name),
      fetchLastCodeCommitDate(repo.name),
    ]);

    const metadata = await generateProjectMetadata(repo, readme, languages);

    if (!metadata) {
      console.log(`  Skipped (trivial or failed to generate metadata)`);
      continue;
    }

    const project = {
      id: repoNameToId(repo.name),
      title: metadata.title,
      subtitle: metadata.subtitle || undefined,
      description: metadata.description,
      lastCommitDate: lastCommitDate || undefined,
      status: "available",
      link: repo.html_url,
      githubRepo: `${GITHUB_USER}/${repo.name}`,
      tags: metadata.tags,
    };

    newProjects.push(project);
    console.log(`  Generated: "${project.title}"`);
  }

  if (newProjects.length === 0) {
    console.log("\nNo valid new projects to add after AI filtering.");
    await updateExistingDates(fileContent);
    return;
  }

  // Insert new projects before the closing ];
  const newEntries = newProjects.map(formatProjectEntry).join("\n");
  const updatedContent = fileContent.replace(
    /\n\];\s*$/,
    `\n${newEntries}\n];\n`
  );

  if (DRY_RUN) {
    console.log("\n--- DRY RUN: Would add these entries ---\n");
    console.log(newEntries);
    console.log("\n--- End dry run ---");
  } else {
    fs.writeFileSync(PROJECTS_FILE, updatedContent, "utf-8");
    console.log(`\nAdded ${newProjects.length} new project(s) to projects.ts`);
  }

  // Also update dates for existing projects
  await updateExistingDates(DRY_RUN ? fileContent : updatedContent);
}

async function updateExistingDates(fileContent) {
  console.log("\nUpdating last commit dates for existing projects...");

  const repoRegex = /githubRepo:\s*["']Andrew-Girgis\/([^"']+)["']/g;
  const repos = [];
  let match;
  while ((match = repoRegex.exec(fileContent)) !== null) {
    repos.push(match[1]);
  }

  let updated = fileContent;
  let count = 0;

  for (const repoName of repos) {
    const date = await fetchLastCodeCommitDate(repoName);
    if (!date) continue;

    const fullName = `Andrew-Girgis/${repoName}`;
    // Find the project block and update/insert lastCommitDate
    const projectBlockRegex = new RegExp(
      `(githubRepo:\\s*["']${fullName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'],?)`,
      "g"
    );

    if (projectBlockRegex.test(updated)) {
      // Check if lastCommitDate already exists nearby
      const hasDate = new RegExp(
        `lastCommitDate:.*\\n[\\s\\S]{0,200}githubRepo:\\s*["']${fullName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`
      ).test(updated);

      if (!hasDate) {
        // Insert lastCommitDate before githubRepo line
        updated = updated.replace(
          new RegExp(
            `(\\s+)(githubRepo:\\s*["']${fullName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'],?)`
          ),
          `$1lastCommitDate: "${date}",\n$1$2`
        );
        count++;
      }
    }
  }

  if (count > 0 && !DRY_RUN) {
    fs.writeFileSync(PROJECTS_FILE, updated, "utf-8");
    console.log(`Updated ${count} commit dates.`);
  } else if (count > 0) {
    console.log(`Would update ${count} commit dates (dry run).`);
  } else {
    console.log("All dates already present or no changes needed.");
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
