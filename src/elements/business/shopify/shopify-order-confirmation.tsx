"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, Printer } from "lucide-react";
import type { ShopifyCheckoutPublicOrder } from "@/interfaces/shopify-checkout-interface";
import { readCheckoutSession, requestShopifyCheckout } from "@/lib/shopify-checkout-client";
import { trackShopifyCheckoutOrder } from "@/lib/shopify-checkout-analytics";
import { shopifyDeclineFeedback } from "@/lib/shopify-payment-feedback";
import ShopifyDeliveryEstimate from "./shopify-delivery-estimate";

const money = (amount: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
export default function ShopifyOrderConfirmation() {
  const [order, setOrder] = useState<ShopifyCheckoutPublicOrder | null>(null);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const refresh = useCallback(async () => {
    const session = readCheckoutSession();
    if (!session) { setError("Open your order confirmation in the same browser tab used for checkout. If you need help, contact our team with your order reference."); setBusy(false); return; }
    setBusy(true); setError("");
    try { setOrder(await requestShopifyCheckout("status", session)); }
    catch { setError("We couldn’t verify your payment status. Please check again before attempting another payment."); }
    finally { setBusy(false); }
  }, []);
  useEffect(() => { void refresh(); }, [refresh]);
  useEffect(() => {
    if (!order || order.status !== "paid") return;
    let attempts = 0;
    const timer = setInterval(() => { if (trackShopifyCheckoutOrder(order) || ++attempts >= 20) clearInterval(timer); }, 1000);
    return () => clearInterval(timer);
  }, [order]);
  const paid = order?.status === "paid";
  return <main className="layout-standard py-12 md:py-20">
    <section className="mx-auto max-w-3xl rounded-3xl border border-border bg-background p-5 shadow-sm sm:p-10" aria-live="polite">
      {busy && !order ? <p className="flex items-center gap-3"><Loader2 className="h-5 w-5 animate-spin"/>Verifying your payment…</p> : <>
        {paid && <CheckCircle2 className="mb-5 h-12 w-12 text-primary" aria-hidden="true"/>}
        <p className="mb-3 text-sm font-semibold text-primary">{order?.mode === "sandbox" ? "TEST ORDER · NO LIVE PAYMENT" : "ZEVITECH · SHOPIFY DEVELOPMENT"}</p>
        <h1 className="font-heading text-3xl text-heading sm:text-4xl">{paid ? "Thank you. Your project starts here." : "Check your payment status"}</h1>
        <p className="mt-4 leading-relaxed text-paragraph">{paid ? order.paymentStage === "upfront" ? "Your 40% upfront payment is confirmed and your project brief is saved. The remaining 60% is due after delivery." : "Your payment is confirmed and your project brief is saved." : order?.status === "declined" ? shopifyDeclineFeedback(order.declineCode) : order && ["pending", "processing"].includes(order.status) ? "We’re still confirming your payment. Please do not pay again. Use Check status below." : "A successful payment must be verified before an order confirmation can be shown."}</p>
        {error && <p role="alert" className="mt-5 rounded-xl border border-destructive p-4 text-sm text-destructive">{error}</p>}
        {order && <dl className="mt-7 space-y-4 rounded-2xl bg-muted p-5 text-sm">
          {[["Package", order.packageName], ["Full package price", `${money(order.totalAmount)} USD`], [paid ? "Payment received" : "Checkout amount", `${money(paid ? order.amountPaid : order.amount)} USD`], ...(order.paymentStage === "upfront" ? [["Balance after delivery", `${money(order.balanceAmount)} USD`]] : []), ["Order reference", order.id], ...(paid && order.transactionId ? [["Payment reference", order.transactionId]] : [])].map(([label, value]) => <div key={label} className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-5"><dt className="text-paragraph">{label}</dt><dd className="break-all font-semibold text-heading sm:text-right">{value}</dd></div>)}
        </dl>}
        {paid && <>
          <ShopifyDeliveryEstimate packageName={order.packageName} showNote className="mt-6 rounded-xl border border-border p-4"/>
          <h2 className="mt-8 font-heading text-2xl">What happens next</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-paragraph">
            <li>Our team reviews your selected design, business brief and package.</li>
            <li>We contact you using your submitted details to confirm the direction and collect your original images and brand files.</li>
            <li>We build your custom store and share it for review. Your remaining balance is due after delivery.</li>
          </ol>
          <p className="mt-4 text-sm text-paragraph">Your selected preview is a design reference. Your final store will be customized around your business and agreed package.</p>
        </>}
        <div className="mt-8 flex flex-wrap gap-3 print:hidden">
          {paid ? <button onClick={() => window.print()} className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground"><Printer size={18}/>Save / print confirmation</button> : <button onClick={() => void refresh()} disabled={busy} className="min-h-12 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground disabled:opacity-50">{busy ? "Checking…" : "Check status"}</button>}
          <a href="mailto:support@zevitech.com" className="inline-flex min-h-12 items-center rounded-xl border border-border px-5 py-3 font-semibold">Contact our team</a>
          <Link href="/landing-pages/shopify-development#studio" className="inline-flex min-h-12 items-center rounded-xl border border-border px-5 py-3 font-semibold">{paid ? "Back to Zevitech" : "Return to checkout"}</Link>
        </div>
      </>}
    </section>
  </main>;
}
