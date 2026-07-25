"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  MousePointerClick,
  Search,
  Target,
  TrendingUp,
} from "lucide-react";

import { trackGoogleAdsEvent } from "@/lib/google-ads-analytics";

const motionEase = [0.22, 1, 0.36, 1] as const;

const conversionJourney = [
  {
    label: "High-intent search",
    title: "A buyer shows real intent.",
    description: "Someone actively searches for a service, solution, or product like yours.",
    icon: Search,
  },
  {
    label: "Relevant ad",
    title: "The message earns qualified attention.",
    description: "The ad matches the need, location, offer, and moment of purchase intent.",
    icon: MousePointerClick,
  },
  {
    label: "Conversion path",
    title: "The next action feels obvious.",
    description: "The landing page guides the visitor toward a call, form, cart, or checkout.",
    icon: Target,
  },
  {
    label: "Lead or sale",
    title: "The result becomes measurable.",
    description: "Tracking shows which campaigns create customers and revenue so the winners can scale.",
    icon: TrendingUp,
  },
] as const;

const businessOutcomes = [
  "Qualified calls & forms",
  "Bookings & opportunities",
  "Carts, checkouts & purchases",
  "Signals for smarter scaling",
];

export function GoogleAdsCampaignCta() {
  const [activeStep, setActiveStep] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const activeJourneyStep = conversionJourney[activeStep];
  const ActiveJourneyIcon = activeJourneyStep.icon;

  return (
    <section className="layout-standard py-10 md:py-16">
      <div className="ga-campaign-cta">
        <div className="ga-campaign-grid" aria-hidden="true" />

        <div className="ga-campaign-layout">
          <motion.div
            className="ga-campaign-copy"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.62, ease: motionEase }}
          >
            <span className="ga-campaign-kicker">
              <span className="ga-live-dot" /> Select partnerships available
            </span>
            <h2>Every click should lead somewhere valuable.</h2>
            <p>
              We connect intent, ads, landing pages, checkout journeys, and tracking so spend can optimize toward customers—not empty traffic.
            </p>

            <div className="ga-campaign-commitments">
              {[
                "Tracking verified before scaling",
                "Lead or purchase quality reviewed",
                "Budget follows proven results",
              ].map((item) => (
                <span key={item}>
                  <CheckCircle2 aria-hidden="true" /> {item}
                </span>
              ))}
            </div>

            <div className="ga-campaign-actions">
              <a href="#google-ads-growth-roadmap" className="ga-primary-cta ga-primary-cta-light group" onClick={() => trackGoogleAdsEvent("ga_roadmap_cta_click", { location: "campaign-cta" })}>
                See The Growth Roadmap
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#google-ads-growth-form" className="ga-secondary-cta ga-secondary-cta-dark" onClick={() => trackGoogleAdsEvent("ga_audit_cta_click", { location: "campaign-cta" })}>
                Request My Free Growth Audit
              </a>
            </div>
          </motion.div>

          <motion.div
            className="ga-conversion-visual"
            initial={prefersReducedMotion ? false : { opacity: 0, x: 28, scale: 0.985 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: 0.68, delay: 0.08, ease: motionEase }}
          >
            <div className="ga-conversion-topbar">
              <span><span className="ga-live-dot" /> Click-to-customer system</span>
              <small>Interactive · explore each step</small>
            </div>

            <div className="ga-conversion-path">
              <span className="ga-conversion-route ga-conversion-route-horizontal" aria-hidden="true">
                <motion.span
                  initial={false}
                  animate={{ scaleX: activeStep / (conversionJourney.length - 1) }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.32, ease: motionEase }}
                />
              </span>
              <span className="ga-conversion-route ga-conversion-route-vertical" aria-hidden="true">
                <motion.span
                  initial={false}
                  animate={{ scaleY: activeStep / (conversionJourney.length - 1) }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.32, ease: motionEase }}
                />
              </span>

              {conversionJourney.map((step, index) => {
                const StepIcon = step.icon;
                const active = activeStep === index;

                return (
                  <motion.button
                    key={step.label}
                    type="button"
                    className={`ga-conversion-node ${active ? "is-active" : ""}`}
                    aria-pressed={active}
                    onClick={() => setActiveStep(index)}
                    onFocus={() => setActiveStep(index)}
                    onMouseEnter={() => setActiveStep(index)}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 14, scale: 0.96 }}
                    whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.42, delay: 0.14 + index * 0.07, ease: motionEase }}
                  >
                    <span className="ga-conversion-node-icon"><StepIcon aria-hidden="true" /></span>
                    <span>
                      <small>0{index + 1}</small>
                      <strong>{step.label}</strong>
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <div className="ga-conversion-detail" aria-live="polite">
              <AnimatePresence initial={false} mode="sync">
                <motion.div
                  key={activeStep}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.24, ease: motionEase }}
                >
                  <span className="ga-conversion-detail-icon"><ActiveJourneyIcon aria-hidden="true" /></span>
                  <span>
                    <small>Step 0{activeStep + 1}</small>
                    <h3>{activeJourneyStep.title}</h3>
                    <p>{activeJourneyStep.description}</p>
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="ga-conversion-outcomes" aria-label="Possible campaign outcomes">
              {businessOutcomes.map((outcome) => (
                <span key={outcome}><CheckCircle2 aria-hidden="true" /> {outcome}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function GoogleAdsStickyCta() {
  return (
    <div className="ga-sticky-cta lg:hidden" role="region" aria-label="Google Ads consultation actions">
      <a href="#google-ads-growth-form" className="ga-sticky-primary" onClick={() => trackGoogleAdsEvent("ga_audit_cta_click", { location: "sticky" })}>Free Growth Audit <ArrowRight className="h-4 w-4" /></a>
    </div>
  );
}
