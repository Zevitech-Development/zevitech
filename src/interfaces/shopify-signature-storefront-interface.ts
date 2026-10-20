import type { ShopifyPremiumProduct } from "./shopify-premium-preview-interface";

export type ShopifySignatureTheme = "clotya" | "ecolife" | "beauty" | "living" | "tech";

export interface ShopifySignatureProductSeed {
  name: string;
  collection: string;
  price: number;
  src: string;
  description: string;
}

export interface ShopifySignatureHomeProps {
  products: ShopifyPremiumProduct[];
  headline?: string;
  brief?: string;
  onBrowse: (collection?: string) => void;
  onProduct: (productId: number) => void;
  onAddToBag: (productId: number) => void;
  onViewBag: () => void;
  onJournal?: () => void;
}
