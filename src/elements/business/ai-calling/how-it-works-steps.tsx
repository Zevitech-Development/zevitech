import { aiSteps } from "@/content/landing/ai-calling-page-content";
import AiSectionHead from "./ai-section-head";

export default function AiHowItWorksSteps() {
  return (
    <section className="py-[72px] md:py-[84px] lg:py-[120px] relative z-[2] max-w-[1200px] mx-auto px-6" id="how">
      <AiSectionHead
        eyebrow="How it works"
        title="Three steps. Then your calendar fills itself."
        description="Your Zevitech AI agent is custom-built to your offer, script, and voice — live in 48 hours."
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {aiSteps.map((step) => (
          <div
            key={step.num}
            className="border border-[var(--ai-line)] bg-[var(--ai-panel)] rounded-[var(--radius)] p-[30px] shadow-[var(--ai-shadow-sm)] relative"
          >
            <div className="font-mono text-[13px] text-[var(--ai-blue)] tracking-[0.15em]">
              {step.num}
            </div>
            <h3 className="font-sora text-[21px] font-bold text-[var(--ai-ink)] mt-[14px] mb-[10px]">
              {step.title}
            </h3>
            <p className="text-[var(--ai-muted)] text-[15px] m-0">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
