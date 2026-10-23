"use client";

import { LockKeyhole } from "lucide-react";
import ShopifyDeliveryEstimate from "./shopify-delivery-estimate";
import ShopifyStudioSelect from "./shopify-studio-select";
import { shopifyCheckoutCopy as copy, shopifyCheckoutBillingFields } from "@/content/landing/shopify-checkout-content";
import { shopifyBillingDefaultCountry } from "@/content/landing/shopify-billing-countries";
import { studioPlans } from "@/content/landing/shopify-studio-content";
import type { ShopifyCheckoutPreviewProps } from "@/interfaces/shopify-checkout-interface";
import { shopifyBillingCountries, suggestShopifyBillingName } from "@/lib/shopify-billing-details";
import { getShopifyPaymentSchedule } from "@/lib/shopify-payment-schedule";

/** Review-only layout. No card inputs, order creation, provider script or events. */
export default function ShopifyCheckoutPreview({ brief, onEdit }: ShopifyCheckoutPreviewProps) {
  const plan = studioPlans.find((item) => item.name === brief.package.name);
  const payment = plan ? getShopifyPaymentSchedule(plan.price) : null;
  const formatAmount = (amount: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
  const billingName = suggestShopifyBillingName(brief.business.name);
  const fieldClass = "mt-2 min-h-12 w-full min-w-0 rounded-xl border border-border bg-muted px-3 py-3 text-sm text-paragraph";
  return <div className="space-y-5">
    <p role="status" className="rounded-xl border border-mix-primary/20 bg-mix-primary/5 p-4 text-sm leading-relaxed text-heading">{copy.previewNotice}</p>
    <div className="flex min-w-0 flex-wrap items-center justify-between gap-4 rounded-xl bg-muted p-4">
      <div><p className="font-semibold text-heading">{plan?.name}</p><p className="mt-1 text-xs text-paragraph">{copy.previewFee}</p></div>
      {plan && <strong className="font-heading text-3xl text-heading">${plan.price.toLocaleString()} USD</strong>}
      {payment && <dl className="basis-full space-y-3 border-t border-border pt-3">
        <div className="flex flex-wrap items-center justify-between gap-2"><dt className="text-sm font-semibold text-heading">{copy.upfront}</dt><dd className="font-heading text-3xl text-heading">{formatAmount(payment.upfront)} USD</dd></div>
        <div className="flex flex-wrap items-center justify-between gap-2"><dt className="text-sm text-paragraph">{copy.balance}</dt><dd className="font-semibold text-heading">{formatAmount(payment.balance)} USD</dd></div>
      </dl>}
      {plan && <ShopifyDeliveryEstimate packageName={plan.name} showNote className="basis-full" />}
    </div>
    <div className="flex min-w-0 flex-wrap items-start justify-between gap-3 rounded-xl border border-border p-4">
      <div className="min-w-0 space-y-1 text-sm"><p className="break-words font-semibold">{brief.business.name} · {brief.business.brand}</p><p className="break-all text-paragraph">{brief.business.email}</p><p className="text-paragraph">{brief.business.phone}</p></div>
      <button type="button" onClick={onEdit} className="min-h-11 rounded-lg px-2 text-sm font-semibold text-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-primary">{copy.previewEdit}</button>
    </div>
    <div><h4 className="font-semibold text-heading">{copy.previewBilling}</h4>
      <p className="mt-2 text-xs leading-relaxed text-paragraph">{copy.billingNameHint}</p>
      <div className="mt-3 grid min-w-0 gap-4 md:grid-cols-2">
        {shopifyCheckoutBillingFields.map(({ name, label }) => <label key={name} className="min-w-0 text-sm text-heading"><span>{label}</span><input disabled defaultValue={name === "firstName" ? billingName.firstName : name === "lastName" ? billingName.lastName : ""} placeholder="—" className={fieldClass}/></label>)}
        <label className="min-w-0 text-sm text-heading"><span>{copy.country}</span><ShopifyStudioSelect disabled defaultValue={shopifyBillingDefaultCountry} wrapperClassName="mt-2">{shopifyBillingCountries.map(({ code, name }) => <option key={code} value={code}>{name}</option>)}</ShopifyStudioSelect><span className="mt-2 block text-xs text-paragraph">{copy.countryHint}</span></label>
      </div>
    </div>
    <div><h4 className="flex items-center gap-2 font-semibold text-heading"><LockKeyhole className="h-4 w-4" aria-hidden="true"/>{copy.previewPayment}</h4>
      <div className="mt-4 text-sm"><p>{copy.cardNumber}</p><div className={fieldClass}>{copy.previewCard}</div></div>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm"><div><p>{copy.expiry}</p><div className={fieldClass}>{copy.previewExpiry}</div></div><div><p>{copy.securityCode}</p><div className={fieldClass}>{copy.previewSecurity}</div></div></div>
    </div>
    <button type="button" disabled className="min-h-12 w-full cursor-not-allowed rounded-xl bg-primary px-5 py-3 text-center font-semibold text-primary-foreground opacity-60">{payment ? `${copy.payUpfront} · ${formatAmount(payment.upfront)} USD` : copy.previewPay}</button>
  </div>;
}
