const PRODUCTION_SITE_URL = "https://www.zevitech.com";

/** Public metadata must never advertise a local or deployment-preview origin. */
export function getPublicSiteUrl(configured?: string): string {
  if (!configured) return PRODUCTION_SITE_URL;
  try {
    const url = new URL(configured);
    if (["zevitech.com", "www.zevitech.com"].includes(url.hostname)) {
      return PRODUCTION_SITE_URL;
    }
    if (url.protocol !== "https:" || url.hostname === "localhost" ||
      url.hostname === "127.0.0.1" || url.hostname.endsWith(".vercel.app")) {
      return PRODUCTION_SITE_URL;
    }
    return url.origin;
  } catch {
    return PRODUCTION_SITE_URL;
  }
}

export const SITE_URL = getPublicSiteUrl(process.env.NEXT_PUBLIC_FRONTEND_URL);
