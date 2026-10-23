import { shopifyLandingSalesContent } from "@/content/landing/shopify-landing-sales-content";

export default function ProcessSection() {
  const copy = shopifyLandingSalesContent.process;
  return (
    <section className="section-padding-standard bg-secondary-background">
      <div className="layout-standard">
        <div className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">{copy.eyebrow}</p>
          <h2 className="font-heading text-3xl font-bold leading-tight text-heading md:text-4xl lg:text-5xl">{copy.title}</h2>
        </div>
        <ol className="grid gap-4 lg:grid-cols-3">
          {copy.steps.map((step) => <li key={step.number} className="min-w-0 rounded-2xl border border-border bg-card p-6 md:p-8"><span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-mix-primary/10 text-lg font-semibold text-primary">{step.number}</span><h3 className="mb-3 font-heading text-2xl text-heading">{step.title}</h3><p className="text-base leading-relaxed text-paragraph">{step.description}</p></li>)}
        </ol>
      </div>
    </section>
  );
}
