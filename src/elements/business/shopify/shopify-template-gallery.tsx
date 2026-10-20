"use client";
import { useId, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Check, ChevronDown, Plus, Search, SlidersHorizontal } from "lucide-react";
import ShopifyDeliveryEstimate from "./shopify-delivery-estimate";
import ShopifyStudioSelect from "./shopify-studio-select";
import ShopifySignatureThumbnail from "./shopify-signature-thumbnail";
import { galleryEnhancements as copy } from "@/content/landing/shopify-gallery-enhancements";
import { packageStorefrontCopy as storefrontCopy } from "@/content/landing/shopify-package-preview-content";
import { shopifyPremiumPreviewCopy as premiumCopy } from "@/content/landing/shopify-premium-preview-content";
import { studioTemplates, templateCopy, studioPalettes, serviceGalleryCopy } from "@/content/landing/shopify-studio-templates";
import { ShopifyTemplateGalleryProps } from "@/interfaces/shopify-studio-interface";
import { getShopifyReferenceOrder } from "@/lib/shopify-reference-order";
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
            {browseAll ? copy.browseCount(category, visibleReferences.length) : copy.includedCount(packageName, visibleReferences.length)}
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
            {categories.map((option) => <option key={option} value={option}>{option}</option>)}
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
        {visibleReferences.map(({ reference: t, index: i, minimumPackage }) => {
          const thumbnail = t.businessType === "services"
            ? { ...copy.thumbnail, ...serviceGalleryCopy }
            : copy.thumbnail;
          const premiumThumbnail = t.businessType === "services"
            ? { ...premiumCopy.thumbnail, ...serviceGalleryCopy.premiumThumbnail }
            : premiumCopy.thumbnail;
          const collectionNames = t.businessType === "services"
            ? serviceGalleryCopy.collectionNames
            : templateCopy.collectionNames;
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
                  {t.signatureTheme && t.signatureTheme !== "clotya" && t.signatureTheme !== "ecolife" ? (
                    <ShopifySignatureThumbnail theme={t.signatureTheme} headline={t.headline} images={t.images} name={t.name} />
                  ) : t.conceptImage ? (
                    <div data-thumbnail-layout="premium-concept" className="relative h-[28rem] overflow-hidden bg-muted">
                      <Image
                        src={t.conceptImage.src}
                        alt=""
                        fill
                        sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 30vw"
                        unoptimized
                        className="object-cover object-top"
                      />
                    </div>
                  ) : t.layout === 0 ? (
                    <div data-thumbnail-layout="essential" className="flex h-[28rem] flex-col bg-background text-heading">
                      <div data-preview-section="hero" className="grid h-40 shrink-0 grid-cols-2 bg-secondary-background">
                        <div className="flex min-w-0 flex-col items-start justify-center p-4">
                          <span className="mb-2 text-[8px] uppercase tracking-widest text-paragraph">{t.category}</span>
                          <strong className="studio-reference-headline font-heading leading-tight">{t.headline}</strong>
                          <span className="mt-4 rounded-sm bg-heading px-2 py-1.5 text-[8px] font-semibold text-background">{thumbnail.shop}</span>
                        </div>
                        <Image src={t.images[0]} alt="" width={240} height={240} className="h-40 w-full object-cover" />
                      </div>
                      <div data-preview-section="products" className="p-4">
                        <p className="mb-3 font-heading text-sm">{thumbnail.featured}</p>
                        <div className="grid grid-cols-3 gap-2">
                          {t.images.map((src, index) => (
                            <div key={src} className="min-w-0">
                              <Image src={src} alt="" width={120} height={150} className="h-24 w-full object-cover" />
                              <p className="mt-1 text-[8px] leading-snug">{collectionNames[index]}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <p data-preview-section="brand-note" className="mx-4 border-y border-border py-3 text-center text-[9px] leading-relaxed text-paragraph">{thumbnail.brandNote}</p>
                      <div className="mt-auto flex flex-wrap justify-center gap-x-3 gap-y-1 px-3 py-3 text-[8px] text-paragraph">{thumbnail.footer.map(label => <span key={label}>{label}</span>)}</div>
                    </div>
                  ) : t.layout === 2 ? (
                    <div data-thumbnail-layout="branded" className="flex h-[28rem] flex-col bg-background text-heading">
                      <div data-preview-section="hero" className="grid h-28 shrink-0 grid-cols-2 bg-secondary text-secondary-foreground">
                        <div className="flex min-w-0 flex-col items-start justify-center p-3">
                          <span className="mb-1 text-[8px] uppercase tracking-widest opacity-80">{t.category}</span>
                          <strong className="studio-reference-headline font-heading leading-tight">{t.headline}</strong>
                          <span className="mt-3 flex items-center gap-1 text-[8px] font-semibold">{thumbnail.shop}<ArrowUpRight size={10} /></span>
                        </div>
                        <Image src={t.images[0]} alt="" width={240} height={200} className="h-28 w-full object-cover" />
                      </div>
                      <div data-preview-section="collection-edit" className="p-3">
                        <div className="mb-2 flex items-center justify-between gap-2"><p className="font-heading text-sm">{thumbnail.collections}</p><ArrowUpRight size={11} className="shrink-0" /></div>
                        <div className="grid grid-cols-3 gap-2">
                          {t.images.map((src, index) => (
                            <div key={src} className="min-w-0">
                              <div className="relative"><Image src={src} alt="" width={120} height={120} className="h-20 w-full rounded-sm object-cover" /><span className="absolute bottom-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-background text-heading shadow-sm"><Plus size={9} /></span></div>
                              <div className="mt-1 flex items-start justify-between gap-1"><span className="text-[8px] leading-snug">{collectionNames[index]}</span><ArrowUpRight size={9} className="shrink-0" /></div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div data-preview-section="brand-story" className="mx-3 flex h-24 shrink-0 flex-col justify-center overflow-hidden bg-secondary-background px-4 py-3">
                        <span className="mb-1 text-[7px] tracking-widest text-paragraph">{storefrontCopy.storyEyebrow}</span>
                        <strong className="font-heading text-base leading-tight">{storefrontCopy.storyTitle}</strong>
                        <p className="mt-2 line-clamp-2 text-[8px] leading-relaxed text-paragraph">{t.brief}</p>
                      </div>
                      <div data-preview-section="newsletter" className="mx-3 mt-3 rounded-sm bg-primary/5 p-3">
                        <p className="font-heading text-xs">{thumbnail.newsletter}</p>
                        <div className="mt-2 flex items-center justify-between gap-2 border-b border-heading pb-1 text-[8px]"><span className="text-paragraph">{thumbnail.email}</span><span className="inline-flex items-center gap-1 font-semibold">{thumbnail.join}<ArrowUpRight size={9} /></span></div>
                      </div>
                      <div className="mt-auto flex flex-wrap justify-center gap-x-3 gap-y-1 px-3 py-2 text-[8px] text-paragraph">{thumbnail.footer.map(label => <span key={label}>{label}</span>)}</div>
                    </div>
                  ) : t.layout === 3 ? (
                    <div data-thumbnail-layout="discovery" className="flex h-[28rem] flex-col bg-background text-heading">
                      <div data-preview-section="hero" className="grid h-24 shrink-0 grid-cols-2 bg-secondary-background">
                        <Image src={t.images[0]} alt="" width={240} height={180} className="h-24 w-full object-cover" />
                        <div className="flex min-w-0 flex-col justify-center p-3">
                          <span className="mb-1 text-[8px] uppercase tracking-widest text-paragraph">{t.category}</span>
                          <strong className="studio-reference-headline font-heading leading-tight">{t.headline}</strong>
                        </div>
                      </div>
                      <div data-preview-section="discovery-controls" className="p-3">
                        <div className="mb-2 flex items-center justify-between gap-2"><p className="font-heading text-sm">{thumbnail.discover}</p><span className="inline-flex items-center gap-1 text-[8px] text-paragraph">{thumbnail.sort}<ChevronDown size={9} /></span></div>
                        <div className="flex items-center justify-between gap-1">
                          <div className="flex min-w-0 gap-1">{thumbnail.filters.map((label, index) => <span key={label} className={cn("rounded-full px-2 py-1 text-[7px] leading-none", index === 0 ? "bg-heading text-background" : "bg-muted text-paragraph")}>{label}</span>)}</div>
                          <span className="inline-flex shrink-0 items-center gap-1 text-[7px]"><SlidersHorizontal size={9} />{thumbnail.filter}</span>
                        </div>
                      </div>
                      <div data-preview-section="merchandising-grid" className="grid grid-cols-3 gap-2 px-3 pb-3">
                        {t.images.map((src, index) => (
                          <div key={src} className="min-w-0">
                            <div className="relative"><Image src={src} alt="" width={120} height={120} className="h-[4.5rem] w-full rounded-sm object-cover" /><span className="absolute bottom-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-background text-heading shadow-sm"><Plus size={9} /></span></div>
                            <p className="mt-1 text-[8px] leading-snug">{collectionNames[index]}</p>
                          </div>
                        ))}
                      </div>
                      <div data-preview-section="product-spotlight" className="mx-3 grid h-16 shrink-0 grid-cols-3 overflow-hidden rounded-sm bg-secondary text-secondary-foreground">
                        <div className="col-span-2 flex min-w-0 flex-col justify-center p-3"><span className="text-[7px] uppercase tracking-widest opacity-80">{thumbnail.spotlight}</span><strong className="mt-1 font-heading text-sm leading-tight">{t.product}</strong></div>
                        <Image src={t.images[1]} alt="" width={120} height={100} className="h-16 w-full object-cover" />
                      </div>
                      <div data-preview-section="recommendations" className="p-3">
                        <div className="mb-2 flex items-center justify-between gap-2"><p className="font-heading text-xs">{thumbnail.recommendations}</p><ArrowUpRight size={10} /></div>
                        <div className="grid grid-cols-2 gap-2">
                          {[1, 2].map(index => <div key={index} className="flex min-w-0 items-center gap-2 rounded-sm bg-muted p-1"><Image src={t.images[index]} alt="" width={64} height={64} className="h-9 w-9 shrink-0 rounded-sm object-cover" /><span className="min-w-0 text-[8px] leading-snug">{collectionNames[index]}</span><Plus size={10} className="ml-auto shrink-0" /></div>)}
                        </div>
                      </div>
                      <div className="mt-auto flex flex-wrap justify-center gap-x-3 gap-y-1 border-t border-border px-3 py-2 text-[8px] text-paragraph">{thumbnail.footer.map(label => <span key={label}>{label}</span>)}</div>
                    </div>
                  ) : t.layout === 4 ? (
                    <div data-thumbnail-layout="campaign" className="flex h-[28rem] flex-col bg-background text-heading">
                      <div data-preview-section="campaign-hero" className="grid h-24 shrink-0 grid-cols-3 bg-heading text-background">
                        <div className="col-span-2 flex min-w-0 flex-col items-start justify-center p-3">
                          <span className="mb-1 text-[7px] tracking-widest opacity-80">{thumbnail.campaign}</span>
                          <strong className="studio-reference-headline font-heading leading-tight">{t.headline}</strong>
                          <span className="mt-2 flex items-center gap-1 text-[8px] font-semibold">{thumbnail.shop}<ArrowUpRight size={10} /></span>
                        </div>
                        <Image src={t.images[0]} alt="" width={180} height={180} className="h-24 w-full object-cover" />
                      </div>
                      <div data-preview-section="campaign-products" className="p-3">
                        <div className="mb-2 flex items-center justify-between gap-2"><p className="font-heading text-sm">{thumbnail.campaignCollection}</p><span className="inline-flex items-center gap-1 text-[8px] text-paragraph"><SlidersHorizontal size={9} />{thumbnail.filter}</span></div>
                        <div className="grid grid-cols-3 gap-2">
                          {t.images.map((src, index) => (
                            <div key={src} className="min-w-0">
                              <div className="relative"><Image src={src} alt="" width={120} height={100} className="h-16 w-full rounded-sm object-cover" /><span className="absolute bottom-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-background text-heading shadow-sm"><Plus size={9} /></span></div>
                              <p className="mt-1 text-[8px] leading-snug">{collectionNames[index]}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div data-preview-section="fixed-bundle" className="mx-3 flex h-14 shrink-0 items-center justify-between gap-3 rounded-sm bg-secondary-background px-3">
                        <div className="min-w-0"><strong className="font-heading text-sm leading-tight">{thumbnail.bundleTitle}</strong><span className="mt-1 flex items-center gap-1 text-[8px]">{thumbnail.bundleAction}<ArrowUpRight size={9} /></span></div>
                        <div className="flex shrink-0 items-center gap-1"><Image src={t.images[1]} alt="" width={60} height={72} className="h-10 w-8 rounded-sm object-cover" /><Plus size={9} className="text-paragraph" /><Image src={t.images[2]} alt="" width={60} height={72} className="h-10 w-8 rounded-sm object-cover" /></div>
                      </div>
                      <div data-preview-section="journal" className="mx-3 mt-3 flex h-12 shrink-0 items-center gap-3 border-y border-border">
                        <Image src={t.images[2]} alt="" width={72} height={72} className="h-12 w-12 shrink-0 object-cover" />
                        <div className="min-w-0"><span className="block text-[7px] tracking-widest text-paragraph">{thumbnail.journal}</span><strong className="mt-1 block font-heading text-xs leading-tight">{thumbnail.journalTitle}</strong></div>
                        <ArrowUpRight size={11} className="ml-auto shrink-0" />
                      </div>
                      <div data-preview-section="newsletter" className="mx-3 mt-3 rounded-sm bg-heading p-2.5 text-background">
                        <p className="font-heading text-xs">{thumbnail.newsletter}</p>
                        <div className="mt-1 flex items-center justify-between gap-2 border-b border-background/40 pb-1 text-[8px]"><span className="opacity-80">{thumbnail.email}</span><span className="inline-flex items-center gap-1 font-semibold">{thumbnail.join}<ArrowUpRight size={9} /></span></div>
                      </div>
                      <div className="mt-auto flex flex-wrap justify-center gap-x-3 gap-y-1 px-3 py-2 text-[8px] text-paragraph">{thumbnail.footer.map(label => <span key={label}>{label}</span>)}</div>
                    </div>
                  ) : t.layout === 6 ? (
                    <div className="studio-premium-thumbnail studio-premium-thumbnail-depth studio-thumbnail-rich">
                      <div className="studio-thumb-depth-orbit" />
                      <div className="studio-thumb-depth-copy"><small>{premiumThumbnail.dimensional}</small><strong className="font-heading">{t.headline}</strong></div>
                      <div className="studio-thumb-depth-images">{[1, 0, 2].map((imageIndex) => <div key={imageIndex}><Image src={t.images[imageIndex]} alt="" width={240} height={280} /></div>)}</div>
                      <div className="studio-thumb-depth-caption"><span>{t.product}</span><ArrowUpRight size={14} /></div>
                    </div>
                  ) : t.layout === 7 ? (
                    <div className="studio-premium-thumbnail studio-premium-thumbnail-editorial studio-thumbnail-rich">
                      <div className="studio-thumb-editorial-copy"><small>{premiumThumbnail.editorial}</small><strong className="font-heading">{t.headline}</strong></div>
                      <div className="studio-thumb-editorial-image"><Image src={t.images[0]} alt="" width={240} height={280} /></div>
                      <div className="studio-thumb-editorial-inset"><Image src={t.images[1]} alt="" width={160} height={200} /></div>
                      <div className="studio-thumb-editorial-side"><span>{t.category}</span><span>{premiumThumbnail.story}</span></div>
                    </div>
                  ) : t.layout === 8 ? (
                    <div className="studio-premium-thumbnail studio-premium-thumbnail-cinematic studio-thumbnail-rich">
                      <div className="studio-thumb-cinematic-cover"><Image src={t.images[0]} alt="" width={480} height={480} /></div>
                      <div className="studio-thumb-cinematic-shade" />
                      <div className="studio-thumb-cinematic-label">{premiumThumbnail.cinematic}<span>01</span></div>
                      <div className="studio-thumb-cinematic-hotspot studio-thumb-cinematic-hotspot-first"><span /><small>{premiumThumbnail.frames[1]}</small></div>
                      <div className="studio-thumb-cinematic-hotspot studio-thumb-cinematic-hotspot-second"><span /><small>{premiumThumbnail.frames[2]}</small></div>
                      <div className="studio-thumb-cinematic-copy"><strong className="font-heading">{t.headline}</strong><span>{premiumThumbnail.explore}<ArrowUpRight size={12} /></span></div>
                      <div className="studio-thumb-cinematic-inset"><Image src={t.images[1]} alt="" width={120} height={150} /></div>
                    </div>
                  ) : t.layout === 9 ? (
                    <div className="studio-premium-thumbnail studio-premium-thumbnail-commerce studio-thumbnail-rich">
                      <div className="studio-thumb-commerce-toolbar"><span>{premiumThumbnail.filterTitle}</span><Search size={12} /></div>
                      <div className="studio-thumb-commerce-workspace">
                        <div className="studio-thumb-commerce-sidebar"><small>{t.category}</small>{premiumThumbnail.filterChoices.map((label, index) => <div key={label} data-selected={index === 0}><span className="studio-thumb-check">{index === 0 && <Check size={8} />}</span><span>{label}</span></div>)}<i /><i /><i /></div>
                        <div className="studio-thumb-commerce-main"><div className="studio-thumb-commerce-photo"><Image src={t.images[0]} alt="" width={240} height={280} /><span>{t.product}</span></div><p>{premiumThumbnail.chooseView}</p><div className="studio-thumb-commerce-options">{t.images.map((src, index) => <div key={src} data-selected={index === 0}><Image src={src} alt="" width={70} height={65} />{index === 0 && <span><Check size={9} /></span>}</div>)}</div></div>
                      </div>
                      <div className="studio-thumb-commerce-selection"><Image src={t.images[1]} alt="" width={45} height={45} /><span><small>{premiumThumbnail.selectedView}</small><strong>{t.category}</strong></span><span className="studio-thumb-commerce-cta">{premiumThumbnail.explore}<ArrowUpRight size={11} /></span></div>
                    </div>
                  ) : <div
                    className={cn(
                      "studio-reference-hero grid grid-cols-2 h-44 overflow-hidden",
                      t.layout === 2
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-secondary-background",
                    )}
                  >
                    <div
                      className={cn(
                        "min-w-0 flex flex-col justify-center p-3",
                        t.layout === 3 && "order-2",
                      )}
                    >
                      <span className="text-[9px] uppercase opacity-70 mb-2 break-words">
                        {t.category}
                      </span>
                      <strong className="studio-reference-headline font-heading leading-tight break-words">
                        {t.headline}
                      </strong>
                      <span
                        className={cn(
                          "block mt-3 h-2 w-10 rounded shrink-0",
                          studioPalettes[t.palette],
                        )}
                      />
                    </div>
                    <div
                      className={cn(
                        "min-w-0 h-44 overflow-hidden",
                        t.layout === 3 && "order-1",
                      )}
                    >
                      <Image
                        src={t.image}
                        alt=""
                        width={240}
                        height={240}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>}
                  {t.conceptImage || t.signatureTheme ? null : t.layout >= 6 ? <div className={cn("studio-thumb-continuation", t.layout === 8 && "studio-thumb-continuation-film")}>
                    <div className="studio-thumb-continuation-heading"><span>{t.layout === 8 ? premiumThumbnail.interactiveDetails : t.layout === 9 ? (t.businessType === "services" ? serviceGalleryCopy.serviceEyebrow : premiumCopy.commerce.collectionEyebrow) : premiumThumbnail.story}</span><ArrowUpRight size={12} /></div>
                    <div className="studio-thumb-storyboard">{t.images.map((src, index) => <div key={src}><Image src={src} alt="" width={100} height={80} /><span>{premiumThumbnail.frames[index]}</span></div>)}</div>
                  </div> : ![0, 2, 3, 4].includes(t.layout) ? <div className="p-3 border-t border-border">
                    <p className="text-[10px] font-semibold mb-2">
                      {templateCopy.collections}
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {[0, 1, 2].map((n) => (
                        <div key={n}>
                          <Image
                            src={t.images[n]}
                            alt=""
                            width={100}
                            height={80}
                            className="w-full h-16 rounded object-cover"
                          />
                          <div className="h-1 w-2/3 bg-border mt-2" />
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-3 p-2 bg-muted">
                      <Image
                        src={t.images[2]}
                        alt=""
                        width={60}
                        height={40}
                        className="h-10 w-16 object-cover"
                      />
                      <div className="text-[10px] self-center font-semibold">
                        {templateCopy.storyTitle}
                      </div>
                    </div>
                  </div> : null}
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
                {minimumPackage && (
                  <div className="mb-4 flex flex-wrap items-end justify-between gap-3 rounded-xl bg-muted p-3">
                    <div>
                      <p className="text-xs text-paragraph">{copy.minimumPackage}</p>
                      <p className="mt-1 text-sm font-semibold text-heading">{minimumPackage.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-heading">{copy.startingPrice(minimumPackage.price)}</p>
                      <p className="mt-1 text-xs text-paragraph">{copy.oneTimePrice}</p>
                    </div>
                    <ShopifyDeliveryEstimate packageName={minimumPackage.name} className="basis-full text-xs" />
                  </div>
                )}
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
