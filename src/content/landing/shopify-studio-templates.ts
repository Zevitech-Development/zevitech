import { getCategorySignatureProducts } from "./shopify-category-signature-content";
import { getShopifyServiceCategory } from "./shopify-service-preview-content";
import type { ShopifyReferenceConcept } from "@/interfaces/shopify-reference-concept-interface";
import { clotyaProducts } from "./shopify-clotya-content";
import { ecolifeProducts } from "./shopify-ecolife-content";
import { signatureCatalog } from "./shopify-signature-catalog";
import type { ShopifySignatureTheme } from "@/interfaces/shopify-signature-storefront-interface";

/** Licensed Unsplash photography (free commercial use) for categories without local imagery. */
const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=75`;
const photos = (...ids: string[]) => ids.map(photo);

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
    minPackage: "Beginner",
    palette: 0,
    tag: "Product-led selling",
    description:
      "Image-led collection edits → quick-add products → brand story → newsletter signup.",
    focus: ["Hero product", "Benefit-led content", "Direct purchase journey"],
  },
  {
    suffix: "Boutique",
    layout: 3,
    minPackage: "Beginner",
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
    minPackage: "Beginner",
    palette: 1,
    tag: "Layered 3D showcase",
    description:
      "Perspective product layers → a closer-look story → a clear collection journey.",
    focus: ["Dimensional photography", "Product storytelling", "Motion controls"],
  },
  {
    suffix: "Parallax",
    layout: 7,
    minPackage: "Beginner",
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
    minPackage: "Beginner",
    palette: 1,
    tag: "Campaign storytelling",
    description:
      "Featured-product campaign → benefit panels → promotional story → focused shop grid.",
    focus: ["Promotional storytelling", "Product benefits", "Campaign conversion"],
  },
  {
    suffix: "Cinematic",
    layout: 8,
    minPackage: "Beginner",
    palette: 5,
    tag: "Cinematic brand experience",
    description:
      "Immersive full-image opening → cinematic product sequence → expansive brand story → collection reveal.",
    focus: ["Immersive art direction", "Product sequences", "Brand atmosphere"],
  },
  {
    suffix: "Commerce Studio",
    layout: 9,
    minPackage: "Beginner",
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
  /** Sample products shown in premium storefront previews (one per image). */
  products?: { name: string; price: number }[];
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
  },  {
    id: "stride", name: "Stride", category: "Shoes & footwear",
    products: [{ name: "Suede Chelsea boot", price: 129 }, { name: "Leather brogue boot", price: 159 }, { name: "Classic penny loafer", price: 119 }, { name: "Horsebit leather loafer", price: 139 }, { name: "Tan suede driver", price: 109 }, { name: "Navy derby shoe", price: 149 }],
    headline: "Step into something new.",
    brief: "Everyday sneakers and statement pairs, made for the way you move.",
    product: "Suede Chelsea boot", price: "129", image: photo("photo-1605733160314-4fc7dac4bb16"),
    images: photos("photo-1605733160314-4fc7dac4bb16", "photo-1638609348722-aa2a3a67db26", "photo-1662541089338-c7d53b88be70", "photo-1616406432452-07bc5938759d", "photo-1676121270762-47c8d3a7b9d5", "photo-1668069226492-508742b03147"),
  },
  {
    id: "lumen", name: "Lumen", category: "Skincare",
    products: [{ name: "Daily hydrating serum", price: 32 }, { name: "Botanical face oil", price: 38 }, { name: "Gentle cleansing balm", price: 26 }, { name: "Barrier repair cream", price: 36 }, { name: "Night recovery mask", price: 44 }],
    headline: "Skin that feels like yours.",
    brief: "Gentle formulas and simple routines for every skin type.",
    product: "Daily hydrating serum", price: "32", image: photo("photo-1583209814683-c023dd293cc6"),
    images: photos("photo-1583209814683-c023dd293cc6", "photo-1612817288484-6f916006741a", "photo-1629380108599-ea06489d66f5", "photo-1608068811588-3a67006b7489", "photo-1785581778868-79100f7fe56c"),
  },
  {
    id: "sillage", name: "Sillage", category: "Fragrance",
    products: [{ name: "Eau de parfum 50 ml", price: 85 }, { name: "Discovery set", price: 42 }, { name: "Signature scent 100 ml", price: 128 }],
    headline: "Find the scent that stays with you.",
    brief: "Signature scents, discovery sets and gifts worth giving.",
    product: "Eau de parfum 50 ml", price: "85", image: photo("photo-1543422655-ac1c6ca993ed"),
    images: photos("photo-1543422655-ac1c6ca993ed", "photo-1615634260167-c8cdede054de", "photo-1761659760494-32b921a2449f"),
  },
  {
    id: "oakform", name: "Oak & Form", category: "Furniture",
    products: [{ name: "Lounge armchair", price: 640 }, { name: "Modular sofa", price: 1890 }, { name: "Oak side table", price: 290 }, { name: "Linen three-seater", price: 2150 }, { name: "Walnut dining chair", price: 340 }, { name: "Low media console", price: 890 }],
    headline: "Furniture made for living.",
    brief: "Sofas, chairs and tables crafted to last and easy to love.",
    product: "Lounge armchair", price: "640", image: photo("photo-1634712282287-14ed57b9cc89"),
    images: photos("photo-1634712282287-14ed57b9cc89", "photo-1724582586529-62622e50c0b3", "photo-1606744824163-985d376605aa", "photo-1600121848594-d8644e57abab", "photo-1616137422495-1e9e46e2aa77", "photo-1680503397107-475907e4f3e3"),
  },
  {
    id: "hearth", name: "Hearth", category: "Kitchen & dining",
    products: [{ name: "Stoneware dinner set", price: 120 }, { name: "Handmade serving bowl", price: 48 }, { name: "Ceramic mug pair", price: 34 }, { name: "Glazed bowl collection", price: 64 }, { name: "Speckled plate set", price: 72 }, { name: "Stoneware cup trio", price: 42 }],
    headline: "Set a table worth gathering around.",
    brief: "Handmade ceramics, cookware and everyday tableware.",
    product: "Stoneware dinner set", price: "120", image: photo("photo-1610701596007-11502861dcfa"),
    images: photos("photo-1610701596007-11502861dcfa", "photo-1610701596061-2ecf227e85b2", "photo-1740478949627-155c907b3ca0", "photo-1524259493079-d51c2c78adfe", "photo-1740478949628-ff562c3c3923", "photo-1612870199268-d33b7e0bd9b0"),
  },
  {
    id: "littleleaf", name: "Little Leaf", category: "Baby & kids",
    products: [{ name: "Organic cotton bodysuit set", price: 34 }, { name: "Knitted nursery blanket", price: 58 }, { name: "Soft cotton romper", price: 29 }, { name: "Muslin swaddle set", price: 38 }, { name: "Nursery storage basket", price: 46 }],
    headline: "Soft things for small people.",
    brief: "Organic baby clothes, nursery essentials and thoughtful gifts.",
    product: "Organic cotton bodysuit set", price: "34", image: photo("photo-1766918780914-e19d9de76d85"),
    images: photos("photo-1766918780914-e19d9de76d85", "photo-1642379831634-1eb6a4e2788d", "photo-1766918780914-927fb058414b", "photo-1766918780914-5df4a5a98c44", "photo-1766918780917-d541f8cf8a7f"),
  },
  {
    id: "playwright", name: "Playwright", category: "Toys & games",
    products: [{ name: "Wooden stacking set", price: 28 }, { name: "Pull-along animal", price: 24 }, { name: "Alphabet puzzle", price: 32 }, { name: "Wooden animal friends", price: 36 }, { name: "Building block bucket", price: 42 }],
    headline: "Play that grows with them.",
    brief: "Wooden toys, puzzles and games for curious minds.",
    product: "Wooden stacking set", price: "28", image: photo("photo-1618842676088-c4d48a6a7c9d"),
    images: photos("photo-1618842676088-c4d48a6a7c9d", "photo-1560859251-d563a49c5e4a", "photo-1769072385024-c962e061c523", "photo-1703581698778-2224c729135b", "photo-1777351396220-9a3801de44df"),
  },
  {
    id: "folio", name: "Folio", category: "Books & stationery",
    products: [{ name: "Linen-bound notebook", price: 22 }, { name: "Weekly desk planner", price: 28 }, { name: "Dot-grid journal", price: 18 }, { name: "A5 sketchbook", price: 19 }, { name: "Daily task pad", price: 14 }],
    headline: "Write it down. Make it yours.",
    brief: "Notebooks, planners and desk essentials for everyday ideas.",
    product: "Linen-bound notebook", price: "22", image: photo("photo-1501618669935-18b6ecb13d6d"),
    images: photos("photo-1501618669935-18b6ecb13d6d", "photo-1651761409007-0395097c269d", "photo-1591195852468-03a01d1375d6", "photo-1554757387-fa0367573d09", "photo-1611079830811-865ff4428d17"),
  },
  {
    id: "kiln", name: "Kiln Studio", category: "Art & handmade",
    products: [{ name: "Hand-thrown vase", price: 58 }, { name: "Studio bowl", price: 44 }, { name: "Glazed bud vase set", price: 36 }, { name: "Speckled serving dish", price: 52 }, { name: "Hand-built planter", price: 46 }, { name: "Studio mug", price: 28 }],
    headline: "Made by hand, made to keep.",
    brief: "Small-batch ceramics and handmade pieces from the studio.",
    product: "Hand-thrown vase", price: "58", image: photo("photo-1597696929736-6d13bed8e6a8"),
    images: photos("photo-1597696929736-6d13bed8e6a8", "photo-1607556671927-78a6605e290b", "photo-1520408222757-6f9f95d87d5d", "photo-1607556672044-6110fc499247", "photo-1493106641515-6b5631de4bb9", "photo-1595351298020-038700609878"),
  },
  {
    id: "torque", name: "Torque", category: "Automotive",
    products: [{ name: "Ceramic detailing kit", price: 75 }, { name: "Microfibre wash set", price: 39 }, { name: "Interior care kit", price: 49 }, { name: "Wheel & tyre care kit", price: 45 }],
    headline: "Care for the car you love.",
    brief: "Detailing kits, accessories and performance parts.",
    product: "Ceramic detailing kit", price: "75", image: photo("photo-1780558852670-3f49298ecc1f"),
    images: photos("photo-1780558852670-3f49298ecc1f", "photo-1520340356584-f9917d1eea6f", "photo-1771340742493-52fbd5476ccb", "photo-1694678505383-676d78ea3b96"),
  },
];

const teamImages = [
  "/images/about-us/WhyChooseUsAboutUsImg02.jpeg",
  "/images/about-us/WhyChooseUsAboutUsImg01.jpeg",
  "/images/about-us/WhyChooseUsAboutUsImg03.jpeg",
];
const serviceCategoryImages = [
  { id: "fieldwork", category: "Professional services", images: photos("photo-1758691737138-7b9b1884b1db", "photo-1568992687947-868a62a9f521", "photo-1522071820081-009f0129c71c") },
  {
    id: "formfield", category: "Creative & digital",
    images: photos("photo-1487338875411-8880f74114a2", "photo-1733381919300-e49929a82a5b", "photo-1563019589-7e7db5152430"),
  },
  {
    id: "chapter", category: "Coaching & education",
    images: photos("photo-1616587226960-4a03badbe8bf", "photo-1588873281272-14886ba1f737", "photo-1758612898312-708f2ffdcd53"),
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
    images: photos("photo-1758875569256-f37c438cac65", "photo-1648542036561-e1d66a5ae2b1", "photo-1738523686534-7055df5858d6"),
  },
  {
    id: "service", category: "Services",
    images: ["/store-studio/general.jpg", "/store-studio/general-detail.jpg", "/store-studio/general-story.jpg"],
  },
  {
    id: "stillwater", category: "Spas",
    images: photos("photo-1600334089648-b0d9d3028eb2", "photo-1544161515-4ab6ce6db874", "photo-1761470575018-135c213340eb"),
  },
  {
    id: "editsalon", category: "Salons",
    images: photos("photo-1600948836101-f9ffda59d250", "photo-1580618672591-eb180b1a973f", "photo-1595475884562-073c30d45670"),
  },
  {
    id: "clearflow", category: "Plumbing",
    images: photos("photo-1676210134188-4c05dd172f89", "photo-1558618666-fcd25c85cd64", "photo-1749532125405-70950966b0e5"),
  },
  {
    id: "freshspace", category: "Home cleaning",
    images: photos("photo-1758273238415-01ec03d9ef27", "photo-1740657254989-42fe9c3b8cce", "photo-1773579305267-8d75e0af5be4"),
  },
  {
    id: "routewise", category: "Truck dispatching",
    images: photos("photo-1778103617525-76877c583fa5", "photo-1766785368863-f2188a8c8b32", "photo-1761133381018-aed5063d22fe"),
  },
  {
    id: "clarity", category: "Expert & consulting services",
    images: photos("photo-1758691737543-09a1b2b715fa", "photo-1517048676732-d65bc937f952", "photo-1758691737568-a1572060ce5a"),
  },
  {
    id: "comfortworks", category: "HVAC",
    images: photos("photo-1660330589827-da8ab7dd3c02", "photo-1603335730747-ca17baa3aac2", "photo-1705579605238-24a90c8799c5"),
  },
  { id: "hartwell", category: "Legal services", images: photos("photo-1450101499163-c8848c66ca85", "photo-1562564055-71e051d33c19", "photo-1505664194779-8beaceb93744") },
  { id: "northgate", category: "Real estate", images: photos("photo-1580587771525-78b9dba3b914", "photo-1600596542815-ffad4c1539a9", "photo-1748063578185-3d68121b11ff") },
  { id: "brightside", category: "Medical & dental clinics", images: photos("photo-1629909613654-28e377c37b09", "photo-1777331903190-341a3dd0441b", "photo-1606811841689-23dfddce3e95") },
  { id: "saffron", category: "Restaurants & catering", images: photos("photo-1625861910621-e9385ba1d993", "photo-1661259892845-f84f22e79077", "photo-1565895405140-6b9830a88c19") },
  { id: "goldenhour", category: "Events & photography", images: photos("photo-1623783356340-95375aac85ce", "photo-1629756048377-09540f52caa1", "photo-1611550287705-7ff8b459c8eb") },
  { id: "azure", category: "Travel & tourism", images: photos("photo-1610641818989-c2051b5e2cfd", "photo-1614505241498-80a3ec936595", "photo-1561501900-3701fa6a0864") },
  { id: "precision", category: "Auto repair", images: photos("photo-1619642751034-765dfdf7c58e", "photo-1676018366904-c083ed678e60", "photo-1771340012319-0b4fca008b54") },
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
    ...createReferences([additionalReferenceStyles[1]], categoryTemplates.filter(reference => reference.category === "Fashion"))[0],
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
    ...createReferences([additionalReferenceStyles[1]], categoryTemplates.filter(reference => reference.category === "Food & drink"))[0],
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
    minPackage: "Beginner",
    product: definition.products[0].name,
    price: String(definition.products[0].price),
    image: definition.products[0].src,
    images: definition.products.map(product => product.src),
  };
});

const signatureCategories: CategoryReference[] = [...categoryTemplates, ...additionalProductCategories, ...serviceCategories];
const categorySignatureReferences = signatureCategories.flatMap(category =>
  (["clotya", "ecolife"] as const).filter(theme => !(theme === "clotya" && category.category === "Fashion") && !(theme === "ecolife" && category.category === "Food & drink")).map(theme => ({
    ...createReferences([additionalReferenceStyles[1]], [category])[0],
    id: `${category.id}-${theme}-signature`,
    name: `${category.name} ${theme === "clotya" ? "Signature Editorial" : "Signature Discovery"}`,
    signatureTheme: theme,
    layout: 8,
    minPackage: "Beginner",
    palette: theme === "clotya" ? 1 : 3,
    tag: theme === "clotya" ? "Premium editorial experience" : "Premium discovery experience",
    description: category.businessType === "services"
      ? "Category-led homepage → detailed services → working enquiry journey."
      : "Complete editorial homepage → collection discovery → product details → interactive sample bag.",
    focus: category.businessType === "services" ? ["Service discovery", "Detailed scope", "Enquiry journey"] : ["Full-page storytelling", "Collection browsing", "Product discovery"],
  })).map(reference => {
    const products = getCategorySignatureProducts(reference);
    return { ...reference, images: products.map(p => p.src), image: products[0].src, product: products[0].name, price: String(products[0].price) };
  }),
);

/** Premium storefronts that unlock package by package, built for every product category. */
const tierThemes = [
  { theme: "lookbook" as const, suffix: "Lookbook", layout: 3, minPackage: "Beginner", palette: 2,
    tag: "Shop-the-look experience",
    description: "Shoppable lookbook photo with tap-to-shop hotspots → add the complete look in one step → filter and sort the collection.",
    focus: ["Shop the look", "One-tap complete outfit", "Filter & sort"] },
  { theme: "bundle" as const, suffix: "Bundle Builder", layout: 4, minPackage: "Beginner", palette: 0,
    tag: "Build-a-bundle experience",
    description: "Mix-and-match bundle builder → savings that grow with every item → live bundle tray and one-tap add to bag.",
    focus: ["Tiered bundle savings", "Live bundle tray", "Bigger average orders"] },
  { theme: "configurator" as const, suffix: "Configurator", layout: 6, minPackage: "Beginner", palette: 0,
    tag: "Product configurator",
    description: "Interactive 3D-tilt product stage → finishes, sizes and personal message with live pricing → currency switcher and wishlist.",
    focus: ["Live product options", "Personalisation", "Multi-currency & wishlist"] },
  { theme: "concierge" as const, suffix: "Concierge", layout: 9, minPackage: "Beginner", palette: 1,
    tag: "Personal-shopper experience",
    description: "Cinematic hero → personal-shopper quiz with matched products → member rewards, order tracking, subscribe & save and gift wrap.",
    focus: ["Product-finder quiz", "Member rewards & tracking", "Subscriptions & gifting"] },
];
const tierThemeReferences = [...categoryTemplates, ...additionalProductCategories].flatMap(category =>
  tierThemes.map(direction => {
    const reference = {
      ...createReferences([additionalReferenceStyles[1]], [category])[0],
      id: `${category.id}-${direction.theme}-signature`,
      name: `${category.name} ${direction.suffix}`,
      signatureTheme: direction.theme,
      layout: direction.layout,
      minPackage: direction.minPackage,
      palette: direction.palette,
      tag: direction.tag,
      description: direction.description,
      focus: direction.focus,
    };
    const products = getCategorySignatureProducts(reference);
    return { ...reference, images: products.map(p => p.src), image: products[0].src, product: products[0].name, price: String(products[0].price) };
  }),
);

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
  ...categorySignatureReferences,
  ...tierThemeReferences,
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
    "Every design is available with every package. Compare the customisation, setup limits and functionality included in each package. Prices show the full development fee in USD: pay 10% upfront and 90% after delivery.",
  packageDifference: "What sets this package apart",
  visualNote: "Every design, with more customisation and functionality as your package grows.",

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
