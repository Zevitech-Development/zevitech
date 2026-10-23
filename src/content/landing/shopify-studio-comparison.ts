import { getShopifyLogoConceptSummary, shopifyLogoScopeCopy, shopifyPackageCatalog, shopifyPackageRevisionScope, shopifyPackageScopeNotes } from "@/content/landing/shopify-package-catalog";

export const comparisonCopy = {
  title: "Compare the scope, side by side.",
  intro: "Every higher package includes the lower packages. Compare the added design work, setup allowances and functionality.",
  left: "First package",
  right: "Second package",
  same: "Choose a different package on the right to see the differences.",
  included: "Package inclusions",
  total: "Full package price",
  rows: [
    { label: "Revision allowance", values: shopifyPackageCatalog.map(plan => shopifyPackageRevisionScope[plan.name]) },
    { label: "Custom logo design", values: shopifyPackageCatalog.map((plan) => `${getShopifyLogoConceptSummary(plan.name)}. PNG and SVG included.`) },
    { label: "Product setup", values: shopifyPackageCatalog.map((plan) => `Up to ${plan.products}`) },
    { label: "Design approach", values: ["Theme-based", "Customised design", "Customised design", "Customised design + campaign page", "Unlimited unique pages", "Unique pages + custom development"] },
    { label: "Cart & payments", values: ["Standard cart, checkout & payment setup", "Adds mini cart", "Adds full cart design", "Full cart & payment setup", "Custom cart & multiple payment integrations", "Custom cart & multiple payment integrations"] },
    { label: "Discovery & content", values: ["Basic search & collections", "Search, CMS & newsletter", "Adds 3 filters & recommendations for 10 products", "Adds reviews, blog & 3 fixed bundles", "Adds 5 reusable product attributes", "Adds custom forms, 5 filters & dashboard"] },
    { label: "Analytics setup", values: ["Available in Level Up and above", "Available in Level Up and above", "GA4 + standard event checks", "GA4 + standard event checks", "GA4 + standard event checks", "GA4 + standard event checks"] },
    { label: "Automation setup", values: ["Available in Growth and above", "1 email automation", "1 email automation", "2 email + 2 Flow workflows", "2 email + 3 Flow workflows", "2 email + 5 Flow workflows"] },
    { label: "Supported app integrations", values: ["Separately scoped", "Separately scoped", "Separately scoped", "1, including reviews", "Up to 2 total", "Up to 3 total"] },
    { label: "Campaign assets", values: ["Available in Pro and above", "Available in Pro and above", "Available in Pro and above", "5 promotional banners", "5 promotional banners", "Unlimited banners"] },
    { label: "International setup", values: ["Available in Executive and above", "Available in Executive and above", "Available in Executive and above", "Available in Executive and above", "2 markets + 1 additional language", "2 markets + 2 additional languages"] },
  ],
  note: `${shopifyLogoScopeCopy.conceptNote} ${shopifyPackageScopeNotes.inheritance} ${shopifyPackageScopeNotes.fees} ${shopifyPackageScopeNotes.eligibility} ${shopifyPackageScopeNotes.content}`,
};
