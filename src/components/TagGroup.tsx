import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface TagGroupProps {
  tags?: {
    technology?: string[];
    domain?: string[];
    type?: string[];
    method?: string[];
  };
  projectId: string;
  animated?: boolean;
}

const categoryStyles = {
  technology: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  domain: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  type: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  method: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
} as const;

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 4 },
  show: { opacity: 1, y: 0 },
};

export function TagGroup({ tags, projectId, animated = true }: TagGroupProps) {
  if (!tags) return null;

  const categoryOrder: Array<keyof NonNullable<typeof tags>> = [
    "technology",
    "domain",
    "type",
    "method",
  ];

  const allTags = categoryOrder.flatMap((category) => {
    const categoryTags = tags[category];
    if (!categoryTags || categoryTags.length === 0) return [];
    return categoryTags.map((tag, idx) => ({
      tag,
      category,
      key: `${projectId}-${category}-${tag}-${idx}`,
    }));
  });

  if (allTags.length === 0) return null;

  if (!animated) {
    return (
      <div
        className="flex flex-wrap gap-1.5 mb-2"
        aria-label={`Tags for project`}
        role="list"
      >
        {allTags.map(({ tag, category, key }) => (
          <Badge
            key={key}
            className={`text-xs px-2 py-0.5 ${categoryStyles[category]}`}
            role="listitem"
          >
            {tag.replace(/-/g, " ")}
          </Badge>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={containerVariants}
      className="flex flex-wrap gap-1.5 mb-2"
      aria-label={`Tags for project`}
      role="list"
    >
      {allTags.map(({ tag, category, key }) => (
        <motion.span key={key} variants={itemVariants}>
          <Badge
            className={`text-xs px-2 py-0.5 ${categoryStyles[category]}`}
            role="listitem"
          >
            {tag.replace(/-/g, " ")}
          </Badge>
        </motion.span>
      ))}
    </motion.div>
  );
}
