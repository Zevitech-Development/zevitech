const ATTRIBUTION_STORAGE_KEY = "zevitech-google-ads-attribution";

const ATTRIBUTION_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
] as const;

export type GoogleAdsAttribution = Partial<
  Record<(typeof ATTRIBUTION_PARAMS)[number], string>
> & { landingPage?: string };

/**
 * Reads UTM parameters and gclid from the current URL and persists them
 * (first-touch) so they survive in-page navigation before form submission.
 * Safe to call multiple times; never throws.
 */
export function captureGoogleAdsAttribution(): void {
  if (typeof window === "undefined") return;

  try {
    const params = new URLSearchParams(window.location.search);
    const found: GoogleAdsAttribution = {};

    for (const key of ATTRIBUTION_PARAMS) {
      const value = params.get(key)?.trim();
      if (value) found[key] = value.slice(0, 240);
    }

    if (!Object.keys(found).length) return;

    const existingRaw = window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (existingRaw) return; // keep first-touch attribution

    found.landingPage = `${window.location.pathname}${window.location.search}`.slice(0, 500);
    window.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(found));
  } catch {
    // Storage unavailable (private mode, etc.) — never block the page.
  }
}

/**
 * Returns stored attribution, falling back to the live URL if storage is
 * empty. Returns undefined when nothing is available so the payload stays
 * clean for direct visits.
 */
export function getGoogleAdsAttribution(): GoogleAdsAttribution | undefined {
  if (typeof window === "undefined") return undefined;

  try {
    const stored = window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as GoogleAdsAttribution;
      if (parsed && typeof parsed === "object") return parsed;
    }
  } catch {
    // fall through to the live URL
  }

  try {
    const params = new URLSearchParams(window.location.search);
    const live: GoogleAdsAttribution = {};
    for (const key of ATTRIBUTION_PARAMS) {
      const value = params.get(key)?.trim();
      if (value) live[key] = value.slice(0, 240);
    }
    return Object.keys(live).length ? live : undefined;
  } catch {
    return undefined;
  }
}
