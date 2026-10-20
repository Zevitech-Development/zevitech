import type { ShopifyPackageSelectorProps } from "@/interfaces/shopify-package-selector-interface";

type ShortlistPlan = Pick<ShopifyPackageSelectorProps["plans"][number], "name" | "price">;

export function isShopifyPackageIndex(
  index: number | null | undefined,
  packageCount: number,
): index is number {
  return typeof index === "number"
    && Number.isInteger(index)
    && index >= 0
    && index < packageCount;
}

/** Keep original indices so focused cards still select the correct package. */
export function getShopifyPackageShortlist(
  plans: readonly ShortlistPlan[],
  recommended: number | null | undefined,
  selected: number,
): number[] {
  const indices = plans.map((_, index) => index);
  if (!isShopifyPackageIndex(recommended, plans.length)) return indices;

  const shortlist = [recommended];
  if (isShopifyPackageIndex(selected, plans.length) && selected !== recommended) {
    shortlist.push(selected);
  }

  const alternative = indices
    .filter((index) => !shortlist.includes(index))
    .sort((left, right) => {
      const distance = Math.abs(plans[left].price - plans[recommended].price)
        - Math.abs(plans[right].price - plans[recommended].price);
      return distance
        || plans[left].price - plans[right].price
        || plans[left].name.localeCompare(plans[right].name);
    })[0];

  if (alternative !== undefined) shortlist.push(alternative);
  return shortlist;
}
