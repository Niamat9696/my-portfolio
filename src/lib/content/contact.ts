import contactData from "@/content/contact.json";
import type { ContactContent } from "@/types";

export function getContact(): ContactContent {
  return contactData satisfies ContactContent;
}
