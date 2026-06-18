"use client";

import { useEffect, useRef, useState } from "react";
import { aiDashboardTrust } from "@/content/landing/ai-calling-page-content";
import AiTaskIcon from "./ai-task-icon";

export default function LiveOutreachDashboard() {
  const [nowIndustry, setNowIndustry] = useState("Solar");
  const [bookedCount, setBookedCount] = useState(1284);
  const [callingCount, setCallingCount] = useState(412);
  const [qualPct, setQualPct] = useState(94);
  const bookedRef = useRef(1284);
  const indRef = useRef(0);

  const industries = [
    "Solar", "Real Estate", "Dental", "Roofing",
    "Insurance", "Law Firm", "HVAC", "Mortgage",
  ];

  useEffect(() => {
    const indInterval = setInterval(() => {
      indRef.current = (indRef.current + 1) % industries.length;
      setNowIndustry(industries[indRef.current]);
    }, 2400);

    const statsInterval = setInterval(() => {
      bookedRef.current += 1;
      setBookedCount(bookedRef.current);
      setCallingCount(380 + Math.floor(Math.random() * 95));
      setQualPct(92 + Math.floor(Math.random() * 5));
    }, 2200);

    return () => {
      clearInterval(indInterval);
      clearInterval(statsInterval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative flex items-center justify-center py-12 overflow-visible">
      {/* Float badge top-left */}
      <div className="hidden sm:flex absolute top-2 -left-[18px] z-[4] items-center gap-2 bg-[var(--ai-panel)] border border-[var(--ai-line)] rounded-[13px] px-[14px] py-[11px] shadow-[var(--ai-shadow)] text-[13px] font-semibold text-[var(--ai-ink)] animate-ai-float">
        <span className="w-2 h-2 rounded-full bg-[var(--ai-emerald)] shadow-[0_0_8px_var(--ai-emerald)]" />
        Lead reached in 28s
      </div>

      {/* Console card */}
      <div className="w-full max-w-[440px] bg-[var(--ai-panel)] border border-[var(--ai-line)] rounded-[24px] p-5 shadow-[var(--ai-shadow)] relative z-[3]">
        {/* Header */}
        <div className="flex items-center gap-3 pb-[15px] border-b border-[var(--ai-line)]">
          <div
            className="w-[46px] h-[46px] rounded-[14px] flex items-center justify-center relative flex-shrink-0"
            style={{ background: "var(--ai-grad)" }}
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-white fill-none stroke-2 stroke-round">
              <path d="M3 14v-2a9 9 0 0 1 18 0v2" />
              <path d="M18 19a2 2 0 0 0 2-2v-1h-2.5a1.5 1.5 0 0 0-1.5 1.5A1.5 1.5 0 0 0 17.5 19zM6 19a2 2 0 0 1-2-2v-1h2.5A1.5 1.5 0 0 1 8 17.5A1.5 1.5 0 0 1 6.5 19z" />
              <path d="M12 19v2M9 21h6" />
            </svg>
            <span className="absolute inset-[-5px] rounded-[18px] border border-[var(--ai-blue)] opacity-40 animate-ai-ring" />
          </div>
          <div className="flex-1 min-w-0">
            <b className="font-sora text-[15px] text-[var(--ai-ink)] block">
              Zevi AI · Live Outreach
            </b>
            <span className="inline-flex items-center gap-[7px] font-mono text-[11px] text-[var(--ai-emerald)]">
              <span className="w-[7px] h-[7px] rounded-full bg-[var(--ai-emerald)] shadow-[0_0_10px_var(--ai-emerald)] animate-ai-blink" />
              calling <span className="mx-[2px]">{nowIndustry}</span> leads now
            </span>
          </div>
          <div className="font-mono text-[10.5px] text-[var(--ai-emerald)] flex items-center gap-[5px] border border-[rgba(15,182,126,.3)] bg-[rgba(15,182,126,.08)] px-[9px] py-[6px] rounded-[8px]">
            <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-[var(--ai-emerald)] fill-none stroke-2">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            Secure
          </div>
        </div>

        {/* Stats row */}
        <div className="flex my-[15px] border border-[var(--ai-line)] rounded-[13px] overflow-hidden bg-[var(--ai-bg)]">
          <div className="flex-1 px-2 py-3 text-center border-r border-[var(--ai-line)]">
            <b className="font-sora text-[20px] font-extrabold text-[var(--ai-blue)] block">
              {callingCount}
            </b>
            <span className="font-mono text-[9.5px] text-[var(--ai-muted)] tracking-[0.08em]">
              CALLING
            </span>
          </div>
          <div className="flex-1 px-2 py-3 text-center border-r border-[var(--ai-line)]">
            <b
              className="font-sora text-[20px] font-extrabold block"
              style={{ background: "var(--ai-grad)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
            >
              {qualPct}%
            </b>
            <span className="font-mono text-[9.5px] text-[var(--ai-muted)] tracking-[0.08em]">
              QUALIFIED
            </span>
          </div>
          <div className="flex-1 px-2 py-3 text-center">
            <b
              className="font-sora text-[20px] font-extrabold block"
              style={{ background: "var(--ai-grad-g)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
            >
              {bookedCount.toLocaleString()}
            </b>
            <span className="font-mono text-[9.5px] text-[var(--ai-muted)] tracking-[0.08em]">
              BOOKED TODAY
            </span>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex gap-[7px] flex-wrap">
          {aiDashboardTrust.map((tb) => (
            <span
              key={tb.label}
              className="font-mono text-[10px] text-[var(--ai-muted)] border border-[var(--ai-line)] rounded-[8px] px-[9px] py-[6px] flex items-center gap-[5px]"
            >
              <AiTaskIcon name={tb.icon} size={16} />
              {tb.label}
            </span>
          ))}
        </div>
      </div>

      {/* Float badge bottom-right */}
      <div className="hidden sm:flex absolute bottom-6 -right-[20px] z-[4] items-center gap-2 bg-[var(--ai-panel)] border border-[var(--ai-line)] rounded-[13px] px-[14px] py-[11px] shadow-[var(--ai-shadow)] text-[13px] font-semibold text-[var(--ai-ink)] [animation:ai-float_5s_ease-in-out_infinite_.8s]">
        <span className="w-2 h-2 rounded-full bg-[var(--ai-emerald)] shadow-[0_0_8px_var(--ai-emerald)]" />
        ✓ Booked Tue 2:00 PM
      </div>
    </div>
  );
}
