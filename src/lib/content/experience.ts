import experienceData from "@/content/experience.json";
import type { ExperienceEntry, ExperienceSectionContent } from "@/types";

const experienceSection = experienceData satisfies ExperienceSectionContent & {
  items: ExperienceEntry[];
};

export function getExperienceSectionCopy(): ExperienceSectionContent {
  return { sectionLabel: experienceSection.sectionLabel, heading: experienceSection.heading };
}

export function getExperience(): ExperienceEntry[] {
  return experienceSection.items;
}
