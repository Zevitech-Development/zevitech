import type {
  PackagePreviewCapabilities,
  PackagePreviewDemo,
  PackagePreviewProfile,
  PreviewDemoFeature,
} from "@/interfaces/shopify-package-preview-interface";
import {
  shopifyPackageOrder,
  getShopifyLogoConceptSummary,
  shopifyLogoScopeCopy,
  shopifyPackagesForCapability,
  type ShopifyPackageName,
  type ShopifyPackageCapabilityId,
} from "@/content/landing/shopify-package-catalog";

const hasCapability = (name: ShopifyPackageName, id: ShopifyPackageCapabilityId) =>
  shopifyPackagesForCapability(id).includes(name);

// Cart variants illustrate the package's design work; every package has a working cart.
const cartPreviews: Record<ShopifyPackageName, PackagePreviewCapabilities["cart"]> = {
  Beginner: "full", Growth: "mini", "Level Up": "full", Pro: "full", Executive: "custom", "Top Tier": "custom",
};

export const packagePreviewCapabilities = Object.fromEntries(shopifyPackageOrder.map((name) => [name, {
  cart: cartPreviews[name],
  search: hasCapability(name, "search"),
  reviews: hasCapability(name, "reviews"),
  journal: hasCapability(name, "reviews"),
  currency: hasCapability(name, "currencies"),
  newsletter: hasCapability(name, "newsletter"),
  filters: hasCapability(name, "storefront-filters"),
  account: hasCapability(name, "dashboard"),
  custom: hasCapability(name, "filters"),
}])) as Record<ShopifyPackageName, PackagePreviewCapabilities>;

const demos: Record<PreviewDemoFeature, PackagePreviewDemo> = {
  design: { id: "design", label: "Explore the design", benefit: "See your branding in an illustrative preview with the design options included in your package." },
  cart: { id: "cart", label: "Try the cart", benefit: "Review products and quantities before checkout." },
  search: { id: "search", label: "Try product search", benefit: "Help shoppers find products by name." },
  filters: { id: "filters", label: "Try product filters", benefit: "Narrow the sample collection to relevant products." },
  reviews: { id: "reviews", label: "See product reviews", benefit: "Give shoppers more context from customer feedback." },
  journal: { id: "journal", label: "Explore the blog", benefit: "Share product guides and stories from your brand." },
  currency: { id: "currency", label: "Switch currency", benefit: "Preview prices in another currency. Actual checkout currencies depend on your eligible payment setup." },
  newsletter: { id: "newsletter", label: "Try newsletter signup", benefit: "Give visitors a place to join your mailing list." },
  account: { id: "account", label: "Explore the dashboard", benefit: "See an illustrative account space. Final customization follows your agreed scope." },
  custom: { id: "custom", label: "Plan your custom form", benefit: "Agree form fields, workflows and optional appointments in your project brief." },
};

const profileDetails: Record<ShopifyPackageName, Omit<PackagePreviewProfile, "demos">> = {
  Beginner: {
    designTitle: "Theme-based design",
    designBody: "A mobile-friendly first store with your products, basic search, cart and supported payment setup.",
    delivery: ["Dedicated designer and developer", "Payment integration", "Launch checks and theme handover", "Unlimited revisions"],
  },
  Growth: {
    designTitle: "Customised design",
    designBody: "All Beginner inclusions, with tailored storefront styling, a mini cart and newsletter setup.",
    delivery: ["Brand styling for homepage, product and collection templates", "1 abandoned-checkout email automation configured", "Dedicated designer and developer", "Unlimited revisions"],
  },
  "Level Up": {
    designTitle: "Product discovery and measurement",
    designBody: "All Growth inclusions, with configured filters, related products and analytics setup.",
    delivery: ["Up to 3 storefront filters configured", "Related and complementary product recommendations for up to 10 products", "GA4 connection and standard ecommerce event checks", "Unlimited revisions"],
  },
  Pro: {
    designTitle: "Content, campaigns and operations",
    designBody: "All Level Up inclusions, with reviews, blog content areas, campaign assets and automation setup.",
    delivery: ["5 promotional banners", "1 campaign landing-page setup", "Up to 2 Shopify Flow workflows configured", "Up to 2 marketing email automations, including abandoned checkout", "Up to 3 fixed product bundles configured", "1 supported third-party app integration, including reviews setup"],
  },
  Executive: {
    designTitle: "Unique page designs and expansion",
    designBody: "All Pro inclusions, with unique pages, more logo concepts, project coordination and eligible international setup.",
    delivery: ["Dedicated design and development team and project manager", "Multiple languages: 1 additional language setup with supplied translations", "Multiple currencies: up to 2 markets configured, where eligible", "Up to 2 supported third-party app integrations, including reviews setup", "Up to 3 Shopify Flow workflows configured"],
  },
  "Top Tier": {
    designTitle: "Custom design and development",
    designBody: "All Executive inclusions, with custom forms, account experiences, tailored code and additional integrations.",
    delivery: ["Unlimited banners and interactive effects", "Customer dashboard", "Invoicing and email alerts", "Database and newsletter integration", "Up to 5 Shopify Flow workflows configured", "Up to 3 supported third-party app integrations, including reviews setup", "Multiple languages: up to 2 additional languages using supplied translations"],
  },
};

export const packagePreviewProfiles = Object.fromEntries(shopifyPackageOrder.map((name) => {
  const capabilities = packagePreviewCapabilities[name];
  const enabled = (Object.keys(demos) as PreviewDemoFeature[]).filter((id) => {
    if (id === "design") return true;
    if (id === "cart") return capabilities.cart !== "none";
    return capabilities[id];
  });
  return [name, {
    ...profileDetails[name],
    delivery: [getShopifyLogoConceptSummary(name), shopifyLogoScopeCopy.finalDelivery, ...profileDetails[name].delivery],
    demos: enabled.map((id) => id === "cart" ? {
      ...demos.cart,
      label: capabilities.cart === "mini" ? "Try the mini cart" : capabilities.cart === "custom" ? "Explore a custom cart" : "Try the full cart",
    } : demos[id]),
  }];
})) as Record<ShopifyPackageName, PackagePreviewProfile>;

export const packageStorefrontProfiles = Object.fromEntries(shopifyPackageOrder.map((name) => [name, {
  layout: hasCapability(name, "storefront-filters")
    ? "discovery"
    : hasCapability(name, "custom-design") ? "brand" : "essential",
  recommendations: hasCapability(name, "recommendations"),
}])) as Record<ShopifyPackageName, {
  layout: "essential" | "brand" | "discovery";
  recommendations: boolean;
}>;

export const packageStorefrontCopy = {
  sample: "ILLUSTRATIVE STOREFRONT",
  essentialEyebrow: "THE COLLECTION",
  essentialTitle: "A few good finds.",
  essentialStory: "A little about {brand}",
  essentialStoryBody: "Your point of view, in the things you choose. Discover a collection that brings a little more of you into the everyday.",
  brandEyebrow: "EXPLORE THE COLLECTIONS",
  brandTitle: "Find your everyday favourites.",
  brandIntro: "A different mood. A new favourite. Explore the edits and make a little room for what you love.",
  brandProductsEyebrow: "THE EVERYDAY LINEUP",
  brandProductsTitle: "Meet your next favourites.",
  brandProductsBody: "Explore the pieces, take a closer look and add your favourites to your bag.",
  collectionCount: "{count} pieces to explore",
  collectionCountSingle: "1 piece to explore",
  collectionAction: "Shop this edit",
  addToBag: "Add to bag",
  addedShort: "Added",
  brandDetailsEyebrow: "FIND YOUR OWN WAY",
  brandDetailsTitle: "The little things make it yours.",
  brandDetails: [
    { title: "A closer look.", body: "Explore the texture, shape and details that first caught your eye.", action: "Explore the details" },
    { title: "For your everyday.", body: "Picture the piece in your routine and discover the possibilities.", action: "Find your favourite" },
    { title: "Your kind of finishing touch.", body: "Start with what you love. Make the rest feel like you.", action: "Take another look" },
  ],
  brandClosingEyebrow: "A FRESH PERSPECTIVE",
  brandClosingTitle: "Good things, seen a little differently.",
  brandClosingBody: "An invitation to slow down, look closer and discover something that feels like your own.",
  brandClosingAction: "Discover the full collection",
  discoveryEyebrow: "YOUR NEXT FIND",
  discoveryTitle: "More ways to find your favourite.",
  discoveryIntro: "Start with an edit, explore the details and find the pieces that belong in your world.",
  discoveryCategoriesEyebrow: "A PLACE TO START",
  discoveryCategoriesTitle: "Follow what catches your eye.",
  discoveryProductsBody: "Move between collections and sort the pieces your way. A different view might reveal your next favourite.",
  spotlightChoose: "Choose a featured product",
  spotlightPrice: "Your selected piece",
  spotlightAdd: "Add this piece to bag",
  discoveryContextEyebrow: "BEYOND THE FIRST LOOK",
  discoveryContextTitle: "See the collection in a new light.",
  discoveryContextBody: "Take a different path through the collection. Explore the details, then discover where they lead.",
  discoveryContexts: [
    { title: "Start with the details.", body: "A colour, a texture, a shape. Follow the little things that draw you in.", action: "Explore this piece" },
    { title: "Find your own combination.", body: "Explore a different edit and see what belongs alongside your favourites.", action: "Explore this collection" },
  ],
  discoveryClosingTitle: "There’s more to discover.",
  discoveryClosingBody: "Keep exploring the collections, one good find at a time.",
  allCollections: "All collections",
  collectionsLabel: "Choose a sample collection",
  sortLabel: "Sort sample products",
  sorts: [
    { value: "featured", label: "Featured" },
    { value: "name-asc", label: "Name: A–Z" },
    { value: "name-desc", label: "Name: Z–A" },
  ],
  results: "{count} sample products",
  resultsSingle: "1 sample product",
  browseCollection: "Explore collection",
  viewProduct: "View product",
  quickAdd: "Add to sample bag",
  added: "Added to sample bag",
  storyEyebrow: "BEHIND THE BRAND",
  storyTitle: "A point of view. In every detail.",
  storyBody: "A collection is more than the things in it. It is the small details you notice, the pieces you return to and the way you make them your own.",
  storyDetailTitle: "Made for your kind of everyday.",
  storyDetailBody: "From the pieces you reach for every day to the details you notice along the way, find a collection that feels like your own.",
  storyAction: "Explore our world",
  spotlightEyebrow: "IN FOCUS",
  spotlightTitle: "One piece. A closer look.",
  spotlightBody: "Explore the details, choose your quantity and see how it fits into your collection.",
  recommendationsEyebrow: "KEEP EXPLORING",
  recommendationsTitle: "You might also like",
  recommendationsNote: "Sample related products. Final recommendations are configured around your catalogue.",
  newsletterLabel: "Email address",
  newsletterPlaceholder: "you@example.com",
};

export const packagePreviewCopy = {
  eyebrow: "YOUR PACKAGE IN ACTION",
  title: "Included in your package",
  design: "Design scope",
  designLabel: "Design scope",
  shopping: "Shopping experience",
  demoLabel: "Explore included features",
  delivery: "More included work",
  deliveryLabel: "Team and delivery",
  deliveryNote: "This is work delivered by our team, beyond the interactive sample.",
  sampleNote: "These examples use sample data. Only the listed package scope is included. Payments, subscriptions and integrations are not connected in this preview.",
  referenceTitle: "Explore a sample storefront",
  referenceNote: "Explore a design included in your package. Shopping controls use sample data; the package listing defines the work included.",
  explore: "Explore",
  moreDemos: "More features to explore",
  demoStatus: "Exploring",
  plannedTitle: "Planned with your brief",
  illustrativeNote: "Sample shopping controls illustrate the experience. The package listing defines the work included.",
  designOnly: "Every package includes the essentials to browse products, use the cart and reach checkout. Higher tiers add more design and setup work.",
  miniCartTitle: "Mini cart",
  closeMiniCart: "Close mini cart",
  miniCartBody: "A compact bag summary keeps the selected product close at hand.",
  fullCartTitle: "Full cart",
  customCartTitle: "Custom cart example",
  filterLabel: "Filter sample products",
  filterBody: "Narrow the sample catalogue to see how filters can help shoppers.",
  customFormTitle: "Custom forms, shaped to your needs",
  customFormBody: "Your form fields, workflow and any optional appointment features are agreed during scoping.",
  customFormLabel: "Your question",
  customFormPlaceholder: "Ask about a size, availability or a custom request",
  customFormSubmit: "Send sample enquiry",
  customFormSent: "Sample enquiry complete. Nothing was submitted.",
  customFormNote: "Final fields and integrations are planned with your brief.",
};
