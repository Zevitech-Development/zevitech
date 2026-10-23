import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { createShopifyLeadStore } from "@/services/shopify-lead-store";
import { deliverStoredShopifyLead } from "@/services/shopify-lead-service";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const received = Buffer.from(request.headers.get("authorization") || "");
  const expected = Buffer.from(`Bearer ${secret || ""}`);
  if (!secret || received.length !== expected.length || !timingSafeEqual(received, expected)) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  try {
    const store = createShopifyLeadStore();
    const records = await store.pending();
    for (const record of records) await deliverStoredShopifyLead(record, store);
    return NextResponse.json({ processed: records.length }, { headers: { "Cache-Control": "no-store" } });
  } catch { return NextResponse.json({ error: "RETRY_UNAVAILABLE" }, { status: 503 }); }
}
