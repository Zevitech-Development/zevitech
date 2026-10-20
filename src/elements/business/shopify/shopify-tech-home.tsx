"use client";

import { useId, useState, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check, Headphones, Layers3, Plus, ShoppingBag, SlidersHorizontal } from "lucide-react";
import { techHomeCopy as copy } from "@/content/landing/shopify-tech-content";
import type { ShopifyPremiumProduct } from "@/interfaces/shopify-premium-preview-interface";
import type { ShopifySignatureHomeProps } from "@/interfaces/shopify-signature-storefront-interface";
import { cn } from "@/lib/utils";

export default function ShopifyTechHome({ products, headline, brief, onBrowse, onProduct, onAddToBag, onViewBag, onJournal }: ShopifySignatureHomeProps) {
  const sectionId = useId();
  const [collection, setCollection] = useState<string | null>(null);
  const [listeningStyle, setListeningStyle] = useState(0);
  const [addedMessage, setAddedMessage] = useState("");
  const heroProduct = products[0];
  const visibleProducts = collection ? products.filter(product => product.collection === collection) : products;
  const currentFormat = copy.compare.formats[listeningStyle];
  const comparedProduct = products[currentFormat.index] ?? heroProduct;
  const focus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-heading";
  const section = "px-[clamp(1rem,4cqw,3.5rem)]";
  const eyebrow = "text-[10px] font-semibold uppercase tracking-[.2em] text-[var(--tech-signal)]";
  const title = "font-heading text-[clamp(1.5rem,3.2cqw,2.8rem)] font-normal leading-[1.1] text-background";
  const paragraph = "text-xs leading-relaxed text-background/70";
  const button = cn("inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-hover motion-reduce:transition-none", focus);
  const outlineButton = cn("inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-background/30 px-5 py-3 text-xs font-medium text-background transition-colors hover:bg-background/10 motion-reduce:transition-none", focus);
  const photo = (src: string, alt: string, className = "", eager = false) => <Image src={src} alt={alt} width={1400} height={1000} unoptimized loading={eager ? "eager" : "lazy"} className={cn("h-full w-full object-cover", className)} />;
  const add = (product: ShopifyPremiumProduct) => {
    onAddToBag(product.id);
    setAddedMessage(`${product.name} — ${copy.products.added}`);
  };
  const addPair = (pair: ShopifyPremiumProduct[]) => {
    pair.forEach(product => onAddToBag(product.id));
    setAddedMessage(`${pair.map(product => product.name).join(" + ")} — ${copy.products.added}`);
  };
  const pairPrice = (pair: ShopifyPremiumProduct[]) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(pair.reduce((total, product) => total + Number(product.priceLabel.replace(/[^0-9.]/g, "")), 0));
  const productCard = (product: ShopifyPremiumProduct) => (
    <article key={product.id} className="group min-w-0">
      <button type="button" onClick={() => onProduct(product.id)} aria-label={`${copy.products.view}: ${product.name}`} className={cn("block aspect-square w-full overflow-hidden rounded-2xl border border-background/10 bg-background/5", focus)}>
        {photo(product.src, product.name, "transition-transform duration-500 motion-safe:group-hover:scale-[1.035] motion-reduce:transition-none")}
      </button>
      <p className="mt-4 text-[9px] font-semibold uppercase tracking-[.14em] text-background/60">{product.collection}</p>
      <button type="button" onClick={() => onProduct(product.id)} className={cn("flex min-h-11 items-center text-left text-xs font-medium leading-snug text-background", focus)}>{product.name}</button>
      <div className="flex flex-wrap items-center justify-between gap-x-2">
        <p className="text-sm font-medium text-background">{product.priceLabel}</p>
        <button type="button" onClick={() => add(product)} className={cn("inline-flex min-h-11 items-center gap-1.5 text-[11px] font-medium text-[var(--tech-signal)]", focus)}><Plus size={14} aria-hidden="true" />{copy.products.add}</button>
      </div>
    </article>
  );

  return (
    <div data-signature-theme="tech" style={{ "--tech-signal": "color-mix(in srgb, var(--primary) 25%, var(--background) 75%)" } as CSSProperties} className="min-w-0 overflow-hidden bg-heading text-background">
      <section className={cn(section, "relative isolate grid min-h-[31rem] items-center overflow-hidden py-9 [@container_studio_(min-width:640px)]:grid-cols-[1fr_1fr] [@container_studio_(min-width:640px)]:py-16")}>
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-1/4 -z-10 h-1/2 w-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="relative z-10 max-w-lg">
          <p className={eyebrow}>{copy.hero.eyebrow}</p>
          <h3 className="mt-4 max-w-[13ch] break-words font-heading text-[clamp(2.6rem,6.8cqw,5.8rem)] font-normal leading-[.98] tracking-tight text-background">{headline || copy.hero.headline}</h3>
          <p className={cn(paragraph, "mt-5 max-w-[38ch]")}>{brief || copy.hero.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={() => heroProduct && onProduct(heroProduct.id)} className={button}>{copy.hero.action}<ArrowUpRight size={16} aria-hidden="true" /></button>
            <button type="button" onClick={() => onBrowse()} className={cn("inline-flex min-h-11 items-center gap-2 text-xs text-background/80", focus)}>{copy.hero.secondary}<ArrowRight size={14} aria-hidden="true" /></button>
          </div>
          <div className="mt-8 hidden items-center gap-3 text-[10px] tracking-wide text-background/60 [@container_studio_(min-width:640px)]:flex"><span className="h-px w-9 bg-primary" />{copy.hero.note}</div>
        </div>
        <div className="relative mt-6 min-w-0 [@container_studio_(min-width:640px)]:-ml-[18%] [@container_studio_(min-width:640px)]:mt-0">
          <div className="aspect-[3/2] overflow-hidden rounded-3xl [@container_studio_(min-width:640px)]:aspect-square">{photo(copy.hero.image, copy.hero.imageAlt, "object-center", true)}</div>
          <div className="absolute bottom-4 right-4 rounded-full border border-background/20 bg-heading/70 px-4 py-2 text-[10px] font-medium tracking-[.18em] backdrop-blur">{copy.hero.model}</div>
        </div>
      </section>

      <nav aria-label={copy.categories.label} className={cn(section, "grid grid-cols-2 gap-px border-y border-background/10 bg-background/10 [@container_studio_(min-width:760px)]:grid-cols-4")}>
        {copy.categories.items.map(item => <button type="button" key={item.name} onClick={() => onBrowse(item.name)} className={cn("group flex min-h-24 min-w-0 items-center gap-3 bg-heading py-4 text-left [@container_studio_(min-width:760px)]:px-4", focus)}>
          <span className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-background/10">{photo(item.image, item.name, "transition-transform duration-300 motion-safe:group-hover:scale-110 motion-reduce:transition-none")}</span>
          <span className="min-w-0"><span className="block text-xs font-medium text-background">{item.name}</span><span className="mt-1 hidden text-[10px] leading-relaxed text-background/60 [@container_studio_(min-width:500px)]:block">{item.detail}</span></span>
          <ArrowUpRight size={14} className="ml-auto shrink-0 text-[var(--tech-signal)]" aria-hidden="true" />
        </button>)}
      </nav>

      <section className={cn(section, "py-10 [@container_studio_(min-width:760px)]:py-14")}>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div><p className={eyebrow}>{copy.products.eyebrow}</p><h3 className={cn(title, "mt-3")}>{copy.products.title}</h3><p className={cn(paragraph, "mt-3")}>{copy.products.description}</p></div>
          <button type="button" onClick={() => onBrowse()} className={cn("inline-flex min-h-11 items-center gap-2 text-xs text-background", focus)}>{copy.products.viewAll}<ArrowUpRight size={16} aria-hidden="true" /></button>
        </div>
        <div aria-label={copy.products.filterLabel} className="my-6 flex flex-wrap gap-2">
          {[null, ...copy.categories.items.map(item => item.name)].map(item => <button type="button" key={item ?? "all"} aria-pressed={collection === item} onClick={() => setCollection(item)} className={cn("min-h-11 rounded-full border px-4 text-[11px] transition-colors motion-reduce:transition-none", collection === item ? "border-primary bg-primary text-primary-foreground" : "border-background/20 text-background/80 hover:border-background/50", focus)}>{item ?? copy.products.all}</button>)}
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-7 [@container_studio_(min-width:600px)]:grid-cols-3 [@container_studio_(min-width:850px)]:grid-cols-4">{visibleProducts.map(productCard)}</div>
        {addedMessage && <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-primary/40 bg-primary/10 px-4 py-2"><p role="status" className="flex min-w-0 items-start gap-2 text-xs leading-relaxed text-background"><Check size={16} className="shrink-0 text-[var(--tech-signal)]" aria-hidden="true" />{addedMessage}</p><button type="button" onClick={onViewBag} className={cn("inline-flex min-h-11 shrink-0 items-center gap-2 text-xs font-medium text-[var(--tech-signal)]", focus)}>{copy.products.bag}<ShoppingBag size={15} aria-hidden="true" /></button></div>}
      </section>

      <section className={cn(section, "grid gap-7 border-y border-background/10 bg-background/5 py-10 [@container_studio_(min-width:700px)]:grid-cols-[1.05fr_.95fr] [@container_studio_(min-width:700px)]:items-center [@container_studio_(min-width:700px)]:py-14")}>
        <div className="relative min-w-0">
          <div className="aspect-[6/5] overflow-hidden rounded-2xl">{photo(copy.hero.image, copy.hero.imageAlt, "object-right")}</div>
          <p className="absolute bottom-4 left-4 rounded-full border border-background/20 bg-heading/80 px-3 py-2 text-[10px] tracking-[.2em] text-background">{copy.hero.model}</p>
        </div>
        <div><p className={eyebrow}>{copy.feature.eyebrow}</p><h3 className={cn(title, "mt-3 max-w-[19ch]")}>{copy.feature.title}</h3><p className={cn(paragraph, "mt-4 max-w-[44ch]")}>{copy.feature.description}</p>
          <div className="mt-6 divide-y divide-background/10">{copy.feature.details.map(item => <div key={item.number} className="flex gap-4 py-4"><span className="pt-0.5 text-[10px] tracking-wider text-[var(--tech-signal)]">{item.number}</span><div><h4 className="text-sm font-medium text-background">{item.title}</h4><p className={cn(paragraph, "mt-1")}>{item.description}</p></div></div>)}</div>
          <button type="button" onClick={() => heroProduct && onProduct(heroProduct.id)} className={cn(outlineButton, "mt-4")}>{copy.feature.action}<ArrowUpRight size={15} aria-hidden="true" /></button>
        </div>
      </section>

      <section className={cn(section, "py-10 [@container_studio_(min-width:760px)]:py-14")}>
        <div className="max-w-xl"><p className={eyebrow}>{copy.pairings.eyebrow}</p><h3 className={cn(title, "mt-3")}>{copy.pairings.title}</h3><p className={cn(paragraph, "mt-3")}>{copy.pairings.description}</p></div>
        <div className="mt-7 grid gap-5 [@container_studio_(min-width:680px)]:grid-cols-2">
          {copy.pairings.items.map(pairing => {
            const pair = pairing.indices.map(index => products[index]).filter((product): product is ShopifyPremiumProduct => Boolean(product));
            return <article key={pairing.title} className="min-w-0 overflow-hidden rounded-2xl border border-background/10 bg-background/5">
              <div className="grid grid-cols-2 gap-px bg-background/10">{pair.map(product => <button key={product.id} type="button" onClick={() => onProduct(product.id)} aria-label={`${copy.pairings.detail}: ${product.name}`} className={cn("aspect-[5/4] min-w-0 overflow-hidden bg-heading", focus)}>{photo(product.src, product.name)}</button>)}</div>
              <div className="p-5"><h4 className="font-heading text-xl font-normal text-background">{pairing.title}</h4><p className={cn(paragraph, "mt-2")}>{pairing.description}</p>
                <div className="my-3 flex flex-col gap-1">{pair.map(product => <button type="button" key={product.id} onClick={() => onProduct(product.id)} className={cn("flex min-h-11 items-center justify-between gap-3 border-b border-background/10 text-left text-[11px] text-background/80", focus)}><span>{product.name}</span><span className="shrink-0">{product.priceLabel}</span></button>)}</div>
                <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-[10px] text-background/60">{copy.pairings.total}<span className="mt-1 block text-base font-medium text-background">{pairPrice(pair)}</span></p><button type="button" onClick={() => addPair(pair)} disabled={pair.length !== 2} className={cn(button, "disabled:opacity-50")}>{copy.pairings.action}<Plus size={15} aria-hidden="true" /></button></div>
              </div>
            </article>;
          })}
        </div>
      </section>

      <section className={cn(section, "border-y border-background/10 py-10 [@container_studio_(min-width:760px)]:py-14")}>
        <div className="text-center"><p className={eyebrow}>{copy.compare.eyebrow}</p><h3 className={cn(title, "mt-3")}>{copy.compare.title}</h3><p className={cn(paragraph, "mx-auto mt-3 max-w-md")}>{copy.compare.description}</p></div>
        <div role="group" aria-label={copy.compare.title} className="mx-auto mt-6 flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-2xl border border-background/15 p-1">{copy.compare.formats.map((format, index) => <button type="button" key={format.title} aria-pressed={listeningStyle === index} aria-controls={`${sectionId}-compare`} onClick={() => setListeningStyle(index)} className={cn("min-h-11 rounded-xl px-5 text-xs", listeningStyle === index ? "bg-primary text-primary-foreground" : "text-background/70 hover:text-background", focus)}>{format.title}</button>)}</div>
        {comparedProduct && <div id={`${sectionId}-compare`} className="mx-auto mt-7 grid max-w-3xl gap-6 rounded-2xl border border-background/10 bg-background/5 p-5 [@container_studio_(min-width:600px)]:grid-cols-2 [@container_studio_(min-width:600px)]:items-center">
          <button type="button" onClick={() => onProduct(comparedProduct.id)} aria-label={`${copy.products.view}: ${comparedProduct.name}`} className={cn("aspect-[4/3] w-full overflow-hidden rounded-xl", focus)}>{photo(comparedProduct.src, comparedProduct.name)}</button>
          <div><p className={eyebrow}>{currentFormat.title}</p><h4 className="mt-3 font-heading text-2xl font-normal text-background">{currentFormat.subtitle}</h4><ul className="my-4 space-y-3">{currentFormat.details.map(detail => <li key={detail} className="flex items-center gap-2 text-xs text-background/70"><Check size={14} className="text-[var(--tech-signal)]" aria-hidden="true" />{detail}</li>)}</ul><button type="button" onClick={() => onBrowse(currentFormat.collection)} className={outlineButton}>{copy.compare.action}<ArrowRight size={15} aria-hidden="true" /></button></div>
        </div>}
      </section>

      <section className={cn(section, "py-10 [@container_studio_(min-width:760px)]:py-14")}>
        <div className="grid gap-6 [@container_studio_(min-width:760px)]:grid-cols-[.8fr_1.2fr]">
          <div className="relative flex min-h-72 flex-col items-start justify-center overflow-hidden rounded-2xl border border-primary/25 bg-primary/10 p-7">
            <Layers3 size={36} strokeWidth={1} className="mb-6 text-[var(--tech-signal)]" aria-hidden="true" /><p className={eyebrow}>{copy.desk.eyebrow}</p><h3 className={cn(title, "mt-3 max-w-[13ch]")}>{copy.desk.title}</h3><p className={cn(paragraph, "mt-4 max-w-xs")}>{copy.desk.description}</p><button type="button" onClick={() => onBrowse("Desk Essentials")} className={cn(outlineButton, "mt-5")}>{copy.desk.action}<ArrowUpRight size={15} aria-hidden="true" /></button>
          </div>
          <div className="grid grid-cols-2 gap-4">{products.filter(product => product.collection === "Desk Essentials").slice(0, 2).map(productCard)}</div>
        </div>
      </section>

      <section className={cn(section, "border-t border-background/10 pb-12 pt-10")}>
        <p className={eyebrow}>{copy.journal.eyebrow}</p><h3 className={cn(title, "mt-3")}>{copy.journal.title}</h3>
        <div className="mt-7 grid gap-7 [@container_studio_(min-width:600px)]:grid-cols-3">{copy.journal.items.map(item => <article key={item.title} className="min-w-0">
          <button type="button" onClick={() => onJournal ? onJournal() : onBrowse(item.collection)} aria-label={`${copy.journal.action}: ${item.title}`} className={cn("block aspect-[3/2] w-full overflow-hidden rounded-2xl", focus)}>{photo(item.image, item.title)}</button>
          <p className="mt-4 text-[9px] uppercase tracking-[.14em] text-[var(--tech-signal)]">{item.collection}</p><h4 className="mt-2 font-heading text-xl font-normal leading-tight text-background">{item.title}</h4><p className={cn(paragraph, "mt-3")}>{item.description}</p>
          <button type="button" onClick={() => onJournal ? onJournal() : onBrowse(item.collection)} className={cn("mt-2 inline-flex min-h-11 items-center gap-2 text-[11px] font-medium text-background", focus)}>{copy.journal.action}<ArrowUpRight size={14} aria-hidden="true" /></button>
        </article>)}</div>
      </section>

      <section className={cn(section, "grid grid-cols-2 gap-6 border-y border-background/10 py-7 [@container_studio_(min-width:760px)]:grid-cols-4")}>{copy.benefits.map((benefit, index) => {
        const Icon = [Headphones, SlidersHorizontal, Layers3, ShoppingBag][index];
        return <div key={benefit.title} className="min-w-0"><Icon size={21} strokeWidth={1.5} className="mb-3 text-[var(--tech-signal)]" aria-hidden="true" /><h4 className="text-xs font-medium text-background">{benefit.title}</h4><p className="mt-1 text-[10px] leading-relaxed text-background/60">{benefit.description}</p></div>;
      })}</section>
      <section className={cn(section, "flex flex-wrap items-center justify-between gap-5 bg-background/5 py-8")}><div><h3 className="font-heading text-2xl font-normal text-background">{copy.closing.title}</h3><p className={cn(paragraph, "mt-2")}>{copy.closing.description}</p></div><button type="button" onClick={() => onBrowse()} className={button}>{copy.closing.action}<ArrowRight size={15} aria-hidden="true" /></button></section>
    </div>
  );
}
