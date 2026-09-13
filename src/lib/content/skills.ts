import skillsData from "@/content/skills.json";
import type { SkillGroup, SkillsSectionContent } from "@/types";

const skillsSection = skillsData satisfies SkillsSectionContent & { groups: SkillGroup[] };

export function getSkillsSectionCopy(): SkillsSectionContent {
  return { sectionLabel: skillsSection.sectionLabel, heading: skillsSection.heading };
}

export function getSkillGroups(): SkillGroup[] {
  return skillsSection.groups;
}
