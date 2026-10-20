"use client";

import Image from "next/image";
import { useId } from "react";

import { Check, ChevronDown, Layers3, LayoutTemplate, Package, PenTool, ShoppingBag } from "lucide-react";

import ShopifyDeliveryEstimate from "./shopify-delivery-estimate";
import ShopifyPaymentSchedule from "./shopify-payment-schedule";
import {
  packagePickerCopy as copy,
  packagePickerHighlights,
} from "@/content/landing/shopify-package-picker-content";
import { studioTemplates } from "@/content/landing/shopify-studio-templates";
import { shopifyDeliveryCopy } from "@/content/landing/shopify-delivery-content";
import type { ShopifyPackagePickerProps } from "@/interfaces/shopify-package-picker-interface";
import { cn } from "@/lib/utils";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const motifImages = studioTemplates[0].images;

export default function ShopifyPackagePicker({
  plans,
  selected,
  confirmed = true,
  onSelect,
}: ShopifyPackagePickerProps) {
  const pickerId = useId();
  const chosenPlan = confirmed && Number.isInteger(selected) ? plans[selected] : null;

  return (
    <div className="space-y-5">
      <fieldset>
        <legend className="sr-only">{copy.label}</legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {plans.map((plan, index) => {
            const highlights = packagePickerHighlights[plan.name];
            const isSelected = confirmed && selected === index;
            const cardId = `${pickerId}-${index}`;
            const level = highlights.visualLevel;
            return (
              <label key={plan.name} className="relative block h-full min-w-0 cursor-pointer">
                <input
                  type="radio"
                  name={`${pickerId}-package`}
                  value={plan.name}
                  checked={isSelected}
                  onChange={() => onSelect(index)}
                  aria-labelledby={`${cardId}-name ${cardId}-price`}
                  aria-describedby={`${cardId}-payment ${cardId}-summary`}
                  className="peer absolute right-4 top-4 z-10 h-11 w-11 cursor-pointer opacity-0"
                />
                <span
                  className={cn(
                    "animation-standard flex h-full min-w-0 flex-col rounded-2xl border bg-background p-4 text-left peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 md:p-5",
                    isSelected
                      ? "border-primary ring-1 ring-primary"
                      : "border-border hover:border-primary hover:shadow-sm",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="relative mb-4 flex h-20 items-center overflow-hidden rounded-lg border border-border bg-muted px-3"
                  >
                    {level >= 3 && <span className="absolute inset-0 bg-primary opacity-10" />}
                    <span className={cn(
                      "relative flex h-16 w-full gap-2 rounded-md border border-border bg-background p-2",
                      level >= 4 && "mr-5 -rotate-2 shadow-sm",
                    )}>
                      <span className={cn("flex min-w-0 flex-1 flex-col justify-center gap-1.5", level === 2 && "order-2")}>
                        <span className="h-1.5 w-3/4 rounded-full bg-heading opacity-40" />
                        <span className="h-1 w-full rounded-full bg-heading opacity-20" />
                        <span className={cn("h-2.5 w-1/3 rounded-sm", level >= 1 ? "bg-primary" : "bg-heading opacity-40")} />
                      </span>
                      <span className={cn(
                        "grid flex-1 gap-1",
                        level >= 2 ? "grid-cols-2" : "grid-cols-1",
                      )}>
                        {Array.from({ length: level >= 2 ? (level >= 3 ? 4 : 2) : 1 }, (_, tile) => (
                          <span key={tile} className="relative min-h-0 overflow-hidden rounded-sm bg-muted">
                            <Image
                              src={motifImages[tile % motifImages.length]}
                              alt=""
                              fill
                              sizes="90px"
                              className="object-cover"
                            />
                          </span>
                        ))}
                      </span>
                      {level === 5 && <span className="flex w-3 flex-col gap-1 border-l border-border pl-1"><span className="h-2 rounded-sm bg-primary" /><span className="h-2 rounded-sm bg-primary opacity-40" /><span className="h-2 rounded-sm bg-primary opacity-40" /></span>}
                    </span>
                    {level >= 4 && <span className="absolute right-2 top-2 flex h-10 w-9 rotate-6 items-center justify-center rounded-md border border-primary bg-background shadow-sm"><Layers3 className="h-5 w-5 text-primary" /></span>}
                  </span>

                  <span className="flex flex-wrap items-center justify-between gap-2">
                    <span id={`${cardId}-name`} className="font-heading text-2xl text-heading">{plan.name}</span>
                    <span aria-hidden="true" className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                      isSelected ? "border-primary bg-primary text-primary-foreground" : "border-border",
                    )}>
                      {isSelected && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                    </span>
                  </span>
                  <span id={`${cardId}-price`} className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="font-heading text-3xl tracking-tight text-heading">{money.format(plan.price)}</span>
                    <span className="text-xs text-paragraph">{copy.oneTime}</span>
                  </span>
                  <span id={`${cardId}-payment`}><ShopifyPaymentSchedule total={plan.price} compact highlight className="mt-2" /></span>
                  <span id={`${cardId}-summary`} className="my-4 flex flex-1 flex-col gap-2.5 text-sm leading-5 text-paragraph">
                    <ShopifyDeliveryEstimate packageName={plan.name} />
                    <span className="flex items-start gap-2">
                      <PenTool aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span><span className="sr-only">{copy.logo}: </span>{plan.logoConcepts === 1 ? copy.logoConceptSingle : copy.logoConcepts.replace("{count}", String(plan.logoConcepts))}</span>
                    </span>
                    <span className="flex items-start gap-2">
                      <LayoutTemplate aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span><span className="sr-only">{copy.themes}: </span>{highlights.theme}</span>
                    </span>
                    <span className="flex items-start gap-2">
                      <ShoppingBag aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span><span className="sr-only">{copy.functionality}: </span>{highlights.functionality}</span>
                    </span>
                    <span className="flex items-start gap-2">
                      <Package aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span><span className="sr-only">{copy.products}: </span>{copy.productLimit.replace("{count}", String(plan.products))}</span>
                    </span>
                  </span>
                  <span className={cn(
                    "flex min-h-11 items-center justify-center rounded-lg px-3 py-2 text-sm font-semibold",
                    isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-heading",
                  )}>
                    {isSelected ? copy.selected : copy.choose}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <p className="text-xs leading-relaxed text-paragraph">{shopifyDeliveryCopy.timingNote}</p>
      <p className="text-sm leading-relaxed text-paragraph">{copy.cumulative}</p>
      <p className="sr-only" role="status" aria-live="polite">
        {chosenPlan ? copy.selectionStatus
          .replace("{package}", chosenPlan.name)
          .replace("{price}", money.format(chosenPlan.price)) : ""}
      </p>
      {chosenPlan && (
        <details key={chosenPlan.name} className="rounded-xl border border-border bg-background">
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:px-5">
            <span>{copy.includedTitle.replace("{package}", chosenPlan.name)}</span>
            <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
          </summary>
          <ul className="grid gap-x-6 gap-y-2 border-t border-border px-4 py-4 text-sm leading-relaxed text-paragraph md:grid-cols-2 md:px-5">
            {chosenPlan.features.map(feature => (
              <li key={feature} className="flex items-start gap-2">
                <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
