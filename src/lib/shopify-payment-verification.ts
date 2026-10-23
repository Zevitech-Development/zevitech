import type { ShopifyCheckoutPublicOrder } from "@/interfaces/shopify-checkout-interface";

/** Read-only, bounded verification. Never submits or retries a charge. */
export function verifyShopifyPayment(
  read: () => Promise<ShopifyCheckoutPublicOrder>,
  resolved: (order: ShopifyCheckoutPublicOrder) => void,
  unresolved: () => void,
  verificationEndsAt?: string,
) {
  let stopped = false;
  const expires = verificationEndsAt ? Date.parse(verificationEndsAt) : NaN;
  const remaining = Number.isFinite(expires) ? Math.max(0, Math.min(120000, expires - Date.now())) : 120000;
  let next: ReturnType<typeof setTimeout>;
  const stop = () => { stopped = true; clearTimeout(next); clearTimeout(deadline); };
  const deadline = setTimeout(() => { stop(); unresolved(); }, remaining || 20000);
  async function check() {
    try {
      const order = await read();
      if (stopped) return;
      if (!["pending", "processing"].includes(order.status)) { stop(); resolved(order); return; }
    } catch { /* A failed status lookup cannot establish a failed payment. */ }
    if (!stopped && remaining === 0) { stop(); unresolved(); return; }
    if (!stopped) next = setTimeout(check, 10000);
  }
  next = setTimeout(check, remaining === 0 ? 0 : 3000);
  return stop;
}
