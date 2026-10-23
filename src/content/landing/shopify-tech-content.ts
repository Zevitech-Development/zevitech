import type { ShopifySignatureProductSeed } from "@/interfaces/shopify-signature-storefront-interface";

export const techProducts: ShopifySignatureProductSeed[] = [
  { name: "Arc Studio Headphones", collection: "Headphones", price: 299, src: "/store-studio/tech-premium/arc-headphones.webp", description: "Sculpted over-ear headphones with a charcoal finish, cushioned ear cups and a clean curved headband. A considered centrepiece for your personal listening space." },
  { name: "Pocket In-Ear Set", collection: "Earbuds", price: 89, src: "/store-studio/tech-premium/earbuds.jpg", description: "A compact black earbud set with a matching charging case. A small, easy-to-carry alternative to over-ear headphones." },
  { name: "Portable Cylinder Speaker", collection: "Speakers", price: 129, src: "/store-studio/tech-premium/portable-speaker.jpg", description: "A portable speaker with a textured black wrap and compact cylindrical shape. Bring shared listening to a desk, shelf or everyday gathering." },
  { name: "Low-Profile Keyboard", collection: "Desk Essentials", price: 99, src: "/store-studio/tech-premium/keyboard.jpg", description: "A compact silver-and-white keyboard with low-profile keys and an uncluttered layout. A simple starting point for a considered workspace." },
  { name: "Precision White Mouse", collection: "Desk Essentials", price: 69, src: "/store-studio/tech-premium/mouse.jpg", description: "A clean white mouse with a contoured body and central scroll wheel. A bright finishing touch for a pared-back desktop." },
  { name: "Everyday Over-Ear Headphones", collection: "Headphones", price: 149, src: "/store-studio/tech-premium/everyday-headphones.jpg", description: "Black over-ear headphones with a simple rounded shape and padded headband. A versatile everyday listening choice." },
  { name: "Heritage Wired Headphones", collection: "Headphones", price: 179, src: "/store-studio/tech-premium/heritage-headphones.jpg", description: "Silver-tone ear cups meet a warm brown headband in a distinctive wired design. A tactile option for a dedicated listening corner." },
  { name: "Desk Over-Ear Headphones", collection: "Headphones", price: 199, src: "/store-studio/tech-premium/desk-headphones.jpg", description: "Black over-ear headphones with generous ear cushions and a restrained finish. An easy match for a quiet, thoughtfully arranged desk." },
];

export const techHomeCopy = {
  hero: {
    eyebrow: "The studio collection",
    headline: "Hear more. Feel everything.",
    description: "A new perspective on the things you use every day. Explore considered audio and a workspace that feels like you.",
    action: "Explore Arc Studio",
    secondary: "Shop all technology",
    image: "/store-studio/tech-premium/arc-headphones.webp",
    imageAlt: "Sculptural charcoal over-ear headphones with cool blue studio lighting",
    model: "ARC / STUDIO",
    note: "Sound. Form. Everyday possibility.",
  },
  categories: {
    label: "Explore by category",
    items: [
      { name: "Headphones", detail: "Your personal soundtrack", image: "/store-studio/tech-premium/studio-headphones.jpg" },
      { name: "Earbuds", detail: "A smaller everyday carry", image: "/store-studio/tech-premium/earbuds.jpg" },
      { name: "Speakers", detail: "Make room for sound", image: "/store-studio/tech-premium/portable-speaker.jpg" },
      { name: "Desk Essentials", detail: "Create your space", image: "/store-studio/tech-premium/keyboard.jpg" },
    ],
  },
  benefits: [
    { title: "Find your format", description: "Over-ear, in-ear or room-filling" },
    { title: "See the details", description: "A closer look before you choose" },
    { title: "Build your setup", description: "Thoughtful pieces that work together" },
    { title: "One simple bag", description: "Keep your chosen pieces together" },
  ],
  products: {
    eyebrow: "The everyday collection",
    title: "Find your next essential.",
    description: "Audio for your downtime. Details for your desktop.",
    all: "All technology",
    view: "View product",
    add: "Quick add",
    added: "Added to your bag",
    bag: "View bag",
    viewAll: "Explore all products",
    filterLabel: "Filter featured products",
  },
  feature: {
    eyebrow: "Considered from every angle",
    title: "Big on feeling. Clean on design.",
    description: "A sculpted silhouette, a tactile finish and a place in your daily ritual. Get closer to Arc Studio.",
    action: "Take a closer look",
    details: [
      { number: "01", title: "Sculpted silhouette", description: "A curved headband with a balanced, over-ear shape." },
      { number: "02", title: "Tactile materials", description: "Soft ear cushions set against a charcoal exterior." },
      { number: "03", title: "Your listening space", description: "An expressive piece for a considered everyday setup." },
    ],
  },
  pairings: {
    eyebrow: "Better together",
    title: "Make it your setup.",
    description: "Choose the pieces that suit your day. Add a pairing or explore each product.",
    action: "Add both to bag",
    detail: "View details",
    total: "Pair total",
    items: [
      { title: "The focused workspace", description: "A clean keyboard and a contoured mouse. Your desk, brought together.", indices: [3, 4] },
      { title: "Sound for every setting", description: "Keep it personal with earbuds. Share the moment with a portable speaker.", indices: [1, 2] },
    ],
  },
  compare: {
    eyebrow: "A little help choosing",
    title: "Find your listening style.",
    description: "Compare the format and setting that feel right for you.",
    action: "Explore this option",
    formats: [
      { title: "Over-ear", subtitle: "A moment for yourself", collection: "Headphones", index: 0, details: ["Around-ear silhouette", "Cushioned ear cups", "A dedicated listening space"] },
      { title: "In-ear", subtitle: "Less in your pocket", collection: "Earbuds", index: 1, details: ["Compact earbuds", "Matching carry case", "A smaller everyday setup"] },
      { title: "Speaker", subtitle: "Room for everyone", collection: "Speakers", index: 2, details: ["Shared listening", "Freestanding design", "A desk or shelf companion"] },
    ],
  },
  desk: {
    eyebrow: "The workspace edit",
    title: "Less clutter. More you.",
    description: "Build a desk that brings your favourite details into focus.",
    action: "Explore desk essentials",
  },
  journal: {
    eyebrow: "Ideas & inspiration",
    title: "A closer look at everyday tech.",
    action: "Explore the story",
    items: [
      { title: "Find a place for your soundtrack", description: "A listening corner can be as simple as your favourite chair and the right pair of headphones.", image: "/store-studio/tech-premium/heritage-headphones.jpg", collection: "Headphones" },
      { title: "Create a calmer workspace", description: "Start with the pieces you touch every day. Keep the setup simple and make the details count.", image: "/store-studio/tech-premium/keyboard.jpg", collection: "Desk Essentials" },
      { title: "Personal sound. Shared moments.", description: "From a compact in-ear set to a speaker on the shelf, find a format for the way you listen.", image: "/store-studio/tech-premium/portable-speaker.jpg", collection: "Speakers" },
    ],
  },
  closing: {
    title: "Your next setup starts here.",
    description: "Explore the full collection, one considered detail at a time.",
    action: "Shop the collection",
  },
};
