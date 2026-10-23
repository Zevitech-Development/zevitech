import Image from "next/image";
import { ArrowUpRight, Search, ShoppingBag } from "lucide-react";
import { beautyCopy, beautyProducts } from "@/content/landing/shopify-beauty-content";
import { livingHomeCopy, livingProducts } from "@/content/landing/shopify-home-living-content";
import { techHomeCopy, techProducts } from "@/content/landing/shopify-tech-content";
import type { ShopifySignatureThumbnailProps } from "@/interfaces/shopify-signature-thumbnail-interface";
import { cn } from "@/lib/utils";

export default function ShopifySignatureThumbnail({ theme, headline, images, name }: ShopifySignatureThumbnailProps) {
  const dark = theme === "tech";
  // Thumbnails are small: request a small rendition of remote photography.
  const photo = (src: string, className = "") => <Image src={src.replace("w=1400", "w=520")} alt="" width={700} height={700} unoptimized loading="lazy" className={cn("h-full w-full object-cover", className)} />;
  const header = <div className={cn("flex min-w-0 items-center justify-between gap-3 border-b px-3", dark ? "border-mix-background/15" : "border-border")}><span className="min-w-0 truncate font-heading text-[11px] leading-none">{name}</span><span className="flex shrink-0 items-center gap-3"><Search size={11} strokeWidth={1.4} /><ShoppingBag size={11} strokeWidth={1.4} /></span></div>;

  if (theme === "lookbook") return (
    <div aria-hidden="true" data-signature-thumbnail="lookbook" className="grid h-[28rem] min-w-0 grid-rows-[2rem_13rem_1fr] overflow-hidden bg-background text-heading">
      {header}
      <div className="relative overflow-hidden">{photo(images[0])}<div className="absolute inset-0 bg-gradient-to-t from-mix-heading/80 to-transparent" />
        <div className="absolute inset-x-4 bottom-4 text-background"><p className="max-w-[12ch] font-heading text-[26px] leading-[.95] tracking-tight">{headline}</p>
          <div className="mt-3 flex gap-1.5"><span className="rounded-full bg-background px-2.5 py-1 text-[8px] font-semibold text-heading">Shop the look</span><span className="rounded-full border border-mix-background/60 px-2.5 py-1 text-[8px]">Collection</span></div></div>
      </div>
      <div className="grid min-h-0 grid-cols-[1.3fr_1fr] gap-3 p-4">
        <div className="grid min-h-0 grid-cols-[1.4fr_1fr] grid-rows-2 gap-1.5">{[0, 1, 2].map(i => <div key={i} className={cn("relative min-h-0 overflow-hidden", i === 0 && "row-span-2")}>{photo(images[(i + 1) % images.length])}<span className={cn("absolute left-1 top-1 flex h-4 w-4 items-center justify-center rounded-full text-[7px] font-semibold ring-1 ring-background", i === 0 ? "bg-primary text-primary-foreground" : "bg-background")}>{i + 1}</span></div>)}</div>
        <div className="flex min-w-0 flex-col justify-center text-[7px]"><p className="font-heading text-[14px] leading-tight">This week’s look</p>{[1, 2, 3].map(n => <p key={n} className="mt-1.5 flex items-center gap-1.5 border-b border-mix-heading/15 pb-1"><span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-mix-heading/30 text-[6px]">{n}</span>Piece {n}</p>)}<span className="mt-2 rounded-full bg-primary py-1 text-center text-primary-foreground">Add the complete look</span></div>
      </div>
    </div>
  );

  if (theme === "bundle") return (
    <div aria-hidden="true" data-signature-thumbnail="bundle" className="grid h-[28rem] min-w-0 grid-rows-[2rem_12rem_1fr] overflow-hidden bg-background text-heading">
      {header}
      <div className="relative grid grid-cols-[1.1fr_1fr] items-center gap-2 bg-mix-primary/10 px-4">
        <div><span className="rounded-full bg-primary px-2 py-0.5 text-[7px] font-semibold text-primary-foreground">Bundle &amp; save up to 15%</span><p className="mt-2 font-heading text-[20px] leading-[.95] tracking-tight">{headline}</p><span className="mt-3 inline-block rounded-full bg-primary px-2.5 py-1 text-[7px] font-semibold text-primary-foreground">Start my bundle</span></div>
        <div className="relative h-full">{[0, 1, 2].map(i => <div key={i} className={cn("absolute w-[58%] overflow-hidden rounded-xl bg-background p-1 shadow-lg", ["left-0 top-6 -rotate-6", "right-0 top-3 rotate-3", "bottom-3 left-[20%] -rotate-1"][i])}><div className="aspect-square overflow-hidden rounded-lg">{photo(images[i % images.length])}</div></div>)}
          <span className="absolute right-1 top-[45%] flex h-11 w-11 rotate-12 flex-col items-center justify-center rounded-full bg-heading text-[6px] text-background"><span>Save</span><span className="font-heading text-[13px] leading-none">15%</span></span></div>
      </div>
      <div className="grid min-h-0 grid-cols-[1fr_6.5rem] gap-2 p-3">
        <div className="grid min-h-0 grid-cols-3 gap-1.5">{[0, 1, 2].map(i => <div key={i} className={cn("flex min-h-0 flex-col overflow-hidden rounded-lg border-2 bg-background", i < 2 ? "border-primary" : "border-transparent ring-1 ring-mix-heading/10")}><div className="min-h-0 flex-1 overflow-hidden">{photo(images[(i + 1) % images.length])}</div><span className="m-1 rounded-full bg-mix-heading/5 py-0.5 text-center text-[7px] font-semibold">− {i < 2 ? 1 : 0} +</span></div>)}</div>
        <div className="flex flex-col rounded-xl bg-heading p-2 text-[7px] text-background"><p className="font-heading text-[11px]">Your bundle</p><div className="mt-2 h-1 rounded-full bg-mix-background/20"><div className="h-full w-1/2 rounded-full bg-primary" /></div><p className="mt-1.5">Add 1 more to save 10%</p><p className="mt-auto font-heading text-[13px]">Total</p><span className="mt-1 rounded-full bg-primary py-1 text-center text-primary-foreground">Add bundle</span></div>
      </div>
    </div>
  );

  if (theme === "configurator") return (
    <div aria-hidden="true" data-signature-thumbnail="configurator" className="grid h-[28rem] min-w-0 grid-rows-[2rem_10rem_1fr] overflow-hidden bg-heading text-background">
      {header}
      <div className="relative overflow-hidden">{photo(images[0], "opacity-70")}<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_80%,transparent,var(--heading)_75%)]" /><p className="absolute bottom-3 left-4 max-w-[13ch] font-heading text-[22px] leading-[.95] tracking-tight">{headline}</p></div>
      <div className="grid min-h-0 grid-cols-[1fr_1fr] gap-3 p-4">
        <div className="relative min-h-0 rounded-2xl bg-mix-background/5 [perspective:600px]"><div className="absolute inset-[10%] overflow-hidden rounded-xl shadow-2xl [transform:rotateY(-14deg)_rotateX(6deg)]">{photo(images[1 % images.length])}<span className="absolute inset-x-0 bottom-2 text-center font-heading text-[10px] italic">A &amp; J</span></div></div>
        <div className="flex min-w-0 flex-col justify-center gap-1.5 text-[7px]"><p className="text-mix-background/60">Finish — Warm</p><div className="flex gap-1">{["bg-background", "bg-accent", "bg-paragraph"].map((tone, i) => <span key={tone} className={cn("h-4 w-4 rounded-full ring-1 ring-mix-background/30", tone, i === 1 && "ring-2 ring-background")} />)}</div>
          <p className="mt-1 text-mix-background/60">Size</p><div className="grid grid-cols-3 gap-0.5 rounded-md bg-mix-background/10 p-0.5">{["S", "M", "L"].map((f, i) => <span key={f} className={cn("rounded py-1 text-center", i === 1 && "bg-background text-heading")}>{f}</span>)}</div>
          <div className="mt-1 rounded-lg bg-background p-1.5 text-heading"><p className="text-mix-heading/60">Your price</p><p className="font-heading text-[14px] leading-none">$147</p></div>
        </div>
      </div>
    </div>
  );

  if (theme === "concierge") return (
    <div aria-hidden="true" data-signature-thumbnail="concierge" className="grid h-[28rem] min-w-0 grid-rows-[2rem_13rem_1fr] overflow-hidden bg-background text-heading">
      {header}
      <div className="relative overflow-hidden bg-secondary text-secondary-foreground">{photo(images[0], "opacity-75")}<div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
        <div className="absolute inset-x-4 bottom-3 text-white"><p className="text-[7px] text-white/70">Private client service</p><p className="mt-1 max-w-[13ch] font-heading text-[22px] leading-[.95] tracking-tight">{headline}</p>
          <div className="mt-2 flex items-center justify-between border-t border-white/25 pt-1.5 text-[7px]"><span>01 / 03</span><span className="flex gap-1"><span className="h-0.5 w-4 bg-white" /><span className="h-0.5 w-4 bg-white/40" /><span className="h-0.5 w-4 bg-white/40" /></span></div></div>
      </div>
      <div className="grid min-h-0 grid-cols-[1fr_1.1fr] gap-2 p-3 text-[7px]">
        <div className="rounded-xl bg-secondary-background p-2"><p className="text-mix-heading/55">Question 1 of 3</p><p className="mt-1 font-heading text-[11px] leading-tight">Who are you shopping for?</p>{["Myself", "A gift", "My home"].map(o => <span key={o} className="mt-1 block rounded-md bg-background px-1.5 py-1 ring-1 ring-mix-heading/10">{o}</span>)}</div>
        <div className="grid grid-rows-2 gap-2"><div className="rounded-xl bg-secondary p-2 text-secondary-foreground"><p className="opacity-60">Reward points</p><p className="font-heading text-[16px] leading-none">1,240</p><div className="mt-1.5 h-0.5 rounded-full bg-white/20"><div className="h-full w-4/5 rounded-full bg-white" /></div></div>
          <div className="grid grid-cols-3 gap-1">{[0, 1, 2].map(i => <div key={i} className="min-h-0 overflow-hidden rounded-md">{photo(images[(i + 1) % images.length])}</div>)}</div></div>
      </div>
    </div>
  );

  if (theme === "clotya" || theme === "ecolife") return (
    <div aria-hidden="true" data-signature-thumbnail={theme} className={cn("grid h-[28rem] min-w-0 grid-rows-[2rem_10rem_4rem_7rem_5rem] overflow-hidden text-heading", theme === "ecolife" ? "bg-[#fbf4e5]" : "bg-background")}>
      {header}
      <div className={cn("grid min-h-0 grid-cols-[1fr_1.1fr] gap-2 overflow-hidden p-3", theme === "ecolife" ? "bg-[#e8efdc]" : "bg-secondary-background")}>
        <div className="flex min-w-0 flex-col justify-center"><p className="text-[6px] uppercase tracking-widest">{theme === "clotya" ? "The editorial collection" : "Discover something new"}</p><p className="mt-2 line-clamp-4 break-words font-heading text-[20px] leading-tight">{headline}</p><span className="mt-3 w-fit rounded bg-primary px-2 py-1 text-[7px] text-primary-foreground">Explore more</span></div>
        <div className={cn("min-h-0 overflow-hidden", theme === "ecolife" && "rounded-full")}>{photo(images[0])}</div>
      </div>
      <div className="grid min-h-0 grid-cols-3 gap-2 p-2">{images.slice(0, 3).map((src, i) => <div key={i} className={cn("min-h-0 overflow-hidden", theme === "ecolife" && "rounded-xl")}>{photo(src)}</div>)}</div>
      <div className="min-h-0 px-3 py-2"><p className="mb-2 font-heading text-[12px]">Selected for you</p><div className="grid h-[4.5rem] grid-cols-3 gap-2">{images.slice(0, 3).map((src, i) => <div key={i} className="min-h-0 overflow-hidden rounded bg-background">{photo(src)}</div>)}</div></div>
      <div className="mx-3 mb-2 grid min-h-0 grid-cols-2 overflow-hidden bg-mix-primary/5"><div className="min-h-0">{photo(images[2] || images[0])}</div><div className="flex flex-col justify-center p-2"><p className="text-[7px] uppercase">A closer look</p><p className="mt-1 font-heading text-[13px] leading-tight">Thoughtfully considered.</p><ArrowUpRight size={12} className="mt-2" /></div></div>
    </div>
  );

  if (theme === "beauty") return (
    <div aria-hidden="true" data-signature-thumbnail="beauty" className="grid h-[28rem] min-w-0 grid-rows-[2rem_9rem_5rem_8rem_4rem] overflow-hidden bg-background text-heading">
      {header}
      <div className="grid min-h-0 grid-cols-2 gap-2 bg-secondary-background p-3">
        <div className="flex min-w-0 flex-col items-start justify-center"><p className="truncate text-[6px] uppercase tracking-widest text-paragraph">{beautyCopy.hero.eyebrow}</p><p className="mt-2 line-clamp-3 break-words font-heading text-[18px] font-normal leading-[1.02]">{headline || beautyCopy.hero.title}</p><span className="mt-3 inline-flex max-w-full items-center gap-1 rounded-full bg-primary px-2 py-1 text-[6px] font-semibold text-primary-foreground"><span className="truncate">{beautyCopy.hero.action}</span><ArrowUpRight size={8} className="shrink-0" /></span></div>
        <div className="min-h-0 overflow-hidden rounded-t-[48%] rounded-b-xl">{photo(images[0] || beautyCopy.hero.image)}</div>
      </div>
      <div className="grid min-h-0 grid-cols-4 gap-3 px-4 py-2">{beautyCopy.concerns.items.map(item => <div key={item.title} className="min-w-0 text-center"><div className="mx-auto h-11 w-11 max-w-full overflow-hidden rounded-full bg-secondary-background">{photo(item.image)}</div><p className="mt-1 truncate text-[7px] font-medium">{item.collection}</p></div>)}</div>
      <div className="min-h-0 px-3"><p className="mb-2 text-center font-heading text-[12px]">{beautyCopy.collection.title}</p><div className="grid h-[6.25rem] grid-cols-3 gap-2">{beautyProducts.slice(0, 3).map(product => <div key={product.name} className="min-w-0"><div className="h-[4.6rem] overflow-hidden rounded-t-xl bg-secondary-background">{photo(product.src)}</div><p className="mt-1 truncate text-[6px] font-medium">{product.name}</p><div className="mt-1 h-px w-7 bg-border" /></div>)}</div></div>
      <div className="mx-3 mb-2 grid min-h-0 grid-cols-[.7fr_1.3fr] overflow-hidden rounded-lg bg-mix-primary/5"><div className="min-h-0">{photo(beautyCopy.routine.eveningImage)}</div><div className="flex min-w-0 flex-col justify-center p-2"><p className="text-[6px] uppercase tracking-wider text-paragraph">{beautyCopy.routine.eyebrow}</p><p className="mt-1 font-heading text-[13px] leading-tight">{beautyCopy.routine.title}</p><span className="mt-1 h-px w-12 bg-mix-primary/25" /></div></div>
    </div>
  );

  if (theme === "living") return (
    <div aria-hidden="true" data-signature-thumbnail="living" className="grid h-[28rem] min-w-0 grid-rows-[2rem_9rem_5rem_7rem_5rem] overflow-hidden bg-background text-heading">
      {header}
      <div className="relative min-h-0 overflow-hidden">{photo(images[0] || livingHomeCopy.hero.image)}<div className="absolute inset-0 bg-gradient-to-r from-mix-heading/85 via-mix-heading/45 to-transparent" /><div className="absolute inset-y-0 left-0 flex max-w-[65%] flex-col items-start justify-center p-4 text-background"><p className="line-clamp-1 text-[6px] uppercase tracking-widest">{livingHomeCopy.hero.eyebrow}</p><p className="mt-2 line-clamp-3 break-words font-heading text-[21px] leading-none">{headline || livingHomeCopy.hero.title}</p><span className="mt-3 inline-flex max-w-full items-center gap-1 bg-background px-2 py-1 text-[6px] font-semibold text-heading"><span className="truncate">{livingHomeCopy.hero.action}</span><ArrowUpRight size={8} className="shrink-0" /></span></div></div>
      <div className="grid min-h-0 grid-cols-3 gap-2 px-3 py-2">{livingHomeCopy.categories.items.slice(0, 3).map(item => <div key={item.collection} className="relative min-h-0 overflow-hidden bg-secondary-background">{photo(item.image)}<span className="absolute inset-x-1 bottom-1 truncate bg-mix-background/95 px-1 py-1 text-[7px] font-medium">{item.collection}</span></div>)}</div>
      <div className="min-h-0 px-3"><p className="mb-2 font-heading text-[12px]">{livingHomeCopy.products.title}</p><div className="grid grid-cols-4 gap-2">{livingProducts.slice(0, 4).map(product => <div key={product.name} className="min-w-0"><div className="h-[4rem] overflow-hidden bg-secondary-background">{photo(product.src)}</div><p className="mt-1 truncate text-[6px] font-medium">{product.name}</p><div className="mt-1 h-px w-5 bg-border" /></div>)}</div></div>
      <div className="mx-3 mb-2 grid min-h-0 grid-cols-2 overflow-hidden bg-secondary-background"><div className="flex min-w-0 flex-col items-start justify-center p-3"><p className="text-[6px] uppercase tracking-wider text-paragraph">{livingHomeCopy.room.eyebrow}</p><p className="mt-1 line-clamp-3 font-heading text-[13px] leading-tight">{livingHomeCopy.room.title}</p><ArrowUpRight size={10} className="mt-2" /></div><div className="min-h-0">{photo(livingHomeCopy.room.image)}</div></div>
    </div>
  );

  return (
    <div aria-hidden="true" data-signature-thumbnail="tech" className="grid h-[28rem] min-w-0 grid-rows-[2rem_10rem_4rem_8rem_4rem] overflow-hidden bg-heading text-background">
      {header}
      <div className="relative min-h-0 overflow-hidden">{photo(images[0] || techHomeCopy.hero.image, "object-right")}<div className="absolute inset-0 bg-gradient-to-r from-mix-heading/95 via-mix-heading/60 to-transparent" /><div className="absolute inset-y-0 left-0 flex max-w-[65%] flex-col items-start justify-center p-4"><p className="line-clamp-1 text-[6px] uppercase tracking-widest text-mix-background/75">{techHomeCopy.hero.eyebrow}</p><p className="mt-2 line-clamp-3 break-words font-heading text-[23px] leading-none">{headline || techHomeCopy.hero.headline}</p><span className="mt-3 inline-flex max-w-full items-center gap-1 rounded-full bg-background px-2 py-1 text-[6px] font-semibold text-heading"><span className="truncate">{techHomeCopy.hero.action}</span><ArrowUpRight size={8} className="shrink-0" /></span></div></div>
      <div className="grid min-h-0 grid-cols-3 gap-2 px-3 py-2">{techHomeCopy.benefits.slice(0, 3).map((item, index) => <div key={item.title} className="min-w-0 rounded-md border border-mix-background/20 bg-mix-background/5 p-2"><p className="text-[7px] text-mix-background/60">{String(index + 1).padStart(2, "0")}</p><p className="mt-1 line-clamp-2 text-[8px] font-medium leading-tight">{item.title}</p></div>)}</div>
      <div className="min-h-0 px-3 py-2"><p className="mb-2 font-heading text-[12px]">{techHomeCopy.products.title}</p><div className="grid grid-cols-3 gap-2">{techProducts.slice(0, 3).map(product => <div key={product.name} className="min-w-0"><div className="h-[4.6rem] overflow-hidden rounded-lg bg-mix-background/10">{photo(product.src)}</div><p className="mt-1 truncate text-[6px] font-medium">{product.name}</p><div className="mt-1 h-px w-6 bg-mix-background/30" /></div>)}</div></div>
      <div className="mx-3 mb-2 grid min-h-0 grid-cols-[1.3fr_.7fr] overflow-hidden rounded-lg border border-mix-background/15 bg-mix-background/5"><div className="flex min-w-0 flex-col justify-center p-2"><p className="text-[6px] uppercase tracking-wider text-mix-background/60">{techHomeCopy.desk.eyebrow}</p><p className="mt-1 font-heading text-[14px] leading-tight">{techHomeCopy.desk.title}</p></div><div className="min-h-0">{photo(techProducts[3].src)}</div></div>
    </div>
  );
}
