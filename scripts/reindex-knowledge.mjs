#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const MANIFEST_PATH = path.join(ROOT, "api", "knowledge", "manifest.json");
const GENERATED_DIR = path.join(ROOT, "api", "knowledge", "generated");
const APPLY = process.argv.includes("--apply");
const REMOTE = !process.argv.includes("--local");
const SKIP_EMBED = process.argv.includes("--skip-embed");
const COHERE_EMBED_BATCH_SIZE = 16;
const COHERE_EMBED_BATCH_DELAY_MS = 10_000;

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const chunkConfig = manifest.chunking;

function sha256(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

function stableId(...parts) {
  return sha256(parts.join("\u001f")).slice(0, 32);
}

function rootPath(relativePath) {
  return path.join(ROOT, relativePath);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function sqlString(value) {
  if (value === null || value === undefined) return "NULL";
  return `'${String(value).replace(/'/g, "''")}'`;
}

function normalizeWhitespace(text) {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/[\t ]+/g, " ")
    .replace(/\n{4,}/g, "\n\n\n")
    .trim();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function postCohereEmbed(apiKey, batch) {
  const maxAttempts = 4;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetch("https://api.cohere.com/v2/embed", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          texts: batch,
          model: manifest.embedding.model,
          input_type: manifest.embedding.documentInputType,
          output_dimension: manifest.embedding.outputDimension,
          embedding_types: [manifest.embedding.embeddingType],
        }),
      });

      if (response.status === 429 || response.status >= 500) {
        if (attempt === maxAttempts) return response;
        const retryAfterSeconds = Number(response.headers.get("retry-after") || (response.status === 429 ? "60" : "10"));
        console.warn(`Cohere embed attempt ${attempt} failed with ${response.status}. Waiting ${retryAfterSeconds}s before retry.`);
        await sleep(retryAfterSeconds * 1000);
        continue;
      }

      return response;
    } catch (error) {
      if (attempt === maxAttempts) throw error;
      const retryDelayMs = attempt * 10_000;
      console.warn(`Cohere embed attempt ${attempt} failed. Waiting ${retryDelayMs / 1000}s before retry.`, error);
      await sleep(retryDelayMs);
    }
  }
}

function extractAssignedValue(fileContent, marker) {
  const markerIndex = fileContent.indexOf(marker);
  if (markerIndex === -1) throw new Error(`Marker not found: ${marker}`);
  const equalsIndex = fileContent.indexOf("=", markerIndex);
  const start = fileContent.slice(equalsIndex + 1).search(/[\[{]/) + equalsIndex + 1;
  const opener = fileContent[start];
  const closer = opener === "[" ? "]" : "}";
  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let i = start; i < fileContent.length; i++) {
    const char = fileContent[i];
    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }
    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }
    if (char === opener) depth++;
    if (char === closer) depth--;
    if (depth === 0) return fileContent.slice(start, i + 1);
  }
  throw new Error(`Unable to extract assignment: ${marker}`);
}

function evaluateLiteral(literal) {
  return Function(`"use strict"; return (${literal});`)();
}

function loadProjects(source) {
  const file = fs.readFileSync(rootPath(source.path), "utf8");
  const projects = evaluateLiteral(extractAssignedValue(file, "export const projects"));
  return projects.map((project) => ({
    id: `project:${project.id}`,
    type: source.type,
    title: project.title,
    description: project.subtitle || "Portfolio project",
    source: source.id,
    sourcePath: source.path,
    content: [
      `# ${project.title}`,
      project.subtitle ? `Subtitle: ${project.subtitle}` : "",
      project.description,
      project.status ? `Status: ${project.status}` : "",
      project.link ? `Link: ${project.link}` : "",
      project.githubRepo ? `GitHub repository: ${project.githubRepo}` : "",
      project.featured ? "Featured on the homepage." : "",
      project.tags ? `Tags: ${Object.values(project.tags).flat().join(", ")}` : "",
    ].filter(Boolean).join("\n\n"),
    metadata: {
      projectId: project.id,
      githubRepo: project.githubRepo || null,
      link: project.link || null,
      featured: Boolean(project.featured),
      tags: project.tags || {},
    },
  }));
}

function loadWorkspace(source) {
  const file = fs.readFileSync(rootPath(source.path), "utf8");
  const hotspots = evaluateLiteral(extractAssignedValue(file, "export const HOTSPOT_CONFIG"));
  return [{
    id: "workspace:desk-hotspots",
    type: source.type,
    title: "Andrew's Workspace",
    description: "Interactive desk setup and equipment details",
    source: source.id,
    sourcePath: source.path,
    content: [
      "# Andrew's Workspace",
      ...Object.entries(hotspots).map(([id, product]) => [
        `## ${product.name}`,
        product.description,
        product.link ? `Link: ${product.link}` : "",
        `Hotspot id: ${id}`,
      ].filter(Boolean).join("\n")),
    ].join("\n\n"),
    metadata: { itemCount: Object.keys(hotspots).length },
  }];
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith(".")) return [];
    if (entry.isDirectory()) return walk(full);
    return [full];
  });
}

function matchesPattern(relPath, pattern) {
  const normalized = relPath.split(path.sep).join("/");
  if (pattern === "**/*") return true;
  if (pattern.startsWith("**/*.")) return normalized.endsWith(pattern.slice(4));
  if (pattern.endsWith("/**")) return normalized.startsWith(pattern.slice(0, -3));
  if (pattern.includes("*")) {
    const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*\*/g, ".*").replace(/\*/g, "[^/]*");
    return new RegExp(`^${escaped}$`).test(normalized);
  }
  return normalized === pattern;
}

function included(relPath, source) {
  const include = source.include || ["**/*"];
  const exclude = source.exclude || [];
  return include.some((pattern) => matchesPattern(relPath, pattern)) && !exclude.some((pattern) => matchesPattern(relPath, pattern));
}

function readPdf(filePath) {
  const tmp = path.join(os.tmpdir(), `${path.basename(filePath)}.${Date.now()}.txt`);
  execFileSync("pdftotext", ["-layout", filePath, tmp], { stdio: "ignore" });
  const text = fs.readFileSync(tmp, "utf8");
  fs.rmSync(tmp, { force: true });
  return text;
}

function loadDirectory(source) {
  const base = rootPath(source.path);
  return walk(base).flatMap((filePath) => {
    const rel = path.relative(base, filePath).split(path.sep).join("/");
    if (!included(rel, source)) return [];
    const ext = path.extname(filePath).toLowerCase();
    if (![".md", ".txt", ".pdf"].includes(ext)) return [];
    let content = "";
    if (ext === ".pdf") content = readPdf(filePath);
    else content = fs.readFileSync(filePath, "utf8");
    content = normalizeWhitespace(content);
    if (!content) return [];
    const title = path.basename(filePath, ext).replace(/[_-]+/g, " ");
    return [{
      id: `${source.id}:${rel}`,
      type: source.type,
      title,
      description: `${source.type} source document`,
      source: source.id,
      sourcePath: path.join(source.path, rel).split(path.sep).join("/"),
      content,
      metadata: { fileType: ext, relativePath: rel },
    }];
  });
}

function loadDocuments() {
  const docs = [];
  for (const source of manifest.sources.filter((item) => item.enabled)) {
    if (source.loader === "projects-data") docs.push(...loadProjects(source));
    else if (source.loader === "workspace-data") docs.push(...loadWorkspace(source));
    else if (source.loader === "directory") docs.push(...loadDirectory(source));
    else throw new Error(`Unknown loader: ${source.loader}`);
  }
  return docs;
}

function splitSections(content) {
  const lines = content.split("\n");
  const sections = [];
  let heading = "";
  let buffer = [];
  const flush = () => {
    const text = buffer.join("\n").trim();
    if (text) sections.push({ heading, content: text });
    buffer = [];
  };
  for (const line of lines) {
    const match = line.match(/^#{1,4}\s+(.+)$/);
    if (match) {
      flush();
      heading = match[1].trim();
    } else {
      buffer.push(line);
    }
  }
  flush();
  if (sections.length) return sections;
  return content.split(/\n{2,}/).map((part) => ({ heading: "", content: part.trim() })).filter((part) => part.content);
}

function splitLongText(text, targetChars, overlapChars) {
  if (text.length <= targetChars) return [text];
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    let end = Math.min(start + targetChars, text.length);
    if (end < text.length) {
      const boundary = text.lastIndexOf(" ", end);
      if (boundary > start + targetChars * 0.65) end = boundary;
    }
    chunks.push(text.slice(start, end).trim());
    if (end >= text.length) break;
    start = Math.max(0, end - overlapChars);
  }
  return chunks.filter(Boolean);
}

function chunkDocument(doc) {
  const sections = splitSections(doc.content);
  const chunks = [];
  let carry = "";
  for (const section of sections) {
    const headingLine = section.heading ? `## ${section.heading}\n` : "";
    const sectionText = `${headingLine}${section.content}`.trim();
    if (!sectionText) continue;
    for (const piece of splitLongText(sectionText, chunkConfig.targetChars, chunkConfig.overlapChars)) {
      const candidate = carry ? `${carry}\n\n${piece}` : piece;
      if (candidate.length < chunkConfig.minChunkChars) {
        carry = candidate;
      } else {
        chunks.push(candidate);
        carry = "";
      }
    }
  }
  if (carry) {
    if (chunks.length) chunks[chunks.length - 1] = `${chunks[chunks.length - 1]}\n\n${carry}`;
    else chunks.push(carry);
  }
  return chunks.map((content, index) => {
    const prefixed = `[${doc.type}: ${doc.title}]\n${content}`;
    return {
      id: `chunk_${stableId(doc.id, String(index), prefixed)}`,
      documentId: doc.id,
      chunkIndex: index,
      title: doc.title,
      content: prefixed,
      contentHash: sha256(prefixed),
      metadata: {
        ...doc.metadata,
        documentId: doc.id,
        source: doc.source,
        sourcePath: doc.sourcePath,
        type: doc.type,
        title: doc.title,
        chunkIndex: index,
      },
    };
  });
}

async function embedTexts(texts) {
  if (SKIP_EMBED) return texts.map(() => Array(manifest.embedding.outputDimension).fill(0));
  const apiKey = process.env.COHERE_API_KEY;
  if (!apiKey) throw new Error("Missing COHERE_API_KEY. Use `s COHERE_API_KEY -- npm run knowledge:reindex -- --apply`.");
  const embeddings = [];
  const batchSize = COHERE_EMBED_BATCH_SIZE;
  for (let i = 0; i < texts.length; i += batchSize) {
    if (i > 0) await sleep(COHERE_EMBED_BATCH_DELAY_MS);
    const batch = texts.slice(i, i + batchSize);
    const response = await postCohereEmbed(apiKey, batch);
    if (!response.ok) throw new Error(`Cohere embed failed: ${response.status} ${await response.text()}`);
    const data = await response.json();
    embeddings.push(...data.embeddings.float);
    console.log(`Embedded ${Math.min(i + batch.length, texts.length)} / ${texts.length}`);
  }
  return embeddings;
}

function buildSql(documents, chunks) {
  const statements = [
    "DELETE FROM document_chunks;",
    "DELETE FROM knowledge_documents;",
  ];
  for (const doc of documents) {
    statements.push(`INSERT INTO knowledge_documents (id, type, title, description, source, source_path, metadata, content_hash) VALUES (${[
      sqlString(doc.id), sqlString(doc.type), sqlString(doc.title), sqlString(doc.description), sqlString(doc.source), sqlString(doc.sourcePath), sqlString(JSON.stringify(doc.metadata || {})), sqlString(sha256(doc.content)),
    ].join(", ")});`);
  }
  for (const chunk of chunks) {
    statements.push(`INSERT INTO document_chunks (id, document_id, source, source_id, title, content, metadata, content_hash, embedding_model, embedding_dimension, vector_index) VALUES (${[
      sqlString(chunk.id), sqlString(chunk.documentId), sqlString(chunk.metadata.source), sqlString(chunk.documentId), sqlString(chunk.title), sqlString(chunk.content), sqlString(JSON.stringify(chunk.metadata)), sqlString(chunk.contentHash), sqlString(manifest.embedding.model), manifest.embedding.outputDimension, sqlString(manifest.vectorize.indexName),
    ].join(", ")});`);
  }
  return `${statements.join("\n")}\n`;
}

function applyD1(sqlFile) {
  const args = ["wrangler", "d1", "execute", manifest.d1.databaseName, "--file", sqlFile];
  if (REMOTE) args.push("--remote");
  execFileSync("npx", args, { cwd: ROOT, stdio: "inherit" });
}

function applyVectorize(ndjsonFile) {
  execFileSync("npx", ["wrangler", "vectorize", "upsert", manifest.vectorize.indexName, "--file", ndjsonFile], { cwd: ROOT, stdio: "inherit" });
}

async function main() {
  ensureDir(GENERATED_DIR);
  const documents = loadDocuments().map((doc) => ({ ...doc, content: normalizeWhitespace(doc.content) }));
  const chunks = [];
  const seenChunkHashes = new Set();
  for (const doc of documents) {
    for (const chunk of chunkDocument(doc)) {
      if (seenChunkHashes.has(chunk.contentHash)) continue;
      seenChunkHashes.add(chunk.contentHash);
      chunks.push(chunk);
    }
  }

  const embeddings = await embedTexts(chunks.map((chunk) => chunk.content));
  const vectorRows = chunks.map((chunk, index) => ({
    id: chunk.id,
    values: embeddings[index],
    metadata: {
      documentId: chunk.documentId,
      source: chunk.metadata.source,
      type: chunk.metadata.type,
      title: chunk.metadata.title,
      sourcePath: chunk.metadata.sourcePath,
      chunkIndex: chunk.chunkIndex,
    },
  }));

  const sqlPath = path.join(GENERATED_DIR, "knowledge.sql");
  const vectorsPath = path.join(GENERATED_DIR, "vectors.ndjson");
  const reportPath = path.join(GENERATED_DIR, "index-report.json");
  fs.writeFileSync(sqlPath, buildSql(documents, chunks));
  fs.writeFileSync(vectorsPath, vectorRows.map((row) => JSON.stringify(row)).join("\n") + "\n");
  fs.writeFileSync(reportPath, JSON.stringify({
    generatedAt: new Date().toISOString(),
    apply: APPLY,
    remote: REMOTE,
    embedding: manifest.embedding,
    vectorize: manifest.vectorize,
    documents: documents.length,
    chunks: chunks.length,
    chunksBySource: chunks.reduce((acc, chunk) => {
      acc[chunk.metadata.source] = (acc[chunk.metadata.source] || 0) + 1;
      return acc;
    }, {}),
    files: { sqlPath, vectorsPath },
  }, null, 2));

  console.log(`Documents: ${documents.length}`);
  console.log(`Chunks: ${chunks.length}`);
  console.log(`Wrote ${path.relative(ROOT, sqlPath)}`);
  console.log(`Wrote ${path.relative(ROOT, vectorsPath)}`);
  console.log(`Wrote ${path.relative(ROOT, reportPath)}`);

  if (APPLY) {
    applyD1(sqlPath);
    applyVectorize(vectorsPath);
  } else {
    console.log("Dry run only. Re-run with --apply to write D1 and Vectorize.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
