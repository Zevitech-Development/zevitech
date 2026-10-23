import type { ShopifySignatureProductSeed } from "./shopify-signature-storefront-interface";
export interface ShopifyReferenceArtwork {
  palette: { accent: string; ink: string; surface: string; soft: string };
  hero?: string;
  headline?: string;
  brief?: string;
  products: ShopifySignatureProductSeed[];
}
