import projectsData from "@/content/projects.json";
import type { Project, ProjectsSectionContent } from "@/types";

// `status` is a string-literal union; JSON typing widens it to `string`, so
// this needs an explicit assertion rather than `satisfies`.
const projectsSection = projectsData as ProjectsSectionContent & { items: Project[] };

export function getProjectsSectionCopy(): ProjectsSectionContent {
  return { sectionLabel: projectsSection.sectionLabel, heading: projectsSection.heading };
}

export function getProjects(): Project[] {
  return projectsSection.items;
}

export function getFeaturedProjects(): Project[] {
  return projectsSection.items.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projectsSection.items.find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projectsSection.items.map((project) => project.slug);
}
