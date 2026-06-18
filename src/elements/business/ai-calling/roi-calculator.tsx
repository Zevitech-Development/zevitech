"use client";

import { useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AiSectionHead from "./ai-section-head";

function fillStyle(value: number, min: number, max: number) {
  const pct = ((value - min) / (max - min)) * 100;
  return {
    background: `linear-gradient(90deg, var(--ai-blue) ${pct}%, var(--ai-line) ${pct}%)`,
  };
}

export default function AiRoiCalculator() {
  const [leads, setLeads] = useState(500);
  const [deal, setDeal] = useState(2000);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const appts = Math.round(leads * 0.18);
  const revenue = Math.round(appts * 0.3 * deal);
  const roi = Math.max(1, Math.round(revenue / 7500));

  const handleLeads = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setLeads(+e.target.value), []);
  const handleDeal = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setDeal(+e.target.value), []);

  return (
    <section className="py-[72px] md:py-[84px] lg:py-[120px] relative z-[2] max-w-[1200px] mx-auto px-6" id="roi">
      <AiSectionHead
        eyebrow="ROI calculator"
        title="See what AI outreach could add to your month."
        center
      />
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="border border-[var(--ai-line)] rounded-[24px] bg-[var(--ai-panel)] shadow-[var(--ai-shadow)] p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center"
      >
        {/* Inputs */}
        <div>
          {/* Leads slider */}
          <div className="mb-7">
            <div className="flex justify-between items-center mb-[14px]">
              <span className="font-mono text-[12px] text-[var(--ai-muted)] uppercase tracking-[0.04em]">Leads per month</span>
              <span className="font-sora font-extrabold text-[21px] text-[var(--ai-ink)] bg-[rgba(38,112,255,.08)] border border-[rgba(38,112,255,.18)] px-[14px] py-1 rounded-[10px]">
                {leads.toLocaleString()}
              </span>
            </div>
            <input
              type="range" min={100} max={5000} step={50} value={leads}
              onChange={handleLeads}
              className="w-full h-2 rounded-[8px] outline-none cursor-pointer appearance-none"
              style={fillStyle(leads, 100, 5000)}
            />
            <div className="flex justify-between mt-[9px] font-mono text-[11px] text-[var(--ai-muted)]">
              <span>100</span><span>5,000</span>
            </div>
          </div>

          {/* Deal slider */}
          <div className="mb-7">
            <div className="flex justify-between items-center mb-[14px]">
              <span className="font-mono text-[12px] text-[var(--ai-muted)] uppercase tracking-[0.04em]">Average deal value</span>
              <span className="font-sora font-extrabold text-[21px] text-[var(--ai-ink)] bg-[rgba(38,112,255,.08)] border border-[rgba(38,112,255,.18)] px-[14px] py-1 rounded-[10px]">
                ${deal.toLocaleString()}
              </span>
            </div>
            <input
              type="range" min={200} max={40000} step={200} value={deal}
              onChange={handleDeal}
              className="w-full h-2 rounded-[8px] outline-none cursor-pointer appearance-none"
              style={fillStyle(deal, 200, 40000)}
            />
            <div className="flex justify-between mt-[9px] font-mono text-[11px] text-[var(--ai-muted)]">
              <span>$200</span><span>$40,000</span>
            </div>
          </div>

          <p className="text-[12px] text-[var(--ai-muted)] leading-[1.55] border-t border-[var(--ai-line)] pt-4">
            Assumes AI calls every lead in seconds, ~18% booked, ~30% close. Tune these to your real numbers before running ads.
          </p>
        </div>

        {/* Output */}
        <div className="ai-cta-panel text-center rounded-[20px] p-9 border border-[var(--ai-line)]">
          <div className="font-mono text-[12px] text-[var(--ai-muted)] uppercase tracking-[0.1em]">Estimated new revenue / month</div>
          <div
            className="font-sora font-extrabold mt-[10px] mb-1 leading-none"
            style={{ fontSize: "clamp(40px,6vw,58px)", background: "var(--ai-grad-g)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
          >
            ${revenue.toLocaleString()}
          </div>
          <div className="text-[var(--ai-muted)] text-[13.5px] mb-6">while your AI works the list 24/7</div>
          <div className="grid grid-cols-2 xs:grid-cols-3 gap-[10px]">
            {[
              { val: appts.toLocaleString(), label: "appointments" },
              { val: leads.toLocaleString(), label: "leads called" },
              { val: `${roi}×`, label: "vs one SDR" },
            ].map(({ val, label }) => (
              <div key={label} className="bg-[var(--ai-panel)] border border-[var(--ai-line)] rounded-[13px] py-[15px] px-2">
                <b className="font-sora text-[21px] font-extrabold text-[var(--ai-ink)] block">{val}</b>
                <span className="font-mono text-[10px] text-[var(--ai-muted)] tracking-[0.03em]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
