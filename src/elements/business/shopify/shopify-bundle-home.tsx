"use client";

import { useId, useState, type CSSProperties } from "react";
import Image from "./shopify-preview-image";
import { ArrowRight, Check, ChevronDown, Minus, PackageCheck, Plus, Repeat2, ShoppingBag } from "lucide-react";
import type { ShopifyPremiumProduct } from "@/interfaces/shopify-premium-preview-interface";
import type { ShopifySignatureHomeProps } from "@/interfaces/shopify-signature-storefront-interface";
import { bundleCopy as defaultCopy, atelierBundleCopy } from "@/content/landing/shopify-tier-theme-content";
import { formatMoney, priceOf, productAt, sizedImage } from "@/lib/shopify-tier-theme-utils";
import { cn } from "@/lib/utils";



/** Pro · Build-your-bundle storefront: tiered savings, a live bundle tray and ready-made bundles. */
export default function ShopifyBundleHome({ products, artworkMode, categoryContext, headline, brief, onProduct, onAddToBag, onViewBag }: ShopifySignatureHomeProps) {
  const copy = artworkMode ? atelierBundleCopy : defaultCopy;
  const best = copy.tiers[copy.tiers.length - 1];
  const discountFor = (count: number) => [...copy.tiers].reverse().find(tier => count >= tier.items)?.percent ?? 0;
  const id = useId();
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [confirmed, setConfirmed] = useState(false);
  const [readyAdded, setReadyAdded] = useState<number[]>([]);
  if (!products.length) return null;
  const count = Object.values(quantities).reduce((total, quantity) => total + quantity, 0);
  const subtotal = products.reduce((total, product) => total + priceOf(product) * (quantities[product.id] ?? 0), 0);
  const percent = discountFor(count);
  const nextTier = copy.tiers.find(tier => count < tier.items) ?? null;
  const saving = subtotal * percent / 100;
  const progress = Math.min(100, (count / best.items) * 100);
  const focus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  const gutter = "px-[clamp(1.25rem,5cqw,4.5rem)]";
  const change = (product: ShopifyPremiumProduct, delta: number) => {
    setConfirmed(false);
    setQuantities(current => ({ ...current, [product.id]: Math.max(0, Math.min(9, (current[product.id] ?? 0) + delta)) }));
  };
  const addBundle = () => {
    products.filter(product => quantities[product.id]).forEach(product => onAddToBag(product.id, { quantity: quantities[product.id], unitPrice: Math.round(priceOf(product) * (1 - percent / 100) * 100) / 100, variant: `${copy.trayTitle} · ${percent}% ${copy.saving}` }));
    setConfirmed(true);
  };
  const photo = (src: string, alt: string, width: number, className = "") => <Image src={sizedImage(src, width)} alt={alt} width={width} height={width} unoptimized className={cn("h-full w-full object-cover", className)} />;
  const scrollTo = (target: string) => document.getElementById(`${id}-${target}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const ready = copy.readyNames.map((name, index) => {
    const items = Array.from({ length: index + (artworkMode ? 3 : 2) }, (_, offset) => productAt(products, index + offset)).filter((item, position, list) => list.indexOf(item) === position);
    const full = items.reduce((total, item) => total + priceOf(item), 0);
    return { name, items, full, price: full * (1 - discountFor(items.length) / 100) };
  });

  return (
    <div data-signature-theme="bundle" style={{ "--bundle-tint": "color-mix(in srgb, var(--primary) 10%, var(--background))", "--bundle-deep": "color-mix(in srgb, var(--primary) 82%, var(--heading))" } as CSSProperties} className="min-w-0 bg-background text-heading">
      {/* Hero: offer on the left, a stacked product collage on the right. */}
      <section className={cn(gutter, "relative overflow-hidden bg-[var(--bundle-tint)] py-[clamp(2.5rem,7cqw,5.5rem)]")}>
        <div className="grid items-center gap-10 [@container_studio_(min-width:760px)]:grid-cols-[1.05fr_1fr]">
          <div className="min-w-0">
            <p className="inline-flex items-center rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground">{copy.badge}</p>
            <h3 className="mt-5 max-w-[14ch] font-heading text-[clamp(2.6rem,6.6cqw,5.4rem)] leading-[.95] tracking-[-0.03em] [text-wrap:balance]">{headline || copy.headline}</h3>
            <p className="mt-5 max-w-[42ch] text-base leading-relaxed text-mix-heading/70">{brief || copy.brief}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={() => scrollTo("builder")} className={cn("inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-12px_var(--primary)] transition-transform hover:-translate-y-0.5 motion-reduce:transition-none", focus)}>{copy.primary}<ArrowRight size={16} aria-hidden="true" /></button>
              <button type="button" onClick={() => scrollTo("ready")} className={cn("inline-flex min-h-12 items-center rounded-full bg-background px-7 text-sm font-semibold", focus)}>{copy.secondary}</button>
            </div>
          </div>
          <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[26rem]">
            {[0, 1, 2].map(index => {
              const product = productAt(products, index);
              const place = ["left-0 top-[8%] w-[58%] -rotate-6", "right-0 top-0 w-[52%] rotate-3", "bottom-0 left-[22%] w-[56%] -rotate-1"][index];
              return (
                <figure key={index} className={cn("absolute overflow-hidden rounded-3xl bg-background p-2 shadow-[0_24px_60px_-28px_rgb(0_0_0/0.45)]", place)}>
                  <div className="aspect-square overflow-hidden rounded-2xl">{photo(product.src, "", 520)}</div>
                  <figcaption className="flex items-center justify-between gap-2 px-2 pb-1 pt-2 text-[11px]"><span className="truncate font-medium">{product.name}</span><span className="shrink-0 tabular-nums">{product.priceLabel}</span></figcaption>
                </figure>
              );
            })}
            <span className="absolute right-[6%] top-[46%] flex h-24 w-24 rotate-12 flex-col items-center justify-center rounded-full bg-[var(--bundle-deep)] text-primary-foreground shadow-xl">
              <span className="text-[11px]">{copy.seal}</span><span className="font-heading text-3xl leading-none">{best.percent}%</span>
            </span>
          </div>
        </div>
      </section>

      {/* How it works: a real three-step sequence. */}
      <section aria-labelledby={`${id}-steps`} className={cn(gutter, "py-[clamp(2.5rem,6cqw,4.5rem)]")}>
        <h4 id={`${id}-steps`} className="sr-only">{copy.stepsTitle}</h4>
        <ol className="grid gap-4 [@container_studio_(min-width:640px)]:grid-cols-3">
          {copy.steps.map((step, index) => (
            <li key={step.title} className="flex gap-4 rounded-2xl border border-mix-heading/10 p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-lg text-primary-foreground">{index + 1}</span>
              <span><span className="block font-semibold">{step.title}</span><span className="mt-1 block text-sm leading-relaxed text-mix-heading/65">{step.body}</span></span>
            </li>
          ))}
        </ol>
      </section>

      {/* The builder with a sticky tray. */}
      <div id={`${id}-builder`} className={cn(gutter, "grid scroll-mt-4 gap-8 pb-[clamp(3rem,8cqw,6rem)] [@container_studio_(min-width:840px)]:grid-cols-[1fr_19rem] [@container_studio_(min-width:840px)]:items-start")}>
        <section aria-labelledby={`${id}-pick`} className="min-w-0">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h4 id={`${id}-pick`} className="font-heading text-[clamp(1.8rem,4cqw,2.8rem)] leading-none tracking-[-0.02em]">{categoryContext ? copy.pickTitleCategory.replace("{category}", categoryContext.toLowerCase()) : copy.pickTitle}</h4>
            <ul aria-label={copy.progressLabel} className="flex gap-1.5 text-xs">
              {copy.tiers.map(tier => <li key={tier.items} className={cn("rounded-full px-3 py-1.5 font-semibold", percent >= tier.percent ? "bg-primary text-primary-foreground" : "bg-mix-heading/[.06] text-mix-heading/70")}>{copy.tierItems.replace("{count}", String(tier.items))} · {tier.percent}%</li>)}
            </ul>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 [@container_studio_(min-width:640px)]:grid-cols-3">
            {products.map(product => {
              const quantity = quantities[product.id] ?? 0;
              return (
                <article key={product.id} className={cn("flex min-w-0 flex-col overflow-hidden rounded-2xl border-2 bg-background transition-[border-color,box-shadow] motion-reduce:transition-none", quantity ? "border-primary shadow-[0_16px_40px_-24px_var(--primary)]" : "border-transparent ring-1 ring-mix-heading/10")}>
                  <button type="button" onClick={() => onProduct(product.id)} aria-label={`${copy.view}: ${product.name}`} className={cn("relative aspect-square overflow-hidden bg-muted", focus)}>
                    {photo(product.src, product.name, 520)}
                    {quantity > 0 && <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground"><Check size={12} aria-hidden="true" />{copy.inBundle}</span>}
                  </button>
                  <div className="flex flex-1 flex-col p-3">
                    <p className="line-clamp-2 text-sm font-medium leading-snug">{product.name}</p>
                    <p className="mt-1 text-sm font-semibold tabular-nums">{product.priceLabel}</p>
                    <div className="mt-3 flex items-center justify-between rounded-full bg-mix-heading/[.05] p-1" role="group" aria-label={`${copy.quantity}: ${product.name}`}>
                      <button type="button" onClick={() => change(product, -1)} disabled={!quantity} aria-label={copy.remove} className={cn("flex h-10 w-10 items-center justify-center rounded-full bg-background disabled:opacity-40", focus)}><Minus size={14} aria-hidden="true" /></button>
                      <span aria-live="polite" className="text-sm font-semibold tabular-nums">{quantity}</span>
                      <button type="button" onClick={() => change(product, 1)} aria-label={copy.addOne} className={cn("flex h-10 w-10 items-center justify-center rounded-full bg-heading text-background", focus)}><Plus size={14} aria-hidden="true" /></button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <aside aria-labelledby={`${id}-tray`} className="rounded-3xl bg-heading p-5 text-background [@container_studio_(min-width:840px)]:sticky [@container_studio_(min-width:840px)]:top-4">
          <h4 id={`${id}-tray`} className="flex items-center gap-2 font-heading text-2xl"><ShoppingBag size={20} aria-hidden="true" />{copy.trayTitle}</h4>
          <div className="relative mt-5">
            <div className="h-2 overflow-hidden rounded-full bg-mix-background/15" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)} aria-label={copy.progressLabel}>
              <div className="h-full rounded-full bg-primary transition-[width] duration-500 motion-reduce:transition-none" style={{ width: `${progress}%` }} />
            </div>
            <div aria-hidden="true" className="mt-2 flex justify-between text-[10px] text-mix-background/60">
              <span>0</span>{copy.tiers.map(tier => <span key={tier.items} className={count >= tier.items ? "text-background" : ""}>{tier.percent}%</span>)}
            </div>
          </div>
          <p aria-live="polite" className="mt-3 text-sm font-medium">{nextTier ? copy.nextTier.replace("{count}", String(nextTier.items - count)).replace("{percent}", String(nextTier.percent)) : copy.maxTier}</p>
          <ul className="mt-5 space-y-2 text-sm">
            {products.filter(product => quantities[product.id]).map(product => (
              <li key={product.id} className="flex items-center gap-3">
                <span className="h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-mix-background/10">{photo(product.src, "", 120)}</span>
                <span className="min-w-0 flex-1 truncate">{quantities[product.id]} × {product.name}</span>
                <span className="shrink-0 whitespace-nowrap tabular-nums">{formatMoney(priceOf(product) * quantities[product.id])}</span>
              </li>
            ))}
            {!count && <li className="rounded-xl border border-dashed border-mix-background/25 p-4 text-center text-mix-background/65">{copy.empty}</li>}
          </ul>
          <dl className="mt-5 space-y-1.5 border-t border-mix-background/15 pt-4 text-sm tabular-nums">
            <div className="flex justify-between text-mix-background/70"><dt>{copy.subtotal}</dt><dd>{formatMoney(subtotal)}</dd></div>
            <div className="flex justify-between font-semibold text-primary"><dt>{copy.saving}{percent ? ` (${percent}%)` : ""}</dt><dd>−{formatMoney(saving)}</dd></div>
            <div className="flex items-baseline justify-between pt-1"><dt>{copy.total}</dt><dd className="font-heading text-3xl">{formatMoney(subtotal - saving)}</dd></div>
          </dl>
          <button type="button" onClick={addBundle} disabled={!count} className={cn("mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground disabled:opacity-40", focus)}>
            {confirmed && <Check size={16} aria-hidden="true" />}{confirmed ? copy.added : copy.addBundle}
          </button>
          {confirmed && <button type="button" onClick={onViewBag} className={cn("mt-2 min-h-11 w-full text-sm font-semibold underline underline-offset-4", focus)}>{copy.viewBag}</button>}
        </aside>
      </div>

      {/* Ready-made bundles. */}
      <section id={`${id}-ready`} aria-labelledby={`${id}-ready-title`} className={cn(gutter, "scroll-mt-4 bg-[var(--bundle-tint)] py-[clamp(3rem,8cqw,6rem)]")}>
        <h4 id={`${id}-ready-title`} className="font-heading text-[clamp(1.8rem,4cqw,2.8rem)] tracking-[-0.02em]">{copy.readyTitle}</h4>
        <p className="mt-2 text-sm text-mix-heading/65">{copy.readyIntro}</p>
        <div className="mt-8 grid gap-4 [@container_studio_(min-width:700px)]:grid-cols-3">
          {ready.map((bundle, index) => (
            <article key={bundle.name} className="flex flex-col rounded-3xl bg-background p-4">
              <div className="grid aspect-[4/3] grid-cols-2 gap-1.5 overflow-hidden rounded-2xl">
                {bundle.items.slice(0, 4).map((item, position) => <div key={item.id} className={cn("overflow-hidden bg-muted", bundle.items.length === 2 && "row-span-2", bundle.items.length === 3 && position === 0 && "row-span-2")}>{photo(item.src, "", 360)}</div>)}
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div><p className="font-heading text-xl">{bundle.name}</p><p className="text-xs text-mix-heading/60">{copy.readyItems.replace("{count}", String(bundle.items.length))}</p></div>
                <span className="rounded-full bg-mix-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">−{discountFor(bundle.items.length)}%</span>
              </div>
              <p className="mt-3 flex items-baseline gap-2 tabular-nums"><span className="font-heading text-2xl">{formatMoney(bundle.price)}</span><span className="text-sm text-mix-heading/50 line-through">{formatMoney(bundle.full)}</span></p>
              <button type="button" onClick={() => { bundle.items.forEach(item => onAddToBag(item.id, { unitPrice: Math.round(priceOf(item) * (1 - discountFor(bundle.items.length) / 100) * 100) / 100, variant: `${bundle.name} · ${discountFor(bundle.items.length)}% ${copy.saving}` })); setReadyAdded(current => [...current, index]); }}
                className={cn("mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border-2 border-heading text-sm font-semibold transition-colors hover:bg-heading hover:text-background", readyAdded.includes(index) && "border-primary bg-primary text-primary-foreground hover:bg-primary", focus)}>
                {readyAdded.includes(index) && <Check size={15} aria-hidden="true" />}{readyAdded.includes(index) ? copy.readyAdded : copy.readyAction}
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Guarantee and FAQ. */}
      <section className={cn(gutter, "grid gap-10 py-[clamp(3rem,8cqw,6rem)] [@container_studio_(min-width:760px)]:grid-cols-2")}>
        <div className="flex gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><Repeat2 size={24} aria-hidden="true" /></span>
          <div><p className="font-heading text-[clamp(1.6rem,3.4cqw,2.4rem)] leading-tight">{copy.guaranteeTitle}</p><p className="mt-3 max-w-[40ch] text-sm leading-relaxed text-mix-heading/65">{copy.guaranteeBody}</p><p className="mt-4 inline-flex items-center gap-2 text-sm font-medium"><PackageCheck size={16} aria-hidden="true" className="text-primary" />{copy.steps[2].body}</p></div>
        </div>
        <div>
          <h4 className="font-heading text-2xl">{copy.faqTitle}</h4>
          <div className="mt-4 divide-y divide-mix-heading/10 border-y border-mix-heading/10">
            {copy.faqs.map(faq => (
              <details key={faq.q} className="group">
                <summary className={cn("flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold [&::-webkit-details-marker]:hidden", focus)}>{faq.q}<ChevronDown size={16} aria-hidden="true" className="shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none" /></summary>
                <p className="pb-4 text-sm leading-relaxed text-mix-heading/65">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
