"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, CreditCard, Headphones, ShieldCheck, Truck } from "lucide-react";
import { clotyaHomeCopy as originalCopy } from "@/content/landing/shopify-clotya-content";
import type { ShopifyPremiumProduct } from "@/interfaces/shopify-premium-preview-interface";
import type { ShopifySignatureHomeProps } from "@/interfaces/shopify-signature-storefront-interface";
import { categoryEditorialCopy } from "@/content/landing/shopify-category-signature-content";
import { cn } from "@/lib/utils";

export default function ShopifyClotyaHome({ products, categoryContext, serviceMode = false, headline, brief, onBrowse, onProduct, onAddToBag, onJournal }: ShopifySignatureHomeProps) {
  const copy = categoryContext ? categoryEditorialCopy(categoryContext, products, serviceMode) : originalCopy;
  const sectionId = useId();
  const [carouselRef, carousel] = useEmblaCarousel({ loop: true, duration: 24 });
  const [activeSlide, setActiveSlide] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const firstProducts = products.slice(0, 4);
  const featuredProducts = products.length > 4 ? products.slice(4, 8) : products.slice(0, 4);
  const featuredTee = categoryContext ? products[1] ?? products[0] : products.find(product => product.collection === "Essentials") ?? products[0];
  const highlights = [products[2], products[6] ?? products[3]].filter((product): product is ShopifyPremiumProduct => Boolean(product));
  const focus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  const section = "mx-auto w-full px-[clamp(1rem,4cqw,3rem)]";
  const heading = "font-heading text-[clamp(1.15rem,2cqw,1.6rem)] leading-tight text-heading";
  const small = "text-[clamp(.75rem,1.1cqw,.875rem)] leading-relaxed text-paragraph";
  const eyebrow = "text-[10px] font-semibold uppercase tracking-[0.11em]";
  const link = cn("inline-flex min-h-11 items-center gap-2 text-xs font-semibold", focus);
  const button = cn("inline-flex min-h-11 items-center justify-center gap-2 bg-primary px-5 py-3 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-hover motion-reduce:transition-none", focus);
  const photo = (src: string, alt: string, className = "", eager = false) => <Image src={src} alt={alt} width={1400} height={1700} unoptimized loading={eager ? "eager" : "lazy"} className={cn("h-full w-full object-cover", className)} />;
  const openJournal = (collection: string) => onJournal ? onJournal() : onBrowse(collection);

  useEffect(() => {
    if (!carousel) return;
    const update = () => setActiveSlide(carousel.selectedScrollSnap());
    update();
    carousel.on("select", update);
    carousel.on("reInit", update);
    return () => { carousel.off("select", update); carousel.off("reInit", update); };
  }, [carousel]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const productCard = (product: ShopifyPremiumProduct) => (
    <article key={product.id} className="min-w-0">
      <button type="button" onClick={() => onProduct(product.id)} aria-label={`${copy.products.view}: ${product.name}`} className={cn("group block aspect-[4/5] w-full overflow-hidden bg-secondary-background", focus)}>
        {photo(product.src, product.name, "object-top transition-transform duration-300 motion-safe:group-hover:scale-[1.025] motion-reduce:transition-none")}
      </button>
      <p className="mt-2 flex items-center gap-1.5 text-[10px] text-paragraph"><span className="h-1.5 w-1.5 rounded-full bg-primary" />{product.collection}</p>
      <button type="button" onClick={() => onProduct(product.id)} className={cn("flex min-h-11 items-center text-left text-xs font-medium leading-snug", focus)}>{product.name}</button>
      <div className="flex flex-wrap items-center justify-between gap-x-2">
        <p className="text-xs font-semibold">{product.priceLabel}</p>
        <button type="button" onClick={() => onAddToBag(product.id)} className={cn("inline-flex min-h-11 items-center gap-1 text-[11px] font-medium underline decoration-border underline-offset-4", focus)}>{copy.products.options}<ChevronRight size={12} aria-hidden="true" /></button>
      </div>
    </article>
  );

  return (
    <div data-signature-theme="clotya" className="min-w-0 overflow-hidden bg-background text-heading">
      <div className="grid grid-cols-1 [@container_studio_(min-width:700px)]:grid-cols-[minmax(9.5rem,20%)_minmax(0,1fr)]">
        <nav aria-label={copy.navigation.label} className="hidden border-r border-border pl-[clamp(1rem,4cqw,3rem)] pr-4 [@container_studio_(min-width:700px)]:block">
          <p className="flex min-h-11 items-center justify-between border-b border-border text-xs font-semibold">{copy.navigation.title}<ChevronRight size={14} aria-hidden="true" /></p>
          {copy.navigation.items.map(collection => <button type="button" key={collection} onClick={() => onBrowse(collection)} className={cn("flex min-h-11 w-full items-center text-left text-xs text-paragraph transition-colors hover:text-primary motion-reduce:transition-none", focus)}>{collection}</button>)}
          <div className="border-t border-border">
            <button type="button" onClick={() => onBrowse()} className={cn("flex min-h-11 w-full items-center text-left text-xs", focus)}>{copy.navigation.fresh}</button>
            <button type="button" onClick={() => onBrowse()} className={cn("flex min-h-11 w-full items-center text-left text-xs font-semibold", focus)}>{copy.navigation.all}<ArrowRight size={13} className="ml-auto" aria-hidden="true" /></button>
          </div>
        </nav>
        <details className="border-b border-border [@container_studio_(min-width:700px)]:hidden">
          <summary className={cn("flex min-h-11 cursor-pointer list-none items-center justify-between px-4 text-xs font-semibold [&::-webkit-details-marker]:hidden", focus)}>{copy.navigation.title}<ChevronDown size={15} aria-hidden="true" /></summary>
          <div className="grid grid-cols-2 gap-x-4 px-4 pb-3">{copy.navigation.items.map(collection => <button type="button" key={collection} className={cn("min-h-11 text-left text-xs", focus)} onClick={() => onBrowse(collection)}>{collection}</button>)}</div>
        </details>
        <section aria-label={copy.hero.label} className="relative min-w-0 bg-secondary-background">
          <div ref={carouselRef} className="overflow-hidden">
            <div className="flex touch-pan-y">
              {copy.hero.slides.map((slide, index) => (
                <div key={slide.headline} aria-hidden={activeSlide !== index} className="relative min-w-0 flex-[0_0_100%]">
                  <div className="h-[clamp(22rem,43cqw,35rem)] overflow-hidden">{photo(slide.image, slide.imageAlt, "object-[center_35%]", index === 0)}</div>
                  <div className="absolute inset-0 bg-gradient-to-r from-mix-heading/90 via-mix-heading/65 to-mix-heading/10" />
                  <div className="absolute inset-0 flex flex-col items-start justify-center px-[clamp(2.75rem,5cqw,4.5rem)] py-14 text-background">
                    <p className={eyebrow}>{slide.eyebrow}</p>
                    <h3 className="mt-3 max-w-[18ch] break-words font-heading text-[clamp(2rem,4.6cqw,3.8rem)] font-normal leading-[1.08] text-background">{index === 0 && headline ? headline : slide.headline}</h3>
                    <p className="mt-4 max-w-[27ch] text-xs leading-relaxed text-mix-background/90">{index === 0 && brief ? brief : slide.description}</p>
                    <button type="button" tabIndex={activeSlide === index ? 0 : -1} onClick={() => onBrowse(slide.collection)} className={cn(button, "mt-4 border border-mix-background/20 shadow-sm")}>{copy.hero.action}<ArrowRight size={15} aria-hidden="true" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button type="button" aria-label={copy.hero.previous} onClick={() => carousel?.scrollPrev(reduceMotion)} className={cn("absolute left-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-heading", focus)}><span className="flex h-7 w-7 items-center justify-center rounded-full bg-mix-background/95"><ChevronLeft size={17} aria-hidden="true" /></span></button>
          <button type="button" aria-label={copy.hero.next} onClick={() => carousel?.scrollNext(reduceMotion)} className={cn("absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-heading", focus)}><span className="flex h-7 w-7 items-center justify-center rounded-full bg-mix-background/95"><ChevronRight size={17} aria-hidden="true" /></span></button>
          <div className="absolute bottom-0 inset-x-0 flex justify-center">{copy.hero.slides.map((slide, index) => <button type="button" key={slide.headline} aria-label={`${copy.hero.slideLabel} ${index + 1}`} aria-pressed={activeSlide === index} onClick={() => carousel?.scrollTo(index, reduceMotion)} className={cn("flex h-11 w-11 items-center justify-center", focus)}><span className={cn("h-1.5 w-1.5 rounded-full bg-mix-background/50", activeSlide === index && "bg-background ring-1 ring-background ring-offset-2 ring-offset-transparent")} /></button>)}</div>
        </section>
      </div>

      <section className={cn(section, "grid grid-cols-2 gap-4 py-6 [@container_studio_(min-width:700px)]:grid-cols-4")}>
        {copy.benefits.map(item => { const Icon = item.icon === "delivery" ? Truck : item.icon === "shield" ? ShieldCheck : item.icon === "support" ? Headphones : CreditCard; return <div key={item.title} className="flex min-w-0 items-start gap-3"><Icon size={27} strokeWidth={1.2} className="mt-1 shrink-0" aria-hidden="true" /><div><h4 className="text-xs font-semibold">{item.title}</h4><p className="mt-1 text-[11px] leading-relaxed text-paragraph">{item.description}</p></div></div>; })}
      </section>

      <section className={cn(section, "grid grid-cols-1 gap-3 pb-6 [@container_studio_(min-width:640px)]:grid-cols-2")} aria-label={copy.promotions.eyebrow}>
        <button type="button" onClick={() => onBrowse(copy.promotions.items[0].collection)} className={cn("group relative block min-h-[22rem] overflow-hidden bg-secondary-background text-left [@container_studio_(min-width:640px)]:min-h-[26rem]", focus)}>
          <div className="absolute inset-0">{photo(copy.promotions.items[0].image, copy.promotions.items[0].imageAlt, "object-[65%_center] transition-transform duration-500 motion-safe:group-hover:scale-[1.025] motion-reduce:transition-none")}</div>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-mix-background/95 to-mix-background/10" />
          <div className="relative max-w-[72%] p-[clamp(1.5rem,3cqw,2.5rem)]"><p className={eyebrow}>{copy.promotions.eyebrow}</p><h3 className="mt-3 font-heading text-[clamp(1.6rem,3cqw,2.5rem)] leading-tight">{copy.promotions.items[0].title}</h3><p className={cn(small, "mt-3")}>{copy.promotions.items[0].description}</p><span className={cn(button, "mt-3 px-3")}>{copy.promotions.action}<ArrowRight size={15} aria-hidden="true" /></span></div>
        </button>
        <div className="grid gap-3">{copy.promotions.items.slice(1).map(item => <button type="button" key={item.title} onClick={() => onBrowse(item.collection)} className={cn("group relative grid min-h-48 grid-cols-[1.1fr_.9fr] overflow-hidden bg-secondary-background text-left", focus)}><div className="relative z-10 p-[clamp(1.1rem,2.4cqw,2rem)]"><p className={eyebrow}>{copy.promotions.eyebrow}</p><h3 className="mt-2 font-heading text-[clamp(1.2rem,2.2cqw,1.75rem)] leading-tight">{item.title}</h3><p className="mt-2 text-[11px] leading-relaxed text-paragraph">{item.description}</p><span className={cn(button, "mt-2 px-3")}>{copy.promotions.action}<ArrowRight size={14} aria-hidden="true" /></span></div><div className="min-w-0">{photo(item.image, item.imageAlt, "object-center transition-transform duration-500 motion-safe:group-hover:scale-[1.025] motion-reduce:transition-none")}</div></button>)}</div>
      </section>

      <section className={cn(section, "pb-7")} aria-labelledby={`${sectionId}-everyday`}>
        <div className="mb-4 text-center"><h3 id={`${sectionId}-everyday`} className={heading}>{copy.products.title}</h3><p className={cn(small, "mx-auto mt-2 max-w-xl")}>{copy.products.description}</p></div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-5 [@container_studio_(min-width:640px)]:grid-cols-4">{firstProducts.map(productCard)}</div>
      </section>

      {featuredTee && <section className={cn(section, "pb-7")} aria-labelledby={`${sectionId}-campaign`}><div className="grid grid-cols-1 overflow-hidden bg-secondary-background [@container_studio_(min-width:640px)]:grid-cols-2"><button type="button" onClick={() => onProduct(featuredTee.id)} aria-label={`${copy.products.view}: ${featuredTee.name}`} className={cn("block aspect-[4/3] max-h-96 w-full overflow-hidden", focus)}>{photo(featuredTee.src, featuredTee.name)}</button><div className="flex flex-col items-start justify-center p-[clamp(1.5rem,4cqw,3.5rem)]"><p className={eyebrow}>{copy.campaign.eyebrow}</p><h3 id={`${sectionId}-campaign`} className="mt-3 font-heading text-[clamp(1.65rem,3cqw,2.5rem)] leading-tight">{copy.campaign.title}</h3><p className={cn(small, "mt-3")}>{copy.campaign.description}</p><div className="my-4 flex flex-wrap gap-2">{copy.campaign.details.map(detail => <span key={detail} className="border border-border bg-background px-2 py-1 text-[10px]">{detail}</span>)}</div><button type="button" className={button} onClick={() => onProduct(featuredTee.id)}>{copy.campaign.action}<ArrowRight size={14} aria-hidden="true" /></button></div></div></section>}

      <section className={cn(section, "pb-7")} aria-labelledby={`${sectionId}-featured`}>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3"><h3 id={`${sectionId}-featured`} className={heading}>{copy.products.featuredTitle}</h3><p className={cn(small, "max-w-sm")}>{copy.products.featuredDescription}</p></div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-5 [@container_studio_(min-width:640px)]:grid-cols-4">{featuredProducts.map(productCard)}</div>
      </section>

      <section className={cn(section, "grid grid-cols-1 gap-3 pb-6 [@container_studio_(min-width:640px)]:grid-cols-2")} aria-label={copy.accessories.eyebrow}>
        {copy.accessories.items.map(item => <button type="button" key={item.title} onClick={() => onBrowse(item.collection)} className={cn("group grid min-h-48 grid-cols-[1.1fr_.9fr] overflow-hidden bg-secondary-background text-left", focus)}><div className="p-[clamp(1.2rem,2.5cqw,2rem)]"><p className={eyebrow}>{copy.accessories.eyebrow}</p><h3 className="mt-2 font-heading text-[clamp(1.25rem,2.4cqw,1.9rem)] leading-tight">{item.title}</h3><p className="mt-2 text-[11px] leading-relaxed text-paragraph">{item.description}</p><span className={cn(button, "mt-2 px-3")}>{copy.accessories.action}<ArrowRight size={14} aria-hidden="true" /></span></div><div className="min-w-0">{photo(item.image, item.imageAlt, "transition-transform duration-500 motion-safe:group-hover:scale-[1.025] motion-reduce:transition-none")}</div></button>)}
      </section>

      <section className={cn(section, "pb-7")} aria-labelledby={`${sectionId}-categories`}>
        <div className="mb-3 flex flex-wrap items-baseline gap-x-4 gap-y-2"><h3 id={`${sectionId}-categories`} className={heading}>{copy.categories.title}</h3><p className="text-xs text-paragraph">{copy.categories.description}</p></div>
        <div className="grid grid-cols-3 gap-3 [@container_studio_(min-width:640px)]:grid-cols-6">{copy.categories.items.map(item => <button type="button" key={item.name} onClick={() => onBrowse(item.name)} className={cn("group min-w-0", focus)}><div className="aspect-[3/2] overflow-hidden bg-secondary-background">{photo(item.image, item.name, "object-[center_35%] transition-transform duration-300 motion-safe:group-hover:scale-[1.03] motion-reduce:transition-none")}</div><span className="flex min-h-11 items-center justify-center text-xs font-semibold">{item.name}</span></button>)}</div>
      </section>

      <section className={cn(section, "pb-6")} aria-labelledby={`${sectionId}-highlights`}>
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-3"><h3 id={`${sectionId}-highlights`} className={heading}>{copy.highlights.title}</h3><p className="text-xs text-paragraph">{copy.highlights.description}</p></div>
        <div className="grid grid-cols-1 gap-3 [@container_studio_(min-width:640px)]:grid-cols-2">{highlights.map(product => <article key={product.id} className="grid grid-cols-[.8fr_1.2fr] gap-4 border border-border p-3"><button type="button" aria-label={`${copy.products.view}: ${product.name}`} className={cn("block min-h-48 overflow-hidden bg-secondary-background", focus)} onClick={() => onProduct(product.id)}>{photo(product.src, product.name, "object-top")}</button><div className="flex min-w-0 flex-col items-start justify-center"><p className="text-[10px] uppercase tracking-wider text-paragraph">{copy.highlights.label}</p><h4 className="mt-2 font-heading text-lg leading-tight">{product.name}</h4><p className="mt-2 text-sm font-semibold text-primary">{product.priceLabel}</p><p className="my-3 text-[11px] leading-relaxed text-paragraph">{copy.highlights.detail}</p><button type="button" className={link} onClick={() => onAddToBag(product.id)}>{copy.highlights.action}<ArrowRight size={14} aria-hidden="true" /></button></div></article>)}</div>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 border border-mix-primary/15 bg-mix-primary/5 px-4 py-1 text-center"><p className="text-xs font-semibold">{copy.highlights.ribbon}</p><button type="button" onClick={() => onBrowse()} className={cn(link, "text-primary")}>{copy.highlights.ribbonAction}<ArrowRight size={14} aria-hidden="true" /></button></div>
      </section>

      <section className={cn(section, "pb-8")} aria-labelledby={`${sectionId}-journal`}>
        <div className="mb-4 text-center"><h3 id={`${sectionId}-journal`} className={heading}>{copy.journal.title}</h3><p className={cn(small, "mt-2")}>{copy.journal.description}</p></div>
        <div className="grid grid-cols-1 gap-4 [@container_studio_(min-width:640px)]:grid-cols-3">{copy.journal.items.map(item => <article key={item.title} className="min-w-0"><button type="button" aria-label={`${copy.journal.action}: ${item.title}`} onClick={() => openJournal(item.collection)} className={cn("block aspect-[16/9] w-full overflow-hidden bg-secondary-background", focus)}>{photo(item.image, item.imageAlt, "object-[center_35%]")}</button><p className="mt-3 text-[9px] font-medium uppercase tracking-wider text-paragraph">{item.eyebrow}</p><h4 className="mt-1 font-heading text-base leading-tight">{item.title}</h4><p className="mt-2 text-[11px] leading-relaxed text-paragraph">{item.description}</p><button type="button" onClick={() => openJournal(item.collection)} className={link}>{copy.journal.action}<ArrowRight size={14} aria-hidden="true" /></button></article>)}</div>
      </section>
    </div>
  );
}
