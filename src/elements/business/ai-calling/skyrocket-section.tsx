"use client";

import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { aiSkyStats } from "@/content/landing/ai-calling-page-content";

const AiOrb = dynamic(() => import("./skyrocket-orb"), { ssr: false });

export default function AiSkyrocketSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section className="py-[72px] md:py-[84px] lg:py-[120px] relative z-[2] max-w-[1200px] mx-auto px-6" id="skyrocket">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[50px] items-center">
        {/* Left copy */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="font-mono text-[12px] tracking-[0.22em] uppercase text-[var(--ai-blue)]">
            The takeoff
          </span>
          <h2
            className="font-sora font-extrabold text-[var(--ai-ink)] mt-[14px] leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: "clamp(32px,4.4vw,54px)" }}
          >
            Watch your pipeline{" "}
            <span
              style={{
                background: "var(--ai-grad)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              take off.
            </span>
          </h2>
          <p className="text-[var(--ai-muted)] text-[17px] mt-[18px] mb-7 max-w-[540px]">
            One AI agent runs hundreds of calls at once and never gives up after one try. The result isn&apos;t a small bump — it&apos;s a different curve entirely.
          </p>
          <div className="flex gap-[30px] flex-wrap">
            {aiSkyStats.map((stat) => (
              <div key={stat.value}>
                <b
                  className="font-sora text-[34px] font-extrabold block"
                  style={{
                    background: stat.isGreen ? "var(--ai-grad-g)" : "var(--ai-grad)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {stat.value}
                </b>
                <span className="text-[13px] text-[var(--ai-muted)]">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — 3D Orb */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="h-[380px] border border-[var(--ai-line)] rounded-[var(--radius)] overflow-hidden shadow-[var(--ai-shadow)] cursor-grab relative"
          style={{ background: "radial-gradient(120% 90% at 50% 0%,#1B2742,#0E1424)" }}
        >
          <AiOrb />
          <div className="absolute top-4 right-[18px] text-right pointer-events-none">
            <b
              className="font-sora text-[28px] font-extrabold block leading-none"
              style={{ background: "var(--ai-grad)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
            >
              50×
            </b>
            <span className="font-mono text-[10px] text-[#8E99BC] uppercase tracking-[0.1em]">reach</span>
          </div>
          <div className="absolute bottom-4 left-4 font-mono text-[11px] text-[#9AA6C8] flex items-center gap-[7px] pointer-events-none">
            <span className="w-[7px] h-[7px] rounded-full bg-[var(--ai-emerald)] shadow-[0_0_8px_var(--ai-emerald)] animate-ai-blink" />
            Live AI calling network · 24/7
          </div>
        </motion.div>
      </div>
    </section>
  );
}
