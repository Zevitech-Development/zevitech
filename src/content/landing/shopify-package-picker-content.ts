import type { ShopifyPackageName } from "@/content/landing/shopify-package-catalog";
import { shopifyPackageScopeNotes } from "@/content/landing/shopify-package-catalog";

export const packagePickerCopy = {
  label: "Choose your Shopify development package",
  selected: "Selected",
  choose: "Choose package",
  recommended: "Recommended for full customization",
  details: "See full package details",
  additions: "What this package adds",
  inherits: "Everything in {package}, plus",
  essentials: "Included launch essentials",
  foundation: "Your launch essentials",
  included: "Everything included",
  upgraded: "Added or upgraded",
  basicScope: "A theme-based launch. Custom layouts and automation start with Growth; customer dashboard setup starts with Pro.",
  compareNote: "Compare features, customization and product setup. Select the package that suits your business.",
  locked: "Does not cover your selected needs",
  lockedAction: "See {package} designs",
  designCount: "{count} designs to choose from",
  designCountSingle: "1 design to choose from",
  viewDesigns: "View {count} designs",
  viewDesignsSingle: "View the design",
  oneTime: "full price · one-time · USD",
  themes: "Design references",
  functionality: "Functionality",
  products: "Product setup",
  logo: "Custom logo design",
  logoConcepts: "{count} logo concepts · one final logo",
  logoConceptSingle: "1 logo concept · one final logo",
  productLimit: "Up to {count} products",
  cumulative: "All packages include every design reference. Higher packages add functionality, setup capacity and customization.",
  includedTitle: "Everything included in {package}",
  selectionStatus: "{package} selected · {price} USD full package price. Pay 10% upfront and 90% after delivery.",
  fees: shopifyPackageScopeNotes.fees,
};

export const packagePickerHighlights = {
  Beginner: {
    audience: "A focused first launch",
    theme: "All reference designs",
    functionality: "Cart, payments and product search",
    features: ["Mobile-ready theme setup", "Cart and payment setup", "Product search and navigation", "1 revision round", "Launch checks and handover"],
    visualLevel: 0,
  },
  Growth: {
    audience: "Build your brand",
    theme: "All reference designs",
    functionality: "Newsletter and 1 email automation",
    features: ["Branded page layouts", "Newsletter signup", "1 abandoned-checkout email", "Mini-cart setup", "Basic SEO settings"],
    visualLevel: 1,
  },
  "Level Up": {
    audience: "Improve product discovery",
    theme: "All reference designs",
    functionality: "Product filters and recommendations",
    features: ["Up to 3 product filters", "Recommendations for 10 products", "GA4 and ecommerce event checks", "Full cart with mini-cart access", "3 revision rounds"],
    visualLevel: 2,
  },
  Pro: {
    audience: "Connect sales and customers",
    theme: "All reference designs",
    functionality: "Customer dashboard, reviews and bundles",
    features: ["Basic customer dashboard", "Product reviews and blog", "Up to 3 product bundles", "1 campaign page + 5 banners", "2 marketing email automations"],
    visualLevel: 3,
  },
  Executive: {
    audience: "A tailored commerce experience",
    theme: "All reference designs",
    functionality: "Currencies and 1 additional language",
    features: ["Branded customer dashboard", "Unique page designs", "2 markets + 1 extra language", "2 supported app integrations", "Dedicated project manager"],
    visualLevel: 4,
  },
  "Top Tier": {
    audience: "Your complete custom build",
    theme: "All reference designs",
    functionality: "Customer dashboard and custom forms",
    features: ["Advanced customer dashboard", "Custom code and forms", "Up to 5 workflow automations", "3 supported app integrations", "Unlimited scoped revisions"],
    visualLevel: 5,
  },
} satisfies Record<ShopifyPackageName, {
  audience: string;
  theme: string;
  functionality: string;
  features: string[];
  visualLevel: number;
}>;
