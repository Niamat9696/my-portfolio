import personalData from "@/content/personal.json";
import type { PersonalInfo } from "@/types";

export function getPersonalInfo(): PersonalInfo {
  return personalData satisfies PersonalInfo;
}
