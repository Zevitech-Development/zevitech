export interface ShopifyStorefrontProduct {
  id: number;
  src: string;
  name: string;
  collection: string;
  priceLabel: string;
}

export interface ShopifyStorefrontSectionsProps {
  mode: "essential" | "brand" | "discovery";
  brand: string;
  brief: string;
  products: ShopifyStorefrontProduct[];
  mobile: boolean;
  onCollection: (collection?: string) => void;
  onProduct: (id: number) => void;
  onAddProduct?: (id: number) => void;
}
