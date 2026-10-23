import type { ShopifyCheckoutPublicOrder } from "./shopify-checkout-interface";

export interface ShopifyOrderConfirmationProps {
  /** Only the development-only preview route supplies this. Never used for payment verification. */
  previewOrder?: ShopifyCheckoutPublicOrder;
}
