import { Plus } from "lucide-react";
import { shopifyLandingSalesContent } from "@/content/landing/shopify-landing-sales-content";

export default function ShopifyLandingFaq() {
  const copy = shopifyLandingSalesContent.faq;
  return <section className="section-padding-standard bg-secondary-background"><div className="layout-standard grid items-start gap-8 lg:grid-cols-3 lg:gap-12"><div><p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">{copy.eyebrow}</p><h2 className="font-heading text-3xl font-bold leading-tight text-heading md:text-4xl">{copy.title}</h2></div><div className="space-y-3 lg:col-span-2">{copy.items.map((item) => <details key={item.id} className="group rounded-xl border border-border bg-card"><summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-xl p-5 text-base font-semibold leading-relaxed text-heading focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden"><span>{item.question}</span><Plus aria-hidden="true" className="h-5 w-5 shrink-0 transition-transform group-open:rotate-45 motion-reduce:transition-none" /></summary><p className="px-5 pb-5 text-base leading-relaxed text-paragraph">{item.answer}</p></details>)}</div></div></section>;
}
