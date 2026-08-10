const isEnabled = (value: string | undefined) => value === "true";

export const featureFlags = {
  writing: isEnabled(import.meta.env.PUBLIC_FEATURE_WRITING),
  resources: isEnabled(import.meta.env.PUBLIC_FEATURE_RESOURCES),
} as const;

export const optionalSections = [
  {
    id: "writing",
    label: "Writing",
    href: "/writing",
    title: "Writing - Andrew Girgis",
    command: "ls ./writing",
    description: "Notes, essays, project writeups, and research thoughts.",
    enabled: featureFlags.writing,
  },
  {
    id: "resources",
    label: "Resources",
    href: "/resources",
    title: "Resources - Andrew Girgis",
    command: "ls ./resources",
    description: "Content, books, podcasts, videos, posts, and other resources I recommend.",
    enabled: featureFlags.resources,
  },
] as const;

export const enabledOptionalSections = optionalSections.filter((section) => section.enabled);
