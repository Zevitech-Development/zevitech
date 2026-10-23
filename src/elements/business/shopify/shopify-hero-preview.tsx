"use client";

import Image from "next/image";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { shopifyHeroDesigns, shopifyHeroCarouselCopy as carousel } from "@/content/landing/shopify-hero-designs";
import type { ShopifyHeroFrameProps } from "@/interfaces/shopify-hero-design-interface";
import { ArrowRight, Check, ChevronDown, Menu, Search, ShoppingBag, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { shopifyLandingSalesContent } from "@/content/landing/shopify-landing-sales-content";

const StorefrontFrame = memo(function StorefrontFrame({ design, front, onReadiness }: ShopifyHeroFrameProps) {
  const copy = { ...shopifyLandingSalesContent.heroPreview, ...design };
  const loadedImages = useRef(new Set<string>());
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; onReadiness?.(design.id, false); };
  }, [design.id, onReadiness]);
  const imageLoaded = async (key: string, image: HTMLImageElement) => {
    try { await image.decode(); } catch { return; }
    if (!mounted.current || !image.naturalWidth) return;
    loadedImages.current.add(key);
    if (loadedImages.current.size === 5) onReadiness?.(design.id, true);
  };
  const split = design.layout === "split";
  const ProductIcon = design.service ? CalendarDays : ShoppingBag;
  const phoneImage = copy.products[design.id === "pulse" ? 0 : 1].src;
  return (
    <div className="min-w-0">
      <div role="img" aria-label={`${design.category} storefront concept on desktop and mobile`} className="relative isolate pb-16 pr-6 sm:pb-20 sm:pr-12">

        <div aria-hidden="true" className="relative overflow-hidden rounded-xl border border-white/30 bg-secondary p-1.5 shadow-2xl sm:rounded-2xl sm:p-2">
          <div className={cn("transition-opacity duration-300", front ? "opacity-100" : "opacity-0")}><div className="flex items-center gap-3 px-2 pb-2 pt-1 text-white/70">
            <span className="flex gap-1"><span className="h-1.5 w-1.5 rounded-full bg-white/60" /><span className="h-1.5 w-1.5 rounded-full bg-white/40" /><span className="h-1.5 w-1.5 rounded-full bg-white/25" /></span>
            <span className="flex-1 text-center text-[7px] tracking-widest sm:text-[9px]">{copy.browser}</span>
          </div>
          <div className="overflow-hidden rounded-lg bg-background text-heading">
            <div className="flex items-center justify-between gap-2 px-3 py-3 sm:px-5">
              <span className="text-xs font-black tracking-[0.2em] sm:text-base">{copy.brand}<span className="text-primary">.</span></span>
              <div className="hidden items-center gap-3 text-[8px] font-medium sm:flex">{copy.menu.map(item => <span key={item}>{item}</span>)}</div>
              <div className="flex gap-3"><Search className="h-3 w-3" /><ShoppingBag className="h-3 w-3" /></div>
            </div>
            <div className={cn("relative aspect-[1.85/1] overflow-hidden", split ? "bg-secondary-background text-heading" : "bg-secondary text-white")}>
              <div className={cn("absolute inset-y-0 right-0", split ? "w-[52%]" : "w-full")}><Image src={copy.products[0].src} alt="" fill loading="eager" onLoad={event => void imageLoaded("hero", event.currentTarget)} priority={design.id === "pulse" && front} quality={80} sizes="(min-width:1024px) 44vw, 90vw" className="object-cover" /></div>
              {!split && <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/20 to-transparent" />}
              <div className="absolute inset-y-0 left-0 flex w-[48%] flex-col justify-center px-4 sm:px-6">
                <span className={cn("text-[6px] font-semibold tracking-widest sm:text-[8px]", split ? "text-paragraph" : "text-white/80")}>{copy.eyebrow}</span>
                <span className="mt-2 font-heading text-[clamp(12px,2.4vw,30px)] leading-[1.05]">{copy.headline}</span>
                <span className={cn("mt-2 hidden text-[8px] leading-relaxed xl:block", split ? "text-paragraph" : "text-white/80")}>{copy.description}</span>
                <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded bg-primary px-2 py-2 text-[7px] font-semibold text-primary-foreground sm:mt-4 sm:px-3 sm:text-[9px]">{copy.shop}<ArrowRight className="h-2.5 w-2.5 shrink-0" /></span>
              </div>
            </div>
            <div className="p-3 sm:p-5">
              <p className="mb-3 font-heading text-sm sm:text-lg">{copy.collection}</p>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">{copy.products.map(product => <div key={product.name} className="min-w-0">
                <div className="relative aspect-[1.4/1] overflow-hidden rounded-md bg-muted"><Image src={product.src} alt="" fill loading="eager" onLoad={event => void imageLoaded(product.name, event.currentTarget)} quality={75} sizes="(min-width:1024px) 14vw, 28vw" className={cn("object-cover", product.position)} /></div>
                <p className="mt-2 truncate text-[8px] font-semibold sm:text-[10px]">{product.name}</p><p className="mt-0.5 text-[8px] text-paragraph sm:text-[9px]">{product.price}</p>
              </div>)}</div>
            </div>
          </div>
        </div>
        </div>
        <div aria-hidden="true" className={cn("absolute bottom-0 right-0 aspect-[9/19] w-[35%] rotate-3 overflow-hidden rounded-[1.6rem] border border-white/40 bg-secondary p-1.5 shadow-2xl transition-opacity duration-300 sm:w-[34%] sm:rounded-[2rem] sm:p-2", front ? "opacity-100" : "opacity-0")}>
          <div className="flex h-full flex-col overflow-hidden rounded-[1.2rem] bg-background text-heading sm:rounded-[1.5rem]">
            <div className="relative flex items-center justify-between px-3 pb-2 pt-5 sm:pt-6"><div className="absolute left-1/2 top-1 h-2 w-10 -translate-x-1/2 rounded-full bg-secondary" /><Menu className="h-2.5 w-2.5" /><span className="text-[8px] font-black tracking-widest sm:text-[10px]">{copy.brand}</span><ShoppingBag className="h-2.5 w-2.5" /></div>
            <div className="relative h-[39%] shrink-0"><Image src={phoneImage} alt="" fill loading="eager" onLoad={event => void imageLoaded("phone", event.currentTarget)} priority={design.id === "pulse" && front} quality={80} sizes="(min-width:1024px) 16vw, 30vw" className={cn("object-cover", design.id === "pulse" ? "object-right" : "object-center")} /></div>
            <div className="flex min-h-0 flex-1 flex-col justify-between gap-1 p-2 sm:p-3">
              <p className="font-heading text-[9px] leading-tight sm:text-sm">{copy.product}</p>
              <p className="hidden text-[7px] leading-snug text-paragraph sm:block sm:text-[9px]">{copy.productDetail}</p>
              <p className="text-[9px] font-bold sm:text-xs">{copy.price}</p>
              <p className="hidden text-[7px] sm:block sm:text-[9px]">{copy.colour}</p>
              {!design.service && <div className="hidden gap-1.5 sm:flex"><span className="h-3 w-3 rounded-full bg-heading ring-1 ring-primary ring-offset-2 sm:h-4 sm:w-4" /><span className="h-3 w-3 rounded-full border border-border bg-muted sm:h-4 sm:w-4" /><span className="h-3 w-3 rounded-full bg-primary sm:h-4 sm:w-4" /></div>}
              <span className="flex items-center justify-center gap-1 rounded bg-primary px-1 py-2 text-[8px] font-semibold text-primary-foreground sm:text-[10px]"><ProductIcon className="h-2.5 w-2.5" />{copy.add}</span>
              <span className="hidden items-center justify-between border-t border-border pt-1 text-[7px] xl:flex">{copy.delivery}<ChevronDown className="h-2.5 w-2.5" /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default function ShopifyHeroPreview() {
  const copy = shopifyLandingSalesContent.heroPreview;
  const [deck, setDeck] = useState({ active: 0, outgoing: -1, direction: 1 });
  const { active, outgoing, direction } = deck;
  const transitionLock = useRef(false);
  const [ready, setReady] = useState<Record<string, boolean>>({});
  const [requestedDirection, setRequestedDirection] = useState<number | null>(null);
  const onReadiness = useCallback((id: string, value: boolean) => {
    setReady(current => current[id] === value ? current : { ...current, [id]: value });
  }, []);
  const requestedIndex = requestedDirection === null ? -1
    : (active + requestedDirection + shopifyHeroDesigns.length) % shopifyHeroDesigns.length;
  const [paused, setPaused] = useState(false);
  const [touching, setTouching] = useState(false);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const touchStart = useRef<number | null>(null);
  const swiped = useRef(false);
  const hasAdvanced = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.01, rootMargin: "180px 0px" });
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  const change = useCallback((direction: number) => {
    if (!transitionLock.current) setRequestedDirection(direction);
  }, []);
  // Keep the current complete card visible until every incoming image is decoded.
  // This also gates manual/backward swipes, whose destination may not be mounted yet.
  useEffect(() => {
    if (requestedDirection === null || transitionLock.current
      || !ready[shopifyHeroDesigns[active].id]
      || !ready[shopifyHeroDesigns[requestedIndex].id]) return;
    transitionLock.current = true;
    hasAdvanced.current = true;
    setDeck({ active: requestedIndex, outgoing: active, direction: requestedDirection });
    setRequestedDirection(null);
  }, [active, ready, requestedDirection, requestedIndex]);
  useEffect(() => {
    if (outgoing < 0) return;
    const timer = window.setTimeout(() => {
      transitionLock.current = false;
      setDeck(current => ({ ...current, outgoing: -1 }));
    }, reducedMotion ? 0 : carousel.transitionSeconds * 1000);
    return () => window.clearTimeout(timer);
  }, [active, outgoing, reducedMotion]);
  useEffect(() => {
    if (paused || touching || reducedMotion || !visible) return;
    const timer = window.setTimeout(() => change(1), hasAdvanced.current ? carousel.intervalMs : carousel.firstMovementMs);
    return () => window.clearTimeout(timer);
  }, [active, change, paused, touching, reducedMotion, visible]);
  return (
    <figure ref={root} aria-label={carousel.label} aria-roledescription="carousel" className="relative min-w-0 overflow-hidden">
      <button type="button" onClick={() => setPaused(value => !value)} className="sr-only focus:absolute focus:left-0 focus:top-0 focus:z-30 focus:m-2 focus:h-11 focus:w-auto focus:overflow-visible focus:whitespace-normal focus:rounded-lg focus:bg-secondary focus:px-4 focus:text-white focus:[clip:auto]">{paused ? carousel.play : carousel.pause}</button>
      <div className="mb-5 flex items-center justify-between gap-3 text-[10px] font-semibold tracking-widest text-white/80">
        <span>{copy.credit}</span>
        <span className="text-white/60">{active + 1} / {shopifyHeroDesigns.length}</span>
      </div>
      <div className="relative isolate grid min-w-0 cursor-grab select-none touch-pan-y px-5 active:cursor-grabbing pb-4 pt-20 [perspective:1400px] sm:px-7 sm:pt-24"
        role="button" tabIndex={0} aria-label={carousel.next}
        onClick={() => { if (swiped.current) { swiped.current = false; return; } change(1); }}
        onKeyDown={event => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); change(event.key === "ArrowRight" ? 1 : -1); } else if (event.key === " " || event.key === "Enter") { event.preventDefault(); change(1); } }}
        onPointerDown={event => { if (event.isPrimary && event.button === 0) { touchStart.current = event.clientX; swiped.current = false; event.currentTarget.setPointerCapture(event.pointerId); setTouching(true); } }}
        onPointerCancel={() => { touchStart.current = null; setTouching(false); }}
        onLostPointerCapture={() => { touchStart.current = null; setTouching(false); }}
        onPointerUp={event => { if (touchStart.current !== null) { const delta = event.clientX - touchStart.current; if (Math.abs(delta) > 45) { swiped.current = true; change(delta < 0 ? 1 : -1); } touchStart.current = null; setTouching(false); } }}>
        {shopifyHeroDesigns.map((design, index) => {
          const depth = (index - active + shopifyHeroDesigns.length) % shopifyHeroDesigns.length;
          const returning = index === outgoing;
          return <motion.div key={design.id} aria-hidden={depth !== 0}
            className="relative col-start-1 row-start-1 min-w-0 origin-center [backface-visibility:hidden]"
            initial={false}
            animate={{ x: depth * 6, y: -depth * 18, scale: 1 - depth * 0.025, rotateZ: depth * 1.1, zIndex: 7 - depth }}
            transition={{ duration: reducedMotion || returning ? 0 : carousel.transitionSeconds, ease: [0.45, 0, 0.2, 1], zIndex: { duration: 0 } }}>
            <div className="pointer-events-none h-full">{depth <= 1 || index === requestedIndex ? <StorefrontFrame design={design} front={depth === 0} onReadiness={onReadiness} /> : <div className="h-full pb-16 pr-6 sm:pb-20 sm:pr-12"><div className="h-full rounded-xl border border-white/30 bg-secondary shadow-lg sm:rounded-2xl" /></div>}</div>
          </motion.div>;
        })}
        {outgoing >= 0 && !reducedMotion && <motion.div key={`outgoing-${outgoing}`}
          aria-hidden="true" className="pointer-events-none relative z-20 col-start-1 row-start-1 min-w-0 origin-bottom [backface-visibility:hidden] [will-change:transform,opacity]"
          initial={{ x: 0, y: 0, scale: 1, rotateZ: 0, opacity: 1 }}
          animate={{ x: -direction * 36, y: -24, scale: 0.95, rotateZ: -direction * 4, opacity: [1, 1, 0] }}
          transition={{ duration: carousel.transitionSeconds, ease: [0.45, 0, 0.2, 1], opacity: { duration: carousel.transitionSeconds * 0.85, times: [0, 0.35, 1], ease: "easeInOut" } }}>
          <StorefrontFrame design={shopifyHeroDesigns[outgoing]} front />
        </motion.div>}
      </div>
      <p className="mt-3 text-center text-xs font-medium tracking-wide text-white/80">{shopifyHeroDesigns[active].category}</p>
      <div className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-white/90">{copy.callouts.map(label => <span key={label} className="inline-flex items-center gap-1.5"><Check aria-hidden="true" className="h-3.5 w-3.5 text-tertiary" />{label}</span>)}</div>
      <figcaption className="mt-3 text-center text-[10px] leading-relaxed text-white/60 sm:text-xs">{copy.caption}</figcaption>
    </figure>
  );
}
