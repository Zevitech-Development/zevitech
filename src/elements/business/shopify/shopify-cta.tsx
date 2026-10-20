import { ArrowRight } from "lucide-react";
import { shopifySalesCtaContent } from "@/content/landing/shopify-sales-cta-content";
import { shopifyLandingSalesContent } from "@/content/landing/shopify-landing-sales-content";

export default function LandingCTASection() {
  const copy = shopifyLandingSalesContent.final;
  return (
    <section className="section-padding-standard">
      <div className="layout-standard">
        <div className="bg-pattern rounded-3xl px-5 py-10 text-center md:px-10 md:py-16">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/80">{copy.eyebrow}</p>
          <h2 className="mx-auto max-w-3xl font-heading text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">{copy.title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">{copy.description}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <a href={shopifySalesCtaContent.href} className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-primary px-5 py-3 font-semibold leading-snug text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{shopifySalesCtaContent.label}<ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0" /></a>
            <a href={shopifySalesCtaContent.packageHref} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/40 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{shopifySalesCtaContent.packageLabel}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
