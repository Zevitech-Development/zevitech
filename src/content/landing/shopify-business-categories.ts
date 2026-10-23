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

/**
 * Customer-facing category names. Some map onto an existing design library
 * (alias → library category); the rest have their own library of the same name.
 */
export const shopifyCategoryAliases: Record<string, string> = {
  "Clothing & fashion": "Fashion",
  "Bags & accessories": "Accessories",
  "Jewellery & watches": "Jewellery",
  "Beauty & cosmetics": "Beauty",
  "Health & supplements": "Wellness",
  "Electronics & gadgets": "Technology",
  "Home décor": "Home",
  "Food & groceries": "Food & drink",
  "Sports & fitness gear": "Sports & outdoors",
  "General store": "General",
  "Consulting": "Expert & consulting services",
  "Other services": "Services",
};

export const shopifyProductCategories = [
  "Clothing & fashion",
  "Shoes & footwear",
  "Bags & accessories",
  "Jewellery & watches",
  "Beauty & cosmetics",
  "Skincare",
  "Fragrance",
  "Health & supplements",
  "Electronics & gadgets",
  "Home décor",
  "Furniture",
  "Kitchen & dining",
  "Food & groceries",
  "Coffee & tea",
  "Baby & kids",
  "Toys & games",
  "Pets",
  "Sports & fitness gear",
  "Books & stationery",
  "Art & handmade",
  "Automotive",
  "General store",
];

export const shopifyServiceCategories = [
  "Professional services",
  "Consulting",
  "Legal services",
  "Real estate",
  "Medical & dental clinics",
  "Creative & digital",
  "Coaching & education",
  "Restaurants & catering",
  "Events & photography",
  "Travel & tourism",
  "Beauty services",
  "Salons",
  "Spas",
  "Fitness services",
  "Home & local services",
  "Home cleaning",
  "Plumbing",
  "HVAC",
  "Auto repair",
  "Truck dispatching",
  "Other services",
];

/** The design library behind a customer-facing category name. */
export function shopifyLibraryCategory(category: string) {
  return shopifyCategoryAliases[category] ?? category;
}

/** The customer-facing name for a design library category. */
export function shopifyCategoryLabel(libraryCategory: string) {
  return Object.keys(shopifyCategoryAliases).find(label => shopifyCategoryAliases[label] === libraryCategory) ?? libraryCategory;
}

export function getShopifyBusinessCategoryOptions(businessType: ShopifyBusinessType) {
  const categories = businessType === "services"
    ? shopifyServiceCategories
    : businessType === "both"
      ? [...shopifyProductCategories, ...shopifyServiceCategories]
      : shopifyProductCategories;
  return [...categories, SHOPIFY_CUSTOM_CATEGORY];
}

export function resolveCategoryReference(category: string, businessType: ShopifyBusinessType) {
  const options = getShopifyBusinessCategoryOptions(businessType);
  if (category !== SHOPIFY_CUSTOM_CATEGORY
    && (options.includes(category) || options.includes(shopifyCategoryLabel(category)))) {
    return shopifyLibraryCategory(category);
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
