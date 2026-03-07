import { useState } from "react";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { Project } from "./ProjectModal";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section
      id="projects"
      className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-surface-alt"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="w-12 h-1 bg-primary rounded-full mx-auto mb-6" />
            <h2
              id="projects-heading"
              className="text-4xl sm:text-5xl font-bold font-serif text-foreground"
            >
              Featured Projects
            </h2>
          </div>
        </ScrollReveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard
                project={project}
                index={0}
                onDetailsClick={() => handleProjectClick(project)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      )}
    </section>
  );
};

export default ProjectsSection;
