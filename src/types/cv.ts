import type { ExperienceEntry } from "./experience";

export interface EducationEntry {
  id: string;
  institution: string;
  credential: string;
  /** ISO "YYYY-MM" format. `null` when not yet confirmed. */
  startDate: string | null;
  endDate: string | null;
}

/** A labelled line such as "Backend: NestJS, Node.js, …" or "Testing: …". */
export interface CVLabelledItem {
  label: string;
  text: string;
}

export interface CVLink {
  label: string;
  url: string;
}

export interface CVProject {
  id: string;
  name: string;
  stack: string;
  url: string | null;
  description: string;
  /** Extra links shown under the project, e.g. individual dashboards. */
  extraLinks: CVLink[];
}

/**
 * CV-specific content that isn't already covered by personal/experience/skills
 * data. The CV accessor composes this with those sources so the résumé and
 * the rest of the site can never drift out of sync.
 */
export interface CVOwnContent {
  /** Short stack line shown after the title, e.g. "NestJS • React • …". */
  headline: string;
  /** Shown beside the location, e.g. "Open to Remote". */
  availability: string | null;
  /** Public URL of this portfolio, printed in the CV header. */
  portfolioUrl: string;
  /** May contain **bold** markers. */
  summary: string;
  skills: CVLabelledItem[];
  aiEngineering: {
    heading: string;
    items: CVLabelledItem[];
  };
  /** CV bullets per experience entry, keyed by `ExperienceEntry.id`. */
  experienceHighlights: Record<string, string[]>;
  projectsHeading: string;
  projects: CVProject[];
  education: EducationEntry[];
}

export interface CVData extends Omit<CVOwnContent, "experienceHighlights" | "portfolioUrl"> {
  name: string;
  title: string;
  location: string | null;
  email: string | null;
  phone: string | null;
  experience: ExperienceEntry[];
  links: {
    github: string | null;
    linkedin: string | null;
    portfolio: string;
  };
}
