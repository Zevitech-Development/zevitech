type EventParams = Record<string, string | number | boolean | undefined>;

const firedOnceKeys = new Set<string>();

/**
 * Sends a GA4 analytics event through the existing gtag instance.
 * Never sends Ads conversion events (those fire only through
 * gtag_report_conversion after a successful lead) and never throws.
 */
export function trackGoogleAdsEvent(name: string, params?: EventParams): void {
  if (typeof window === "undefined") return;

  try {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", name, {
      page_context: "google-ads-landing",
      ...params,
    });
  } catch {
    // Analytics must never break the page.
  }
}

/**
 * Fires an event at most once per key per page load — used for
 * engagement signals like roadmap stage views.
 */
export function trackGoogleAdsEventOnce(
  key: string,
  name: string,
  params?: EventParams,
): void {
  if (firedOnceKeys.has(key)) return;
  firedOnceKeys.add(key);
  trackGoogleAdsEvent(name, params);
}
