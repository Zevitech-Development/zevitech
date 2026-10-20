"use client";

import { useId, useState, type CSSProperties } from "react";
import Image from "next/image";
import { Apple, ArrowRight, Check, Leaf, ShoppingBasket, ShoppingCart, Truck } from "lucide-react";
import { ecolifeCopy as copy } from "@/content/landing/shopify-ecolife-content";
import type { ShopifyPremiumProduct } from "@/interfaces/shopify-premium-preview-interface";
import type { ShopifySignatureHomeProps } from "@/interfaces/shopify-signature-storefront-interface";
import { cn } from "@/lib/utils";

const gutter = "px-[clamp(1rem,4cqw,3.25rem)]";
const section = "mt-5 [@container_studio_(min-width:760px)]:mt-4";
const heading = "font-heading text-[clamp(1.2rem,2.3cqw,1.6rem)] leading-tight tracking-tight text-primary";
const focus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";
const action = "inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-hover motion-reduce:transition-none";
const grid = "grid grid-cols-2 gap-2 [@container_studio_(min-width:540px)]:grid-cols-3 [@container_studio_(min-width:760px)]:grid-cols-5";
const icons = { truck: Truck, apple: Apple, leaf: Leaf, basket: ShoppingBasket };
const tones = {
  leaf: "bg-[var(--eco-leaf)]", yellow: "bg-[var(--eco-yellow)]", peach: "bg-[var(--eco-peach)]",
  coral: "bg-[var(--eco-coral)]", orange: "bg-[var(--eco-orange)]", sand: "bg-[var(--eco-sand)]",
  pink: "bg-[var(--eco-pink)]", apricot: "bg-[var(--eco-apricot)]", tan: "bg-[var(--eco-tan)]",
  lime: "bg-[var(--eco-lime)]", olive: "bg-[var(--eco-olive)]", sage: "bg-[var(--eco-sage)]",
};

export default function ShopifyEcolifeHome({
  products, headline, brief, onBrowse, onProduct, onAddToBag, onViewBag,
}: ShopifySignatureHomeProps) {
  const id = useId();
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [added, setAdded] = useState<number | null>(null);
  const collections = Array.from(new Set(products.map(product => product.collection)));
  const addedProduct = products.find(product => product.id === added);
  const variables = Object.fromEntries(Object.entries(copy.theme).map(([key, value]) => [`--eco-${key}`, value])) as CSSProperties;

  function addProduct(product: ShopifyPremiumProduct) {
    onAddToBag(product.id);
    setAdded(product.id);
  }

  function productCard(product: ShopifyPremiumProduct, compact = false) {
    if (compact) return <article key={product.id} className="flex min-w-0 items-center gap-2 rounded-md px-2 py-1">
      <button type="button" onClick={() => onProduct(product.id)} aria-label={`${copy.products.view}: ${product.name}`} className={cn("h-14 w-16 shrink-0 overflow-hidden rounded bg-background", focus)}>
        <Image src={product.src} alt={product.name} width={160} height={140} unoptimized className="h-full w-full object-contain" />
      </button>
      <div className="min-w-0 flex-1"><button type="button" onClick={() => onProduct(product.id)} className={cn("min-h-11 rounded text-left text-xs font-medium leading-snug", focus)}>{product.name}</button><p className="pb-1 text-xs font-bold text-primary">{product.priceLabel}</p></div>
      <button type="button" onClick={() => addProduct(product)} aria-label={`${copy.products.add}: ${product.name}`} className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10", focus)}>{added === product.id ? <Check size={16} aria-hidden="true" /> : <ShoppingCart size={16} aria-hidden="true" />}</button>
    </article>;
    return <article key={product.id} data-ecolife-product={product.id} className="group flex min-w-0 flex-col rounded-lg border border-border bg-background px-2.5 pb-1.5 pt-2 transition-shadow hover:shadow-md motion-reduce:transition-none">
      <button type="button" onClick={() => onProduct(product.id)} aria-label={`${copy.products.view}: ${product.name}`} className={cn("block aspect-[6/5] w-full overflow-hidden rounded-md bg-background", focus)}>
        <Image src={product.src} alt={product.name} width={400} height={360} unoptimized className="h-full w-full object-contain motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.04]" />
      </button>
      <p className="mt-2 text-[10px] font-medium leading-tight text-primary">{product.collection}</p>
      <button type="button" onClick={() => onProduct(product.id)} className={cn("min-h-11 w-full rounded py-1 text-left text-xs font-semibold leading-snug", focus)}>{product.name}</button>
      <div className="mt-auto flex items-center justify-between gap-1"><p className="text-sm font-bold text-primary">{product.priceLabel}</p><button type="button" onClick={() => addProduct(product)} aria-label={`${copy.products.add}: ${product.name}`} className={cn("flex min-h-11 min-w-11 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10", focus)}><span className="flex h-7 w-7 items-center justify-center rounded-full border border-primary/30">{added === product.id ? <Check size={15} aria-hidden="true" /> : <ShoppingCart size={15} aria-hidden="true" />}</span></button></div>
    </article>;
  }

  function productRow(key: string, title: string, offset = 0, framed = false) {
    const selection = collections.includes(filters[key]) ? filters[key] : "";
    const ordered = [...products.slice(offset), ...products.slice(0, offset)];
    const visible = ordered.filter(product => !selection || product.collection === selection).slice(0, 5);
    return <section key={key} data-ecolife-section={key} className={section} aria-labelledby={`${id}-${key}-heading`}>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1"><h3 id={`${id}-${key}-heading`} className={heading}>{title}</h3><div role="group" aria-label={`${copy.products.filter}: ${title}`} className="flex max-w-full flex-wrap gap-1">{["", ...collections].map(collection => <button key={collection} type="button" aria-pressed={selection === collection} aria-controls={`${id}-${key}-products`} onClick={() => setFilters(current => ({ ...current, [key]: collection }))} className={cn("min-h-11 rounded-md px-2 text-[11px] font-medium transition-colors motion-reduce:transition-none", selection === collection ? "bg-[var(--eco-cream)] text-heading" : "text-paragraph hover:bg-muted", focus)}>{collection || copy.products.all}</button>)}</div></div>
      <div id={`${id}-${key}-products`} className={cn(grid, framed && "rounded-xl border border-[var(--eco-yellow)] bg-background p-2 [&>article]:border-transparent")}>
        {visible.map(product => productCard(product))}
      </div>
      {!visible.length && <p className="py-5 text-center text-sm text-paragraph">{copy.products.empty}</p>}
    </section>;
  }

  return <div data-signature-theme="ecolife" style={variables} className="min-w-0 overflow-hidden bg-background text-heading [overflow-wrap:anywhere]">
    <section data-ecolife-section="hero" className="relative isolate grid min-w-0 overflow-hidden bg-[var(--eco-cream)] [@container_studio_(min-width:600px)]:min-h-[clamp(21rem,39cqw,30rem)] [@container_studio_(min-width:600px)]:grid-cols-2">
      <div className="relative order-2 min-w-0 [@container_studio_(min-width:600px)]:order-1">
        <Image src={copy.hero.image} alt={copy.hero.imageAlt} width={1000} height={1250} loading="eager" unoptimized className="mx-auto block h-[clamp(17rem,40cqw,28rem)] w-full object-contain object-bottom [@container_studio_(min-width:600px)]:absolute [@container_studio_(min-width:600px)]:inset-0 [@container_studio_(min-width:600px)]:h-full" />
      </div>
      <div className="relative order-1 flex min-w-0 flex-col items-start justify-center px-6 pb-3 pt-9 [@container_studio_(min-width:600px)]:order-2 [@container_studio_(min-width:600px)]:py-10 [@container_studio_(min-width:600px)]:pl-2 [@container_studio_(min-width:600px)]:pr-[5cqw]">
        <div aria-hidden="true" className="pointer-events-none absolute -right-7 -top-3 flex rotate-[20deg] flex-wrap gap-3 text-primary/10"><Leaf size={100} strokeWidth={0.7} /><Apple size={70} strokeWidth={0.7} /></div>
        <h2 className="relative max-w-md font-heading text-[clamp(2.3rem,5.2cqw,4.3rem)] leading-[1.03] tracking-tight [text-wrap:balance]">{headline || copy.hero.title}</h2>
        <p className="relative mt-4 max-w-sm text-[clamp(0.875rem,1.4cqw,1rem)] font-medium leading-relaxed text-paragraph">{brief || copy.hero.description}</p>
        <button type="button" onClick={() => onBrowse()} className={cn(action, focus, "mt-5")}>{copy.hero.primary}</button>
      </div>
    </section>

    <div className={gutter}>
      <section data-ecolife-section="benefits" className="grid grid-cols-2 gap-x-4 gap-y-5 border-b border-border py-6 [@container_studio_(min-width:760px)]:grid-cols-4">
        {copy.benefits.map(benefit => {
          const Icon = icons[benefit.icon];
          return <div key={benefit.title} className="flex min-w-0 items-center gap-2.5 [@container_studio_(min-width:760px)]:border-r [@container_studio_(min-width:760px)]:border-border [@container_studio_(min-width:760px)]:last:border-r-0"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--eco-leaf)] text-primary"><Icon size={27} strokeWidth={1.4} aria-hidden="true" /></span><div className="min-w-0"><h3 className="text-xs font-semibold text-primary">{benefit.title}</h3><p className="mt-1 text-[10px] leading-relaxed text-paragraph">{benefit.body}</p></div></div>;
        })}
      </section>

      <section data-ecolife-section="offers" className={section} aria-labelledby={`${id}-offers`}>
        <h3 id={`${id}-offers`} className={cn(heading, "mb-3")}>{copy.offers.title}</h3>
        <div className="grid gap-3 [@container_studio_(min-width:600px)]:grid-cols-2">{copy.offers.items.map(offer => <article key={offer.title} className={cn("relative isolate min-h-44 overflow-hidden rounded-lg", offer.tone === "dark" ? "bg-heading text-background" : "bg-[var(--eco-leaf)]")}>
          <Image src={offer.image} alt={offer.imageAlt} width={800} height={450} unoptimized className={cn("absolute inset-y-0 right-0 h-full w-[53%] object-cover", offer.tone === "dark" && "opacity-70")} />
          <div className={cn("pointer-events-none absolute inset-0", offer.tone === "dark" ? "bg-gradient-to-r from-heading via-heading/80 to-transparent" : "bg-gradient-to-r from-[var(--eco-leaf)] via-[var(--eco-leaf)] to-transparent")} />
          <div className="relative w-[68%] px-5 py-5"><h4 className="max-w-xs font-heading text-[clamp(1.25rem,2.4cqw,1.8rem)] leading-tight">{offer.title}</h4><p className="mt-2 text-[11px] leading-relaxed">{offer.body}</p><button type="button" onClick={() => onBrowse(offer.collection)} className={cn(action, focus, "mt-3", offer.tone === "dark" && "bg-background text-heading hover:bg-background/90")}>{offer.action}</button></div>
        </article>)}</div>
      </section>

      <section data-ecolife-section="categories" className="mt-3 grid grid-cols-2 gap-2 [@container_studio_(min-width:400px)]:grid-cols-4 [@container_studio_(min-width:760px)]:grid-cols-8" aria-label={copy.categories.action}>
        {copy.categories.items.map(category => <button key={category.title} type="button" onClick={() => onBrowse(category.collection || undefined)} aria-label={`${copy.categories.action}: ${category.title}`} className={cn("group relative flex min-h-36 min-w-0 flex-col overflow-hidden rounded-lg p-2.5 text-left [@container_studio_(min-width:760px)]:min-h-32", tones[category.tone], focus)}>
          <span className="relative z-10 text-xs font-semibold leading-tight">{category.title}</span><Image src={category.image} alt={category.imageAlt} width={240} height={240} unoptimized className="mt-auto aspect-[4/3] w-full rounded-md object-contain mix-blend-multiply motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105" />
        </button>)}
      </section>

      {productRow("produce", copy.products.title)}
    </div>

    <section data-ecolife-section="campaign" className="relative isolate mt-5 grid min-h-64 overflow-hidden bg-[var(--eco-cream)] [@container_studio_(min-width:600px)]:grid-cols-[1fr_2fr_1fr]">
      <Image src={copy.campaign.leftImage} alt={copy.campaign.leftAlt} width={600} height={600} unoptimized className="absolute inset-y-0 left-0 -z-10 h-full w-[35%] object-cover opacity-30 [@container_studio_(min-width:600px)]:relative [@container_studio_(min-width:600px)]:col-start-1 [@container_studio_(min-width:600px)]:w-full [@container_studio_(min-width:600px)]:opacity-100" />
      <div className="relative flex flex-col items-center justify-center px-5 py-10 text-center [@container_studio_(min-width:600px)]:col-start-2 [@container_studio_(min-width:600px)]:row-start-1"><h3 className="max-w-md font-heading text-[clamp(1.6rem,3.5cqw,2.6rem)] leading-tight text-primary">{copy.campaign.title}</h3><p className="mt-3 text-xs font-medium">{copy.campaign.body}</p><button type="button" onClick={() => onBrowse()} className={cn(action, focus, "mt-4 bg-[var(--eco-yellow)] text-heading hover:bg-[var(--eco-peach)]")}>{copy.campaign.action}</button></div>
      <Image src={copy.campaign.rightImage} alt={copy.campaign.rightAlt} width={500} height={625} unoptimized className="absolute inset-y-0 right-0 -z-10 h-full w-[30%] object-contain object-bottom opacity-25 [@container_studio_(min-width:600px)]:relative [@container_studio_(min-width:600px)]:col-start-3 [@container_studio_(min-width:600px)]:w-full [@container_studio_(min-width:600px)]:opacity-100" />
    </section>

    <div className={gutter}>
      {productRow("seasonal", copy.products.secondTitle, 3)}

      <section data-ecolife-section="promotions" className="mt-4 grid gap-3 [@container_studio_(min-width:640px)]:grid-cols-[1.65fr_1fr]">
        {copy.promotions.map(promotion => <article key={promotion.title} className={cn("relative isolate flex min-h-36 min-w-0 items-center overflow-hidden rounded-lg p-5", tones[promotion.tone])}>
          <Image src={promotion.image} alt={promotion.imageAlt} width={500} height={400} unoptimized className="absolute inset-y-0 right-0 h-full w-[35%] object-cover mix-blend-multiply" />
          <div className="relative w-[72%]"><h3 className="font-heading text-[clamp(1.25rem,2.3cqw,1.75rem)] leading-tight text-primary">{promotion.title}</h3><p className="mt-1 text-[11px]">{promotion.body}</p><button type="button" onClick={() => onBrowse(promotion.collection)} className={cn(action, focus, "mt-2")}>{promotion.action}</button></div>
        </article>)}
      </section>

      {productRow("weekly-picks", copy.products.picksTitle, 1, true)}

      <section data-ecolife-section="discovery" className={section} aria-labelledby={`${id}-discovery`}>
        <h3 id={`${id}-discovery`} className={cn(heading, "mb-3")}>{copy.discovery.title}</h3>
        <div className="grid grid-cols-2 gap-2 [@container_studio_(min-width:640px)]:grid-cols-4">{copy.discovery.items.map(category => <button type="button" key={category.title} onClick={() => onBrowse(category.collection || undefined)} aria-label={`${copy.categories.action}: ${category.title}`} className={cn("group relative flex min-h-40 min-w-0 flex-col overflow-hidden rounded-lg p-3 text-left", tones[category.tone], focus)}>
          <span className="relative z-10 font-heading text-lg leading-tight">{category.title}</span><Image src={category.image} alt={category.imageAlt} width={400} height={300} unoptimized className="mt-auto aspect-[2/1] w-full rounded object-contain mix-blend-multiply motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105" />
        </button>)}</div>
      </section>

      {productRow("top-products", copy.products.topTitle, 2)}

      <section data-ecolife-section="reassurance" className="mt-4 flex min-h-16 flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-lg bg-[var(--eco-cream)] px-4 py-3">
        <Leaf size={26} aria-hidden="true" className="shrink-0 text-primary" /><h3 className="font-heading text-lg text-primary">{copy.reassurance.title}</h3><button type="button" onClick={() => onBrowse()} className={cn(action, focus, "ml-auto")}>{copy.reassurance.action}</button>
      </section>

      <section data-ecolife-section="product-lists" className="mb-5 mt-4 grid gap-4 [@container_studio_(min-width:600px)]:grid-cols-2 [@container_studio_(min-width:900px)]:grid-cols-3">
        <div><h3 className={cn(heading, "mb-2")}>{copy.lists.firstTitle}</h3><div className="rounded-lg border border-border">{products.slice(0, 4).map(product => productCard(product, true))}</div></div>
        <div><h3 className={cn(heading, "mb-2")}>{copy.lists.secondTitle}</h3><div className="rounded-lg border border-border">{[...products.slice(3), ...products.slice(0, 1)].map(product => productCard(product, true))}</div></div>
        <div className="grid gap-3 [@container_studio_(min-width:600px)]:col-span-2 [@container_studio_(min-width:600px)]:grid-cols-2 [@container_studio_(min-width:900px)]:col-span-1 [@container_studio_(min-width:900px)]:grid-cols-1">{[copy.lists.firstBanner, copy.lists.secondBanner].map(banner => <article key={banner.title} className={cn("relative isolate min-h-36 overflow-hidden rounded-lg p-4", tones[banner.tone])}>
          <Image src={banner.image} alt={banner.imageAlt} width={400} height={320} unoptimized className="absolute inset-y-0 right-0 h-full w-[40%] object-cover mix-blend-multiply" /><div className="relative w-[70%]"><h4 className="font-heading text-xl leading-tight">{banner.title}</h4><p className="mt-1 text-[11px]">{banner.body}</p><button type="button" onClick={() => onBrowse(banner.collection)} className={cn(action, focus, "mt-2")}>{banner.action}</button></div>
        </article>)}</div>
      </section>
    </div>

    <div role="status" aria-live="polite" className={cn(addedProduct && "sticky bottom-0 z-20 flex flex-wrap items-center justify-between gap-2 border-t border-primary/20 bg-background/95 px-4 py-2 shadow-lg backdrop-blur-sm")}>
      {addedProduct && <><p className="text-xs text-heading"><Check size={14} aria-hidden="true" className="mr-1 inline text-primary" />{copy.products.addedMessage.replace("{product}", addedProduct.name)}</p><button type="button" onClick={onViewBag} className={cn("inline-flex min-h-11 items-center gap-2 rounded px-3 text-xs font-semibold text-primary", focus)}>{copy.products.viewBasket}<ArrowRight size={15} aria-hidden="true" /></button></>}
    </div>
  </div>;
}
