"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import AiSectionHead from "./ai-section-head";

const PIPELINE_STEPS = [
  { label: "Imported", icon: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" },
  { label: "Calling", icon: "M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3 4.18 2 2 0 0 1 5 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" },
  { label: "Qualified", icon: "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3" },
  { label: "Booked", icon: "M3 4h18v18H3zM3 10h18M8 2v4M16 2v4" },
  { label: "Synced", icon: "M21 12a9 9 0 1 1-6.2-8.5M21 4v5h-5" },
];

function ramp(target: number, duration: number, onUpdate: (v: number) => void) {
  const start = performance.now();
  const tick = (now: number) => {
    let p = Math.min((now - start) / duration, 1);
    p = 1 - Math.pow(1 - p, 2);
    onUpdate(Math.floor(target * p));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export default function AiOutreachEngine() {
  const total = 2000;
  const [uploaded, setUploaded] = useState(false);
  const [ran, setRan] = useState(false);
  const [progress, setProgress] = useState(0);
  const [counts, setCounts] = useState([0, 0, 0, 0, 0]);
  const [activeStep, setActiveStep] = useState(-1);
  const [flowPct, setFlowPct] = useState(0);
  const [btnText, setBtnText] = useState("▶ Start AI outreach");
  const pipelineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(pipelineRef, { once: true, margin: "-10% 0px" });

  function showFile() {
    setUploaded(true);
    setTimeout(() => setProgress(100), 50);
  }

  function runPipeline() {
    if (ran) return;
    setRan(true);
    if (!uploaded) showFile();
    setBtnText("● Running outreach…");

    const targets = [total, total, Math.round(total * 0.62), Math.round(total * 0.18), Math.round(total * 0.18)];
    const delays = [0, 700, 1600, 2500, 3400];
    const durations = [600, 800, 800, 800, 700];

    delays.forEach((delay, i) => {
      setTimeout(() => {
        setActiveStep(i);
        setFlowPct((i / (PIPELINE_STEPS.length - 1)) * 100);
        ramp(targets[i], durations[i], (v) =>
          setCounts((prev) => {
            const next = [...prev];
            next[i] = v;
            return next;
          })
        );
        if (i === delays.length - 1) {
          setTimeout(() => setBtnText("✓ Outreach complete — calendar full"), durations[i]);
        }
      }, delay);
    });
  }

  useEffect(() => {
    if (inView && !ran) {
      if (!uploaded) showFile();
      setTimeout(runPipeline, 1200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <section className="py-[72px] md:py-[84px] lg:py-[120px] relative z-[2] max-w-[1200px] mx-auto px-6" id="engine">
      <AiSectionHead
        eyebrow="The outreach engine · how it works"
        title="Upload your leads. Watch them become booked calls."
        description="Drop in your lead sheet and your AI agent starts dialing in seconds — qualifying, booking, and syncing every contact while you watch it happen."
        center
      />

      <div className="grid grid-cols-1 lg:grid-cols-[.82fr_1.18fr] gap-[26px] items-stretch">
        {/* Upload panel */}
        <div className="border border-[var(--ai-line)] bg-[var(--ai-panel)] rounded-[22px] p-6 shadow-[var(--ai-shadow-sm)] flex flex-col justify-center">
          {!uploaded ? (
            <div
              className="border-2 border-dashed border-[rgba(38,112,255,.35)] rounded-[16px] p-[34px] text-center bg-[rgba(38,112,255,.04)] cursor-pointer hover:border-[var(--ai-blue)] hover:bg-[rgba(38,112,255,.10)] transition-all duration-200"
              onClick={showFile}
            >
              <div
                className="w-14 h-14 rounded-[15px] flex items-center justify-center mx-auto mb-[14px]"
                style={{ background: "var(--ai-grad)" }}
              >
                <svg viewBox="0 0 24 24" className="w-[26px] h-[26px] stroke-white fill-none stroke-2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5-5 5 5M12 5v12" />
                </svg>
              </div>
              <b className="font-sora text-[17px] text-[var(--ai-ink)] block mb-1">Drop your lead sheet here</b>
              <span className="text-[13px] text-[var(--ai-muted)] block mb-4">CSV or Excel · or click to upload</span>
              <button
                className="inline-flex items-center gap-2 font-semibold text-[15px] px-6 py-[14px] rounded-full border border-[var(--ai-line)] bg-[var(--ai-panel)] text-[var(--ai-ink)] hover:border-[var(--ai-blue)] transition-colors"
                onClick={(e) => { e.stopPropagation(); showFile(); }}
              >
                Upload sample sheet
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 bg-[var(--ai-bg)] border border-[var(--ai-line)] rounded-[13px] p-[14px]">
                <div className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ background: "var(--ai-grad)" }}>
                  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-white fill-none stroke-2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h8" />
                  </svg>
                </div>
                <div>
                  <b className="text-[14px] text-[var(--ai-ink)] block">leads.csv</b>
                  <span className="text-[12px] text-[var(--ai-muted)]">2,000 contacts imported</span>
                </div>
                <span className="ml-auto text-[var(--ai-emerald)] font-bold text-[18px]">✓</span>
              </div>
              <div className="h-[7px] bg-[var(--ai-bg)] border border-[var(--ai-line)] rounded-[7px] overflow-hidden my-4">
                <div
                  className="h-full rounded-[7px] transition-all duration-[1.4s] ease-out"
                  style={{ width: `${progress}%`, background: "var(--ai-grad)" }}
                />
              </div>
              <button
                onClick={runPipeline}
                className="w-full flex items-center justify-center font-semibold text-[15px] px-6 py-[14px] rounded-full text-white transition-all duration-200"
                style={{ background: "var(--ai-grad)", opacity: ran ? 0.85 : 1 }}
              >
                {btnText}
              </button>
            </div>
          )}
          <p className="text-[12.5px] text-[var(--ai-muted)] mt-4 text-center">
            Your AI handles the entire list — no dialing, no salaries, no missed leads.
          </p>
        </div>

        {/* Pipeline */}
        <div ref={pipelineRef} className="flex items-start justify-between gap-[10px] relative border border-[var(--ai-line)] bg-[var(--ai-panel)] rounded-[22px] px-[26px] py-9 shadow-[var(--ai-shadow-sm)] flex-wrap md:flex-nowrap">
          {/* Progress line */}
          <div className="hidden md:block absolute top-[62px] left-[11%] right-[11%] h-[3px] bg-[var(--ai-line)] rounded-[3px] overflow-hidden">
            <div
              className="absolute inset-0 rounded-[3px] transition-all duration-[0.9s] ease-out"
              style={{ width: `${flowPct}%`, background: "var(--ai-grad)" }}
            />
          </div>

          {PIPELINE_STEPS.map((step, i) => {
            const active = i <= activeStep;
            return (
              <div
                key={step.label}
                className={`flex-1 text-center relative z-[1] transition-all duration-300 ${active ? "opacity-100 -translate-y-[2px]" : "opacity-40"}`}
              >
                <div
                  className={`w-12 h-12 rounded-[13px] mx-auto mb-3 flex items-center justify-center border transition-all duration-300 ${
                    active
                      ? "border-transparent shadow-[0_0_0_5px_rgba(38,112,255,.12)]"
                      : "bg-[var(--ai-bg)] border-[var(--ai-line)]"
                  }`}
                  style={active ? { background: "var(--ai-grad)" } : {}}
                >
                  <svg viewBox="0 0 24 24" className={`w-6 h-6 fill-none stroke-2 ${active ? "stroke-white" : "stroke-[var(--ai-muted)]"}`}>
                    {step.icon.split("M").filter(Boolean).map((seg, si) => (
                      <path key={si} d={"M" + seg} strokeLinecap="round" strokeLinejoin="round" />
                    ))}
                  </svg>
                </div>
                <b className="font-sora text-[24px] font-extrabold text-[var(--ai-ink)] block">
                  {counts[i].toLocaleString()}
                </b>
                <span className="font-mono text-[11px] text-[var(--ai-muted)] tracking-[0.04em]">{step.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
