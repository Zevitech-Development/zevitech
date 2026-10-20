import type { ShopifySignatureProductSeed } from "@/interfaces/shopify-signature-storefront-interface";

export const clotyaProducts: ShopifySignatureProductSeed[] = [
  { name: "Textured Cream Knit", collection: "Knitwear", price: 78, src: "/store-studio/clotya/collared-knit.jpg", description: "A textured cream knit with a relaxed silhouette and contrasting collar. A soft statement piece for everyday layering." },
  { name: "Everyday White Tee", collection: "Essentials", price: 32, src: "/store-studio/clotya/white-tee.jpg", description: "A clean crew-neck tee with an easy shape. An understated starting point for denim, tailoring and relaxed weekend layers." },
  { name: "Washed Denim Jacket", collection: "Outerwear", price: 98, src: "/store-studio/clotya/denim-jacket.jpg", description: "A light-wash denim jacket with classic button detailing. Layer over a simple tee for an easy everyday look." },
  { name: "Quilted Mini Bag", collection: "Bags", price: 64, src: "/store-studio/clotya/quilted-bag.jpg", description: "A compact quilted bag in a warm neutral shade, finished with structured handles and polished hardware." },
  { name: "Fringed Knit Top", collection: "Knitwear", price: 48, src: "/store-studio/fashion-detail.jpg", description: "An open-knit layer with a soft cream colour and a fringed finish. Pair with simple basics for a little extra texture." },
  { name: "Brown Lace-up Boots", collection: "Footwear", price: 108, src: "/store-studio/clotya/lace-up-boots.jpg", description: "Polished brown lace-up boots with rounded toes. A versatile finishing touch for denim, relaxed trousers and seasonal layers." },
  { name: "Sculpted Twist Hoops", collection: "Jewellery", price: 38, src: "/store-studio/jewellery.jpg", description: "Sculptural gold-tone hoops with a twisted finish. A small finishing detail with plenty of personality." },
  { name: "Burgundy Statement Coat", collection: "Outerwear", price: 128, src: "/store-studio/fashion.jpg", description: "A rich burgundy coat with a structured collar. An expressive outer layer to style over your everyday wardrobe." },
];

export const clotyaHomeCopy = {
  navigation: {
    label: "Shop by category",
    title: "All categories",
    all: "All products",
    fresh: "New arrivals",
    ready: "Ready to wear",
    items: ["Knitwear", "Essentials", "Outerwear", "Bags", "Footwear", "Jewellery"],
  },
  hero: {
    label: "Seasonal collections",
    previous: "Previous collection",
    next: "Next collection",
    slideLabel: "View collection",
    action: "Shop collection",
    slides: [
      { eyebrow: "The new-season collection", headline: "Street Fashion not only for the street", description: "Everyday layers with a little more personality.", collection: "Knitwear", image: "/store-studio/clotya/collared-knit.jpg", imageAlt: "Woman wearing a textured cream knit with a contrasting collar" },
      { eyebrow: "The denim collection", headline: "A fresh take on your everyday favourites", description: "Easy layers. New possibilities.", collection: "Outerwear", image: "/store-studio/clotya/denim-jacket.jpg", imageAlt: "Woman styling a washed denim jacket over a white tee" },
      { eyebrow: "The finishing touches", headline: "Small details. A whole new look.", description: "Find the pieces that bring it all together.", collection: "Bags", image: "/store-studio/clotya/quilted-bag.jpg", imageAlt: "Quilted neutral handbag with polished hardware" },
    ],
  },
  benefits: [
    { title: "Delivery details", description: "Clear options before checkout", icon: "delivery" },
    { title: "Easy to choose", description: "Explore sizes and product details", icon: "shield" },
    { title: "Shopping support", description: "Helpful answers as you browse", icon: "support" },
    { title: "Simple checkout", description: "Your favourites, all in one bag", icon: "payment" },
  ],
  promotions: {
    eyebrow: "New season",
    action: "Shop now",
    items: [
      { title: "Big textures are back in fashion", description: "Soft layers with a fresh perspective.", collection: "Knitwear", image: "/store-studio/fashion-detail.jpg", imageAlt: "Cream knit top with an open-knit texture and fringe" },
      { title: "The latest layers for this season", description: "An everyday classic, styled your way.", collection: "Outerwear", image: "/store-studio/clotya/denim-jacket.jpg", imageAlt: "Light-wash denim jacket" },
      { title: "Show your fashion from the ground up", description: "Finish your look with something timeless.", collection: "Footwear", image: "/store-studio/clotya/lace-up-boots.jpg", imageAlt: "Brown leather lace-up boots" },
    ],
  },
  products: {
    title: "The Everyday Edit",
    description: "Easy favourites, new textures and finishing touches. Find your next go-to piece.",
    featuredTitle: "Featured Products",
    featuredDescription: "A closer look at the pieces bringing this collection together.",
    all: "Shop all",
    view: "View product",
    options: "Choose options",
    empty: "Explore the collection",
    badge: "The collection",
  },
  campaign: {
    eyebrow: "The piece of the week",
    title: "The white tee. Anything but ordinary.",
    description: "The simplest starting point for your next look. Pair with textured knitwear, light-wash denim or your favourite statement coat.",
    details: ["Clean crew neck", "Everyday shape", "Easy layering"],
    action: "Shop this piece",
    image: "/store-studio/clotya/white-tee.jpg",
    imageAlt: "White crew-neck tee",
  },
  accessories: {
    eyebrow: "New season",
    action: "Shop now",
    items: [
      { title: "Show your best jewellery, every day", description: "The details make the difference.", collection: "Jewellery", image: "/store-studio/jewellery.jpg", imageAlt: "Sculptural gold-tone hoop earrings" },
      { title: "Your everyday carry, reimagined", description: "Make room for your next favourite.", collection: "Bags", image: "/store-studio/clotya/quilted-bag.jpg", imageAlt: "A structured quilted bag" },
    ],
  },
  categories: {
    title: "Best for your categories",
    description: "Find your way to a new favourite.",
    items: [
      { name: "Knitwear", image: "/store-studio/clotya/collared-knit.jpg" },
      { name: "Essentials", image: "/store-studio/clotya/white-tee.jpg" },
      { name: "Bags", image: "/store-studio/clotya/quilted-bag.jpg" },
      { name: "Jewellery", image: "/store-studio/jewellery.jpg" },
      { name: "Footwear", image: "/store-studio/clotya/lace-up-boots.jpg" },
      { name: "Outerwear", image: "/store-studio/clotya/denim-jacket.jpg" },
    ],
  },
  highlights: {
    title: "Don’t Miss These Finds",
    description: "Two more reasons to take a closer look.",
    label: "In the spotlight",
    detail: "Explore the details, choose your size and make it yours.",
    action: "Choose options",
    ribbon: "Your next favourite starts here.",
    ribbonAction: "Explore the full collection",
  },
  journal: {
    title: "Our Latest Style Notes",
    description: "A little inspiration for the way you dress every day.",
    action: "Explore this edit",
    items: [
      { eyebrow: "The collection", title: "The pieces that shape your style", description: "Make a familiar wardrobe feel new with expressive layers and thoughtful details.", collection: "Outerwear", image: "/store-studio/fashion.jpg", imageAlt: "Burgundy coat styled for an expressive everyday look" },
      { eyebrow: "Everyday dressing", title: "New finds, familiar favourites", description: "Bring a little texture to a clean silhouette and let the layers do the talking.", collection: "Knitwear", image: "/store-studio/clotya/collared-knit.jpg", imageAlt: "Cream knit styled with a contrasting collar" },
      { eyebrow: "The finishing touch", title: "Small details, big possibilities", description: "Simple accessories bring a fresh perspective to the pieces you already love.", collection: "Jewellery", image: "/store-studio/jewellery-detail.jpg", imageAlt: "Blue and clear statement earrings on a green leaf" },
    ],
  },
};
