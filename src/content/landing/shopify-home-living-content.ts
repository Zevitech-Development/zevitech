import type { ShopifySignatureProductSeed } from "@/interfaces/shopify-signature-storefront-interface";

const assets = "/store-studio/living-premium";

export const livingProducts: ShopifySignatureProductSeed[] = [
  { name: "Sunday Lounge Chair", collection: "Seating", price: 420, src: `${assets}/lounge-chair.webp`, description: "A soft neutral armchair with gently angled arms and tapered legs. A quiet place to settle into a book or a slow Sunday morning." },
  { name: "Round Grain Coffee Table", collection: "Tables", price: 285, src: `${assets}/coffee-table.webp`, description: "A circular coffee table with an expressive wood-grain surface. Its rounded shape brings a relaxed centre to the living room." },
  { name: "Arc Floor Lamp", collection: "Lighting", price: 165, src: `${assets}/floor-lamp.webp`, description: "A slender black floor lamp with a clean conical shade. An understated finishing touch beside a reading chair or sofa." },
  { name: "Oatmeal Knit Throw", collection: "Textiles", price: 68, src: `${assets}/knit-throw.webp`, description: "A warm neutral throw with an open knitted texture. Fold over an armchair or layer over bedding for a softer finish." },
  { name: "Gather Wooden Chair", collection: "Seating", price: 195, src: `${assets}/wood-chair.webp`, description: "A characterful wooden chair with a tall, open back and warm natural tones. An easy addition to a dining table or a favourite corner." },
  { name: "Cloud Relaxed Sofa", collection: "Seating", price: 1240, src: `${assets}/linen-sofa.webp`, description: "An inviting neutral sofa with generous cushions and relaxed lines. A versatile foundation for contrasting textures and your own favourite objects." },
  { name: "Pebble Ceramic Vase", collection: "Objects", price: 42, src: `${assets}/ceramic-vase.webp`, description: "A small white ceramic vase with a softly rounded profile. Style with a single stem or let its simple shape stand alone." },
  { name: "Blue Glaze Tableware", collection: "Objects", price: 84, src: `${assets}/ceramic-tableware.webp`, description: "A blue ceramic tableware collection with tonal glazed surfaces. Bring a considered touch to everyday meals and shared tables." },
];

export const livingHomeCopy = {
  navigation: {
    label: "Explore the home collection",
    items: ["Seating", "Tables", "Lighting", "Textiles", "Objects"],
    all: "The full collection",
  },
  hero: {
    eyebrow: "A quieter kind of everyday",
    title: "Make room for living.",
    description: "Considered furniture, tactile layers and objects that make a space feel like you.",
    action: "Explore the collection",
    secondary: "Find your finishing touches",
    image: `${assets}/warm-living-room.webp`,
    imageAlt: "Warm living room with a tan sofa, cream chairs, a wooden coffee table and a woven rug",
    note: "The art of feeling at home",
    index: "01 / THE LIVING EDIT",
  },
  benefits: [
    { title: "See the details", description: "Materials and finishes, up close", icon: "detail" },
    { title: "Create your own mix", description: "Pieces that work together", icon: "layers" },
    { title: "Shop at your pace", description: "Keep your favourites in one bag", icon: "bag" },
  ],
  categories: {
    eyebrow: "A place for everything",
    title: "Find your room’s next chapter.",
    description: "From a thoughtful foundation to the smallest finishing touch.",
    action: "Explore",
    items: [
      { title: "Take a seat", collection: "Seating", image: `${assets}/lounge-chair.webp`, imageAlt: "Soft neutral armchair styled with a knitted throw" },
      { title: "Gather around", collection: "Tables", image: `${assets}/coffee-table.webp`, imageAlt: "Round wood-grain coffee table" },
      { title: "Set the mood", collection: "Lighting", image: `${assets}/floor-lamp.webp`, imageAlt: "Black floor lamp against a softly coloured wall" },
      { title: "Add a soft layer", collection: "Textiles", image: `${assets}/knit-throw.webp`, imageAlt: "Close-up of an oatmeal knitted throw" },
      { title: "The finishing touch", collection: "Objects", image: `${assets}/ceramic-vase.webp`, imageAlt: "White ceramic vase with a leafy branch" },
    ],
  },
  products: {
    eyebrow: "Objects for the way you live",
    title: "Meet your everyday favourites.",
    description: "A collection of simple forms, soft textures and thoughtful details.",
    all: "Shop all pieces",
    view: "View details",
    add: "Add to bag",
    added: "Added to your bag",
    bag: "View bag",
  },
  room: {
    eyebrow: "The room edit",
    title: "A little texture. A lot of possibility.",
    description: "Start with a comfortable seat. Add a warm layer. Finish with an object you love. Explore the pieces for your own quiet corner.",
    image: `${assets}/reading-corner.webp`,
    imageAlt: "Wooden lounge chair with a soft white throw, surrounded by houseplants",
    imageCaption: "An inspiring corner, styled your way.",
    choicesLabel: "Choose a detail to explore",
    choices: [
      { label: "The seat", collection: "Seating", productIndex: 0, note: "A comfortable place to begin." },
      { label: "The texture", collection: "Textiles", productIndex: 3, note: "A soft layer changes the feeling." },
      { label: "The object", collection: "Objects", productIndex: 6, note: "Make it personal, one detail at a time." },
    ],
    action: "Explore this piece",
  },
  edits: {
    eyebrow: "Well considered, beautifully simple",
    title: "Small changes. A different feeling.",
    action: "Explore the edit",
    items: [
      { title: "An invitation to slow down.", description: "Relaxed seating for the moments in between.", collection: "Seating", image: `${assets}/linen-sofa.webp`, imageAlt: "Comfortable neutral sofa beside a bright window" },
      { title: "Give the everyday a little ceremony.", description: "Objects that make gathering feel special.", collection: "Objects", image: `${assets}/ceramic-tableware.webp`, imageAlt: "Stacked blue ceramic plates and bowls" },
    ],
  },
  materials: {
    eyebrow: "Closer to the details",
    title: "Texture is the quiet part of good design.",
    description: "The grain of a table. The rhythm of a knit. A smooth ceramic curve. Bring different surfaces together to give a simple room its depth.",
    action: "Discover the textures",
    image: `${assets}/knit-throw.webp`,
    imageAlt: "Detailed oatmeal knit showing its open woven texture",
    details: [
      { number: "01", title: "Warm grain", description: "Wood tones bring balance and character.", collection: "Tables" },
      { number: "02", title: "Soft layers", description: "Textiles make a room feel inviting.", collection: "Textiles" },
      { number: "03", title: "Quiet curves", description: "Simple objects soften the everyday.", collection: "Objects" },
    ],
  },
  journal: {
    eyebrow: "Notes on living",
    title: "A home, always evolving.",
    action: "Read the journal",
    fallback: "Explore the collection",
    items: [
      { title: "How to make a corner your own", category: "Spaces", description: "A chair, a favourite object and a little breathing room.", collection: "Seating", image: `${assets}/reading-corner.webp`, imageAlt: "A plant-filled reading corner with a wooden lounge chair" },
      { title: "The simplest way to layer texture", category: "Materials", description: "A softer surface can change the feeling of a whole room.", collection: "Textiles", image: `${assets}/lounge-chair.webp`, imageAlt: "A knitted throw draped over a neutral armchair" },
      { title: "A thoughtful table, every day", category: "Rituals", description: "Everyday objects deserve a place at the centre of the room.", collection: "Objects", image: `${assets}/coffee-table.webp`, imageAlt: "A wood-grain table styled with a book and a small black vase" },
    ],
  },
  closing: {
    title: "A room that feels like you.",
    description: "Find the pieces. Make them your own.",
    action: "Explore all pieces",
  },
};
