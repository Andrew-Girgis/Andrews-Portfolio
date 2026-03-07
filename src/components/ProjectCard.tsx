import { useState } from "react";
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

function getCategoryAccentColor(tags?: Project["tags"]): string {
  if (!tags) return "bg-primary";
  if (tags.technology?.length) return "bg-blue-500";
  if (tags.domain?.length) return "bg-green-500";
  if (tags.type?.length) return "bg-purple-500";
  if (tags.method?.length) return "bg-orange-500";
  return "bg-primary";
}

export function ProjectCard({ project, onDetailsClick }: ProjectCardProps) {
  const hasExternalLink = project.link && project.link !== "#";
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }
    onDetailsClick();
  };

  return (
    <Card
      className="group overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
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
      {/* Colored top accent bar */}
      <div className={`h-[3px] w-full ${getCategoryAccentColor(project.tags)}`} />

      <div className="relative h-48 md:h-52 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        <img
          src={project.image}
          alt={project.imageAlt ?? project.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        {/* Always-visible gradient overlay at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {/* Stronger hover gradient */}
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
          <h3 className="text-lg font-semibold font-serif leading-snug text-primary line-clamp-2 text-balance">
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
