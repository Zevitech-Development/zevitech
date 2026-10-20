import { themeTiers } from "@/content/landing/shopify-theme-tier-content";
import { studioTemplates, templateCopy } from "@/content/landing/shopify-studio-templates";

export const shopifyCustomizationIds = [
  "customPalette",
  "headline",
  "productDetails",
  "customSections",
  "motionControls",
  "advancedCommerce",
] as const;

/** Unknown packages never inherit access from a default tier. */
export function getThemeTierByPackage(packageName: string) {
  return themeTiers.find(tier => tier.packageName === packageName) ?? null;
}

/** An empty result means the layout is invalid or has no published package. */
export function getThemeMinimumPackage(layout: number): string {
  if (!Number.isInteger(layout) || layout < 0) return "";
  return themeTiers.find(tier => (tier.layouts as readonly number[]).includes(layout))?.packageName ?? "";
}

export function canUseThemeLayout(packageName: string, layout: number): boolean {
  if (!Number.isInteger(layout) || layout < 0) return false;
  const tier = getThemeTierByPackage(packageName);
  return Boolean(tier && (tier.layouts as readonly number[]).includes(layout));
}

export function canUseShopifyCustomizations(packageName: string, customizationIds: readonly string[]): boolean {
  const tier = getThemeTierByPackage(packageName);
  return Boolean(tier && customizationIds.every(id => {
    if (!(shopifyCustomizationIds as readonly string[]).includes(id)) return false;
    return tier.capabilities[id as (typeof shopifyCustomizationIds)[number]];
  }));
}

/** Recognized legacy labels retain their access rules even when optional IDs are absent. */
export function getThemeLayoutFromLabel(label: string): number | null {
  const normalized = label.trim().toLowerCase();
  const namedLayout = templateCopy.layoutNames.findIndex(name => name.toLowerCase() === normalized);
  if (namedLayout >= 0) return namedLayout;
  return studioTemplates.find(template =>
    template.name.toLowerCase() === normalized || template.id === normalized,
  )?.layout ?? null;
}
