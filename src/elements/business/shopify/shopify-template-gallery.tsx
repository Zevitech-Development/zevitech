"use client";
import { useId, useState } from "react";
import ShopifyLiveThumbnail from "./shopify-live-thumbnail";
import Image from "next/image";
import { shopifyShowcaseThumbnails } from "@/content/landing/shopify-showcase-thumbnails";
import { ArrowUpRight, Check, Search } from "lucide-react";
import ShopifyStudioSelect from "./shopify-studio-select";
import { galleryEnhancements as copy } from "@/content/landing/shopify-gallery-enhancements";
import { studioTemplates, templateCopy } from "@/content/landing/shopify-studio-templates";
import { ShopifyTemplateGalleryProps } from "@/interfaces/shopify-studio-interface";
import { getShopifyReferenceOrder } from "@/lib/shopify-reference-order";
import { shopifyCategoryLabel } from "@/content/landing/shopify-business-categories";
import { cn } from "@/lib/utils";

export default function ShopifyTemplateGallery({
  selected,
  onSelect,
  packageName = "Beginner",
  browseAll = false,
  initialCategory = copy.defaultIndustry,
  categoryFilter,
}: ShopifyTemplateGalleryProps) {
  const galleryId = useId();
  const categories = Array.from(new Set(studioTemplates.map((reference) => reference.category)));
  const startingCategory = categories.includes(initialCategory) ? initialCategory : copy.defaultIndustry;
  const [industry, setIndustry] = useState({ packageName, category: startingCategory });
  const resetIndustry = categoryFilter === undefined && !browseAll && industry.packageName !== packageName;
  const category = categoryFilter !== undefined
    ? (categories.includes(categoryFilter) ? categoryFilter : startingCategory)
    : resetIndustry ? startingCategory : industry.category;
  // Package-specific galleries reset before showing the new included list.
  // Browsing all designs is independent of package selection.
  if (resetIndustry) {
    setIndustry({ packageName, category: startingCategory });
  }
  const visibleReferences = getShopifyReferenceOrder(category, packageName, browseAll);
  const resultsId = `${galleryId}-results`;
  const statusId = `${galleryId}-status`;
  const illustrationId = `${galleryId}-illustration`;

  return (
    <div className="mb-10 min-w-0 [overflow-wrap:anywhere]">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <h3 className="font-heading text-3xl text-heading">{copy.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-paragraph">{browseAll ? copy.browseIntro : copy.intro}</p>
          <p id={statusId} role="status" aria-atomic="true" className="mt-3 text-sm font-semibold text-primary">
            {browseAll ? copy.browseCount(shopifyCategoryLabel(category), visibleReferences.length) : copy.includedCount(packageName, visibleReferences.length)}
          </p>
        </div>
        {categoryFilter === undefined && <label className="block w-full text-sm font-medium text-heading md:max-w-xs" htmlFor={`${galleryId}-industry`}>
          <span className="mb-2 block">{copy.industryLabel}</span>
          <ShopifyStudioSelect
            id={`${galleryId}-industry`}
            value={category}
            onChange={(event) => setIndustry({ packageName, category: event.target.value })}
            aria-controls={resultsId}
          >
            {categories.map((option) => <option key={option} value={option}>{shopifyCategoryLabel(option)}</option>)}
          </ShopifyStudioSelect>
        </label>}
      </div>
      <div id={illustrationId} className="mb-5 space-y-1 text-xs leading-relaxed text-paragraph">
        <p>{copy.illustrativeNote}</p>
        <p>{copy.pricingNote}</p>
      </div>
      {visibleReferences.length === 0 && (
        <p className="rounded-xl border border-border bg-muted p-5 text-sm text-paragraph">{copy.empty}</p>
      )}
      <div id={resultsId} className="studio-reference-grid grid items-stretch gap-5">
        {visibleReferences.map(({ reference: t, index: i }) => {
          return (
            <article
              key={t.id}
              aria-labelledby={`${galleryId}-${t.id}-title`}
              className={cn(
                "studio-reference-card group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border-2 bg-background text-left animation-standard hover:border-primary hover:shadow-xl focus-within:border-primary",
                selected === i ? "border-primary shadow-md" : "border-border",
              )}
            >
              <div
                aria-hidden="true"
                className="p-3 md:p-4 bg-muted shrink-0 [perspective:1200px]"
              >
                <div className="studio-reference-art rounded-lg overflow-hidden border border-border bg-background shadow-sm">
                  <div className="flex justify-between gap-2 p-3 text-[10px] border-b border-border tracking-widest font-bold">
                    <span className="min-w-0">{t.name.toUpperCase()}</span>
                    <span className="shrink-0">•••</span>
                  </div>
                  {t.conceptImage || shopifyShowcaseThumbnails[t.id] ? <div data-thumbnail-layout="approved-reference" className="relative h-[28rem] overflow-hidden bg-muted">
                    <Image src={t.conceptImage?.src || shopifyShowcaseThumbnails[t.id]} alt="" fill sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 30vw" quality={85} loading="lazy" className="object-cover object-top" />
                  </div> : <ShopifyLiveThumbnail referenceId={t.id} />}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="mb-2 text-xs font-semibold text-primary">{t.tag}</p>
                    <h4 id={`${galleryId}-${t.id}-title`} className="font-heading text-2xl leading-tight text-heading">{t.name}</h4>
                  </div>
                  {selected === i && (
                    <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-primary">
                      <Check size={14} aria-hidden="true" />{copy.selected}
                    </span>
                  )}
                </div>
                <p className="mb-5 mt-3 text-sm leading-relaxed text-paragraph">{t.description}</p>
                <p className="mb-4 text-sm font-medium text-primary">{copy.allPackages}</p>
                <button
                  type="button"
                  aria-label={copy.previewLabel(t.name)}
                  aria-describedby={`${statusId} ${illustrationId}`}
                  onClick={() => onSelect(i)}
                  className="mt-auto inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground animation-standard hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {copy.preview}<ArrowUpRight size={17} aria-hidden="true" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
