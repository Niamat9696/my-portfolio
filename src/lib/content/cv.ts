import cvData from "@/content/cv.json";
import type { CVData, CVOwnContent } from "@/types";
import { getPersonalInfo } from "./personal";
import { getExperience } from "./experience";
import { getSocialLinks } from "./social";

const cvOwnContent = cvData satisfies CVOwnContent;

/**
 * Composes the CV from the same sources the rest of the site reads
 * (personal info, experience, social links) plus CV-only fields
 * (summary, skills, AI section, highlights, projects, education) so the
 * résumé's facts — titles, dates, contact details — can never drift out of
 * sync with the site content it's built from.
 */
export function getCVData(): CVData {
  const personal = getPersonalInfo();
  const socialLinks = getSocialLinks();
  const github = socialLinks.find((link) => link.icon === "github")?.url ?? null;
  const linkedin = socialLinks.find((link) => link.icon === "linkedin")?.url ?? null;
  const mailto = socialLinks.find((link) => link.icon === "mail")?.url ?? null;
  const { experienceHighlights, portfolioUrl, ...ownContent } = cvOwnContent;
  const highlights: Record<string, string[]> = experienceHighlights;

  return {
    ...ownContent,
    name: personal.name,
    title: personal.title,
    location: personal.location,
    email: personal.email ?? mailto?.replace(/^mailto:/, "") ?? null,
    phone: personal.phone,
    experience: getExperience().map((entry) => ({
      ...entry,
      achievements: highlights[entry.id] ?? entry.achievements,
    })),
    links: { github, linkedin, portfolio: portfolioUrl },
  };
}
