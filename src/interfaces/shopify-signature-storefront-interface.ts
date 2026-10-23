import type { ShopifyPremiumProduct } from "./shopify-premium-preview-interface";

export type ShopifySignatureTheme = "clotya" | "ecolife" | "beauty" | "living" | "tech" | ShopifyTierTheme;

/** Premium storefronts unlocked package by package: Level Up, Pro, Executive, Top Tier. */
export type ShopifyTierTheme = "lookbook" | "bundle" | "configurator" | "concierge";

export interface ShopifySignatureProductSeed {
  name: string;
  collection: string;
  price: number;
  src: string;
  description: string;
}

export interface ShopifyDemoPurchase {
  quantity?: number;
  variant?: string;
  unitPrice?: number;
}

export interface ShopifySignatureHomeProps {
  products: ShopifyPremiumProduct[];
  heroSrc?: string;
  artworkMode?: boolean;
  categoryContext?: string;
  serviceMode?: boolean;
  headline?: string;
  brief?: string;
  onBrowse: (collection?: string) => void;
  onProduct: (productId: number) => void;
  onAddToBag: (productId: number, purchase?: ShopifyDemoPurchase) => void;
  onViewBag: () => void;
  onJournal?: () => void;
}
