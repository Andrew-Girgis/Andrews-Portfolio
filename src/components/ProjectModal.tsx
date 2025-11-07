import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  imageAlt?: string;
  status?: "available" | "coming-soon";
  link?: string;
  tags?: {
    technology?: string[];
    domain?: string[];
    type?: string[];
    method?: string[];
  };
}

interface ProjectModalProps {
  project: Project;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categoryStyles = {
  technology: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  domain: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  type: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  method: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
} as const;

const categoryLabels = {
  technology: "Technology",
  domain: "Domain",
  type: "Type",
  method: "Method",
} as const;

export function ProjectModal({ project, open, onOpenChange }: ProjectModalProps) {
  const categoryOrder: Array<keyof NonNullable<Project["tags"]>> = [
    "technology",
    "domain",
    "type",
    "method",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold pr-8">
            {project.title}
            {project.subtitle && (
              <span className="block text-lg font-medium text-muted-foreground mt-1">
                {project.subtitle}
              </span>
            )}
          </DialogTitle>
          <DialogDescription className="text-base leading-relaxed mt-2">
            {project.description}
          </DialogDescription>
        </DialogHeader>

        {project.image && (
          <div className="w-full rounded-lg overflow-hidden">
            <img
              src={project.image}
              alt={project.imageAlt ?? project.title}
              className="w-full object-cover max-h-[360px]"
            />
          </div>
        )}

        {project.tags && (
          <div className="space-y-3">
            {categoryOrder.map((category) => {
              const categoryTags = project.tags?.[category];
              if (!categoryTags || categoryTags.length === 0) return null;

              return (
                <div key={category} className="space-y-1.5">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    {categoryLabels[category]}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {categoryTags.map((tag, idx) => (
                      <Badge
                        key={`${category}-${idx}`}
                        className={`text-xs px-2 py-0.5 ${categoryStyles[category]}`}
                      >
                        {tag.replace(/-/g, " ")}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {project.link && project.link !== "#" && (
          <div className="flex gap-2 pt-2">
            <Button
              onClick={() => window.open(project.link, "_blank")}
              className="flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Open Project
            </Button>
          </div>
        )}

        {project.status === "coming-soon" && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
            <p className="text-sm font-medium text-primary">
              🚀 This project is coming soon! Stay tuned for updates.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
