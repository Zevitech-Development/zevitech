import { packageFeatureNeeds } from "@/content/landing/shopify-package-recommendation-content";
import { studioPlans } from "@/content/landing/shopify-studio-content";

function parseProductCount(productCount: string): number | null {
  if (typeof productCount !== "string" || !/^[0-9]+$/.test(productCount.trim())) return null;
  const count = Number(productCount);
  return Number.isSafeInteger(count) && count > 0 ? count : null;
}

export function findMatchingShopifyPackage(
  plans: typeof studioPlans,
  productCount: string,
  featureIds: readonly string[],
): number | null {
  let cheapest: number | null = null;
  plans.forEach((plan, index) => {
    if (shopifyPackageMatchesNeeds(plans, index, productCount, featureIds)
      && (cheapest === null || plan.price < plans[cheapest].price)) cheapest = index;
  });
  return cheapest;
}

export function shopifyPackageMatchesNeeds(
  plans: typeof studioPlans,
  selected: number,
  productCount: string,
  featureIds: readonly string[],
): boolean {
  return getShopifyPackageMatchCoverage(plans, selected, productCount, featureIds).matches;
}

/** Describe the current package's coverage without assuming higher tiers inherit scope. */
export function getShopifyPackageMatchCoverage(
  plans: typeof studioPlans,
  selected: number,
  productCount: string,
  featureIds: readonly string[],
) {
  const count = parseProductCount(productCount);
  const plan = plans[selected];
  const validPlan = Number.isInteger(selected) && selected >= 0 && Boolean(plan)
    && Number.isFinite(plan.price) && plan.price > 0
    && Number.isSafeInteger(plan.products) && plan.products >= 1
    && studioPlans.some((listed) => listed.name === plan.name);
  const productsMatch = validPlan && count !== null && plan.products >= count;
  const matchedFeatureIds: string[] = [];
  const unmatchedFeatureIds: string[] = [];
  const unknownFeatureIds: string[] = [];

  for (const id of Array.from(new Set(featureIds))) {
    const feature = packageFeatureNeeds.find((item) => item.id === id);
    if (!feature) unknownFeatureIds.push(id);
    else if (validPlan && (feature.plans as readonly string[]).includes(plan.name)) matchedFeatureIds.push(id);
    else unmatchedFeatureIds.push(id);
  }

  return {
    matches: productsMatch && unmatchedFeatureIds.length === 0 && unknownFeatureIds.length === 0,
    productsMatch,
    matchedFeatureIds,
    unmatchedFeatureIds,
    unknownFeatureIds,
  };
}
