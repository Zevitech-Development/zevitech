import { z } from "zod";
import type { ShopifyCheckoutAttribution } from "@/interfaces/shopify-checkout-interface";

// Keep only campaign identifiers/labels. Never retain raw URLs, arbitrary query
// parameters, contact fields or the legacy helper's landingPage value.
const clickId = z.string().trim().min(1).max(240).regex(/^[A-Za-z0-9_-]+$/);
const campaignLabel = z.string().trim().min(1).max(240).regex(/^[A-Za-z0-9][A-Za-z0-9 ._~+\-]*$/);
const attributionFields = {
  gclid: clickId,
  gbraid: clickId,
  wbraid: clickId,
  utm_source: campaignLabel,
  utm_medium: campaignLabel,
  utm_campaign: campaignLabel,
  utm_term: campaignLabel,
  utm_content: campaignLabel,
  utm_id: campaignLabel,
};

export const ShopifyCheckoutAttributionSchema = z.object({
  gclid: clickId.optional(),
  gbraid: clickId.optional(),
  wbraid: clickId.optional(),
  utm_source: campaignLabel.optional(),
  utm_medium: campaignLabel.optional(),
  utm_campaign: campaignLabel.optional(),
  utm_term: campaignLabel.optional(),
  utm_content: campaignLabel.optional(),
  utm_id: campaignLabel.optional(),
});

/** Filter the existing Google Ads helper's output before a checkout submission. */
export function sanitizeShopifyCheckoutAttribution(value: unknown): ShopifyCheckoutAttribution | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
  const record = value as Record<string, unknown>;
  const clean: ShopifyCheckoutAttribution = {};
  for (const key of Object.keys(attributionFields) as (keyof typeof attributionFields)[]) {
    const result = attributionFields[key].safeParse(record[key]);
    if (result.success) clean[key] = result.data;
  }
  return Object.keys(clean).length ? clean : undefined;
}
