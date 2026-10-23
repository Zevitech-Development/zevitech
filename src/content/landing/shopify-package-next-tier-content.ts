import type { ShopifyPackageName } from "./shopify-package-catalog";

export const shopifyNextTierCopy = {
  eyebrow: "Optional upgrade",
  includes: "Everything in {package}, plus:",
  priceLabel: "New package total · USD",
  difference: "{price} more than {package} in the full package price",
  action: "Choose {package}",
  note: "Your current package already covers your selections. Upgrade only if these additions suit your plans.",
  selectedLabel: "Your chosen package",
  selectedIntro: "Your chosen package covers your selections and includes the additional work shown below.",
} as const;

export const shopifyNextTierBenefits = {
  Growth: {
    title: "Make the store feel like your brand",
    benefits: [
      "Custom colours, branded store templates and 2 logo concepts",
      "Newsletter signup and 1 abandoned-checkout email automation",
      "Mini-cart access and setup for up to 50 products",
    ],
  },
  "Level Up": {
    title: "Help shoppers discover more of your range",
    benefits: [
      "Up to 3 storefront filters, plus 3 logo concepts",
      "Related and complementary recommendations for up to 10 products",
      "GA4 connection, ecommerce event checks and up to 75 products",
    ],
  },
  Pro: {
    title: "Turn your product range into a campaign",
    benefits: [
      "Reviews and blog setup, plus 1 campaign landing page",
      "5 promotional banners, 4 logo concepts and up to 3 fixed product bundles",
      "Up to 2 email automations, 2 store workflows and 125 products",
    ],
  },
  Executive: {
    title: "Build a richer brand experience",
    benefits: [
      "Custom motion direction, unique pages and 5 logo concepts",
      "Up to 2 markets and 1 additional language, where eligible",
      "Dedicated project manager, 2 supported app integrations and 250 products",
    ],
  },
  "Top Tier": {
    title: "Create a shopping experience built around your business",
    benefits: [
      "Advanced commerce customization, plus 6 logo concepts",
      "Tailored customer dashboard, forms and 1 comparison or enquiry flow",
      "Up to 5 workflows, 3 supported app integrations and 500 products",
    ],
  },
} satisfies Record<Exclude<ShopifyPackageName, "Beginner">, { title: string; benefits: string[] }>;
