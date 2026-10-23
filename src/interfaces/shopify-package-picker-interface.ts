import type { studioPlans } from "@/content/landing/shopify-studio-content";

export interface ShopifyPackagePickerProps {
  plans: typeof studioPlans;
  selected: number;
  confirmed?: boolean;
  onSelect: (index: number) => void;
  /** Packages below this index cannot build the chosen design. */
  minimumIndex?: number;
  /** Highlights the best-value package for the chosen design. */
  recommendedIndex?: number;
  /** Name of the chosen design, used to explain locked packages. */
  designName?: string;
  /** Shows the designs a locked package can build. */
  onLockedSelect?: (index: number) => void;
}
