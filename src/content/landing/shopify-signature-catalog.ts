import { clotyaProducts } from "./shopify-clotya-content";
import { ecolifeProducts } from "./shopify-ecolife-content";
import { beautyProducts } from "./shopify-beauty-content";
import { livingProducts } from "./shopify-home-living-content";
import { techProducts } from "./shopify-tech-content";

/** One catalogue powers the homepage, search, product details and sample bag. */
export const signatureCatalog = {
  clotya: {
    id: "clotya-fashion-premium", layout: 6, products: clotyaProducts,
    brand: "CLOTYA", announcement: "THE EVERYDAY EDIT · DISCOVER YOUR NEXT FAVOURITE",
    intro: "Considered pieces. Everyday style. Explore the edit.",
    newsletter: "A little style inspiration, straight to your inbox.",
  },
  ecolife: {
    id: "ecolife-organic-premium", layout: 6, products: ecolifeProducts,
    brand: "EcoLife", announcement: "FRESH IDEAS FOR YOUR EVERYDAY TABLE",
    intro: "Fresh ingredients and everyday favourites, all in one place.",
    newsletter: "Fresh ideas for your table.",
  },
  beauty: {
    id: "ritual-beauty-premium", layout: 8, products: beautyProducts,
    brand: "RITUAL", announcement: "A MORE CONSIDERED KIND OF CARE",
    intro: "Beautiful textures, thoughtful pairings and your everyday ritual.",
    newsletter: "A little care, delivered to your inbox.",
  },
  living: {
    id: "forme-living-premium", layout: 8, products: livingProducts,
    brand: "FORME LIVING", announcement: "CONSIDERED OBJECTS · A HOME THAT FEELS LIKE YOU",
    intro: "Considered furniture, warm textures and the details that make a home.",
    newsletter: "Make room for a little inspiration.",
  },
  tech: {
    id: "pulse-audio-premium", layout: 8, products: techProducts,
    brand: "PULSE AUDIO", announcement: "A NEW FREQUENCY FOR THE EVERYDAY",
    intro: "Discover your next listening companion and a more considered setup.",
    newsletter: "Discover what comes next.",
  },
} as const;
