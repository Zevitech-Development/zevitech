"use client";

import { useId } from "react";

import { Check, ChevronDown, Package, Pencil } from "lucide-react";

import ShopifyDeliveryEstimate from "./shopify-delivery-estimate";
import { shopifyOrderSummaryCopy as copy } from "@/content/landing/shopify-order-summary-content";
import { shopifyPackageSales } from "@/content/landing/shopify-package-sales";
import { getShopifyPaymentSchedule } from "@/lib/shopify-payment-schedule";
import type { ShopifyOrderSummaryProps } from "@/interfaces/shopify-order-summary-interface";

const PRICE_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default function ShopifyOrderSummary({
  plan,
  onChangePackage,
}: ShopifyOrderSummaryProps) {
  const id = useId();
  const payment = getShopifyPaymentSchedule(plan.price);
  const sales =
    shopifyPackageSales[plan.name as keyof typeof shopifyPackageSales];

  return (
    <section
      aria-labelledby={`${id}-package`}
      className="mb-6 overflow-hidden rounded-2xl border border-border bg-background"
    >
      <div className="p-4 md:p-5">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <p className="text-xs font-semibold tracking-wide text-primary">
            {copy.eyebrow}
          </p>
          <button
            type="button"
            onClick={onChangePackage}
            className="animation-standard -mr-2 inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-xs font-medium text-paragraph underline decoration-border underline-offset-4 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Pencil aria-hidden="true" className="h-3.5 w-3.5" />
            {copy.changePackage}
          </button>
        </div>

        <h4
          id={`${id}-package`}
          className="mt-1 font-heading text-3xl leading-tight text-heading"
        >
          {plan.name}
        </h4>
        {sales && (
          <p className="mt-2 text-sm leading-relaxed text-paragraph">
            {sales.outcome}
          </p>
        )}
        <p className="mt-3 text-sm leading-relaxed text-paragraph">
          {copy.designPreview}
        </p>

        <div className="mt-4 flex items-center gap-3 rounded-xl bg-muted p-3">
          <Package aria-hidden="true" className="h-5 w-5 shrink-0 text-primary" />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-paragraph">{copy.productSetup}</p>
            <p className="mt-0.5 text-sm font-semibold text-heading">
              {copy.upTo} {plan.products} {copy.products}
            </p>
          </div>
          <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-tertiary" />
        </div>

        <ShopifyDeliveryEstimate
          packageName={plan.name}
          showNote
          className="mt-3 rounded-xl border border-border p-3"
        />

        <details key={plan.name} open className="group mt-2">
          <summary className="animation-standard flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 rounded-lg text-sm font-medium text-heading hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
            {copy.inclusions}
            <ChevronDown
              aria-hidden="true"
              className="animation-standard h-4 w-4 shrink-0 group-open:rotate-180 motion-reduce:transition-none"
            />
          </summary>
          <ul className="space-y-2.5 pb-2 pt-1">
            {plan.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-sm leading-relaxed text-paragraph"
              >
                <Check
                  aria-hidden="true"
                  className="mt-1 h-3.5 w-3.5 shrink-0 text-tertiary"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </details>

        <div className="mt-2 border-t border-border pt-4">
          <p className="text-xs font-semibold text-heading">
            {copy.priceBreakdown}
          </p>
          <dl className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <dt className="text-sm text-paragraph">{copy.developmentFee}</dt>
            <dd>
              <p className="font-heading text-3xl leading-tight tracking-tight text-heading">
                {PRICE_FORMATTER.format(plan.price)}
              </p>
              <p className="mt-0.5 text-xs text-paragraph">{copy.oneTime}</p>
            </dd>
          </dl>
          <dl className="mt-4 space-y-3 rounded-xl border border-border bg-muted p-3">
            <div className="flex flex-wrap items-center justify-between gap-2"><dt className="text-sm font-semibold text-heading">{copy.upfront}</dt><dd className="font-heading text-2xl text-heading">{PRICE_FORMATTER.format(payment.upfront)}</dd></div>
            <div className="flex flex-wrap items-center justify-between gap-2"><dt className="text-sm text-paragraph">{copy.balance}</dt><dd className="font-semibold text-heading">{PRICE_FORMATTER.format(payment.balance)}</dd></div>
          </dl>
          <p className="mt-3 text-xs leading-relaxed text-paragraph">{copy.paymentPlan}</p>
          <p className="mt-3 text-xs leading-relaxed text-paragraph">
            {copy.exclusions}
          </p>
        </div>
      </div>

      <details className="group border-t border-border bg-muted px-4 md:px-5">
        <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 rounded-lg py-3 text-sm font-semibold text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden">
          {copy.nextTitle}
          <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none" />
        </summary>
        <p className="mt-1 text-xs leading-relaxed text-paragraph">
          {copy.nextIntro}
        </p>
        <ol className="mt-4 space-y-3 pb-5">
          {copy.nextSteps.map((stage, index) => (
            <li key={stage.title} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold text-primary"
              >
                {index + 1}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-6 text-heading">
                  {stage.title}
                </p>
                <p className="text-xs leading-relaxed text-paragraph">
                  {stage.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </details>
    </section>
  );
}
