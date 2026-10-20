"use client";

import { useEffect, useId, useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import { motion, scroll, useMotionValue, useSpring, useTransform, type MotionStyle } from "framer-motion";
import { ArrowUpRight, Check, Plus, Search, ShoppingBag } from "lucide-react";
import { shopifyPremiumPreviewCopy as copy } from "@/content/landing/shopify-premium-preview-content";
import type { ShopifyPremiumPreviewProps } from "@/interfaces/shopify-premium-preview-interface";
import { cn } from "@/lib/utils";

const motionPreferenceKey = "zevitech-studio-reduce-motion";

function scrollContainerFor(element: HTMLElement): HTMLElement | undefined {
  let parent = element.parentElement;
  while (parent && parent !== document.body) {
    if (/(auto|scroll)/.test(getComputedStyle(parent).overflowY)) return parent;
    parent = parent.parentElement;
  }
  return undefined;
}

export default function ShopifyPremiumPreview({ layout, headline, brief, productName, images, products, onBrowse, onProduct, onAddToBag, onViewBag }: ShopifyPremiumPreviewProps) {
  const section = useRef<HTMLElement>(null);
  const headingId = useId();
  const [systemReduced, setSystemReduced] = useState(true);
  const [motionEnabled, setMotionEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [collection, setCollection] = useState("all");
  const [query, setQuery] = useState("");
  const [addedId, setAddedId] = useState<number | null>(null);
  const progress = useMotionValue(0.5);
  const easedProgress = useSpring(progress, { stiffness: 100, damping: 28, mass: 0.6 });
  const tiltX = useSpring(0, { stiffness: 130, damping: 24 });
  const tiltY = useSpring(0, { stiffness: 130, damping: 24 });
  const nearY = useTransform(easedProgress, [0, 1], ["18px", "-18px"]);
  const farY = useTransform(easedProgress, [0, 1], ["-12px", "12px"]);
  const imageY = useTransform(easedProgress, [0, 1], ["3%", "-3%"]);
  const tiltXDegrees = useTransform(tiltX, value => `${value}deg`);
  const tiltYDegrees = useTransform(tiltY, value => `${value}deg`);
  const reduced = systemReduced || !motionEnabled;
  const suppliedImages = Array.from(new Set(images.filter(Boolean)));
  const items = products?.length ? products : (suppliedImages.length ? suppliedImages : ["/store-studio/sample-1.svg"]).map((src, id) => ({ id, src, name: productName, collection: copy.merchandising.featured, priceLabel: "" }));
  const catalogIdentity = JSON.stringify(items);
  const selected = items[Math.min(selectedIndex, items.length - 1)];
  const collections = Array.from(new Set(items.map(item => item.collection)));
  const filtered = items.filter(item => (collection === "all" || item.collection === collection) && `${item.name} ${item.collection}`.toLowerCase().includes(query.trim().toLowerCase()));
  const m = copy.merchandising;
  const focus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  const action = cn("studio-premium-shop-action", focus);
  const quiet = cn("studio-premium-shop-link", focus);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setSystemReduced(preference.matches);
    syncPreference();
    preference.addEventListener("change", syncPreference);
    return () => preference.removeEventListener("change", syncPreference);
  }, []);
  useEffect(() => {
    try { setMotionEnabled(sessionStorage.getItem(motionPreferenceKey) !== "true"); }
    catch { setMotionEnabled(true); }
  }, []);
  useEffect(() => {
    setSelectedIndex(0);
    setCollection("all");
    setQuery("");
    setAddedId(null);
  }, [layout, catalogIdentity]);
  useEffect(() => {
    if (reduced || !section.current) {
      progress.jump(0.5); easedProgress.jump(0.5); tiltX.jump(0); tiltY.jump(0);
      return;
    }
    return scroll((value: number) => progress.set(value), { container: scrollContainerFor(section.current), target: section.current, offset: ["start end", "end start"] });
  }, [reduced, layout, progress, easedProgress, tiltX, tiltY]);

  const changeMotion = () => {
    setMotionEnabled(!motionEnabled);
    try { sessionStorage.setItem(motionPreferenceKey, String(motionEnabled)); } catch { /* Local state remains usable. */ }
  };
  const movePerspective = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    tiltX.set(((event.clientY - box.top) / box.height - 0.5) * -3);
    tiltY.set(((event.clientX - box.left) / box.width - 0.5) * 4);
  };
  const resetPerspective = () => { tiltX.set(0); tiltY.set(0); };
  const photo = (src: string, alt: string, className = "") => <Image src={src} alt={alt} width={1100} height={1300} unoptimized className={cn("h-full w-full object-cover", className)} />;
  const addItem = (id: number) => { onAddToBag?.(id); setAddedId(id); };
  const shoppingActions = (item: typeof selected, compact = false) => (
    <div className={cn("studio-premium-product-actions", compact && "studio-premium-product-actions-compact")}>
      <button type="button" className={compact ? quiet : action} onClick={() => onProduct(item.id)}>{m.viewProduct}<ArrowUpRight size={16} aria-hidden="true" /></button>
      {onAddToBag && <button type="button" className={compact ? action : quiet} onClick={() => addItem(item.id)}>{addedId === item.id ? <Check size={16} aria-hidden="true" /> : <ShoppingBag size={16} aria-hidden="true" />}{addedId === item.id ? m.addedShort : m.addToBag}</button>}
    </div>
  );
  const productCards = (list: typeof items) => (
    <div className="studio-premium-product-grid">
      {list.map(item => <article key={item.id} className="studio-premium-product-card">
        <button type="button" className={cn("studio-premium-product-photo", focus)} onClick={() => onProduct(item.id)} aria-label={`${m.viewProduct}: ${item.name}`}>{photo(item.src, item.name)}<span>{m.viewProduct}<ArrowUpRight size={17} aria-hidden="true" /></span></button>
        <div className="studio-premium-product-caption"><p>{item.collection}</p><button type="button" className={cn("studio-premium-product-name", focus)} onClick={() => onProduct(item.id)}>{item.name}</button>{item.priceLabel && <span>{item.priceLabel}</span>}</div>
        {onAddToBag && <button type="button" className={cn("studio-premium-card-add", focus)} onClick={() => addItem(item.id)}>{addedId === item.id ? <Check size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}{addedId === item.id ? m.addedShort : m.addToBag}</button>}
      </article>)}
    </div>
  );
  const collectionCards = (
    <section className="studio-premium-collections" aria-labelledby={`${headingId}-collections`}>
      <div className="studio-premium-section-heading"><div><p>{m.collectionLabel}</p><h4 id={`${headingId}-collections`} className="font-heading">{m.browseCollections}</h4></div><button type="button" className={quiet} onClick={() => onBrowse()}>{m.shopAll}<ArrowUpRight size={16} aria-hidden="true" /></button></div>
      <div className="studio-premium-collection-grid">{collections.map((name, index) => {
        const item = items.find(product => product.collection === name)!;
        return <button key={name} type="button" className={cn("studio-premium-collection-tile", focus)} onClick={() => onBrowse(name)}>{photo(item.src, name)}<span><small>{String(index + 1).padStart(2, "0")}</small><strong className="font-heading">{name}</strong><ArrowUpRight size={19} aria-hidden="true" /></span></button>;
      })}</div>
    </section>
  );

  return <motion.section ref={section} aria-labelledby={headingId} data-premium-layout={layout} data-motion={reduced ? "reduced" : "enabled"} className="studio-premium-reference studio-premium-storefront" style={{ "--premium-near-y": reduced ? "0px" : nearY, "--premium-far-y": reduced ? "0px" : farY, "--premium-image-y": reduced ? "0%" : imageY, "--premium-tilt-x": reduced ? "0deg" : tiltXDegrees, "--premium-tilt-y": reduced ? "0deg" : tiltYDegrees } as MotionStyle}>
    {layout === 8 ? <>
      <div className="studio-premium-cinema" onPointerMove={movePerspective} onPointerLeave={resetPerspective}>
        <div className="studio-premium-cinema-backdrop" aria-hidden="true">{photo(items[0].src, "")}</div>
        <div className="studio-premium-cinema-shade" />
        <div className="studio-premium-cinema-heading"><p>{copy.cinematic.eyebrow}</p><h3 id={headingId} className="font-heading">{headline}</h3><p>{brief || copy.fallbackIntro}</p><button type="button" className={cn(action, "studio-premium-light-action")} onClick={() => onBrowse()}>{m.shopEdit}<ArrowUpRight size={18} aria-hidden="true" /></button></div>
        <div className="studio-premium-cinema-picks" role="group" aria-label={m.choosePiece}>{items.slice(0, 3).map((item, index) => <button type="button" key={item.id} className={cn("studio-premium-cinema-pick", focus)} aria-label={`${m.selectPiece}: ${item.name}`} aria-pressed={selected.id === item.id} aria-controls={`${headingId}-featured`} onClick={() => setSelectedIndex(index)}><span>{selected.id === item.id ? <Check size={16} /> : <Plus size={16} />}</span><span>{item.collection}</span></button>)}</div>
        <div className="studio-premium-cinema-product" id={`${headingId}-featured`}>
          <button type="button" className={cn("studio-premium-cinema-product-image", focus)} onClick={() => onProduct(selected.id)} aria-label={`${m.viewProduct}: ${selected.name}`}>{photo(selected.src, selected.name)}</button>
          <div><p className="studio-premium-overline">{m.selected}</p><h4 className="font-heading" aria-live="polite">{selected.name}</h4>{selected.priceLabel && <p className="studio-premium-price">{selected.priceLabel}</p>}{shoppingActions(selected, true)}</div>
        </div>
      </div>
      <section className="studio-premium-shop-section"><div className="studio-premium-section-heading"><div><p>{m.featured}</p><h4 className="font-heading">{m.shopEdit}</h4></div><button type="button" className={quiet} onClick={() => onBrowse()}>{m.shopAll}<ArrowUpRight size={16} aria-hidden="true" /></button></div>{productCards(items)}</section>
      {collectionCards}
    </> : layout === 9 ? <>
      <div className="studio-premium-commerce-opening"><p className="studio-premium-overline">{copy.commerce.eyebrow}</p><h3 id={headingId} className="font-heading">{headline}</h3><p>{brief || copy.fallbackIntro}</p></div>
      <div className="studio-premium-commerce-feature">
        <div className="studio-premium-commerce-visual" onPointerMove={movePerspective} onPointerLeave={resetPerspective}><button type="button" className={cn("studio-premium-commerce-main-image", focus)} onClick={() => onProduct(selected.id)} aria-label={`${m.viewProduct}: ${selected.name}`}>{photo(selected.src, selected.name)}<span>{m.viewProduct}<ArrowUpRight size={18} aria-hidden="true" /></span></button><div className="studio-premium-commerce-thumbs" role="group" aria-label={m.choosePiece}>{items.slice(0, 4).map((item, index) => <button type="button" key={item.id} className={focus} aria-label={`${m.selectPiece}: ${item.name}`} aria-pressed={selected.id === item.id} aria-controls={`${headingId}-selection`} onClick={() => setSelectedIndex(index)}>{photo(item.src, item.name)}{selected.id === item.id && <span><Check size={14} aria-hidden="true" /></span>}</button>)}</div></div>
        <div className="studio-premium-commerce-detail" id={`${headingId}-selection`}><p className="studio-premium-overline">{selected.collection}</p><h4 className="font-heading" aria-live="polite">{selected.name}</h4>{selected.priceLabel && <p className="studio-premium-commerce-price">{selected.priceLabel}<small>{m.samplePrice}</small></p>}<p>{copy.commerce.closingBody}</p><div className="studio-premium-commerce-choices" role="group" aria-label={m.choosePiece}>{items.slice(0, 4).map((item, index) => <button key={item.id} type="button" className={focus} aria-pressed={selected.id === item.id} aria-controls={`${headingId}-selection`} onClick={() => setSelectedIndex(index)}><span>{item.collection}</span>{selected.id === item.id ? <Check size={16} aria-hidden="true" /> : <ArrowUpRight size={16} aria-hidden="true" />}</button>)}</div>{shoppingActions(selected)}<button type="button" className={quiet} onClick={() => onBrowse(selected.collection)}>{selected.collection}<ArrowUpRight size={16} aria-hidden="true" /></button></div>
      </div>
      <section className="studio-premium-discovery" aria-labelledby={`${headingId}-discovery`}><div className="studio-premium-section-heading"><div><p>{m.featured}</p><h4 id={`${headingId}-discovery`} className="font-heading">{m.shopEdit}</h4></div></div><div className="studio-premium-discovery-controls"><div role="group" aria-label={m.filter}>{["all", ...collections].map(name => <button type="button" key={name} className={focus} aria-pressed={collection === name} onClick={() => setCollection(name)}>{name === "all" ? m.all : name}</button>)}</div><label><span className="sr-only">{m.search}</span><Search size={17} aria-hidden="true" /><input value={query} type="search" onChange={event => setQuery(event.target.value)} placeholder={m.searchPlaceholder} className={focus} /></label></div><p className="sr-only" aria-live="polite">{filtered.length} {m.results}</p>{filtered.length ? productCards(filtered) : <div className="studio-premium-no-results"><p>{m.empty}</p><button type="button" className={quiet} onClick={() => { setCollection("all"); setQuery(""); }}>{m.reset}</button></div>}</section>
      {collectionCards}
    </> : <>
      <div className={cn("studio-premium-executive-hero", layout === 6 ? "studio-premium-executive-depth" : "studio-premium-executive-editorial")}>
        <div className="studio-premium-executive-copy"><p className="studio-premium-overline">{layout === 6 ? copy.dimensionalEyebrow : copy.editorialEyebrow}</p><h3 id={headingId} className="font-heading">{headline}</h3><p>{brief || copy.fallbackIntro}</p><button type="button" className={action} onClick={() => onBrowse()}>{m.shopEdit}<ArrowUpRight size={18} aria-hidden="true" /></button></div>
        <div className="studio-premium-executive-art" onPointerMove={movePerspective} onPointerLeave={resetPerspective}>{items.slice(0, layout === 6 ? 3 : 2).map((item, index) => <button type="button" key={item.id} className={cn("studio-premium-executive-photo", focus)} data-position={index} onClick={() => onProduct(item.id)} aria-label={`${m.viewProduct}: ${item.name}`}>{photo(item.src, item.name)}<span>{item.collection}<ArrowUpRight size={15} aria-hidden="true" /></span></button>)}</div>
      </div>
      <section className="studio-premium-shop-section"><div className="studio-premium-section-heading"><div><p>{m.editorialLabel}</p><h4 className="font-heading">{m.shopEdit}</h4></div><button type="button" className={quiet} onClick={() => onBrowse()}>{m.shopAll}<ArrowUpRight size={16} aria-hidden="true" /></button></div>{productCards(items)}</section>
      {items.length > 1 && <section className="studio-premium-editorial-feature"><button type="button" className={cn("studio-premium-editorial-feature-image", focus)} onClick={() => onProduct(items[items.length - 1].id)} aria-label={`${m.viewProduct}: ${items[items.length - 1].name}`}>{photo(items[items.length - 1].src, items[items.length - 1].name)}</button><div><p className="studio-premium-overline">{copy.detailLabel}</p><h4 className="font-heading">{copy.editorialTitle}</h4><p>{copy.editorialBody}</p><button type="button" className={quiet} onClick={() => onBrowse(items[items.length - 1].collection)}>{items[items.length - 1].collection}<ArrowUpRight size={17} aria-hidden="true" /></button></div></section>}
    </>}
    {addedId !== null && <div className="studio-premium-bag-feedback" role="status"><span><Check size={17} aria-hidden="true" />{m.added}: {items.find(item => item.id === addedId)?.name}</span>{onViewBag && <button type="button" className={quiet} onClick={onViewBag}>{m.viewBag}<ArrowUpRight size={16} aria-hidden="true" /></button>}</div>}
    <div className="studio-premium-storefront-footer"><p>{copy.sampleNote}</p><button type="button" className={cn("studio-premium-motion-toggle", focus)} aria-pressed={reduced} disabled={systemReduced} title={systemReduced ? copy.systemMotion : undefined} onClick={changeMotion}>{reduced && <Check size={14} aria-hidden="true" />}{copy.reduceMotion}</button></div>
  </motion.section>;
}
