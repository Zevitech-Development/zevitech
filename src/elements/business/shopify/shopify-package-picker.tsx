"use client";

import { useId } from "react";

import { Check, ChevronDown, Plus, Layers3, Package, PenTool } from "lucide-react";

import ShopifyDeliveryEstimate from "./shopify-delivery-estimate";
import ShopifyPaymentSchedule from "./shopify-payment-schedule";
import {
  packagePickerCopy as copy,
  packagePickerHighlights,
} from "@/content/landing/shopify-package-picker-content";
import { shopifyDeliveryCopy } from "@/content/landing/shopify-delivery-content";
import type { ShopifyPackagePickerProps } from "@/interfaces/shopify-package-picker-interface";
import { cn } from "@/lib/utils";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function ShopifyPackagePicker({
  plans,
  selected,
  confirmed = true,
  onSelect,
  minimumIndex = 0,
  recommendedIndex,
  designName,
  onLockedSelect,
}: ShopifyPackagePickerProps) {
  const pickerId = useId();
  const chosenPlan = confirmed && Number.isInteger(selected) ? plans[selected] : null;

  return (
    <div className="space-y-5">
      <fieldset>
        <legend className="sr-only">{copy.label}</legend>
        <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {plans.map((plan, index) => {
            const highlights = packagePickerHighlights[plan.name];
            const isSelected = confirmed && selected === index;
            const cardId = `${pickerId}-${index}`;
            const level = highlights.visualLevel;
            const locked = index < minimumIndex;
            const recommended = !locked && recommendedIndex === index;
            return (
              <article key={plan.name} aria-label={`${plan.name} package`} className="relative min-w-0">
                {recommended && <span className="absolute -top-3 left-4 z-10 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">{copy.recommended}</span>}
                <input
                  type="radio"
                  name={`${pickerId}-package`}
                  value={plan.name}
                  checked={isSelected}
                  disabled={locked}
                  onChange={() => onSelect(index)}
                  aria-labelledby={`${cardId}-name ${cardId}-price`}
                  aria-describedby={`${cardId}-payment ${cardId}-summary`}
                  className="peer sr-only"
                />
                <div
                  className={cn(
                    "animation-standard flex min-w-0 flex-col rounded-2xl border bg-background p-4 text-left peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 md:p-5",
                    isSelected
                      ? "border-primary ring-1 ring-primary"
                      : locked ? "border-dashed border-border bg-mix-muted/40" : "border-border hover:border-primary hover:shadow-sm",
                  )}
                >
                  <span className={cn("relative mb-4 flex h-20 flex-col justify-between overflow-hidden rounded-xl p-4", level >= 4 ? "bg-heading text-background" : "bg-mix-primary/10 text-heading")}>
                    <span className="flex items-center justify-between gap-3">
                      <Layers3 aria-hidden="true" className={cn("h-6 w-6", level < 4 && "text-primary")} />
                      <span aria-hidden="true" className="flex gap-1.5">{Array.from({length:6},(_,step)=><span key={step} className={cn("h-1.5 w-4 rounded-full bg-current",step>level&&"opacity-20")} />)}</span>
                    </span>
                    <span className="mt-2 text-sm font-semibold leading-5">{highlights.audience}</span>
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
                  <span id={`${cardId}-payment`} className="[&>span]:min-h-12"><ShopifyPaymentSchedule total={plan.price} compact highlight className="mt-2" /></span>
                  <span id={`${cardId}-summary`} className="my-4 flex flex-1 flex-col gap-2.5 text-sm leading-5 text-paragraph">
                    <span className="min-h-12"><ShopifyDeliveryEstimate packageName={plan.name} /></span>
                    <span className="flex items-start gap-2">
                      <PenTool aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="min-h-8"><span className="sr-only">{copy.logo}: </span>{plan.logoConcepts === 1 ? copy.logoConceptSingle : copy.logoConcepts.replace("{count}", String(plan.logoConcepts))}</span>
                    </span>
                    <span className="flex items-start gap-2">
                      <Package aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span><span className="sr-only">{copy.products}: </span>{copy.productLimit.replace("{count}", String(plan.products))}</span>
                    </span>
                  </span>
                  <div className="mb-4 border-t border-border pt-3">
                    <p className="flex min-h-8 items-center text-xs font-semibold text-primary">{index === 0 ? copy.essentials : copy.inherits.replace("{package}", plans[index - 1].name)}</p>
                    <ul className="mt-1 space-y-1 text-sm leading-5 text-heading">
                      {highlights.features.map(feature => <li key={feature} className="flex min-h-8 items-start gap-2 py-1">
                        {index === 0 ? <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> : <Plus aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />}
                        <span>{feature}</span>
                      </li>)}
                    </ul>
                  </div>
                  {locked && onLockedSelect ? (
                    <span className="flex flex-col gap-2">
                      <span className="text-center text-xs text-paragraph">{copy.locked.replace("{design}", designName || "this design")}</span>
                      <button type="button" onClick={(event) => { event.preventDefault(); onLockedSelect(index); }}
                        className="relative z-20 flex min-h-11 items-center justify-center rounded-lg border border-primary bg-background px-3 py-2 text-sm font-semibold text-primary hover:bg-mix-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                        {copy.lockedAction.replace("{package}", plan.name)}
                      </button>
                    </span>
                  ) : (
                    <span className="flex flex-col gap-2">
                    <button type="button" onClick={() => onSelect(index)} disabled={locked} className={cn(
                      "flex min-h-11 items-center justify-center rounded-lg px-3 py-2 text-sm font-semibold focus-visible:ring-2 focus-visible:ring-primary",
                      isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-heading",
                    )}>
                      {locked ? copy.locked.replace("{design}", designName || "this design") : isSelected ? copy.selected : `${copy.choose} · ${plan.name}`}
                    </button>
                    </span>
                  )}
                  <details className="group mt-4 border-t border-border pt-2">
                    <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-2 rounded-lg text-sm font-semibold focus-visible:ring-2 focus-visible:ring-primary">
                      {copy.details}<ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-primary">{index === 0 ? copy.foundation : copy.included}</p>
                    <ul className="mt-3 space-y-3 text-sm leading-relaxed text-paragraph">{plan.features.map(feature => {
                      const upgraded = index > 0 && plan.additions.includes(feature);
                      const Icon = upgraded ? Plus : Check;
                      return <li key={feature} className="flex items-start gap-2"><Icon aria-hidden="true" className="mt-1 h-3.5 w-3.5 shrink-0 text-primary"/><span>{feature}{upgraded && <span className="mt-1 block text-xs font-semibold text-primary">{copy.upgraded}</span>}</span></li>;
                    })}</ul>
                    {index === 0 && <p className="mt-4 border-t border-border pt-3 text-xs leading-relaxed text-paragraph">{copy.basicScope}</p>}
                  </details>
                </div>
              </article>
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
