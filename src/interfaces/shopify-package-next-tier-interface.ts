import type { studioPlans } from "@/content/landing/shopify-studio-content";

export interface ShopifyPackageNextTierProps {
  plans: typeof studioPlans;
  packageIndex: number;
  productCount: string;
  featureIds: readonly string[];
  onSelect: (index: number) => void;
}
