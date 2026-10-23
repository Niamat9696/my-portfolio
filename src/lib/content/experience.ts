import experienceData from "@/content/experience.json";
import type { ExperienceEntry, ExperienceSectionContent } from "@/types";

const experienceSection = experienceData satisfies ExperienceSectionContent & {
  items: ExperienceEntry[];
};

export function getExperienceSectionCopy(): ExperienceSectionContent {
  return { sectionLabel: experienceSection.sectionLabel, heading: experienceSection.heading };
}

export function getExperience(): ExperienceEntry[] {
  return [...experienceSection.items].sort((a, b) => {
    if (a.isCurrent !== b.isCurrent) return a.isCurrent ? -1 : 1;
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });
}
