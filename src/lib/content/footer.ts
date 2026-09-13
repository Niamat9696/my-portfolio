import footerData from "@/content/footer.json";
import type { FooterContent } from "@/types";

export function getFooter(): FooterContent {
  return footerData satisfies FooterContent;
}
