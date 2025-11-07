import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { TagGroup } from "./TagGroup";
import { Project } from "./ProjectModal";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
  index: number;
  onDetailsClick: () => void;
}

export function ProjectCard({ project, index, onDetailsClick }: ProjectCardProps) {
  const hasExternalLink = project.link && project.link !== "#";

  const handleCardClick = (e: React.MouseEvent) => {
    // Only open modal if clicking on the card itself, not the external link button
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }
    onDetailsClick();
  };

  return (
    <Card
      className="group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 animate-fade-in-up cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
      style={{ animationDelay: `${index * 150}ms` }}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onDetailsClick();
        }
      }}
      tabIndex={0}
      role="article"
      aria-label={`${project.title}${project.subtitle ? ` — ${project.subtitle}` : ''} project card. ${
        project.status === "coming-soon" ? "Status: coming soon." : "Click for details."
      }`}
    >
      <div className="relative h-48 md:h-52 overflow-hidden">
        <img
          src={project.image}
          alt={project.imageAlt ?? project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {project.status === "coming-soon" && (
          <div
            className="absolute top-0 right-0 bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground px-4 py-2 text-xs font-semibold uppercase tracking-wide shadow-lg"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 20% 100%)",
            }}
            aria-label="Status: Coming Soon"
            role="status"
          >
            Coming Soon
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="mb-3" role="heading" aria-level={3}>
          <h3 className="text-lg font-semibold leading-snug text-primary line-clamp-2 text-balance">
            {project.title}
            {project.subtitle && <span className="sr-only"> — {project.subtitle}</span>}
          </h3>
          {project.subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              className="text-sm text-muted-foreground leading-tight mt-1"
            >
              {project.subtitle}
            </motion.p>
          )}
        </div>

        <TagGroup tags={project.tags} projectId={project.id} animated={true} />

        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
          {project.description}
        </p>

        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDetailsClick();
            }}
            className="text-xs"
          >
            View Details
          </Button>
          {hasExternalLink && (
            <Button
              variant="default"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.link, "_blank");
              }}
              className="text-xs flex items-center gap-1"
            >
              <ExternalLink className="h-3 w-3" />
              Open Project
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
