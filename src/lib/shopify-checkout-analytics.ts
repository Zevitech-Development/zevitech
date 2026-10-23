import type { ShopifyCheckoutPublicOrder } from "@/interfaces/shopify-checkout-interface";
import { getShopifyPaymentSchedule, SHOPIFY_PAYMENT_VERSION, shopifyUpfrontPercent } from "@/lib/shopify-payment-schedule";
import { configureShopifyAds, isShopifyProductionBrowser, shopifyAdsDestination } from "@/lib/shopify-ads-analytics";

type EventName = "begin_checkout" | "purchase" | "conversion";
type Event = { name: EventName; destination: string; params: Record<string, unknown> };
type Sender = (command: "event", name: EventName, params: Record<string, unknown>) => void;
type MarkerStore = Pick<Storage, "getItem" | "setItem">;
const ga4 = "G-4V3XW7Q5EG";

/** Accept only the server's public order, never form fields or contact details. */
export function shopifyCheckoutEvents(order: ShopifyCheckoutPublicOrder, purchaseDestination?: string): Event[] {
  if (order.mode !== "live" || order.status === "cancelled" || !/^ZVT-[a-f0-9]{32}$/.test(order.id)
    || !Number.isFinite(order.amount) || order.amount <= 0 || order.currency !== "USD") return [];
  const isUpfront = order.paymentStage === "upfront";
  if (isUpfront) {
    try {
      const schedule = getShopifyPaymentSchedule(order.totalAmount, shopifyUpfrontPercent(order.paymentVersion));
      if ((order.paymentVersion !== SHOPIFY_PAYMENT_VERSION && order.paymentVersion !== "upfront-10-v2" && order.paymentVersion !== "upfront-40-v1") || order.amount !== schedule.upfront
        || order.upfrontAmount !== schedule.upfront || order.balanceAmount !== schedule.balance
        || (order.status === "paid" && order.amountPaid !== schedule.upfront)) return [];
    } catch { return []; }
  }
  // Historical full-payment receipts retain their historical sale value. New
  // instalments report only the approved deposit, never the remaining contract.
  const collectedAmount = order.amountPaid ?? order.amount;
  const item = { item_id: `shopify-${order.packageName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`, item_name: `${order.packageName} Shopify development${isUpfront ? ` — ${shopifyUpfrontPercent(order.paymentVersion)}% upfront` : ""}`, price: order.amount, quantity: 1 };
  const commerce = { currency: order.currency, value: order.amount, items: [item], ...(isUpfront ? { payment_stage: "upfront" } : {}) };
  const events: Event[] = [
    { name: "begin_checkout", destination: ga4, params: commerce },
  ];
  if (order.status === "paid" && collectedAmount === order.amount && order.transactionId && /^[A-Za-z0-9_-]{1,100}$/.test(order.transactionId)) {
    events.push({ name: "purchase", destination: ga4, params: { ...commerce, value: collectedAmount, transaction_id: order.id } });
    // A dedicated Purchase action must be configured; never use the site's lead action.
    if (purchaseDestination && shopifyAdsDestination(purchaseDestination)) {
      events.push({ name: "conversion", destination: purchaseDestination, params: { currency: order.currency, value: collectedAmount, transaction_id: order.id } });
    }
  }
  return events;
}

/** Queue once per document; persist only when the Google tag processes the event. */
export function createShopifyCheckoutTracker() {
  const queued = new Set<string>();
  return (order: ShopifyCheckoutPublicOrder, sender?: Sender, storage?: MarkerStore, purchaseDestination?: string): boolean => {
    const events = shopifyCheckoutEvents(order, purchaseDestination);
    if (!events.length) return true;
    if (!sender) return false;
    let complete = true;
    for (const event of events) {
      const marker = `zevitech-shopify-event-v1:${order.id}:${event.name}:${event.destination}`;
      let recorded = queued.has(marker);
      try { recorded ||= storage?.getItem(marker) === "sent"; } catch { /* Memory fallback. */ }
      if (recorded) continue;
      try {
        // gtag may only be its pre-load queue. A navigation can discard that
        // queue, so accepting the call alone must not suppress a later retry.
        queued.add(marker);
        sender("event", event.name, {
          ...event.params,
          send_to: event.destination,
          event_callback: () => {
            try { storage?.setItem(marker, "sent"); } catch { /* Memory dedupe still works. */ }
          },
        });
      } catch { queued.delete(marker); complete = false; }
    }
    return complete;
  };
}

const dispatch = createShopifyCheckoutTracker();
export function trackShopifyCheckoutOrder(order: ShopifyCheckoutPublicOrder): boolean {
  if (!isShopifyProductionBrowser()) return true;
  if (!configureShopifyAds()) return false;
  const sender = (window as Window & { gtag?: Sender }).gtag;
  let storage: Storage | undefined;
  try { storage = window.localStorage; } catch { /* Use the in-memory guard. */ }
  return dispatch(order, typeof sender === "function" ? sender : undefined, storage, process.env.NEXT_PUBLIC_SHOPIFY_ADS_PURCHASE_SEND_TO);
}

/** Paid events belong to the verified receipt page, after the full-page redirect. */
export function startShopifyCheckoutTracking(
  order: ShopifyCheckoutPublicOrder,
  phase: "checkout" | "confirmation",
  tracker: (order: ShopifyCheckoutPublicOrder) => boolean = trackShopifyCheckoutOrder,
): () => void {
  if ((phase === "checkout" && order.status === "paid") || (phase === "confirmation" && order.status !== "paid")) return () => {};
  let cancelled = false;
  let attempts = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const sendWhenReady = () => {
    if (cancelled) return;
    if (!tracker(order) && ++attempts < 60) timer = setTimeout(sendWhenReady, 1000);
  };
  sendWhenReady();
  return () => { cancelled = true; if (timer) clearTimeout(timer); };
}
