export type PreviewDemoFeature =
  | "design"
  | "cart"
  | "search"
  | "reviews"
  | "journal"
  | "currency"
  | "newsletter"
  | "filters"
  | "account"
  | "custom";

export interface PackagePreviewDemo {
  id: PreviewDemoFeature;
  label: string;
  benefit: string;
}

export interface PackagePreviewProfile {
  designTitle: string;
  designBody: string;
  delivery: string[];
  demos: PackagePreviewDemo[];
}

export interface PackagePreviewCapabilities {
  cart: "none" | "mini" | "full" | "custom";
  search: boolean;
  reviews: boolean;
  journal: boolean;
  currency: boolean;
  newsletter: boolean;
  filters: boolean;
  account: boolean;
  custom: boolean;
}
