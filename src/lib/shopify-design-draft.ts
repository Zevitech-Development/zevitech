import { z } from "zod";
import { studioTemplates, studioColourPalettes, templateCopy } from "@/content/landing/shopify-studio-templates";
import { studioPlans } from "@/content/landing/shopify-studio-content";
import { packageFeatureNeeds } from "@/content/landing/shopify-package-recommendation-content";

export const SHOPIFY_DESIGN_DRAFT_KEY = "zevitech:shopify-design:v1";
export const DESIGN_DRAFT_LIFETIME = 30 * 24 * 60 * 60 * 1000;
const colour = z.string().regex(/^#[0-9a-fA-F]{6}$/);
const DraftSchema = z.object({
  version: z.literal(1),
  savedAt: z.number().int().positive(),
  templateId: z.string().refine(value => studioTemplates.some(item => item.id === value)),
  layout: z.number().int().min(0).max(templateCopy.layoutNames.length - 1),
  palette: z.number().int().min(0).max(studioColourPalettes.length),
  customColours: z.object({ accent: colour, ink: colour, surface: colour, soft: colour }),
  teamDirection: z.boolean(),
  layoutChosen: z.boolean(),
  paletteChosen: z.boolean(),
  productCount: z.enum(["10", "50", "75", "125", "250", "500", "more"]),
  featureIds: z.array(z.string().refine(value => packageFeatureNeeds.some(item => item.id === value))).max(packageFeatureNeeds.length).transform(values => Array.from(new Set(values))),
  projectType: z.enum(["New store", "Redesign my store", "Move to Shopify"]).optional(),
  businessType: z.enum(["products", "services", "both"]).optional(),
  businessCategory: z.string().trim().max(80).optional(),
  customCategory: z.string().trim().max(80).optional(),
  packageName: z.string().nullable().refine(value => value === null || studioPlans.some(item => item.name === value)),
});
export type ShopifyDesignDraft = z.infer<typeof DraftSchema>;

// An allowlist: never persist contact details, business copy, files or payment state.
export function serializeDesignDraft(input: unknown): string | null {
  const result = DraftSchema.safeParse(input);
  return result.success ? JSON.stringify(result.data) : null;
}

export function parseDesignDraft(raw: string | null, now = Date.now()): ShopifyDesignDraft | null {
  if (!raw || raw.length > 8000) return null;
  try {
    const result = DraftSchema.safeParse(JSON.parse(raw));
    if (!result.success || result.data.savedAt > now + 60000 || now - result.data.savedAt > DESIGN_DRAFT_LIFETIME) return null;
    return result.data;
  } catch {
    return null;
  }
}
