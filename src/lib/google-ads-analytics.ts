type EventParams = Record<string, string | number | boolean | undefined>;

const firedOnceKeys = new Set<string>();

/**
 * Conversion action for the PPC Google Ads account (AW-18263994803) that runs
 * traffic to /services/digital-marketing/google-ads. The account is registered
 * in that route's layout.tsx — this is a different account and label from the
 * site-wide gtag_report_conversion helper in the root layout, so both fire on a
 * successful lead from this page.
 */
const PPC_LEAD_CONVERSION_SEND_TO = "AW-18263994803/r6EbCPGY6MMcELPj-YRE";

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

/**
 * Fires the PPC lead conversion for the Google Ads service page.
 * Call this only after a lead has actually been submitted successfully.
 * Never throws — tracking must not break the submit flow.
 */
export function trackGoogleAdsPpcConversion(): void {
  if (typeof window === "undefined") return;

  try {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "conversion", {
      send_to: PPC_LEAD_CONVERSION_SEND_TO,
      value: 1.0,
      currency: "USD",
    });
  } catch {
    // Conversion tracking must never break the page.
  }
}
