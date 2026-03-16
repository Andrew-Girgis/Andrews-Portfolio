import { useState, useEffect, useRef } from "react";
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

async function fetchLastCodeCommitDate(repo: string): Promise<string | null> {
  // Get recent commits (limited to 5 to conserve API quota)
  const res = await fetch(
    `https://api.github.com/repos/${repo}/commits?per_page=5`,
    { headers: { Accept: "application/vnd.github.v3+json" } }
  );
  if (!res.ok) return null;
  const commits = await res.json();
  if (!commits.length) return null;

  // Check each commit sequentially (stop early on first code change)
  for (const commit of commits) {
    const detailRes = await fetch(commit.url, {
      headers: { Accept: "application/vnd.github.v3+json" },
    });
    if (!detailRes.ok) continue;
    const detail = await detailRes.json();
    const hasCodeChanges = detail.files?.some(
      (f: { filename: string }) =>
        !f.filename.endsWith(".md") && !f.filename.endsWith(".txt")
    );
    if (hasCodeChanges) {
      return commit.commit.committer.date;
    }
  }
  // Fallback to most recent commit if all 5 are docs-only
  return commits[0]?.commit?.committer?.date ?? null;
}

async function fetchLastCommitDates(
  projectList: Project[]
): Promise<Map<string, string>> {
  const dates = new Map<string, string>();
  const repoProjects = projectList.filter((p) => p.githubRepo);

  // Fetch sequentially to avoid blowing through rate limit
  for (const p of repoProjects) {
    const date = await fetchLastCodeCommitDate(p.githubRepo!);
    if (date) dates.set(p.id, date);
  }

  return dates;
}

const INITIAL_COUNT = 6;

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortedProjects, setSortedProjects] = useState<Project[]>(projects);
  const [showAll, setShowAll] = useState(false);
  const [sortKey, setSortKey] = useState(0);

  useEffect(() => {
    fetchLastCommitDates(projects).then((dates) => {
      const withDates = projects.map((p) => ({
        ...p,
        lastCommitDate: dates.get(p.id) ?? p.lastCommitDate,
      }));

      withDates.sort((a, b) => {
        const dateA = a.lastCommitDate;
        const dateB = b.lastCommitDate;
        // Projects with dates come first, sorted most recent first
        if (dateA && dateB)
          return new Date(dateB).getTime() - new Date(dateA).getTime();
        if (dateA) return -1;
        if (dateB) return 1;
        return 0;
      });

      setSortedProjects(withDates);
      setSortKey((k) => k + 1);
    });
  }, []);

  const sortedRef = useRef(sortedProjects);
  sortedRef.current = sortedProjects;

  const handleProjectClick = (project: Project) => {
    // Always use the ref to get the latest sorted list (avoids stale closure)
    const latest = sortedRef.current.find((p) => p.id === project.id) ?? project;
    setSelectedProject(latest);
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
          key={sortKey}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {sortedProjects.slice(0, INITIAL_COUNT).map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard
                project={project}
                index={0}
                onDetailsClick={() => handleProjectClick(project)}
              />
            </motion.div>
          ))}
        </motion.div>

        {showAll && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {sortedProjects.slice(INITIAL_COUNT).map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard
                  project={project}
                  index={0}
                  onDetailsClick={() => handleProjectClick(project)}
                />
              </motion.div>
            ))}
          </div>
        )}

        {sortedProjects.length > INITIAL_COUNT && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-medium"
            >
              {showAll ? "Show Less" : "Show All Projects"}
            </button>
          </div>
        )}
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
