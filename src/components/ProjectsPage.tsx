import { projects } from "@/data/projects";
import { useState } from "react";
import Navigation from "./NavigationNew";

const allTags = Array.from(
  new Set(projects.flatMap((p) => [...p.tags.technology, ...p.tags.domain]))
).sort();

const ProjectsPage = () => {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? projects.filter(
        (p) =>
          p.tags.technology.includes(activeTag) ||
          p.tags.domain.includes(activeTag)
      )
    : projects;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-foreground font-mono mb-2">
          <span className="text-primary">$</span> ls -a ./projects
        </h1>
        <p className="text-muted-foreground mb-8">
          Browse all projects by technology or domain.
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3 py-1 text-xs font-mono rounded-full border transition-colors ${
              activeTag === null
                ? "border-primary text-primary bg-primary/10"
                : "border-border text-muted-foreground hover:text-foreground hover:border-primary"
            }`}
          >
            all
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-3 py-1 text-xs font-mono rounded-full border transition-colors ${
                activeTag === tag
                  ? "border-primary text-primary bg-primary/10"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-primary"
              }`}
            >
              {tag}
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