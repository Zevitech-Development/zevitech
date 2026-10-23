"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, MessageCircle, Printer } from "lucide-react";
import type { ShopifyCheckoutPublicOrder } from "@/interfaces/shopify-checkout-interface";
import type { ShopifyOrderConfirmationProps } from "@/interfaces/shopify-confirmation-interface";
import { shopifyConfirmationCopy as copy } from "@/content/landing/shopify-confirmation-content";
import { readCheckoutSession, requestShopifyCheckout } from "@/lib/shopify-checkout-client";
import { startShopifyCheckoutTracking } from "@/lib/shopify-checkout-analytics";
import { shopifyDeclineFeedback } from "@/lib/shopify-payment-feedback";
import { verifyShopifyPayment } from "@/lib/shopify-payment-verification";
import { cn } from "@/lib/utils";
import { OpenLiveChat } from "@/utils/open-live-chat";
import ShopifyDeliveryEstimate from "./shopify-delivery-estimate";

const money = (amount: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
export default function ShopifyOrderConfirmation({ previewOrder }: ShopifyOrderConfirmationProps = {}) {
  const isPreview = process.env.NODE_ENV === "development" && Boolean(previewOrder);
  const [order, setOrder] = useState<ShopifyCheckoutPublicOrder | null>(isPreview ? previewOrder! : null);
  const [busy, setBusy] = useState(!isPreview);
  const [error, setError] = useState("");
  const refresh = useCallback(async () => {
    if (isPreview) return;
    const session = readCheckoutSession();
    if (!session) { setError(copy.missingSession); setBusy(false); return; }
    setBusy(true); setError("");
    try { setOrder(await requestShopifyCheckout("status", session)); }
    catch { setError(copy.verificationError); }
    finally { setBusy(false); }
  }, [isPreview]);
  useEffect(() => { void refresh(); }, [refresh]);
  useEffect(() => {
    if (isPreview || !order || order.status !== "paid") return;
    return startShopifyCheckoutTracking(order, "confirmation");
  }, [isPreview, order]);
  useEffect(() => {
    if (isPreview || !order || !["pending", "processing"].includes(order.status)) return;
    const session = readCheckoutSession();
    if (!session) return;
    return verifyShopifyPayment(() => requestShopifyCheckout("status", session), setOrder, () => setError(copy.verificationError), order.verificationEndsAt);
  }, [isPreview, order?.id, order?.status]);
  const paid = order?.status === "paid";
  const historical = order?.paymentVersion === "upfront-40-v1";
  const approvalTerms = order?.paymentVersion === "upfront-10-v2";
  const buttonClass = "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 py-3 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
  return <main className="layout-standard py-10 md:py-16">
    <section className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-border bg-background shadow-sm" aria-live="polite">
      {isPreview && <p className="border-b border-border bg-muted px-5 py-3 text-center text-xs font-semibold text-heading">{copy.preview}</p>}
      <div className="p-5 sm:p-9">
        {busy && !order ? <p className="flex items-center gap-3"><Loader2 className="h-5 w-5 animate-spin"/>{copy.verifying}</p> : <>
          {paid && <CheckCircle2 className="mb-4 h-12 w-12 text-primary" aria-hidden="true"/>}
          <p className="mb-2 text-xs font-semibold tracking-wide text-primary">{order?.mode === "sandbox" && !isPreview ? copy.sandbox : copy.brand}</p>
          <h1 className="font-heading text-3xl text-heading sm:text-4xl">{paid ? copy.title : copy.pendingTitle}</h1>
          <p className="mt-3 text-sm leading-relaxed text-paragraph">{paid ? order.paymentStage === "upfront" ? historical ? copy.historicalApproved : approvalTerms ? copy.approvalTerms : copy.approved : copy.fullApproved : order?.status === "declined" ? shopifyDeclineFeedback(order.declineCode, order.gatewayIssue) : order && ["pending", "processing"].includes(order.status) ? copy.pending : copy.unverified}</p>
          {error && <p role="alert" className="mt-5 rounded-xl border border-destructive p-4 text-sm text-destructive">{error}</p>}
          {order && <div className="mt-6 rounded-2xl border border-border p-4 sm:p-5">
            <p className="text-xs text-paragraph">{copy.package}</p><h2 className="mt-1 font-heading text-2xl text-heading">{order.packageName}</h2>
            <dl className="mt-4 grid gap-4 border-y border-border py-4 sm:grid-cols-3">
              {[[copy.total, money(order.totalAmount)], [paid ? copy.received : copy.checkoutAmount, money(paid ? order.amountPaid : order.amount)], ...(order.paymentStage === "upfront" ? [[approvalTerms ? copy.approvalBalance : copy.balance, money(order.balanceAmount)]] : [])].map(([label, value]) => <div key={label} className="min-w-0"><dt className="text-xs text-paragraph">{label}</dt><dd className="mt-1 text-xl font-semibold tabular-nums text-heading">{value}<span className="ml-1 text-xs font-normal">USD</span></dd></div>)}
            </dl>
            <dl className="mt-4 space-y-2 text-xs">
              {[[copy.order, order.id], ...(paid && order.transactionId ? [[copy.transaction, order.transactionId]] : [])].map(([label, value]) => <div key={label} className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-5"><dt className="text-paragraph">{label}</dt><dd className="break-all font-medium text-heading sm:text-right">{value}</dd></div>)}
            </dl>
            {paid && order.paymentStage === "upfront" && <p className="mt-3 text-xs text-paragraph">{copy.noAutoCharge}</p>}
          </div>}
          {paid && <>
            <ShopifyDeliveryEstimate packageName={order.packageName} showNote className="mt-5 rounded-xl bg-muted p-4 text-sm"/>
            <h2 className="mt-6 font-heading text-2xl text-heading">{copy.next}</h2>
            <ol className="mt-4 space-y-4">
              {copy.steps.map((step, index) => <li key={step.title} className="flex gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-primary">{index + 1}</span><div><h3 className="text-sm font-semibold text-heading">{step.title}</h3><p className="mt-1 text-sm leading-relaxed text-paragraph">{index === 2 && approvalTerms ? copy.approvalNext : step.body}</p></div></li>)}
            </ol>
            <p className="mt-5 text-xs leading-relaxed text-paragraph">{copy.referenceNote}</p>
          </>}
          <div className="mt-6 grid gap-3 sm:grid-cols-2 print:hidden">
            {paid && <button onClick={() => window.print()} className={cn(buttonClass, "bg-primary text-primary-foreground hover:bg-primary-hover")}><Printer size={18} aria-hidden="true"/>{copy.print}</button>}
            <button onClick={OpenLiveChat} className={cn(buttonClass, "border border-border text-heading")}><MessageCircle size={18} aria-hidden="true"/>{copy.chat}</button>
          </div>
          <div className="mt-4 flex flex-wrap justify-between gap-4 text-xs print:hidden"><a href={copy.supportHref} className="inline-flex min-h-11 items-center text-primary underline underline-offset-4">{copy.support}</a><Link href={copy.landingHref} className="inline-flex min-h-11 items-center text-primary underline underline-offset-4">{paid ? copy.back : copy.returnCheckout}</Link></div>
        </>}
      </div>
    </section>
  </main>;
}
