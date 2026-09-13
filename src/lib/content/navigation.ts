import navigationData from "@/content/navigation.json";
import type { NavigationContent } from "@/types";

export function getNavigation(): NavigationContent {
  return navigationData satisfies NavigationContent;
}
