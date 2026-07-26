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
 * Secondary (observation-only) conversion for a confirmed Calendly booking on
 * the same PPC account. Fires only on calendly.event_scheduled — never on
 * opening the scheduler or picking a time.
 */
const PPC_BOOKING_CONVERSION_SEND_TO = "AW-18263994803/qzLGCI_kvNYcELPj-YRE";

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
 * Normalizes a phone number to the E.164 form Google Ads needs for enhanced
 * conversion matching ("+13022176872"). Bare 10-digit input is treated as US,
 * which matches this page's audience; international visitors need to type their
 * own "+" prefix for a reliable match.
 */
export function normalizePhoneNumber(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";

  const hadPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");
  if (!digits) return "";

  if (hadPlus) return `+${digits}`;
  if (digits.length === 10) return `+1${digits}`;
  return `+${digits}`;
}

/**
 * Fires the PPC lead conversion for the Google Ads service page.
 * Call this only after the backend confirms the lead was sent.
 * Never throws — tracking must not break the submit flow.
 */
export function trackGoogleAdsPpcLeadConversion(userData?: {
  email?: string;
  phone?: string;
}): void {
  if (typeof window === "undefined") return;

  try {
    if (typeof window.gtag !== "function") return;

    const params: Record<string, unknown> = {
      send_to: PPC_LEAD_CONVERSION_SEND_TO,
      value: 1.0,
      currency: "USD",
      transaction_id: `lead-${Date.now()}`,
    };

    // Enhanced conversions: gtag hashes these itself, so pass plain values.
    // Attached to this event rather than via gtag("set", "user_data", …) so it
    // stays out of the site-wide conversion that sends its own hashed user_data.
    const email = userData?.email?.trim().toLowerCase();
    const phoneNumber = userData?.phone ? normalizePhoneNumber(userData.phone) : "";

    if (email || phoneNumber) {
      params.user_data = {
        ...(email ? { email } : {}),
        ...(phoneNumber ? { phone_number: phoneNumber } : {}),
      };
    }

    window.gtag("event", "conversion", params);
  } catch {
    // Conversion tracking must never break the page.
  }
}

/**
 * Fires the PPC booking conversion after Calendly confirms a scheduled event.
 * `bookingId` is the Calendly event id, used as transaction_id so Google
 * de-duplicates if the same booking is ever reported twice.
 */
export function trackGoogleAdsPpcBookingConversion(bookingId: string): void {
  if (typeof window === "undefined") return;

  try {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "conversion", {
      send_to: PPC_BOOKING_CONVERSION_SEND_TO,
      value: 1.0,
      currency: "USD",
      transaction_id: bookingId,
    });
  } catch {
    // Conversion tracking must never break the page.
  }
}
