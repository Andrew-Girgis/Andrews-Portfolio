import { useState, useEffect, useRef } from "react";
import { projects } from "@/data/projects";

const FeaturedProjects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground font-mono">
            <span className="text-primary">$</span> ls ./projects
          </h2>
          <a
            href="/projects"
            className="text-sm font-mono text-primary hover:underline"
          >
            view all →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((project, i) => (
            <a
              key={project.id}
              href={project.link}
              target={project.link.startsWith("#") ? undefined : "_blank"}
              rel={project.link.startsWith("#") ? undefined : "noopener noreferrer"}
              className="group block rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 transition-all duration-300"
              style={{ animationDelay: `${i * 100}ms` }}
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
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tags.technology.slice(0, 3).map((tag) => (
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
    </section>
  );
};

export default FeaturedProjects;