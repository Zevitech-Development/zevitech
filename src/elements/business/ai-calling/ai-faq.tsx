"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { aiFaqs } from "@/content/landing/ai-calling-page-content";
import AiSectionHead from "./ai-section-head";

export default function AiFaq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-[72px] md:py-[84px] lg:py-[120px] relative z-[2] max-w-[1200px] mx-auto px-6" id="faq">
      <AiSectionHead
        eyebrow="Questions"
        title="Answered before you ask."
        center
      />
      <div className="max-w-[820px] mx-auto">
        {aiFaqs.map((faq, i) => (
          <div
            key={i}
            className="border border-[var(--ai-line)] rounded-[14px] bg-[var(--ai-panel)] mb-3 overflow-hidden shadow-[var(--ai-shadow-sm)]"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full text-left bg-transparent border-none text-[var(--ai-ink)] font-sora font-semibold text-[17px] px-[22px] py-5 cursor-pointer flex justify-between gap-[14px] items-center"
            >
              {faq.question}
              <span
                className="text-[var(--ai-blue)] text-[22px] transition-transform duration-300 flex-shrink-0"
                style={{ transform: open === i ? "rotate(45deg)" : "none" }}
              >
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  key="answer"
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="text-[var(--ai-muted)] text-[15px] px-[22px] pb-5 m-0">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
