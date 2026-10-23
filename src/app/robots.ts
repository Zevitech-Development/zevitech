import { MetadataRoute } from "next";
import { SITE_URL } from "@/utils/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Transactional pages serve noindex. Allow crawling so search engines
      // can actually read that directive; robots blocking cannot deindex URLs.
      disallow: ["/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
