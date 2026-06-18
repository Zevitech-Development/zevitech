"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";

import AiCallingHeader from "@/components/layouts/ai-calling-header";

/* Static sections */
import AiCallingHero from "@/elements/business/ai-calling/ai-calling-hero";
import AiMarqueeStrip from "@/elements/business/ai-calling/ai-marquee-strip";
import AiOutreachEngine from "@/elements/business/ai-calling/outreach-engine";
import AiProductShowcase from "@/elements/business/ai-calling/product-showcase";
import AiTasksGrid from "@/elements/business/ai-calling/tasks-grid";
import AiSalesLeakCards from "@/elements/business/ai-calling/sales-leak-cards";
import AiHowItWorksSteps from "@/elements/business/ai-calling/how-it-works-steps";
import AiIndustriesGrid from "@/elements/business/ai-calling/industries-grid";
import AiSkyrocketSection from "@/elements/business/ai-calling/skyrocket-section";
import AiFeaturesGrid from "@/elements/business/ai-calling/features-grid";
import AiResultsStats from "@/elements/business/ai-calling/results-stats";
import AiRoiCalculator from "@/elements/business/ai-calling/roi-calculator";
import AiPricingPlans from "@/elements/business/ai-calling/pricing-plans";
import AiFaq from "@/elements/business/ai-calling/ai-faq";
import AiFinalCta from "@/elements/business/ai-calling/final-cta";
import AiLeadModal from "@/elements/business/ai-calling/ai-lead-modal";
import AiChatFab from "@/elements/business/ai-calling/ai-chat-fab";
import AiCallingFooter from "@/components/layouts/ai-calling-footer";

/* Heavy — lazy load */
const AiLiveVoiceDemo = dynamic(
  () => import("@/elements/business/ai-calling/live-voice-demo"),
  { ssr: false },
);
const AiParticlesField = dynamic(
  () => import("@/elements/business/ai-calling/ai-particles-field"),
  { ssr: false },
);

const DARK_KEY = "ai-calling-dark";

export default function AiCallingPage() {
  const [isDark, setIsDark] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* Persist dark mode preference */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(DARK_KEY);
      if (stored === "1") setIsDark(true);
    } catch {}
  }, []);

  const toggleDark = useCallback(() => {
    setIsDark((d) => {
      const next = !d;
      try {
        localStorage.setItem(DARK_KEY, next ? "1" : "0");
      } catch {}
      return next;
    });
  }, []);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <div
      className={`ai-lp${isDark ? " ai-dark" : ""} relative min-h-screen bg-[var(--ai-bg)] overflow-x-hidden`}
    >
      {/* Header — rendered here so it has access to dark/modal state */}
      <AiCallingHeader
        onOpenModal={openModal}
        onToggleDark={toggleDark}
        isDark={isDark}
      />

      {/* Ambient 3D particle field — fixed behind everything */}
      <AiParticlesField />

      {/* Background color blobs — fixed decorative overlays; colors swap in dark mode via .ai-blob-* classes */}
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      >
        <div className="ai-blob-b absolute w-[560px] h-[560px] rounded-full blur-[110px] top-[-160px] left-[-120px]" />
        <div className="ai-blob-c absolute w-[520px] h-[520px] rounded-full blur-[110px] top-[42%] right-[-160px]" />
        <div className="ai-blob-g absolute w-[440px] h-[440px] rounded-full blur-[110px] bottom-[-160px] left-[26%]" />
      </div>

      {/* Sections — order mirrors original HTML exactly */}
      <AiCallingHero onOpenModal={openModal} />
      <AiMarqueeStrip />

      <AiOutreachEngine />
      <AiLiveVoiceDemo />
      <AiProductShowcase />

      <AiTasksGrid />
      <AiIndustriesGrid />

      <AiSalesLeakCards />
      <AiHowItWorksSteps />
      <AiSkyrocketSection />

      <AiFeaturesGrid />
      <AiResultsStats />
      <AiPricingPlans onOpenModal={openModal} />
      <AiRoiCalculator />

      <AiFaq />
      <AiFinalCta onOpenModal={openModal} />
      <AiCallingFooter />

      {/* Floating UI */}
      <AiLeadModal isOpen={isModalOpen} onClose={closeModal} />
      <AiChatFab onOpenModal={openModal} />
    </div>
  );
}
