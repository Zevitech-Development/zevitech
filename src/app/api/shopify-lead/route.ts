import { NextRequest, NextResponse } from "next/server";
import { ShopifyLeadSchema } from "@/schemas/shopify-lead-schema";
import { captureShopifyLead, deliverStoredShopifyLead } from "@/services/shopify-lead-service";
import { createCheckoutStore, hashCheckoutValue, resolveCheckoutRedisConfig } from "@/services/shopify-checkout-store";

import { createShopifyLeadStore } from "@/services/shopify-lead-store";

export const runtime = "nodejs";
const response = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

/** Emails a pre-payment lead to the business mailbox. Never charges or creates an order. */
export async function POST(request: NextRequest) {
  try {
    const allowed = process.env.SHOPIFY_CHECKOUT_ORIGIN ? new URL(process.env.SHOPIFY_CHECKOUT_ORIGIN).origin : new URL(request.url).origin;
    if (request.headers.get("origin") !== allowed || request.headers.get("sec-fetch-site") === "cross-site") return response({ error: "REQUEST_NOT_ALLOWED" }, 403);
    const raw = await request.text();
    if (Buffer.byteLength(raw, "utf8") > 16384) return response({ error: "REQUEST_TOO_LARGE" }, 413);
    const parsed = ShopifyLeadSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) return response({ error: "INVALID_DETAILS" }, 400);
    if (resolveCheckoutRedisConfig()) {
      const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
      if (!await createCheckoutStore().rateLimit(`lead:${hashCheckoutValue(ip)}`, 5, 600)) return response({ error: "TOO_MANY_REQUESTS" }, 429);
    }
    const store = createShopifyLeadStore();
    const leadId = await captureShopifyLead(parsed.data, store);
    // Recover one older notification on normal traffic as well as scheduled retries.
    try {
      const pending = (await store.pending()).find(record => record.id !== leadId);
      if (pending) await deliverStoredShopifyLead(pending, store);
    } catch { /* The new lead is already durable. */ }
    return response({ ok: true, leadId });
  } catch (error) {
    if (error instanceof SyntaxError) return response({ error: "INVALID_REQUEST" }, 400);
    return response({ error: "LEAD_UNCONFIRMED" }, 503);
  }
}
