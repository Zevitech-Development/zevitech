import { getShopifyServiceCategory } from "./shopify-service-preview-content";
import type { ShopifyReferenceConcept } from "@/interfaces/shopify-reference-concept-interface";
import { clotyaProducts } from "./shopify-clotya-content";
import { ecolifeProducts } from "./shopify-ecolife-content";
import { signatureCatalog } from "./shopify-signature-catalog";
import type { ShopifySignatureTheme } from "@/interfaces/shopify-signature-storefront-interface";

const categoryTemplates = [
  {
    id: "atelier",
    name: "Atelier",
    category: "Fashion",
    layout: 0,
    palette: 1,
    tag: "Editorial collection",
    headline: "Wear your own story.",
    brief:
      "Considered pieces. Effortless style. Discover your everyday favourites.",
    product: "The everyday edit",
    price: "48",
    image: "/store-studio/fashion.jpg",
    description: "Split hero, generous photography and a curated product grid.",
  },
  {
    id: "ritual",
    name: "Ritual",
    category: "Beauty",
    layout: 1,
    palette: 2,
    tag: "Calm & minimal",
    headline: "A little ritual. A better day.",
    brief: "Simple essentials for a routine that feels like you.",
    product: "Daily care serum",
    price: "32",
    image: "/store-studio/beauty.jpg",
    description:
      "Centered storytelling, soft accents and a focused product presentation.",
  },
  {
    id: "pulse",
    name: "Pulse",
    category: "Technology",
    layout: 2,
    palette: 0,
    tag: "Bold product launch",
    headline: "Less noise. More possibility.",
    brief: "Thoughtful technology for the way you live, work and play.",
    product: "Studio headphones",
    price: "129",
    image: "/store-studio/technology.jpg",
    description:
      "Dark campaign hero, bold typography and a clear shopping action.",
  },
  {
    id: "haven",
    name: "Haven",
    category: "Home",
    layout: 3,
    palette: 2,
    tag: "Lifestyle magazine",
    headline: "Make room for the everyday.",
    brief: "Beautiful objects that bring warmth and character to your home.",
    product: "Sculpture vase",
    price: "56",
    image: "/store-studio/home.jpg",
    description:
      "Image-first composition, an offset story and a spacious collection.",
  },
  {
    id: "form",
    name: "Form",
    category: "Wellness",
    layout: 4,
    palette: 1,
    tag: "Product spotlight",
    headline: "Find your everyday balance.",
    brief: "Useful essentials to keep your daily rituals moving.",
    product: "Everyday water bottle",
    price: "38",
    image: "/store-studio/wellness.jpg",
    description:
      "A product spotlight with a benefit panel and compact shop grid.",
  },
  {
    id: "market",
    name: "Market",
    category: "General",
    layout: 5,
    palette: 0,
    tag: "Catalogue first",
    headline: "Your next favourite is here.",
    brief:
      "Discover a thoughtful selection of useful, beautiful everyday finds.",
    product: "Signature essential",
    price: "45",
    image: "/store-studio/general.jpg",
    description: "A compact welcome banner that puts your products first.",
  },
  {
    id: "aurelia",
    name: "Aurelia",
    category: "Jewellery",
    layout: 0,
    palette: 2,
    tag: "Fine details",
    headline: "Small details. Lasting impressions.",
    brief: "Discover pieces that make every day feel special.",
    product: "Signature jewellery",
    price: "85",
    image: "/store-studio/jewellery.jpg",
    description: "An elegant showcase for considered accessories.",
  },
  {
    id: "pantry",
    name: "Pantry",
    category: "Food & drink",
    layout: 3,
    palette: 1,
    tag: "Everyday rituals",
    headline: "Make room for good taste.",
    brief: "Discover a new favourite for your daily ritual.",
    product: "House coffee",
    price: "24",
    image: "/store-studio/food.jpg",
    description: "An inviting collection made for discovery.",
  },
  {
    id: "companion",
    name: "Companion",
    category: "Pets",
    layout: 4,
    palette: 0,
    tag: "Life together",
    headline: "For their best everyday.",
    brief: "Thoughtful essentials for the companions you love.",
    product: "Everyday pet essentials",
    price: "35",
    image: "/store-studio/pets.jpg",
    description: "A friendly storefront for life with pets.",
  },
];
const referenceStyles = [
  {
    suffix: "Editorial",
    layout: 0,
    minPackage: "Beginner",
    palette: 1,
    tag: "Brand-led discovery",
    description:
      "Essential storefront → focused product grid → compact brand introduction.",
    focus: ["Brand story", "Collection discovery", "Clear product details"],
  },
  {
    suffix: "Spotlight",
    layout: 2,
    minPackage: "Growth",
    palette: 0,
    tag: "Product-led selling",
    description:
      "Image-led collection edits → quick-add products → brand story → newsletter signup.",
    focus: ["Hero product", "Benefit-led content", "Direct purchase journey"],
  },
  {
    suffix: "Boutique",
    layout: 3,
    minPackage: "Level Up",
    palette: 2,
    tag: "Collection-led shopping",
    description:
      "Collection filters and sorting → merchandising grid → product spotlight → related-product recommendations.",
    focus: [
      "Visual merchandising",
      "Category browsing",
      "Purchase reassurance",
    ],
  },
];
const premiumReferenceStyles = [
  {
    suffix: "Dimensional",
    layout: 6,
    minPackage: "Executive",
    palette: 1,
    tag: "Layered 3D showcase",
    description:
      "Perspective product layers → a closer-look story → a clear collection journey.",
    focus: ["Dimensional photography", "Product storytelling", "Motion controls"],
  },
  {
    suffix: "Parallax",
    layout: 7,
    minPackage: "Executive",
    palette: 2,
    tag: "Editorial in motion",
    description:
      "Oversized editorial hero → scroll-linked image collage → curated product discovery.",
    focus: ["Scroll storytelling", "Editorial composition", "Collection discovery"],
  },
];
const additionalReferenceStyles = [
  {
    suffix: "Campaign",
    layout: 4,
    minPackage: "Pro",
    palette: 1,
    tag: "Campaign storytelling",
    description:
      "Featured-product campaign → benefit panels → promotional story → focused shop grid.",
    focus: ["Promotional storytelling", "Product benefits", "Campaign conversion"],
  },
  {
    suffix: "Cinematic",
    layout: 8,
    minPackage: "Top Tier",
    palette: 5,
    tag: "Cinematic brand experience",
    description:
      "Immersive full-image opening → cinematic product sequence → expansive brand story → collection reveal.",
    focus: ["Immersive art direction", "Product sequences", "Brand atmosphere"],
  },
  {
    suffix: "Commerce Studio",
    layout: 9,
    minPackage: "Top Tier",
    palette: 0,
    tag: "Advanced commerce workspace",
    description:
      "Structured commerce hero → category navigation → product discovery → connected customer journey.",
    focus: ["Catalogue navigation", "Advanced discovery", "Customer journeys"],
  },
];
type CategoryReference = Pick<(typeof categoryTemplates)[number],
  "id" | "name" | "category" | "headline" | "brief" | "product" | "price" | "image"
> & {
  businessType?: "products" | "services";
  images?: string[];
};

const additionalProductCategories: CategoryReference[] = [
  {
    id: "trail", name: "Trail", category: "Sports & outdoors",
    headline: "Ready for your next everyday adventure.",
    brief: "Practical essentials for movement, fresh air and time outdoors.",
    product: "Trail water bottle", price: "38", image: "/store-studio/wellness.jpg",
  },
  {
    id: "carry", name: "Carry", category: "Accessories",
    headline: "The little things that go everywhere.",
    brief: "Useful bags and considered accessories for the way you move.",
    product: "Everyday carry bag", price: "45", image: "/store-studio/general.jpg",
  },
  {
    id: "roast", name: "Roast", category: "Coffee & tea",
    headline: "A good day starts with a favourite cup.",
    brief: "Find a new favourite for slow mornings and everyday coffee breaks.",
    product: "House coffee blend", price: "24", image: "/store-studio/food.jpg",
  },
];

const teamImages = [
  "/images/about-us/WhyChooseUsAboutUsImg02.jpeg",
  "/images/about-us/WhyChooseUsAboutUsImg01.jpeg",
  "/images/about-us/WhyChooseUsAboutUsImg03.jpeg",
];
const serviceCategoryImages = [
  { id: "fieldwork", category: "Professional services", images: teamImages },
  {
    id: "formfield", category: "Creative & digital",
    images: ["/images/hero-images/about-hero-img.jpg", teamImages[1], teamImages[0]],
  },
  {
    id: "chapter", category: "Coaching & education",
    images: [teamImages[0], "/images/hero-images/about-hero-img.jpg", teamImages[2]],
  },
  {
    id: "neighbour", category: "Home & local services",
    images: ["/store-studio/home-story.jpg", "/store-studio/home-detail.jpg", "/store-studio/home.jpg"],
  },
  {
    id: "sunday", category: "Beauty services",
    images: ["/store-studio/beauty-story.jpg", "/store-studio/beauty-detail.jpg", "/store-studio/beauty.jpg"],
  },
  {
    id: "movement", category: "Fitness services",
    images: ["/store-studio/wellness-story.jpg", "/store-studio/wellness-detail.jpg", "/store-studio/wellness.jpg"],
  },
  {
    id: "service", category: "Services",
    images: ["/images/hero-images/about-hero-img.jpg", teamImages[0], teamImages[1]],
  },
  {
    id: "stillwater", category: "Spas",
    images: ["/store-studio/beauty-story.jpg", "/store-studio/wellness-story.jpg", "/store-studio/beauty-detail.jpg"],
  },
  {
    id: "editsalon", category: "Salons",
    images: ["/store-studio/beauty-story.jpg", "/store-studio/beauty-detail.jpg", "/store-studio/beauty.jpg"],
  },
  {
    id: "clearflow", category: "Plumbing",
    images: ["/store-studio/home-detail.jpg", "/store-studio/home-story.jpg", "/store-studio/home.jpg"],
  },
  {
    id: "freshspace", category: "Home cleaning",
    images: ["/store-studio/home-story.jpg", "/store-studio/home-detail.jpg", "/store-studio/home.jpg"],
  },
  {
    id: "routewise", category: "Truck dispatching",
    images: ["/images/hero-images/about-hero-img.jpg", teamImages[0], teamImages[1]],
  },
  {
    id: "clarity", category: "Expert & consulting services",
    images: [teamImages[0], teamImages[1], teamImages[2]],
  },
  {
    id: "comfortworks", category: "HVAC",
    images: ["/store-studio/home-story.jpg", "/store-studio/home-detail.jpg", "/store-studio/home.jpg"],
  },
];
const serviceCategories: CategoryReference[] = serviceCategoryImages.map((reference) => {
  const service = getShopifyServiceCategory(reference.category);
  return {
    ...reference,
    businessType: "services",
    name: service.brand,
    headline: service.headline,
    brief: service.introduction,
    product: service.offers[0].title,
    price: "95",
    image: reference.images[0],
  };
});
const serviceReferenceStyles: Record<number, Pick<(typeof referenceStyles)[number], "tag" | "description" | "focus">> = {
  0: {
    tag: "Service introduction",
    description: "A focused introduction → clear service overview → a simple enquiry journey.",
    focus: ["Service overview", "Personal introduction", "Clear next steps"],
  },
  2: {
    tag: "Featured service",
    description: "A featured service → process details → supporting services → an enquiry invitation.",
    focus: ["Service benefits", "Working process", "Enquiry journey"],
  },
  3: {
    tag: "Service discovery",
    description: "Service categories → detailed offer cards → scope overview → related services.",
    focus: ["Service categories", "Scope clarity", "Relevant options"],
  },
  4: {
    tag: "Service campaign",
    description: "A focused service campaign → benefit panels → supporting insights → an enquiry invitation.",
    focus: ["Campaign storytelling", "Service benefits", "Helpful content"],
  },
  6: {
    tag: "Layered service story",
    description: "Layered team photography → a closer look at your work → clear service discovery.",
    focus: ["Dimensional photography", "Working process", "Motion controls"],
  },
  7: {
    tag: "Service story in motion",
    description: "An editorial introduction → scroll-linked image story → considered service options.",
    focus: ["Scroll storytelling", "Editorial composition", "Service discovery"],
  },
  8: {
    tag: "Cinematic service experience",
    description: "An immersive opening → a visual service sequence → your approach → an enquiry journey.",
    focus: ["Immersive art direction", "Service storytelling", "Brand atmosphere"],
  },
  9: {
    tag: "Advanced service discovery",
    description: "Structured service navigation → detailed offers → a connected enquiry journey.",
    focus: ["Service navigation", "Detailed offer discovery", "Enquiry journeys"],
  },
};

export const serviceGalleryCopy = {
  shop: "Explore services",
  featured: "Ways we can help",
  collections: "Find your starting point.",
  brandNote: "Personal attention. A clear next step.",
  newsletter: "Useful ideas, delivered.",
  discover: "Explore your options",
  filters: ["All services", "Consultations", "Projects"],
  recommendations: "Other ways we can help",
  campaign: "A NEW STARTING POINT",
  campaignCollection: "Explore the service",
  bundleTitle: "Support that fits.",
  bundleAction: "Explore your options",
  footer: ["Our approach", "Contact", "Service details"],
  collectionNames: ["Consultations", "Projects", "Ongoing support"],
  premiumThumbnail: {
    filterTitle: "Explore services",
    filterChoices: ["All", "Consultations", "Projects"],
    chooseView: "Choose a service",
    selectedView: "Selected service",
    story: "Our approach",
  },
  serviceEyebrow: "WAYS WE CAN HELP",
};

const createReferences = (styles: typeof referenceStyles, categories: CategoryReference[] = categoryTemplates) => categories.flatMap((t) =>
  styles.map((style) => ({
    ...t,
    businessType: t.businessType ?? "products",
    id: `${t.id}-${style.suffix.toLowerCase().replaceAll(" ", "-")}`,
    name: `${t.name} ${t.businessType === "services" && style.layout === 9 ? "Service Studio" : style.suffix}`,
    layout: style.layout,
    minPackage: style.minPackage,
    palette: style.palette,
    ...(t.businessType === "services" ? serviceReferenceStyles[style.layout] : {
      tag: style.tag,
      description: style.description,
      focus: style.focus,
    }),
    images: t.images ?? [
      t.image,
      t.image.replace(".jpg", "-detail.jpg"),
      t.image.replace(".jpg", "-story.jpg"),
    ],
    conceptImage: undefined as ShopifyReferenceConcept | undefined,
    signatureTheme: undefined as ShopifySignatureTheme | undefined,
  })),
);

const premiumPortfolioReferences = [
  {
    ...createReferences([premiumReferenceStyles[0]], categoryTemplates.filter(reference => reference.category === "Fashion"))[0],
    id: "clotya-fashion-premium",
    signatureTheme: "clotya" as const,
    name: "Clotya Fashion",
    tag: "Interactive fashion storefront",
    headline: "Street Fashion not only for the street",
    brief: "Considered pieces. Effortless layers. A wardrobe that moves with you.",
    product: clotyaProducts[0].name,
    price: String(clotyaProducts[0].price),
    image: clotyaProducts[0].src,
    images: clotyaProducts.map(product => product.src),
    palette: 1,
    description: "Editorial homepage → shoppable collections → size selection → product details and a working sample bag.",
    focus: ["Collection browsing", "Product & size selection", "Interactive shopping bag"],
    conceptImage: {
      src: "/store-studio/portfolio/clotya-refined.webp",
      alt: "Clotya premium fashion storefront concept with editorial imagery and full-page collection sections",
      width: 793,
      height: 1983,
    },
  },
  {
    ...createReferences([premiumReferenceStyles[0]], categoryTemplates.filter(reference => reference.category === "Food & drink"))[0],
    id: "ecolife-organic-premium",
    signatureTheme: "ecolife" as const,
    name: "EcoLife Organic",
    tag: "Interactive organic food storefront",
    headline: "Eat Organic & Healthy Food",
    brief: "Fresh finds, seasonal favourites and everyday ingredients. Bring something good to the table.",
    product: ecolifeProducts[0].name,
    price: String(ecolifeProducts[0].price),
    image: ecolifeProducts[0].src,
    images: ecolifeProducts.map(product => product.src),
    palette: 3,
    description: "Produce-led homepage → shoppable food categories → quick add → product details and a working sample bag.",
    focus: ["Food category browsing", "Quick add & product details", "Interactive shopping bag"],
    conceptImage: {
      src: "/store-studio/portfolio/ecolife-refined.webp",
      alt: "EcoLife premium organic food storefront concept with fresh-product categories and complete homepage sections",
      width: 793,
      height: 1983,
    },
  },
];

const topTierSignatureReferences = [
  {
    theme: "beauty" as const, category: "Beauty", name: "Ritual Beauty Atelier", palette: 4,
    headline: "A little care. A daily ritual.",
    brief: "Discover beautiful textures, everyday essentials and the small moments that make a routine feel like yours.",
    tag: "An interactive beauty experience",
    description: "Concern-led discovery → routine selector → complete product catalogue → detailed products and a working sample bag.",
    focus: ["Morning & evening routines", "Shop by collection", "Complete product journey"],
  },
  {
    theme: "living" as const, category: "Home", name: "Forme Living Atelier", palette: 2,
    headline: "A home, thoughtfully composed.",
    brief: "Considered furniture, warm textures and the details that make your space your own.",
    tag: "An interactive interiors experience",
    description: "Editorial room stories → shoppable room details → curated furniture collections → product pages and a working sample bag.",
    focus: ["Interactive room spotlight", "Curated collections", "Complete product journey"],
  },
  {
    theme: "tech" as const, category: "Technology", name: "Pulse Audio Studio", palette: 0,
    headline: "Hear more. Feel everything.",
    brief: "Explore a new listening experience, from your everyday companion to your complete setup.",
    tag: "An interactive technology experience",
    description: "Cinematic product launch → interactive product comparison → complete audio catalogue → product pages and a working sample bag.",
    focus: ["Product comparison", "Feature-led discovery", "Complete product journey"],
  },
].map(direction => {
  const definition = signatureCatalog[direction.theme];
  return {
    ...createReferences([additionalReferenceStyles[1]], categoryTemplates.filter(reference => reference.category === direction.category))[0],
    ...direction,
    id: definition.id,
    signatureTheme: direction.theme,
    layout: 8,
    minPackage: "Top Tier",
    product: definition.products[0].name,
    price: String(definition.products[0].price),
    image: definition.products[0].src,
    images: definition.products.map(product => product.src),
  };
});

// Preserve all existing reference IDs and positions before appending new directions.
export const studioTemplates = [
  ...createReferences(referenceStyles),
  ...createReferences(premiumReferenceStyles),
  ...createReferences(additionalReferenceStyles),
  ...createReferences(
    [...referenceStyles, ...premiumReferenceStyles, ...additionalReferenceStyles],
    [...additionalProductCategories, ...serviceCategories],
  ),
  ...premiumPortfolioReferences,
  ...topTierSignatureReferences,
];
export const packageDirections = [
  {
    audience: "A focused first launch",
    difference: "Theme-based design · up to 10 products",
    detail:
      "Start with an existing theme and a dedicated designer and developer.",
  },
  {
    audience: "A branded shopping experience",
    difference: "Customised design · up to 50 products",
    detail: "Adds tailored styling, a mini cart, newsletter signup and an abandoned-checkout email setup.",
  },
  {
    audience: "Clearer product discovery",
    difference: "Filters & analytics · up to 75 products",
    detail: "Adds configured filters, related-product recommendations and GA4 setup.",
  },
  {
    audience: "Content and product discovery",
    difference: "Reviews & blog · up to 125 products",
    detail: "Adds review content, a blog and five promotional banners.",
  },
  {
    audience: "An expanding brand",
    difference: "Unique page designs · up to 250 products",
    detail:
      "Adds unique pages, more logo concepts, a custom cart, international setup and a project manager.",
  },
  {
    audience: "A custom commerce project",
    difference: "Custom development · up to 500 products",
    detail:
      "Customer dashboard, custom forms, filters and broader integrations.",
  },
];
export const templateCopy = {
  projectQuestion: "What can we help you build?",
  projectTypes: ["New store", "Redesign my store", "Move to Shopify"],
  edit: "Edit",
  noneYet: "No additional requirements yet.",
  assets: "Your supplied assets",
  noLogo: "Custom logo design is included. No existing logo is needed.",
  noPhotos: "Product photos can be supplied later.",
  downloadReadable: "Download a text copy",
  exportNote:
    "Keep a readable copy of your choices. Uploaded images stay in this browser and are not included in the downloaded brief.",

  resultsLabel: "design references",
  dropLogo: "Drop your existing logo here",
  dropProducts: "Drop your product photos here",
  browseFiles: "or choose files",
  replaceFiles: "Choose replacement files",
  uploadLimits: "JPG, PNG or WebP · up to 10 MB per file",
  logoHint: "Optional existing logo. A transparent PNG works well.",
  productHint:
    "Choose up to four images together. They’ll appear in your reference preview.",
  uploaded: "Added to your preview",

  packageHeading: "Choose the scope that fits your business.",
  packageIntro:
    "Compare the themes, customisation and functionality included in each package. Prices show the full development fee in USD: pay 40% upfront and 60% after delivery.",
  packageDifference: "What sets this package apart",
  visualNote: "More themes, customisation and functionality as your package grows.",

  quantity: "Quantity",
  galleryLabel: "Sample image",
  productNote:
    "Illustrative product page. Your actual images, options, specifications and policies will be configured by our team.",
  shippingTitle: "Delivery & returns",
  shippingBody:
    "Your shipping costs, estimated delivery times and returns policy will appear here so customers can review them before ordering.",
  productHighlights: "Why it belongs in your everyday",
  productHighlightBody:
    "Use this space to explain the product’s real benefits, materials and care instructions. Clear answers help customers make a confident choice.",
  search: "Search references, categories or styles",
  empty: "No matching references. Try another category or search term.",
  clear: "Reset filters",
  previewAction: "Use this design",
  previewSummary:
    "Choose a reference, tell us what your store needs, then review your package. Our team builds the final store.",
  nextReference: "Next reference",
  previousReference: "Previous reference",
  preferenceSummary: "Your chosen direction",
  changeReference: "Explore another reference",
  previewDetails: "About this reference & package",

  modalScope:
    "This is an illustrative design included in your package. Your selected package defines the final functionality and customization. Our team builds the store around your brand.",
  scopeTitle:
    "Design and customization included in your package.",
  scopeNote:
    "Choose from the designs included in your package. Beginner includes your logo, photos and a preset palette. Higher tiers add custom colors, layout choices, campaign sections, motion and advanced commerce. Our team builds and refines the final store with you.",
  scopeSelected: "Included in your selected package",
  referenceOnly: "EXAMPLE PREVIEW · NOT YOUR FINAL STORE",
  customPalette: "Custom palette",
  customPaletteHint:
    "Choose your own colours or enter six-digit hex codes. These guide our team; we’ll refine contrast and readability before launch.",
  start: "Select & explore",
  referenceHelp:
    "Have another website in mind? Share its link and tell us what you like. We’ll use it as inspiration for your own design, not copy another brand.",
  teamNote: "You choose the direction. We design and build your store.",
  salesTitle: "A clearer path from discovery to purchase.",
  salesBody:
    "This concept brings product details, collection browsing and buying decisions into one considered experience. Your real benefits and policies will replace the sample content.",
  productCta: "Explore the featured product",
  benefitTitle: "Details that help you decide",
  benefits: [
    "Product story and specifications",
    "Clear pricing and options",
    "Delivery and returns information",
  ],
  collections: "Discover the collection",
  storyEyebrow: "BEHIND THE BRAND",
  storyTitle: "Made for the way you live.",
  storyBody:
    "A considered collection, a fresh perspective. Discover the details that make everyday essentials feel a little more personal.",
  storyCta: "Find your favourites",
  faqTitle: "A little more to know",
  faqs: [
    {
      q: "What makes this collection different?",
      a: "Your materials, craftsmanship and product story will be highlighted here, helping customers choose with confidence.",
    },
    {
      q: "How do delivery and returns work?",
      a: "Your confirmed delivery times, shipping prices and returns policy will be clearly explained here before launch.",
    },
  ],
  collectionNames: [
    "The everyday edit",
    "A fresh perspective",
    "Details to discover",
  ],
  title: "Choose an included design",
  intro:
    "Choose your industry, preview an included design, then make it your starting point.",
  all: "All references",
  apply: "Explore reference",
  active: "Selected reference",
  undo: "Undo template change",
  preview: "Explore full preview",
  personalise: "Customise this theme for me",
  customise: "Tell us your preferences",
  gallery: "Choose a design reference",
  packageTitle: "Your package",
  changePackage: "Compare or change package",
  applied:
    "Reference selected for our team. Your branding and uploaded products are preserved.",
  return: "Back to design references",
  browse:
    "This is an idea of how your store could look. We’ll customise the final design around your brand and build a sales-focused shopping experience within your agreed package.",
  look: "Choose your inspiration",
  editDetails: "Share your brand with us",
  optional: "Optional details",
  advanced: "Product details & store headline",
  previewTitle: "A starting idea for your store",
  layoutNames: [
    "Editorial",
    "Centered",
    "Bold launch",
    "Image first",
    "Spotlight",
    "Catalogue",
    "Dimensional showcase",
    "Editorial parallax",
    "Cinematic experience",
    "Commerce Studio",
  ],
  instruction:
    "These are preferences for our design team, not a DIY builder. Tell us what you like and we’ll handle the customisation.",
  selectedTemplate: "Design reference",
  previewHint:
    "Tip: browse Home, Shop and Product to see the complete journey.",
  resetImages: "Use sample images",
  mobilePreview: "Explore my reference",
  proof: [
    "Clear product information",
    "Simple navigation",
    "Easy buying journey",
  ],
};
export const studioPalettes = ["bg-primary", "bg-secondary", "bg-accent"];

export const studioColourPalettes = [
  {
    name: "Ocean",
    accent: "#1557b0",
    ink: "#10243b",
    surface: "#ffffff",
    soft: "#eaf2fb",
  },
  {
    name: "Monochrome",
    accent: "#202020",
    ink: "#161616",
    surface: "#ffffff",
    soft: "#f1f1ef",
  },
  {
    name: "Terracotta",
    accent: "#a44025",
    ink: "#38241e",
    surface: "#fffcf8",
    soft: "#f7e9dc",
  },
  {
    name: "Forest",
    accent: "#245c43",
    ink: "#15372a",
    surface: "#fcfdf9",
    soft: "#e6eee2",
  },
  {
    name: "Plum",
    accent: "#733d83",
    ink: "#35213d",
    surface: "#fffaff",
    soft: "#f0e6f5",
  },
  {
    name: "Midnight",
    accent: "#98c8ff",
    ink: "#f0f5ff",
    surface: "#111a2b",
    soft: "#1c2a40",
  },
];
