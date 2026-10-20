import { shopifyPackageScopeNotes } from "@/content/landing/shopify-package-catalog";

export const shopifyPackageSalesCopy = {
  label: "Shopify development packages",
  oneTime: "full package price · one-time · USD",
  upTo: "Up to",
  products: "products",
  choose: "Choose",
  selected: "Selected",
  allFeatures: "Everything included",
  explore: "Explore this package",
  focusedHelp:
    "Compare your recommendation with alternatives. Higher packages include the lower packages and add more work.",
  showAll: "Show all {count} packages",
  showFocused: "Show focused packages",
  showingPackages: "Showing {visible} of {total} packages.",
  matchesNeeds: "Matches your selected needs",
  scopeToConfirm: "Additional scope to confirm",
  scopeProducts: "Product setup: {requested} requested; up to {included} included",
  scopeProductsUnknown: "Product setup count needs confirmation",
  scopeUnknownFeatures: "Unlisted feature requests",
  moreScopeNeeds: "Show {count} more scope items",
  scopeNote: `${shopifyPackageScopeNotes.fees} ${shopifyPackageScopeNotes.eligibility}`,
  deliveryNote: `${shopifyPackageScopeNotes.delivery} ${shopifyPackageScopeNotes.content}`,
  valueTitle: "See the experience. Understand the work.",
  valueBody: "Every higher package includes the lower packages. Compare the design collections, customisation options and added store setup work.",
};

export const shopifyPackageSales = {
  Beginner: {
    category: "A simple first launch",
    outcome:
      "Launch with a custom logo, mobile-friendly store, working cart, search and supported payment setup.",
  },
  Growth: {
    category: "Make it your brand",
    outcome:
      "Build on Beginner with tailored design, a mini cart, newsletter signup and an abandoned-checkout email setup.",
  },
  "Level Up": {
    category: "Help shoppers find more",
    outcome:
      "Build on Growth with filters, related-product recommendations and GA4 setup to understand the shopping journey.",
  },
  Pro: {
    category: "Give products more context",
    outcome:
      "Build on Level Up with reviews, a blog, campaign assets, fixed bundles and store automation setup.",
  },
  Executive: {
    category: "A broader brand experience",
    outcome:
      "Build on Pro with unique pages, more logo concepts, project coordination and international and app setup.",
  },
  "Top Tier": {
    category: "Built around bigger ideas",
    outcome:
      "Build on Executive with tailored forms, account experiences, custom code, motion and additional integrations.",
  },
} satisfies Record<
  string,
  { category: string; outcome: string }
>;
