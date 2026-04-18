export interface ProjectTag {
  technology: string[];
  domain: string[];
  type: string[];
  method: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  status: "available" | "coming-soon";
  link: string;
  githubRepo?: string;
  tags: ProjectTag;
  featured?: boolean;
}

export interface Writeup {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  link?: string;
  status: "available" | "coming-soon";
}