export interface ShopifyPremiumProduct {
  id: number;
  src: string;
  name: string;
  collection: string;
  priceLabel: string;
}

export interface ShopifyPremiumPreviewProps {
  layout: 6 | 7 | 8 | 9;
  headline: string;
  brief: string;
  productName: string;
  images: string[];
  products?: ShopifyPremiumProduct[];
  onBrowse: (collection?: string) => void;
  onProduct: (productId?: number) => void;
  onAddToBag?: (productId: number) => void;
  onViewBag?: () => void;
}
