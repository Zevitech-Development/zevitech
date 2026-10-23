import type { ShopifyStudioFormType } from "@/interfaces/shopify-studio-interface";

export interface ShopifyServiceOffer {
  id: string;
  title: string;
  group: string;
  format: string;
  description: string;
  includes: readonly string[];
}

export interface ShopifyServiceCategory {
  id: string;
  label: string;
  brand: string;
  headline: string;
  introduction: string;
  offers: readonly ShopifyServiceOffer[];
}

export interface ShopifyServicePreviewProps {
  signatureTheme?: import("./shopify-signature-storefront-interface").ShopifySignatureTheme;
  plan: number;
  packageName?: string;
  values: ShopifyStudioFormType & {
    businessCategory?: string;
    customCategory?: string;
  };
  images: string[];
  logo: string;
  mobile: boolean;
  layout: number;
  palette: number;
}
