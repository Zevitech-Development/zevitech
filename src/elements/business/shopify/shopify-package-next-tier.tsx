"use client";

import { ArrowUpRight, Check } from "lucide-react";
import ShopifyDeliveryEstimate from "./shopify-delivery-estimate";
import ShopifyPaymentSchedule from "./shopify-payment-schedule";
import { shopifyPackageOrder } from "@/content/landing/shopify-package-catalog";
import { shopifyNextTierBenefits, shopifyNextTierCopy as copy } from "@/content/landing/shopify-package-next-tier-content";
import type { ShopifyPackageNextTierProps } from "@/interfaces/shopify-package-next-tier-interface";
import { shopifyPackageMatchesNeeds } from "@/lib/shopify-package-recommendation";

const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

export default function ShopifyPackageNextTier({ plans, packageIndex, productCount, featureIds, onSelect }: ShopifyPackageNextTierProps) {
  const current = plans[packageIndex];
  if (!current || !shopifyPackageMatchesNeeds(plans, packageIndex, productCount, featureIds)) return null;
  const rank = shopifyPackageOrder.indexOf(current.name);
  const nextName = shopifyPackageOrder[rank + 1];
  if (rank < 0 || !nextName || nextName === "Beginner") return null;
  const nextIndex = plans.findIndex(plan => plan.name === nextName);
  const next = plans[nextIndex];
  if (!next || next.price <= current.price || !shopifyPackageMatchesNeeds(plans, nextIndex, productCount, featureIds)) return null;
  const details = shopifyNextTierBenefits[nextName];

  return <aside aria-label={`${copy.eyebrow}: ${next.name}`} className="mx-auto mt-5 max-w-3xl rounded-2xl border border-border bg-muted/40 p-5 md:p-6">
    <p className="text-xs font-semibold text-primary">{copy.eyebrow}</p>
    <h4 className="mt-2 font-heading text-2xl text-heading">{details.title}</h4>
    <p className="mt-3 text-sm font-semibold text-heading">{copy.includes.replace("{package}", current.name)}</p>
    <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-paragraph">
      {details.benefits.map(benefit => <li key={benefit} className="flex items-start gap-2"><Check size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" /><span>{benefit}</span></li>)}
    </ul>
    <div className="mt-5 flex flex-wrap items-start justify-between gap-4 border-t border-border pt-4">
      <div>
        <p className="text-xs text-paragraph">{copy.priceLabel}</p>
        <p className="mt-1 font-heading text-3xl text-heading">{money(next.price)}</p>
        <ShopifyPaymentSchedule total={next.price} compact highlight className="mt-2" />
        <p className="mt-1 text-xs text-paragraph">{copy.difference.replace("{price}", money(next.price - current.price)).replace("{package}", current.name)}</p>
      </div>
      <button type="button" onClick={() => onSelect(nextIndex)} className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-normal rounded-lg border border-primary bg-background px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
        {copy.action.replace("{package}", next.name).replace("{price}", money(next.price))}
        <ArrowUpRight size={17} aria-hidden="true" className="shrink-0" />
      </button>
    </div>
    <ShopifyDeliveryEstimate packageName={next.name} className="mt-4" />
    <p className="mt-3 text-xs leading-relaxed text-paragraph">{copy.note}</p>
  </aside>;
}
