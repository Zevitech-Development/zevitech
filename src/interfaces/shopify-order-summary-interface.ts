import type { studioPlans } from "@/content/landing/shopify-studio-content";

export interface ShopifyOrderSummaryProps {
  plan: (typeof studioPlans)[number];
  onChangePackage: () => void;
}
