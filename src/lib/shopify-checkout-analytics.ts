import type { ShopifyCheckoutPublicOrder } from "@/interfaces/shopify-checkout-interface";
import { getShopifyPaymentSchedule, SHOPIFY_PAYMENT_VERSION } from "@/lib/shopify-payment-schedule";

type EventName = "generate_lead" | "begin_checkout" | "purchase" | "conversion";
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
      const schedule = getShopifyPaymentSchedule(order.totalAmount);
      if (order.paymentVersion !== SHOPIFY_PAYMENT_VERSION || order.amount !== schedule.upfront
        || order.upfrontAmount !== schedule.upfront || order.balanceAmount !== schedule.balance
        || (order.status === "paid" && order.amountPaid !== schedule.upfront)) return [];
    } catch { return []; }
  }
  // Historical full-payment receipts retain their historical sale value. New
  // instalments report only the approved deposit, never the remaining contract.
  const collectedAmount = order.amountPaid ?? order.amount;
  const item = { item_id: `shopify-${order.packageName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`, item_name: `${order.packageName} Shopify development${isUpfront ? " — 40% upfront" : ""}`, price: order.amount, quantity: 1 };
  const commerce = { currency: order.currency, value: order.amount, items: [item], ...(isUpfront ? { payment_stage: "upfront" } : {}) };
  const events: Event[] = [
    { name: "generate_lead", destination: ga4, params: { lead_source: "shopify_store_checkout" } },
    { name: "begin_checkout", destination: ga4, params: commerce },
  ];
  if (order.status === "paid" && collectedAmount === order.amount && order.transactionId && /^[A-Za-z0-9_-]{1,100}$/.test(order.transactionId)) {
    events.push({ name: "purchase", destination: ga4, params: { ...commerce, value: collectedAmount, transaction_id: order.id } });
    // A dedicated Purchase action must be configured; never use the site's lead action.
    if (purchaseDestination && /^AW-\d+\/[A-Za-z0-9_-]+$/.test(purchaseDestination)) {
      events.push({ name: "conversion", destination: purchaseDestination, params: { currency: order.currency, value: collectedAmount, transaction_id: order.id } });
    }
  }
  return events;
}

/** Storage plus memory guards cover rerenders, recovery and blocked browser storage. */
export function createShopifyCheckoutTracker() {
  const sent = new Set<string>();
  return (order: ShopifyCheckoutPublicOrder, sender?: Sender, storage?: MarkerStore, purchaseDestination?: string): boolean => {
    const events = shopifyCheckoutEvents(order, purchaseDestination);
    if (!events.length) return true;
    if (!sender) return false;
    let complete = true;
    for (const event of events) {
      const marker = `zevitech-shopify-event-v1:${order.id}:${event.name}:${event.destination}`;
      let recorded = sent.has(marker);
      try { recorded ||= storage?.getItem(marker) === "sent"; } catch { /* Memory fallback. */ }
      if (recorded) continue;
      try {
        sender("event", event.name, { ...event.params, send_to: event.destination });
        sent.add(marker);
        try { storage?.setItem(marker, "sent"); } catch { /* Payment must not depend on storage. */ }
      } catch { complete = false; }
    }
    return complete;
  };
}

const dispatch = createShopifyCheckoutTracker();
export function trackShopifyCheckoutOrder(order: ShopifyCheckoutPublicOrder): boolean {
  if (typeof window === "undefined" || process.env.NODE_ENV !== "production"
    || !["zevitech.com", "www.zevitech.com"].includes(window.location.hostname)) return true;
  const sender = (window as Window & { gtag?: Sender }).gtag;
  let storage: Storage | undefined;
  try { storage = window.localStorage; } catch { /* Use the in-memory guard. */ }
  return dispatch(order, typeof sender === "function" ? sender : undefined, storage, process.env.NEXT_PUBLIC_SHOPIFY_ADS_PURCHASE_SEND_TO);
}
