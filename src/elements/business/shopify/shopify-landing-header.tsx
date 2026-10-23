"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { shopifySalesCtaContent } from "@/content/landing/shopify-sales-cta-content";
import { shopifyLandingSalesContent } from "@/content/landing/shopify-landing-sales-content";
import { OpenLiveChat } from "@/utils/open-live-chat";
import Logo from "../../../../public/favicon/logo-white.png";

export default function ShopifyLandingHeader() {
  const confirmation = usePathname()?.includes("/thank-you");
  const landingHref = (hash: string) => confirmation ? `/landing-pages/shopify-development${hash}` : hash;
  const copy = shopifyLandingSalesContent.header;
  return <header className={confirmation ? "relative z-40 bg-slate-950" : "absolute inset-x-0 top-0 z-40 border-b border-white/20"}>
    <nav aria-label="Shopify development" className="layout-standard flex min-h-24 items-center justify-between gap-3 py-4">
      <Link href="/" aria-label={copy.home} className="inline-flex min-h-11 shrink-0 items-center rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"><Image src={Logo} alt="Zevitech" priority width={140} className="h-auto w-24 md:w-32" /></Link>
      <div className="flex min-w-0 items-center gap-2 md:gap-3">
        <a href={landingHref(shopifySalesCtaContent.packageHref)} className="inline-flex min-h-11 min-w-0 items-center rounded-lg px-3 py-2 text-center text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">{copy.packages}</a>
        <a href={landingHref(shopifySalesCtaContent.href)} className="hidden min-h-11 items-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:inline-flex">{copy.explore}</a>
        <button type="button" onClick={OpenLiveChat} aria-label={copy.chat} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/40 text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"><MessageCircle aria-hidden="true" className="h-5 w-5" /></button>
      </div>
    </nav>
  </header>;
}
