import { NextResponse } from "next/server";

/** Legacy client-reported PayPal receipts are disabled until server verification exists. */
export async function POST() {
  return NextResponse.json({ error: "PAYMENT_VERIFICATION_UNAVAILABLE" }, {
    status: 503,
    headers: { "Cache-Control": "no-store" },
  });
}
