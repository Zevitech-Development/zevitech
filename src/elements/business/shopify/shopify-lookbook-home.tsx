"use client";

import { useId, useState, type FormEvent } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Plus, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import type { ShopifyPremiumProduct } from "@/interfaces/shopify-premium-preview-interface";
import type { ShopifySignatureHomeProps } from "@/interfaces/shopify-signature-storefront-interface";
import { lookbookCopy as copy } from "@/content/landing/shopify-tier-theme-content";
import { formatMoney, priceOf, productAt, sizedImage } from "@/lib/shopify-tier-theme-utils";
import { cn } from "@/lib/utils";

const promiseIcons = [Truck, RotateCcw, ShieldCheck];

/** Level Up · Editorial lookbook: shoppable styled looks, edits, a sortable collection and a story. */
export default function ShopifyLookbookHome({ products, categoryContext, headline, brief, onBrowse, onProduct, onAddToBag, onJournal }: ShopifySignatureHomeProps) {
  const id = useId();
  const [active, setActive] = useState(0);
  const [collection, setCollection] = useState<string | null>(null);
  const [sort, setSort] = useState<"featured" | "low" | "high">("featured");
  const [added, setAdded] = useState<number[]>([]);
  const [subscribed, setSubscribed] = useState(false);
  if (!products.length) return null;
  const look = [0, 1, 2].map(index => productAt(products, index)).filter((item, index, list) => list.indexOf(item) === index);
  const activeProduct = look[active] ?? look[0];
  const collections = Array.from(new Set(products.map(product => product.collection)));
  const visible = (collection ? products.filter(product => product.collection === collection) : products)
    .slice().sort((a, b) => sort === "low" ? priceOf(a) - priceOf(b) : sort === "high" ? priceOf(b) - priceOf(a) : 0);
  const lookTotal = look.reduce((total, product) => total + priceOf(product), 0);
  const focus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  const gutter = "px-[clamp(1.25rem,5cqw,4.5rem)]";
  const quiet = "text-mix-heading/65";
  const add = (product: ShopifyPremiumProduct) => {
    onAddToBag(product.id);
    setAdded(current => current.includes(product.id) ? current : [...current, product.id]);
  };
  const photo = (src: string, alt: string, width: number, className = "", eager = false) => (
    <Image src={sizedImage(src, width)} alt={alt} width={width} height={Math.round(width * 1.25)} unoptimized loading={eager ? "eager" : "lazy"} className={cn("h-full w-full object-cover", className)} />
  );
  const scrollTo = (target: string) => document.getElementById(`${id}-${target}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const subscribe = (event: FormEvent) => { event.preventDefault(); setSubscribed(true); };

  return (
    <div data-signature-theme="lookbook" className="min-w-0 bg-background text-heading">
      {/* Hero: one full-bleed photograph, with the headline set into it. */}
      <section className="relative isolate overflow-hidden">
        <div className="aspect-[4/5] w-full [@container_studio_(min-width:640px)]:aspect-[16/8]">
          {photo(productAt(products, 0).src, productAt(products, 0).name, 1600, "", true)}
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-mix-heading/75 via-mix-heading/10 via-45% to-transparent" />
        <div aria-hidden="true" className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-mix-heading/40 to-transparent" />
        <div className={cn(gutter, "absolute inset-x-0 bottom-0 pb-[clamp(1.5rem,5cqw,3.5rem)] text-background")}>
          <p className="text-sm text-mix-background/80">{categoryContext ? `${categoryContext} — ${copy.issueNote}` : copy.issueNote}</p>
          <h3 className="mt-3 max-w-[12ch] font-heading text-[clamp(2.75rem,8cqw,6.5rem)] leading-[.92] tracking-[-0.03em] [text-wrap:balance]">{headline || copy.headline}</h3>
          <p className="mt-5 max-w-[42ch] text-sm leading-relaxed text-mix-background/85 [@container_studio_(min-width:640px)]:text-base">{brief || copy.brief}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button type="button" onClick={() => scrollTo("look")} className={cn("inline-flex min-h-12 items-center gap-2 rounded-full bg-background px-6 text-sm font-semibold text-heading transition-transform hover:-translate-y-0.5 motion-reduce:transition-none", focus)}>{copy.primary}<ArrowDown size={16} aria-hidden="true" /></button>
            <button type="button" onClick={() => scrollTo("collection")} className={cn("inline-flex min-h-12 items-center gap-2 rounded-full border border-mix-background/60 px-6 text-sm font-semibold text-background hover:bg-mix-background/10", focus)}>{copy.secondary}</button>
          </div>
        </div>
      </section>

      {/* Shop the look: the numbers sit on each product's own photograph. */}
      <section id={`${id}-look`} aria-labelledby={`${id}-look-title`} className={cn(gutter, "scroll-mt-4 py-[clamp(3rem,8cqw,6rem)]")}>
        <div className="grid gap-10 [@container_studio_(min-width:760px)]:grid-cols-[1.15fr_1fr] [@container_studio_(min-width:760px)]:items-center">
          <div className="grid grid-cols-[1.4fr_1fr] gap-3">
            {look.map((product, index) => (
              <button key={product.id} type="button" onClick={() => setActive(index)} aria-pressed={active === index}
                aria-label={`${copy.spotLabel} ${index + 1}: ${product.name}`}
                className={cn("group relative overflow-hidden rounded-[2px] bg-muted", index === 0 ? "row-span-2 aspect-[3/4.3]" : "aspect-[4/5]", focus)}>
                {photo(product.src, "", index === 0 ? 900 : 600, cn("transition-[transform,filter] duration-500 motion-reduce:transition-none", active === index ? "scale-[1.02]" : "group-hover:scale-[1.02] saturate-[.85]"))}
                <span className={cn("absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold shadow-lg ring-2 ring-background transition-colors", active === index ? "bg-primary text-primary-foreground" : "bg-background text-heading")}>{index + 1}</span>
              </button>
            ))}
          </div>
          <div>
            <h4 id={`${id}-look-title`} className="font-heading text-[clamp(2rem,4.4cqw,3.4rem)] leading-[1] tracking-[-0.02em]">{copy.lookTitle}</h4>
            <p className={cn("mt-4 max-w-[40ch] text-sm leading-relaxed", quiet)}>{copy.lookIntro}</p>
            <ol className="mt-8 border-t border-mix-heading/15">
              {look.map((product, index) => (
                <li key={product.id} className={cn("grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-mix-heading/15 py-4 transition-colors", active === index && "bg-mix-primary/[.05]")}>
                  <button type="button" onClick={() => setActive(index)} className={cn("flex h-9 w-9 items-center justify-center rounded-full border text-xs font-semibold", active === index ? "border-primary bg-primary text-primary-foreground" : "border-mix-heading/25", focus)} aria-label={`${copy.spotLabel} ${index + 1}`}>{index + 1}</button>
                  <button type="button" onClick={() => onProduct(product.id)} className={cn("min-w-0 text-left", focus)}>
                    <span className="block text-xs text-mix-heading/55">{product.collection}</span>
                    <span className="block truncate text-base font-medium">{product.name}</span>
                    <span className="block text-sm tabular-nums">{product.priceLabel}</span>
                  </button>
                  <button type="button" onClick={() => add(product)} aria-label={`${copy.add}: ${product.name}`} className={cn("flex h-11 w-11 items-center justify-center rounded-full border border-mix-heading/20 transition-colors hover:bg-heading hover:text-background", added.includes(product.id) && "border-primary bg-primary text-primary-foreground", focus)}>
                    {added.includes(product.id) ? <Check size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
                  </button>
                </li>
              ))}
            </ol>
            <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
              <div><p className="text-xs text-mix-heading/55">{copy.lookSaving}</p><p className="font-heading text-3xl tabular-nums">{formatMoney(lookTotal)}</p></div>
              <button type="button" onClick={() => look.forEach(add)} className={cn("inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 motion-reduce:transition-none", focus)}>{look.every(product => added.includes(product.id)) ? <Check size={16} aria-hidden="true" /> : null}{copy.addLook}</button>
            </div>
            <p role="status" className="sr-only">{activeProduct ? `${activeProduct.name}, ${activeProduct.priceLabel}` : ""}</p>
          </div>
        </div>
      </section>

      {/* Edits: three tall tiles. */}
      <section aria-labelledby={`${id}-edits`} className={cn(gutter, "pb-[clamp(3rem,8cqw,6rem)]")}>
        <h4 id={`${id}-edits`} className="font-heading text-[clamp(1.6rem,3.4cqw,2.6rem)] tracking-[-0.02em]">{copy.categoriesTitle}</h4>
        <div className="mt-6 grid gap-3 [@container_studio_(min-width:640px)]:grid-cols-3">
          {collections.slice(0, 3).map((name, index) => {
            const cover = products.find(product => product.collection === name) ?? productAt(products, index);
            return (
              <button key={name} type="button" onClick={() => { setCollection(name); onBrowse(name); scrollTo("collection"); }}
                className={cn("group relative aspect-[4/5] overflow-hidden rounded-[2px] text-left", focus)}>
                {photo(productAt(products, index + 3).src ?? cover.src, "", 700, "transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none")}
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-mix-heading/70 to-transparent" />
                <span className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3 text-background">
                  <span className="font-heading text-[clamp(1.4rem,3cqw,2rem)] leading-none">{name}</span>
                  <ArrowUpRight size={22} aria-hidden="true" className="shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Collection: filters, sort and quick add. */}
      <section id={`${id}-collection`} aria-labelledby={`${id}-collection-title`} className={cn(gutter, "scroll-mt-4 bg-secondary-background py-[clamp(3rem,8cqw,6rem)]")}>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <h4 id={`${id}-collection-title`} className="font-heading text-[clamp(1.8rem,4cqw,3rem)] tracking-[-0.02em]">{copy.collectionTitle}</h4>
            <p className={cn("mt-2 max-w-[44ch] text-sm", quiet)}>{copy.collectionIntro}</p>
          </div>
          <label className="flex items-center gap-2 text-xs text-mix-heading/65" htmlFor={`${id}-sort`}>{copy.sortLabel}
            <select id={`${id}-sort`} value={sort} onChange={event => setSort(event.target.value as typeof sort)} className={cn("min-h-11 rounded-full border border-mix-heading/20 bg-background px-4 text-sm text-heading", focus)}>
              <option value="featured">{copy.sort.featured}</option>
              <option value="low">{copy.sort.low}</option>
              <option value="high">{copy.sort.high}</option>
            </select>
          </label>
        </div>
        <div role="group" aria-label={copy.filterLabel} className="mt-6 flex flex-wrap gap-2">
          {[null, ...collections].map(item => (
            <button key={item ?? "all"} type="button" aria-pressed={collection === item} onClick={() => setCollection(item)}
              className={cn("min-h-11 rounded-full px-5 text-sm transition-colors", collection === item ? "bg-heading text-background" : "bg-background text-heading hover:bg-mix-heading/10", focus)}>
              {item ?? copy.all}
            </button>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 [@container_studio_(min-width:760px)]:grid-cols-4">
          {visible.map((product, index) => {
            const alternate = productAt(products, products.indexOf(product) + 1);
            return (
              <article key={product.id} className="group min-w-0">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[2px] bg-muted">
                  <button type="button" onClick={() => onProduct(product.id)} aria-label={`${copy.view}: ${product.name}`} className={cn("absolute inset-0", focus)}>
                    {photo(product.src, product.name, 600, "absolute inset-0 transition-opacity duration-500 group-hover:opacity-0 motion-reduce:transition-none")}
                    {photo(alternate.src, "", 600, "absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none")}
                  </button>
                  {index === 0 && <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-background px-3 py-1 text-[11px] font-semibold">{copy.newBadge}</span>}
                  <button type="button" onClick={() => add(product)} className={cn("absolute inset-x-3 bottom-3 flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-mix-background/95 text-xs font-semibold shadow-sm transition-[opacity,transform] [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 motion-reduce:transition-none", focus)}>
                    {added.includes(product.id) ? <Check size={14} aria-hidden="true" /> : <Plus size={14} aria-hidden="true" />}{added.includes(product.id) ? copy.added : copy.quickAdd}
                  </button>
                </div>
                <button type="button" onClick={() => onProduct(product.id)} className={cn("mt-3 block w-full min-w-0 text-left", focus)}>
                  <span className="block truncate text-sm font-medium">{product.name}</span>
                  <span className="mt-0.5 block text-sm tabular-nums text-mix-heading/70">{product.priceLabel}</span>
                </button>
              </article>
            );
          })}
        </div>
        <button type="button" onClick={() => onBrowse()} className={cn("mt-10 inline-flex min-h-12 items-center gap-2 rounded-full border border-heading px-6 text-sm font-semibold hover:bg-heading hover:text-background", focus)}>{copy.secondary}<ArrowRight size={16} aria-hidden="true" /></button>
      </section>

      {/* Story: a large statement beside a quiet photograph. */}
      <section className={cn(gutter, "grid gap-8 py-[clamp(3rem,8cqw,6rem)] [@container_studio_(min-width:760px)]:grid-cols-[1fr_1.1fr] [@container_studio_(min-width:760px)]:items-center")}>
        <div className="aspect-[4/5] overflow-hidden rounded-[2px] bg-muted [@container_studio_(min-width:760px)]:order-2">{photo(productAt(products, 2).src, "", 900)}</div>
        <div>
          <p className="font-heading text-[clamp(2.2rem,5.4cqw,4.4rem)] leading-[.98] tracking-[-0.03em] [text-wrap:balance]">{copy.storyTitle}</p>
          <p className={cn("mt-6 max-w-[42ch] text-base leading-relaxed", quiet)}>{copy.storyBody}</p>
          <button type="button" onClick={() => onJournal?.()} className={cn("mt-8 inline-flex min-h-11 items-center gap-2 border-b border-heading pb-1 text-sm font-semibold", focus)}>{copy.storyAction}<ArrowRight size={15} aria-hidden="true" /></button>
        </div>
      </section>

      {/* Promises and newsletter. */}
      <section className={cn(gutter, "grid gap-6 border-y border-mix-heading/10 py-8 [@container_studio_(min-width:640px)]:grid-cols-3")}>
        {copy.promises.map((promise, index) => {
          const Icon = promiseIcons[index];
          return (
            <div key={promise.title} className="flex items-start gap-3">
              <Icon size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
              <div><p className="text-sm font-semibold">{promise.title}</p><p className="text-sm text-mix-heading/65">{promise.body}</p></div>
            </div>
          );
        })}
      </section>
      <section className={cn(gutter, "bg-heading py-[clamp(3rem,7cqw,5rem)] text-background")}>
        <div className="grid gap-6 [@container_studio_(min-width:760px)]:grid-cols-2 [@container_studio_(min-width:760px)]:items-end">
          <div>
            <p className="font-heading text-[clamp(1.9rem,4.4cqw,3.2rem)] leading-[1] tracking-[-0.02em]">{copy.newsletterTitle}</p>
            <p className="mt-3 max-w-[40ch] text-sm text-mix-background/70">{copy.newsletterBody}</p>
          </div>
          {subscribed ? <p role="status" className="text-sm text-mix-background/85">{copy.newsletterDone}</p> : (
            <form onSubmit={subscribe} className="flex gap-2">
              <label htmlFor={`${id}-email`} className="sr-only">{copy.newsletterPlaceholder}</label>
              <input id={`${id}-email`} type="email" required placeholder={copy.newsletterPlaceholder} className={cn("min-h-12 min-w-0 flex-1 rounded-full border border-mix-background/30 bg-transparent px-5 text-sm text-background placeholder:text-mix-background/50", focus)} />
              <button type="submit" className={cn("min-h-12 shrink-0 rounded-full bg-background px-6 text-sm font-semibold text-heading", focus)}>{copy.newsletterAction}</button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
