"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { vapiConfig, aiDemoIndustries, aiDemoIndustryList } from "@/content/landing/ai-calling-page-content";
import AiSectionHead from "./ai-section-head";

type CallState = "idle" | "ringing" | "active" | "ended";

interface CallCtx {
  indName: string;
  ind: { thing: string; appt: string };
  pitch: string;
  name: string;
}

function padTime(n: number) { return String(n).padStart(2, "0"); }

export default function AiLiveVoiceDemo() {
  const [industry, setIndustry] = useState("Solar");
  const [pitch, setPitch] = useState("");
  const [userName, setUserName] = useState("");
  const [callState, setCallState] = useState<CallState>("idle");
  const [timer, setTimer] = useState("00:00");
  const [capWho, setCapWho] = useState("");
  const [capTxt, setCapTxt] = useState('Press "Call" to start your live demo.');
  const [waveOn, setWaveOn] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [muted, setMuted] = useState(false);
  const [muteOn, setMuteOn] = useState(false);

  const vapiRef = useRef<any>(null);
  const vapiLoadingRef = useRef<Promise<any> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const secsRef = useRef(0);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const recRef = useRef<any>(null);
  const turnRef = useRef(0);
  const lastRef = useRef("");
  const replyInputRef = useRef<HTMLInputElement>(null);

  const USE_VAPI = !!vapiConfig.publicKey;

  /* ── Init synth ref ── */
  useEffect(() => {
    if (typeof window !== "undefined") synthRef.current = window.speechSynthesis;
  }, []);

  /* ── Pick voice ── */
  useEffect(() => {
    const pick = () => {
      const synth = synthRef.current;
      if (!synth) return;
      const vs = synth.getVoices();
      voiceRef.current =
        vs.find((v) => /female|Samantha|Aria|Jenny|Michelle|Libby|Sonia|Natasha|Zira|Emma|Ava/i.test(v.name) && /^en/i.test(v.lang)) ||
        vs.find((v) => /(Google US English|Microsoft)/i.test(v.name) && /^en/i.test(v.lang)) ||
        vs.find((v) => /^en-US/i.test(v.lang)) ||
        vs[0] || null;
    };
    // Delay slightly so synthRef is populated
    const t = setTimeout(() => {
      pick();
      if (synthRef.current) synthRef.current.onvoiceschanged = pick;
    }, 50);
    return () => clearTimeout(t);
  }, []);

  /* ── Speech recognition fallback ── */
  useEffect(() => {
    if (USE_VAPI) return;
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e: any) => userSay(e.results[0][0].transcript);
    rec.onerror = () => {};
    rec.onend = () => {};
    recRef.current = rec;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Timer ── */
  const startTimer = useCallback(() => {
    secsRef.current = 0;
    setTimer("00:00");
    timerRef.current = setInterval(() => {
      secsRef.current++;
      const m = Math.floor(secsRef.current / 60);
      const s = secsRef.current % 60;
      setTimer(`${padTime(m)}:${padTime(s)}`);
    }, 1000);
  }, []);
  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  /* ── UI state helpers ── */
  function uiCalling() { setCallState("ringing"); setCapTxt("Connecting…"); }
  function uiConnected() { setCallState("active"); startTimer(); }
  function uiEnded(label = "Call ended") {
    setCallState("ended");
    setWaveOn(false);
    stopTimer();
    setCapTxt(label);
    setCapWho("");
    setTimeout(() => setCallState("idle"), 2000);
  }
  function caption(who: string, txt: string) { setCapWho(who); setCapTxt(txt); }

  /* ── Build ctx ── */
  function buildCtx(): CallCtx {
    return {
      indName: industry,
      ind: aiDemoIndustries[industry] || aiDemoIndustries.Solar,
      pitch: pitch.trim() || "our service",
      name: userName.trim(),
    };
  }

  /* ── Vapi loader ── */
  async function loadVapi() {
    if (vapiLoadingRef.current) return vapiLoadingRef.current;
    vapiLoadingRef.current = import("@vapi-ai/web").then((mod) => {
      const Vapi = mod.default;
      const v = new Vapi(vapiConfig.publicKey);
      v.on("call-start", uiConnected);
      v.on("call-end", () => uiEnded("Call ended"));
      v.on("speech-start", () => setWaveOn(true));
      v.on("speech-end", () => setWaveOn(false));
      v.on("message", (m: any) => {
        if (m.type === "transcript" && m.transcriptType === "final") {
          caption(m.role === "assistant" ? "Sarah · Zevi AI" : "You", m.transcript);
        }
      });
      v.on("error", (e: any) => { console.warn("Vapi error", e); uiEnded("Connection issue — press call to retry"); });
      vapiRef.current = v;
      return v;
    }).catch((e) => { console.warn("Vapi failed", e); return null; });
    return vapiLoadingRef.current;
  }

  /* ── Vapi call start ── */
  async function startVapiCall(ctx: CallCtx) {
    const first = `Hi${ctx.name ? " " + ctx.name : ""}! This is Sarah. Do you have a quick minute? I'm calling about ${ctx.pitch}.`;
    uiCalling();
    const v = vapiRef.current || await loadVapi();
    if (!v) { uiEnded("Connection failed"); return; }
    v.start(vapiConfig.assistantId, {
      variableValues: { industry: ctx.indName, pitch: ctx.pitch, name: ctx.name || "there" },
      firstMessage: first,
    });
  }

  /* ── Browser fallback speak ── */
  function speak(text: string, who: string, after?: () => void) {
    caption(who, text);
    const synth = synthRef.current;
    if (!synth) { after && setTimeout(after, 900); return; }
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    if (voiceRef.current) u.voice = voiceRef.current;
    u.rate = 1.02; u.pitch = 1.06;
    u.onstart = () => { setWaveOn(true); };
    u.onend = () => { setWaveOn(false); after?.(); };
    u.onerror = () => { setWaveOn(false); after?.(); };
    synth.speak(u);
  }

  function listen() {
    if (recRef.current && !muted) try { recRef.current.start(); } catch {}
  }

  function userSay(t: string) {
    if (!t?.trim()) return;
    caption("You", t.trim());
    lastRef.current = t;
    if (replyInputRef.current) replyInputRef.current.value = "";
    setTimeout(agentTurn, 650);
  }

  function agentTurn() {
    const ctx = buildCtx();
    const nm = ctx.name ? " " + ctx.name : "";
    if (turnRef.current === 0) {
      turnRef.current++;
      speak(`Hi${nm}! This is Sarah, reaching out about ${ctx.pitch}. Have you been thinking about ${ctx.ind.thing} lately?`, "Sarah · Zevi AI", () => { replyInputRef.current?.focus(); listen(); });
    } else if (turnRef.current === 1) {
      turnRef.current++;
      const objection = /\b(no|not|nope|busy|stop|don'?t)\b/i.test(lastRef.current);
      speak(
        objection
          ? `Totally understand — most people feel that way at first. It only takes a few minutes, no obligation. Could I set you up with a ${ctx.ind.appt}?`
          : `Wonderful. We've helped a lot of people with exactly that. I'd love to lock in a quick ${ctx.ind.appt} — would later this week work?`,
        "Sarah · Zevi AI",
        () => { replyInputRef.current?.focus(); listen(); }
      );
    } else if (turnRef.current === 2) {
      turnRef.current++;
      speak(`Perfect${nm}! You're booked for Tuesday at 2 PM. You'll get a text confirmation shortly. Thanks so much — talk soon!`, "Sarah · Zevi AI", () => {
        setToastVisible(true);
        uiEnded("Call ended");
      });
    }
  }

  function browserCall() {
    const synth = synthRef.current;
    if (synth) { const w = new SpeechSynthesisUtterance(" "); synth.speak(w); }
    turnRef.current = 0; lastRef.current = ""; setMuted(false); setMuteOn(false);
    uiCalling();
    setTimeout(() => { uiConnected(); agentTurn(); }, 1100);
  }

  /* ── Main call button handler ── */
  const handleCall = useCallback(async () => {
    const ctx = buildCtx();
    setToastVisible(false);
    if (USE_VAPI) {
      caption("", "Connecting…");
      setCallState("ringing");
      try {
        if (navigator.mediaDevices?.getUserMedia) {
          const st = await navigator.mediaDevices.getUserMedia({ audio: true });
          st.getTracks().forEach((t) => t.stop());
        }
      } catch {
        caption("", "Microphone blocked. Allow mic access in your browser, then press Call again.");
        uiEnded("Mic blocked");
        return;
      }
      const v = await loadVapi();
      if (v) startVapiCall(ctx);
      else { caption("", "Could not reach the voice service. Check your connection."); uiEnded("Connection failed"); }
    } else {
      browserCall();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [industry, pitch, userName, muted]);

  const handleMute = useCallback(() => {
    const on = !muteOn;
    setMuteOn(on);
    setMuted(on);
    if (USE_VAPI && vapiRef.current) { try { vapiRef.current.setMuted(on); } catch {} }
    else if (!USE_VAPI && recRef.current) {
      if (on) { try { recRef.current.stop(); } catch {} } else listen();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [muteOn]);

  const handleEnd = useCallback(() => {
    if (USE_VAPI && vapiRef.current) { try { vapiRef.current.stop(); } catch {} }
    else if (!USE_VAPI) { synthRef.current?.cancel(); try { recRef.current?.stop(); } catch {} }
    uiEnded("Call ended");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isActive = callState === "active";
  const isRinging = callState === "ringing";
  const isIdle = callState === "idle" || callState === "ended";

  return (
    <section className="py-[72px] md:py-[84px] lg:py-[120px] relative z-[2] max-w-[1200px] mx-auto px-6" id="livedemo">
      <AiSectionHead
        eyebrow="Live demo · talk to it now"
        title="Hear your AI agent pitch — live, right now."
        description="Pick your industry, type what you sell, and our AI sales agent delivers a real pitch out loud. Talk back or type — it responds like a real rep."
        center
      />

      <div className="grid grid-cols-1 lg:grid-cols-[.85fr_1.15fr] gap-6 items-stretch">
        {/* Setup panel */}
        <div className="border border-[var(--ai-line)] bg-[var(--ai-panel)] rounded-[22px] p-[26px] shadow-[var(--ai-shadow-sm)]">
          <span className="font-mono text-[11px] text-[var(--ai-blue)] tracking-[0.14em] uppercase">Configure the agent</span>
          <label className="block font-mono text-[12px] text-[var(--ai-muted)] mt-[18px] mb-2 tracking-[0.04em]">Your industry</label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full px-[14px] py-[13px] border border-[var(--ai-line)] rounded-[12px] bg-[var(--ai-bg)] text-[var(--ai-ink)] text-[14px] outline-none focus:border-[var(--ai-blue)] transition-colors"
          >
            {aiDemoIndustryList.map((ind) => <option key={ind}>{ind}</option>)}
          </select>
          <label className="block font-mono text-[12px] text-[var(--ai-muted)] mt-[18px] mb-2 tracking-[0.04em]">What do you sell? (your pitch)</label>
          <input
            type="text" value={pitch} onChange={(e) => setPitch(e.target.value)}
            placeholder="e.g. premium solar installation with 0% financing"
            className="w-full px-[14px] py-[13px] border border-[var(--ai-line)] rounded-[12px] bg-[var(--ai-bg)] text-[var(--ai-ink)] text-[14px] outline-none focus:border-[var(--ai-blue)] transition-colors"
          />
          <label className="block font-mono text-[12px] text-[var(--ai-muted)] mt-[18px] mb-2 tracking-[0.04em]">Your name (optional)</label>
          <input
            type="text" value={userName} onChange={(e) => setUserName(e.target.value)}
            placeholder="e.g. Alex"
            className="w-full px-[14px] py-[13px] border border-[var(--ai-line)] rounded-[12px] bg-[var(--ai-bg)] text-[var(--ai-ink)] text-[14px] outline-none focus:border-[var(--ai-blue)] transition-colors"
          />
          <p className="text-[12.5px] text-[var(--ai-muted)] mt-5 leading-[1.55]">
            🔊 Sound on. Press the green button to receive a live call from your AI agent — talk back with your mic, or type if you&apos;re on a quiet desk.
          </p>
        </div>

        {/* Call screen */}
        <div
          className={`border border-[var(--ai-line)] rounded-[24px] p-6 shadow-[var(--ai-shadow)] relative overflow-hidden flex flex-col ${isActive ? "border-[rgba(43,168,255,.25)]" : ""}`}
          style={{ background: "radial-gradient(130% 80% at 50% -12%,#1C2945 0%,#0E1424 58%)", color: "#fff" }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-[12px] text-[#A8B2CC] flex items-center gap-[7px]">
              <span
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive ? "bg-[var(--ai-emerald)] shadow-[0_0_10px_var(--ai-emerald)] animate-ai-blink" :
                  isRinging ? "bg-[#F5B53D] shadow-[0_0_10px_#F5B53D] animate-[ai-blink_0.7s_infinite]" : "bg-[#7E8AAD]"
                }`}
              />
              {isRinging ? "Calling…" : isActive ? "Connected" : callState === "ended" ? "Call ended" : "Ready"}
            </span>
            <span className="font-mono text-[13px] text-[#A8B2CC]">{timer}</span>
          </div>

          {/* Avatar */}
          <div className="text-center py-[22px] pb-[6px]">
            <div
              className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center relative"
              style={{ background: "var(--ai-grad)", boxShadow: "0 0 0 6px rgba(43,168,255,.12),0 16px 44px rgba(38,112,255,.45)" }}
            >
              <svg viewBox="0 0 24 24" className="w-[42px] h-[42px] stroke-white fill-none" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 14v-2a9 9 0 0 1 18 0v2" />
                <path d="M18 19a2 2 0 0 0 2-2v-1h-2.5a1.5 1.5 0 0 0-1.5 1.5A1.5 1.5 0 0 0 17.5 19zM6 19a2 2 0 0 1-2-2v-1h2.5A1.5 1.5 0 0 1 8 17.5A1.5 1.5 0 0 1 6.5 19z" />
              </svg>
              {isActive && (
                <>
                  <span className="absolute inset-0 rounded-full border-[1.5px] border-[var(--ai-cyan)] animate-ai-ring opacity-0" />
                  <span className="absolute inset-0 rounded-full border-[1.5px] border-[var(--ai-cyan)] animate-[ai-ring_2.2s_infinite_1.1s] opacity-0" />
                </>
              )}
            </div>
            <div className="font-sora text-[20px] font-bold text-white">Zevi AI Agent</div>
            <div className="font-mono text-[12.5px] text-[#8E99BC] mt-1">AI sales rep · outbound call</div>

            {/* Wave */}
            <div className={`flex items-center justify-center gap-1 h-[34px] mt-[18px] mb-1 transition-opacity duration-300 ${waveOn ? "opacity-100" : "opacity-25"}`}>
              {Array.from({ length: 14 }).map((_, i) => (
                <i
                  key={i}
                  className="w-[3px] rounded-[3px] not-italic"
                  style={{
                    background: "linear-gradient(180deg,var(--ai-cyan),var(--ai-indigo))",
                    height: "18%",
                    animation: waveOn ? `ai-wave 0.85s ${(i % 5) * 0.12}s infinite ease-in-out` : "none",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Caption */}
          <div
            className="flex-1 min-h-[86px] flex flex-col justify-center text-center rounded-[14px] px-4 py-[14px] mt-2"
            style={{ background: "rgba(255,255,255,.04)", border: `1px solid ${isActive ? "rgba(43,168,255,.25)" : "rgba(255,255,255,.08)"}` }}
          >
            {capWho && (
              <div className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-[var(--ai-cyan)] mb-[5px]">{capWho}</div>
            )}
            <div className="text-[15.5px] text-[#EAEEF8] leading-[1.5]">{capTxt}</div>
          </div>

          {/* Toast */}
          {toastVisible && (
            <div className="mt-3 bg-[rgba(16,185,129,.16)] border border-[rgba(16,185,129,.4)] text-[#7CF0C0] text-[13px] font-semibold px-[11px] py-3 rounded-[11px] text-center">
              ✓ Appointment booked → confirmation sent
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-center gap-[18px] mt-[18px] mb-1">
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={handleMute}
                disabled={isIdle}
                className={`w-14 h-14 rounded-full border-none flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.08] ${muteOn ? "bg-[var(--ai-cyan)]" : "bg-[rgba(255,255,255,.12)]"}`}
              >
                <svg viewBox="0 0 24 24" className="w-[23px] h-[23px] stroke-white fill-none stroke-2">
                  <path d="M1 1l22 22M9 9v3a3 3 0 0 0 5.1 2.1M15 9.3V4a3 3 0 0 0-5.9-.6" />
                  <path d="M19 10a7 7 0 0 1-1.4 4.2M5 10a7 7 0 0 0 .9 3.4M12 19v3" />
                </svg>
              </button>
              <span className="font-mono text-[10px] text-[#8E99BC] uppercase tracking-[0.06em]">Mute</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={handleCall}
                disabled={!isIdle}
                className="w-[66px] h-[66px] rounded-full border-none flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.08]"
                style={{ background: "var(--ai-emerald)", boxShadow: "0 10px 26px rgba(16,185,129,.45)" }}
              >
                <svg viewBox="0 0 24 24" className="w-[23px] h-[23px] stroke-white fill-none stroke-2">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3 4.2 2 2 0 0 1 5 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 16.9z" />
                </svg>
              </button>
              <span className="font-mono text-[10px] text-[#8E99BC] uppercase tracking-[0.06em]">Call</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={handleEnd}
                disabled={isIdle}
                className="w-14 h-14 rounded-full border-none flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.08]"
                style={{ background: "#F0445A", boxShadow: "0 10px 26px rgba(240,68,90,.4)" }}
              >
                <svg viewBox="0 0 24 24" className="w-[23px] h-[23px] stroke-white fill-none stroke-2">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3 4.2 2 2 0 0 1 5 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 16.9z" /><path d="M2 2l20 20" />
                </svg>
              </button>
              <span className="font-mono text-[10px] text-[#8E99BC] uppercase tracking-[0.06em]">End</span>
            </div>
          </div>

          {/* Text reply */}
          <div className="mt-[6px]">
            <input
              ref={replyInputRef}
              type="text"
              placeholder="No mic? Type your reply and hit enter…"
              disabled={isIdle}
              onKeyDown={(e) => { if (e.key === "Enter") userSay((e.target as HTMLInputElement).value); }}
              className="w-full px-[14px] py-3 border border-[rgba(255,255,255,.14)] rounded-[12px] bg-[rgba(255,255,255,.06)] text-white text-[13.5px] outline-none placeholder:text-[#7E8AAD] focus:border-[var(--ai-cyan)] disabled:opacity-50 transition-colors"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
