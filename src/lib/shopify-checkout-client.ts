import type { ShopifyCheckoutConfig, ShopifyCheckoutPublicOrder } from "@/interfaces/shopify-checkout-interface";

export async function readShopifyCheckoutConfig(): Promise<ShopifyCheckoutConfig> {
  const response = await fetch("/api/shopify-checkout/config", { cache: "no-store" });
  if (!response.ok) throw new Error("CHECKOUT_UNAVAILABLE");
  return response.json();
}

export async function requestShopifyCheckout(action: "create" | "pay" | "status" | "cancel", input: unknown): Promise<ShopifyCheckoutPublicOrder> {
  const response = await fetch(`/api/shopify-checkout/${action}`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input), cache: "no-store", signal: AbortSignal.timeout(35000),
  });
  const data = await response.json();
  if (!response.ok || !data.order) throw new Error(data.error || "CHECKOUT_UNCONFIRMED");
  return data.order;
}

export interface CheckoutBrowserSession { requestId: string; orderId: string; accessToken: string }
const sessionKey = "zevitech-shopify-checkout-session-v1";
export function readCheckoutSession(): CheckoutBrowserSession | null {
  try {
    const saved = JSON.parse(sessionStorage.getItem(sessionKey) || "null");
    return saved && /^[a-f0-9]{64}$/.test(saved.accessToken) && /^ZVT-[a-f0-9]{32}$/.test(saved.orderId) ? saved : null;
  } catch { return null; }
}
export function createCheckoutSession(): CheckoutBrowserSession {
  const requestId = crypto.randomUUID();
  const accessToken = Array.from(crypto.getRandomValues(new Uint8Array(32)), (byte) => byte.toString(16).padStart(2, "0")).join("");
  const session = { requestId, accessToken, orderId: `ZVT-${requestId.replaceAll("-", "")}` };
  // Store only an opaque recovery credential, never card information or the brief.
  sessionStorage.setItem(sessionKey, JSON.stringify(session));
  return session;
}
export function clearCheckoutSession() { sessionStorage.removeItem(sessionKey); }
