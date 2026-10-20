import Image from "next/image";
import { ArrowUpRight, Search, ShoppingBag } from "lucide-react";
import { beautyCopy, beautyProducts } from "@/content/landing/shopify-beauty-content";
import { livingHomeCopy, livingProducts } from "@/content/landing/shopify-home-living-content";
import { techHomeCopy, techProducts } from "@/content/landing/shopify-tech-content";
import type { ShopifySignatureThumbnailProps } from "@/interfaces/shopify-signature-thumbnail-interface";
import { cn } from "@/lib/utils";

export default function ShopifySignatureThumbnail({ theme, headline, images, name }: ShopifySignatureThumbnailProps) {
  const dark = theme === "tech";
  const photo = (src: string, className = "") => <Image src={src} alt="" width={700} height={700} unoptimized loading="lazy" className={cn("h-full w-full object-cover", className)} />;
  const header = <div className={cn("flex min-w-0 items-center justify-between gap-3 border-b px-3", dark ? "border-background/15" : "border-border")}><span className="min-w-0 truncate font-heading text-[11px] leading-none">{name}</span><span className="flex shrink-0 items-center gap-3"><Search size={11} strokeWidth={1.4} /><ShoppingBag size={11} strokeWidth={1.4} /></span></div>;

  if (theme === "beauty") return (
    <div aria-hidden="true" data-signature-thumbnail="beauty" className="grid h-[28rem] min-w-0 grid-rows-[2rem_9rem_5rem_8rem_4rem] overflow-hidden bg-background text-heading">
      {header}
      <div className="grid min-h-0 grid-cols-2 gap-2 bg-secondary-background p-3">
        <div className="flex min-w-0 flex-col items-start justify-center"><p className="truncate text-[6px] uppercase tracking-widest text-paragraph">{beautyCopy.hero.eyebrow}</p><p className="mt-2 line-clamp-3 break-words font-heading text-[18px] font-normal leading-[1.02]">{headline || beautyCopy.hero.title}</p><span className="mt-3 inline-flex max-w-full items-center gap-1 rounded-full bg-primary px-2 py-1 text-[6px] font-semibold text-primary-foreground"><span className="truncate">{beautyCopy.hero.action}</span><ArrowUpRight size={8} className="shrink-0" /></span></div>
        <div className="min-h-0 overflow-hidden rounded-t-[48%] rounded-b-xl">{photo(images[0] || beautyCopy.hero.image)}</div>
      </div>
      <div className="grid min-h-0 grid-cols-4 gap-3 px-4 py-2">{beautyCopy.concerns.items.map(item => <div key={item.title} className="min-w-0 text-center"><div className="mx-auto h-11 w-11 max-w-full overflow-hidden rounded-full bg-secondary-background">{photo(item.image)}</div><p className="mt-1 truncate text-[7px] font-medium">{item.collection}</p></div>)}</div>
      <div className="min-h-0 px-3"><p className="mb-2 text-center font-heading text-[12px]">{beautyCopy.collection.title}</p><div className="grid h-[6.25rem] grid-cols-3 gap-2">{beautyProducts.slice(0, 3).map(product => <div key={product.name} className="min-w-0"><div className="h-[4.6rem] overflow-hidden rounded-t-xl bg-secondary-background">{photo(product.src)}</div><p className="mt-1 truncate text-[6px] font-medium">{product.name}</p><div className="mt-1 h-px w-7 bg-border" /></div>)}</div></div>
      <div className="mx-3 mb-2 grid min-h-0 grid-cols-[.7fr_1.3fr] overflow-hidden rounded-lg bg-primary/5"><div className="min-h-0">{photo(beautyCopy.routine.eveningImage)}</div><div className="flex min-w-0 flex-col justify-center p-2"><p className="text-[6px] uppercase tracking-wider text-paragraph">{beautyCopy.routine.eyebrow}</p><p className="mt-1 font-heading text-[13px] leading-tight">{beautyCopy.routine.title}</p><span className="mt-1 h-px w-12 bg-primary/25" /></div></div>
    </div>
  );

  if (theme === "living") return (
    <div aria-hidden="true" data-signature-thumbnail="living" className="grid h-[28rem] min-w-0 grid-rows-[2rem_9rem_5rem_7rem_5rem] overflow-hidden bg-background text-heading">
      {header}
      <div className="relative min-h-0 overflow-hidden">{photo(images[0] || livingHomeCopy.hero.image)}<div className="absolute inset-0 bg-gradient-to-r from-heading/85 via-heading/45 to-transparent" /><div className="absolute inset-y-0 left-0 flex max-w-[65%] flex-col items-start justify-center p-4 text-background"><p className="line-clamp-1 text-[6px] uppercase tracking-widest">{livingHomeCopy.hero.eyebrow}</p><p className="mt-2 line-clamp-3 break-words font-heading text-[21px] leading-none">{headline || livingHomeCopy.hero.title}</p><span className="mt-3 inline-flex max-w-full items-center gap-1 bg-background px-2 py-1 text-[6px] font-semibold text-heading"><span className="truncate">{livingHomeCopy.hero.action}</span><ArrowUpRight size={8} className="shrink-0" /></span></div></div>
      <div className="grid min-h-0 grid-cols-3 gap-2 px-3 py-2">{livingHomeCopy.categories.items.slice(0, 3).map(item => <div key={item.collection} className="relative min-h-0 overflow-hidden bg-secondary-background">{photo(item.image)}<span className="absolute inset-x-1 bottom-1 truncate bg-background/95 px-1 py-1 text-[7px] font-medium">{item.collection}</span></div>)}</div>
      <div className="min-h-0 px-3"><p className="mb-2 font-heading text-[12px]">{livingHomeCopy.products.title}</p><div className="grid grid-cols-4 gap-2">{livingProducts.slice(0, 4).map(product => <div key={product.name} className="min-w-0"><div className="h-[4rem] overflow-hidden bg-secondary-background">{photo(product.src)}</div><p className="mt-1 truncate text-[6px] font-medium">{product.name}</p><div className="mt-1 h-px w-5 bg-border" /></div>)}</div></div>
      <div className="mx-3 mb-2 grid min-h-0 grid-cols-2 overflow-hidden bg-secondary-background"><div className="flex min-w-0 flex-col items-start justify-center p-3"><p className="text-[6px] uppercase tracking-wider text-paragraph">{livingHomeCopy.room.eyebrow}</p><p className="mt-1 line-clamp-3 font-heading text-[13px] leading-tight">{livingHomeCopy.room.title}</p><ArrowUpRight size={10} className="mt-2" /></div><div className="min-h-0">{photo(livingHomeCopy.room.image)}</div></div>
    </div>
  );

  return (
    <div aria-hidden="true" data-signature-thumbnail="tech" className="grid h-[28rem] min-w-0 grid-rows-[2rem_10rem_4rem_8rem_4rem] overflow-hidden bg-heading text-background">
      {header}
      <div className="relative min-h-0 overflow-hidden">{photo(images[0] || techHomeCopy.hero.image, "object-right")}<div className="absolute inset-0 bg-gradient-to-r from-heading/95 via-heading/60 to-transparent" /><div className="absolute inset-y-0 left-0 flex max-w-[65%] flex-col items-start justify-center p-4"><p className="line-clamp-1 text-[6px] uppercase tracking-widest text-background/75">{techHomeCopy.hero.eyebrow}</p><p className="mt-2 line-clamp-3 break-words font-heading text-[23px] leading-none">{headline || techHomeCopy.hero.headline}</p><span className="mt-3 inline-flex max-w-full items-center gap-1 rounded-full bg-background px-2 py-1 text-[6px] font-semibold text-heading"><span className="truncate">{techHomeCopy.hero.action}</span><ArrowUpRight size={8} className="shrink-0" /></span></div></div>
      <div className="grid min-h-0 grid-cols-3 gap-2 px-3 py-2">{techHomeCopy.benefits.slice(0, 3).map((item, index) => <div key={item.title} className="min-w-0 rounded-md border border-background/20 bg-background/5 p-2"><p className="text-[7px] text-background/60">{String(index + 1).padStart(2, "0")}</p><p className="mt-1 line-clamp-2 text-[8px] font-medium leading-tight">{item.title}</p></div>)}</div>
      <div className="min-h-0 px-3 py-2"><p className="mb-2 font-heading text-[12px]">{techHomeCopy.products.title}</p><div className="grid grid-cols-3 gap-2">{techProducts.slice(0, 3).map(product => <div key={product.name} className="min-w-0"><div className="h-[4.6rem] overflow-hidden rounded-lg bg-background/10">{photo(product.src)}</div><p className="mt-1 truncate text-[6px] font-medium">{product.name}</p><div className="mt-1 h-px w-6 bg-background/30" /></div>)}</div></div>
      <div className="mx-3 mb-2 grid min-h-0 grid-cols-[1.3fr_.7fr] overflow-hidden rounded-lg border border-background/15 bg-background/5"><div className="flex min-w-0 flex-col justify-center p-2"><p className="text-[6px] uppercase tracking-wider text-background/60">{techHomeCopy.desk.eyebrow}</p><p className="mt-1 font-heading text-[14px] leading-tight">{techHomeCopy.desk.title}</p></div><div className="min-h-0">{photo(techProducts[3].src)}</div></div>
    </div>
  );
}
