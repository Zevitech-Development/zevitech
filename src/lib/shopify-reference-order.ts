import { shopifyPackageCatalog } from "@/content/landing/shopify-package-catalog";
import { studioTemplates } from "@/content/landing/shopify-studio-templates";
import { canUseThemeLayout, getThemeMinimumPackage } from "@/lib/shopify-theme-access";

/** Gallery cards and preview navigation must use the same eligible, ordered list. */
export function getShopifyReferenceOrder(category: string, packageName: string, browseAll = false) {
  return studioTemplates
    .map((reference, index) => {
      const minimumPackageIndex = shopifyPackageCatalog.findIndex(
        plan => plan.name === getThemeMinimumPackage(reference.layout),
      );
      return { reference, index, minimumPackageIndex, minimumPackage: shopifyPackageCatalog[minimumPackageIndex] };
    })
    .filter(({ reference }) => reference.category === category && (browseAll || canUseThemeLayout(packageName, reference.layout)))
    .sort((left, right) =>
      (browseAll ? left.minimumPackageIndex - right.minimumPackageIndex : 0)
      || Number(Boolean(right.reference.conceptImage || right.reference.signatureTheme)) - Number(Boolean(left.reference.conceptImage || left.reference.signatureTheme))
      || (browseAll ? left.reference.layout - right.reference.layout : right.reference.layout - left.reference.layout));
}

export function getAdjacentShopifyReferenceIndex(
  category: string,
  packageName: string,
  browseAll: boolean,
  currentIndex: number,
  direction: -1 | 1,
): number | null {
  const references = getShopifyReferenceOrder(category, packageName, browseAll);
  if (references.length === 0) return null;
  const current = references.findIndex(reference => reference.index === currentIndex);
  if (current < 0) return references[direction === 1 ? 0 : references.length - 1].index;
  return references[(current + direction + references.length) % references.length].index;
}
