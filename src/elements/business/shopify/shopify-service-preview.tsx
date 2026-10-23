"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import ShopifyClotyaHome from "./shopify-clotya-home";
import ShopifyEcolifeHome from "./shopify-ecolife-home";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Compass, MessageCircle, Minus, Plus } from "lucide-react";
import {
  getShopifyServiceCategory,
  shopifyServicePreviewCopy as copy,
} from "@/content/landing/shopify-service-preview-content";
import { packagePreviewCapabilities, packageStorefrontProfiles } from "@/content/landing/shopify-package-preview-content";
import { studioPlans } from "@/content/landing/shopify-studio-content";
import { studioColourPalettes, studioTemplates } from "@/content/landing/shopify-studio-templates";
import type { ShopifyServicePreviewProps } from "@/interfaces/shopify-service-preview-interface";
import { cn } from "@/lib/utils";

const sectionClass = "p-[clamp(1.25rem,4.8cqw,3rem)]";
const focusClass = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const buttonClass = "inline-flex min-h-12 max-w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground hover:opacity-90";
const serviceTemplateImages = new Set(studioTemplates
  .filter(template => template.businessType === "services")
  .flatMap(template => template.images));

export default function ShopifyServicePreview({
  signatureTheme,
  plan,
  packageName,
  values,
  images,
  logo,
  mobile,
  layout,
  palette,
}: ShopifyServicePreviewProps) {
  const SignatureHome = signatureTheme === "clotya" ? ShopifyClotyaHome : signatureTheme === "ecolife" ? ShopifyEcolifeHome : null;
  const id = useId();
  const requestedPackage = packageName || studioPlans[plan]?.name || "Beginner";
  const planName = Object.prototype.hasOwnProperty.call(packagePreviewCapabilities, requestedPackage)
    ? requestedPackage as keyof typeof packagePreviewCapabilities
    : "Beginner";
  const capabilities = packagePreviewCapabilities[planName];
  const storefront = packageStorefrontProfiles[planName];
  const richerStory = storefront.layout !== "essential";
  const category = getShopifyServiceCategory(values.businessCategory || "");
  const categoryLabel = category.id === "services" ? values.customCategory?.trim() || category.label : category.label;
  const brand = values.brand.trim() || category.brand;
  const [selected, setSelected] = useState<{ category: string; offer: string } | null>(null);
  const [group, setGroup] = useState("all");
  const [enquiryFor, setEnquiryFor] = useState<string | null>(null);
  const [sentFor, setSentFor] = useState<string | null>(null);
  const focusNextPage = useRef(false);
  const focusEnquiry = useRef(false);
  const servicesHeading = useRef<HTMLHeadingElement>(null);
  const detailHeading = useRef<HTMLHeadingElement>(null);
  const processHeading = useRef<HTMLHeadingElement>(null);
  const faqHeading = useRef<HTMLHeadingElement>(null);
  const enquiryInput = useRef<HTMLTextAreaElement>(null);
  const activeOffer = selected?.category === category.id
    ? category.offers.find(offer => offer.id === selected.offer)
    : undefined;
  const offerKey = activeOffer ? `${category.id}:${activeOffer.id}` : "";
  const groups = Array.from(new Set(category.offers.map(offer => offer.group)));
  const activeGroup = capabilities.filters && groups.includes(group) ? group : "all";
  const visibleOffers = category.offers.filter(offer => activeGroup === "all" || offer.group === activeGroup);
  const defaultColours = studioColourPalettes[0];
  const validColour = (value: string, fallback: string) => /^#[0-9a-fA-F]{6}$/.test(value) ? value : fallback;
  const colours = studioColourPalettes[palette] || {
    accent: validColour(values.customAccent, defaultColours.accent),
    ink: validColour(values.customInk, defaultColours.ink),
    surface: validColour(values.customSurface, defaultColours.surface),
    soft: validColour(values.customSoft, defaultColours.soft),
  };
  const luminance = colours.accent.slice(1).match(/.{2}/g)!.map(channel => {
    const value = parseInt(channel, 16) / 255;
    return value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
  });
  const buttonInk = luminance[0] * 0.2126 + luminance[1] * 0.7152 + luminance[2] * 0.0722 > 0.179 ? "black" : "white";
  // Accept catalog-assigned service imagery and uploads, excluding unrelated product references.
  const serviceImage = images.find(src => serviceTemplateImages.has(src)
    || /^(blob:|data:image\/)/.test(src)
    || /\/store-studio\/service(?:s\/|-)/.test(src));

  useEffect(() => {
    if (focusNextPage.current) {
      const heading = activeOffer ? detailHeading.current : servicesHeading.current;
      heading?.focus({ preventScroll: true });
      heading?.scrollIntoView({ block: "nearest", behavior: "auto" });
      focusNextPage.current = false;
    } else if (focusEnquiry.current) {
      enquiryInput.current?.focus({ preventScroll: true });
      enquiryInput.current?.scrollIntoView({ block: "nearest", behavior: "auto" });
    }
    focusEnquiry.current = false;
  }, [activeOffer, enquiryFor]);

  const openOffer = (offer: string, enquire = false) => {
    focusNextPage.current = true;
    setSelected({ category: category.id, offer });
    setEnquiryFor(enquire ? `${category.id}:${offer}` : null);
    setSentFor(null);
  };
  const backToServices = () => {
    focusNextPage.current = true;
    setSelected(null);
    setEnquiryFor(null);
    setSentFor(null);
  };
  const moveTo = (heading: HTMLHeadingElement | null) => {
    heading?.focus({ preventScroll: true });
    heading?.scrollIntoView({ block: "start", behavior: "auto" });
  };

  return (
    <div
      data-service-preview={category.id}
      style={{
        "--primary": colours.accent,
        "--primary-foreground": buttonInk,
        "--background": colours.surface,
        "--secondary-background": colours.soft,
        "--foreground": colours.ink,
        "--heading": colours.ink,
        "--paragraph": colours.ink,
        "--secondary": colours.ink,
        "--secondary-foreground": colours.surface,
        "--muted": colours.soft,
        "--muted-foreground": colours.ink,
        "--border": "color-mix(in srgb, var(--heading) 14%, var(--background))",
        "--ring": colours.accent,
      } as CSSProperties}
      className={cn("studio-storeframe mx-auto w-full min-w-0 overflow-hidden rounded-2xl border border-border bg-background text-heading shadow-xl [overflow-wrap:anywhere]", mobile && "max-w-sm")}
    >
      <div className="bg-primary px-4 py-3 text-center text-[10px] font-semibold tracking-[0.18em] text-primary-foreground">{copy.sample}</div>
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-[clamp(1rem,4cqw,2.5rem)] py-4">
        <button type="button" onClick={backToServices} className={cn("min-h-11 min-w-0 flex-[1_1_10rem] rounded text-left font-heading text-2xl", focusClass)}>
          {logo ? <Image src={logo} alt={brand} width={160} height={56} unoptimized className="h-auto max-h-14 w-auto max-w-full object-contain object-left" /> : brand}
        </button>
        <button type="button" onClick={() => openOffer(category.offers[0].id, true)} className={cn("inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold", focusClass)}>
          <MessageCircle size={15} aria-hidden="true" />{copy.enquire}
        </button>
      </header>
      {!activeOffer && <nav aria-label={copy.navigation} className="flex flex-wrap gap-x-2 border-b border-border px-4">
        <button type="button" onClick={() => moveTo(servicesHeading.current)} className={cn("min-h-11 rounded px-3 py-2 text-xs", focusClass)}>{copy.services}</button>
        <button type="button" onClick={() => moveTo(processHeading.current)} className={cn("min-h-11 rounded px-3 py-2 text-xs", focusClass)}>{copy.process}</button>
        <button type="button" onClick={() => moveTo(faqHeading.current)} className={cn("min-h-11 rounded px-3 py-2 text-xs", focusClass)}>{copy.questions}</button>
      </nav>}

      {activeOffer ? (
        <div className={sectionClass}>
          <button type="button" onClick={backToServices} className={cn("mb-6 inline-flex min-h-11 items-center gap-2 rounded text-sm", focusClass)}><ArrowLeft size={16} aria-hidden="true" />{copy.back}</button>
          <div className={cn("grid items-start gap-7", !mobile && "studio-two-column")}>
            <section>
              <p className="text-[10px] font-semibold tracking-[0.18em] text-primary">{copy.detailLabel}</p>
              <h3 ref={detailHeading} tabIndex={-1} className={cn("mt-3 rounded font-heading text-[clamp(2rem,5cqw,3.5rem)] leading-tight", focusClass)}>{activeOffer.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-paragraph">{activeOffer.description}</p>
              <p className="mt-5 inline-flex rounded-full bg-secondary-background px-3 py-2 text-xs">{activeOffer.format}</p>
              <h4 className="mt-7 text-sm font-semibold">{copy.includes}</h4>
              <ul className="mt-3 space-y-3">{activeOffer.includes.map(item => <li key={item} className="flex items-start gap-2 text-sm leading-relaxed"><Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" /><span>{item}</span></li>)}</ul>
            </section>
            <section className="min-w-0 rounded-2xl border border-border bg-secondary-background p-[clamp(1.25rem,4cqw,2rem)]">
              <h4 className="font-heading text-2xl">{copy.enquiryTitle}</h4>
              <p className="mt-3 text-xs leading-relaxed text-paragraph">{copy.demoNote}</p>
              {enquiryFor !== offerKey ? (
                <button type="button" onClick={() => { focusEnquiry.current = true; setEnquiryFor(offerKey); }} className={cn(buttonClass, "mt-5 w-full", focusClass)}>{copy.request}<ArrowRight size={16} aria-hidden="true" /></button>
              ) : (
                <form className="mt-5 space-y-4" onSubmit={event => { event.preventDefault(); setSentFor(offerKey); }}>
                  <label className="block text-sm font-semibold">
                    <span className="mb-2 block">{copy.enquiryLabel}</span>
                    <textarea ref={enquiryInput} required maxLength={600} rows={4} placeholder={copy.enquiryPlaceholder} className={cn("w-full resize-y rounded-xl border border-border bg-background p-3 text-base font-normal text-heading", focusClass)} />
                  </label>
                  <button type="submit" className={cn(buttonClass, "w-full", focusClass)}>{sentFor === offerKey ? <Check size={16} aria-hidden="true" /> : <ArrowRight size={16} aria-hidden="true" />}{copy.sendSample}</button>
                </form>
              )}
              {sentFor === offerKey && <p role="status" className="mt-4 rounded-xl border border-border bg-background p-3 text-sm leading-relaxed">{copy.sent}</p>}
            </section>
          </div>
          {storefront.recommendations && <section data-service-section="related" className="mt-9 border-t border-border pt-6">
            <h4 className="mb-4 font-heading text-2xl">{copy.related}</h4>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,13rem),1fr))] gap-3">{category.offers.filter(offer => offer.id !== activeOffer.id).map(offer => <button key={offer.id} type="button" onClick={() => openOffer(offer.id)} className={cn("min-h-24 rounded-xl border border-border bg-background p-4 text-left hover:border-primary", focusClass)}>
              <span className="block text-xs text-primary">{offer.group}</span><span className="mt-2 flex items-center justify-between gap-3 font-semibold">{offer.title}<ArrowUpRight size={16} aria-hidden="true" className="shrink-0" /></span>
            </button>)}</div>
          </section>}
        </div>
      ) : (
        <>
          {SignatureHome && <SignatureHome
            categoryContext={categoryLabel} serviceMode headline={category.headline} brief={category.introduction}
            products={category.offers.map((offer, index) => ({ id: index, name: offer.title, collection: offer.group, price: 0, priceLabel: offer.format, src: images[index % images.length], description: offer.description }))}
            onBrowse={(group) => { setGroup(group || "all"); moveTo(servicesHeading.current); }}
            onProduct={index => openOffer(category.offers[index].id)}
            onAddToBag={index => openOffer(category.offers[index].id, true)}
            onViewBag={() => moveTo(servicesHeading.current)}
          />}
          {!SignatureHome && <section data-service-section="hero" className={cn(sectionClass, "grid items-center gap-7", !mobile && "studio-two-column", richerStory && layout !== 3 ? "bg-secondary text-secondary-foreground" : "bg-secondary-background")}>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold tracking-[0.18em] opacity-70">{categoryLabel}</p>
              <h3 className="mt-4 max-w-lg font-heading text-[clamp(2rem,5.4cqw,4rem)] leading-tight">{category.headline}</h3>
              <p className="mt-5 max-w-lg text-sm leading-relaxed opacity-80">{category.introduction}</p>
              <button type="button" onClick={() => moveTo(servicesHeading.current)} className={cn(buttonClass, "mt-6", focusClass)}>{copy.explore}<ArrowRight size={16} aria-hidden="true" /></button>
            </div>
            <div className="relative min-w-0 rounded-3xl border border-border bg-background p-5 text-heading shadow-sm">
              {serviceImage ? <Image src={serviceImage} alt={copy.serviceImageAlt} width={700} height={540} unoptimized className="mb-5 aspect-[4/3] w-full rounded-2xl object-cover" /> : <div aria-hidden="true" className="mb-5 flex min-h-36 items-center justify-center rounded-2xl bg-secondary-background"><Compass className="h-16 w-16 text-primary" strokeWidth={1} /></div>}
              <p className="text-[10px] font-semibold tracking-[0.16em] text-primary">{copy.eyebrow}</p>
              <div className="mt-4 divide-y divide-border">{category.offers.map((offer, index) => <button key={offer.id} type="button" onClick={() => openOffer(offer.id)} className={cn("flex min-h-14 w-full items-center gap-3 rounded py-3 text-left text-sm font-semibold", focusClass)}>
                <span className="text-xs font-normal text-paragraph">{String(index + 1).padStart(2, "0")}</span><span className="min-w-0 flex-1">{offer.title}</span><ArrowUpRight size={16} aria-hidden="true" className="shrink-0 text-primary" />
              </button>)}</div>
            </div>
          </section>}

          <section data-service-section="offers" className={sectionClass}>
            <p className="mb-2 text-[10px] font-semibold tracking-[0.18em] text-primary">{copy.services}</p>
            <h3 ref={servicesHeading} tabIndex={-1} className={cn("max-w-xl rounded font-heading text-[clamp(1.75rem,4.3cqw,2.75rem)] leading-tight", focusClass)}>{copy.serviceListTitle}</h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-paragraph">{copy.serviceListBody}</p>
            {capabilities.filters && <div data-service-section="filters" className="mt-5">
              <div role="group" aria-label={copy.filterLabel} className="flex flex-wrap gap-2">{["all", ...groups].map(value => <button key={value} type="button" aria-pressed={activeGroup === value} aria-controls={`${id}-offers`} onClick={() => setGroup(value)} className={cn("min-h-11 rounded-full border px-4 py-2 text-sm", activeGroup === value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary", focusClass)}>{value === "all" ? copy.allServices : value}</button>)}</div>
              <p role="status" aria-live="polite" className="mt-3 text-xs text-paragraph">{visibleOffers.length === 1 ? copy.oneResult : copy.results.replace("{count}", String(visibleOffers.length))}</p>
            </div>}
            <div id={`${id}-offers`} className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,13rem),1fr))] gap-4">{visibleOffers.map((offer, index) => <article key={offer.id} className="flex min-w-0 flex-col rounded-2xl border border-border bg-background p-5">
              <span aria-hidden="true" className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-background font-heading text-lg text-primary">{String(index + 1).padStart(2, "0")}</span>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">{offer.group}</p>
              <h4 className="mt-2 font-heading text-2xl leading-tight">{offer.title}</h4>
              <p className="mb-5 mt-3 flex-1 text-sm leading-relaxed text-paragraph">{offer.description}</p>
              <button type="button" onClick={() => openOffer(offer.id)} aria-label={`${copy.viewService}: ${offer.title}`} className={cn("flex min-h-11 w-full items-center justify-between gap-3 rounded-lg border-t border-border pt-3 text-left text-sm font-semibold", focusClass)}>{copy.viewService}<ArrowUpRight size={16} aria-hidden="true" /></button>
            </article>)}</div>
          </section>

          {richerStory && <section data-service-section="story" className={cn(sectionClass, "grid items-center gap-7 bg-secondary-background", !mobile && "studio-two-column")}>
            <div><p className="mb-3 text-[10px] font-semibold tracking-widest text-primary">{copy.storyEyebrow}</p><h4 className="max-w-sm font-heading text-[clamp(1.75rem,4.3cqw,3rem)] leading-tight">{copy.storyTitle}</h4><p className="mt-4 text-sm leading-relaxed text-paragraph">{values.brief.trim() || copy.storyBody}</p></div>
            <div className="rounded-2xl border border-border bg-background p-6"><MessageCircle aria-hidden="true" className="mb-5 h-8 w-8 text-primary" strokeWidth={1.5} /><h4 className="font-heading text-2xl">{copy.storyDetail}</h4><p className="mt-3 text-sm leading-relaxed text-paragraph">{copy.storyDetailBody}</p><button type="button" onClick={() => openOffer(category.offers[0].id, true)} className={cn(buttonClass, "mt-5", focusClass)}>{copy.enquire}<ArrowRight size={16} aria-hidden="true" /></button></div>
          </section>}

          <section data-service-section="process" className={cn(sectionClass, "border-t border-border")}>
            <h3 ref={processHeading} tabIndex={-1} className={cn("max-w-xl rounded font-heading text-[clamp(1.75rem,4.3cqw,2.75rem)] leading-tight", focusClass)}>{copy.processTitle}</h3>
            <ol className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,13rem),1fr))] gap-5">{copy.processSteps.map((step, index) => <li key={step.title} className="border-t border-border pt-4"><span className="font-heading text-3xl text-primary">{String(index + 1).padStart(2, "0")}</span><h4 className="mt-3 text-sm font-semibold">{step.title}</h4><p className="mt-2 text-sm leading-relaxed text-paragraph">{step.body}</p>{richerStory && <p className="mt-3 border-t border-border pt-3 text-xs leading-relaxed text-paragraph">{step.detail}</p>}</li>)}</ol>
          </section>

          <section data-service-section="faq" className={cn(sectionClass, "border-t border-border bg-secondary-background")}>
            <h3 ref={faqHeading} tabIndex={-1} className={cn("mb-5 rounded font-heading text-3xl", focusClass)}>{copy.questions}</h3>
            {copy.faq.map(item => <details key={item.question} className="group border-b border-border py-3">
              <summary className={cn("flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded text-sm font-semibold", focusClass)}>{item.question}<Plus aria-hidden="true" size={16} className="shrink-0 group-open:hidden" /><Minus aria-hidden="true" size={16} className="hidden shrink-0 group-open:block" /></summary>
              <p className="max-w-2xl pb-2 pt-3 text-sm leading-relaxed text-paragraph">{item.answer}</p>
            </details>)}
          </section>
        </>
      )}
      <footer className="border-t border-border px-[clamp(1.25rem,4.8cqw,3rem)] py-6">
        <div className="flex flex-wrap items-center justify-between gap-3"><p className="font-heading text-xl">{brand}</p><p className="text-xs text-paragraph">{copy.footer}</p></div>
        <p className="mt-4 max-w-2xl text-[11px] leading-relaxed text-paragraph">{copy.bookingScope}</p>
      </footer>
    </div>
  );
}
