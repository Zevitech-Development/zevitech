// Service tiers describe setup and delivery work, not Shopify platform paywalls.
export const shopifyPackageOrder = [
  "Beginner", "Growth", "Level Up", "Pro", "Executive", "Top Tier",
] as const;

export type ShopifyPackageName = (typeof shopifyPackageOrder)[number];

export const shopifyPackageLogoConceptCounts = {
  Beginner: 1,
  Growth: 2,
  "Level Up": 3,
  Pro: 4,
  Executive: 5,
  "Top Tier": 6,
} as const satisfies Record<ShopifyPackageName, number>;

export const shopifyLogoScopeCopy = {
  finalDelivery: "One chosen final logo delivered in PNG and SVG",
  conceptNote: "Logo concepts are alternative design directions for one brand. Choose one final logo; higher packages provide more directions to explore.",
  revisions: "Logo revisions follow the revision allowance in your selected package",
} as const;

export const shopifyPackageRevisionScope = {
  Beginner: "1 revision round within the agreed launch scope",
  Growth: "2 revision rounds within the agreed launch scope",
  "Level Up": "3 revision rounds within the agreed launch scope",
  Pro: "4 revision rounds within the agreed launch scope",
  Executive: "5 revision rounds within the agreed launch scope",
  "Top Tier": "Unlimited revisions within the agreed launch scope",
} as const satisfies Record<ShopifyPackageName, string>;

export function getShopifyLogoConceptSummary(name: ShopifyPackageName): string {
  const count = shopifyPackageLogoConceptCounts[name];
  return `Custom logo design: ${count} ${count === 1 ? "concept" : "concepts"} for one final logo`;
}

export const shopifyCapabilityStartingPackage = {
  payment: "Beginner",
  search: "Beginner",
  "logo-design": "Beginner",
  "custom-design": "Growth",
  "theme-growth": "Growth",
  newsletter: "Growth",
  "marketing-automation": "Growth",
  "storefront-filters": "Level Up",
  recommendations: "Level Up",
  analytics: "Level Up",
  "theme-level-up": "Level Up",
  reviews: "Pro",
  "workflow-automation": "Pro",
  "app-integration": "Pro",
  bundles: "Pro",
  "campaign-page": "Pro",
  "promotional-banners": "Pro",
  "theme-pro": "Pro",
  currencies: "Executive",
  "unique-pages": "Executive",
  "custom-logos": "Executive",
  "project-manager": "Executive",
  languages: "Executive",
  "advanced-integrations": "Executive",
  "product-specifications": "Executive",
  "theme-executive": "Executive",
  filters: "Top Tier",
  dashboard: "Pro",
  "custom-code": "Top Tier",
  "product-comparison": "Top Tier",
  "theme-top-tier": "Top Tier",
} as const satisfies Record<string, ShopifyPackageName>;

export type ShopifyPackageCapabilityId = keyof typeof shopifyCapabilityStartingPackage;

export function shopifyPackagesForCapability(id: ShopifyPackageCapabilityId): ShopifyPackageName[] {
  return shopifyPackageOrder.slice(shopifyPackageOrder.indexOf(shopifyCapabilityStartingPackage[id]));
}

const packageDefinitions = [
  {
    name: "Beginner", price: 249, products: 10,
    inclusions: {
      design: "Theme-based design",
      logos: getShopifyLogoConceptSummary("Beginner"),
      logoDelivery: shopifyLogoScopeCopy.finalDelivery,
      revisions: shopifyPackageRevisionScope.Beginner,
      responsive: "Responsive storefront and mobile layout checks",
      cart: "Standard shopping cart and checkout setup",
      essentials: "Payment integration, basic product search and navigation",
      launch: "Launch checks and theme handover",
    },
    setupLimits: { emailAutomations: 0, flowWorkflows: 0, appIntegrations: 0, storefrontFilters: 0, additionalLanguages: 0, markets: 0, recommendationProducts: 0, fixedBundles: 0 },
  },
  {
    name: "Growth", price: 599, products: 50,
    inclusions: {
      design: "Customised design and CMS",
      logos: getShopifyLogoConceptSummary("Growth"),
      revisions: shopifyPackageRevisionScope.Growth,
      seo: "Basic SEO settings and supplied image alt text",
      cart: "Mini shopping cart and standard cart page",
      styling: "Brand styling for homepage, product and collection templates",
      newsletter: "Newsletter signup setup",
      emailAutomation: "1 abandoned-checkout email automation configured",
    },
    setupLimits: { emailAutomations: 1 },
  },
  {
    name: "Level Up", price: 999, products: 75,
    inclusions: {
      logos: getShopifyLogoConceptSummary("Level Up"),
      revisions: shopifyPackageRevisionScope["Level Up"],
      cart: "Full shopping cart with mini-cart access",
      storefrontFilters: "Up to 3 storefront filters configured",
      recommendations: "Related and complementary product recommendations for up to 10 products",
      analytics: "GA4 connection and standard ecommerce event checks",
    },
    setupLimits: { storefrontFilters: 3, recommendationProducts: 10 },
  },
  {
    name: "Pro", price: 1499, products: 125,
    inclusions: {
      logos: getShopifyLogoConceptSummary("Pro"),
      revisions: shopifyPackageRevisionScope.Pro,
      reviews: "Product reviews and blog",
      dashboard: "Basic customer dashboard: customer profile, order history and order details",
      banners: "5 promotional banners",
      team: "Expert design and development team",
      campaign: "1 campaign landing-page setup",
      flow: "Up to 2 Shopify Flow workflows configured",
      emailAutomation: "Up to 2 marketing email automations, including abandoned checkout",
      bundles: "Up to 3 fixed product bundles configured",
      integrations: "1 supported third-party app integration, including reviews setup",
    },
    setupLimits: { emailAutomations: 2, flowWorkflows: 2, appIntegrations: 1, fixedBundles: 3 },
  },
  {
    name: "Executive", price: 2499, products: 250,
    inclusions: {
      pages: "Unlimited pages with unique designs",
      dashboard: "Branded customer dashboard with tailored navigation and account content",
      logos: getShopifyLogoConceptSummary("Executive"),
      revisions: shopifyPackageRevisionScope.Executive,
      cart: "Custom shopping cart with mini-cart access",
      payment: "Multiple payment integrations",
      currencies: "Multiple currencies: up to 2 markets configured, where eligible",
      team: "Dedicated design and development team and project manager",
      languages: "Multiple languages: 1 additional language setup with supplied translations",
      integrations: "Up to 2 supported third-party app integrations, including reviews setup",
      flow: "Up to 3 Shopify Flow workflows configured",
      metafields: "Metafield setup for up to 5 reusable product attributes",
    },
    setupLimits: { flowWorkflows: 3, appIntegrations: 2, additionalLanguages: 1, markets: 2 },
  },
  {
    name: "Top Tier", price: 4999, products: 500,
    inclusions: {
      design: "Custom design and development with CMS",
      logos: getShopifyLogoConceptSummary("Top Tier"),
      revisions: shopifyPackageRevisionScope["Top Tier"],
      catalogue: "Scalable product catalogue",
      banners: "Unlimited banners and interactive effects",
      dashboard: "Advanced customer dashboard with custom account sections and supported app connections, scoped before build",
      customForms: "Custom forms and product filters",
      customCode: "Custom code and optional appointments",
      invoicing: "Invoicing and email alerts",
      database: "Database and newsletter integration",
      searchSubmission: "Search engine submission",
      admin: "Admin setup and deployment",
      flow: "Up to 5 Shopify Flow workflows configured",
      integrations: "Up to 3 supported third-party app integrations, including reviews setup",
      languages: "Multiple languages: up to 2 additional languages using supplied translations",
      storefrontFilters: "Up to 5 storefront filters configured",
      comparison: "1 custom product comparison or enquiry flow scoped before build",
    },
    setupLimits: { flowWorkflows: 5, appIntegrations: 3, additionalLanguages: 2, storefrontFilters: 5 },
  },
] satisfies Array<{
  name: ShopifyPackageName;
  price: number;
  products: number;
  inclusions: Record<string, string>;
  setupLimits: Partial<Record<"emailAutomations" | "flowWorkflows" | "appIntegrations" | "storefrontFilters" | "additionalLanguages" | "markets" | "recommendationProducts" | "fixedBundles", number>>;
}>;

export const shopifyPackageCatalog = packageDefinitions.map((definition, index) => {
  const inherited = packageDefinitions.slice(0, index + 1);
  // Stable keys replace lower allowances without dropping inherited capabilities.
  const inclusions = Object.assign({}, ...inherited.map((plan) => plan.inclusions)) as Record<string, string>;
  const setupLimits = Object.assign({}, ...inherited.map((plan) => plan.setupLimits)) as Record<keyof (typeof packageDefinitions)[0]["setupLimits"], number>;
  const capabilityIds = (Object.keys(shopifyCapabilityStartingPackage) as ShopifyPackageCapabilityId[])
    .filter((id) => shopifyPackagesForCapability(id).includes(definition.name));
  return {
    name: definition.name,
    price: definition.price,
    products: definition.products,
    logoConcepts: shopifyPackageLogoConceptCounts[definition.name],
    inheritedFrom: index === 0 ? null : packageDefinitions[index - 1].name,
    additions: Object.entries(definition.inclusions)
      .filter(([key]) => key !== "logoDelivery" && key !== "logoRevisions")
      .map(([, value]) => value),
    features: Object.values(inclusions),
    capabilityIds,
    setupLimits,
  };
});

export const shopifyPackageScopeNotes = {
  inheritance: "Every higher package includes the work in the packages below it. Setup limits shown at a higher tier are the total allowance, not additional quantities.",
  delivery: "One store and one launch project. Product setup uses the content and images you supply. Additional ongoing work is scoped separately.",
  fees: "Shopify subscriptions, premium themes, paid apps, usage charges and payment-provider fees are separate. App installation does not include its subscription.",
  eligibility: "Features use supported Shopify tools, themes and apps. Local-currency checkout, automations and integrations depend on your plan, provider, region and app compatibility. Advanced checkout extensions may require Shopify Plus.",
  content: "Translations and product content are supplied by you. We configure the agreed tools and check the setup; ongoing campaigns, translation services and guaranteed sales or rankings are not included.",
};
