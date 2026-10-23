import type { ShopifyPackageName } from "@/content/landing/shopify-package-catalog";

export const shopifyDeliveryEstimates = {
  Beginner: "3–7 working days",
  Growth: "3–7 working days",
  "Level Up": "3–7 working days",
  Pro: "3–7 working days",
  Executive: "7 working days",
  "Top Tier": "Up to 2 working weeks",
} as const satisfies Record<ShopifyPackageName, string>;

export const shopifyDeliveryCopy = {
  label: "Estimated delivery",
  timingNote:
    "Timing starts once we receive your brief and required assets. Feedback and custom scope may affect the estimate.",
  summary:
    `Estimated delivery is ${shopifyDeliveryEstimates.Beginner} for Beginner, Growth, Level Up and Pro; ${shopifyDeliveryEstimates.Executive} for Executive; and ${shopifyDeliveryEstimates["Top Tier"].toLowerCase()} for Top Tier.`,
} as const;

export function getShopifyDeliveryEstimate(packageName: string): string | null {
  return Object.prototype.hasOwnProperty.call(shopifyDeliveryEstimates, packageName)
    ? shopifyDeliveryEstimates[packageName as ShopifyPackageName]
    : null;
}
