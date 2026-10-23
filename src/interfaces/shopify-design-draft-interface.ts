import type { ShopifyDesignDraft } from "@/lib/shopify-design-draft";

export interface ShopifyDesignDraftControlsProps {
  saved: ShopifyDesignDraft | null;
  canSave: boolean;
  notice: string;
  onSave: () => void;
  onResume: () => void;
  onRemove: () => void;
}
