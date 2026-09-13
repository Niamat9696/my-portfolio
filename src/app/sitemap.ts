import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/site";
import { getProjectSlugs } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes = getProjectSlugs().map((slug) => ({
    url: `${SITE_URL}/projects/${slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: SITE_URL, lastModified: new Date() },
    ...projectRoutes,
  ];
}
