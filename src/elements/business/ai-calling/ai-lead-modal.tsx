"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AiLeadModalProps } from "@/interfaces/ai-calling-interface";

const INDUSTRIES = [
  "Solar", "Roofing", "HVAC", "Home Services", "Real Estate",
  "Dental", "Legal", "Insurance", "Fitness", "E-commerce",
  "Medical", "Water Purification", "Franchise", "Other",
];

interface FieldState {
  name: string;
  email: string;
  phone: string;
  business: string;
  industry: string;
  message: string;
}

const INITIAL: FieldState = { name: "", email: "", phone: "", business: "", industry: "", message: "" };

function buildEmailHtml(f: FieldState): string {
  const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <style>
    body{font-family:'Segoe UI',sans-serif;background:#f8f9fa;margin:0;padding:0;color:#212529}
    .wrap{max-width:620px;margin:40px auto;background:#fff;border-radius:12px;box-shadow:0 6px 20px rgba(0,0,0,.05);padding:32px}
    .hdr{text-align:center;margin-bottom:30px}
    .logo{max-width:200px;margin-bottom:10px}
    h1{font-size:22px;color:#2670ff;margin:0}
    .badge{display:inline-block;background:linear-gradient(135deg,#2670ff,#6d5bf5);color:#fff;padding:4px 14px;border-radius:20px;font-size:12px;font-weight:600;margin-top:10px}
    .sec{margin-bottom:22px}
    .sec-title{font-size:15px;font-weight:700;color:#0e1424;border-bottom:2px solid #2670ff;margin-bottom:10px;padding-bottom:5px}
    .row{display:flex;flex-wrap:wrap;margin-bottom:8px}
    .lbl{flex:0 0 140px;font-weight:700;color:#495057}
    .val{flex:1;color:#212529}
    .msg{background:#f0f4ff;border-left:4px solid #2670ff;padding:12px 14px;border-radius:8px;color:#2b3450;line-height:1.6}
    .ftr{text-align:center;font-size:12px;color:#6c757d;border-top:1px solid #e9ecef;padding-top:18px;margin-top:28px}
  </style></head><body>
  <div class="wrap">
    <div class="hdr">
      <img class="logo" src="https://res.cloudinary.com/dptujgmbz/image/upload/v1752157999/kynkimdiy5jozaxl4jfe.png" alt="Zevitech"/>
      <h1>New AI Demo Request</h1>
      <span class="badge">AI CALLING LEAD</span>
    </div>
    <div class="sec">
      <div class="sec-title">Submission Details</div>
      <div class="row"><div class="lbl">Date:</div><div class="val">${date}</div></div>
      <div class="row"><div class="lbl">Source:</div><div class="val">AI Calling Landing Page — Demo Modal</div></div>
    </div>
    <div class="sec">
      <div class="sec-title">Contact Information</div>
      <div class="row"><div class="lbl">Name:</div><div class="val">${f.name}</div></div>
      <div class="row"><div class="lbl">Email:</div><div class="val">${f.email}</div></div>
      <div class="row"><div class="lbl">Phone:</div><div class="val">${f.phone}</div></div>
      <div class="row"><div class="lbl">Business:</div><div class="val">${f.business}</div></div>
      <div class="row"><div class="lbl">Industry:</div><div class="val">${f.industry || "Not specified"}</div></div>
    </div>
    ${f.message.trim() ? `<div class="sec"><div class="sec-title">Additional Notes</div><div class="msg">${f.message}</div></div>` : ""}
    <div class="ftr">
      <p>High-intent lead — respond within 10 minutes for best conversion.</p>
      <p>© ${new Date().getFullYear()} Zevitech. All rights reserved.</p>
    </div>
  </div></body></html>`;
}

function validate(f: FieldState) {
  if (!f.name.trim()) return "Full name is required.";
  if (!f.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(f.email)) return "A valid email is required.";
  if (!f.phone.trim()) return "Phone number is required.";
  if (!f.business.trim()) return "Business name is required.";
  return null;
}

export default function AiLeadModal({ isOpen, onClose }: AiLeadModalProps) {
  const [fields, setFields] = useState<FieldState>(INITIAL);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function set(k: keyof FieldState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFields((p) => ({ ...p, [k]: e.target.value }));
      setError(null);
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate(fields);
    if (err) { setError(err); return; }
    setLoading(true);
    try {
      const subject = `AI Demo Lead: ${fields.name} — ${fields.business}`;
      const html = buildEmailHtml(fields);
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: "zevitech25@gmail.com", subject, html }),
      });
      if (res.ok) {
        setSuccess(true);
        setFields(INITIAL);
      } else {
        const body = await res.json().catch(() => ({}));
        console.error("Email API error:", body);
        setError("Something went wrong. Please try again or email us directly.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    onClose();
    setTimeout(() => { setSuccess(false); setError(null); setFields(INITIAL); }, 400);
  }

  const inputCls = "w-full px-[14px] py-[13px] border border-[var(--ai-line)] rounded-[12px] bg-[var(--ai-bg)] text-[var(--ai-ink)] text-[14px] outline-none focus:border-[var(--ai-blue)] transition-colors placeholder:text-[var(--ai-muted)]";
  const labelCls = "block font-mono text-[12px] text-[var(--ai-muted)] mb-[7px] tracking-[0.03em]";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(14,20,36,.72)", backdropFilter: "blur(6px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative bg-[var(--ai-panel)] border border-[var(--ai-line)] rounded-[24px] shadow-[var(--ai-shadow)] w-full max-w-[560px] overflow-hidden"
          >
            {/* Header */}
            <div className="px-[30px] pt-[28px] pb-5 border-b border-[var(--ai-line)] flex items-start justify-between gap-4">
              <div>
                <div
                  className="font-sora text-[22px] font-bold text-[var(--ai-ink)]"
                  style={{
                    background: "var(--ai-grad)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Book your free demo
                </div>
                <p className="text-[var(--ai-muted)] text-[13.5px] mt-1">
                  We&apos;ll call you back in under 10 minutes with a live AI pitch.
                </p>
              </div>
              <button
                onClick={handleClose}
                className="text-[var(--ai-muted)] hover:text-[var(--ai-ink)] text-[24px] leading-none mt-[2px] transition-colors flex-shrink-0"
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="px-[30px] py-[26px] max-h-[70vh] overflow-y-auto">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-8"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: "var(--ai-grad-g)" }}
                  >
                    <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-white fill-none stroke-[2.5]">
                      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="font-sora text-[22px] font-bold text-[var(--ai-ink)] mb-2">You&apos;re booked!</div>
                  <p className="text-[var(--ai-muted)] text-[15px] max-w-[360px] mx-auto">
                    Your AI demo is confirmed. Expect a call within 10 minutes. Check your email for details.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
                    <div>
                      <label className={labelCls}>Full name *</label>
                      <input type="text" value={fields.name} onChange={set("name")} placeholder="Your name" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Business email *</label>
                      <input type="email" value={fields.email} onChange={set("email")} placeholder="you@company.com" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Phone *</label>
                      <input type="tel" value={fields.phone} onChange={set("phone")} placeholder="+1 (555) 000-0000" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Business name *</label>
                      <input type="text" value={fields.business} onChange={set("business")} placeholder="Company Inc." className={inputCls} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelCls}>Industry</label>
                      <select value={fields.industry} onChange={set("industry")} className={inputCls}>
                        <option value="">Select your industry</option>
                        {INDUSTRIES.map((ind) => <option key={ind}>{ind}</option>)}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelCls}>Anything else? (optional)</label>
                      <textarea
                        value={fields.message}
                        onChange={set("message")}
                        rows={3}
                        placeholder="Tell us about your current outreach or how many leads you're working with…"
                        className={inputCls + " resize-none"}
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="mt-[10px] text-[13px] text-[#F0445A] bg-[rgba(240,68,90,.08)] border border-[rgba(240,68,90,.22)] px-[14px] py-[11px] rounded-[11px]">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-5 w-full py-[15px] rounded-[14px] font-sora font-bold text-[16px] text-white border-none cursor-pointer transition-all duration-200 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    style={{ background: "var(--ai-grad)" }}
                  >
                    {loading ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Booking…
                      </>
                    ) : (
                      "Book free AI demo →"
                    )}
                  </button>

                  <p className="text-[11.5px] text-[var(--ai-muted)] text-center mt-3">
                    No credit card. We&apos;ll call you within 10 minutes.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
