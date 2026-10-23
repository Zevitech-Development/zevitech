import { getGoogleAdsAttribution } from "@/lib/google-ads-attribution";
import { sanitizeShopifyCheckoutAttribution } from "@/lib/shopify-checkout-attribution";
import type { ShopifyCheckoutAttribution } from "@/interfaces/shopify-checkout-interface";

const key = "zevitech-shopify-attribution-v2";
const legacyKey = "zevitech-shopify-attribution-v1";
const retentionMs = 90 * 24 * 60 * 60 * 1000;
type AttributionRecord = { version: 2; capturedAt: number; attribution: ShopifyCheckoutAttribution };

function storageFor(kind: "localStorage" | "sessionStorage"): Storage | undefined {
  try { return window[kind]; } catch { return undefined; }
}
function storedRecord(storage: Storage | undefined, now: number): { present: boolean; record?: AttributionRecord } {
  try {
    const raw = storage?.getItem(key);
    if (!raw) return { present: false };
    const value = JSON.parse(raw);
    const attribution = sanitizeShopifyCheckoutAttribution(value?.attribution);
    if (value?.version === 2 && Number.isFinite(value.capturedAt) && value.capturedAt > 0
      && value.capturedAt <= now && now - value.capturedAt < retentionMs && attribution) {
      return { present: true, record: { version: 2, capturedAt: value.capturedAt, attribution } };
    }
    // Remove expired identifiers. Keep a tiny migration marker so an older
    // session value cannot resurrect an expired ad click on the next read.
    storage?.setItem(key, JSON.stringify({ version: 2, capturedAt: 0 }));
    return { present: true };
  } catch { return { present: false }; }
}
function currentRecord(): AttributionRecord | undefined {
  if (typeof window === "undefined") return undefined;
  const now = Date.now();
  const local = storedRecord(storageFor("localStorage"), now);
  const session = storedRecord(storageFor("sessionStorage"), now);
  const stored = [local.record, session.record].filter((record): record is AttributionRecord => Boolean(record))
    .sort((left, right) => right.capturedAt - left.capturedAt)[0];
  const fromUrl = sanitizeShopifyCheckoutAttribution(Object.fromEntries(new URLSearchParams(window.location.search)));
  if (fromUrl?.gclid || fromUrl?.gbraid || fromUrl?.wbraid) {
    const sameClick = stored && ["gclid", "gbraid", "wbraid"].every(field =>
      stored.attribution[field as keyof ShopifyCheckoutAttribution] === fromUrl[field as keyof ShopifyCheckoutAttribution]);
    return { version: 2, capturedAt: sameClick ? stored.capturedAt : now, attribution: fromUrl };
  }
  // Direct visits and non-click campaign links cannot replace an attributed ad.
  if (stored) return stored;
  if (!local.present && !session.present) {
    let legacy: ShopifyCheckoutAttribution | undefined;
    try { legacy = sanitizeShopifyCheckoutAttribution(JSON.parse(storageFor("sessionStorage")?.getItem(legacyKey) || "null")); } catch { /* Try the older Google helper. */ }
    legacy ||= sanitizeShopifyCheckoutAttribution(getGoogleAdsAttribution(true));
    if (legacy) return { version: 2, capturedAt: now, attribution: legacy };
  }
  return fromUrl ? { version: 2, capturedAt: now, attribution: fromUrl } : undefined;
}

// Attribution only: no raw URL or customer fields are persisted in the browser.
export function readShopifyCheckoutAttribution() { return currentRecord()?.attribution; }
export function captureShopifyCheckoutAttribution() {
  const record = currentRecord();
  if (!record || typeof window === "undefined") return;
  for (const kind of ["localStorage", "sessionStorage"] as const) {
    try { storageFor(kind)?.setItem(key, JSON.stringify(record)); } catch { /* Never block customization. */ }
  }
}
