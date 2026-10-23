"use client";

import { useId, useState } from "react";
import Image from "./shopify-preview-image";
import { ArrowRight, Check, ChevronDown, Plus } from "lucide-react";
import type { ShopifyReferenceHomeProps } from "@/interfaces/shopify-reference-home-interface";
import { functionalReferenceCopy as copy } from "@/content/landing/shopify-functional-reference-content";
import { cn } from "@/lib/utils";
import { priceOf } from "@/lib/shopify-tier-theme-utils";

/** Responsive sections beneath the shared, working store navigation and cart. */
export default function ShopifyReferenceHome({ products, heroSrc, layout, headline, brief, categoryContext, onBrowse, onProduct, onAddToBag, onViewBag, onJournal }: ShopifyReferenceHomeProps) {
  const id = useId();
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("featured");
  const [added, setAdded] = useState<number[]>([]);
  const [joined, setJoined] = useState(false);
  const [focusProduct, setFocusProduct] = useState(0);
  if (!products.length) return null;
  const product = products[focusProduct % products.length];
  const campaign = layout !== 0;
  const featuredProduct = layout === 4;
  const advanced = layout >= 3;
  const dark = layout === 2 || layout === 8;
  const collectionFirst = layout === 5 || layout === 9;
  const categories = Array.from(new Set(products.map(item => item.collection)));
  const visible = products.filter(item => filter === "all" || item.collection === filter).sort((a,b) => sort === "low" ? priceOf(a)-priceOf(b) : sort === "high" ? priceOf(b)-priceOf(a) : 0);
  const button = "inline-flex min-h-11 items-center justify-center gap-2 border border-current px-5 py-3 text-sm transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";
  const gutter = "px-[clamp(1rem,5cqw,4rem)]";
  const picture = (index: number, className = "") => { const item=products[index % products.length]; return <Image src={item.src} alt={item.name} width={1100} height={1000} unoptimized className={cn("h-full w-full object-cover",className)} />; };
  const add = (id: number) => { onAddToBag(id); setAdded(current => [...current,id]); };
  return <div data-functional-reference={layout} className="min-w-0 bg-background text-heading">
    <section className={cn("relative isolate grid overflow-hidden", collectionFirst ? "min-h-80" : "min-h-[30rem]", !campaign && "[@container_studio_(min-width:680px)]:grid-cols-2", dark && "bg-heading text-background")}>
      <div className={cn("overflow-hidden", campaign ? "absolute inset-0 -z-10" : "min-h-72", !campaign && "[@container_studio_(min-width:680px)]:order-2")}>{heroSrc ? <Image src={heroSrc} alt={headline || ""} width={1100} height={900} className="h-full w-full object-cover"/> : picture(0)}</div>
      {campaign && <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/25 to-transparent" />}
      <div className={cn(gutter,"relative flex flex-col items-start justify-center py-[clamp(3rem,8cqw,7rem)]",campaign && "text-white")}>
        <p className="text-xs uppercase tracking-[.2em]">{categoryContext}</p>
        <h3 className="mt-5 max-w-[16ch] font-heading text-[clamp(2.5rem,6cqw,5.5rem)] leading-[1.02] [text-wrap:balance]">{headline}</h3>
        <p className="mt-5 max-w-[40ch] text-base leading-relaxed opacity-90">{brief}</p>
        <button type="button" onClick={() => onBrowse()} className={cn(button,"mt-7 bg-primary text-primary-foreground border-transparent")}>{copy.browse}<ArrowRight size={16}/></button>
      </div>
    </section>
    {featuredProduct && <section className={cn(gutter,"grid gap-8 py-10 [@container_studio_(min-width:680px)]:grid-cols-2 [@container_studio_(min-width:680px)]:items-center")}>
      <button type="button" onClick={()=>onProduct(product.id)} aria-label={`${copy.view}: ${product.name}`} className="aspect-[4/3] overflow-hidden focus-visible:ring-2 focus-visible:ring-primary">{picture(focusProduct)}</button>
      <div className="min-w-0"><p className="text-xs uppercase tracking-[.18em]">{copy.featured}</p><h4 className="mt-4 font-heading text-[clamp(1.8rem,4cqw,3.4rem)] leading-tight">{product.name}</h4><p className="mt-4 max-w-[40ch] text-sm leading-relaxed">{brief}</p><p className="mt-4 text-xl">{product.priceLabel}</p>
        <div className="mt-4 flex flex-wrap gap-2">{products.slice(0,4).map((p,i)=><button key={p.id} type="button" aria-label={`${copy.view}: ${p.name}`} aria-pressed={focusProduct===i} onClick={()=>setFocusProduct(i)} className={cn("h-14 w-14 overflow-hidden border-2",focusProduct===i?"border-primary":"border-transparent")}>{picture(i)}</button>)}</div>
        <button type="button" onClick={()=>add(product.id)} className={cn(button,"mt-5 bg-primary text-primary-foreground border-transparent")}>{added.includes(product.id)?copy.added:copy.add}{added.includes(product.id)?<Check size={16}/>:<Plus size={16}/>}</button>
        {added.includes(product.id)&&<button type="button" onClick={onViewBag} className={cn(button,"ml-2 mt-2")}>{copy.bag}</button>}
      </div>
    </section>}
    {layout > 1 && <section className={cn(gutter,"grid gap-5 border-y border-border py-8 [@container_studio_(min-width:640px)]:grid-cols-3")}>{copy.promises.map(p=><div key={p.title}><Check size={20} className="mb-3 text-primary"/><p className="font-heading text-xl">{p.title}</p><p className="mt-2 text-sm opacity-75">{p.body}</p></div>)}</section>}
    <section className={cn(gutter,"py-12")}>
      <div className="flex flex-wrap items-end justify-between gap-5"><h4 className="max-w-[22ch] font-heading text-[clamp(1.8rem,4cqw,3rem)]">{copy.collection}</h4>
        {advanced && <label className="flex items-center gap-2 text-sm">{copy.sort}<select value={sort} onChange={e=>setSort(e.target.value)} className="min-h-11 max-w-full border border-border bg-background px-3 pr-7">{copy.sorts.map(s=><option key={s.value} value={s.value}>{s.label}</option>)}</select></label>}</div>
      {advanced && <div className="my-6 flex flex-wrap gap-2">{["all",...categories].map(c=><button key={c} type="button" onClick={()=>setFilter(c)} aria-pressed={filter===c} className={cn(button,"rounded-full px-4 py-2",filter===c&&"bg-heading text-background")}>{c==="all"?copy.all:c}</button>)}</div>}
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 [@container_studio_(min-width:760px)]:grid-cols-4">{visible.map(p=><article key={p.id} className="min-w-0"><button type="button" onClick={()=>onProduct(p.id)} aria-label={`${copy.view}: ${p.name}`} className="group block aspect-[4/5] w-full overflow-hidden bg-muted"><Image src={p.src} alt={p.name} width={500} height={620} unoptimized className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"/></button><button type="button" onClick={()=>onProduct(p.id)} className="mt-3 min-h-11 text-left text-sm font-medium">{p.name}</button><p className="text-sm">{p.priceLabel}</p><button type="button" onClick={()=>add(p.id)} className={cn(button,"mt-3 w-full px-2 text-xs")}>{added.includes(p.id)?copy.added:copy.add}</button></article>)}</div>
    </section>
    {featuredProduct && <section className={cn("grid bg-secondary-background", "[@container_studio_(min-width:680px)]:grid-cols-2")}><div className="aspect-[4/3] overflow-hidden">{picture(Math.min(2,products.length-1))}</div><div className={cn(gutter,"flex flex-col items-start justify-center py-10")}><p className="text-xs uppercase tracking-[.18em]">{categoryContext}</p><h4 className="mt-4 font-heading text-[clamp(2rem,4cqw,3.5rem)] leading-tight">{copy.story}</h4><p className="mt-4 text-sm leading-relaxed">{copy.storyBody}</p><button type="button" onClick={onJournal || (()=>onProduct(products[0].id))} className={cn(button,"mt-6")}>{copy.storyAction}<ArrowRight size={16}/></button></div></section>}
    {advanced && <section className={cn(gutter,"grid gap-8 py-12 [@container_studio_(min-width:680px)]:grid-cols-2")}><h4 className="font-heading text-3xl">{copy.faqTitle}</h4><div>{copy.faqs.map(f=><details key={f.q} className="group border-b border-border"><summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 py-3 text-sm [&::-webkit-details-marker]:hidden">{f.q}<ChevronDown size={16} className="shrink-0 group-open:rotate-180"/></summary><p className="pb-4 text-sm leading-relaxed">{f.a}</p></details>)}</div></section>}
    {layout > 0 && <section className={cn(gutter,"bg-primary py-10 text-primary-foreground")}><h4 className="font-heading text-3xl">{copy.newsletter}</h4><p className="mt-2 text-sm">{copy.newsletterBody}</p><form onSubmit={e=>{e.preventDefault();setJoined(true);}} className="mt-5 flex max-w-lg flex-wrap gap-2"><label className="min-w-0 flex-1"><span className="sr-only">{copy.email}</span><input type="email" required placeholder={copy.email} className="min-h-12 w-full bg-background px-4 text-heading"/></label><button type="submit" className={cn(button,"bg-heading text-background border-transparent")}>{copy.subscribe}</button></form>{joined&&<p role="status" className="mt-3 text-sm">{copy.subscribed}</p>}</section>}
  </div>;
}
