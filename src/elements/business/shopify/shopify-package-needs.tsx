"use client";

import { useId } from "react";
import { Check, Plus, ArrowRight, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ShopifyStudioSelect from "./shopify-studio-select";
import ShopifyDeliveryEstimate from "./shopify-delivery-estimate";
import ShopifyPaymentSchedule from "./shopify-payment-schedule";
import { shopifyDesignNeedsCopy as discoveryCopy, shopifyDesignFeaturedNeeds } from "@/content/landing/shopify-design-needs-content";
import { packageFeatureNeeds, packageFeatureNeedGroups, packageRecommendationCopy as journey } from "@/content/landing/shopify-package-recommendation-content";
import { packageUpgradeCopy as copy } from "@/content/landing/shopify-package-upgrade-content";
import { shopifyWizardCopy as wizard } from "@/content/landing/shopify-wizard-content";
import { studioCopy, studioPlans } from "@/content/landing/shopify-studio-content";
import { getShopifyLogoConceptSummary, shopifyLogoScopeCopy } from "@/content/landing/shopify-package-catalog";
import type { ShopifyPackageNeedsProps } from "@/interfaces/shopify-package-upgrade-interface";
import { findMatchingShopifyPackage, shopifyPackageMatchesNeeds } from "@/lib/shopify-package-recommendation";
import { cn } from "@/lib/utils";

const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
const actionClass = "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

export default function ShopifyPackageNeeds({ discovery = false, packageSelected = false, plans, packageIndex, productCount, featureIds, pending, notice, onChange, onConfirm, onCancel, onCompare }: ShopifyPackageNeedsProps) {
  const needsId = useId();
  const visibleFeatures = packageFeatureNeeds.filter(feature => !("isThemeAccess" in feature && feature.isThemeAccess));
  if (discovery) {
    const featured = visibleFeatures.filter(feature => (shopifyDesignFeaturedNeeds as readonly string[]).includes(feature.id));
    const additional = visibleFeatures.filter(feature => !(shopifyDesignFeaturedNeeds as readonly string[]).includes(feature.id));
    const selectedFeatures = visibleFeatures.filter(feature => featureIds.includes(feature.id));
    const activePackage = packageSelected && shopifyPackageMatchesNeeds(plans, packageIndex, "1", [])
      ? plans[packageIndex]
      : null;
    const activeCoversNeeds = !!activePackage && shopifyPackageMatchesNeeds(plans, packageIndex, productCount, featureIds);
    const matchPlans = activePackage ? plans : studioPlans;
    const matchIndex = findMatchingShopifyPackage(matchPlans, productCount, featureIds);
    const matchingPackage = activeCoversNeeds ? activePackage : matchIndex === null ? null : matchPlans[matchIndex];
    const inclusionPackage = matchingPackage;
    const includedInPackage = (feature: typeof visibleFeatures[number]) =>
      !!inclusionPackage && (feature.plans as readonly string[]).includes(inclusionPackage.name);
    const renderFeature = (feature: typeof visibleFeatures[number]) => {
      const minimumIndex = findMatchingShopifyPackage(studioPlans, "1", [feature.id]);
      const minimum = minimumIndex === null ? null : studioPlans[minimumIndex];
      const included = includedInPackage(feature);
      const requested = featureIds.includes(feature.id);
      const upgradeIndex = inclusionPackage && !included
        ? findMatchingShopifyPackage(matchPlans, productCount, Array.from(new Set([...featureIds, feature.id])))
        : null;
      const upgradePackage = upgradeIndex === null ? null : matchPlans[upgradeIndex];
      const inclusionLabel = inclusionPackage
        ? (included
          ? activePackage ? discoveryCopy.includedSelected : discoveryCopy.includedRecommended
          : discoveryCopy.notIncludedSelected).replace("{package}", inclusionPackage.name)
        : minimum
        ? (minimumIndex === 0 ? discoveryCopy.includedEverywhere
          : minimumIndex === studioPlans.length - 1 ? discoveryCopy.includedTopTier
            : discoveryCopy.includedFrom).replace("{package}", minimum.name)
        : copy.needsReview;
      const checked = included || requested;
      const featureId = `${needsId}-${feature.id}`;
      return <label key={feature.id} className={cn(
        "relative flex min-w-0 items-start gap-3 rounded-xl border bg-background p-4 animation-standard focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2",
        included ? "cursor-default" : "cursor-pointer hover:border-primary",
        checked ? "border-primary bg-mix-primary/5" : "border-border",
      )}>
        <input
          type="checkbox"
          name={`${needsId}-features`}
          value={feature.id}
          checked={checked}
          disabled={included}
          aria-labelledby={`${featureId}-label`}
          aria-describedby={`${featureId}-hint ${featureId}-inclusion`}
          onChange={event => { if (included) return; onChange(productCount, event.target.checked
            ? Array.from(new Set([...featureIds, feature.id]))
            : featureIds.filter(id => id !== feature.id)); }}
          className="mt-0.5 h-5 w-5 shrink-0 accent-primary disabled:cursor-default disabled:opacity-100"
        />
        <span className="block min-w-0">
          <span id={`${featureId}-label`} className="block text-sm font-semibold text-heading">{feature.label}</span>
          <span id={`${featureId}-hint`} className="mt-1 block text-xs leading-relaxed text-paragraph">{feature.id === "logo-design" && inclusionPackage
            ? `${getShopifyLogoConceptSummary(inclusionPackage.name)}. ${shopifyLogoScopeCopy.finalDelivery}.`
            : feature.hint}</span>
          <span id={`${featureId}-inclusion`} className="mt-3 block text-xs font-semibold text-primary">
            {inclusionLabel}
            {inclusionPackage && !included && <>
              {minimum && <span className="mt-1 block text-paragraph">{(minimumIndex === studioPlans.length - 1
                ? discoveryCopy.includedTopTier : discoveryCopy.includedFrom).replace("{package}", minimum.name)}</span>}
              <span className="mt-1 block text-paragraph">{upgradePackage
                ? (requested ? discoveryCopy.selectedUpgrade : discoveryCopy.selectUpgrade).replace("{package}", upgradePackage.name)
                : copy.needsReview}</span>
            </>}
          </span>
        </span>
      </label>;
    };

    return <div className="my-6 space-y-6">
      <fieldset>
        <legend className="font-semibold text-heading">{journey.productQuestion}</legend>
        <p className="mb-3 mt-1 text-sm leading-relaxed text-paragraph">{journey.productHint}</p>
        <ShopifyStudioSelect aria-label={journey.productQuestion} value={productCount} onChange={event => onChange(event.target.value, featureIds)}>
          {journey.productCounts.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
        </ShopifyStudioSelect>
      </fieldset>

      <div className="rounded-xl bg-muted p-4">
        <p className="flex items-start gap-2 text-sm font-semibold text-heading"><Check aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-primary" />{discoveryCopy.foundationTitle}</p>
        <p className="mt-2 text-sm leading-relaxed text-paragraph">{discoveryCopy.foundationBody}</p>
      </div>

      <fieldset className="space-y-4">
        <legend className="font-semibold text-heading">{discoveryCopy.title}</legend>
        <p className="text-sm leading-relaxed text-paragraph">{activePackage ? discoveryCopy.selectedPackageHelp : discoveryCopy.recommendedPackageHelp}</p>
        <div role="status" aria-live="polite" aria-atomic="true" className="rounded-xl border border-mix-primary/20 bg-mix-primary/5 p-4">
          {matchingPackage ? <>
            <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-primary">{activeCoversNeeds ? discoveryCopy.selectedTitle : activePackage ? discoveryCopy.upgradeTitle : discoveryCopy.matchTitle}</p>
                <p className="mt-1 font-heading text-2xl text-heading">{discoveryCopy.matchPackage.replace("{package}", matchingPackage.name)}</p>
              </div>
              <div>
                <p className="text-xs text-paragraph">{discoveryCopy.matchPriceLabel}</p>
                <p className="mt-1 text-2xl font-semibold tabular-nums text-heading">{money(matchingPackage.price)}</p>
              </div>
            </div>
            <ShopifyPaymentSchedule total={matchingPackage.price} compact className="mt-3" />
            <p className="mt-3 text-sm leading-relaxed text-paragraph">{activePackage && !activeCoversNeeds
              ? discoveryCopy.upgradeDescription.replace("{current}", activePackage.name)
              : discoveryCopy.matchDescription}</p>
            <p className="mt-1 text-xs leading-relaxed text-paragraph">{discoveryCopy.priceNote}</p>
            <ShopifyDeliveryEstimate packageName={matchingPackage.name} className="mt-3 border-t border-border pt-3" />
          </> : <>
            <p className="text-sm font-semibold text-heading">{discoveryCopy.unmatchedTitle}</p>
            <p className="mt-1 text-sm leading-relaxed text-paragraph">{discoveryCopy.unmatchedDescription}</p>
          </>}
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-heading">{discoveryCopy.commonTitle}</h4>
          <div className="grid gap-3 md:grid-cols-2">{featured.map(renderFeature)}</div>
        </div>
        <div className="space-y-3">
          {packageFeatureNeedGroups.map(group => {
            const features = additional.filter(feature => feature.group === group.id);
            if (!features.length) return null;
            const selectedCount = features.filter(feature => featureIds.includes(feature.id)).length;
            const includedCount = features.filter(includedInPackage).length;
            const requestedCount = features.filter(feature => !includedInPackage(feature) && featureIds.includes(feature.id)).length;
            return <details key={group.id} className="rounded-xl border border-border p-4">
              <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-3 text-sm font-semibold text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <span>{group.label}{inclusionPackage ? <>
                  {includedCount > 0 && <span className="ml-2 text-xs font-normal text-primary">{discoveryCopy.includedCount.replace("{count}", String(includedCount))}</span>}
                  {requestedCount > 0 && <span className="ml-2 text-xs font-normal text-primary">{discoveryCopy.requestedCount.replace("{count}", String(requestedCount))}</span>}
                </> : selectedCount > 0 && <span className="ml-2 text-xs font-normal text-primary">{discoveryCopy.selected.replace("{count}", String(selectedCount))}</span>}</span>
                <Plus size={16} aria-hidden="true" className="shrink-0" />
              </summary>
              <p className="mb-3 text-xs leading-relaxed text-paragraph">{group.hint}</p>
              <div className="grid gap-3 md:grid-cols-2">{features.map(renderFeature)}</div>
            </details>;
          })}
        </div>
      </fieldset>

      <div className="space-y-3 border-t border-border pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p role="status" aria-live="polite" className="text-sm text-paragraph">{activePackage
            ? selectedFeatures.length ? discoveryCopy.featureRequests.replace("{count}", String(selectedFeatures.length)) : discoveryCopy.noFeatureRequests
            : selectedFeatures.length
            ? discoveryCopy.selected.replace("{count}", String(selectedFeatures.length))
            : discoveryCopy.noneSelected}</p>
          <button
            type="button"
            disabled={selectedFeatures.length === 0}
            onClick={() => onChange(productCount, featureIds.filter(id => !visibleFeatures.some(feature => feature.id === id)))}
            className={cn(actionClass, "border border-border text-heading disabled:cursor-not-allowed disabled:opacity-50")}
          >{discoveryCopy.noExtras}</button>
        </div>
        {selectedFeatures.length > 0 && <ul className="flex flex-wrap gap-2 text-xs text-paragraph">{selectedFeatures.map(feature => <li key={feature.id} className="rounded-lg bg-muted px-3 py-2">{feature.label}</li>)}</ul>}
        <p className="text-sm font-semibold text-heading">{activePackage ? discoveryCopy.selectedSelectionNote : discoveryCopy.selectionNote}</p>
        {notice && <p role="status" aria-live="polite" className="text-sm text-primary">{notice}</p>}
      </div>
    </div>;
  }

  const current = plans[packageIndex];
  const removableIds = featureIds.filter(id => !id.startsWith("theme-"));
  const covered = visibleFeatures.filter(feature => (feature.plans as readonly string[]).includes(current.name));
  const extras = visibleFeatures.filter(feature => !(feature.plans as readonly string[]).includes(current.name));
  const proposed = pending ? plans[pending.packageIndex] : null;
  const extraFeatures = proposed?.features.filter(feature => !current.features.includes(feature)) ?? [];

  return <div className="my-6 space-y-6">
    <fieldset>
      <legend className="font-semibold text-heading">{journey.productQuestion}</legend>
      <p className="mb-3 mt-1 text-sm leading-relaxed text-paragraph">{journey.productHint}</p>
      <ShopifyStudioSelect aria-label={journey.productQuestion} value={productCount} onChange={event => onChange(event.target.value, featureIds)}>
        {journey.productCounts.map(option => <option key={option.value} value={option.value}>{option.label}{Number(option.value) <= current.products ? ` — ${copy.productIncluded}` : ""}</option>)}
      </ShopifyStudioSelect>
    </fieldset>

    <details className="rounded-xl border border-border p-4">
      <summary className="min-h-11 content-center cursor-pointer text-sm font-semibold">{wizard.includedScope}</summary>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><p className="text-xs font-semibold text-primary">{copy.current}</p><p className="mt-1 font-heading text-2xl text-heading">{current.name} · {money(current.price)}</p><p className="mt-1 text-xs text-paragraph">{copy.oneTime}</p><ShopifyPaymentSchedule total={current.price} compact className="mt-2" /></div>
        <button type="button" onClick={onCompare} className={cn(actionClass, "border border-primary bg-background text-primary")}>{copy.compare}</button>
      </div>
      <h4 className="mt-5 font-semibold text-heading">{copy.included}</h4>
      <p className="mt-1 text-sm leading-relaxed text-paragraph">{copy.includedBody}</p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {copy.foundation.map(feature => <li key={feature} className="flex min-w-0 items-start gap-2 text-sm text-heading"><Check aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-primary" /><span>{feature}</span></li>)}
        {covered.map(feature => <li key={feature.id} className="flex min-w-0 items-start gap-2 text-sm text-heading"><Check aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-primary" /><span>{feature.label}</span></li>)}
      </ul>
      <details className="mt-3">
        <summary className="flex min-h-11 cursor-pointer items-center text-sm font-semibold text-primary">{copy.includedScope}</summary>
        <ul className="space-y-2 text-sm text-paragraph">{current.features.map(feature => <li key={feature} className="flex gap-2"><Check aria-hidden="true" size={16} className="mt-0.5 shrink-0" /><span>{feature}</span></li>)}</ul>
      </details>
    </details>

    <details className="rounded-xl border border-border p-4">
      <summary className="min-h-11 content-center cursor-pointer font-semibold text-sm">{wizard.optionalFeatures}</summary>
      <p className="mt-2 text-sm leading-relaxed text-paragraph">{extras.length ? copy.extrasBody : copy.fullBody}</p>
      <div className="mt-4 space-y-3">
        {packageFeatureNeedGroups.map(group => {
          const features = extras.filter(feature => feature.group === group.id);
          if (!features.length) return null;
          return <details key={group.id} className="rounded-xl border border-border p-3">
            <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-3 text-sm font-semibold"><span>{group.label}</span><Plus size={16} aria-hidden="true" /></summary>
            <p className="mb-3 text-xs text-paragraph">{group.hint}</p>
            <div className="space-y-3">{features.map(feature => {
              const target = findMatchingShopifyPackage(plans, productCount, Array.from(new Set([...featureIds, feature.id])));
              const targetPlan = target === null ? null : plans[target];
              const delta = targetPlan ? targetPlan.price - current.price : 0;
              return <div key={feature.id} className="min-w-0 rounded-xl border border-border bg-background p-3">
                <p className="text-sm font-semibold text-heading">{feature.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-paragraph">{feature.hint}</p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs leading-relaxed text-paragraph">{targetPlan ? <>{copy.from} {targetPlan.name}<strong className="block font-semibold text-heading">+{money(Math.max(0, delta))} {copy.additional}</strong></> : copy.needsReview}</span>
                  <button type="button" aria-label={`${copy.add}: ${feature.label}`} disabled={!targetPlan} onClick={() => onChange(productCount, Array.from(new Set([...featureIds, feature.id])))} className={cn(actionClass, "shrink-0 border border-primary text-primary disabled:cursor-not-allowed disabled:opacity-50")}><Plus size={16} aria-hidden="true" />{copy.add}</button>
                </div>
              </div>;
            })}</div>
          </details>;
        })}
      </div>
    </details>

    {removableIds.length > 0 && <details className="rounded-xl border border-border p-3">
      <summary className="flex min-h-11 cursor-pointer items-center font-semibold text-sm">{copy.selectedNeeds} ({removableIds.length})</summary>
      <ul className="space-y-2">{removableIds.map(id => <li key={id} className="flex items-center justify-between gap-2 text-sm"><span>{packageFeatureNeeds.find(feature => feature.id === id)?.label || id}</span><button type="button" onClick={() => onChange(productCount, featureIds.filter(value => value !== id))} aria-label={`${copy.remove}: ${packageFeatureNeeds.find(feature => feature.id === id)?.label || id}`} className={cn(actionClass, "shrink-0 text-paragraph")}><X size={16} aria-hidden="true" /></button></li>)}</ul>
      <p className="mt-2 text-xs leading-relaxed text-paragraph">{copy.removeNote}</p>
    </details>}
    <p role="status" aria-live="polite" className="text-sm text-primary">{notice}</p>

    <Dialog open={pending !== null} onOpenChange={open => { if (!open) onCancel(); }}>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-2xl p-5 sm:p-6 [&>button]:h-11 [&>button]:w-11">
        <DialogHeader><DialogTitle>{copy.dialogTitle}</DialogTitle><DialogDescription>{copy.dialogBody}</DialogDescription></DialogHeader>
        {pending && proposed && <>
          <dl className="space-y-3 rounded-xl border border-border p-4 text-sm">
            <div className="flex flex-wrap justify-between gap-2"><dt>{copy.currentTotal}</dt><dd>{current.name} · {money(current.price)}</dd></div>
            <div className="flex flex-wrap justify-between gap-2"><dt>{copy.nextTotal}</dt><dd className="font-semibold">{proposed.name} · {money(proposed.price)}</dd></div>
            <div className="flex flex-wrap justify-between gap-2 border-t border-border pt-3"><dt>{copy.difference}</dt><dd className="font-semibold text-primary">+{money(pending.difference)}</dd></div>
          </dl>
          <ShopifyPaymentSchedule total={proposed.price} />
          <details><summary className="flex min-h-11 cursor-pointer items-center font-semibold text-sm">{copy.newScope}</summary><ul className="mt-2 space-y-2 text-sm text-paragraph">{extraFeatures.map(feature => <li key={feature}>{feature}</li>)}</ul></details>
          <p className="text-xs leading-relaxed text-paragraph">{studioCopy.billing}</p>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={onCancel} className={cn(actionClass, "border border-border text-heading")}>{copy.cancel}</button>
            <button type="button" onClick={onConfirm} className={cn(actionClass, "bg-primary text-primary-foreground")}>{copy.confirm}<ArrowRight size={16} aria-hidden="true" /></button>
          </div>
        </>}
      </DialogContent>
    </Dialog>
  </div>;
}
