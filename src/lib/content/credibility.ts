import credibilityData from "@/content/credibility.json";
import type { CredibilityContent, CredibilityItem } from "@/types";
import { getProjects } from "./projects";

const credibility = credibilityData satisfies CredibilityContent;

/**
 * The "N+ Projects Delivered" stat is derived from the actual project count
 * in `projects.json` rather than hardcoded, so it can never overstate reality.
 */
export function getCredibilityItems(): CredibilityItem[] {
  const projectCount = getProjects().length;
  const projectsItem: CredibilityItem = {
    label: "Projects Delivered",
    value: projectCount > 0 ? `${projectCount}+` : "",
  };

  const [yearsItem, ...rest] = credibility.items;
  return [yearsItem, projectsItem, ...rest];
}
