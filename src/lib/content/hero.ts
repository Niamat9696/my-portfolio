import heroData from "@/content/hero.json";
import type { HeroContent } from "@/types";

export function getHero(): HeroContent {
  return heroData satisfies HeroContent;
}
