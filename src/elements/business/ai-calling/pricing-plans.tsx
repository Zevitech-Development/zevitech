"use client";

import {
  aiPricingPlansTop,
  aiPricingPlansBottom,
  aiPricingStats,
} from "@/content/landing/ai-calling-page-content";
import { AiPricingPlan } from "@/interfaces/ai-calling-interface";
import AiSectionHead from "./ai-section-head";

interface AiPricingPlansProps {
  onOpenModal: () => void;
}

function PlanCard({
  plan,
  onOpenModal,
}: {
  plan: AiPricingPlan;
  onOpenModal: () => void;
}) {
  const isPopular = plan.popular;
  const isAmber = plan.amber;
  const tagBg = isAmber ? "#F5B544" : "var(--ai-grad)";
  const tagColor = isAmber ? "#1a1300" : "#fff";
  const bulletColor = isAmber ? "text-[#F5B544]" : "text-[var(--ai-blue)]";

  return (
    <div
      className={`relative border bg-[var(--ai-panel)] rounded-[20px] px-6 py-[30px] flex flex-col shadow-[var(--ai-shadow-sm)] ${
        isPopular
          ? "border-[var(--ai-blue)] shadow-[0_24px_60px_rgba(45,107,255,.20)]"
          : isAmber
          ? "border-[rgba(245,181,68,.5)]"
          : "border-[var(--ai-line)]"
      }`}
    >
      {(isPopular || isAmber) && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-bold font-mono px-[14px] py-[5px] rounded-full whitespace-nowrap"
          style={{ background: tagBg, color: tagColor }}
        >
          {isPopular ? "MOST POPULAR" : "TAILORED"}
        </div>
      )}

      <h3 className="font-sora text-[18px] font-bold text-[var(--ai-ink)]">
        {plan.name}
      </h3>

      {plan.amber ? (
        <div className="font-sora text-[24px] font-extrabold text-[var(--ai-ink)] mt-3 mb-[6px] leading-none">
          {plan.price}
        </div>
      ) : (
        <div className="font-sora text-[42px] font-extrabold text-[var(--ai-ink)] mt-3 mb-[2px] leading-none">
          {plan.price}
          {plan.period && (
            <small className="text-[15px] text-[var(--ai-muted)] font-normal">
              {" "}
              {plan.period}
            </small>
          )}
        </div>
      )}

      <div className="text-[13px] text-[var(--ai-muted)] mt-1 mb-[18px]">
        {plan.description}
      </div>

      <ul className="list-none p-0 flex flex-col gap-[11px] flex-1">
        {plan.features.map((f, i) => {
          const isHeading = f.startsWith("Everything in");
          return (
            <li
              key={i}
              className={`flex gap-[9px] ${
                isHeading
                  ? "text-[var(--ai-muted)] font-bold text-[12.5px]"
                  : "text-[13.5px] text-[var(--ai-text)]"
              }`}
            >
              {!isHeading && (
                <span className={`${bulletColor} font-bold flex-shrink-0`}>
                  ›
                </span>
              )}
              <span
                dangerouslySetInnerHTML={{
                  __html: f.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>"),
                }}
              />
            </li>
          );
        })}
        {plan.dimFeatures?.map((f, i) => (
          <li
            key={`dim-${i}`}
            className="text-[13.5px] text-[var(--ai-muted)] flex gap-[9px]"
          >
            <span className={`${bulletColor} font-bold flex-shrink-0`}>›</span>
            {f}
          </li>
        ))}
      </ul>

      <button
        onClick={onOpenModal}
        className={`w-full mt-6 flex items-center justify-center font-semibold text-[15px] px-6 py-[14px] rounded-full border transition-all duration-200 ${
          isPopular
            ? "text-white border-transparent hover:shadow-[0_18px_44px_rgba(45,107,255,.45)]"
            : "text-[var(--ai-ink)] bg-[var(--ai-panel)] border-[var(--ai-line)] hover:border-[var(--ai-blue)]"
        }`}
        style={
          isPopular
            ? {
                background: "var(--ai-grad)",
                boxShadow: "0 12px 30px rgba(45,107,255,.32)",
              }
            : {}
        }
      >
        {plan.ctaLabel}
      </button>
    </div>
  );
}

export default function AiPricingPlans({ onOpenModal }: AiPricingPlansProps) {
  return (
    <section
      className="py-[72px] md:py-[84px] lg:py-[120px] relative z-[2] max-w-[1200px] mx-auto px-6"
      id="pricing"
    >
      <AiSectionHead
        eyebrow="Pricing"
        title="One AI agent. The output of an entire call center."
        description="Build your custom AI agent once — then let it call thousands of leads at the same time, 24/7. You only fund your own usage, billed at cost."
        center
      />

      {/* Stats bar */}
      <div className="flex flex-wrap justify-center gap-[10px] max-w-[920px] mx-auto mt-[6px] mb-[30px]">
        {aiPricingStats.map((s) => (
          <div
            key={s.label}
            className="flex-1 basis-[150px] border border-[var(--ai-line)] rounded-[14px] py-[14px] px-[10px] text-center"
            style={{
              background:
                "linear-gradient(180deg,rgba(38,112,255,.07),transparent)",
            }}
          >
            <b className="block font-sora font-extrabold text-[24px] text-[var(--ai-ink)]">
              {s.value}
            </b>
            <span className="text-[12px] text-[var(--ai-muted)]">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Top row — 3 plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px] items-stretch mt-[10px]">
        {aiPricingPlansTop.map((plan) => (
          <PlanCard key={plan.name} plan={plan} onOpenModal={onOpenModal} />
        ))}
      </div>

      {/* Bottom row — 2 plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px] items-stretch mt-[18px]">
        {aiPricingPlansBottom.map((plan) => (
          <PlanCard key={plan.name} plan={plan} onOpenModal={onOpenModal} />
        ))}
      </div>

      <p className="text-center text-[var(--ai-muted)] text-[13px] mt-[22px]">
        Call usage (voice + telephony) is billed separately at provider cost —
        typically $0.15–$0.22/min. We size your monthly budget during
        onboarding. HIPAA setup available on Scale, Custom &amp; Enterprise.
      </p>
    </section>
  );
}
