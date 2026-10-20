"use client";
import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { InformationSectionContent } from "@/content/landing/shopify-landing-page-content";
import { shopifyLandingSalesContent } from "@/content/landing/shopify-landing-sales-content";
import { shopifyBuyingJourneyCopy as journey } from "@/content/landing/shopify-buying-journey-content";
import { cn } from "@/lib/utils";

export default function InformationSection() {
  const copy = shopifyLandingSalesContent.featureExamples;
  const [active, setActive] = useState(0);
  const id = useId();
  const selected = journey.groups[active];
  const featureCards = selected.features.map(number => copy.items.find(item => item.number === number)!).map((item) => {
    const illustration = InformationSectionContent.find((feature) => feature.infoNo === item.number);
    return (
      <article key={item.number} className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card">
        {illustration && <div className="relative aspect-[4/3] overflow-hidden border-b border-border bg-background"><Image src={illustration.img} alt={item.title} fill sizes="(min-width:1024px) 30vw, (min-width:768px) 45vw, 90vw" className="object-contain" /></div>}
        <div className="flex flex-1 flex-col p-5 md:p-6">
          <h3 className="mb-3 font-heading text-2xl leading-tight text-heading">{item.title}</h3>
          <p className="mb-5 text-base leading-relaxed text-paragraph">{item.description}</p>
          <ul className="mt-auto space-y-2 text-sm leading-relaxed text-paragraph">{item.features.map((feature) => <li key={feature} className="flex items-start gap-2"><Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{feature}</span></li>)}</ul>
        </div>
      </article>
    );
  });
  return (
    <section className="section-padding-standard bg-secondary-background">
      <div className="layout-standard">
        <div className="mx-auto mb-8 max-w-4xl text-center md:mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">{journey.eyebrow}</p>
          <h2 className="font-heading text-3xl font-bold leading-tight text-heading md:text-4xl lg:text-5xl">{journey.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-paragraph md:text-lg">{journey.intro}</p>
          <p className="mt-4 rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground">{copy.scope}</p>
        </div>
        <div role="group" aria-label={journey.label} className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          {journey.groups.map((group, index) => <button key={group.id} type="button" aria-pressed={active === index} aria-controls={`${id}-features`} onClick={() => setActive(index)} className={cn("min-h-12 rounded-xl border px-3 py-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-safe:transition-colors", active === index ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-heading hover:border-primary")}>{group.title}</button>)}
        </div>
        <div id={`${id}-features`}>
          <div className="mb-6 max-w-3xl" role="status"><h3 className="font-heading text-2xl text-heading">{selected.question}</h3><p className="mt-2 text-paragraph leading-relaxed">{selected.body}</p></div>
          <div className="grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">{featureCards}</div>
        </div>
        <div className="mt-7 text-center"><Link href="#studio" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">{journey.action}<ArrowRight size={18} aria-hidden="true" /></Link></div>
      </div>
    </section>
  );
}
