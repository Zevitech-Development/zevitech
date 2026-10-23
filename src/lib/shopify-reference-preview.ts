import { studioCopy, studioPlans } from "@/content/landing/shopify-studio-content";
import type { studioTemplates } from "@/content/landing/shopify-studio-templates";
import type { ShopifyStudioFormType } from "@/interfaces/shopify-studio-interface";
import { getThemeMinimumPackage } from "./shopify-theme-access";

/** Card and opened reference share the same design, data, and package capabilities. */
export function referencePreviewSettings(reference: typeof studioTemplates[number]) {
  const plan = studioPlans.length - 1;
  const values: ShopifyStudioFormType = {
    ...studioCopy.defaults, brand: "", headline: reference.headline, brief: reference.brief,
    product: reference.product, price: reference.price, businessType: reference.businessType,
    businessCategory: reference.category, customCategory: "", projectType: "New store",
    existingStore: "", name: "", email: "", phone: "", references: "", requirements: "", additionalRequirements: "",
    customAccent: "#1557b0", customInk: "#10243b", customSurface: "#ffffff", customSoft: "#eaf2fb",
  };
  return { values, plan: Math.max(plan, 0) };
}
