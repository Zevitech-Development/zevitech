import { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_FRONTEND_URL?.replace(/\/$/, "") ||
  "https://zevitech.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/payment/",
        "/payment",
        "/checkout-page",
        "/thankyou",
        "/api/",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
