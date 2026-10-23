"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import dynamic from "next/dynamic";
import { studioCopy, studioPlans } from "@/content/landing/shopify-studio-content";
import { studioTemplates } from "@/content/landing/shopify-studio-templates";
import { referencePreviewSettings } from "@/lib/shopify-reference-preview";
import type { ShopifyLiveThumbnailProps } from "@/interfaces/shopify-live-thumbnail-interface";
const loadPreview = () => import("./shopify-studio-preview");
const Preview = dynamic(loadPreview, { ssr: false });

/** A non-interactive miniature of the actual storefront, never a different concept image. */
export default function ShopifyLiveThumbnail({ referenceId }: ShopifyLiveThumbnailProps) {
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(360);
  useEffect(() => {
    if (!root.current) return;
    const resize = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    resize.observe(root.current);
    // Keep only nearby miniature storefronts mounted. Scrolling through a large
    // catalogue must not retain every visited preview, its effects and images.
    // The fixed-height wrapper preserves scroll position while a preview sleeps.
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "200px" });
    observer.observe(root.current);
    // Warm the code before a fast mobile scroll reaches the card, without mounting
    // the full storefront or requesting its photography early.
    const warmup = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { void loadPreview().catch(() => undefined); warmup.disconnect(); }
    }, { rootMargin: "800px" });
    warmup.observe(root.current);
    return () => { resize.disconnect(); observer.disconnect(); warmup.disconnect(); };
  }, []);
  const reference = studioTemplates.find(item => item.id === referenceId);
  if (!reference) return null;
  const { values, plan } = referencePreviewSettings(reference);
  return <div ref={root} data-thumbnail-layout="live-storefront" data-reference-id={referenceId} className="relative h-[28rem] overflow-hidden bg-muted" aria-hidden="true" inert={"" as unknown as boolean}>
    {visible && <div className="studio-live-thumbnail pointer-events-none absolute left-0 top-0 w-[1100px] origin-top-left [transform:scale(var(--thumbnail-scale))]" style={{ "--thumbnail-scale": width / 1100 } as CSSProperties}>
      <Preview copy={studioCopy} plan={plan} packageName={studioPlans[plan].name} scopeMode="reference" compactScope expanded values={values} images={reference.images} logo="" layout={reference.layout} palette={reference.palette} mobile={false} referenceId={reference.id}/>
    </div>}
  </div>;
}
