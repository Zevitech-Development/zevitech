import { aiLeakCards } from "@/content/landing/ai-calling-page-content";
import AiSectionHead from "./ai-section-head";

export default function AiSalesLeakCards() {
  return (
    <section className="py-[72px] md:py-[84px] lg:py-[120px] relative z-[2] max-w-[1200px] mx-auto px-6" id="problem">
      <AiSectionHead
        eyebrow="The leak"
        title="Your sales are leaking — and you can't see it."
        description="Every lead that isn't called fast goes to the competitor who answers first. Most businesses bleed revenue from a problem they never measure."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {aiLeakCards.map((card) => (
          <div
            key={card.value}
            className="border border-[var(--ai-line)] bg-[var(--ai-panel)] rounded-[var(--radius)] p-[30px] shadow-[var(--ai-shadow-sm)]"
          >
            <div
              className="font-sora text-[40px] font-extrabold"
              style={{
                background: card.isGreen ? "var(--ai-grad-g)" : "var(--ai-grad)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {card.value}
            </div>
            <p className="text-[var(--ai-muted)] mt-[10px] text-[15px] m-0">{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
