export interface PersonalInfo {
  name: string;
  title: string;
  location: string | null;
  email: string | null;
  yearsOfExperience: number;
  /**
   * `null` means the availability indicator is not configured and must be
   * hidden entirely (see PORTFOLIO_SPEC.md section 8).
   */
  availableForOpportunities: boolean | null;
}
