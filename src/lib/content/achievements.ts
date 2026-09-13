import achievementsData from "@/content/achievements.json";
import type { Achievement, AchievementsSectionContent } from "@/types";

const achievementsSection = achievementsData satisfies AchievementsSectionContent & {
  items: Achievement[];
};

export function getAchievementsSectionCopy(): AchievementsSectionContent {
  return {
    sectionLabel: achievementsSection.sectionLabel,
    heading: achievementsSection.heading,
  };
}

export function getAchievements(): Achievement[] {
  return achievementsSection.items;
}
