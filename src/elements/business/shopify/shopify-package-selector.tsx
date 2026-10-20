"use client";

import { useId, useState } from "react";

import { ArrowRight, Check } from "lucide-react";

import ShopifyPaymentSchedule from "./shopify-payment-schedule";
import {
  shopifyPackageSales,
  shopifyPackageSalesCopy as copy,
} from "@/content/landing/shopify-package-sales";
import {
  packageFeatureNeeds,
  packageRecommendationCopy,
} from "@/content/landing/shopify-package-recommendation-content";
import { packageCardAdditionLimit, packageCardCopy } from "@/content/landing/shopify-package-card-content";
import type { ShopifyPackageSelectorProps } from "@/interfaces/shopify-package-selector-interface";
import { getShopifyPackageMatchCoverage } from "@/lib/shopify-package-recommendation";
import { getThemeTierByPackage } from "@/lib/shopify-theme-access";
import {
  getShopifyPackageShortlist,
  isShopifyPackageIndex,
} from "@/lib/shopify-package-shortlist";
import { cn } from "@/lib/utils";

const PRICE_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function ShopifyPackageSelector({
  plans,
  selected,
  started,
  onSelect,
  recommended,
  onExplore,
  productCount,
  featureIds,
}: ShopifyPackageSelectorProps) {
  const id = useId();
  const [showAll, setShowAll] = useState(false);
  const hasRecommendation = isShopifyPackageIndex(recommended, plans.length);
  const focusedIndices = getShopifyPackageShortlist(plans, recommended, selected);
  const canFocus = hasRecommendation && focusedIndices.length < plans.length;
  const visibleIndices = showAll ? plans.map((_, index) => index) : focusedIndices;
  const gridId = `${id}-packages`;

  return (
    <section
      aria-label={copy.label}
      className="space-y-5"
    >
      {canFocus && (
        <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-paragraph">
            {copy.focusedHelp}
          </p>
          <button
            type="button"
            aria-controls={gridId}
            aria-expanded={showAll}
            onClick={() => setShowAll((current) => !current)}
            className="animation-standard inline-flex min-h-12 shrink-0 items-center justify-center rounded-lg border border-primary px-4 py-3 text-sm font-semibold text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {showAll ? copy.showFocused : copy.showAll.replace("{count}", String(plans.length))}
          </button>
        </div>
      )}
      <p role="status" className="sr-only">
        {copy.showingPackages
          .replace("{visible}", String(visibleIndices.length))
          .replace("{total}", String(plans.length))}
      </p>
      <div
        id={gridId}
        className={cn(
          "grid grid-cols-1 gap-4 lg:gap-5",
          visibleIndices.length > 1 && "md:grid-cols-2",
          visibleIndices.length > 2 && "lg:grid-cols-3",
        )}
      >
        {visibleIndices.map((index) => {
          const plan = plans[index];
          const sales =
            shopifyPackageSales[plan.name as keyof typeof shopifyPackageSales];
          const isSelected = started && selected === index;
          const themeTier = getThemeTierByPackage(plan.name);
          const additions = plan.additions;
          const visibleAdditions = additions.slice(0, packageCardAdditionLimit);
          const titleId = `${id}-package-${index}`;
          const coverage = productCount !== undefined && featureIds !== undefined
            ? getShopifyPackageMatchCoverage(plans, index, productCount, featureIds)
            : null;
          const scopeGaps = coverage?.unmatchedFeatureIds
            .map((featureId) => packageFeatureNeeds.find((feature) => feature.id === featureId)?.label)
            .filter((label): label is NonNullable<typeof label> => Boolean(label)) ?? [];
          const missingScope: string[] = [...scopeGaps];

          if (coverage && !coverage.productsMatch) {
            const count = Number(productCount);
            const requested = packageRecommendationCopy.productCounts
              .find((option) => option.value === productCount)?.label
              ?? (productCount && /^[0-9]+$/.test(productCount.trim()) && Number.isSafeInteger(count) && count > 0
                ? String(count)
                : null);
            missingScope.unshift(requested
              ? copy.scopeProducts.replace("{requested}", requested).replace("{included}", String(plan.products))
              : copy.scopeProductsUnknown);
          }
          if (coverage?.unknownFeatureIds.length) missingScope.push(copy.scopeUnknownFeatures);

          return (
            <article
              key={plan.name}
              aria-labelledby={titleId}
              className={cn(
                "animation-standard flex h-full min-w-0 flex-col rounded-2xl border bg-background p-5 md:p-6 [overflow-wrap:anywhere]",
                isSelected
                  ? "border-primary ring-1 ring-primary shadow-md"
                  : "border-border hover:border-primary hover:shadow-md",
              )}
            >
              {hasRecommendation && (recommended === index ? (
                <p className="mb-3 rounded-lg bg-primary/10 px-3 py-2 text-xs font-semibold text-primary">
                  {packageRecommendationCopy.recommended}
                </p>
              ) : (
                <div aria-hidden="true" className="mb-3 hidden h-8 md:block" />
              ))}
              <div className="mb-2 flex min-h-5 flex-wrap items-center justify-between gap-2">
                <p className="min-w-0 text-xs font-semibold text-paragraph">
                  {sales?.category}
                </p>
                {isSelected && (
                  <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-primary">
                    <Check aria-hidden="true" className="h-3.5 w-3.5" />
                    {copy.selected}
                  </span>
                )}
              </div>

              <h3
                id={titleId}
                className="font-heading text-3xl leading-tight text-heading"
              >
                {plan.name}
              </h3>

              <p className="mb-5 mt-3 min-h-16 text-sm leading-relaxed text-paragraph">
                {sales?.outcome}
              </p>

              <div className="mb-5 border-b border-border pb-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-heading text-4xl leading-none tracking-tight text-heading">
                    {PRICE_FORMATTER.format(plan.price)}
                  </p>
                  <p className="mt-2 text-xs text-paragraph">{copy.oneTime}</p>
                </div>
                <p className="text-right text-xs leading-relaxed text-paragraph">
                  <span className="block text-sm font-semibold text-heading">
                    {copy.upTo} {plan.products}
                  </span>
                  {copy.products}
                </p>
                </div>
                <ShopifyPaymentSchedule total={plan.price} compact highlight className="mt-3" />
              </div>

              {coverage && (
                <div
                  className={cn(
                    "mb-5 rounded-xl border p-3",
                    coverage.matches ? "border-tertiary/30 bg-tertiary/5" : "border-border bg-muted/50",
                  )}
                >
                  <p id={`${titleId}-scope`} className="text-sm font-semibold text-heading">
                    {coverage.matches ? copy.matchesNeeds : copy.scopeToConfirm}
                  </p>
                  {missingScope.length > 0 && (
                    <ul className="mt-2 space-y-1 text-xs leading-relaxed text-paragraph">
                      {missingScope.slice(0, 2).map((need) => <li key={need}>{need}</li>)}
                    </ul>
                  )}
                  {missingScope.length > 2 && (
                    <details className="mt-2 text-xs leading-relaxed text-paragraph">
                      <summary className="cursor-pointer rounded font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                        {copy.moreScopeNeeds.replace("{count}", String(missingScope.length - 2))}
                      </summary>
                      <ul className="mt-2 space-y-1">
                        {missingScope.slice(2).map((need) => <li key={need}>{need}</li>)}
                      </ul>
                    </details>
                  )}
                </div>
              )}

              {themeTier && (
                <div className="mb-5 rounded-xl border border-border bg-secondary-background p-3">
                  <p className="text-sm font-semibold text-heading">{themeTier.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-paragraph">{themeTier.description}</p>
                  <p className="mt-3 text-xs font-semibold text-heading">{packageCardCopy.customization}</p>
                  <p className="mt-1 text-xs leading-relaxed text-paragraph">{themeTier.customization}</p>
                </div>
              )}
              <p className="mb-3 text-sm font-semibold text-heading">
                {plan.inheritedFrom
                  ? packageCardCopy.inherited.replace("{package}", plan.inheritedFrom)
                  : packageCardCopy.essentials}
              </p>
              <ul className="space-y-2.5">
                {visibleAdditions.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm leading-5 text-paragraph"
                  >
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-tertiary"
                      strokeWidth={2.5}
                    />
                    <span className="min-w-0">{feature}</span>
                  </li>
                ))}
              </ul>
              {additions.length > visibleAdditions.length && (
                <p className="mt-3 text-xs text-paragraph">
                  {packageCardCopy.additionalCount.replace("{count}", String(additions.length - visibleAdditions.length))}
                </p>
              )}
              <details className="mb-6 mt-4 rounded-lg border border-border p-3">
                <summary className="cursor-pointer rounded text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                  {packageCardCopy.fullScope}
                </summary>
                <p className="mt-3 text-xs leading-relaxed text-paragraph">{packageCardCopy.totalAllowances}</p>
                <ul className="mt-3 space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-xs leading-relaxed text-paragraph">
                      <Check aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-tertiary" />
                      <span className="min-w-0">{feature}</span>
                    </li>
                  ))}
                </ul>
              </details>

              {onExplore && <button
                type="button"
                onClick={() => onExplore(index)}
                aria-label={`${copy.explore}: ${plan.name}`}
                className="mb-3 mt-auto inline-flex min-h-12 w-full min-w-0 items-center justify-center rounded-lg border border-primary px-4 py-3 text-sm font-semibold text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {copy.explore}
              </button>}
              <button
                type="button"
                aria-pressed={isSelected}
                aria-describedby={coverage ? `${titleId}-scope` : undefined}
                onClick={() => onSelect(index)}
                className={cn("animation-standard inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2", !onExplore && "mt-auto")}
              >
                <span className="min-w-0">{copy.choose} {plan.name}</span>
                <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
              </button>

            </article>
          );
        })}
      </div>
    </section>
  );
}
