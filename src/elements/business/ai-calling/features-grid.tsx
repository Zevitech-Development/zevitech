import { aiFeatures } from "@/content/landing/ai-calling-page-content";
import AiSectionHead from "./ai-section-head";
import AiTaskIcon from "./ai-task-icon";

export default function AiFeaturesGrid() {
  return (
    <section
      className="py-[72px] md:py-[84px] lg:py-[120px] relative z-[2] max-w-[1200px] mx-auto px-6"
      id="features"
    >
      <AiSectionHead
        eyebrow="Everything included"
        title="One system. Every lead handled."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px]">
        {aiFeatures.map((feat) => (
          <div
            key={feat.title}
            className="border border-[var(--ai-line)] bg-[var(--ai-panel)] rounded-[var(--radius)] p-[26px] shadow-[var(--ai-shadow-sm)] transition-all duration-200 hover:border-[var(--ai-blue)] hover:shadow-[var(--ai-shadow)] cursor-default"
          >
            <div className="mb-4">
              <AiTaskIcon name={feat.icon} />
            </div>
            <h3 className="font-sora text-[17px] font-bold text-[var(--ai-ink)] mb-2">
              {feat.title}
            </h3>
            <p className="text-[var(--ai-muted)] text-sm m-0">
              {feat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
