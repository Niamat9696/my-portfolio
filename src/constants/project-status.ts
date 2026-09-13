import type { ProjectStatus } from "@/types";

export const projectStatusLabels: Record<ProjectStatus, string> = {
  live: "Live",
  "in-development": "In Development",
  archived: "Archived",
  concept: "Concept",
};
