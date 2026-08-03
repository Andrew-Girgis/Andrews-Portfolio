import { projects } from "@/data/projects";
import { useState } from "react";

const categories = [
  "ai",
  "data-science",
  "data-engineering",
  "data-visualization",
  "developer-tools",
  "finance",
  "civic-tech",
  "productivity",
  "consumer-tech",
];

const categoryAliases: Record<string, string[]> = {
  ai: ["ai", "ai-agents", "voice-ai", "computer-vision", "deep-learning", "openai", "gemini", "pgvector"],
  "data-science": [
    "data-science",
    "computer-vision",
    "deep-learning",
    "predictive-model",
    "research",
    "text-analysis",
    "natural-language-processing",
    "sentiment-analysis",
    "scikit-learn",
    "tensorflow",
    "keras",
    "nltk",
    "garch",
    "var",
  ],
  "data-engineering": ["data-engineering", "etl-pipeline", "scraper", "data-pipeline", "web-scraping"],
  "data-visualization": ["data-visualization", "dashboard", "network-visualization", "shiny", "gephi"],
  "developer-tools": ["developer-tools", "agent-tooling", "cli", "tui", "project-scaffolding"],
  finance: ["finance", "fintech", "personal-finance", "real-estate"],
  "civic-tech": ["civic-tech", "public-policy", "government", "demographics"],
  productivity: ["productivity"],
  "consumer-tech": ["consumer-tech"],
};

const projectMatchesCategory = (project: (typeof projects)[number], category: string) => {
  const aliases = categoryAliases[category] ?? [category];
  const projectTags = [
    ...project.tags.technology,
    ...project.tags.domain,
    ...project.tags.type,
    ...project.tags.method,
  ];

  return aliases.some((alias) => projectTags.includes(alias));
};

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? projects
    : projects.filter((project) => projectMatchesCategory(project, activeCategory));

  const filterOptions = ["all", ...categories];

  const projectCount = (category: string) => category === "all"
    ? projects.length
    : projects.filter((project) => projectMatchesCategory(project, category)).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-foreground font-mono mb-2">
          <span className="text-primary">$</span> ls -a ./projects
        </h1>
        <p className="text-muted-foreground mb-8">
          Browse all projects by category.
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {filterOptions.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1 text-xs font-mono rounded-full border transition-colors ${
                activeCategory === category
                  ? "border-primary text-primary bg-primary/10"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-primary"
              }`}
            >
              {category}
              <span className="ml-1 opacity-60">{projectCount(category)}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <a
              key={project.id}
              href={project.link}
              target={project.link.startsWith("#") ? undefined : "_blank"}
              rel={project.link.startsWith("#") ? undefined : "noopener noreferrer"}
              className="group block rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 transition-all duration-300"
            >
              {project.image && (
                <div className="h-36 bg-muted overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.imageAlt || project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                {project.subtitle && (
                  <p className="text-xs text-muted-foreground mt-1">{project.subtitle}</p>
                )}
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tags.technology.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] font-mono rounded border border-border text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
