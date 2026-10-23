import type { studioPlans } from "@/content/landing/shopify-studio-content";

export interface ShopifyNeedsSelection {
  packageIndex: number;
  productCount: string;
  featureIds: string[];
}

export interface ShopifyPendingUpgrade extends ShopifyNeedsSelection {
  previousPackageIndex: number;
  difference: number;
}

export interface ShopifyPackageNeedsProps {
  discovery?: boolean;
  packageSelected?: boolean;
  plans: typeof studioPlans;
  packageIndex: number;
  productCount: string;
  featureIds: string[];
  pending: ShopifyPendingUpgrade | null;
  notice: string;
  onChange: (productCount: string, featureIds: string[]) => void;
  onConfirm: () => void;
  onCancel: () => void;
  onCompare: () => void;
}
