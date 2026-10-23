"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import Image from "./shopify-preview-image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Award, Check, Gift, Package, Repeat, Sparkles, Video } from "lucide-react";
import type { ShopifyPremiumProduct } from "@/interfaces/shopify-premium-preview-interface";
import type { ShopifySignatureHomeProps } from "@/interfaces/shopify-signature-storefront-interface";
import { conciergeCopy as copy } from "@/content/landing/shopify-tier-theme-content";
import { formatMoney, priceOf, productAt, sizedImage } from "@/lib/shopify-tier-theme-utils";
import { cn } from "@/lib/utils";

const deliveriesPerYear = [26, 13, 6.5];

/** Top Tier · Private-client storefront: cinematic hero, personal-shopper quiz, membership, subscriptions and gifting. */
export default function ShopifyConciergeHome({ products, heroSrc, categoryContext, headline, brief, onBrowse, onProduct, onAddToBag, onViewBag }: ShopifySignatureHomeProps) {
  const id = useId();
  const [slide, setSlide] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [subscribe, setSubscribe] = useState<Record<number, boolean>>({});
  const [added, setAdded] = useState<number[]>([]);
  const [frequency, setFrequency] = useState(1);
  const [subscribed, setSubscribed] = useState(false);
  const [gift, setGift] = useState(false);
  const [giftNote, setGiftNote] = useState("");
  const [appointment, setAppointment] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(true);
  const slides = heroSrc ? 1 : Math.min(3, products.length);
  useEffect(() => { setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches); }, []);
  useEffect(() => {
    if (reduceMotion || slides < 2) return;
    const timer = window.setInterval(() => setSlide(current => (current + 1) % slides), 6000);
    return () => window.clearInterval(timer);
  }, [reduceMotion, slides]);
  if (!products.length) return null;
  const quizDone = answers.length === copy.quiz.length;
  const seed = answers.reduce((total, answer, index) => total + answer * (index + 1), 0);
  const matches = quizDone ? [0, 1, 2].map(offset => productAt(products, seed + offset)).filter((item, index, list) => list.indexOf(item) === index) : [];
  const featured = productAt(products, 1);
  const subscriptionPrice = priceOf(featured) * 0.9;
  const focus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  const gutter = "px-[clamp(1.25rem,5cqw,4.5rem)]";
  const add = (product: ShopifyPremiumProduct, subscription = Boolean(subscribe[product.id])) => { onAddToBag(product.id, subscription ? { unitPrice: Math.round(priceOf(product) * 0.9 * 100) / 100, variant: `${copy.subscribe} · ${copy.frequencies[frequency]}` } : undefined); setAdded(current => current.includes(product.id) ? current : [...current, product.id]); };
  const photo = (src: string, alt: string, width: number, className = "") => <Image src={sizedImage(src, width)} alt={alt} width={width} height={Math.round(width * 0.75)} unoptimized className={cn("h-full w-full object-cover", className)} />;
  const toQuiz = () => document.getElementById(`${id}-quiz`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const book = (event: FormEvent) => { event.preventDefault(); setAppointment(true); };
  const current = productAt(products, slide);

  return (
    <div data-signature-theme="concierge" className="min-w-0 bg-background text-heading">
      {/* Cinematic hero with a slide caption. */}
      <section className="relative isolate overflow-hidden bg-secondary text-white">
        <div className="relative aspect-[4/5] [@container_studio_(min-width:640px)]:aspect-[16/8.5]">
          {Array.from({ length: slides }, (_, index) => (
            <div key={index} aria-hidden={slide !== index} className={cn("absolute inset-0 transition-opacity duration-[1200ms] motion-reduce:transition-none", slide === index ? "opacity-100" : "opacity-0")}>
              {photo(heroSrc || productAt(products, index).src, "", 1600, cn("opacity-75 transition-transform duration-[7000ms] ease-out motion-reduce:transition-none", slide === index && !reduceMotion ? "scale-105" : "scale-100"))}
            </div>
          ))}
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
        </div>
        <div className={cn(gutter, "absolute inset-x-0 bottom-0 pb-[clamp(2rem,6cqw,4rem)]")}>
          <p className="flex items-center gap-2 text-sm text-white/75"><Sparkles size={15} aria-hidden="true" />{categoryContext ? `${copy.eyebrow} — ${categoryContext}` : copy.eyebrow}</p>
          <h3 className="mt-3 max-w-[13ch] font-heading text-[clamp(2.8rem,7.6cqw,6.2rem)] leading-[.92] tracking-[-0.035em] [text-wrap:balance]">{headline || copy.headline}</h3>
          <p className="mt-5 max-w-[44ch] text-base leading-relaxed text-white/80">{brief || copy.brief}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button type="button" onClick={toQuiz} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:transition-none">{copy.startQuiz}<ArrowRight size={16} aria-hidden="true" /></button>
            <button type="button" onClick={() => onBrowse()} className="inline-flex min-h-12 items-center rounded-full border border-white/50 px-7 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">{copy.secondary}</button>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-5">
            <button type="button" onClick={() => onProduct(current.id)} className="flex items-center gap-3 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              <span className="text-white/60">{String(slide + 1).padStart(2, "0")} / {String(slides).padStart(2, "0")}</span>
              <span className="font-medium">{current.name}</span><ArrowUpRight size={15} aria-hidden="true" />
            </button>
            <div role="group" aria-label={copy.slidesLabel} className="flex gap-2">
              {Array.from({ length: slides }, (_, index) => (
                <button key={index} type="button" aria-label={`${copy.slide} ${index + 1}`} aria-pressed={slide === index} onClick={() => setSlide(index)} className="flex h-11 w-10 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                  <span className={cn("h-[3px] w-full rounded-full transition-colors", slide === index ? "bg-white" : "bg-white/35")} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Personal-shopper quiz. */}
      <section id={`${id}-quiz`} aria-labelledby={`${id}-quiz-title`} className={cn(gutter, "scroll-mt-4 py-[clamp(3rem,8cqw,6rem)]")}>
        <div className="grid gap-8 [@container_studio_(min-width:820px)]:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h4 id={`${id}-quiz-title`} className="font-heading text-[clamp(2rem,4.4cqw,3.4rem)] leading-[1] tracking-[-0.02em]">{copy.quizTitle}</h4>
            <p className="mt-4 max-w-[38ch] text-base leading-relaxed text-mix-heading/65">{quizDone ? copy.resultsIntro : copy.quizIntro}</p>
            {!quizDone && (
              <div className="mt-6 flex gap-1.5" aria-hidden="true">{copy.quiz.map((_, index) => <span key={index} className={cn("h-1 flex-1 rounded-full", index <= answers.length ? "bg-primary" : "bg-mix-heading/10")} />)}</div>
            )}
          </div>
          {!quizDone ? (
            <div className="rounded-3xl bg-secondary-background p-[clamp(1.25rem,3cqw,2rem)]">
              <p className="text-xs text-mix-heading/55">{copy.questionCount.replace("{current}", String(answers.length + 1)).replace("{total}", String(copy.quiz.length))}</p>
              <p className="mt-2 font-heading text-[clamp(1.4rem,3cqw,2rem)] leading-tight">{copy.quiz[answers.length].question}</p>
              <div className="mt-6 grid gap-3">
                {copy.quiz[answers.length].options.map((option, index) => (
                  <button key={option} type="button" onClick={() => setAnswers(list => [...list, index])}
                    className={cn("group flex min-h-14 items-center justify-between rounded-2xl bg-background px-5 text-left text-base font-medium ring-1 ring-mix-heading/10 transition-[box-shadow,transform] hover:-translate-y-0.5 hover:ring-mix-heading/40 motion-reduce:transition-none", focus)}>
                    {option}<ArrowRight size={17} aria-hidden="true" className="opacity-40 transition-opacity group-hover:opacity-100" />
                  </button>
                ))}
              </div>
              {answers.length > 0 && <button type="button" onClick={() => setAnswers(list => list.slice(0, -1))} className={cn("mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm text-mix-heading/60", focus)}><ArrowLeft size={15} aria-hidden="true" />{copy.back}</button>}
            </div>
          ) : (
            <div>
              <p role="status" className="sr-only">{copy.results}</p>
              <div className="grid gap-4 [@container_studio_(min-width:640px)]:grid-cols-3">
                {matches.map((product, index) => (
                  <article key={product.id} className="flex min-w-0 flex-col overflow-hidden rounded-3xl bg-secondary-background">
                    <button type="button" onClick={() => onProduct(product.id)} aria-label={`${copy.view}: ${product.name}`} className={cn("relative aspect-[4/5] overflow-hidden", focus)}>
                      {photo(product.src, product.name, 600)}
                      {index === 0 && <span className="absolute left-3 top-3 rounded-full bg-background px-3 py-1 text-[11px] font-semibold">Best match</span>}
                    </button>
                    <div className="flex flex-1 flex-col p-4">
                      <p className="truncate font-medium">{product.name}</p>
                      <p className="mt-1 tabular-nums">{subscribe[product.id] ? <><span className="mr-2 text-sm text-mix-heading/45 line-through">{product.priceLabel}</span>{formatMoney(priceOf(product) * 0.9)}</> : product.priceLabel}</p>
                      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm text-mix-heading/70">
                        <input type="checkbox" checked={Boolean(subscribe[product.id])} onChange={event => setSubscribe(map => ({ ...map, [product.id]: event.target.checked }))} className="h-4 w-4 accent-primary" />
                        <Repeat size={14} aria-hidden="true" />{copy.subscribe}
                      </label>
                      <button type="button" onClick={() => add(product)} className={cn("mt-auto inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-heading text-sm font-semibold text-background", added.includes(product.id) && "bg-primary text-primary-foreground", focus)}>
                        {added.includes(product.id) && <Check size={15} aria-hidden="true" />}{added.includes(product.id) ? copy.added : copy.add}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-4">
                <button type="button" onClick={() => setAnswers([])} className={cn("min-h-11 text-sm font-medium underline underline-offset-4", focus)}>{copy.retake}</button>
                {added.length > 0 && <button type="button" onClick={onViewBag} className={cn("inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground", focus)}>{copy.viewBag}</button>}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Curated collections: one large tile and two stacked. */}
      <section aria-labelledby={`${id}-curated`} className={cn(gutter, "pb-[clamp(3rem,8cqw,6rem)]")}>
        <h4 id={`${id}-curated`} className="font-heading text-[clamp(1.8rem,4cqw,3rem)] tracking-[-0.02em]">{copy.collectionsTitle}</h4>
        <div className="mt-6 grid gap-3 [@container_studio_(min-width:700px)]:grid-cols-[1.3fr_1fr] [@container_studio_(min-width:700px)]:grid-rows-2">
          {[0, 1, 2].map(index => {
            const item = productAt(products, index + 2);
            return (
              <button key={index} type="button" onClick={() => onBrowse(item.collection)} className={cn("group relative overflow-hidden rounded-3xl text-left text-white", index === 0 ? "aspect-[4/5] [@container_studio_(min-width:700px)]:row-span-2 [@container_studio_(min-width:700px)]:aspect-auto" : "aspect-[16/10]", focus)}>
                {photo(item.src, "", index === 0 ? 1000 : 700, "absolute inset-0 transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none")}
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-3">
                  <span><span className="block text-xs text-white/70">{item.collection}</span><span className="block font-heading text-[clamp(1.4rem,3cqw,2.2rem)] leading-tight">{item.name}</span></span>
                  <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium">{copy.collectionsAction}<ArrowUpRight size={16} aria-hidden="true" /></span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Membership. */}
      <section aria-labelledby={`${id}-member`} className={cn(gutter, "bg-secondary py-[clamp(3rem,8cqw,6rem)] text-white")}>
        <h4 id={`${id}-member`} className="font-heading text-[clamp(1.8rem,4cqw,3rem)] tracking-[-0.02em]">{copy.memberTitle}</h4>
        <p className="mt-3 max-w-[46ch] text-base text-white/65">{copy.memberIntro}</p>
        <div className="mt-8 grid gap-3 [@container_studio_(min-width:700px)]:grid-cols-3">
          {copy.tiers.map((tier, index) => (
            <div key={tier.name} className={cn("rounded-3xl p-6", index === 0 ? "bg-white text-black" : "bg-white/[.06] ring-1 ring-white/10")}>
              <div className="flex items-center justify-between gap-2"><p className="font-heading text-2xl">{tier.name}</p>{index === 0 && <span className="rounded-full bg-black px-3 py-1 text-[11px] font-semibold text-white">{copy.currentTier}</span>}</div>
              <p className={cn("mt-1 text-xs", index === 0 ? "text-black/55" : "text-white/55")}>{tier.from}</p>
              <ul className="mt-5 space-y-2 text-sm">{tier.perks.map(perk => <li key={perk} className="flex items-center gap-2"><Check size={14} aria-hidden="true" />{perk}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="mt-3 grid gap-3 [@container_studio_(min-width:700px)]:grid-cols-3">
          <div className="rounded-3xl bg-white/[.06] p-6 ring-1 ring-white/10">
            <p className="flex items-center gap-2 text-xs text-white/60"><Award size={14} aria-hidden="true" />{copy.points.label}</p>
            <p className="mt-2 font-heading text-5xl tabular-nums">{copy.points.value}</p>
            <div className="mt-4 h-1.5 rounded-full bg-white/15"><div className="h-full w-[83%] rounded-full bg-white" /></div>
            <p className="mt-2 text-xs text-white/60">{copy.points.next}</p>
          </div>
          <div className="rounded-3xl bg-white/[.06] p-6 ring-1 ring-white/10">
            <p className="flex items-center gap-2 text-xs text-white/60"><Package size={14} aria-hidden="true" />{copy.order.label}</p>
            <ol className="mt-4 space-y-3 text-sm">
              {copy.order.steps.map((step, index) => (
                <li key={step} className="flex items-center gap-3">
                  <span className={cn("flex h-6 w-6 items-center justify-center rounded-full text-[10px]", index < 2 ? "bg-white text-black" : "ring-1 ring-white/25 text-white/60")}>{index < 2 ? <Check size={12} aria-hidden="true" /> : index + 1}</span>
                  <span className={index < 2 ? "" : "text-white/55"}>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-3xl bg-white/[.06] p-6 ring-1 ring-white/10">
            <p className="text-xs text-white/60">{copy.saved}</p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[0, 1, 2].map(index => { const item = productAt(products, index); return <button key={index} type="button" onClick={() => onProduct(item.id)} aria-label={item.name} className="aspect-square overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">{photo(item.src, "", 200)}</button>; })}
            </div>
            <p className="mt-3 text-xs text-white/45">{copy.exampleNote}</p>
          </div>
        </div>
      </section>

      {/* Subscribe & save with a frequency selector. */}
      <section aria-labelledby={`${id}-subscribe`} className={cn(gutter, "grid gap-8 py-[clamp(3rem,8cqw,6rem)] [@container_studio_(min-width:760px)]:grid-cols-2 [@container_studio_(min-width:760px)]:items-center")}>
        <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-muted">{photo(featured.src, featured.name, 900)}</div>
        <div>
          <h4 id={`${id}-subscribe`} className="font-heading text-[clamp(2rem,4.4cqw,3.4rem)] leading-[1] tracking-[-0.02em]">{copy.subscriptionTitle}</h4>
          <p className="mt-4 max-w-[40ch] text-base leading-relaxed text-mix-heading/65">{copy.subscriptionBody}</p>
          <p className="mt-6 font-medium">{featured.name}</p>
          <fieldset className="mt-3">
            <legend className="text-sm text-mix-heading/60">{copy.frequencyLabel}</legend>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {copy.frequencies.map((item, index) => (
                <button key={item} type="button" aria-pressed={frequency === index} onClick={() => { setFrequency(index); setSubscribed(false); }} className={cn("min-h-12 rounded-2xl text-sm font-medium ring-1 transition-colors", frequency === index ? "bg-heading text-background ring-heading" : "ring-mix-heading/15 hover:ring-mix-heading/40", focus)}>{item}</button>
              ))}
            </div>
          </fieldset>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-heading text-3xl tabular-nums">{formatMoney(subscriptionPrice)} <span className="font-body text-sm text-mix-heading/55">{copy.perDelivery}</span></p>
              <p className="text-sm font-medium text-primary">{copy.yearSaving.replace("{amount}", formatMoney(priceOf(featured) * 0.1 * deliveriesPerYear[frequency]))}</p>
            </div>
            <button type="button" onClick={() => { add(featured, true); setSubscribed(true); }} className={cn("inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground", focus)}>{subscribed && <Check size={16} aria-hidden="true" />}{subscribed ? copy.subscribed : copy.subscribeAction}</button>
          </div>
        </div>
      </section>

      {/* Gift service and private appointment. */}
      <section className={cn(gutter, "grid gap-3 pb-[clamp(3rem,8cqw,6rem)] [@container_studio_(min-width:760px)]:grid-cols-[1.3fr_1fr]")}>
        <div className="rounded-3xl bg-secondary-background p-[clamp(1.5rem,4cqw,2.5rem)]">
          <p className="flex items-center gap-2 text-sm text-mix-heading/60"><Gift size={16} aria-hidden="true" />{copy.giftTitle}</p>
          <p className="mt-3 max-w-[40ch] font-heading text-[clamp(1.4rem,3cqw,2rem)] leading-snug">{copy.giftBody}</p>
          <label htmlFor={`${id}-note`} className="mt-6 block text-sm text-mix-heading/60">{copy.giftNoteLabel}</label>
          <textarea id={`${id}-note`} value={giftNote} onChange={event => { setGiftNote(event.target.value); setGift(false); }} maxLength={160} rows={2} placeholder={copy.giftNotePlaceholder}
            className={cn("mt-2 w-full resize-none rounded-2xl border border-mix-heading/15 bg-background p-4 text-base", focus)} />
          <button type="button" onClick={() => setGift(true)} className={cn("mt-4 inline-flex min-h-12 items-center gap-2 rounded-full bg-heading px-6 text-sm font-semibold text-background", focus)}>{gift && <Check size={16} aria-hidden="true" />}{gift ? copy.giftAdded : copy.giftAction}</button>
        </div>
        <div className="flex flex-col justify-between rounded-3xl bg-heading p-[clamp(1.5rem,4cqw,2.5rem)] text-background">
          <div>
            <Video size={26} aria-hidden="true" />
            <p className="mt-5 font-heading text-[clamp(1.5rem,3cqw,2.2rem)] leading-tight">{copy.appointmentTitle}</p>
            <p className="mt-3 text-sm text-mix-background/70">{copy.appointmentBody}</p>
          </div>
          {appointment ? <p role="status" className="mt-6 text-sm text-mix-background/80">{copy.appointmentDone}</p> : (
            <form onSubmit={book} className="mt-6"><button type="submit" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-background px-6 text-sm font-semibold text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-heading">{copy.appointmentAction}<ArrowRight size={16} aria-hidden="true" /></button></form>
          )}
        </div>
      </section>
    </div>
  );
}
