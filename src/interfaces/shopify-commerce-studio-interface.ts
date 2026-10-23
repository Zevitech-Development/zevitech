import type { ShopifySignatureHomeProps } from "./shopify-signature-storefront-interface";
export interface ShopifyCommerceStudioProps extends ShopifySignatureHomeProps {
  cartCount: number;
  brand: string;
}
