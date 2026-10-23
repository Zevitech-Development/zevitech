"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { ArrowDownRight, ArrowRight, Check, Layers3, MoveUpRight, Plus, ShoppingBag, ScanLine } from "lucide-react";
import { livingHomeCopy as copy } from "@/content/landing/shopify-home-living-content";
import type { ShopifyPremiumProduct } from "@/interfaces/shopify-premium-preview-interface";
import type { ShopifySignatureHomeProps } from "@/interfaces/shopify-signature-storefront-interface";
import { cn } from "@/lib/utils";

export default function ShopifyHomeLivingHome({ products, headline, brief, onBrowse, onProduct, onAddToBag, onViewBag, onJournal }: ShopifySignatureHomeProps) {
  const sectionId = useId();
  const [roomChoice, setRoomChoice] = useState(0);
  const [lastAdded, setLastAdded] = useState<number | null>(null);
  const selectedRoom = copy.room.choices[roomChoice];
  const roomProduct = products[selectedRoom.productIndex] ?? products[0];
  const focus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  const section = "px-[clamp(1rem,4.5cqw,3.5rem)]";
  const eyebrow = "text-[10px] font-semibold uppercase tracking-[.16em]";
  const heading = "font-heading text-[clamp(1.5rem,3.1cqw,2.65rem)] font-normal leading-[1.08] text-heading";
  const body = "text-[clamp(.75rem,1.2cqw,.9rem)] leading-relaxed text-paragraph";
  const link = cn("inline-flex min-h-11 items-center gap-3 text-xs font-semibold underline decoration-border underline-offset-8 transition-colors hover:text-primary motion-reduce:transition-none", focus);
  const button = cn("inline-flex min-h-11 items-center justify-center gap-3 bg-heading px-5 py-3 text-xs font-semibold text-background transition-colors hover:bg-primary hover:text-primary-foreground motion-reduce:transition-none", focus);
  const photo = (src: string, alt: string, className = "", eager = false) => <Image src={src} alt={alt} width={1200} height={1200} unoptimized loading={eager ? "eager" : "lazy"} className={cn("h-full w-full object-cover", className)} />;
  const addProduct = (id: number) => {
    onAddToBag(id);
    setLastAdded(id);
  };
  const productCard = (product: ShopifyPremiumProduct) => (
    <article key={product.id} className="group min-w-0">
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary-background">
        <button type="button" aria-label={`${copy.products.view}: ${product.name}`} className={cn("block h-full w-full", focus)} onClick={() => onProduct(product.id)}>{photo(product.src, product.name, "transition-transform duration-500 motion-safe:group-hover:scale-[1.035] motion-reduce:transition-none")}</button>
        <button type="button" onClick={() => addProduct(product.id)} aria-label={`${copy.products.add}: ${product.name}`} className={cn("absolute bottom-2 right-2 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-heading transition-colors hover:bg-heading hover:text-background motion-reduce:transition-none", focus)}>{lastAdded === product.id ? <Check size={17} aria-hidden="true" /> : <Plus size={17} aria-hidden="true" />}</button>
      </div>
      <p className="mt-3 text-[9px] uppercase tracking-wider text-paragraph">{product.collection}</p>
      <button type="button" onClick={() => onProduct(product.id)} className={cn("flex min-h-11 w-full items-start justify-between gap-2 py-2 text-left text-xs font-semibold leading-snug", focus)}><span className="min-w-0">{product.name}</span><span className="shrink-0 font-normal">{product.priceLabel}</span></button>
    </article>
  );

  return (
    <div data-signature-theme="living" className="min-w-0 overflow-hidden bg-background text-heading">
      <nav aria-label={copy.navigation.label} className={cn(section, "flex flex-wrap items-center justify-center gap-x-6 border-b border-border py-1")}>
        {copy.navigation.items.map(collection => <button key={collection} type="button" onClick={() => onBrowse(collection)} className={cn("min-h-11 text-[11px] font-medium transition-colors hover:text-primary motion-reduce:transition-none", focus)}>{collection}</button>)}
      </nav>

      <section aria-labelledby={`${sectionId}-hero`} className="grid bg-secondary-background [@container_studio_(min-width:640px)]:grid-cols-[.85fr_1.15fr]">
        <div className={cn(section, "flex flex-col items-start justify-center py-9 [@container_studio_(min-width:640px)]:py-12")}>
          <p className={eyebrow}>{copy.hero.eyebrow}</p>
          <h3 id={`${sectionId}-hero`} className="mt-5 max-w-[12ch] break-words font-heading text-[clamp(2.3rem,5.2cqw,4.6rem)] font-normal leading-[.99]">{headline || copy.hero.title}</h3>
          <p className={cn(body, "mt-5 max-w-[34ch]")}>{brief || copy.hero.description}</p>
          <button type="button" onClick={() => onBrowse()} className={cn(button, "mt-6")}>{copy.hero.action}<ArrowRight size={15} aria-hidden="true" /></button>
          <button type="button" onClick={() => onBrowse("Objects")} className={cn(link, "mt-2")}>{copy.hero.secondary}</button>
          <p className="mt-8 text-[9px] font-medium tracking-[.15em] text-paragraph">{copy.hero.index}</p>
        </div>
        <div className="relative min-w-0">
          <div className="h-full min-h-72 [@container_studio_(min-width:640px)]:min-h-[29rem]">{photo(copy.hero.image, copy.hero.imageAlt, "object-center", true)}</div>
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 border border-mix-background/40 bg-mix-background/90 px-4 py-3 text-heading backdrop-blur-sm"><p className="font-heading text-lg">{copy.hero.note}</p><ArrowDownRight size={22} strokeWidth={1.2} aria-hidden="true" /></div>
        </div>
      </section>

      <section aria-label={copy.navigation.all} className={cn(section, "grid grid-cols-1 gap-4 border-b border-border py-5 [@container_studio_(min-width:520px)]:grid-cols-3")}>
        {copy.benefits.map(item => { const Icon = item.icon === "detail" ? ScanLine : item.icon === "layers" ? Layers3 : ShoppingBag; return <div key={item.title} className="flex items-center justify-start gap-3 [@container_studio_(min-width:520px)]:justify-center"><Icon size={23} strokeWidth={1.25} className="shrink-0" aria-hidden="true" /><div><h4 className="text-xs font-semibold">{item.title}</h4><p className="mt-1 text-[10px] text-paragraph">{item.description}</p></div></div>; })}
      </section>

      <section aria-labelledby={`${sectionId}-categories`} className={cn(section, "py-9")}>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><p className={eyebrow}>{copy.categories.eyebrow}</p><h3 id={`${sectionId}-categories`} className={cn(heading, "mt-2")}>{copy.categories.title}</h3></div><p className={cn(body, "max-w-[29ch]")}>{copy.categories.description}</p></div>
        <div className="grid grid-cols-2 gap-3 [@container_studio_(min-width:640px)]:grid-cols-5">
          {copy.categories.items.map(item => <button type="button" key={item.collection} onClick={() => onBrowse(item.collection)} className={cn("group min-w-0 text-left", focus)}><div className="aspect-square overflow-hidden rounded-t-[3rem] bg-secondary-background">{photo(item.image, item.imageAlt, "transition-transform duration-500 motion-safe:group-hover:scale-105 motion-reduce:transition-none")}</div><span className="mt-2 flex min-h-11 items-center justify-between gap-2 text-xs font-semibold">{item.title}<MoveUpRight size={13} className="shrink-0" aria-hidden="true" /></span><span className="block text-[10px] text-paragraph">{item.collection}</span></button>)}
        </div>
      </section>

      <section aria-labelledby={`${sectionId}-room`} className={cn(section, "pb-9")}>
        <div className="grid overflow-hidden bg-secondary-background [@container_studio_(min-width:640px)]:grid-cols-2">
          <figure className="relative min-h-80 [@container_studio_(min-width:640px)]:min-h-[35rem]"><div className="absolute inset-0">{photo(copy.room.image, copy.room.imageAlt, "object-[center_68%]")}</div><figcaption className="absolute bottom-4 left-4 right-4 bg-mix-background/95 px-4 py-3 text-xs font-medium text-heading">{copy.room.imageCaption}</figcaption></figure>
          <div className="flex min-w-0 flex-col justify-center p-[clamp(1.25rem,3.5cqw,2.75rem)]">
            <p className={eyebrow}>{copy.room.eyebrow}</p><h3 id={`${sectionId}-room`} className={cn(heading, "mt-3 max-w-[18ch]")}>{copy.room.title}</h3><p className={cn(body, "mt-4")}>{copy.room.description}</p>
            <div role="group" aria-label={copy.room.choicesLabel} className="mt-5 grid grid-cols-3 gap-1 border-b border-border">
              {copy.room.choices.map((choice, index) => <button key={choice.label} type="button" aria-pressed={roomChoice === index} onClick={() => setRoomChoice(index)} className={cn("min-h-11 border-b-2 border-transparent px-1 text-[11px] font-semibold transition-colors motion-reduce:transition-none", roomChoice === index ? "border-heading text-heading" : "text-paragraph hover:text-heading", focus)}>{choice.label}</button>)}
            </div>
            {roomProduct && <div className="mt-4 grid grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] gap-4" aria-live="polite">
              <button type="button" onClick={() => onProduct(roomProduct.id)} aria-label={`${copy.products.view}: ${roomProduct.name}`} className={cn("block aspect-[4/5] overflow-hidden bg-background", focus)}>{photo(roomProduct.src, roomProduct.name)}</button>
              <div className="flex min-w-0 flex-col items-start justify-center"><p className="text-[10px] leading-relaxed text-paragraph">{selectedRoom.note}</p><h4 className="mt-2 font-heading text-lg leading-tight">{roomProduct.name}</h4><p className="mt-2 text-sm font-semibold">{roomProduct.priceLabel}</p><button type="button" onClick={() => onProduct(roomProduct.id)} className={cn(link, "mt-1")}>{copy.room.action}<ArrowRight size={13} className="shrink-0" aria-hidden="true" /></button><button type="button" onClick={() => addProduct(roomProduct.id)} className={cn(button, "mt-2 w-full px-3")}>{copy.products.add}<Plus size={14} aria-hidden="true" /></button></div>
            </div>}
          </div>
        </div>
      </section>

      <section aria-labelledby={`${sectionId}-products`} className={cn(section, "pb-9")}>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4"><div><p className={eyebrow}>{copy.products.eyebrow}</p><h3 id={`${sectionId}-products`} className={cn(heading, "mt-2")}>{copy.products.title}</h3><p className={cn(body, "mt-3 max-w-lg")}>{copy.products.description}</p></div><button type="button" onClick={() => onBrowse()} className={link}>{copy.products.all}<ArrowRight size={14} aria-hidden="true" /></button></div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-5 [@container_studio_(min-width:640px)]:grid-cols-4">{products.slice(0, 8).map(productCard)}</div>
        {lastAdded !== null && <div role="status" className="mt-4 flex flex-wrap items-center justify-between gap-2 border border-border bg-secondary-background px-4 py-1"><p className="flex items-center gap-2 text-xs"><Check size={15} aria-hidden="true" />{copy.products.added}</p><button type="button" onClick={onViewBag} className={link}>{copy.products.bag}<ArrowRight size={14} aria-hidden="true" /></button></div>}
      </section>

      <section aria-labelledby={`${sectionId}-edits`} className={cn(section, "pb-9")}>
        <div className="mb-5 text-center"><p className={eyebrow}>{copy.edits.eyebrow}</p><h3 id={`${sectionId}-edits`} className={cn(heading, "mt-2")}>{copy.edits.title}</h3></div>
        <div className="grid gap-4 [@container_studio_(min-width:640px)]:grid-cols-[1.25fr_.75fr]">
          {copy.edits.items.map((item, index) => <button type="button" key={item.title} onClick={() => onBrowse(item.collection)} className={cn("group relative flex min-h-80 flex-col justify-end overflow-hidden text-left [@container_studio_(min-width:640px)]:min-h-96", focus)}><div className="absolute inset-0">{photo(item.image, item.imageAlt, cn("transition-transform duration-500 motion-safe:group-hover:scale-[1.025] motion-reduce:transition-none", index === 0 && "object-[65%_center]"))}</div><div className="absolute inset-0 bg-gradient-to-t from-mix-heading/95 via-mix-heading/30 to-transparent" /><div className="relative p-[clamp(1.5rem,3cqw,2.5rem)] text-background"><h4 className="max-w-[19ch] font-heading text-[clamp(1.6rem,3cqw,2.6rem)] font-normal leading-tight">{item.title}</h4><p className="mt-3 max-w-xs text-xs leading-relaxed text-mix-background/90">{item.description}</p><span className="mt-3 inline-flex min-h-11 items-center gap-3 text-xs font-semibold underline underline-offset-8">{copy.edits.action}<ArrowRight size={14} aria-hidden="true" /></span></div></button>)}
        </div>
      </section>

      <section aria-labelledby={`${sectionId}-materials`} className="grid bg-secondary-background [@container_studio_(min-width:640px)]:grid-cols-2">
        <div className={cn(section, "flex flex-col items-start justify-center py-9")}><p className={eyebrow}>{copy.materials.eyebrow}</p><h3 id={`${sectionId}-materials`} className={cn(heading, "mt-3 max-w-[19ch]")}>{copy.materials.title}</h3><p className={cn(body, "mt-4 max-w-md")}>{copy.materials.description}</p><div className="mt-5 w-full">{copy.materials.details.map(detail => <button key={detail.number} type="button" onClick={() => onBrowse(detail.collection)} className={cn("grid min-h-16 w-full grid-cols-[1.5rem_minmax(0,1fr)_1rem] items-center gap-3 border-t border-border py-3 text-left", focus)}><span className="text-[10px] text-paragraph">{detail.number}</span><span><span className="block text-xs font-semibold">{detail.title}</span><span className="mt-1 block text-[11px] leading-relaxed text-paragraph">{detail.description}</span></span><ArrowRight size={14} aria-hidden="true" /></button>)}</div></div>
        <div className="relative min-h-64 [@container_studio_(min-width:640px)]:min-h-[30rem]">{photo(copy.materials.image, copy.materials.imageAlt, "absolute inset-0")}</div>
      </section>

      <section aria-labelledby={`${sectionId}-journal`} className={cn(section, "py-9")}>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><p className={eyebrow}>{copy.journal.eyebrow}</p><h3 id={`${sectionId}-journal`} className={cn(heading, "mt-2")}>{copy.journal.title}</h3></div>{onJournal && <button type="button" onClick={onJournal} className={link}>{copy.journal.action}<ArrowRight size={14} aria-hidden="true" /></button>}</div>
        <div className="grid grid-cols-1 gap-5 [@container_studio_(min-width:580px)]:grid-cols-3">{copy.journal.items.map(item => <article key={item.title} className="min-w-0"><button type="button" aria-label={`${onJournal ? copy.journal.action : copy.journal.fallback}: ${item.title}`} onClick={() => onJournal ? onJournal() : onBrowse(item.collection)} className={cn("group block aspect-[4/3] w-full overflow-hidden bg-secondary-background", focus)}>{photo(item.image, item.imageAlt, "transition-transform duration-500 motion-safe:group-hover:scale-[1.035] motion-reduce:transition-none")}</button><p className="mt-4 text-[9px] uppercase tracking-[.14em] text-paragraph">{item.category}</p><h4 className="mt-2 font-heading text-xl font-normal leading-tight">{item.title}</h4><p className="mt-2 text-[11px] leading-relaxed text-paragraph">{item.description}</p><button type="button" className={link} onClick={() => onJournal ? onJournal() : onBrowse(item.collection)}>{onJournal ? copy.journal.action : copy.journal.fallback}<MoveUpRight size={13} aria-hidden="true" /></button></article>)}</div>
      </section>

      <section className={cn(section, "flex flex-wrap items-center justify-between gap-5 border-t border-border bg-secondary-background py-7")}><div><h3 className={heading}>{copy.closing.title}</h3><p className={cn(body, "mt-2")}>{copy.closing.description}</p></div><button type="button" onClick={() => onBrowse()} className={button}>{copy.closing.action}<ArrowRight size={15} aria-hidden="true" /></button></section>
    </div>
  );
}
