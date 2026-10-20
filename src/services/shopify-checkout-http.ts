import { NextRequest, NextResponse } from "next/server";
import type { ShopifyCheckoutConfig } from "@/interfaces/shopify-checkout-interface";
import { ShopifyCheckoutAccessSchema, ShopifyCheckoutPaySchema } from "@/schemas/shopify-checkout-schema";
import { createNmiCheckoutGateway } from "@/services/shopify-checkout-nmi";
import { cancelShopifyCheckout, checkShopifyCheckout, createShopifyCheckoutOrder, payShopifyCheckout, ShopifyCheckoutError } from "@/services/shopify-checkout-service";
import { createCheckoutStore, hashCheckoutValue, resolveCheckoutRedisConfig } from "@/services/shopify-checkout-store";

const response = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });

export function shopifyCheckoutConfig(): ShopifyCheckoutConfig {
  const mode = process.env.SHOPIFY_CHECKOUT_MODE === "live" ? "live" : "sandbox";
  const origin = process.env.SHOPIFY_CHECKOUT_ORIGIN;
  const available = process.env.SHOPIFY_CHECKOUT_ENABLED === "true"
    && process.env.SHOPIFY_CHECKOUT_TERMS_APPROVED === "true"
    && ["sandbox", "live"].includes(process.env.SHOPIFY_CHECKOUT_MODE || "")
    && Boolean(process.env.NMI_SECURITY_KEY && process.env.NEXT_PUBLIC_NMI_TOKENIZATION_KEY
      && resolveCheckoutRedisConfig()
      && origin && (mode !== "live" || (origin.startsWith("https://") && process.env.VERCEL_ENV === "production")));
  return { available, mode, ...(available ? {
    tokenizationKey: process.env.NEXT_PUBLIC_NMI_TOKENIZATION_KEY,
    scriptUrl: `${mode === "live" ? "https://secure.nmi.com" : "https://sandbox.nmi.com"}/token/Collect.js`,
    statementDescriptor: process.env.SHOPIFY_CHECKOUT_STATEMENT_DESCRIPTOR,
  } : {}) };
}

export function checkoutConfigResponse() { return response(shopifyCheckoutConfig()); }

export async function checkoutHttp(request: NextRequest, action: "create" | "pay" | "status" | "cancel") {
  try {
    const config = shopifyCheckoutConfig();
    if (!config.available) return response({ error: "CHECKOUT_UNAVAILABLE" }, 503);
    const origin = request.headers.get("origin");
    const expected = new URL(process.env.SHOPIFY_CHECKOUT_ORIGIN!).origin;
    if (origin !== expected || new URL(request.url).origin !== expected || request.headers.get("sec-fetch-site") === "cross-site") return response({ error: "REQUEST_NOT_ALLOWED" }, 403);
    if (!request.headers.get("content-type")?.includes("application/json")) return response({ error: "INVALID_REQUEST" }, 415);
    if (Number(request.headers.get("content-length")) > 32768) return response({ error: "REQUEST_TOO_LARGE" }, 413);
    const raw = await request.text();
    if (Buffer.byteLength(raw, "utf8") > 32768) return response({ error: "REQUEST_TOO_LARGE" }, 413);
    const input = JSON.parse(raw);
    const store = createCheckoutStore();
    const ipHash = hashCheckoutValue(request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown");
    if (!await store.rateLimit(`${action}:${ipHash}`, action === "status" ? 30 : 10, 600)) return response({ error: "TOO_MANY_REQUESTS" }, 429);
    if (action === "create") return response({ order: await createShopifyCheckoutOrder(input, store, config.mode) });
    const gateway = createNmiCheckoutGateway();
    if (action === "pay") {
      const parsed = ShopifyCheckoutPaySchema.safeParse(input);
      if (!parsed.success) return response({ error: "INVALID_DETAILS" }, 400);
      return response({ order: await payShopifyCheckout(parsed.data, store, gateway, config.mode) });
    }
    const parsed = ShopifyCheckoutAccessSchema.safeParse(input);
    if (!parsed.success) return response({ error: "INVALID_DETAILS" }, 400);
    if (action === "cancel") return response({ order: await cancelShopifyCheckout(parsed.data.orderId, parsed.data.accessToken, store) });
    return response({ order: await checkShopifyCheckout(parsed.data.orderId, parsed.data.accessToken, store, gateway, config.mode) });
  } catch (error) {
    if (error instanceof ShopifyCheckoutError) return response({ error: error.code }, error.status);
    if (error instanceof SyntaxError) return response({ error: "INVALID_REQUEST" }, 400);
    // Never log request bodies, gateway responses, payment tokens or credentials.
    return response({ error: "CHECKOUT_UNCONFIRMED" }, 503);
  }
}
