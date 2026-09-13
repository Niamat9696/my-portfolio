export type SocialIcon = "github" | "linkedin" | "mail" | "fiverr" | "upwork";

export interface SocialLink {
  platform: string;
  icon: SocialIcon;
  /** `null` when no verified URL exists yet — must be hidden, never fabricated. */
  url: string | null;
  ariaLabel: string;
}
