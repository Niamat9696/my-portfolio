export interface CtaLink {
  label: string;
  href: string;
}

export interface HeroContent {
  greeting: string;
  headline: string;
  rotatingWords: string[];
  description: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
}

export interface CredibilityItem {
  label: string;
  value: string;
}

export interface CredibilityContent {
  items: CredibilityItem[];
}

export interface SummaryPanel {
  title: string;
  items: string[];
}

export interface AboutContent {
  sectionLabel: string;
  heading: string;
  paragraphs: string[];
  summaryPanel: SummaryPanel;
}

export interface ProjectsSectionContent {
  sectionLabel: string;
  heading: string;
}

export interface ExperienceSectionContent {
  sectionLabel: string;
  heading: string;
}

export interface SkillsSectionContent {
  sectionLabel: string;
  heading: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ProcessContent {
  sectionLabel: string;
  heading: string;
  steps: ProcessStep[];
}

export interface AchievementsSectionContent {
  sectionLabel: string;
  heading: string;
}

export interface ContactContent {
  sectionLabel: string;
  heading: string;
  description: string;
  copyEmailLabel: string;
  copiedLabel: string;
  ctaLabel: string;
}

export interface FooterContent {
  tagline: string;
  builtWithLabel: string;
}

export interface NotFoundContent {
  title: string;
  message: string;
  ctaLabel: string;
}
