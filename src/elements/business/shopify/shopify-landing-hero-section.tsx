import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { shopifySalesCtaContent } from "@/content/landing/shopify-sales-cta-content";
import { shopifyLandingSalesContent } from "@/content/landing/shopify-landing-sales-content";
import ShopifyHeroPreview from "./shopify-hero-preview";
import ClutchIOIcon from "../../../../public/icons/clutch-io-icon.png";
import TrustpilotIcon from "../../../../public/icons/trustpilot-icon-01.svg";

export default function ShopifyLandingHeroSection() {
  const copy = shopifyLandingSalesContent.hero;
  return (
    <section className="bg-pattern pb-12 pt-36 md:pb-16 md:pt-40 lg:pb-24 lg:pt-44">
      <div className="layout-standard relative grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="relative z-10 min-w-0 space-y-6">
          <h1 className="break-words font-heading text-3xl font-bold leading-tight tracking-normal text-white xs:text-4xl md:text-5xl xl:text-6xl">
            {copy.before} <span className="inline-block max-w-full text-tertiary">{copy.highlight}</span>{" "}
            {copy.after.split(" ").map((word, index) => <Fragment key={`${word}-${index}`}>{index > 0 && " "}<span className="inline-block">{word}</span></Fragment>)}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">{copy.description}</p>
          <ul className="space-y-3 text-sm leading-relaxed text-white/90 md:text-base">
            {copy.benefits.map((benefit) => <li key={benefit} className="flex items-start gap-3"><Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-tertiary" /><span>{benefit}</span></li>)}
          </ul>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={shopifySalesCtaContent.href} className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-primary px-5 py-3 text-center font-semibold leading-snug text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              {shopifySalesCtaContent.label}<ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0" />
            </a>
            <a href={shopifySalesCtaContent.packageHref} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/40 px-5 py-3 text-center font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{shopifySalesCtaContent.packageLabel}</a>
          </div>
          <p className="text-sm leading-relaxed text-white/80">{copy.startingPrice}</p>
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <Link href="https://clutch.co/profile/zevitech" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"><Image src={ClutchIOIcon} alt="View Zevitech on Clutch" width={100} className="h-auto w-24 brightness-50 invert" /></Link>
            <Link href="https://www.trustpilot.com/review/zevitech.com" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"><Image src={TrustpilotIcon} alt="Read Zevitech reviews on Trustpilot" width={120} className="h-auto w-28" /></Link>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-2xl min-w-0">
          <ShopifyHeroPreview />
        </div>
      </div>
    </section>
  );
}
