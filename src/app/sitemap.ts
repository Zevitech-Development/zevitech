import { MetadataRoute } from "next";

import { customProjectsData } from "@/content/portfolio/custom-projects-content";

const SITE_URL =
  process.env.NEXT_PUBLIC_FRONTEND_URL?.replace(/\/$/, "") ||
  "https://zevitech.com";

// All publicly indexable routes. Utility/transactional routes
// (/payment/*, /checkout-page, /thankyou) are intentionally excluded.
const staticRoutes: string[] = [
  "/",
  "/about-us",
  "/contact-us",
  "/portfolio",
  "/pricing",
  "/business-formation-ip-consultancy",
  "/privacy-policy",
  "/terms-service",

  // Services
  "/services/app-development/android-development",
  "/services/app-development/ios-development",
  "/services/app-development/game-development",
  "/services/app-development/app-testing",
  "/services/branding-design/product-packaging-label-design",
  "/services/branding-design/social-media-kit-design",
  "/services/design-&-development/custom-website-design",
  "/services/design-&-development/wordpress-web-design",
  "/services/design-&-development/joomla-website-development",
  "/services/design-&-development/php-website-development",
  "/services/digital-marketing/google-ads",
  "/services/digital-marketing/amazon-marketing",
  "/services/digital-marketing/social-media-marketing",
  "/services/ecommerce/custom-ecommerce-development",
  "/services/ecommerce/magento-website-development",
  "/services/ecommerce/woocommerce-website-development",
  "/services/ecommerce/opencart-website-development",
  "/services/ecommerce/wix-website-development",
  "/services/video-animation",
  "/services/web-maintenance",
  "/services/youtube-automation",

  // Landing pages
  "/landing-pages/logo-design",
  "/landing-pages/logo-design/2d-design",
  "/landing-pages/logo-design/3d-design",
  "/landing-pages/logo-design/animated-design",
  "/landing-pages/logo-design/customize-design",
  "/landing-pages/logo-design/mascot-design",
  "/landing-pages/logo-design/minimal-design",
  "/landing-pages/logo-design/wordmark-design",
  "/landing-pages/shopify-development",
  "/landing-pages/website-design",
  "/landing-pages/ai-calling",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));

  const projectRoutes: MetadataRoute.Sitemap = customProjectsData.map((project) => ({
    url: `${SITE_URL}/portfolio/custom-projects/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...routes, ...projectRoutes];
}
