import type { ShopifySignatureProductSeed } from "@/interfaces/shopify-signature-storefront-interface";

export const ecolifeProducts: ShopifySignatureProductSeed[] = [
  { name: "Creamy Avocado Duo", collection: "Vegetables", price: 4.8, src: "/store-studio/ecolife/avocado.jpg", description: "Two avocados for toast, salads and homemade guacamole. Allow firm fruit to ripen at room temperature." },
  { name: "Tender Green Broccoli", collection: "Vegetables", price: 3.2, src: "/store-studio/ecolife/broccoli.jpg", description: "A whole head of broccoli for roasting, steaming or adding to a colourful stir-fry. Keep refrigerated." },
  { name: "Sweet Forest Strawberries", collection: "Berries", price: 6.5, src: "/store-studio/ecolife/strawberries.jpg", description: "A punnet of delicate strawberries with a fragrant, naturally sweet flavour. Refrigerate and rinse just before eating." },
  { name: "Sunshine Tangerines", collection: "Fresh Fruit", price: 5.4, src: "/store-studio/ecolife/citrus.jpg", description: "A citrus selection for lunchboxes, fresh juices and bright seasonal salads. Enjoy the segments or add their zest to your cooking." },
  { name: "Vine Cherry Tomatoes", collection: "Vegetables", price: 3.9, src: "/store-studio/ecolife/tomatoes.jpg", description: "Small tomatoes on the vine for a fresh salad, quick pasta sauce or slow roasting. Wash before serving." },
  { name: "Everyday Banana Bunch", collection: "Fresh Fruit", price: 2.8, src: "/store-studio/ecolife/bananas.jpg", description: "A bunch of bananas for breakfast bowls, smoothies and simple snacks. Store at room temperature away from direct sunlight." },
];

export const ecolifeCopy = {
  hero: {
    title: "Eat Organic & Healthy Food",
    description: "Fresh fruit, colourful vegetables and simple ingredients for a delicious everyday table.",
    primary: "Shop Now",
    image: "/store-studio/ecolife/hero-basket.png",
    imageAlt: "A kraft grocery bag filled with colourful fresh vegetables and leafy greens",
  },
  benefits: [
    { icon: "truck", title: "Curated Products", body: "Fresh ideas for your kitchen." },
    { icon: "apple", title: "Seasonal Favourites", body: "More colour in every basket." },
    { icon: "leaf", title: "Everyday Goodness", body: "Simple food. Delicious meals." },
    { icon: "basket", title: "Your Weekly Shop", body: "Choose your own fresh mix." },
  ],
  offers: {
    title: "Fresh Offers:",
    items: [
      { title: "The good green things in life", body: "Make every meal a little fresher", action: "Shop Vegetables", collection: "Vegetables", image: "/store-studio/ecolife/harvest.jpg", imageAlt: "Fresh green vegetables and a seasonal salad", tone: "dark" },
      { title: "Fresh fruit. A brighter basket.", body: "A little sunshine, picked for you", action: "Shop Now", collection: "Fresh Fruit", image: "/store-studio/ecolife/citrus.jpg", imageAlt: "A selection of fresh tangerines", tone: "leaf" },
    ],
  },
  categories: {
    action: "Shop collection",
    items: [
      { title: "Produce", collection: "", image: "/store-studio/ecolife/bananas.jpg", imageAlt: "Fresh bananas", tone: "yellow" },
      { title: "Fresh Fruit", collection: "Fresh Fruit", image: "/store-studio/ecolife/citrus.jpg", imageAlt: "Fresh tangerines", tone: "peach" },
      { title: "Berries", collection: "Berries", image: "/store-studio/ecolife/strawberries.jpg", imageAlt: "Sweet strawberries", tone: "coral" },
      { title: "Vegetables", collection: "Vegetables", image: "/store-studio/ecolife/broccoli.jpg", imageAlt: "Green broccoli", tone: "orange" },
      { title: "Salad Picks", collection: "Vegetables", image: "/store-studio/ecolife/tomatoes.jpg", imageAlt: "Vine cherry tomatoes", tone: "sand" },
      { title: "Sweet & Juicy", collection: "Berries", image: "/store-studio/ecolife/strawberries.jpg", imageAlt: "A basket of ripe strawberries", tone: "pink" },
      { title: "Breakfast Fruit", collection: "Fresh Fruit", image: "/store-studio/ecolife/bananas.jpg", imageAlt: "Bananas for breakfast", tone: "apricot" },
      { title: "Everyday Greens", collection: "Vegetables", image: "/store-studio/ecolife/avocado.jpg", imageAlt: "Fresh avocado halves", tone: "tan" },
    ],
  },
  products: {
    title: "Produce",
    secondTitle: "Fresh Fruit & Vegetables",
    picksTitle: "Fresh Picks of the Week",
    topTitle: "Top Products",
    view: "View product",
    add: "Add to basket",
    added: "Added",
    addedMessage: "{product} added to your basket.",
    viewBasket: "View basket",
    all: "All Produce",
    browse: "Shop all",
    filter: "Filter products",
    empty: "Choose another collection to see more fresh finds.",
  },
  campaign: {
    title: "Fresh Food Simply Delicious",
    body: "Good ingredients. A fresh idea for every meal.",
    action: "Shop Now",
    leftImage: "/store-studio/ecolife/grower.jpg",
    leftAlt: "A grower carrying a basket of fresh produce",
    rightImage: "/store-studio/ecolife/hero-basket.png",
    rightAlt: "A bag of fresh colourful vegetables",
  },
  promotions: [
    { title: "Bring Home More Greens", body: "Fresh ingredients for your everyday table", action: "Shop Now", collection: "Vegetables", image: "/store-studio/ecolife/broccoli.jpg", imageAlt: "A fresh green broccoli head", tone: "leaf" },
    { title: "Everyday Fresh", body: "Make room for your favourites", action: "Shop Now", collection: "Berries", image: "/store-studio/ecolife/strawberries.jpg", imageAlt: "Fresh strawberries", tone: "pink" },
  ],
  discovery: {
    title: "Fresh Produce Categories:",
    items: [
      { title: "Produce", collection: "", image: "/store-studio/ecolife/bananas.jpg", imageAlt: "A bunch of fresh bananas", tone: "yellow" },
      { title: "Fresh Fruit", collection: "Fresh Fruit", image: "/store-studio/ecolife/citrus.jpg", imageAlt: "Tangerines and citrus leaves", tone: "lime" },
      { title: "Vegetables", collection: "Vegetables", image: "/store-studio/ecolife/broccoli.jpg", imageAlt: "A fresh green broccoli head", tone: "olive" },
      { title: "Breakfast & Snack Ideas", collection: "Berries", image: "/store-studio/ecolife/strawberries.jpg", imageAlt: "Sweet strawberries for breakfast or a snack", tone: "sage" },
    ],
  },
  reassurance: {
    title: "Good food for your everyday table",
    action: "Shop Now",
  },
  lists: {
    firstTitle: "Fresh Favourites",
    secondTitle: "For Your Next Meal",
    firstBanner: { title: "Special Flavour", body: "Good food. Good moments.", action: "Shop Now", collection: "Vegetables", image: "/store-studio/ecolife/avocado.jpg", imageAlt: "Fresh avocado halves", tone: "olive" },
    secondBanner: { title: "Make Your Plate Colourful", body: "Fresh fruit and vegetables", action: "Shop Now", collection: "Fresh Fruit", image: "/store-studio/ecolife/citrus.jpg", imageAlt: "Colourful fresh tangerines", tone: "orange" },
  },
  theme: {
    cream: "#fbf4e5", leaf: "#e8efdc", yellow: "#f6d638", peach: "#f5b76d", coral: "#ff8e77",
    orange: "#f6a75f", sand: "#f3d2a9", pink: "#f6a0af", apricot: "#eabe8d", tan: "#e1bd8d",
    lime: "#b7d96d", olive: "#b7cc75", sage: "#b1cd8c",
  },
} as const;

// Individual reference photographs, verified against their product names.
// These are imagery assets, not a screenshot of a storefront.
export const ecolifeImageCredits = [
  { file: "avocado.jpg", photographer: "Thought Catalog / Quote Catalog", page: "https://unsplash.com/photos/sliced-avocado-EMX1eJ1BcgU", source: "https://www.quotecatalog.com", license: "Unsplash License" },
  { file: "broccoli.jpg", photographer: "Mockup Graphics", page: "https://unsplash.com/photos/green-broccoli-on-white-background-l55IGtwI8mI", license: "Unsplash License" },
  { file: "strawberries.jpg", photographer: "Marina Grynykha", page: "https://unsplash.com/photos/strawberries-in-basket-QEbi9xFE194", license: "Unsplash License" },
  { file: "citrus.jpg", photographer: "Gaby Yerden", page: "https://unsplash.com/photos/orange-fruits-on-white-surface-Cw1cmcW8D6s", license: "Unsplash License" },
  { file: "tomatoes.jpg", photographer: "Mockup Graphics", page: "https://unsplash.com/photos/red-tomatoes-on-white-background-paOhdpqcYuY", license: "Unsplash License" },
  { file: "bananas.jpg", photographer: "Mockup Graphics", page: "https://unsplash.com/photos/3-yellow-banana-fruits-on-white-surface-vVjA1KeKg-w", license: "Unsplash License" },
  { file: "harvest.jpg", photographer: "Nadine Primeau", page: "https://unsplash.com/photos/sliced-broccoli-and-cucumber-on-plate-with-gray-stainless-steel-fork-near-green-bell-pepper-snowpea-and-avocado-fruit-l5Mjl9qH8VU", license: "Unsplash License" },
  { file: "grower.jpg", photographer: "Tima Miroshnichenko", page: "https://www.pexels.com/photo/farmer-holding-basket-with-fresh-harvest-of-fruits-and-vegetables-4975353/", license: "Pexels License" },
] as const;
