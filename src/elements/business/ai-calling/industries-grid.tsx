"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { aiIndustries } from "@/content/landing/ai-calling-page-content";
import AiSectionHead from "./ai-section-head";

const industryIconPaths: Record<string, string> = {
  sun: "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
  home: "M3 11l9-8 9 8M5 10v10h14V10",
  building: "M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6",
  tooth:
    "M12 5.5c-2-2.5-6-2-7 1-1 3 1 9 3 9s1.5-3 4-3 2 3 4 3 4-6 3-9c-1-3-5-3.5-7-1z",
  balance:
    "M12 3v18M7 21h10M5 7h14M5 7l-3 6a3 3 0 0 0 6 0zM19 7l-3 6a3 3 0 0 0 6 0z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  wind: "M12 2v20M2 12h20M5 5l14 14M19 5 5 19",
  heart:
    "M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z",
  medical:
    "M19 14c1.5-1.5 3-3.4 3-5.5A5.5 5.5 0 0 0 12 5 5.5 5.5 0 0 0 2 8.5c0 2.1 1.5 4 3 5.5l7 7zM3.5 12H8l1.5-3 3 6 1.5-3h4.5",
  filter:
    "M9.6 4.6A2 2 0 1 1 11 8H2M12.6 19.4A2 2 0 1 0 14 16H2M17.7 7.7A2.5 2.5 0 1 1 19.5 12H2",
  cart: "M8 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM19 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM2.1 2.1h2l2.2 12.4a2 2 0 0 0 2 1.6h9.4a2 2 0 0 0 2-1.6l1.3-7.4H5.1",
  plus: "M11 2h2a1 1 0 0 1 1 1v6h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-6v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h6V3a1 1 0 0 1 1-1z",
  briefcase: "M2 7h20v14H2zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",
  wrench:
    "M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2-2 2.6-2.6z",
};

function IndustryCard({
  ind,
  i,
}: {
  ind: (typeof aiIndustries)[0];
  i: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateZ(6px)`;
    };
    const onLeave = () => {
      el.style.transform = "";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  const d = industryIconPaths[ind.icon] ?? industryIconPaths.zap;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.04 }}
    >
      <div
        ref={cardRef}
        className="ai-industry-card relative border border-[var(--ai-line)] rounded-[18px] px-[22px] pt-[26px] pb-[22px] shadow-[var(--ai-shadow-sm)] overflow-hidden transition-all duration-200 hover:-translate-y-[6px] hover:shadow-[var(--ai-shadow)] cursor-default"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Accent stripe */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: "var(--ai-grad)" }}
        />
        <div
          className="w-[50px] h-[50px] rounded-full mb-4 flex items-center justify-center"
          style={{ background: "var(--ai-grad)" }}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 stroke-white fill-none stroke-2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {d
              .split("M")
              .filter(Boolean)
              .map((seg, si) => (
                <path key={si} d={"M" + seg} />
              ))}
          </svg>
        </div>
        <h3 className="font-sora text-[18px] font-bold text-[var(--ai-ink)] mb-[10px]">
          {ind.name}
        </h3>
        <span className="inline-block font-mono text-[11px] text-[var(--ai-blue)] bg-[rgba(38,112,255,.08)] border border-[rgba(38,112,255,.18)] px-[11px] py-[5px] rounded-[8px]">
          {ind.deal}
        </span>
        <div className="mt-4 font-mono text-[11px] text-[var(--ai-emerald)] flex items-center gap-[6px]">
          <span className="w-[6px] h-[6px] rounded-full bg-[var(--ai-emerald)] shadow-[0_0_7px_var(--ai-emerald)] animate-ai-blink" />
          booking now
        </div>
      </div>
    </motion.div>
  );
}

export default function AiIndustriesGrid() {
  return (
    <section
      className="py-[72px] md:py-[84px] lg:py-[120px] relative z-[2] max-w-[1200px] mx-auto px-6"
      id="industries"
    >
      <AiSectionHead
        eyebrow="High-demand industries"
        title="Built for the businesses that live on the phone."
        description="Your AI agent is trained per industry — the right questions, the right urgency, the right booking flow."
        center
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {aiIndustries.map((ind, i) => (
          <IndustryCard key={ind.name} ind={ind} i={i} />
        ))}
      </div>
    </section>
  );
}
