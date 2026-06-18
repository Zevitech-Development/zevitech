"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AiFabProps } from "@/interfaces/ai-calling-interface";
import { aiFabGreeting, aiFabIndustries } from "@/content/landing/ai-calling-page-content";

type BubRole = "ai" | "user";
interface Bubble { role: BubRole; text: string; id: number; }
type FlowKey = "root" | "industries" | "howFast" | "howMany" | "captureEmail" | "done";

let _id = 0;
function mkBub(role: BubRole, text: string): Bubble { return { role, id: _id++, text }; }

const FLOW: Record<FlowKey, { text: string; quick: { label: string; next: FlowKey | "open-demo" | "scroll-demo" }[] }> = {
  root: {
    text: aiFabGreeting,
    quick: [
      { label: "📊 See how it works", next: "howFast" },
      { label: "🏭 Industries covered", next: "industries" },
      { label: "🎤 Talk to AI live", next: "scroll-demo" },
      { label: "📅 Book a demo", next: "open-demo" },
    ],
  },
  industries: {
    text: `We're live in 14 industries — Solar, Roofing, HVAC, Real Estate, Dental, Legal, Insurance, Fitness and more. Which fits your business?`,
    quick: [
      { label: "Roofing / Solar", next: "howFast" },
      { label: "HVAC / Home Services", next: "howFast" },
      { label: "Medical / Dental", next: "howFast" },
      { label: "Another industry", next: "howFast" },
    ],
  },
  howFast: {
    text: "Your AI agent dials within seconds of a lead hitting your sheet — not hours. How many leads are you working monthly?",
    quick: [
      { label: "Under 200", next: "howMany" },
      { label: "200–1,000", next: "howMany" },
      { label: "1,000+", next: "howMany" },
    ],
  },
  howMany: {
    text: "Nice. At 18% book rate and 30% close, that could add real revenue every month with zero extra headcount. Want to see the exact number for your business?",
    quick: [
      { label: "Yes, show me the ROI", next: "captureEmail" },
      { label: "📅 Book a demo instead", next: "open-demo" },
    ],
  },
  captureEmail: {
    text: "Drop your work email and I'll send over a custom ROI breakdown — takes 30 seconds:",
    quick: [],
  },
  done: {
    text: "Sent! Check your inbox in the next few minutes. Anything else I can answer?",
    quick: [
      { label: "📅 Book a live demo", next: "open-demo" },
      { label: "🎤 Talk to AI live", next: "scroll-demo" },
    ],
  },
};

export default function AiChatFab({ onOpenModal }: AiFabProps) {
  const [open, setOpen] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [quick, setQuick] = useState<typeof FLOW.root.quick>([]);
  const [flow, setFlow] = useState<FlowKey>("root");
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [bubbles, isTyping]);

  function aiSay(text: string, nextQuick: typeof FLOW.root.quick, delay = 700) {
    setIsTyping(true);
    setQuick([]);
    setTimeout(() => {
      setIsTyping(false);
      setBubbles((p) => [...p, mkBub("ai", text)]);
      setQuick(nextQuick);
    }, delay);
  }

  function start() {
    if (started.current) return;
    started.current = true;
    const node = FLOW.root;
    aiSay(node.text, node.quick, 500);
  }

  function handleOpen() {
    setOpen(true);
    start();
  }

  function handleQuick(action: string) {
    if (action === "open-demo") { onOpenModal(); setOpen(false); return; }
    if (action === "scroll-demo") {
      setOpen(false);
      const el = document.getElementById("livedemo");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const nextKey = action as FlowKey;
    const node = FLOW[nextKey];
    if (!node) return;
    setFlow(nextKey);
    aiSay(node.text, node.quick);
  }

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setBubbles((p) => [...p, mkBub("user", email)]);
    setEmail("");
    setEmailSent(true);
    const done = FLOW.done;
    aiSay(done.text, done.quick);
    setFlow("done");
  }

  const bub = "inline-block max-w-[84%] px-[13px] py-[9px] rounded-[14px] text-[14px] leading-[1.5]";

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => { if (!open) handleOpen(); else setOpen(false); }}
        className="fixed bottom-6 right-6 z-[150] w-[58px] h-[58px] rounded-full border-none flex items-center justify-center shadow-[0_8px_26px_rgba(38,112,255,.4)] transition-all duration-200 hover:scale-[1.1]"
        style={{ background: "var(--ai-grad)" }}
        aria-label="Chat with AI"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }} className="text-white text-[26px] leading-none font-light">×</motion.span>
          ) : (
            <motion.svg key="ic" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.18 }} viewBox="0 0 24 24" className="w-6 h-6 stroke-white fill-none stroke-2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          )}
        </AnimatePresence>
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.95 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed bottom-[78px] right-6 z-[150] w-[340px] max-h-[560px] border border-[var(--ai-line)] bg-[var(--ai-panel)] rounded-[20px] shadow-[var(--ai-shadow)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-[18px] py-[14px] flex items-center gap-3 border-b border-[var(--ai-line)]" style={{ background: "var(--ai-grad)" }}>
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-white fill-none stroke-2">
                  <path d="M3 14v-2a9 9 0 0 1 18 0v2" strokeLinecap="round" />
                  <path d="M18 19a2 2 0 0 0 2-2v-1h-2.5a1.5 1.5 0 0 0 0 3zM6 19a2 2 0 0 1-2-2v-1h2.5a1.5 1.5 0 0 1 0 3z" />
                </svg>
              </div>
              <div>
                <b className="text-white text-[14px] block leading-[1.2]">Zevi AI</b>
                <span className="text-white/70 text-[11px]">Typically replies in seconds</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-[10px]">
              {bubbles.map((b) => (
                <div key={b.id} className={`flex ${b.role === "user" ? "justify-end" : "justify-start"}`}>
                  <span
                    className={bub + (b.role === "ai"
                      ? " bg-[rgba(38,112,255,.09)] border border-[rgba(38,112,255,.22)] text-[var(--ai-ink)] rounded-bl-[4px]"
                      : " bg-[var(--ai-panel)] border border-[var(--ai-line)] text-[var(--ai-muted)] rounded-br-[4px]")}
                  >
                    {b.text}
                  </span>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <span className={bub + " bg-[rgba(38,112,255,.09)] border border-[rgba(38,112,255,.22)] rounded-bl-[4px] flex gap-[4px] items-center"}>
                    {[0, 0.2, 0.4].map((d, i) => (
                      <i key={i} className="w-[5px] h-[5px] rounded-full bg-[var(--ai-blue)] not-italic" style={{ animation: `ai-typing 1s ${d}s infinite` }} />
                    ))}
                  </span>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            {quick.length > 0 && (
              <div className="px-[14px] pb-3 flex flex-wrap gap-[7px]">
                {quick.map((q) => (
                  <button
                    key={q.label}
                    onClick={() => handleQuick(q.next)}
                    className="text-[12.5px] px-[12px] py-[7px] rounded-[11px] font-medium border border-[var(--ai-blue)] text-[var(--ai-blue)] bg-[rgba(38,112,255,.06)] hover:bg-[rgba(38,112,255,.14)] transition-colors cursor-pointer"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            )}

            {/* Email capture input */}
            {flow === "captureEmail" && !emailSent && (
              <form onSubmit={handleEmailSubmit} className="px-[14px] pb-[14px] flex gap-2">
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="work@company.com"
                  className="flex-1 px-3 py-[9px] border border-[var(--ai-line)] rounded-[10px] text-[13px] bg-[var(--ai-bg)] text-[var(--ai-ink)] outline-none focus:border-[var(--ai-blue)] transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-[9px] rounded-[10px] text-white font-semibold text-[13px] border-none cursor-pointer"
                  style={{ background: "var(--ai-grad)" }}
                >
                  Send
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
