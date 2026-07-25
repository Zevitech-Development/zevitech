"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

import { trackGoogleAdsEvent } from "@/lib/google-ads-analytics";

const motionEase = [0.22, 1, 0.36, 1] as const;

const faqItems = [
  {
    question: "We've run Google Ads before and it didn't work. Why would this be different?",
    answer:
      "Most underperforming accounts fail on targeting and tracking, not on Google Ads itself. We start with an audit of your search terms, conversion data, and landing experience before spending anything new. You see exactly where the previous budget leaked, and the rebuilt campaigns optimize toward tracked leads or purchases—not clicks.",
  },
  {
    question: "How do you stop wasted ad spend?",
    answer:
      "We continuously refine search terms, negative keywords, locations, devices, audiences, and schedules so spend concentrates on searches with real buying intent. Budget only scales into campaigns that produce tracked, valuable results.",
  },
  {
    question: "How do you make sure the leads are actually qualified?",
    answer:
      "We track calls, forms, and bookings separately, review lead quality with you, and feed those signals back into the campaigns. If a keyword or audience produces unqualified inquiries, it loses budget—qualification is part of the optimization loop, not an afterthought.",
  },
  {
    question: "We're an ecommerce brand. Do you handle revenue, not just traffic?",
    answer:
      "Yes. For ecommerce we connect product feeds, Shopping and Performance Max campaigns, and cart, checkout, and purchase tracking. Optimization targets completed sales and revenue, and remarketing recovers shoppers who didn't finish checkout.",
  },
  {
    question: "Is my conversion tracking set up correctly?",
    answer:
      "We verify it before scaling anything. That includes call, form, booking, cart, checkout, and purchase events—plus attribution parameters on your landing pages—so every campaign decision is based on data you can trust.",
  },
  {
    question: "What happens after I request the free growth audit?",
    answer:
      "You pick a strategy-call time immediately after submitting. Before the call, we review your account, website, and tracking. On the call you get clear findings and a prioritized plan—whether or not you work with us. No obligation.",
  },
] as const;

export default function GoogleAdsFaq() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="layout-standard py-16 md:py-24" id="google-ads-faq">
      <motion.div
        className="mx-auto mb-10 max-w-3xl text-center md:mb-14"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: motionEase }}
      >
        <span className="ga-section-kicker">Real questions, straight answers</span>
        <h2 className="mt-5 font-heading text-4xl font-bold tracking-tight text-heading md:text-5xl">
          Before you invest in <span className="ga-gradient-text">Google Ads.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-paragraph md:text-lg">
          The questions serious service businesses and ecommerce brands ask before trusting an agency with their ad spend.
        </p>
      </motion.div>

      <motion.div
        className="ga-faq-list mx-auto max-w-3xl"
        initial={prefersReducedMotion ? false : "hidden"}
        whileInView={prefersReducedMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06 } },
        }}
      >
        {faqItems.map((item, index) => (
          <motion.details
            key={item.question}
            className="ga-faq-item"
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.42, ease: motionEase },
              },
            }}
            onToggle={(event) => {
              if ((event.target as HTMLDetailsElement).open) {
                trackGoogleAdsEvent("ga_faq_open", { question_index: index + 1 });
              }
            }}
          >
            <summary>
              <span>{item.question}</span>
              <ChevronDown aria-hidden="true" />
            </summary>
            <p>{item.answer}</p>
          </motion.details>
        ))}
      </motion.div>

      <motion.div
        className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-3 text-center"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: motionEase }}
      >
        <a
          href="#google-ads-growth-form"
          className="ga-primary-cta group"
          onClick={() => trackGoogleAdsEvent("ga_audit_cta_click", { location: "faq" })}
        >
          Build My Campaign Now
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </a>
        <span className="text-sm text-paragraph">
          Still unsure? Ask us anything in the form&mdash;the audit is free and there&apos;s no obligation.
        </span>
      </motion.div>
    </section>
  );
}
