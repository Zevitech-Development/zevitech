import { z } from "zod";
export const ShopifyStudioSchema = z.object({
  projectType: z.enum(["New store", "Redesign my store", "Move to Shopify"]),
  businessType: z.enum(["products", "services", "both"]),
  businessCategory: z.string().trim().max(80),
  customCategory: z.string().trim().max(80, "Keep your category within 80 characters."),
  existingStore: z
    .string()
    .trim()
    .refine(
      (v) => !v || /^https?:\/\/[^\s]+\.[^\s]+$/.test(v),
      "Enter a full website URL beginning with https://.",
    ),
  brand: z.string().trim().max(60, "Use a business name of 60 characters or fewer."),
  brief: z
    .string()
    .trim()
    .max(1200, "Keep your business description within 1,200 characters."),
  headline: z.string().trim().min(1, "Enter a store headline.").max(100, "Use a store headline of 100 characters or fewer."),
  product: z.string().trim().min(1, "Enter a product name.").max(80, "Use a product name of 80 characters or fewer."),
  price: z
    .string()
    .refine(
      (v) => v.trim() !== "" && Number.isFinite(Number(v)) && Number(v) >= 0,
      "Enter a valid product price.",
    ),
  name: z.string().trim().min(2, "Enter your name.").max(100, "Use a name of 100 characters or fewer."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .max(40, "Use a phone number of 40 characters or fewer.")
    .refine((value) => {
      const digits = value.replace(/\D/g, "");
      return /^\+?[0-9 ()-]+$/.test(value) && digits.length >= 7 && digits.length <= 15;
    }, "Enter a valid phone number with 7 to 15 digits, including your country code."),
  customAccent: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, "Use a six-digit hex colour, such as #1557b0."),
  customInk: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, "Use a six-digit hex colour."),
  customSurface: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, "Use a six-digit hex colour."),
  customSoft: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, "Use a six-digit hex colour."),
  references: z.string().max(2000, "Keep your reference links and notes within 2,000 characters."),
  requirements: z.string().max(2000, "Keep your design preferences within 2,000 characters."),
  additionalRequirements: z.string().max(2000, "Keep additional functionality requests within 2,000 characters."),
});

export const ShopifyStudioCheckoutDetailsSchema = ShopifyStudioSchema.pick({
  name: true,
  email: true,
  phone: true,
  brand: true,
  brief: true,
}).extend({
  brand: ShopifyStudioSchema.shape.brand.min(1, "Enter your business name before checkout."),
  brief: ShopifyStudioSchema.shape.brief.min(1, "Tell us what your business sells and who it is for before checkout."),
});
