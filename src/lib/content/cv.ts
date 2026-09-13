import cvData from "@/content/cv.json";
import type { CVData, CVOwnContent } from "@/types";
import { getPersonalInfo } from "./personal";
import { getExperience } from "./experience";
import { getSkillGroups } from "./skills";
import { getSocialLinks } from "./social";

const cvOwnContent = cvData satisfies CVOwnContent;

/**
 * Composes the CV from the same sources the rest of the site reads
 * (personal info, experience, skills, social links) plus CV-only fields
 * (summary, education) so the résumé can never drift out of sync with the
 * site content it's built from.
 */
export function getCVData(): CVData {
  const personal = getPersonalInfo();
  const socialLinks = getSocialLinks();
  const github = socialLinks.find((link) => link.icon === "github")?.url ?? null;
  const linkedin = socialLinks.find((link) => link.icon === "linkedin")?.url ?? null;

  return {
    name: personal.name,
    title: personal.title,
    location: personal.location,
    email: personal.email,
    summary: cvOwnContent.summary,
    experience: getExperience(),
    education: cvOwnContent.education,
    skills: getSkillGroups(),
    links: { github, linkedin },
  };
}
