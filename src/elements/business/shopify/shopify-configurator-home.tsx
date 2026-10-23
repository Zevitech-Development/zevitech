"use client";

import { useId, useState, type CSSProperties, type PointerEvent } from "react";
import Image from "./shopify-preview-image";
import { ArrowDown, Check, Gem, Hammer, Heart, Move3d, RotateCcw, ShieldCheck, ShoppingBag, Sparkles } from "lucide-react";
import type { ShopifySignatureHomeProps } from "@/interfaces/shopify-signature-storefront-interface";
import { configuratorCopy as copy } from "@/content/landing/shopify-tier-theme-content";
import { formatMoney, priceOf, productAt, sizedImage } from "@/lib/shopify-tier-theme-utils";
import { cn } from "@/lib/utils";

const detailIcons = [Gem, Hammer, ShieldCheck];

/** Executive · Made-to-order configurator: a tilting product stage, live options and pricing, currency and wishlist. */
export default function ShopifyConfiguratorHome({ products, heroSrc, categoryContext, headline, brief, onProduct, onAddToBag, onViewBag }: ShopifySignatureHomeProps) {
  const id = useId();
  const [productIndex, setProductIndex] = useState(0);
  const [finish, setFinish] = useState(0);
  const [size, setSize] = useState(1);
  const [engraving, setEngraving] = useState("");
  const [currency, setCurrency] = useState(0);
  const [saved, setSaved] = useState<number[]>([]);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [added, setAdded] = useState(false);
  const product = products[productIndex] ?? products[0];
  if (!product) return null;
  const base = priceOf(product);
  const extras = copy.finishes[finish].add + copy.sizes[size].add + (engraving.trim() ? copy.engravingPrice : 0);
  const { code, rate } = copy.currencies[currency];
  const show = (amount: number) => formatMoney(amount * rate, code);
  const focus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-heading";
  const gutter = "px-[clamp(1.25rem,5cqw,4.5rem)]";
  const reset = () => { setFinish(0); setSize(1); setEngraving(""); setAdded(false); };
  const move = (event: PointerEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    setTilt({ x: ((event.clientY - box.top) / box.height - 0.5) * -12, y: ((event.clientX - box.left) / box.width - 0.5) * 16 });
  };
  const choose = (index: number) => { setProductIndex(index); setAdded(false); };
  const photo = (src: string, alt: string, width: number, className = "", style?: CSSProperties) => <Image src={sizedImage(src, width)} alt={alt} width={width} height={width} unoptimized className={cn("h-full w-full object-cover", className)} style={style} />;
  const toStudio = () => document.getElementById(`${id}-studio`)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div data-signature-theme="configurator" className="min-w-0 bg-heading text-background">
      {/* Cinematic opening. */}
      <section className="relative isolate overflow-hidden">
        <div className="aspect-[4/5] [@container_studio_(min-width:640px)]:aspect-[16/8]">{photo(heroSrc || productAt(products, 0).src, "", 1600, "opacity-70")}</div>
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_80%,transparent,var(--heading)_75%)] opacity-90" />
        <div className={cn(gutter, "absolute inset-x-0 bottom-0 pb-[clamp(2rem,6cqw,4rem)]")}>
          <p className="text-sm text-mix-background/70">{categoryContext ? `${copy.eyebrow} — ${categoryContext}` : copy.eyebrow}</p>
          <h3 className="mt-3 max-w-[13ch] font-heading text-[clamp(2.8rem,7.6cqw,6.2rem)] leading-[.92] tracking-[-0.035em] [text-wrap:balance]">{headline || copy.headline}</h3>
          <p className="mt-5 max-w-[44ch] text-base leading-relaxed text-mix-background/75">{brief || copy.brief}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <button type="button" onClick={toStudio} className={cn("inline-flex min-h-12 items-center gap-2 rounded-full bg-background px-7 text-sm font-semibold text-heading transition-transform hover:-translate-y-0.5 motion-reduce:transition-none", focus)}>{copy.primary}<ArrowDown size={16} aria-hidden="true" /></button>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-mix-background/70">{copy.heroFacts.map(fact => <li key={fact} className="flex items-center gap-2"><Check size={14} aria-hidden="true" />{fact}</li>)}</ul>
          </div>
        </div>
      </section>

      {/* Studio. */}
      <section id={`${id}-studio`} aria-labelledby={`${id}-studio-title`} className={cn(gutter, "scroll-mt-4 py-[clamp(3rem,8cqw,6rem)]")}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h4 id={`${id}-studio-title`} className="font-heading text-[clamp(1.8rem,4cqw,3rem)] tracking-[-0.02em]">{copy.studioTitle}</h4>
          <label className="flex items-center gap-2 text-xs text-mix-background/65" htmlFor={`${id}-currency`}>{copy.currencyLabel}
            <select id={`${id}-currency`} value={currency} onChange={event => setCurrency(Number(event.target.value))} className={cn("min-h-11 rounded-full border border-mix-background/25 bg-heading px-4 text-sm text-background", focus)}>
              {copy.currencies.map((item, index) => <option key={item.code} value={index}>{item.code}</option>)}
            </select>
          </label>
        </div>
        <div className="mt-8 grid gap-10 [@container_studio_(min-width:820px)]:grid-cols-[1.1fr_1fr]">
          <div>
            <div onPointerMove={move} onPointerLeave={() => setTilt({ x: 0, y: 0 })}
              className="relative aspect-square overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_50%_35%,color-mix(in_srgb,var(--background)_14%,transparent),transparent_70%)] [perspective:1200px]">
              <div aria-hidden="true" className="absolute inset-x-[16%] bottom-[7%] h-[8%] rounded-[50%] bg-mix-background/15 blur-2xl" />
              <div style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }} className="absolute inset-[11%] overflow-hidden rounded-[1.5rem] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)] ring-1 ring-mix-background/10 transition-transform duration-200 ease-out motion-reduce:transform-none">
                {photo(product.src, product.name, 1000, "transition-[filter] duration-500", { filter: copy.finishes[finish].filter })}
                {engraving.trim() && <p aria-hidden="true" className="absolute inset-x-0 bottom-[10%] text-center font-heading text-[clamp(1.1rem,3.2cqw,2rem)] italic tracking-[0.04em] text-background [text-shadow:0_2px_12px_rgb(0_0_0/0.6)]">{engraving.trim()}</p>}
              </div>
              <button type="button" onClick={() => setSaved(current => current.includes(product.id) ? current.filter(item => item !== product.id) : [...current, product.id])}
                aria-pressed={saved.includes(product.id)} aria-label={copy.wishlist}
                className={cn("absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-background text-heading shadow-lg", focus)}>
                <Heart size={18} aria-hidden="true" className={saved.includes(product.id) ? "fill-current text-accent" : ""} />
              </button>
              <p className="absolute bottom-4 left-4 hidden items-center gap-1.5 text-xs text-mix-background/60 [@media(hover:hover)]:flex"><Move3d size={14} aria-hidden="true" />{copy.tiltHint}</p>
            </div>
            <div role="group" aria-label={copy.productsLabel} className="mt-4 flex gap-3 overflow-x-auto pb-1">
              {products.map((item, index) => (
                <button key={item.id} type="button" onClick={() => choose(index)} aria-pressed={productIndex === index} aria-label={item.name}
                  className={cn("h-20 w-20 shrink-0 overflow-hidden rounded-2xl ring-2 ring-offset-2 ring-offset-heading transition-opacity", productIndex === index ? "ring-background" : "ring-transparent opacity-55 hover:opacity-100", focus)}>
                  {photo(item.src, "", 200)}
                </button>
              ))}
            </div>
          </div>

          <div className="min-w-0">
            <button type="button" onClick={() => onProduct(product.id)} className={cn("block text-left", focus)}>
              <span className="block text-xs text-mix-background/60">{product.collection}</span>
              <span className="mt-1 block font-heading text-[clamp(1.8rem,3.6cqw,2.6rem)] leading-tight">{product.name}</span>
            </button>
            <p className="mt-1 text-sm text-mix-background/60">{show(base)}</p>

            <fieldset className="mt-8">
              <legend className="text-sm text-mix-background/70">{copy.finishLabel} — <span className="text-background">{copy.finishes[finish].name}</span></legend>
              <div className="mt-3 flex flex-wrap gap-3">
                {copy.finishes.map((item, index) => (
                  <button key={item.name} type="button" onClick={() => { setFinish(index); setAdded(false); }} aria-pressed={finish === index} aria-label={`${item.name}${item.add ? `, plus ${show(item.add)}` : ""}`}
                    className={cn("group flex min-h-11 items-center gap-2.5 rounded-full border py-1.5 pl-1.5 pr-4 text-sm transition-colors", finish === index ? "border-background bg-background text-heading" : "border-mix-background/25 hover:border-mix-background/60", focus)}>
                    <span className={cn("h-8 w-8 rounded-full ring-1 ring-mix-background/30", item.swatch)} />
                    {item.name}{item.add ? <span className="text-xs opacity-60">+{show(item.add)}</span> : null}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-7">
              <legend className="text-sm text-mix-background/70">{copy.sizeLabel}</legend>
              <div className="mt-3 grid grid-cols-3 gap-2 rounded-2xl bg-mix-background/[.06] p-1.5">
                {copy.sizes.map((item, index) => (
                  <button key={item.name} type="button" onClick={() => { setSize(index); setAdded(false); }} aria-pressed={size === index}
                    className={cn("min-h-14 rounded-xl text-sm transition-colors", size === index ? "bg-background text-heading shadow" : "text-mix-background/80 hover:bg-mix-background/10", focus)}>
                    <span className="block font-semibold">{item.name}</span><span className="block text-[11px] opacity-65">{item.add ? `+${show(item.add)}` : item.detail}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="mt-7 block" htmlFor={`${id}-engraving`}>
              <span className="flex items-center gap-2 text-sm text-mix-background/70"><Sparkles size={14} aria-hidden="true" />{copy.engravingLabel}</span>
              <input id={`${id}-engraving`} value={engraving} maxLength={18} onChange={event => { setEngraving(event.target.value); setAdded(false); }} placeholder={copy.engravingPlaceholder}
                className={cn("mt-3 min-h-12 w-full rounded-2xl border border-mix-background/20 bg-mix-background/[.04] px-4 text-base text-background placeholder:text-mix-background/35", focus)} />
              <span className="mt-1.5 block text-xs text-mix-background/50">{copy.engravingNote.replace("{price}", show(copy.engravingPrice))}</span>
            </label>

            <div className="mt-8 rounded-3xl bg-background p-5 text-heading">
              <p className="text-xs text-mix-heading/60">{copy.summaryTitle}</p>
              <p className="mt-1 text-sm">{[copy.finishes[finish].name, copy.sizes[size].name, engraving.trim() && `“${engraving.trim()}”`].filter(Boolean).join(" · ")}</p>
              <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
                <div><p className="text-xs text-mix-heading/60">{copy.totalLabel}</p><p aria-live="polite" className="font-heading text-4xl tabular-nums leading-none">{show(base + extras)}</p></div>
                <div className="flex gap-2">
                  <button type="button" onClick={reset} aria-label={copy.reset} className={cn("flex h-12 w-12 items-center justify-center rounded-full border border-mix-heading/20", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heading")}><RotateCcw size={16} aria-hidden="true" /></button>
                  <button type="button" onClick={() => { onAddToBag(product.id, { unitPrice: base + extras, variant: [copy.finishes[finish].name, copy.sizes[size].name, engraving.trim() && `“${engraving.trim()}”`].filter(Boolean).join(" · ") }); setAdded(true); }} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-heading px-6 text-sm font-semibold text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heading focus-visible:ring-offset-2">
                    {added ? <Check size={16} aria-hidden="true" /> : <ShoppingBag size={16} aria-hidden="true" />}{added ? copy.added : copy.add}
                  </button>
                </div>
              </div>
              {added && <button type="button" onClick={onViewBag} className="mt-3 min-h-11 text-sm font-semibold underline underline-offset-4">{copy.viewBag}</button>}
            </div>
            {saved.length > 0 && <p className="mt-3 text-xs text-mix-background/60">{copy.savedCount.replace("{count}", String(saved.length))}</p>}
          </div>
        </div>
      </section>

      {/* Details. */}
      <section aria-labelledby={`${id}-details`} className={cn(gutter, "bg-background py-[clamp(3rem,8cqw,6rem)] text-heading")}>
        <h4 id={`${id}-details`} className="font-heading text-[clamp(1.8rem,4cqw,3rem)] tracking-[-0.02em]">{copy.detailsTitle}</h4>
        <div className="mt-8 grid gap-6 [@container_studio_(min-width:700px)]:grid-cols-3">
          {copy.details.map((detail, index) => {
            const Icon = detailIcons[index];
            return (
              <article key={detail.title}>
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted">{photo(productAt(products, index + 1).src, "", 700)}</div>
                <p className="mt-4 flex items-center gap-2 font-semibold"><Icon size={17} aria-hidden="true" className="text-primary" />{detail.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-mix-heading/65">{detail.body}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-[clamp(3rem,7cqw,5rem)] grid gap-10 [@container_studio_(min-width:760px)]:grid-cols-[1fr_1.2fr]">
          <div>
            <h4 className="font-heading text-2xl">{copy.compareTitle}</h4>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead><tr className="border-b border-mix-heading/15 text-mix-heading/60">{copy.compareHead.map(cell => <th key={cell} scope="col" className="py-3 pr-4 font-medium">{cell}</th>)}</tr></thead>
                <tbody>{copy.sizes.map((item, index) => <tr key={item.name} className={cn("border-b border-mix-heading/10", size === index && "font-semibold")}><th scope="row" className="py-3 pr-4">{item.name}</th><td className="py-3 pr-4">{item.detail}</td><td className="py-3 tabular-nums">{show(base + item.add)}</td></tr>)}</tbody>
              </table>
            </div>
          </div>
          <div>
            <h4 className="font-heading text-2xl">{copy.alsoTitle}</h4>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[1, 2, 3].map(offset => {
                const item = productAt(products, productIndex + offset);
                return (
                  <button key={offset} type="button" onClick={() => choose(products.indexOf(item))} className="group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heading">
                    <span className="block aspect-square overflow-hidden rounded-xl bg-muted">{photo(item.src, "", 360, "transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none")}</span>
                    <span className="mt-2 block truncate text-sm font-medium">{item.name}</span>
                    <span className="block text-xs tabular-nums text-mix-heading/60">{show(priceOf(item))}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <ul className={cn(gutter, "flex flex-wrap justify-center gap-x-10 gap-y-3 border-t border-mix-background/10 py-7 text-sm text-mix-background/75")}>
        {copy.promises.map(promise => <li key={promise} className="flex items-center gap-2"><Check size={14} aria-hidden="true" />{promise}</li>)}
      </ul>
    </div>
  );
}
