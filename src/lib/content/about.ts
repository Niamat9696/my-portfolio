import aboutData from "@/content/about.json";
import type { AboutContent } from "@/types";

export function getAbout(): AboutContent {
  return aboutData satisfies AboutContent;
}
