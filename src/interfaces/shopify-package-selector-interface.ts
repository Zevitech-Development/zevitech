import type { studioPlans } from "@/content/landing/shopify-studio-content";

export interface ShopifyPackageSelectorProps {
  plans: typeof studioPlans;
  selected: number;
  started: boolean;
  recommended?: number | null;
  productCount?: string;
  featureIds?: readonly string[];
  onSelect: (index: number) => void;
  onExplore?: (index: number) => void;
}
