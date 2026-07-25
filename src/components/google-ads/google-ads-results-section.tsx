"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Expand, X } from "lucide-react";

import { trackGoogleAdsEvent } from "@/lib/google-ads-analytics";

type ResultItem = {
  resultNo: number;
  img: string | StaticImageData;
};

type GoogleAdsResultsSectionProps = {
  results: ResultItem[];
};

export default function GoogleAdsResultsSection({ results }: GoogleAdsResultsSectionProps) {
  const [activeResult, setActiveResult] = useState<ResultItem | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const modalPanelRef = useRef<HTMLDivElement>(null);
  const modalCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!activeResult) return;

    const previouslyFocused = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const focusFrame = window.requestAnimationFrame(() => {
      modalCloseRef.current?.focus();
    });

    const handleDialogKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveResult(null);
        return;
      }

      if (event.key !== "Tab" || !modalPanelRef.current) return;

      const focusableElements = Array.from(
        modalPanelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (!focusableElements.length) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleDialogKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleDialogKeyDown);
      previouslyFocused?.focus();
    };
  }, [activeResult]);

  return (
    <section className="ga-results-section relative overflow-hidden py-20 md:py-28">
      <div className="ga-results-glow" aria-hidden="true" />
      <div className="layout-standard relative z-10">
        <motion.div
          className="mx-auto mb-12 max-w-4xl text-center md:mb-16"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 36, scale: 0.985 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="ga-section-kicker">Proof before promises</span>
          <h2 className="mt-5 font-heading text-4xl font-bold tracking-tight text-heading md:text-6xl">
            See the work behind the <span className="ga-gradient-text">results.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base font-medium leading-relaxed text-paragraph md:text-xl">
            Explore the Google Ads performance screenshots already featured by Zevitech. Open any card to see how campaign activity, conversion value, cost, and growth signals can be made visible.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.12 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {results.map((result) => (
            <motion.button
              key={result.resultNo}
              type="button"
              onClick={() => {
                setActiveResult(result);
                trackGoogleAdsEvent("ga_result_open", { result: result.resultNo });
              }}
              className="ga-result-card group text-left"
              aria-label={`Open Google Ads campaign result ${result.resultNo}`}
              variants={{
                hidden: { opacity: 0, y: 34 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <div className="ga-result-image-wrap">
                <Image
                  src={result.img}
                  alt={`Zevitech Google Ads campaign result ${result.resultNo}`}
                  fill
                  sizes="(max-width: 767px) 90vw, (max-width: 1440px) 45vw, 30vw"
                  className="object-contain object-top transition-transform duration-700 group-hover:scale-[1.025]"
                />
                <div className="ga-result-sheen" aria-hidden="true" />
                <div className="ga-result-expand"><Expand className="h-4 w-4" /> View full result</div>
              </div>
              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Campaign evidence</span>
                  <p className="mt-1 font-semibold text-heading">Performance snapshot {String(result.resultNo).padStart(2, "0")}</p>
                </div>
                <span className="ga-result-arrow"><ArrowRight className="h-4 w-4" /></span>
              </div>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 flex flex-col items-center justify-between gap-6 rounded-[2rem] border border-blue-100 bg-white/80 px-6 py-7 shadow-[0_18px_60px_rgba(10,61,145,.08)] backdrop-blur md:flex-row md:px-9"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 32, scale: 0.99 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <p className="font-heading text-2xl font-bold text-heading md:text-3xl">Where is your growth journey losing momentum?</p>
            <p className="mt-1 text-paragraph">Start with a focused audit of targeting, tracking, lead flow, checkout behavior, spend, and conversion friction.</p>
          </div>
          <a href="#google-ads-growth-form" className="ga-primary-cta shrink-0" onClick={() => trackGoogleAdsEvent("ga_audit_cta_click", { location: "results" })}>Build My Campaign Now <ArrowRight className="h-5 w-5" /></a>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeResult && (
          <motion.div
            className="ga-result-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Google Ads campaign result ${activeResult.resultNo}`}
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setActiveResult(null);
            }}
          >
            <motion.div
              ref={modalPanelRef}
              className="ga-result-modal-panel"
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.96, y: 16 }}
              transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 280, damping: 26 }}
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Campaign evidence</span>
                  <p className="font-semibold text-heading">Performance snapshot {String(activeResult.resultNo).padStart(2, "0")}</p>
                </div>
                <button ref={modalCloseRef} type="button" onClick={() => setActiveResult(null)} className="ga-modal-close" aria-label="Close result preview"><X className="h-5 w-5" /></button>
              </div>
              <div className="relative h-[min(72dvh,720px)] min-h-[260px] w-full bg-slate-50">
                <Image src={activeResult.img} alt={`Full Zevitech Google Ads campaign result ${activeResult.resultNo}`} fill sizes="95vw" className="object-contain p-3 sm:p-6" priority />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
