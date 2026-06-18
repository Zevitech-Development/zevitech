"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { aiOutboundMethod } from "@/content/landing/ai-calling-page-content";
import AiSectionHead from "./ai-section-head";

const LEAD_ROWS = [
  { tag: "COLD" },
  { tag: "COLD" },
  { tag: "OLD" },
  { tag: "NEW" },
];

const CALENDAR_SLOTS = [0, 1, 2, 3];

export default function AiOutboundMethod() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const c = aiOutboundMethod;

  return (
    <section
      className="py-[72px] md:py-[84px] lg:py-[120px] relative z-[2] max-w-[1200px] mx-auto px-[18px] md:px-6"
      id="method"
      ref={ref}
    >
      <AiSectionHead
        eyebrow={c.eyebrow}
        title={c.title}
        titleGrad={c.titleGrad}
        description={c.description}
        center
      />

      {/* Three-stage rail */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-2 md:gap-0 mt-6">
        {/* Stage 1 — leads */}
        <motion.div
          className="flex flex-col items-center gap-3 flex-1 max-w-[250px] w-full"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full h-[176px] bg-[var(--ai-panel)] border border-[var(--ai-line)] rounded-[16px] px-4 py-4 shadow-[var(--ai-shadow-sm)] flex flex-col justify-center gap-2">
            {LEAD_ROWS.map((row, i) => (
              <div
                key={i}
                className="flex items-center gap-[9px] px-[10px] py-2 rounded-[10px] bg-[rgba(125,145,180,.09)]"
                style={{
                  animation: `ai-ob-lead 4.5s ease-in-out ${i * 0.9}s infinite`,
                }}
              >
                <span className="w-2 h-2 rounded-full bg-[var(--ai-muted)] flex-shrink-0" />
                <span className="flex-1 h-[7px] rounded bg-[rgba(125,145,180,.30)]" />
                <span className="font-mono text-[10px] text-[var(--ai-muted)] tracking-[0.04em]">
                  {row.tag}
                </span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <b className="font-sora text-[15px] text-[var(--ai-ink)] block">
              <i className="not-italic text-[var(--ai-blue)]">
                {c.stages[0].step}
              </i>{" "}
              {c.stages[0].label}
            </b>
            <span className="text-[12.5px] text-[var(--ai-muted)]">
              {c.stages[0].sub}
            </span>
          </div>
        </motion.div>

        {/* Arrow 1 */}
        <ArrowConnector delay={0.15} />

        {/* Stage 2 — AI orb */}
        <motion.div
          className="flex flex-col items-center gap-3 flex-1 max-w-[250px] w-full"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="w-full h-[176px] bg-[var(--ai-panel)] border border-[var(--ai-line)] rounded-[16px] shadow-[var(--ai-shadow-sm)] flex items-center justify-center">
            <div className="relative w-[130px] h-[130px] grid place-items-center">
              {/* Rings */}
              {[0, 0.8, 1.6].map((delay, i) => (
                <span
                  key={i}
                  className="absolute w-[78px] h-[78px] rounded-full border-2 border-[var(--ai-blue)]"
                  style={{
                    animation: `ai-ob-ring 2.4s ease-out ${delay}s infinite`,
                  }}
                />
              ))}
              {/* Core orb */}
              <div
                className="relative z-[2] w-[78px] h-[78px] rounded-full grid place-items-center"
                style={{
                  background: "var(--ai-grad)",
                  boxShadow: "0 0 44px rgba(38,112,255,.55)",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-9 h-9 stroke-white fill-none stroke-2 stroke-round stroke-linecap-round stroke-linejoin-round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3 4.18 2 2 0 0 1 5 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="text-center">
            <b className="font-sora text-[15px] text-[var(--ai-ink)] block">
              <i className="not-italic text-[var(--ai-blue)]">
                {c.stages[1].step}
              </i>{" "}
              {c.stages[1].label}
            </b>
            <span className="text-[12.5px] text-[var(--ai-muted)]">
              {c.stages[1].sub}
            </span>
          </div>
        </motion.div>

        {/* Arrow 2 */}
        <ArrowConnector delay={0.3} />

        {/* Stage 3 — calendar */}
        <motion.div
          className="flex flex-col items-center gap-3 flex-1 max-w-[250px] w-full"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="w-full h-[176px] bg-[var(--ai-panel)] border border-[var(--ai-line)] rounded-[16px] px-4 py-4 shadow-[var(--ai-shadow-sm)] flex flex-col justify-center gap-2">
            {CALENDAR_SLOTS.map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-[9px] px-[10px] py-2 rounded-[10px] bg-[rgba(16,185,129,.10)]"
                style={{
                  opacity: 0,
                  animation: `ai-ob-pop 4.5s ease-in-out ${0.3 + i * 0.9}s infinite`,
                }}
              >
                <span className="w-[18px] h-[18px] rounded-full bg-[var(--ai-emerald)] flex-shrink-0 grid place-items-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-[11px] h-[11px] stroke-white fill-none stroke-[3]"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <span className="flex-1 h-[7px] rounded bg-[rgba(16,185,129,.35)]" />
              </div>
            ))}
          </div>
          <div className="text-center">
            <b className="font-sora text-[15px] text-[var(--ai-ink)] block">
              <i className="not-italic text-[var(--ai-blue)]">
                {c.stages[2].step}
              </i>{" "}
              {c.stages[2].label}
            </b>
            <span className="text-[12.5px] text-[var(--ai-muted)]">
              {c.stages[2].sub}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Footer pills + CTA */}
      <motion.div
        className="flex flex-wrap gap-[10px] justify-center items-center mt-8"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.55 }}
      >
        {c.pills.map((pill, i) => (
          <span
            key={i}
            className="text-[13px] font-semibold text-[var(--ai-ink)] bg-[var(--ai-panel)] border border-[var(--ai-line)] rounded-full px-[15px] py-[9px]"
          >
            {pill}
          </span>
        ))}
        <a
          href="#livedemo"
          className="inline-flex items-center gap-2 font-semibold text-[15px] px-6 py-[10px] rounded-full text-white transition-all duration-200 hover:shadow-[0_14px_36px_rgba(45,107,255,.45)] active:scale-95"
          style={{
            background: "var(--ai-grad)",
            boxShadow: "0 10px 28px rgba(45,107,255,.32)",
          }}
        >
          {c.ctaLabel}
        </a>
      </motion.div>
    </section>
  );
}

function ArrowConnector({ delay }: { delay: number }) {
  return (
    <>
      {/* Horizontal arrow — desktop */}
      <div className="hidden md:block flex-shrink-0 self-start mt-[84px] mx-1 relative h-[3px] w-[62px] rounded-[3px] bg-gradient-to-r from-[rgba(38,112,255,.30)] to-[rgba(109,91,245,.30)]">
        <span
          className="absolute top-1/2 -translate-y-1/2 w-[11px] h-[11px] rounded-full bg-[var(--ai-blue)] shadow-[0_0_14px_var(--ai-blue)]"
          style={{ animation: `ai-ob-flow 1.8s linear ${delay}s infinite` }}
        />
      </div>
      {/* Vertical arrow — mobile */}
      <div className="md:hidden self-center relative w-[3px] h-[34px] rounded-[3px] bg-gradient-to-b from-[rgba(38,112,255,.30)] to-[rgba(109,91,245,.30)]" />
    </>
  );
}
