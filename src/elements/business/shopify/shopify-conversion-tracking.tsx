"use client";

import { useEffect } from "react";
import { configureShopifyAds } from "@/lib/shopify-ads-analytics";
import { captureShopifyCheckoutAttribution } from "@/lib/shopify-checkout-attribution-client";

/** Uses the existing root gtag queue; no extra library or global destination changes. */
export default function ShopifyConversionTracking() {
  useEffect(() => {
    captureShopifyCheckoutAttribution();
    let attempts = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const register = () => {
      if (!configureShopifyAds() && ++attempts < 20) timer = setTimeout(register, 1000);
    };
    register();
    return () => { if (timer) clearTimeout(timer); };
  }, []);
  return null;
}
