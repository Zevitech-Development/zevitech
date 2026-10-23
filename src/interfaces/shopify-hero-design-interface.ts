export interface ShopifyHeroDesign {
  id: string;
  category: string;
  brand: string;
  headline: string;
  eyebrow: string;
  description: string;
  collection: string;
  product: string;
  productDetail: string;
  price: string;
  colour: string;
  shop: string;
  add: string;
  delivery: string;
  menu: string[];
  service?: boolean;
  layout: "cinematic" | "split" | "editorial";
  products: { src: string; name: string; price: string; position: string }[];
}

export interface ShopifyHeroFrameProps {
  design: ShopifyHeroDesign;
  front: boolean;
  onReadiness?: (id: string, ready: boolean) => void;
}
