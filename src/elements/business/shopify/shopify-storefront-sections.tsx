"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react";
import ShopifyStudioSelect from "./shopify-studio-select";
import { packageStorefrontCopy as copy } from "@/content/landing/shopify-package-preview-content";
import type { ShopifyStorefrontProduct, ShopifyStorefrontSectionsProps } from "@/interfaces/shopify-storefront-sections-interface";
import { cn } from "@/lib/utils";

const sectionClass = "px-[clamp(1.25rem,5cqw,3.5rem)] py-[clamp(2.5rem,7cqw,5rem)]";
const titleClass = "font-heading text-[clamp(1.9rem,4.6cqw,3.5rem)] leading-[1.08] [text-wrap:balance]";
const eyebrowClass = "mb-3 text-xs font-semibold tracking-[0.16em]";
const focusClass = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const linkClass = "inline-flex min-h-11 items-center gap-2 rounded text-sm font-semibold underline underline-offset-4";

export default function ShopifyStorefrontSections({
  mode, brand, brief, products, mobile, onCollection, onProduct, onAddProduct,
}: ShopifyStorefrontSectionsProps) {
  const id = useId();
  const [collection, setCollection] = useState("all");
  const [sort, setSort] = useState("featured");
  const [added, setAdded] = useState<number | null>(null);
  const [featuredId, setFeaturedId] = useState<number | null>(null);
  const essential = mode === "essential";
  const discovery = mode === "discovery";
  const collections = Array.from(new Set(products.map(product => product.collection)));
  const activeCollection = collections.includes(collection) ? collection : "all";
  const visible = products
    .filter(product => !discovery || activeCollection === "all" || product.collection === activeCollection)
    .sort((left, right) => sort === "name-asc"
      ? left.name.localeCompare(right.name)
      : sort === "name-desc" ? right.name.localeCompare(left.name) : left.id - right.id);
  const uniqueImages = products.filter((product, index) => products.findIndex(item => item.src === product.src) === index);
  const collectionEdits = collections.map(name => ({
    name,
    product: products.find(product => product.collection === name)!,
    count: products.filter(product => product.collection === name).length,
  }));
  const spotlight = products.find(product => product.id === featuredId) || uniqueImages[1] || products[0];
  const related = products.filter(product => product.id !== spotlight?.id);
  const storyImage = uniqueImages[uniqueImages.length - 1];
  const detailImage = uniqueImages.length > 1 ? uniqueImages[1] : undefined;
  const twoColumns = !mobile && "studio-two-column";

  function addProduct(product: ShopifyStorefrontProduct) {
    onAddProduct?.(product.id);
    setAdded(product.id);
  }

  function productCard(product: ShopifyStorefrontProduct) {
    return <article key={product.id} data-product-id={product.id} className="group min-w-0">
      <button type="button" onClick={() => onProduct(product.id)} aria-label={`${copy.viewProduct}: ${product.name}`} className={cn("relative block w-full overflow-hidden rounded-sm bg-muted", essential ? "aspect-[4/5]" : discovery ? "aspect-square" : "aspect-[4/5]", focusClass)}>
        <Image src={product.src} alt={product.name} width={640} height={768} unoptimized className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.03]" />
        {!essential && <span aria-hidden="true" className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-background text-heading"><ArrowUpRight size={18} /></span>}
      </button>
      <div className="pt-3">
        {!essential && <button type="button" onClick={() => onCollection(product.collection)} className={cn("min-h-11 rounded text-left text-xs text-paragraph underline underline-offset-4", focusClass)}>{product.collection}</button>}
        <button type="button" onClick={() => onProduct(product.id)} className={cn("block min-h-11 w-full rounded text-left text-base font-semibold text-heading", focusClass)}>{product.name}</button>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-paragraph">{product.priceLabel}</p>
          {!essential && onAddProduct && <button type="button" aria-label={`${copy.quickAdd}: ${product.name}`} onClick={() => addProduct(product)} className={cn("inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border px-3 text-xs font-semibold text-heading animation-standard hover:border-primary", focusClass)}>
            {added === product.id ? <Check size={15} aria-hidden="true" /> : <Plus size={15} aria-hidden="true" />}{added === product.id ? copy.addedShort : copy.addToBag}
          </button>}
        </div>
      </div>
    </article>;
  }

  const productGrid = <div id={`${id}-products`} data-product-grid={mode} className={cn("grid gap-x-5 gap-y-8", essential ? "grid-cols-[repeat(auto-fit,minmax(min(100%,10.5rem),1fr))]" : "grid-cols-[repeat(auto-fit,minmax(min(100%,12rem),1fr))]")}>
    {visible.map(productCard)}
  </div>;

  if (essential) return <>
    <section data-storefront-section="essential-collection" className={cn(sectionClass, "border-t border-border")}>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div><p className={cn(eyebrowClass, "text-primary")}>{copy.essentialEyebrow}</p><h4 className={titleClass}>{copy.essentialTitle}</h4></div>
        <button type="button" onClick={() => onCollection()} className={cn(linkClass, focusClass)}>{copy.browseCollection}<ArrowUpRight size={16} aria-hidden="true" /></button>
      </div>
      {productGrid}
      <p className="mt-6 text-[10px] tracking-widest text-paragraph">{copy.sample}</p>
    </section>
    <section data-storefront-section="essential-story" className={cn(sectionClass, "border-t border-border bg-secondary-background")}>
      <h4 className="font-heading text-2xl">{copy.essentialStory.replace("{brand}", brand)}</h4>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-paragraph">{brief || copy.essentialStoryBody}</p>
    </section>
  </>;

  return <>
    {discovery ? (
      <section data-storefront-section="discovery-categories" className={cn(sectionClass, "border-t border-border bg-secondary-background")}>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl"><p className={cn(eyebrowClass, "text-primary")}>{copy.discoveryCategoriesEyebrow}</p><h4 className={titleClass}>{copy.discoveryCategoriesTitle}</h4></div>
          <p className="max-w-sm text-sm leading-relaxed text-paragraph">{copy.discoveryIntro}</p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,10rem),1fr))] gap-5">
          {collectionEdits.map(edit => <button key={edit.name} type="button" onClick={() => onCollection(edit.name)} aria-label={`${copy.collectionAction}: ${edit.name}`} className={cn("group min-w-0 text-left", focusClass)}>
            <div className="aspect-[5/4] overflow-hidden rounded-t-full bg-muted"><Image src={edit.product.src} alt="" width={480} height={400} unoptimized className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.03]" /></div>
            <span className="mt-4 flex min-h-11 items-center justify-between gap-2 border-b border-border pb-3 text-sm font-semibold"><span>{edit.name}</span><ArrowUpRight size={17} aria-hidden="true" className="shrink-0" /></span>
          </button>)}
        </div>
      </section>
    ) : (
      <section data-storefront-section="brand-collection" className={cn(sectionClass, "border-t border-border")}>
        <div className="mx-auto mb-9 max-w-2xl text-center"><p className={cn(eyebrowClass, "text-primary")}>{copy.brandEyebrow}</p><h4 className={titleClass}>{copy.brandTitle}</h4><p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-paragraph">{copy.brandIntro}</p></div>
        <div className={cn("grid items-start gap-5", twoColumns)}>
          {collectionEdits.map((edit, index) => <button key={edit.name} type="button" onClick={() => onCollection(edit.name)} aria-label={`${copy.collectionAction}: ${edit.name}`} className={cn("group min-w-0 text-left", !mobile && collectionEdits.length > 2 && index === 0 && "[@container_studio_(min-width:640px)]:row-span-2", focusClass)}>
            <div className={cn("relative overflow-hidden bg-muted", index === 0 ? "aspect-[4/5]" : "aspect-[16/9]")}>
              <Image src={edit.product.src} alt="" width={720} height={900} unoptimized className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.03]" />
              <span aria-hidden="true" className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-background text-heading"><ArrowUpRight size={19} /></span>
            </div>
            <span className="mt-4 flex flex-wrap items-baseline justify-between gap-2"><strong className="font-heading text-[clamp(1.3rem,3cqw,2rem)] leading-tight">{edit.name}</strong><span className="text-xs text-paragraph">{edit.count === 1 ? copy.collectionCountSingle : copy.collectionCount.replace("{count}", String(edit.count))}</span></span>
          </button>)}
        </div>
      </section>
    )}

    <section data-storefront-section={discovery ? "discovery-collection" : "brand-products"} className={cn(sectionClass, "border-t border-border", !discovery && "bg-secondary-background")}>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl"><p className={cn(eyebrowClass, "text-primary")}>{discovery ? copy.discoveryEyebrow : copy.brandProductsEyebrow}</p><h4 className={titleClass}>{discovery ? copy.discoveryTitle : copy.brandProductsTitle}</h4></div>
        <p className="max-w-sm text-sm leading-relaxed text-paragraph">{discovery ? copy.discoveryProductsBody : copy.brandProductsBody}</p>
      </div>
      {discovery && <div className="mb-7 space-y-4 border-y border-border py-5">
        <div role="group" aria-label={copy.collectionsLabel} className="flex flex-wrap gap-2">
          {["all", ...collections].map(value => <button key={value} type="button" aria-pressed={activeCollection === value} aria-controls={`${id}-products`} onClick={() => setCollection(value)} className={cn("min-h-11 rounded-full border px-4 py-2 text-sm animation-standard", activeCollection === value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-heading hover:border-primary", focusClass)}>{value === "all" ? copy.allCollections : value}</button>)}
        </div>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <p role="status" aria-live="polite" className="pb-3 text-xs text-paragraph">{visible.length === 1 ? copy.resultsSingle : copy.results.replace("{count}", String(visible.length))}</p>
          <label className="block w-full min-w-0 max-w-60 text-xs font-semibold text-heading"><span className="mb-2 block">{copy.sortLabel}</span><ShopifyStudioSelect value={sort} onChange={event => setSort(event.target.value)}>{copy.sorts.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</ShopifyStudioSelect></label>
        </div>
      </div>}
      {productGrid}
      <div className="mt-6 flex flex-wrap justify-between gap-2 text-xs text-paragraph"><p className="text-[10px] tracking-widest">{copy.sample}</p>{added !== null && <p role="status">{copy.added}</p>}</div>
    </section>

    {!discovery ? <>
      <section data-storefront-section="brand-story" className={cn("grid bg-background", twoColumns)}>
        {storyImage && <div className="relative min-h-80 overflow-hidden bg-muted"><Image src={storyImage.src} alt="" width={960} height={1200} unoptimized className="h-full min-h-80 w-full object-cover" /></div>}
        <div className={cn(sectionClass, "flex flex-col items-start justify-center")}>
          <p className={cn(eyebrowClass, "text-primary")}>{copy.storyEyebrow}</p><p className="mb-5 text-sm text-paragraph">{brand}</p>
          <h4 className={titleClass}>{copy.storyTitle}</h4><p className="mt-6 text-base leading-relaxed text-paragraph">{brief || copy.storyBody}</p>
          <p className="mt-4 text-sm leading-relaxed text-paragraph">{copy.storyDetailBody}</p>
          <button type="button" onClick={() => onCollection()} className={cn("mt-7", linkClass, focusClass)}>{copy.storyAction}<ArrowRight size={17} aria-hidden="true" /></button>
        </div>
      </section>
      <section data-storefront-section="brand-details" className={cn(sectionClass, "bg-secondary text-secondary-foreground")}>
        <div className="mb-9 max-w-xl"><p className={cn(eyebrowClass, "opacity-75")}>{copy.brandDetailsEyebrow}</p><h4 className={titleClass}>{copy.brandDetailsTitle}</h4></div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,12rem),1fr))] gap-7">
          {copy.brandDetails.map((detail, index) => {
            const product = products[index % products.length];
            return <div key={detail.title} className="border-t border-current/30 pt-5"><p className="mb-5 text-xs opacity-60">{String(index + 1).padStart(2, "0")}</p><h5 className="font-heading text-2xl leading-tight">{detail.title}</h5><p className="mt-4 text-sm leading-relaxed opacity-80">{detail.body}</p>{product && <button type="button" onClick={() => onProduct(product.id)} aria-label={`${detail.action}: ${product.name}`} className={cn("mt-5", linkClass, focusClass)}>{detail.action}<ArrowUpRight size={16} aria-hidden="true" /></button>}</div>;
          })}
        </div>
      </section>
      <section data-storefront-section="brand-perspective" className={cn(sectionClass, "grid items-center gap-8 bg-secondary-background", twoColumns)}>
        <div className="min-w-0"><p className={cn(eyebrowClass, "text-primary")}>{copy.brandClosingEyebrow}</p><h4 className={titleClass}>{copy.brandClosingTitle}</h4><p className="mt-5 max-w-md text-base leading-relaxed text-paragraph">{copy.brandClosingBody}</p><button type="button" onClick={() => onCollection()} className={cn("mt-6", linkClass, focusClass)}>{copy.brandClosingAction}<ArrowRight size={17} aria-hidden="true" /></button></div>
        {detailImage && <button type="button" onClick={() => onProduct(detailImage.id)} aria-label={`${copy.viewProduct}: ${detailImage.name}`} className={cn("group relative min-w-0 overflow-hidden rounded-t-full bg-muted", focusClass)}><Image src={detailImage.src} alt={detailImage.name} width={720} height={900} unoptimized className="aspect-[4/5] w-full object-cover" /><span className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3 rounded bg-background px-4 py-3 text-sm font-semibold text-heading">{detailImage.name}<ArrowUpRight size={17} aria-hidden="true" /></span></button>}
      </section>
    </> : <>
      {spotlight && <section data-storefront-section="discovery-spotlight" className="bg-secondary text-secondary-foreground">
        <div className={cn("grid", twoColumns)}>
          <div className="min-w-0 bg-muted"><button type="button" onClick={() => onProduct(spotlight.id)} aria-label={`${copy.viewProduct}: ${spotlight.name}`} className={cn("block w-full", focusClass)}><Image src={spotlight.src} alt={spotlight.name} width={900} height={1050} unoptimized className="aspect-[6/7] w-full object-cover" /></button></div>
          <div className={cn(sectionClass, "flex min-w-0 flex-col items-start justify-center")}>
            <p className={cn(eyebrowClass, "opacity-70")}>{copy.spotlightEyebrow}</p><h4 className={titleClass}>{copy.spotlightTitle}</h4>
            <p className="mt-6 text-xs opacity-70">{spotlight.collection}</p><h5 className="mt-2 font-heading text-2xl">{spotlight.name}</h5><p className="mt-3 text-lg">{spotlight.priceLabel}</p><p className="mt-5 max-w-md text-sm leading-relaxed opacity-80">{copy.spotlightBody}</p>
            <div className="mt-6 flex flex-wrap gap-3"><button type="button" onClick={() => onProduct(spotlight.id)} className={cn("inline-flex min-h-12 items-center gap-2 rounded-full bg-background px-5 py-3 text-sm font-semibold text-heading", focusClass)}>{copy.viewProduct}<ArrowRight size={16} aria-hidden="true" /></button>{onAddProduct && <button type="button" onClick={() => addProduct(spotlight)} aria-label={`${copy.spotlightAdd}: ${spotlight.name}`} className={cn("inline-flex min-h-12 items-center gap-2 rounded-full border border-current/40 px-5 py-3 text-sm font-semibold", focusClass)}>{added === spotlight.id ? <Check size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}{added === spotlight.id ? copy.addedShort : copy.addToBag}</button>}</div>
            {uniqueImages.length > 1 && <div role="group" aria-label={copy.spotlightChoose} className="mt-8 flex flex-wrap gap-3">{uniqueImages.map(product => <button key={product.id} type="button" aria-label={`${copy.spotlightPrice}: ${product.name}`} aria-pressed={spotlight.id === product.id} onClick={() => setFeaturedId(product.id)} className={cn("h-16 w-16 overflow-hidden rounded border-2", spotlight.id === product.id ? "border-primary" : "border-transparent", focusClass)}><Image src={product.src} alt="" width={96} height={96} unoptimized className="h-full w-full object-cover" /></button>)}</div>}
          </div>
        </div>
      </section>}
      <section data-storefront-section="discovery-context" className={cn(sectionClass, "bg-secondary-background")}>
        <div className="mb-9 max-w-2xl"><p className={cn(eyebrowClass, "text-primary")}>{copy.discoveryContextEyebrow}</p><h4 className={titleClass}>{copy.discoveryContextTitle}</h4><p className="mt-5 max-w-lg text-sm leading-relaxed text-paragraph">{copy.discoveryContextBody}</p></div>
        <div className={cn("grid gap-7", twoColumns)}>{uniqueImages.slice(0, 2).map((product, index) => <div key={product.id} className="min-w-0"><button type="button" onClick={() => index === 0 ? onProduct(product.id) : onCollection(product.collection)} aria-label={`${copy.discoveryContexts[index].action}: ${index === 0 ? product.name : product.collection}`} className={cn("block w-full overflow-hidden bg-muted", focusClass)}><Image src={product.src} alt="" width={720} height={500} unoptimized className={cn("w-full object-cover", index === 0 ? "aspect-[4/3]" : "aspect-[5/4]")} /></button><p className="mt-5 text-xs text-primary">{product.collection}</p><h5 className="mt-2 font-heading text-2xl">{copy.discoveryContexts[index].title}</h5><p className="mt-3 max-w-md text-sm leading-relaxed text-paragraph">{copy.discoveryContexts[index].body}</p><button type="button" onClick={() => index === 0 ? onProduct(product.id) : onCollection(product.collection)} className={cn("mt-4", linkClass, focusClass)}>{copy.discoveryContexts[index].action}<ArrowUpRight size={16} aria-hidden="true" /></button></div>)}</div>
      </section>
      {related.length > 0 && <section data-storefront-section="discovery-recommendations" className={cn(sectionClass, "border-t border-border")}>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5"><div><p className={cn(eyebrowClass, "text-primary")}>{copy.recommendationsEyebrow}</p><h4 className={titleClass}>{copy.recommendationsTitle}</h4></div><p className="max-w-sm text-xs leading-relaxed text-paragraph">{copy.recommendationsNote}</p></div>
        <div data-related-products="true" className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,12rem),1fr))] gap-x-5 gap-y-8">{related.map(productCard)}</div>
      </section>}
      <section data-storefront-section="discovery-explore" className={cn(sectionClass, "bg-secondary text-secondary-foreground")}>
        <div className={cn("grid gap-8", twoColumns)}><div><h4 className={titleClass}>{copy.discoveryClosingTitle}</h4><p className="mt-4 max-w-sm text-sm leading-relaxed opacity-80">{copy.discoveryClosingBody}</p></div><div>{collections.map(name => <button key={name} type="button" onClick={() => onCollection(name)} className={cn("flex min-h-14 w-full items-center justify-between gap-3 border-b border-current/30 py-4 text-left text-base", focusClass)}><span>{name}</span><ArrowUpRight size={18} aria-hidden="true" className="shrink-0" /></button>)}</div></div>
      </section>
    </>}
  </>;
}
