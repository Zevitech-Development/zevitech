"use client";

import { motion } from "framer-motion";
import { aiHeroContent } from "@/content/landing/ai-calling-page-content";
import LiveOutreachDashboard from "./live-outreach-dashboard";
import StatsTicker from "./stats-ticker";

interface AiCallingHeroProps {
  onOpenModal: () => void;
}

export default function AiCallingHero({ onOpenModal }: AiCallingHeroProps) {
  const c = aiHeroContent;

  return (
    <section className="pt-[114px] md:pt-[160px] pb-[72px] md:pb-[80px] relative z-[2] max-w-[1200px] mx-auto px-[18px] md:px-6">
      {/* Two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-11 items-center">
        {/* Left — copy */}
        <div>
          {/* Badge row */}
          <motion.div
            className="flex gap-2 items-center mb-[22px] flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-[11px] tracking-[0.12em] uppercase border border-[var(--ai-line)] bg-[var(--ai-panel)] px-[13px] py-[7px] rounded-full text-[var(--ai-blue)] shadow-[var(--ai-shadow-sm)]">
              {c.pill}
            </span>
            <span className="inline-flex items-center gap-[7px] font-mono text-[11px] text-[var(--ai-emerald)]">
              <span className="w-[7px] h-[7px] rounded-full bg-[var(--ai-emerald)] shadow-[0_0_10px_var(--ai-emerald)] animate-ai-blink inline-block" />
              {c.liveLabel}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-sora font-extrabold text-[var(--ai-ink)] leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: "clamp(40px,5.4vw,72px)" }}
            initial={{ opacity: 0, y: 46 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {c.headline[0]}
            <span
              style={{
                background: "var(--ai-grad)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {c.headline[1]}
            </span>
          </motion.h1>

          {/* Lead */}
          <motion.p
            className="text-[18px] text-[var(--ai-muted)] max-w-[520px] mt-[22px] mb-[30px]"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            {c.lead}{" "}
            <b className="text-[var(--ai-ink)]">{c.leadBold}</b>
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex gap-[14px] flex-wrap items-center"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={onOpenModal}
              className="inline-flex items-center gap-2 font-semibold text-[15px] px-6 py-[14px] rounded-full text-white transition-all duration-200 hover:shadow-[0_18px_44px_rgba(45,107,255,.45)] active:scale-95"
              style={{ background: "var(--ai-grad)", boxShadow: "0 12px 30px rgba(45,107,255,.32)" }}
            >
              {c.ctaPrimary}
            </button>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 font-semibold text-[15px] px-6 py-[14px] rounded-full border border-[var(--ai-line)] bg-[var(--ai-panel)] text-[var(--ai-ink)] hover:border-[var(--ai-blue)] transition-colors duration-200"
            >
              {c.ctaGhost}
            </a>
          </motion.div>

          <p className="text-[13px] text-[var(--ai-muted)] mt-[14px]">{c.ctaNote}</p>

          {/* Trust chips */}
          <div className="flex flex-wrap gap-[10px] mt-[30px]">
            {c.chips.map((chip, i) => (
              <span
                key={i}
                className="text-[12.5px] text-[var(--ai-muted)] border border-[var(--ai-line)] bg-[var(--ai-panel)] px-[14px] py-2 rounded-full shadow-[var(--ai-shadow-sm)]"
              >
                {chip.text}
                {chip.bold && <b className="text-[var(--ai-emerald)]">{chip.bold}</b>}
                {"suffix" in chip && (chip as any).suffix}
              </span>
            ))}
          </div>
        </div>

        {/* Right — live outreach dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <LiveOutreachDashboard />
        </motion.div>
      </div>

      {/* Ticker */}
      <StatsTicker />
    </section>
  );
}
