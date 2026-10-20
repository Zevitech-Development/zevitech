import type { z } from "zod";
import type { ShopifyStudioSchema } from "@/schemas/shopify-studio-schema";
import type {
  studioCopy,
  studioPlans,
} from "@/content/landing/shopify-studio-content";
export type ShopifyStudioFormType = z.infer<typeof ShopifyStudioSchema>;
export interface ShopifyStudioProps {
  copy: typeof studioCopy;
  plans: typeof studioPlans;
}
export interface ShopifyStudioPreviewProps {
  copy: typeof studioCopy;
  plan: number;
  values: ShopifyStudioFormType;
  images: string[];
  logo: string;
  layout: number;
  palette: number;
  mobile: boolean;
  expanded?: boolean;
  scopeMode?: "reference" | "package";
  packageName?: string;
  compactScope?: boolean;
  referenceId?: string;
}

export interface ShopifyTemplateGalleryProps {
  selected: number;
  onSelect: (index: number) => void;
  packageName?: string;
  browseAll?: boolean;
  initialCategory?: string;
  categoryFilter?: string;
}
