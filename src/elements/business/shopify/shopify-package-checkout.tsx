"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CheckCircle2, Loader2, LockKeyhole } from "lucide-react";
import ShopifyDeliveryEstimate from "./shopify-delivery-estimate";
import ShopifyStudioSelect from "./shopify-studio-select";
import { shopifyCheckoutCopy as copy, shopifyCheckoutBillingFields } from "@/content/landing/shopify-checkout-content";
import { shopifyBillingDefaultCountry } from "@/content/landing/shopify-billing-countries";
import type { ShopifyCheckoutConfig, ShopifyCheckoutPublicOrder, ShopifyPackageCheckoutProps } from "@/interfaces/shopify-checkout-interface";
import { clearCheckoutSession, createCheckoutSession, readCheckoutSession, readShopifyCheckoutConfig, requestShopifyCheckout, type CheckoutBrowserSession } from "@/lib/shopify-checkout-client";
import { ShopifyCheckoutBillingSchema, ShopifyCheckoutBriefSchema } from "@/schemas/shopify-checkout-schema";
import { readShopifyCheckoutAttribution } from "@/lib/shopify-checkout-attribution-client";
import { trackShopifyCheckoutOrder } from "@/lib/shopify-checkout-analytics";
import { shopifyBillingCountries, suggestShopifyBillingName } from "@/lib/shopify-billing-details";
import ShopifyCheckoutPreview from "./shopify-checkout-preview";

type NmiWindow = Window & { CollectJS?: { configure: (options: Record<string, unknown>) => void; startPaymentRequest: () => void; clearInputs: () => void } };
const inputClass = "min-h-12 w-full min-w-0 rounded-xl border border-border bg-background px-3 py-3 text-base text-heading outline-none focus-visible:ring-2 focus-visible:ring-primary";
const buttonClass = "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-center font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

export default function ShopifyPackageCheckout({ brief, onValidate, onReviewRequirements }: ShopifyPackageCheckoutProps) {
  const [config, setConfig] = useState<ShopifyCheckoutConfig | null>(null);
  const [order, setOrder] = useState<ShopifyCheckoutPublicOrder | null>(null);
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [fingerprint, setFingerprint] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [paymentTermsChanged, setPaymentTermsChanged] = useState(false);
  const checkoutHeading = useRef<HTMLHeadingElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const session = useRef<CheckoutBrowserSession | null>(null);
  const paying = useRef(false);
  const tokenCallback = useRef<(token: string) => void>(() => undefined);
  const parsedBrief = ShopifyCheckoutBriefSchema.safeParse(brief);
  const canonicalBrief = parsedBrief.success ? JSON.stringify(parsedBrief.data) : "";
  const billingName = suggestShopifyBillingName(brief.business.name);

  useEffect(() => {
    if (!order) return;
    let timer: ReturnType<typeof setTimeout>;
    let attempts = 0;
    const sendWhenReady = () => {
      if (!trackShopifyCheckoutOrder(order) && attempts++ < 20) timer = setTimeout(sendWhenReady, 1000);
    };
    sendWhenReady();
    return () => clearTimeout(timer);
  }, [order]);

  useEffect(() => {
    let active = true;
    setFingerprint("");
    if (canonicalBrief) crypto.subtle.digest("SHA-256", new TextEncoder().encode(canonicalBrief)).then((hash) => {
      if (active) setFingerprint(Array.from(new Uint8Array(hash), (byte) => byte.toString(16).padStart(2, "0")).join(""));
    });
    return () => { active = false; };
  }, [canonicalBrief]);

  useEffect(() => {
    let active = true;
    readShopifyCheckoutConfig().then(async (value) => {
      if (!active) return;
      setConfig(value);
      if (!value.available) return;
      const recovered = readCheckoutSession();
      if (recovered) {
        session.current = recovered;
        try {
          const saved = await requestShopifyCheckout("status", recovered);
          if (saved.status === "cancelled") { clearCheckoutSession(); session.current = null; }
          else if (active) setOrder(saved);
        } catch (cause) {
          if (cause instanceof Error && cause.message === "ORDER_NOT_FOUND") { clearCheckoutSession(); session.current = null; }
          else if (active) setError(copy.failed);
        }
      }
    }).catch(() => active && setConfig({ available: false, mode: "sandbox" }));
    return () => { active = false; };
  }, []);

  const submitToken = useCallback(async (paymentToken: string) => {
    if (!session.current || !order || !paying.current) return;
    if (!fingerprint || fingerprint !== order.briefFingerprint) { setError(copy.changed); setBusy(false); paying.current = false; return; }
    const fields = new FormData(form.current!);
    const billing = Object.fromEntries(["firstName", "lastName", "address", "city", "state", "postalCode", "country"].map((key) => [key, String(fields.get(key) || "").trim()]));
    try {
      const result = await requestShopifyCheckout("pay", { ...session.current, paymentToken, billing, briefFingerprint: fingerprint, acceptedTerms: true });
      setOrder(result);
      setError(result.status === "declined" ? copy.declined : "");
      (window as NmiWindow).CollectJS?.clearInputs();
    } catch (cause) {
      const code = cause instanceof Error ? cause.message : "";
      if (code === "PAYMENT_TERMS_CHANGED") { setPaymentTermsChanged(true); setError(copy.paymentTermsChanged); }
      else if (["INVALID_DETAILS", "CHECKOUT_BRIEF_CHANGED", "CHECKOUT_CANCELLED", "PAYMENT_RETRY_BLOCKED"].includes(code)) setError(code === "CHECKOUT_BRIEF_CHANGED" ? copy.changed : copy.invalid);
      else { setOrder((current) => current ? { ...current, status: "pending" } : current); setError(copy.failed); }
    }
    finally { setBusy(false); paying.current = false; }
  }, [order, fingerprint]);
  useEffect(() => { tokenCallback.current = submitToken; }, [submitToken]);

  const legacyUncharged = Boolean(order?.paymentStage === "full" && ["created", "declined"].includes(order.status));
  const needsCard = Boolean(order && !legacyUncharged && !paymentTermsChanged && fingerprint === order.briefFingerprint && ["created", "declined"].includes(order.status));
  useEffect(() => {
    if (!needsCard || !config?.available || !config.tokenizationKey || !config.scriptUrl) return;
    let active = true;
    const nmi = window as NmiWindow;
    setReady(false);
    function initialise() {
      if (!active || !nmi.CollectJS) return;
      nmi.CollectJS.configure({
        variant: "inline", styleSniffer: true,
        fields: {
          ccnumber: { selector: "#shopify-card-number", title: copy.cardNumber },
          ccexp: { selector: "#shopify-card-expiry", title: copy.expiry },
          cvv: { selector: "#shopify-card-security", title: copy.securityCode },
        },
        validationCallback: (_field: string, valid: boolean) => { if (!valid && active) { setError(copy.invalid); setBusy(false); paying.current = false; } },
        timeoutDuration: 15000,
        timeoutCallback: () => { if (active) { setBusy(false); paying.current = false; setError(copy.cardFailed); } },
        fieldsAvailableCallback: () => active && setReady(true),
        callback: (result: { token?: string }) => { if (active && result.token) tokenCallback.current(result.token); },
      });
    }
    let script = document.getElementById("zevitech-nmi-checkout") as HTMLScriptElement | null;
    if (script && nmi.CollectJS) initialise();
    else {
      if (!script) {
        script = document.createElement("script"); script.id = "zevitech-nmi-checkout";
        script.src = config.scriptUrl; script.setAttribute("data-tokenization-key", config.tokenizationKey);
        script.setAttribute("data-variant", "inline"); document.head.appendChild(script);
      }
      script.addEventListener("load", initialise, { once: true });
      script.addEventListener("error", () => active && setError(copy.cardFailed), { once: true });
    }
    const timeout = setTimeout(() => { if (active && !document.querySelector("#shopify-card-number iframe")) setError(copy.cardFailed); }, 20000);
    return () => { active = false; clearTimeout(timeout); script?.removeEventListener("load", initialise); };
  }, [needsCard, config]);

  async function prepare() {
    if (busy || !accepted || !config?.available) return;
    if (onValidate && !await onValidate()) { setError(copy.invalid); return; }
    if (!ShopifyCheckoutBriefSchema.safeParse(brief).success) { setError(copy.invalid); return; }
    setBusy(true); setError("");
    try {
      session.current = session.current || createCheckoutSession();
      const result = await requestShopifyCheckout("create", { ...session.current, brief, acceptedTerms: true, attribution: readShopifyCheckoutAttribution() });
      setOrder(result);
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "";
      if (message === "PAYMENT_TERMS_CHANGED") { setPaymentTermsChanged(true); setError(copy.paymentTermsChanged); }
      else setError(message === "SCOPE_REVIEW_REQUIRED" ? copy.scopeReview : message === "INVALID_DETAILS" ? copy.invalid : copy.prepareFailed);
    } finally { setBusy(false); }
  }
  async function openPreview() {
    if (onValidate && !await onValidate()) { setError(copy.invalid); return; }
    if (!ShopifyCheckoutBriefSchema.safeParse(brief).success) { setError(copy.invalid); return; }
    setError(""); setPreviewOpen(true);
    requestAnimationFrame(() => {
      checkoutHeading.current?.focus({ preventScroll: true });
      checkoutHeading.current?.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    });
  }
  async function checkStatus() {
    if (!session.current || busy) return;
    setBusy(true); setError("");
    try { setOrder(await requestShopifyCheckout("status", session.current)); }
    catch { setError(copy.failed); }
    finally { setBusy(false); }
  }
  async function updateCheckout() {
    if (!session.current || busy) return;
    setBusy(true); setError("");
    try {
      const cancelled = await requestShopifyCheckout("cancel", session.current);
      if (cancelled.status === "cancelled") { clearCheckoutSession(); session.current = null; setOrder(null); setAccepted(false); setPaymentTermsChanged(false); }
    } catch { setError(copy.failed); }
    finally { setBusy(false); }
  }

  if (!config) return <p className="text-sm text-paragraph" role="status">{copy.preparing}</p>;
  if (!brief.needs.scopeConfirmed && !order) return <div className="space-y-4 rounded-xl bg-muted p-4"><p className="text-sm leading-relaxed text-paragraph">{copy.scopeReview}</p>{onReviewRequirements && <button type="button" onClick={onReviewRequirements} className={buttonClass}>{copy.reviewRequirements}</button>}</div>;
  if (!config.available) {
    if (process.env.NODE_ENV === "development") return <section aria-label={copy.previewTitle} className="min-w-0 space-y-4">
      {!previewOpen ? <><button type="button" className={buttonClass} onClick={openPreview}><LockKeyhole className="h-4 w-4" aria-hidden="true"/>{copy.prepare}</button><p className="text-xs leading-relaxed text-paragraph">{copy.previewContinueNote}</p>{error && <p role="alert" className="text-sm text-destructive">{error}</p>}</> : <div className="space-y-5 rounded-2xl border border-border bg-background p-4 md:p-6"><div><h3 ref={checkoutHeading} tabIndex={-1} className="scroll-mt-6 font-heading text-2xl text-heading outline-none">{copy.previewTitle}</h3><p className="mt-2 text-sm text-paragraph">{copy.previewIntro}</p></div><ShopifyCheckoutPreview brief={brief} onEdit={() => { setPreviewOpen(false); document.getElementById("studio-name")?.focus(); }}/></div>}
    </section>;
    return <p role="status" className="rounded-xl bg-muted p-4 text-sm leading-relaxed text-paragraph">{copy.unavailable}</p>;
  }
  const awaiting = order && ["processing", "pending"].includes(order.status);
  const changed = Boolean(order && fingerprint !== order.briefFingerprint) || legacyUncharged || paymentTermsChanged;
  const isUpfront = order?.paymentStage === "upfront";
  const formatAmount = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
  const amount = order ? formatAmount(order.amount) : "";

  return <section aria-label={copy.title} className="min-w-0 space-y-5 rounded-2xl border border-border bg-background p-4 md:p-6">
    <div><h3 className="font-heading text-2xl text-heading">{copy.title}</h3><p className="mt-2 text-sm leading-relaxed text-paragraph">{order?.paymentStage === "full" ? copy.legacyIntro : copy.intro}</p></div>
    {config.mode === "sandbox" && <p className="rounded-lg bg-muted p-3 text-sm font-semibold text-heading">{copy.sandbox}</p>}
    {order && <div className="min-w-0 rounded-xl bg-muted p-4">
      <p className="font-semibold text-heading">{order.packageName} · {formatAmount(order.totalAmount ?? order.amount)} USD</p>
      {isUpfront && <dl className="mt-3 space-y-3 border-t border-border pt-3">
        <div className="flex flex-wrap items-center justify-between gap-2"><dt className="text-sm font-semibold text-heading">{order.status === "paid" ? copy.upfrontReceived : copy.upfront}</dt><dd className="font-heading text-2xl text-heading">{formatAmount(order.upfrontAmount)} USD</dd></div>
        <div className="flex flex-wrap items-center justify-between gap-2"><dt className="text-sm text-paragraph">{copy.balance}</dt><dd className="font-semibold text-heading">{formatAmount(order.balanceAmount)} USD</dd></div>
      </dl>}
      <ShopifyDeliveryEstimate packageName={order.packageName} showNote className="mt-2" /><p className="mt-3 break-all text-xs text-paragraph">{copy.order}: {order.id}</p></div>}
    {error && <p role="alert" className="rounded-lg border border-destructive p-3 text-sm text-destructive">{error}</p>}
    {order?.status === "paid" ? <div role="status" className="space-y-3"><CheckCircle2 className="h-7 w-7 text-primary"/><h4 className="text-xl font-semibold text-heading">{config.mode === "live" ? isUpfront ? copy.approved : copy.fullApproved : isUpfront ? copy.sandboxApproved : copy.sandboxFullApproved}</h4><p className="text-sm leading-relaxed text-paragraph">{isUpfront ? copy.approvedBody : copy.fullApprovedBody}</p><p className="break-all text-sm text-heading">{copy.transaction}: {order.transactionId}</p></div> : awaiting ? <div className="space-y-4"><p className="text-sm leading-relaxed text-paragraph" role="status">{copy.pending}</p><button type="button" className={buttonClass} disabled={busy} onClick={checkStatus}>{busy ? copy.checking : copy.checkStatus}</button></div> : changed ? <div className="space-y-4"><p role="status" className="text-sm leading-relaxed text-paragraph">{legacyUncharged || paymentTermsChanged ? copy.paymentTermsChanged : copy.changed}</p><button type="button" className={buttonClass} disabled={busy} onClick={updateCheckout}>{copy.update}</button></div> : !order ? <div className="space-y-4">
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-paragraph"><input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-primary"/><span>{copy.terms}</span></label>
      <div className="flex flex-wrap gap-4 text-sm"><a className="underline underline-offset-4" href={copy.termsHref} target="_blank" rel="noopener noreferrer">{copy.termsLink}</a><a className="underline underline-offset-4" href="/privacy-policy" target="_blank" rel="noopener noreferrer">{copy.privacyLink}</a></div>
      <p className="text-xs leading-relaxed text-paragraph">{copy.filesNote}</p>
      <button type="button" className={buttonClass} disabled={!accepted || busy} onClick={prepare}>{busy ? <Loader2 className="h-4 w-4 animate-spin"/> : <LockKeyhole className="h-4 w-4"/>}{busy ? copy.preparing : copy.prepare}</button>
    </div> : <form ref={form} className="space-y-4" onSubmit={(event) => {
      event.preventDefault(); if (busy || !ready || paying.current || changed) return;
      const billingValues = Object.fromEntries(new FormData(event.currentTarget));
      const validBilling = ShopifyCheckoutBillingSchema.safeParse(billingValues);
      if (!validBilling.success) { setError(copy.invalid); const invalid = form.current?.elements.namedItem(String(validBilling.error.issues[0]?.path[0])) as HTMLInputElement | HTMLSelectElement | null; invalid?.focus(); return; }
      paying.current = true; setBusy(true); setError(""); (window as NmiWindow).CollectJS?.startPaymentRequest();
    }}>
      <p className="text-xs leading-relaxed text-paragraph">{copy.locked}</p>
      <p className="text-xs leading-relaxed text-paragraph">{copy.billingNameHint}</p>
      <div className="grid min-w-0 gap-4 md:grid-cols-2">
        {shopifyCheckoutBillingFields.map(({ name, label, autoComplete, maxLength, minLength }) => <label key={name} className="block min-w-0 space-y-2 text-sm text-heading"><span>{label}</span><input name={name} autoComplete={autoComplete} required minLength={minLength} maxLength={maxLength} defaultValue={name === "firstName" ? billingName.firstName : name === "lastName" ? billingName.lastName : undefined} className={inputClass}/></label>)}
        <label className="block min-w-0 space-y-2 text-sm text-heading">
          <span>{copy.country}</span>
          <ShopifyStudioSelect name="country" autoComplete="country" required defaultValue={shopifyBillingDefaultCountry}>
            {shopifyBillingCountries.map(({ code, name }) => <option key={code} value={code}>{name}</option>)}
          </ShopifyStudioSelect>
          <span className="block text-xs text-paragraph">{copy.countryHint}</span>
        </label>
      </div>
      {!ready && <p role="status" className="text-sm text-paragraph">{copy.loadingCard}</p>}
      <div className="space-y-2"><p className="text-sm text-heading">{copy.cardNumber}</p><div id="shopify-card-number" className={inputClass}/></div>
      <div className="grid min-w-0 grid-cols-2 gap-4"><div className="min-w-0 space-y-2"><p className="text-sm text-heading">{copy.expiry}</p><div id="shopify-card-expiry" className={inputClass}/></div><div className="min-w-0 space-y-2"><p className="text-sm text-heading">{copy.securityCode}</p><div id="shopify-card-security" className={inputClass}/></div></div>
      {config.statementDescriptor && <p className="text-sm text-paragraph">{copy.descriptor}: <strong>{config.statementDescriptor}</strong></p>}
      <button type="submit" className={buttonClass} disabled={!ready || busy}>{busy ? <Loader2 className="h-4 w-4 animate-spin"/> : <LockKeyhole className="h-4 w-4"/>}{busy ? copy.processing : `${isUpfront ? copy.payUpfront : copy.pay} · ${amount} USD`}</button>
    </form>}
  </section>;
}
