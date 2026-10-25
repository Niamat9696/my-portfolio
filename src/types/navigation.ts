export interface NavLink {
  label: string;
  href: string;
}

export interface NavigationContent {
  brand: string;
  links: NavLink[];
  downloadCvLabel: string;
  /** Shown briefly on the Download CV button after it is clicked. */
  downloadCvStartedLabel: string;
}
