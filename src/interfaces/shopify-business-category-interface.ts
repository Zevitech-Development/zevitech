export type ShopifyBusinessType = "products" | "services" | "both";

export interface ShopifyBusinessCategoryPickerProps {
  businessType: ShopifyBusinessType;
  category: string;
  customCategory: string;
  onChange: (
    businessType: ShopifyBusinessType,
    category: string,
    customCategory: string,
  ) => void;
}
