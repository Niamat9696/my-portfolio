import processData from "@/content/process.json";
import type { ProcessContent } from "@/types";

export function getProcess(): ProcessContent {
  return processData satisfies ProcessContent;
}
