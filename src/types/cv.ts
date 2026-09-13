import type { ExperienceEntry } from "./experience";
import type { SkillGroup } from "./skills";

export interface EducationEntry {
  id: string;
  institution: string;
  credential: string;
  /** ISO "YYYY-MM" format. `null` when not yet confirmed. */
  startDate: string | null;
  endDate: string | null;
}

/**
 * CV-specific content that isn't already covered by personal/experience/skills
 * data. The CV accessor composes this with those sources so the résumé and
 * the rest of the site can never drift out of sync.
 */
export interface CVOwnContent {
  summary: string;
  education: EducationEntry[];
}

export interface CVData {
  name: string;
  title: string;
  location: string | null;
  email: string | null;
  summary: string;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: SkillGroup[];
  links: {
    github: string | null;
    linkedin: string | null;
  };
}
