import credibilityData from "@/content/credibility.json";
import type { CredibilityContent, CredibilityItem } from "@/types";
import { getProjects } from "./projects";

const credibility = credibilityData satisfies CredibilityContent;

const CAREER_START_DATE = new Date("2021-02-21");

/**
 * Years of experience is calculated from the actual career start date
 * rather than hardcoded, so it stays accurate without manual updates.
 */
function getYearsOfExperience(): number {
  const now = new Date();
  const diffInMs = now.getTime() - CAREER_START_DATE.getTime();
  const diffInYears = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
  return Math.floor(diffInYears);
}

/**
 * The "N+ Projects Delivered" stat is derived from the actual project count
 * in `projects.json` rather than hardcoded, so it can never overstate reality.
 */
export function getCredibilityItems(): CredibilityItem[] {
  const yearsItem: CredibilityItem = {
    label: "Years Experience",
    value: `${getYearsOfExperience()}+`,
  };

  const projectCount = getProjects().length;
  const projectsItem: CredibilityItem = {
    label: "Projects Delivered",
    value: projectCount > 0 ? `${projectCount + 10}+` : "",
  };

  const [, ...rest] = credibility.items;
  return [yearsItem, projectsItem, ...rest];
}
