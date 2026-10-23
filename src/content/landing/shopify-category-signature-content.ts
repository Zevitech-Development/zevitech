import { signatureCatalog } from "./shopify-signature-catalog";
import { clotyaHomeCopy } from "./shopify-clotya-content";
import { ecolifeCopy } from "./shopify-ecolife-content";
import { getShopifyServiceCategory } from "./shopify-service-preview-content";
import type { ShopifySignatureProductSeed } from "@/interfaces/shopify-signature-storefront-interface";

type CategorySource = { category: string; businessType?: string; product: string; price: string; images: string[]; brief: string; products?: { name: string; price: number }[] };
export function getCategorySignatureProducts(reference: CategorySource): ShopifySignatureProductSeed[] {
  if (reference.businessType === "services") return getShopifyServiceCategory(reference.category).offers.map((offer, index) => ({
    name: offer.title, collection: offer.group, price: 0, src: reference.images[index % reference.images.length], description: offer.description,
  }));
  const existing = ({ Fashion: "clotya", "Food & drink": "ecolife", Beauty: "beauty", Home: "living", Technology: "tech" } as const)[reference.category as "Fashion"];
  if (existing) return signatureCatalog[existing].products;
  return reference.images.map((src, index) => ({
    name: reference.products?.[index]?.name ?? (index === 0 ? reference.product : `${reference.category} ${index === 1 ? "collection" : "edit"}`),
    collection: reference.products ? ["Bestsellers", "New in", "Essentials"][index % 3] : index === 0 ? "Essentials" : index === 1 ? "Discover" : "Featured",
    price: reference.products?.[index]?.price ?? (Number(reference.price) || 49), src,
    description: reference.brief,
  }));
}

type CopyProduct = Pick<ShopifySignatureProductSeed, "name" | "collection" | "src"> & { description?: string };
export function categoryEditorialCopy(category: string, source: CopyProduct[], services = false) {
  const products = source.map(p => ({ ...p, description: p.description || `Explore ${p.name.toLowerCase()} in more detail.` }));
  const action = services ? "Explore services" : "Explore collection";
  const item = (index: number) => products[index % products.length];
  const tile = (index: number) => ({ title: item(index).name, description: item(index).description, collection: item(index).collection, image: item(index).src, imageAlt: item(index).name });
  return {
    ...clotyaHomeCopy,
    navigation: { ...clotyaHomeCopy.navigation, label: services ? "Explore services" : "Shop by category", all: services ? "All services" : "All products", fresh: "Discover", ready: category, items: Array.from(new Set(products.map(p => p.collection))) },
    hero: { ...clotyaHomeCopy.hero, action, slides: products.slice(0, 3).map((p, i) => ({ eyebrow: category, headline: i === 0 ? `${category}. Thoughtfully considered.` : p.name, description: p.description, collection: p.collection, image: p.src, imageAlt: p.name })) },
    benefits: [
      { title: "Clear details", description: services ? "Understand the scope of each service" : "Explore the details before you choose", icon: "shield" },
      { title: "Personal support", description: "Helpful answers, when you need them", icon: "support" },
      { title: "Your next step", description: services ? "Tell us what you need" : "Find your next favourite", icon: "delivery" },
      { title: services ? "Easy enquiries" : "Simple checkout", description: services ? "Start a conversation" : "A considered shopping experience", icon: "payment" },
    ],
    promotions: { eyebrow: category, action, items: products.slice(0, 3).map((_, i) => tile(i)) },
    products: { ...clotyaHomeCopy.products, title: services ? "Ways we can help" : `Discover ${category.toLowerCase()}`, description: "A closer look at what matters to you.", featuredTitle: services ? "Featured services" : "Featured collection", featuredDescription: item(0).description, all: action, view: services ? "View service" : "View product", options: services ? "View service details" : "Explore details", badge: category },
    campaign: { eyebrow: "In focus", title: item(1).name, description: item(1).description, details: [category, item(1).collection, services ? "Scope tailored to your needs" : "Explore every detail"], action: services ? "View service" : "View product", image: item(1).src, imageAlt: item(1).name },
    accessories: { eyebrow: "Explore more", action, items: [tile(1), tile(2)] },
    categories: { title: services ? "Find the right support" : "Find your next favourite", description: "Choose your starting point.", items: products.filter((p, i) => products.findIndex(x => x.collection === p.collection) === i).map(p => ({ name: p.collection, image: p.src })) },
    highlights: { title: "Worth a closer look", description: item(2).description, label: category, detail: services ? "Explore the scope and tell us about your project." : "Explore the details and choose what works for you.", action: services ? "View service" : "View product", ribbon: "Your next step starts here.", ribbonAction: action },
    journal: { title: services ? "Explore your options" : "Ideas & inspiration", description: `A fresh perspective on ${category.toLowerCase()}.`, action, items: products.slice(0, 3).map((_, i) => ({ ...tile(i), eyebrow: item(i).collection })) },
  };
}

export function categoryDiscoveryCopy(category: string, source: CopyProduct[], services = false) {
  const products = source.map(p => ({ ...p, description: p.description || `Explore ${p.name.toLowerCase()} in more detail.` }));
  const editorial = categoryEditorialCopy(category, products, services);
  const item = (i: number) => products[i % products.length];
  const action = services ? "View services" : "Shop collection";
  const tile = (i: number, tone = "leaf") => ({ title: item(i).name, body: item(i).description, action, collection: item(i).collection, image: item(i).src, imageAlt: item(i).name, tone });
  const categories = products.filter((p, i) => products.findIndex(x => x.collection === p.collection) === i).map((p, i) => ({ title: p.collection, collection: p.collection, image: p.src, imageAlt: p.name, tone: ["yellow", "peach", "sage", "pink"][i % 4] }));
  return {
    ...ecolifeCopy,
    hero: { title: `${category}. Discover more.`, description: item(0).description, primary: action, image: item(0).src, imageAlt: item(0).name },
    benefits: editorial.benefits.map(b => ({ icon: "truck" as const, title: b.title, body: b.description })),
    offers: { title: "In the spotlight", items: [tile(1, "dark"), tile(2)] },
    categories: { action, items: categories },
    products: { ...ecolifeCopy.products, title: services ? "Our services" : category, secondTitle: "Explore more", picksTitle: "Selected for you", topTitle: "Featured", view: services ? "View service" : "View product", add: services ? "View details" : "Add to basket", all: services ? "All services" : "All products", browse: action, filter: services ? "Filter services" : "Filter products", empty: "Choose another category to explore more." },
    campaign: { title: item(1).name, body: item(1).description, action, leftImage: item(1).src, leftAlt: item(1).name, rightImage: item(2).src, rightAlt: item(2).name },
    promotions: [tile(1), tile(2, "pink")],
    discovery: { title: services ? "Explore our expertise" : "Find your favourites", items: categories },
    reassurance: { title: services ? "Personal attention. A clear next step." : "Considered choices for your everyday.", action },
    lists: { firstTitle: "Discover more", secondTitle: "Take a closer look", firstBanner: tile(0, "olive"), secondBanner: tile(2, "orange") },
  };
}
