import { aiResults } from "@/content/landing/ai-calling-page-content";
import AiSectionHead from "./ai-section-head";

export default function AiResultsStats() {
  return (
    <section className="py-[72px] md:py-[84px] lg:py-[120px] relative z-[2] max-w-[1200px] mx-auto px-6" id="results">
      <AiSectionHead
        eyebrow="Proof"
        title="Businesses that switched didn't grow. They jumped."
        center
      />
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 border border-[var(--ai-line)] rounded-[24px] p-6 md:p-10 bg-[var(--ai-panel)] shadow-[var(--ai-shadow)]"
      >
        {aiResults.map((result, i) => (
          <div key={result.value} className="r">
            <b
              className="font-sora text-[38px] font-extrabold block"
              style={{
                background: i % 2 === 0 ? "var(--ai-grad)" : "var(--ai-grad-g)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {result.value}
            </b>
            <span className="text-[13.5px] text-[var(--ai-muted)]">{result.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
