/**
 * Production domain. Set NEXT_PUBLIC_SITE_URL when a real domain is
 * registered — canonical URLs, sitemap, robots.txt, and Open Graph metadata
 * all read from this constant.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://niamatullah.dev";

export const SITE_NAME = "Niamat Ullah";
export const SITE_TITLE = "Niamat Ullah | Senior Full-Stack Developer";
export const SITE_TAGLINE = "Scalable Web Apps • Backend Systems • AI Products";
export const SITE_DESCRIPTION =
  "Senior Full-Stack Developer specializing in Full-Stack Development, React, Next.js, Node.js, NestJS, backend architecture, AI integrations, SaaS, and cloud deployment.";
