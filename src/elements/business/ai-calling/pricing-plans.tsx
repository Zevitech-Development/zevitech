import { aiPricingPlans } from "@/content/landing/ai-calling-page-content";
import AiSectionHead from "./ai-section-head";

interface AiPricingPlansProps {
  onOpenModal: () => void;
}

export default function AiPricingPlans({ onOpenModal }: AiPricingPlansProps) {
  return (
    <section className="py-[72px] md:py-[84px] lg:py-[120px] relative z-[2] max-w-[1200px] mx-auto px-6" id="pricing">
      <AiSectionHead
        eyebrow="Pricing"
        title="Pick your plan by how many leads you need called."
        description="Every plan includes the AI web chat agent. Fully managed by Zevitech — we build it, you grow."
        center
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px] items-stretch mt-[10px]">
        {aiPricingPlans.map((plan) => (
          <div
            key={plan.name}
            className={`border bg-[var(--ai-panel)] rounded-[20px] px-6 py-[30px] flex flex-col shadow-[var(--ai-shadow-sm)] relative ${
              plan.popular
                ? "border-[var(--ai-blue)] shadow-[0_24px_60px_rgba(45,107,255,.20)]"
                : "border-[var(--ai-line)]"
            }`}
          >
            {plan.popular && (
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-[11px] font-bold font-mono px-[14px] py-[5px] rounded-full"
                style={{ background: "var(--ai-grad)" }}
              >
                MOST POPULAR
              </div>
            )}
            <h3 className="font-sora text-[18px] font-bold text-[var(--ai-ink)]">{plan.name}</h3>
            <div className="font-sora text-[42px] font-extrabold text-[var(--ai-ink)] mt-3 mb-[2px] leading-none">
              {plan.price}
              {plan.period && (
                <small className="text-[15px] text-[var(--ai-muted)] font-normal">{plan.period}</small>
              )}
            </div>
            <div className="text-[13px] text-[var(--ai-muted)] min-h-[34px] mt-1">{plan.description}</div>
            <ul className="list-none p-0 mt-[18px] mb-6 flex flex-col gap-[11px]">
              {plan.features.map((f) => (
                <li key={f} className="text-[13.5px] text-[var(--ai-text)] flex gap-[9px]">
                  <span className="text-[var(--ai-blue)] font-bold">›</span>
                  <span dangerouslySetInnerHTML={{ __html: f.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") }} />
                </li>
              ))}
              {plan.dimFeatures?.map((f) => (
                <li key={f} className="text-[13.5px] text-[var(--ai-muted)] flex gap-[9px]">
                  <span className="text-[var(--ai-blue)] font-bold">›</span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={onOpenModal}
              className={`w-full mt-auto flex items-center justify-center font-semibold text-[15px] px-6 py-[14px] rounded-full border transition-all duration-200 ${
                plan.popular
                  ? "text-white hover:shadow-[0_18px_44px_rgba(45,107,255,.45)]"
                  : "text-[var(--ai-ink)] bg-[var(--ai-panel)] border-[var(--ai-line)] hover:border-[var(--ai-blue)]"
              }`}
              style={plan.popular ? { background: "var(--ai-grad)", boxShadow: "0 12px 30px rgba(45,107,255,.32)" } : {}}
            >
              {plan.ctaLabel}
            </button>
          </div>
        ))}
      </div>
      <p className="text-center text-[var(--ai-muted)] text-[13px] mt-[22px]">
        Prices in USD. Optional one-time setup on Starter. Regional pricing available.
      </p>
    </section>
  );
}
