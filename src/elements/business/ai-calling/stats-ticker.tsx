"use client";

import CountUp from "react-countup";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { aiTickerStats } from "@/content/landing/ai-calling-page-content";

export default function StatsTicker() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3 gap-[18px] mt-[60px]">
      {aiTickerStats.map((stat) => (
        <div
          key={stat.label}
          className="border border-[var(--ai-line)] bg-[var(--ai-panel)] rounded-[var(--radius)] p-[22px] shadow-[var(--ai-shadow-sm)]"
        >
          <div className="font-sora font-extrabold text-[30px] text-[var(--ai-ink)] font-mono">
            {inView ? (
              <CountUp
                end={stat.count}
                duration={1.8}
                separator=","
                useEasing
                easingFn={(t, b, c, d) => {
                  const p = t / d;
                  return b + c * (1 - Math.pow(1 - p, 3));
                }}
              />
            ) : (
              "0"
            )}
          </div>
          <div className="text-[13px] text-[var(--ai-muted)] mt-1">{stat.label}</div>
        </div>
      ))}
      {/* Static third ticker */}
      <div className="border border-[var(--ai-line)] bg-[var(--ai-panel)] rounded-[var(--radius)] p-[22px] shadow-[var(--ai-shadow-sm)]">
        <div
          className="font-sora font-extrabold text-[30px] font-mono"
          style={{ background: "var(--ai-grad-g)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
        >
          $7<span className="text-[16px] text-[var(--ai-muted)]"> avg</span>
        </div>
        <div className="text-[13px] text-[var(--ai-muted)] mt-1">Cost per booked appointment</div>
      </div>
    </div>
  );
}
