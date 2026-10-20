import type { ShopifyBusinessType } from "@/interfaces/shopify-business-category-interface";

export const SHOPIFY_CUSTOM_CATEGORY = "Other / custom category";

export const shopifyBusinessTypeOptions: {
  value: ShopifyBusinessType;
  label: string;
  description: string;
}[] = [
  {
    value: "products",
    label: "Product business",
    description: "Sell physical or digital products.",
  },
  {
    value: "services",
    label: "Service business",
    description: "Show your services and invite enquiries.",
  },
  {
    value: "both",
    label: "Both",
    description: "Offer products alongside your services.",
  },
];

export const shopifyProductCategories = [
  "Fashion",
  "Beauty",
  "Technology",
  "Home",
  "Wellness",
  "General",
  "Jewellery",
  "Food & drink",
  "Pets",
  "Sports & outdoors",
  "Accessories",
  "Coffee & tea",
];

export const shopifyServiceCategories = [
  "Professional services",
  "Creative & digital",
  "Coaching & education",
  "Home & local services",
  "Beauty services",
  "Fitness services",
  "Services",
  "Spas",
  "Salons",
  "Plumbing",
  "Home cleaning",
  "Truck dispatching",
  "Expert & consulting services",
  "HVAC",
];

export function getShopifyBusinessCategoryOptions(businessType: ShopifyBusinessType) {
  const categories = businessType === "services"
    ? shopifyServiceCategories
    : businessType === "both"
      ? [...shopifyProductCategories, ...shopifyServiceCategories]
      : shopifyProductCategories;
  return [...categories, SHOPIFY_CUSTOM_CATEGORY];
}

export function resolveCategoryReference(category: string, businessType: ShopifyBusinessType) {
  if (category !== SHOPIFY_CUSTOM_CATEGORY
    && getShopifyBusinessCategoryOptions(businessType).includes(category)) {
    return category;
  }
  return businessType === "services" ? "Services" : "General";
}

export const shopifyBusinessCategoryCopy = {
  businessTypeLabel: "What does your business offer?",
  categoryLabel: "Business category",
  categoryHint: "Choose the closest match to see relevant design references.",
  customLabel: "Describe your business category",
  customPlaceholder: "For example, mobile pet grooming",
  customHint: "Up to 80 characters. We’ll include your category in the design brief.",
  customReferenceHint: "Showing adaptable references for your custom category.",
  customRequired: "Enter your business category to continue.",
};
