import { getGoogleAdsAttribution } from "@/lib/google-ads-attribution";
import { sanitizeShopifyCheckoutAttribution } from "@/lib/shopify-checkout-attribution";

const key = "zevitech-shopify-attribution-v1";
// Attribution only: no raw URL or customer fields are persisted in the browser.
export function readShopifyCheckoutAttribution() {
  if (typeof window === "undefined") return undefined;
  try {
    const stored = sanitizeShopifyCheckoutAttribution(JSON.parse(window.sessionStorage.getItem(key) || "null"));
    if (stored) return stored;
  } catch { /* Fall back to entry URL if storage is unavailable. */ }
  const fromUrl = sanitizeShopifyCheckoutAttribution(Object.fromEntries(new URLSearchParams(window.location.search)));
  return fromUrl || sanitizeShopifyCheckoutAttribution(getGoogleAdsAttribution(true));
}
export function captureShopifyCheckoutAttribution() {
  const attribution = readShopifyCheckoutAttribution();
  if (!attribution || typeof window === "undefined") return;
  try { window.sessionStorage.setItem(key, JSON.stringify(attribution)); } catch { /* Never block customization. */ }
}
