export type ProjectStatus = "live" | "in-development" | "archived" | "concept";

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  title: string;
  /** `null` when not yet confirmed. */
  category: string | null;
  shortDescription: string | null;
  description: string | null;
  role: string | null;
  /** Hero/card image. `null` falls back to an abstract technical placeholder. */
  image: ProjectImage | null;
  images: ProjectImage[];
  technologies: string[];
  problem: string | null;
  solution: string | null;
  architecture: string | null;
  keyFeatures: string[];
  challenges: string[];
  results: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  /** `null` when the current status hasn't been confirmed — hide the status badge. */
  status: ProjectStatus | null;
  featured: boolean;
}
