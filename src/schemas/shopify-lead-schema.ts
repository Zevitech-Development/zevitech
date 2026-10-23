import { z } from "zod";
import { ShopifyCheckoutPhoneSchema } from "./shopify-checkout-schema";
import { ShopifyCheckoutAttributionSchema } from "@/lib/shopify-checkout-attribution";

const text = (max: number) => z.string().trim().max(max);

/** Contact and project details captured before payment or for a custom quote. */
export const ShopifyLeadSchema = z.object({
  intent: z.enum(["checkout", "quote"]),
  name: text(100).min(2),
  email: text(254).email(),
  phone: ShopifyCheckoutPhoneSchema,
  brand: text(160).min(1),
  brief: text(1200).min(1),
  projectType: text(60),
  businessType: text(40),
  businessCategory: text(80),
  customCategory: text(80).optional(),
  existingStore: text(1000).optional(),
  design: text(120),
  packageName: text(40),
  packagePrice: z.number().nonnegative().max(100000),
  productCount: text(20).optional(),
  featureIds: z.array(text(100)).max(100).optional(),
  designNotes: text(2000).optional(),
  customRequirements: text(2000).optional(),
  attribution: ShopifyCheckoutAttributionSchema.optional(),
});

export type ShopifyLeadType = z.infer<typeof ShopifyLeadSchema>;
