import type { studioPlans } from "@/content/landing/shopify-studio-content";
import type { ShopifyNeedsSelection, ShopifyPendingUpgrade } from "@/interfaces/shopify-package-upgrade-interface";
import { findMatchingShopifyPackage, shopifyPackageMatchesNeeds } from "@/lib/shopify-package-recommendation";

/** Stage a higher-priced package; never silently replace a customer's selection. */
export function planShopifyNeedsChange(
  plans: typeof studioPlans,
  current: ShopifyNeedsSelection,
  productCount: string,
  featureIds: string[],
): { selection: ShopifyNeedsSelection; pending: ShopifyPendingUpgrade | null; needsReview: boolean } {
  const ids = Array.from(new Set(featureIds));
  const proposed = { ...current, productCount, featureIds: ids };
  if (shopifyPackageMatchesNeeds(plans, current.packageIndex, productCount, ids)) {
    return { selection: proposed, pending: null, needsReview: false };
  }
  const target = findMatchingShopifyPackage(plans, productCount, ids);
  if (target === null || !plans[current.packageIndex]) {
    return { selection: proposed, pending: null, needsReview: true };
  }
  const difference = plans[target].price - plans[current.packageIndex].price;
  if (difference > 0) {
    return {
      selection: current,
      pending: { ...proposed, packageIndex: target, previousPackageIndex: current.packageIndex, difference },
      needsReview: false,
    };
  }
  return { selection: proposed, pending: null, needsReview: true };
}
