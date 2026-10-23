import type { studioPlans } from "@/content/landing/shopify-studio-content";
export type ShopifyDesignAction =
  | { kind: "template"; index: number }
  | { kind: "layout"; index: number }
  | { kind: "customPalette" }
  | { kind: "headline" }
  | { kind: "productDetails" };
export interface ShopifyPendingThemeUpgrade {
  action: ShopifyDesignAction;
  packageIndex: number;
  label: string;
}
export interface ShopifyThemeUpgradeProps {
  plans: typeof studioPlans;
  currentIndex: number;
  pending: ShopifyPendingThemeUpgrade | null;
  onConfirm: () => void;
  onCancel: () => void;
}
