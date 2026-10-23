"use client";

import Link from "next/link";
import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import { shopifyRestoredProofContent } from "@/content/landing/shopify-restored-proof-content";
import { OpenLiveChat } from "@/utils/open-live-chat";

export default function CustomerSatisfactionSection() {
  const copy = shopifyRestoredProofContent.contact;
  return (
    <section id="shopify-contact" aria-labelledby="shopify-contact-title" className="section-padding-standard">
      <div className="layout-standard grid gap-8 border-t border-border pt-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">{copy.eyebrow}</p>
          <h2 id="shopify-contact-title" className="font-heading text-3xl font-bold leading-tight text-heading md:text-4xl">{copy.title}</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-paragraph">{copy.description}</p>
        </div>
        <div className="min-w-0 space-y-4">
          <button type="button" onClick={OpenLiveChat} className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"><MessageCircle aria-hidden="true" className="h-5 w-5 shrink-0" />{copy.chat}</button>
          <div className="flex flex-col gap-1 md:flex-row md:flex-wrap md:gap-x-6">
            <a href={copy.phoneHref} className="inline-flex min-h-11 items-center gap-3 rounded text-sm font-medium text-heading underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"><Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />{copy.phone}</a>
            <a href={copy.emailHref} className="inline-flex min-h-11 items-center gap-3 rounded text-sm font-medium text-heading underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"><Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" /><span className="break-all">{copy.email}</span></a>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1 border-t border-border pt-3">
            <Link href={copy.trustpilotHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded text-sm text-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">{copy.trustpilot}<ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" /></Link>
            <Link href={copy.clutchHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded text-sm text-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">{copy.clutch}<ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
