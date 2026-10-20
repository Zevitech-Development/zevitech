"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Droplets, Leaf, Moon, Plus, Sun } from "lucide-react";
import { beautyCopy as copy } from "@/content/landing/shopify-beauty-content";
import type { ShopifyPremiumProduct } from "@/interfaces/shopify-premium-preview-interface";
import type { ShopifySignatureHomeProps } from "@/interfaces/shopify-signature-storefront-interface";
import { cn } from "@/lib/utils";

export default function ShopifyBeautyHome({ products, headline, brief, onBrowse, onProduct, onAddToBag, onViewBag, onJournal }: ShopifySignatureHomeProps) {
  const sectionId = useId();
  const [collection, setCollection] = useState(copy.collection.all);
  const [routine, setRoutine] = useState<"morning" | "evening">("morning");
  const serum = products.find(product => product.collection === "Serums") ?? products[0];
  const routineProducts = products.filter(product => product.collection === "Routine sets");
  const chosenRoutine = routine === "morning" ? routineProducts[0] : routineProducts[1] ?? routineProducts[0];
  const visibleProducts = collection === copy.collection.all ? products : products.filter(product => product.collection === collection);
  const focus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background";
  const action = cn("inline-flex min-h-11 items-center justify-center gap-3 rounded-full bg-primary px-6 py-3 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-hover motion-reduce:transition-none", focus);
  const quiet = cn("inline-flex min-h-11 items-center gap-2 text-xs font-semibold underline decoration-border underline-offset-8", focus);
  const eyebrow = "text-[10px] font-semibold uppercase tracking-[0.18em] text-paragraph";
  const heading = "font-heading text-[clamp(1.8rem,3.5cqw,3rem)] font-normal leading-[1.08] tracking-tight text-heading";
  const spacing = "px-[clamp(1rem,5cqw,4rem)] py-[clamp(2rem,5cqw,4rem)]";
  const photo = (src: string, alt: string, className = "", eager = false) => <Image src={src} alt={alt} width={1400} height={1700} unoptimized loading={eager ? "eager" : "lazy"} className={cn("h-full w-full object-cover", className)} />;
  const journal = (fallback?: string) => onJournal ? onJournal() : onBrowse(fallback);
  const productCard = (product: ShopifyPremiumProduct) => (
    <article key={product.id} className="group min-w-0">
      <button type="button" onClick={() => onProduct(product.id)} aria-label={`${copy.collection.action}: ${product.name}`} className={cn("block aspect-[4/5] w-full overflow-hidden rounded-t-[2rem] bg-secondary-background", focus)}>
        {photo(product.src, product.name, "transition-transform duration-500 motion-safe:group-hover:scale-[1.025] motion-reduce:transition-none")}
      </button>
      <div className="px-1 pt-3"><p className="text-[10px] uppercase tracking-wider text-paragraph">{product.collection}</p><button type="button" onClick={() => onProduct(product.id)} className={cn("flex min-h-11 items-center text-left font-heading text-lg leading-tight", focus)}>{product.name}</button><div className="flex items-center justify-between gap-2 border-t border-border pt-1"><p className="text-xs font-semibold">{product.priceLabel}</p><button type="button" onClick={() => onAddToBag(product.id)} className={cn("inline-flex min-h-11 items-center gap-2 text-xs font-semibold", focus)}>{copy.collection.add}<Plus size={15} aria-hidden="true" /></button></div></div>
    </article>
  );

  return (
    <div data-signature-theme="beauty" className="min-w-0 overflow-hidden bg-background text-heading">
      <section className="grid grid-cols-1 bg-secondary-background [@container_studio_(min-width:640px)]:grid-cols-[1.05fr_1fr]" aria-labelledby={`${sectionId}-hero`}>
        <div className="flex min-w-0 flex-col items-start justify-center px-[clamp(1.5rem,6cqw,5rem)] py-[clamp(2.5rem,7cqw,6rem)]">
          <p className={eyebrow}>{copy.hero.eyebrow}</p><h3 id={`${sectionId}-hero`} className="mt-5 max-w-[12ch] whitespace-pre-line break-words font-heading text-[clamp(2.9rem,6cqw,5.5rem)] font-normal leading-[.98] tracking-tight">{headline || copy.hero.title}</h3><p className="mt-5 max-w-sm text-sm leading-relaxed text-paragraph">{brief || copy.hero.description}</p>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2"><button type="button" onClick={() => onBrowse()} className={action}>{copy.hero.action}<ArrowUpRight size={16} aria-hidden="true" /></button>{serum && <button type="button" onClick={() => onProduct(serum.id)} className={quiet}>{copy.hero.secondary}</button>}</div><p className="mt-9 text-[10px] uppercase tracking-[.14em] text-paragraph">{copy.hero.index}</p>
        </div>
        <div className="relative min-w-0 p-[clamp(1rem,3cqw,2.5rem)]">
          <div className="aspect-[4/5] max-h-[42rem] overflow-hidden rounded-t-[45%] rounded-b-[1rem]">{photo(copy.hero.image, copy.hero.imageAlt, "object-center", true)}</div>
          <div className="absolute bottom-[clamp(2rem,5cqw,4rem)] left-[clamp(2rem,5cqw,4rem)] right-[clamp(2rem,5cqw,4rem)] flex items-center justify-between gap-3 rounded-xl border border-background bg-background/95 p-4 shadow-sm"><div><p className="font-heading text-xl">{copy.hero.note}</p><p className="mt-1 text-[11px] text-paragraph">{copy.hero.noteDetail}</p></div>{serum && <button type="button" aria-label={`${copy.collection.action}: ${serum.name}`} onClick={() => onProduct(serum.id)} className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground", focus)}><ArrowUpRight size={18} aria-hidden="true" /></button>}</div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 border-b border-border px-[clamp(1rem,5cqw,4rem)] py-6 [@container_studio_(min-width:540px)]:grid-cols-3">
        {copy.principles.map(item => { const Icon = item.icon === "leaf" ? Leaf : item.icon === "drop" ? Droplets : Sun; return <div key={item.title} className="flex items-center gap-3"><Icon size={25} strokeWidth={1.25} aria-hidden="true" className="shrink-0 text-primary" /><div><h4 className="text-xs font-semibold">{item.title}</h4><p className="mt-1 text-[11px] leading-relaxed text-paragraph">{item.detail}</p></div></div>; })}
      </section>

      <section className={spacing} aria-labelledby={`${sectionId}-concerns`}>
        <div className="mb-7 max-w-lg"><p className={eyebrow}>{copy.concerns.eyebrow}</p><h3 id={`${sectionId}-concerns`} className={cn(heading, "mt-3")}>{copy.concerns.title}</h3><p className="mt-4 text-sm leading-relaxed text-paragraph">{copy.concerns.description}</p></div>
        <div className="grid grid-cols-2 gap-4 [@container_studio_(min-width:700px)]:grid-cols-4">{copy.concerns.items.map(item => <button type="button" key={item.title} onClick={() => onBrowse(item.collection)} className={cn("group min-w-0 text-left", focus)}><div className="aspect-square overflow-hidden rounded-full bg-secondary-background">{photo(item.image, item.title, "transition-transform duration-500 motion-safe:group-hover:scale-[1.04] motion-reduce:transition-none")}</div><p className="mt-4 text-[10px] uppercase tracking-wider text-paragraph">{item.detail}</p><h4 className="mt-1 font-heading text-[clamp(1.05rem,1.8cqw,1.4rem)] leading-tight">{item.title}</h4><span className="mt-1 inline-flex min-h-11 items-center gap-2 text-xs font-semibold">{copy.concerns.action}<ArrowRight size={14} aria-hidden="true" /></span></button>)}</div>
      </section>

      <section className={cn(spacing, "border-t border-border")} aria-labelledby={`${sectionId}-collection`}>
        <div className="mb-6 text-center"><p className={eyebrow}>{copy.collection.eyebrow}</p><h3 id={`${sectionId}-collection`} className={cn(heading, "mt-3")}>{copy.collection.title}</h3><p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-paragraph">{copy.collection.description}</p></div>
        <div className="mb-7 flex flex-wrap justify-center gap-2">{copy.collection.tabs.map(tab => <button type="button" key={tab} aria-pressed={collection === tab} onClick={() => setCollection(tab)} className={cn("min-h-11 rounded-full border border-border px-4 py-2 text-xs transition-colors motion-reduce:transition-none", focus, collection === tab ? "border-primary bg-primary text-primary-foreground" : "bg-background text-heading hover:bg-secondary-background")}>{tab}</button>)}</div>
        <div aria-live="polite" className="grid grid-cols-2 gap-x-4 gap-y-7 [@container_studio_(min-width:700px)]:grid-cols-4">{visibleProducts.map(productCard)}</div>
        {!visibleProducts.length && <div className="py-8 text-center"><button type="button" className={action} onClick={() => setCollection(copy.collection.all)}>{copy.collection.empty}<ArrowRight size={14} aria-hidden="true" /></button></div>}
      </section>

      <section className="grid grid-cols-1 bg-secondary-background [@container_studio_(min-width:640px)]:grid-cols-2" aria-labelledby={`${sectionId}-ingredients`}>
        <div className="aspect-[4/5] max-h-[38rem] overflow-hidden">{photo(copy.ingredients.image, copy.ingredients.imageAlt)}</div>
        <div className="flex flex-col items-start justify-center p-[clamp(1.5rem,5cqw,4rem)]"><p className={eyebrow}>{copy.ingredients.eyebrow}</p><h3 id={`${sectionId}-ingredients`} className={cn(heading, "mt-3")}>{copy.ingredients.title}</h3><p className="mt-4 text-sm leading-relaxed text-paragraph">{copy.ingredients.description}</p><div className="my-5 w-full divide-y divide-border">{copy.ingredients.notes.map(note => <div key={note.number} className="flex gap-4 py-4"><span className="font-heading text-2xl text-primary">{note.number}</span><div><h4 className="text-sm font-semibold">{note.title}</h4><p className="mt-1 text-xs leading-relaxed text-paragraph">{note.description}</p></div></div>)}</div><button type="button" className={action} onClick={() => journal()}>{copy.ingredients.action}<ArrowUpRight size={16} aria-hidden="true" /></button></div>
      </section>

      <section className={spacing} aria-labelledby={`${sectionId}-routine`}>
        <div className="mb-7 flex flex-wrap items-end justify-between gap-5"><div className="max-w-md"><p className={eyebrow}>{copy.routine.eyebrow}</p><h3 id={`${sectionId}-routine`} className={cn(heading, "mt-3")}>{copy.routine.title}</h3><p className="mt-3 text-sm leading-relaxed text-paragraph">{copy.routine.description}</p></div><div role="group" aria-label={copy.routine.tabsLabel} className="flex flex-wrap gap-1 rounded-full border border-border p-1"><button type="button" aria-pressed={routine === "morning"} onClick={() => setRoutine("morning")} className={cn("inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-xs", focus, routine === "morning" && "bg-primary text-primary-foreground")}><Sun size={15} aria-hidden="true" />{copy.routine.morning}</button><button type="button" aria-pressed={routine === "evening"} onClick={() => setRoutine("evening")} className={cn("inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-xs", focus, routine === "evening" && "bg-primary text-primary-foreground")}><Moon size={15} aria-hidden="true" />{copy.routine.evening}</button></div></div>
        <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-border [@container_studio_(min-width:640px)]:grid-cols-[1.1fr_1fr]"><div className="aspect-[5/4] overflow-hidden">{photo(routine === "morning" ? copy.routine.morningImage : copy.routine.eveningImage, routine === "morning" ? copy.routine.morningAlt : copy.routine.eveningAlt)}</div><div className="flex min-w-0 flex-col items-start justify-center bg-secondary-background p-[clamp(1.5rem,4cqw,3rem)]" aria-live="polite"><p className={eyebrow}>{routine === "morning" ? copy.routine.morning : copy.routine.evening}</p><h4 className="mt-4 font-heading text-[clamp(1.65rem,3cqw,2.4rem)] leading-tight">{routine === "morning" ? copy.routine.morningTitle : copy.routine.eveningTitle}</h4><p className="mt-4 text-sm leading-relaxed text-paragraph">{routine === "morning" ? copy.routine.morningDescription : copy.routine.eveningDescription}</p>{chosenRoutine && <><p className="my-5 font-heading text-xl">{chosenRoutine.priceLabel}</p><button type="button" className={action} onClick={() => onProduct(chosenRoutine.id)}>{copy.routine.productAction}<ArrowRight size={15} aria-hidden="true" /></button></>}<button type="button" onClick={() => onBrowse("Routine sets")} className={cn(quiet, "mt-3")}>{copy.routine.action}</button></div></div>
      </section>

      <section className={cn(spacing, "grid grid-cols-1 gap-5 border-y border-border [@container_studio_(min-width:640px)]:grid-cols-[.9fr_1.1fr]")} aria-labelledby={`${sectionId}-spotlight`}>
        <div className="flex flex-col items-start justify-center"><p className={eyebrow}>{copy.spotlight.eyebrow}</p><h3 id={`${sectionId}-spotlight`} className={cn(heading, "mt-4")}>{copy.spotlight.title}</h3><p className="my-5 max-w-sm text-sm leading-relaxed text-paragraph">{copy.spotlight.description}</p><button type="button" className={action} onClick={() => onBrowse("Moisturisers")}>{copy.spotlight.action}<ArrowRight size={15} aria-hidden="true" /></button></div><div className="aspect-[5/4] overflow-hidden rounded-[2rem]">{photo(copy.spotlight.image, copy.spotlight.imageAlt)}</div>
      </section>

      <section className={spacing} aria-labelledby={`${sectionId}-journal`}>
        <div className="mb-7 text-center"><p className={eyebrow}>{copy.journal.eyebrow}</p><h3 id={`${sectionId}-journal`} className={cn(heading, "mt-3")}>{copy.journal.title}</h3></div>
        <div className="grid grid-cols-1 gap-5 [@container_studio_(min-width:640px)]:grid-cols-3">{copy.journal.items.map(item => <article key={item.title} className="min-w-0"><button type="button" onClick={() => journal(item.collection)} aria-label={`${copy.journal.action}: ${item.title}`} className={cn("block aspect-[5/4] w-full overflow-hidden rounded-xl", focus)}>{photo(item.image, item.imageAlt)}</button><h4 className="mt-4 font-heading text-xl leading-tight">{item.title}</h4><p className="mt-2 text-xs leading-relaxed text-paragraph">{item.detail}</p><button type="button" onClick={() => journal(item.collection)} className={cn(quiet, "mt-2")}>{copy.journal.action}<ArrowUpRight size={14} aria-hidden="true" /></button></article>)}</div>
      </section>

      <section className="flex flex-wrap items-center justify-between gap-5 bg-secondary-background px-[clamp(1rem,5cqw,4rem)] py-8"><h3 className="font-heading text-[clamp(1.5rem,3cqw,2.3rem)]">{copy.closing.title}</h3><div className="flex flex-wrap items-center gap-5"><button type="button" className={action} onClick={() => onBrowse()}>{copy.closing.action}<ArrowRight size={15} aria-hidden="true" /></button><button type="button" className={quiet} onClick={onViewBag}>{copy.closing.bag}</button></div></section>
    </div>
  );
}
