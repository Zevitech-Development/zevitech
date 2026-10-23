import Image from "next/image";
import { Check } from "lucide-react";
import { shopifyLandingSalesContent } from "@/content/landing/shopify-landing-sales-content";
import WhyChooseUsImage from "../../../../public/images/why-choose-us-img.png";

export default function WhyChooseUsSection() {
  const copy = shopifyLandingSalesContent.service;
  return (
    <section className="section-padding-standard">
      <div className="layout-standard grid gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="min-w-0"><p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">{copy.eyebrow}</p><h2 className="font-heading text-3xl font-bold leading-tight text-heading md:text-4xl lg:text-5xl">{copy.title}</h2><Image src={WhyChooseUsImage} alt={copy.imageAlt} sizes="(min-width: 1024px) 420px, (min-width: 480px) 380px, 85vw" className="mx-auto mt-8 h-auto w-full max-w-sm lg:mx-0 lg:max-w-md" /></div>
        <div className="space-y-6">
          {copy.items.map((item) => <div key={item.title} className="flex items-start gap-4"><Check aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-primary" /><div className="min-w-0"><h3 className="mb-2 font-heading text-2xl text-heading">{item.title}</h3><p className="text-base leading-relaxed text-paragraph">{item.description}</p></div></div>)}
        </div>
      </div>
    </section>
  );
}
