import { Mail } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import type { SocialIcon as SocialIconKey } from "@/types";

const iconMap: Partial<Record<SocialIconKey, ComponentType<SVGProps<SVGSVGElement>>>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: Mail,
};

interface SocialIconProps {
  icon: SocialIconKey;
  className?: string;
}

/** Fiverr/Upwork have no bundled icon; they fall back to null and should be hidden by the caller if unmapped. */
export function SocialIcon({ icon, className = "h-5 w-5" }: SocialIconProps) {
  const Icon = iconMap[icon];
  if (!Icon) return null;
  return <Icon className={className} aria-hidden="true" />;
}
