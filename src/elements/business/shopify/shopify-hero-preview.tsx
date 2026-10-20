import Image from "next/image";
import { ArrowRight, Check, Menu, ShoppingBag } from "lucide-react";
import { shopifyLandingSalesContent } from "@/content/landing/shopify-landing-sales-content";

const products = ["/store-studio/beauty.jpg", "/store-studio/beauty-detail.jpg", "/store-studio/beauty-story.jpg"];

export default function ShopifyHeroPreview() {
  const copy = shopifyLandingSalesContent.heroPreview;
  return (
    <figure>
      <div role="img" aria-label={copy.accessibleLabel} className="relative pb-14 pr-5 pt-5 md:pb-20 md:pr-8">
        <div aria-hidden="true" className="overflow-hidden rounded-2xl border border-white/30 bg-secondary p-2 shadow-2xl md:rounded-3xl md:p-3">
          <div className="overflow-hidden rounded-lg bg-background text-heading">
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 md:px-5 md:py-4">
              <span className="text-[10px] font-bold tracking-widest sm:text-xs">{copy.brand}</span>
              <div className="flex items-center gap-4 text-[10px] font-medium"><span className="hidden sm:inline">{copy.menu[0]}</span><span className="hidden sm:inline">{copy.menu[1]}</span><ShoppingBag className="h-3 w-3 md:h-4 md:w-4" /></div>
            </div>
            <div className="grid grid-cols-2 bg-secondary-background">
              <div className="flex min-w-0 flex-col justify-center gap-2 px-4 py-6 md:gap-3 md:px-5 md:py-8"><span className="text-[8px] uppercase tracking-wider text-muted-foreground sm:text-[10px]">{copy.eyebrow}</span><span className="font-heading text-xl leading-tight sm:text-3xl">{copy.headline}</span><span className="hidden max-w-40 text-xs leading-relaxed text-paragraph sm:inline">{copy.description}</span><span className="mt-2 inline-flex w-fit items-center gap-2 rounded bg-heading px-2 py-2 text-[9px] font-semibold text-background sm:px-3 sm:text-xs">{copy.shop}<ArrowRight className="h-3 w-3" /></span></div>
              <div className="relative min-h-48 md:min-h-60"><Image src={products[0]} alt="" fill priority sizes="(min-width:1024px) 24vw, 45vw" className="object-cover object-center" /></div>
            </div>
            <div className="p-4 md:p-5"><p className="mb-3 font-heading text-sm sm:text-lg">{copy.collection}</p><div className="grid grid-cols-3 gap-2 md:gap-3">{products.map((src,index) => <div key={src}><div className="relative aspect-square overflow-hidden rounded-md bg-secondary-background"><Image src={src} alt="" fill sizes="(min-width:1024px) 10vw, 25vw" className="object-cover" /></div><p className="mt-2 truncate text-[9px] text-paragraph sm:text-xs">{copy.productLabels[index]}</p></div>)}</div>
          </div>
        </div>
        </div>
        <div aria-hidden="true" className="absolute bottom-2 right-0 w-[34%] overflow-hidden rounded-3xl border border-white/40 bg-secondary p-1.5 shadow-2xl sm:rounded-[2rem] md:p-2">
          <div className="overflow-hidden rounded-2xl bg-background text-heading sm:rounded-3xl">
            <div className="mx-auto mb-1 h-2 w-9 rounded-b-lg bg-secondary md:h-3 md:w-12" />
            <div className="flex items-center justify-between px-2 py-2"><Menu className="h-3 w-3" /><span className="text-[7px] font-bold tracking-wide sm:text-[9px]">{copy.brand}</span><ShoppingBag className="h-3 w-3" /></div>
            <div className="relative aspect-[4/5]"><Image src={products[0]} alt="" fill sizes="(min-width:1024px) 16vw, 30vw" className="object-cover" /></div>
            <div className="space-y-2 p-2 md:p-3"><p className="font-heading text-xs sm:text-base">{copy.product}</p><p className="text-[8px] text-paragraph sm:text-[10px]">{copy.productDetail}</p><div className="hidden items-center gap-1 rounded border border-border p-2 text-[9px] sm:flex"><Check className="h-3 w-3 shrink-0 text-primary" /><span>{copy.option}</span></div><span className="flex items-center justify-center rounded-md bg-primary px-1 py-2 text-[9px] font-semibold text-primary-foreground sm:text-xs">{copy.add}</span></div>
          </div>
        </div>
      </div>
      <figcaption className="text-center text-xs leading-relaxed text-white/70">{copy.caption}</figcaption>
    </figure>
  );
}
