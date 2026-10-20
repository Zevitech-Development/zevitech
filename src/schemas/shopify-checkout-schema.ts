import { z } from "zod";
import { ShopifyCheckoutAttributionSchema } from "@/lib/shopify-checkout-attribution";
import { packageFeatureNeeds } from "@/content/landing/shopify-package-recommendation-content";
import { shopifyCustomizationIds } from "@/lib/shopify-theme-access";

const text = (max: number) => z.string().trim().max(max);
export const ShopifyCheckoutPhoneSchema = text(40)
  .regex(/^\+?[0-9 ()-]+$/)
  .refine((value) => {
    const digitCount = value.replace(/\D/g, "").length;
    return digitCount >= 7 && digitCount <= 15;
  });
export const ShopifyCheckoutBriefSchema = z.object({
  version: z.number().optional(),
  package: z.object({ name: text(40) }),
  business: z.object({
    name: text(100).min(2),
    email: z.string().trim().email().max(254),
    phone: ShopifyCheckoutPhoneSchema,
    brand: text(60).min(1),
    brief: text(1200).min(1),
    projectType: z.enum(["New store", "Redesign my store", "Move to Shopify"]),
    businessType: z.enum(["products", "services", "both"]).optional().default("products"),
    businessCategory: text(80).optional().default(""),
    customCategory: text(80).optional().default(""),
    existingStore: text(1000).optional().default(""),
    requirements: text(2000).optional().default(""),
    designNotes: text(2000).optional(),
    references: text(2000).optional().default(""),
    headline: text(100).optional(),
    product: text(80).optional(),
    price: text(20).optional(),
    customAccent: text(7).optional(),
    customInk: text(7).optional(),
    customSurface: text(7).optional(),
    customSoft: text(7).optional(),
  }).refine(business => business.businessCategory !== "Other / custom category" || !!business.customCategory.trim(), {
    message: "Enter your business category.",
    path: ["customCategory"],
  }),
  design: z.object({ template: text(100), layout: text(100), palette: text(100) }),
  imageFilenames: z.array(text(255)).max(4),
  logoFilename: text(255),
  priorities: z.array(text(100)).max(20),
  needs: z.object({
    productCount: z.enum(["10", "50", "75", "125", "250", "500", "more"]),
    featureIds: z.array(z.string().refine(value => packageFeatureNeeds.some(feature => feature.id === value))).max(packageFeatureNeeds.length),
    scopeConfirmed: z.boolean(),
    designLayout: z.number().int().min(0).max(9).optional(),
    customizationIds: z.array(z.enum(shopifyCustomizationIds)).max(shopifyCustomizationIds.length).optional(),
  }),
});

export const ShopifyCheckoutCreateSchema = z.object({
  brief: ShopifyCheckoutBriefSchema,
  requestId: z.string().uuid(),
  accessToken: z.string().regex(/^[a-f0-9]{64}$/),
  acceptedTerms: z.literal(true),
  attribution: ShopifyCheckoutAttributionSchema.optional(),
});
export const ShopifyCheckoutAccessSchema = z.object({
  orderId: z.string().regex(/^ZVT-[a-f0-9]{32}$/),
  accessToken: z.string().regex(/^[a-f0-9]{64}$/),
});
export const ShopifyCheckoutBillingSchema = z.object({
    firstName: text(60).min(1),
    lastName: text(60).min(1),
    address: text(150).min(3),
    city: text(80).min(1),
    state: text(80).min(1),
    postalCode: text(20).min(2),
    country: z.string().regex(/^[A-Z]{2}$/),
  });
export const ShopifyCheckoutPaySchema = ShopifyCheckoutAccessSchema.extend({
  briefFingerprint: z.string().regex(/^[a-f0-9]{64}$/),
  paymentToken: z.string().min(10).max(200).regex(/^[A-Za-z0-9_-]+$/),
  billing: ShopifyCheckoutBillingSchema,
  acceptedTerms: z.literal(true),
});

export type ShopifyCheckoutValidatedBrief = z.infer<typeof ShopifyCheckoutBriefSchema>;
export type ShopifyCheckoutPayment = z.infer<typeof ShopifyCheckoutPaySchema>;
