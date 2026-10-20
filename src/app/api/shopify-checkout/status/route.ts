import type { NextRequest } from "next/server";
import { checkoutHttp } from "@/services/shopify-checkout-http";
export const runtime = "nodejs";
export const POST = (request: NextRequest) => checkoutHttp(request, "status");
