export interface ExperienceEntry {
  id: string;
  company: string;
  position: string;
  /** ISO "YYYY-MM" format. `null` when not yet confirmed. */
  startDate: string | null;
  /** ISO "YYYY-MM" format. `null` for the current role. */
  endDate: string | null;
  isCurrent: boolean;
  description: string | null;
  achievements: string[];
  technologies: string[];
}
