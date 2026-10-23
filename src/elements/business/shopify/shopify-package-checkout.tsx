"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { shopifyDeclineFeedback, shopifyCheckoutErrorFeedback } from "@/lib/shopify-payment-feedback";
import { verifyShopifyPayment } from "@/lib/shopify-payment-verification";
import { SHOPIFY_PAYMENT_VERSION } from "@/lib/shopify-payment-schedule";
import { CheckCircle2, Loader2, LockKeyhole } from "lucide-react";
import ShopifyDeliveryEstimate from "./shopify-delivery-estimate";
import ShopifyStudioSelect from "./shopify-studio-select";
import { getShopifyCheckoutCopy, shopifyCheckoutBillingFields } from "@/content/landing/shopify-checkout-content";
import { shopifyBillingDefaultCountry } from "@/content/landing/shopify-billing-countries";
import type { ShopifyCheckoutConfig, ShopifyCheckoutPublicOrder, ShopifyPackageCheckoutProps } from "@/interfaces/shopify-checkout-interface";
import { clearCheckoutSession, createCheckoutSession, readCheckoutSession, readShopifyCheckoutConfig, requestShopifyCheckout, type CheckoutBrowserSession } from "@/lib/shopify-checkout-client";
import { ShopifyCheckoutBillingSchema, ShopifyCheckoutBriefSchema } from "@/schemas/shopify-checkout-schema";
import { readShopifyCheckoutAttribution } from "@/lib/shopify-checkout-attribution-client";
import { startShopifyCheckoutTracking } from "@/lib/shopify-checkout-analytics";
import { shopifyBillingCountries, suggestShopifyBillingName } from "@/lib/shopify-billing-details";
import ShopifyCheckoutPreview from "./shopify-checkout-preview";

type NmiWindow = Window & { CollectJS?: { configure: (options: Record<string, unknown>) => void; startPaymentRequest: () => void; clearInputs: () => void } };
const inputClass = "min-h-12 w-full min-w-0 rounded-xl border border-border bg-background px-3 py-3 text-base text-heading outline-none focus-visible:ring-2 focus-visible:ring-primary";
const buttonClass = "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-center font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

export default function ShopifyPackageCheckout({ brief, onValidate, onReviewRequirements }: ShopifyPackageCheckoutProps) {
  const [config, setConfig] = useState<ShopifyCheckoutConfig | null>(null);
  const [order, setOrder] = useState<ShopifyCheckoutPublicOrder | null>(null);
  const copy = getShopifyCheckoutCopy(order?.paymentVersion);
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [fingerprint, setFingerprint] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [paymentTermsChanged, setPaymentTermsChanged] = useState(false);
  const [cardErrors, setCardErrors] = useState<Record<string, string>>({});
  const [verificationDelayed, setVerificationDelayed] = useState(false);
  const feedback = useRef<HTMLParagraphElement>(null);
  const charging = useRef(false);
  const checkoutHeading = useRef<HTMLHeadingElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const session = useRef<CheckoutBrowserSession | null>(null);
  const paying = useRef(false);
  const preparing = useRef(false);
  const tokenCallback = useRef<(token: string) => void>(() => undefined);
  const parsedBrief = ShopifyCheckoutBriefSchema.safeParse(brief);
  const canonicalBrief = parsedBrief.success ? JSON.stringify(parsedBrief.data) : "";
  const billingName = suggestShopifyBillingName(brief.business.name);

  useEffect(() => {
    if (!order) return;
    return startShopifyCheckoutTracking(order, "checkout");
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
  }, [copy.failed]);

  const submitToken = useCallback(async (paymentToken: string) => {
    if (!session.current || !order || !paying.current || charging.current) return;
    if (!fingerprint || fingerprint !== order.briefFingerprint) { setError(copy.changed); setBusy(false); paying.current = false; return; }
    const fields = new FormData(form.current!);
    const billing = Object.fromEntries(["firstName", "lastName", "address", "city", "state", "postalCode", "country"].map((key) => [key, String(fields.get(key) || "").trim()]));
    charging.current = true;
    try {
      const result = await requestShopifyCheckout("pay", { ...session.current, paymentToken, billing, briefFingerprint: fingerprint, acceptedTerms: true });
      setOrder(result);
      setError(result.status === "declined" ? shopifyDeclineFeedback(result.declineCode, result.gatewayIssue) : "");
      try { (window as NmiWindow).CollectJS?.clearInputs(); } catch { /* A field-reset failure must never change a confirmed payment result. */ }
    } catch (cause) {
      const code = cause instanceof Error ? cause.message : "";
      if (code === "PAYMENT_TERMS_CHANGED") { setPaymentTermsChanged(true); setError(copy.paymentTermsChanged); }
      else if (shopifyCheckoutErrorFeedback(code)) setError(shopifyCheckoutErrorFeedback(code)!);
      else { setOrder((current) => current ? { ...current, status: "pending" } : current); setError(copy.failed); }
    }
    finally { setBusy(false); paying.current = false; charging.current = false; }
  }, [order, fingerprint, copy.changed, copy.failed, copy.paymentTermsChanged]);
  useEffect(() => { tokenCallback.current = submitToken; }, [submitToken]);

  useEffect(() => {
    if (order?.status === "paid") window.location.replace("/landing-pages/shopify-development/thank-you");
  }, [order?.status]);

  const legacyUncharged = Boolean(order && order.paymentVersion !== SHOPIFY_PAYMENT_VERSION && ["created", "declined"].includes(order.status));
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
        validationCallback: (field: string, valid: boolean) => {
          if (!active || charging.current) return;
          const messages: Record<string, string> = { ccnumber: copy.cardNumberInvalid, ccexp: copy.cardExpiryInvalid, cvv: copy.cardSecurityInvalid };
          if (!messages[field]) return;
          setCardErrors(current => { const next = { ...current }; if (valid) delete next[field]; else next[field] = messages[field]; return next; });
          if (!valid) { setError(copy.cardInvalid); setBusy(false); paying.current = false; }
        },
        timeoutDuration: 15000,
        timeoutCallback: () => { if (active && !charging.current) { setBusy(false); paying.current = false; setError(copy.tokenFailed); } },
        fieldsAvailableCallback: () => active && setReady(true),
        callback: (result: { token?: string }) => {
          if (!active) return;
          if (result.token) tokenCallback.current(result.token);
          else if (!charging.current) { setBusy(false); paying.current = false; setError(copy.tokenFailed); }
        },
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
  }, [needsCard, config, copy.cardFailed, copy.cardNumber, copy.expiry, copy.invalid, copy.securityCode, copy.cardNumberInvalid, copy.cardExpiryInvalid, copy.cardSecurityInvalid, copy.cardInvalid, copy.tokenFailed]);

  async function prepare() {
    if (busy || preparing.current || !accepted || !config?.available) return;
    preparing.current = true;
    setBusy(true); setError("");
    try {
      if (onValidate && !await onValidate()) { setError(copy.invalid); return; }
      if (!ShopifyCheckoutBriefSchema.safeParse(brief).success) { setError(copy.invalid); return; }
      session.current = session.current || createCheckoutSession();
      const result = await requestShopifyCheckout("create", { ...session.current, brief, acceptedTerms: true, attribution: readShopifyCheckoutAttribution() });
      setOrder(result);
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "";
      if (message === "PAYMENT_TERMS_CHANGED") { setPaymentTermsChanged(true); setError(copy.paymentTermsChanged); }
      else setError(message === "SCOPE_REVIEW_REQUIRED" ? copy.scopeReview : message === "INVALID_DETAILS" ? copy.invalid : copy.prepareFailed);
    } finally { preparing.current = false; setBusy(false); }
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
  useEffect(() => {
    if (!order || !["pending", "processing"].includes(order.status) || !session.current) return;
    const saved = session.current;
    setVerificationDelayed(Boolean(order.verificationEndsAt && Date.parse(order.verificationEndsAt) <= Date.now())); setError("");
    return verifyShopifyPayment(
      () => requestShopifyCheckout("status", saved),
      result => { setOrder(result); setError(result.status === "declined" ? shopifyDeclineFeedback(result.declineCode, result.gatewayIssue) : ""); },
      () => setVerificationDelayed(true),
      order.verificationEndsAt,
    );
  }, [order?.id, order?.status]);
  useEffect(() => {
    if (!error) return;
    feedback.current?.focus({ preventScroll: true });
    feedback.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [error]);
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
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-primary/5 px-3 py-2 text-heading"><dt className="text-sm font-semibold">{order.status === "paid" ? copy.upfrontReceived : copy.upfront}</dt><dd className="text-xl font-semibold tabular-nums">{formatAmount(order.upfrontAmount)} USD</dd></div>
        <div className="flex flex-wrap items-center justify-between gap-2"><dt className="text-sm text-paragraph">{copy.balance}</dt><dd className="font-semibold text-heading">{formatAmount(order.balanceAmount)} USD</dd></div>
      </dl>}
      <ShopifyDeliveryEstimate packageName={order.packageName} showNote className="mt-2" /><p className="mt-3 break-all text-xs text-paragraph">{copy.order}: {order.id}</p></div>}
    {(error || order?.status === "declined") && <p ref={feedback} tabIndex={-1} role="alert" className="rounded-lg border border-destructive p-3 text-sm text-destructive">{error || shopifyDeclineFeedback(order?.declineCode, order?.gatewayIssue)} <a href="mailto:support@zevitech.com" className="underline underline-offset-4">Contact our team</a></p>}
    {order?.status === "paid" ? <div role="status" className="space-y-3"><CheckCircle2 className="h-7 w-7 text-primary"/><h4 className="text-xl font-semibold text-heading">{config.mode === "live" ? isUpfront ? copy.approved : copy.fullApproved : isUpfront ? copy.sandboxApproved : copy.sandboxFullApproved}</h4><p className="text-sm leading-relaxed text-paragraph">{isUpfront ? copy.approvedBody : copy.fullApprovedBody}</p><p className="break-all text-sm text-heading">{copy.transaction}: {order.transactionId}</p></div> : awaiting ? <div className="space-y-3" role="status" aria-live="polite"><p className="flex items-center gap-3 text-sm leading-relaxed text-paragraph">{!verificationDelayed && <Loader2 className="h-5 w-5 shrink-0 animate-spin motion-reduce:animate-none" aria-hidden="true"/>}{verificationDelayed ? copy.verificationDelayed : copy.pending}</p>{verificationDelayed && <a href="mailto:support@zevitech.com" className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline underline-offset-4">{copy.paymentHelp}</a>}</div> : changed ? <div className="space-y-4"><p role="status" className="text-sm leading-relaxed text-paragraph">{legacyUncharged || paymentTermsChanged ? copy.paymentTermsChanged : copy.changed}</p><button type="button" className={buttonClass} disabled={busy} onClick={updateCheckout}>{copy.update}</button></div> : !order ? <div className="space-y-4">
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-paragraph"><input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-primary"/><span>{copy.terms}</span></label>
      <div className="flex flex-wrap gap-4 text-sm"><a className="underline underline-offset-4" href={copy.termsHref} target="_blank" rel="noopener noreferrer">{copy.termsLink}</a><a className="underline underline-offset-4" href="/privacy-policy" target="_blank" rel="noopener noreferrer">{copy.privacyLink}</a></div>
      <p className="text-xs leading-relaxed text-paragraph">{copy.filesNote}</p>
      <button type="button" className={buttonClass} disabled={!accepted || busy} onClick={prepare}>{busy ? <Loader2 className="h-4 w-4 animate-spin"/> : <LockKeyhole className="h-4 w-4"/>}{busy ? copy.preparing : copy.prepare}</button>
    </div> : <form ref={form} className="space-y-4" onSubmit={(event) => {
      event.preventDefault(); if (busy || !ready || paying.current || changed || order.retryAllowed === false) return;
      const billingValues = Object.fromEntries(new FormData(event.currentTarget));
      const validBilling = ShopifyCheckoutBillingSchema.safeParse(billingValues);
      if (!validBilling.success) { setError(copy.invalid); const invalid = form.current?.elements.namedItem(String(validBilling.error.issues[0]?.path[0])) as HTMLInputElement | HTMLSelectElement | null; invalid?.focus(); return; }
      if (!(window as NmiWindow).CollectJS) { setError(copy.cardFailed); return; }
      paying.current = true; setBusy(true); setError(""); setVerificationDelayed(false);
      try { (window as NmiWindow).CollectJS!.startPaymentRequest(); }
      catch { paying.current = false; setBusy(false); setError(copy.tokenFailed); }
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
      <div className="space-y-2"><p className="text-sm text-heading">{copy.cardNumber}</p><div id="shopify-card-number" aria-invalid={Boolean(cardErrors.ccnumber)} aria-describedby={cardErrors.ccnumber ? "card-number-error" : undefined} className={inputClass}/>{cardErrors.ccnumber && <p id="card-number-error" className="text-sm text-destructive">{cardErrors.ccnumber}</p>}</div>
      <div className="grid min-w-0 grid-cols-2 gap-4"><div className="min-w-0 space-y-2"><p className="text-sm text-heading">{copy.expiry}</p><div id="shopify-card-expiry" aria-invalid={Boolean(cardErrors.ccexp)} aria-describedby={cardErrors.ccexp ? "card-expiry-error" : undefined} className={inputClass}/>{cardErrors.ccexp && <p id="card-expiry-error" className="text-sm text-destructive">{cardErrors.ccexp}</p>}</div><div className="min-w-0 space-y-2"><p className="text-sm text-heading">{copy.securityCode}</p><div id="shopify-card-security" aria-invalid={Boolean(cardErrors.cvv)} aria-describedby={cardErrors.cvv ? "card-security-error" : undefined} className={inputClass}/>{cardErrors.cvv && <p id="card-security-error" className="text-sm text-destructive">{cardErrors.cvv}</p>}</div></div>
      {config.statementDescriptor && <p className="text-sm text-paragraph">{copy.descriptor}: <strong>{config.statementDescriptor}</strong></p>}
      {order.retryAllowed === false && <p role="status" className="text-sm text-paragraph">{copy.retryLimit}</p>}
      <button type="submit" className={buttonClass} disabled={!ready || busy || order.retryAllowed === false}>{busy ? <Loader2 className="h-4 w-4 animate-spin"/> : <LockKeyhole className="h-4 w-4"/>}{busy ? copy.processing : `${order.status === "declined" ? copy.retryPayment : isUpfront ? copy.payUpfront : copy.pay} · ${amount} USD`}</button>
    </form>}
  </section>;
}
