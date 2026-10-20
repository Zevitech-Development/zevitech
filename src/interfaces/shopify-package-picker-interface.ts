import type { studioPlans } from "@/content/landing/shopify-studio-content";

export interface ShopifyPackagePickerProps {
  plans: typeof studioPlans;
  selected: number;
  confirmed?: boolean;
  onSelect: (index: number) => void;
}
