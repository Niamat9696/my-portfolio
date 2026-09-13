import socialLinksData from "@/content/social-links.json";
import type { SocialLink } from "@/types";

// JSON string literals widen to `string`, so `SocialIcon` needs an explicit
// assertion here rather than `satisfies` (which cannot narrow them back).
const socialLinks = socialLinksData as SocialLink[];

export function getSocialLinks(): SocialLink[] {
  return socialLinks;
}

export type ConfiguredSocialLink = SocialLink & { url: string };

/** Only links with a verified URL — never render a link with no destination. */
export function getConfiguredSocialLinks(): ConfiguredSocialLink[] {
  return socialLinks.filter((link): link is ConfiguredSocialLink => link.url !== null);
}
