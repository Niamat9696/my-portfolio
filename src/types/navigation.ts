export interface NavLink {
  label: string;
  href: string;
}

export interface NavigationContent {
  brand: string;
  links: NavLink[];
  downloadCvLabel: string;
}
