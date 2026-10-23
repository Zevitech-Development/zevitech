import type { ShopifyHeroDesign } from "@/interfaces/shopify-hero-design-interface";
import { shopifyLandingSalesContent } from "./shopify-landing-sales-content";
const base = shopifyLandingSalesContent.heroPreview;
export const shopifyHeroDesigns: ShopifyHeroDesign[] = [
  { ...base, id: "pulse", category: "Electronics", layout: "cinematic" },
  { ...base, id: "atelier", category: "Fashion", brand: "ATELIER", layout: "editorial", eyebrow: "THE NEW SEASON", headline: "Wear your own story.", description: "Considered pieces. Effortless everyday style.", collection: "The considered collection", product: "Everyday Cotton Tee", productDetail: "Cotton · Relaxed fit", price: "$32.00", colour: "Size: Medium", menu: ["New in", "Collections", "Our story"], products: [
    {src:"/store-studio/fashion.jpg",name:"The new edit",price:"Explore",position:"object-center"},
    {src:"/store-studio/clotya/white-tee.jpg",name:"Everyday Tee",price:"$32",position:"object-center"},
    {src:"/store-studio/clotya/denim-jacket.jpg",name:"Denim Jacket",price:"$98",position:"object-center"},
  ]},
  { ...base, id: "aura", category: "Beauty & skincare", brand: "AURA", layout: "split", eyebrow: "YOUR DAILY RITUAL", headline: "A little care. Every day.", description: "Thoughtfully made for a simpler daily ritual.", collection: "Build your daily routine", product:"Ritual Face Cream", productDetail:"50 ml · Daily skincare", price:"$48.00", colour:"Choose: Single jar",menu:["Skincare","Routines","Our story"],products:[
    {src:"/store-studio/beauty-premium/botanical-duo.jpg",name:"Botanical Duo",price:"$72",position:"object-center"},
    {src:"/store-studio/beauty-premium/ritual-cream.jpg",name:"Ritual Cream",price:"$48",position:"object-center"},
    {src:"/store-studio/beauty-premium/hand-cream.jpg",name:"Hand Cream",price:"$24",position:"object-center"},
  ]},
  { ...base, id:"forme",category:"Home & living",brand:"FORME",layout:"editorial",eyebrow:"SPACE TO SLOW DOWN",headline:"Make room for living.",description:"Warm textures. Considered objects. A home that feels like you.",collection:"Objects for everyday living",product:"Sculpted Lounge Chair",productDetail:"Solid wood · Natural finish",price:"$480.00",colour:"Finish: Natural oak",menu:["Furniture","Lighting","Our story"],products:[
    {src:"/store-studio/living-premium/warm-living-room.webp",name:"Living collection",price:"Explore",position:"object-center"},
    {src:"/store-studio/living-premium/lounge-chair.webp",name:"Lounge Chair",price:"$480",position:"object-center"},
    {src:"/store-studio/living-premium/ceramic-vase.webp",name:"Ceramic Vase",price:"$42",position:"object-center"},
  ]},
  { ...base,id:"ecolife",category:"Food & groceries",brand:"ECOLIFE",layout:"split",eyebrow:"FRESH PICKS, EVERY DAY",headline:"Good food. Better days.",description:"Bring fresh colour and flavour to your everyday table.",collection:"Fresh from the market",product:"Fresh Citrus Box",productDetail:"Seasonal selection · 2 kg",price:"$18.00",colour:"Choose: One-time order",menu:["Fresh produce","Pantry","Our growers"],products:[
    {src:"/store-studio/ecolife/hero-basket.webp",name:"The fresh edit",price:"Explore",position:"object-center"},
    {src:"/store-studio/ecolife/citrus.jpg",name:"Citrus Box",price:"$18",position:"object-center"},
    {src:"/store-studio/ecolife/strawberries.jpg",name:"Strawberries",price:"$8",position:"object-center"},
  ]},
  { ...base,id:"lune",category:"Jewellery",brand:"LUNE",layout:"cinematic",eyebrow:"THE FINISHING TOUCH",headline:"Made to mean more.",description:"Discover the details that make a moment yours.",collection:"Everyday statements",product:"Signature Collection",productDetail:"Jewellery · Selected pieces",price:"Explore collection",colour:"Find your favourite",menu:["Collections","Gifting","Our story"],products:[
    {src:"/store-studio/jewellery.jpg",name:"Signature edit",price:"Explore",position:"object-center"},
    {src:"/store-studio/jewellery-detail.jpg",name:"The details",price:"Explore",position:"object-center"},
    {src:"/store-studio/jewellery-story.jpg",name:"Gift collection",price:"Explore",position:"object-center"},
  ]},
  { ...base,id:"freshspace",category:"Service business",brand:"FRESHSPACE",layout:"split",service:true,eyebrow:"HOME, BEAUTIFULLY CARED FOR",headline:"A cleaner home. A lighter day.",description:"Choose your service, share your needs and plan your visit.",collection:"Care for every corner",product:"Home Cleaning",productDetail:"Tell us about your home",price:"Request an estimate",colour:"Visit: Choose your date",shop:"Explore our services",add:"Request a visit",delivery:"What’s included",menu:["Our services","How it works","Contact"],products:[
    {src:"/store-studio/living-premium/warm-living-room.webp",name:"Home cleaning",price:"View service",position:"object-center"},
    {src:"/store-studio/living-premium/reading-corner.webp",name:"Deep cleaning",price:"View service",position:"object-center"},
    {src:"/store-studio/home-story.jpg",name:"Move-in clean",price:"View service",position:"object-center"},
  ]},
];
export const shopifyHeroCarouselCopy = {
  label: "Explore seven example store designs",
  pause: "Pause design animation",
  play: "Play design animation",
  previous: "Previous store design",
  next: "Next store design",
  firstMovementMs: 650,
  intervalMs: 2200,
  transitionSeconds: 0.7,
};
