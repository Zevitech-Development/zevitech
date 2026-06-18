"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { aiVoiceTranscript } from "@/content/landing/ai-calling-page-content";
import AiSectionHead from "./ai-section-head";

function useTilt() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
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
  return ref;
}

function VoiceCard() {
  const [visibleBubs, setVisibleBubs] = useState<number[]>([]);
  const [toastVisible, setToastVisible] = useState(false);
  const [sec, setSec] = useState(14);
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-10% 0px" });
  const tiltRef = useTilt();

  useEffect(() => {
    const timer = setInterval(() => setSec((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    const run = () => {
      setVisibleBubs([]);
      setToastVisible(false);
      aiVoiceTranscript.forEach((_, i) => {
        setTimeout(
          () => {
            if (!cancelled) setVisibleBubs((p) => [...p, i]);
          },
          700 + i * 1100,
        );
      });
      const toastDelay = 700 + aiVoiceTranscript.length * 1100 + 400;
      setTimeout(() => {
        if (!cancelled) setToastVisible(true);
      }, toastDelay);
      setTimeout(run, toastDelay + 5200);
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [inView]);

  return (
    <div
      ref={tiltRef}
      className="border border-[var(--ai-line)] bg-[var(--ai-panel)] rounded-[22px] p-[30px] shadow-[var(--ai-shadow-sm)]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <span className="font-mono text-[11px] text-[var(--ai-blue)] tracking-[0.14em] uppercase">
        AI Voice Agent · outbound
      </span>
      <h3 className="font-sora text-[23px] font-bold text-[var(--ai-ink)] mt-3 mb-[10px]">
        It calls. It qualifies. It books.
      </h3>
      <p className="text-[var(--ai-muted)] text-[15px] mb-[22px]">
        Dials your leads in seconds, holds a real conversation, handles
        objections, and drops the appointment into your calendar.
      </p>
      <div
        ref={ref}
        className="bg-[var(--ai-bg)] border border-[var(--ai-line)] rounded-[16px] p-4"
      >
        <div className="flex items-center gap-[11px] pb-3 border-b border-[var(--ai-line)] mb-3">
          <div
            className="w-[38px] h-[38px] rounded-[11px] flex items-center justify-center"
            style={{ background: "var(--ai-grad)" }}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 stroke-white fill-none stroke-2"
            >
              <path d="M3 14v-2a9 9 0 0 1 18 0v2" />
              <path d="M18 19a2 2 0 0 0 2-2v-1h-2.5a1.5 1.5 0 0 0-1.5 1.5A1.5 1.5 0 0 0 17.5 19zM6 19a2 2 0 0 1-2-2v-1h2.5A1.5 1.5 0 0 1 8 17.5A1.5 1.5 0 0 1 6.5 19z" />
            </svg>
          </div>
          <div>
            <b className="text-[13.5px] text-[var(--ai-ink)] block">Zevi AI</b>
            <span className="text-[11.5px] text-[var(--ai-muted)]">
              calling Sarah · Roofing
            </span>
          </div>
          <span className="ml-auto font-mono text-[12px] text-[var(--ai-emerald)]">
            00:{String(sec % 60).padStart(2, "0")}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {aiVoiceTranscript.map((bub, i) => (
            <div
              key={i}
              className={`max-w-[84%] text-[13px] px-3 py-2 rounded-[13px] transition-all duration-300 ${
                visibleBubs.includes(i)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              } ${
                bub.role === "ai"
                  ? "self-start bg-[rgba(45,107,255,.10)] border border-[rgba(45,107,255,.22)] rounded-bl-[4px] text-[var(--ai-ink)]"
                  : "self-end bg-[var(--ai-panel)] border border-[var(--ai-line)] rounded-br-[4px] text-[var(--ai-muted)]"
              }`}
            >
              {bub.text}
            </div>
          ))}
        </div>
        <div
          className={`mt-3 flex items-center gap-2 bg-[rgba(15,182,126,.12)] border border-[rgba(15,182,126,.3)] text-[var(--ai-emerald)] text-[12.5px] font-semibold px-3 py-[10px] rounded-[11px] transition-all duration-500 ${
            toastVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2"
          }`}
        >
          ✓ Appointment booked → synced to calendar
        </div>
      </div>
    </div>
  );
}

function ChatCard() {
  const [chatReply, setChatReply] = useState<"typing" | string>("typing");
  const [showV2, setShowV2] = useState(false);
  const [showB2, setShowB2] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });
  const tiltRef = useTilt();

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    const run = () => {
      setChatReply("typing");
      setShowV2(false);
      setShowB2(false);
      setTimeout(() => {
        if (!cancelled)
          setChatReply("Yes — 24/7. Want me to book a technician now?");
      }, 2400);
      setTimeout(() => {
        if (!cancelled) setShowV2(true);
      }, 3600);
      setTimeout(() => {
        if (!cancelled) setShowB2(true);
      }, 4600);
      setTimeout(run, 7000);
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [inView]);

  return (
    <div
      ref={tiltRef}
      className="border border-[var(--ai-line)] bg-[var(--ai-panel)] rounded-[22px] p-[30px] shadow-[var(--ai-shadow-sm)]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <span className="font-mono text-[11px] text-[var(--ai-blue)] tracking-[0.14em] uppercase">
        AI Web Chat Agent · inbound
      </span>
      <h3 className="font-sora text-[23px] font-bold text-[var(--ai-ink)] mt-3 mb-[10px]">
        It greets. It answers. It converts.
      </h3>
      <p className="text-[var(--ai-muted)] text-[15px] mb-[22px]">
        Lives on your website, answers visitors instantly, captures their
        details, and books them — turning browsers into booked calls.
      </p>
      <div
        ref={ref}
        className="bg-[var(--ai-bg)] border border-[var(--ai-line)] rounded-[16px] p-4 flex flex-col gap-[9px]"
      >
        <div className="flex items-center gap-2 text-[12px] text-[var(--ai-muted)] mb-1">
          <span className="w-2 h-2 rounded-full bg-[var(--ai-emerald)] shadow-[0_0_8px_var(--ai-emerald)]" />
          Zevi AI · Web chat
        </div>
        <div className="self-end bg-[var(--ai-panel)] border border-[var(--ai-line)] text-[var(--ai-muted)] text-[13px] px-3 py-[9px] rounded-[13px] rounded-br-[4px] max-w-[88%]">
          Do you do emergency repairs?
        </div>
        <div className="self-start bg-[rgba(17,181,214,.12)] border border-[rgba(17,181,214,.28)] text-[var(--ai-ink)] text-[13px] px-3 py-[9px] rounded-[13px] rounded-bl-[4px] max-w-[88%]">
          {chatReply === "typing" ? (
            <span className="inline-flex gap-[3px]">
              {[0, 0.2, 0.4].map((d, i) => (
                <i
                  key={i}
                  className="w-[5px] h-[5px] rounded-full bg-[var(--ai-cyan)] not-italic"
                  style={{ animation: `ai-typing 1s ${d}s infinite` }}
                />
              ))}
            </span>
          ) : (
            chatReply
          )}
        </div>
        <div
          className={`self-end bg-[var(--ai-panel)] border border-[var(--ai-line)] text-[var(--ai-muted)] text-[13px] px-3 py-[9px] rounded-[13px] rounded-br-[4px] max-w-[88%] transition-opacity duration-500 ${showV2 ? "opacity-100" : "opacity-0"}`}
        >
          Yes please, tonight if possible
        </div>
        <div
          className={`self-start bg-[rgba(17,181,214,.12)] border border-[rgba(17,181,214,.28)] text-[var(--ai-ink)] text-[13px] px-3 py-[9px] rounded-[13px] rounded-bl-[4px] max-w-[88%] transition-opacity duration-500 ${showB2 ? "opacity-100" : "opacity-0"}`}
        >
          Booked! A technician will call you in 5 minutes. ✓
        </div>
      </div>
    </div>
  );
}

export default function AiProductShowcase() {
  return (
    <section
      className="py-[72px] md:py-[84px] lg:py-[120px] relative z-[2] max-w-[1200px] mx-auto px-6"
      id="product"
    >
      <AiSectionHead
        eyebrow="The product"
        title="Two AI agents. Every conversation covered."
        description="A voice agent that calls and books, and a chat agent that captures your website — working together so no lead ever slips."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px]">
        <VoiceCard />
        <ChatCard />
      </div>
    </section>
  );
}
