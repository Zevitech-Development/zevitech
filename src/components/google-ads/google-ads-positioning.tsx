"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";

import { trackGoogleAdsEvent } from "@/lib/google-ads-analytics";

const motionEase = [0.22, 1, 0.36, 1] as const;

const ordinaryItems = [
  "Reports clicks and impressions",
  "Launches campaigns, then set-and-forget",
  "Job ends at the click",
  "Optimizes toward vanity metrics",
  "One-size-fits-all account structure",
];

const systemItems = [
  "Builds the full path from search to sale",
  "Aligns ads, landing pages, tracking, and checkout",
  "Optimizes toward leads, bookings, and revenue",
  "Tests continuously and scales proven winners",
  "Strategy shaped around your exact business model",
];

export default function GoogleAdsPositioning() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="layout-standard py-16 md:py-24">
      <motion.div
        className="mx-auto mb-10 max-w-3xl text-center md:mb-14"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: motionEase }}
      >
        <span className="ga-section-kicker">More than ads</span>
        <h2 className="mt-5 font-heading text-4xl font-bold tracking-tight text-heading md:text-5xl">
          We&apos;re not an ordinary ads company. We&apos;re a <span className="ga-gradient-text">complete sales growth system</span> for your business.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-paragraph md:text-lg">
          Anyone can run ads. We engineer the entire journey your customer travels&mdash;from the first search to the closed sale&mdash;so every part works together and every dollar has a job.
        </p>
      </motion.div>

      <div className="ga-versus mx-auto max-w-4xl">
        <motion.div
          className="ga-versus-card is-ordinary"
          initial={prefersReducedMotion ? false : { opacity: 0, x: -36 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: motionEase }}
        >
          <h3>An ordinary ads agency</h3>
          <ul>
            {ordinaryItems.map((item) => (
              <li key={item}>
                <span aria-hidden="true"><X /></span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="ga-versus-card is-system"
          initial={prefersReducedMotion ? false : { opacity: 0, x: 36 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.08, ease: motionEase }}
        >
          <h3>The Zevitech growth system</h3>
          <ul>
            {systemItems.map((item) => (
              <li key={item}>
                <span aria-hidden="true"><Check /></span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        className="mt-10 flex justify-center"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: motionEase }}
      >
        <a
          href="#google-ads-growth-form"
          className="ga-primary-cta group"
          onClick={() => trackGoogleAdsEvent("ga_audit_cta_click", { location: "positioning" })}
        >
          Build My Growth System
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </a>
      </motion.div>
    </section>
  );
}
