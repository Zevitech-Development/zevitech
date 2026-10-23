"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { Check, MousePointerClick, X } from "lucide-react";
import { shopifyShowcaseCopy as copy } from "@/content/landing/shopify-showcase-content";
import type { ShopifyShowcasePreviewProps } from "@/interfaces/shopify-showcase-interface";
import { cn } from "@/lib/utils";

/** A premium storefront render inside a browser frame, with numbered feature hotspots shoppers can tap. */
export default function ShopifyShowcasePreview({ showcase, brand, mobile = false, expanded = false }: ShopifyShowcasePreviewProps) {
  const id = useId();
  const [active, setActive] = useState<number | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const pins = useRef<(HTMLButtonElement | null)[]>([]);
  const domain = `${brand.split(" ")[0].toLowerCase().replace(/[^a-z0-9]/g, "") || "yourstore"}.com`;

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setActive(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const reveal = (index: number) => {
    setActive(index);
    const pin = pins.current[index];
    const box = scroller.current;
    if (pin && box) box.scrollTo({ top: Math.max(0, pin.offsetTop - box.clientHeight / 2), behavior: "smooth" });
  };

  return (
    <div className={cn("mx-auto w-full min-w-0 space-y-3", mobile && "max-w-sm")}>
      <p className="flex items-center gap-2 rounded-xl border border-mix-primary/25 bg-mix-primary/5 px-4 py-3 text-sm font-medium text-heading">
        <MousePointerClick size={17} aria-hidden="true" className="shrink-0 text-primary" />{copy.hint}
      </p>
      <figure aria-label={copy.frameLabel} className="overflow-hidden rounded-2xl border border-border bg-background shadow-xl">
        <div aria-hidden="true" className="flex items-center gap-3 border-b border-border bg-muted px-4 py-2.5">
          <span className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-mix-heading/20" /><span className="h-2.5 w-2.5 rounded-full bg-mix-heading/20" /><span className="h-2.5 w-2.5 rounded-full bg-mix-heading/20" /></span>
          <span className="mx-auto truncate rounded-full bg-background px-4 py-1 text-xs text-paragraph">{domain}</span>
        </div>
        <div ref={scroller} className={cn("relative overflow-y-auto overscroll-contain", expanded ? "max-h-[70vh]" : "max-h-[34rem]")}>
          <div className="relative" onClick={(event) => { if (event.target === event.currentTarget || (event.target as HTMLElement).tagName === "IMG") setActive(null); }}>
            <Image src={showcase.src} alt={showcase.alt} width={showcase.width} height={showcase.height} unoptimized loading="eager" sizes="(max-width: 767px) 100vw, 900px" className="block h-auto w-full select-none" />
            {showcase.hotspots.map((spot, index) => {
              const open = active === index;
              const flip = spot.x > 58;
              return (
                <div key={spot.title} className="absolute" style={{ left: `${spot.x}%`, top: `${spot.y}%`, zIndex: open ? 30 : 20 }}>
                  <button
                    ref={element => { pins.current[index] = element; }}
                    type="button"
                    aria-expanded={open}
                    aria-controls={`${id}-spot-${index}`}
                    aria-label={`${index + 1}. ${spot.title}`}
                    onClick={() => setActive(open ? null : index)}
                    className={cn("group relative -ml-4 -mt-4 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold shadow-lg ring-2 ring-white transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary motion-reduce:transition-none",
                      open ? "bg-heading text-background" : "bg-primary text-primary-foreground")}
                  >
                    {!open && <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-mix-primary/60 motion-reduce:hidden" />}
                    <span className="relative">{index + 1}</span>
                  </button>
                  {open && (
                    <div id={`${id}-spot-${index}`} role="dialog" aria-label={spot.title}
                      className={cn("absolute top-6 w-60 max-w-[70vw] rounded-xl border border-border bg-background p-4 text-left shadow-2xl", flip ? "right-0" : "left-0")}>
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-heading text-base leading-tight text-heading">{spot.title}</p>
                        <button type="button" onClick={() => setActive(null)} aria-label={copy.close} className="-mr-1 -mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-paragraph hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><X size={15} aria-hidden="true" /></button>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-paragraph">{spot.detail}</p>
                      <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-mix-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary"><Check size={12} aria-hidden="true" />{copy.included}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </figure>
      <div>
        <p className="text-sm font-semibold text-heading">{copy.featuresTitle}</p>
        <ol className="mt-2 flex flex-wrap gap-2">
          {showcase.hotspots.map((spot, index) => (
            <li key={spot.title}>
              <button type="button" onClick={() => reveal(index)}
                className={cn("inline-flex min-h-10 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  active === index ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-heading hover:border-primary")}>
                <span className={cn("flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold", active === index ? "bg-background text-primary" : "bg-mix-primary/10 text-primary")}>{index + 1}</span>
                {spot.title}
              </button>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-xs text-paragraph">{copy.note}</p>
      </div>
    </div>
  );
}
