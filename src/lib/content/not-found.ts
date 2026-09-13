import notFoundData from "@/content/not-found.json";
import type { NotFoundContent } from "@/types";

export function getNotFoundContent(): NotFoundContent {
  return notFoundData satisfies NotFoundContent;
}
