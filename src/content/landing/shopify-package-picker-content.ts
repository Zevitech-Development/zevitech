import type { ShopifyPackageName } from "@/content/landing/shopify-package-catalog";
import { shopifyPackageScopeNotes } from "@/content/landing/shopify-package-catalog";

export const packagePickerCopy = {
  label: "Choose your Shopify development package",
  selected: "Selected",
  choose: "Choose package",
  oneTime: "full price · one-time · USD",
  themes: "Theme collection",
  functionality: "Functionality",
  products: "Product setup",
  logo: "Custom logo design",
  logoConcepts: "{count} logo concepts · one final logo",
  logoConceptSingle: "1 logo concept · one final logo",
  productLimit: "Up to {count} products",
  cumulative: "Higher packages include the themes and functionality in every tier below them.",
  includedTitle: "Everything included in {package}",
  selectionStatus: "{package} selected · {price} USD full package price. Pay 40% upfront and 60% after delivery.",
  fees: shopifyPackageScopeNotes.fees,
};

export const packagePickerHighlights = {
  Beginner: {
    theme: "Editorial",
    functionality: "Cart, payments and product search",
    visualLevel: 0,
  },
  Growth: {
    theme: "Adds Spotlight",
    functionality: "Newsletter and 1 email automation",
    visualLevel: 1,
  },
  "Level Up": {
    theme: "Adds Boutique",
    functionality: "Product filters and recommendations",
    visualLevel: 2,
  },
  Pro: {
    theme: "Adds Campaign",
    functionality: "Reviews, bundles and 2 workflows",
    visualLevel: 3,
  },
  Executive: {
    theme: "Adds Dimensional and Parallax",
    functionality: "Currencies and 1 additional language",
    visualLevel: 4,
  },
  "Top Tier": {
    theme: "Adds custom signature storefronts, Cinematic and Commerce Studio",
    functionality: "Customer dashboard and custom forms",
    visualLevel: 5,
  },
} satisfies Record<ShopifyPackageName, {
  theme: string;
  functionality: string;
  visualLevel: number;
}>;
