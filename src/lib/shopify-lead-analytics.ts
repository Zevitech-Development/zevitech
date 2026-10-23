import { configureShopifyAds, isShopifyProductionBrowser, shopifyAdsDestination } from "@/lib/shopify-ads-analytics";

type Sender = (command: "event", name: string, params: Record<string, unknown>) => void;
type Intent = "checkout" | "quote";
type MarkerStore = Pick<Storage, "getItem" | "setItem">;
const ga4 = "G-4V3XW7Q5EG";
const validLeadId = /^lead-[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;

/** Track the durable server receipt, never form fields, contact data or a purchase. */
export function createShopifySavedLeadTracker() {
  const queued = new Set<string>();
  return (id: string, intent: Intent, sender?: Sender, storage?: MarkerStore, leadDestination?: string): boolean => {
    if (!validLeadId.test(id) || !["checkout", "quote"].includes(intent) || !sender) return false;
    const destinations = [{ name: "generate_lead", destination: ga4, params: { lead_source: intent === "quote" ? "shopify_quote" : "shopify_store_checkout", event_id: id } as Record<string, unknown> }];
    const ads = shopifyAdsDestination(leadDestination);
    if (ads) destinations.push({ name: "conversion", destination: ads, params: { transaction_id: id } });
    let complete = true;
    for (const event of destinations) {
      const key = `zevitech-shopify-lead-v2:${id}:${event.name}:${event.destination}`;
      let recorded = queued.has(key);
      try {
        recorded ||= storage?.getItem(key) === "sent";
        // Existing quote receipts may already have sent their GA4 lead event.
        if (event.destination === ga4) recorded ||= storage?.getItem(`zevitech-shopify-quote-v1:${id}`) === "sent";
      } catch { /* Memory guard remains. */ }
      if (recorded) continue;
      try {
        // A gtag queue can be discarded by navigation before its library loads.
        // Dedupe within this document now, but persist only after its callback.
        queued.add(key);
        sender("event", event.name, {
          ...event.params,
          send_to: event.destination,
          event_callback: () => {
            try { storage?.setItem(key, "sent"); } catch { /* Memory dedupe remains. */ }
          },
        });
      } catch { queued.delete(key); complete = false; }
    }
    return complete;
  };
}

/** Retained for existing quote callers; checkout leads share the same receipt logic. */
export function createShopifyQuoteTracker() {
  const track = createShopifySavedLeadTracker();
  return (id: string, sender?: Sender, storage?: MarkerStore, destination?: string) => track(id, "quote", sender, storage, destination);
}

const track = createShopifySavedLeadTracker();
const pending = new Set<string>();
export function trackShopifySavedLead(id: string, intent: Intent) {
  if (!isShopifyProductionBrowser() || !validLeadId.test(id) || pending.has(id)) return;
  pending.add(id);
  let attempts = 0;
  const sendWhenReady = () => {
    const sender = (window as Window & { gtag?: Sender }).gtag;
    let storage: Storage | undefined;
    try { storage = window.localStorage; } catch { /* Memory fallback. */ }
    const complete = configureShopifyAds() && track(id, intent, typeof sender === "function" ? sender : undefined, storage, process.env.NEXT_PUBLIC_SHOPIFY_ADS_LEAD_SEND_TO);
    if (!complete && ++attempts < 20) setTimeout(sendWhenReady, 1000);
    else pending.delete(id);
  };
  sendWhenReady();
}

export function trackShopifyQuoteLead(id: string) { trackShopifySavedLead(id, "quote"); }
