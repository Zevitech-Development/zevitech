interface AiFinalCtaProps {
  onOpenModal: () => void;
}

export default function AiFinalCta({ onOpenModal }: AiFinalCtaProps) {
  return (
    <section className="py-[72px] md:py-[84px] lg:py-[120px] relative z-[2] max-w-[1200px] mx-auto px-6" id="cta">
      <div className="ai-cta-panel text-center border border-[var(--ai-line)] rounded-[28px] py-[74px] px-[30px] relative overflow-hidden shadow-[var(--ai-shadow)]">
        <span className="font-mono text-[12px] tracking-[0.22em] uppercase text-[var(--ai-blue)]">
          Let&apos;s build it
        </span>
        <h2
          className="font-sora font-extrabold text-[var(--ai-ink)] mx-auto mt-2 mb-[18px] max-w-[800px]"
          style={{ fontSize: "clamp(32px,5vw,56px)" }}
        >
          Ready to make your sales{" "}
          <span
            style={{
              background: "var(--ai-grad-g)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            skyrocket?
          </span>
        </h2>
        <p className="text-[var(--ai-muted)] max-w-[560px] mx-auto mb-[14px] text-[17px]">
          Book a free demo and we&apos;ll show your AI agent booking a live appointment — then have yours live in 48 hours.
        </p>
        <p className="font-mono text-[13px] text-[var(--ai-emerald)] mb-[26px]">
          ⚡ Limited onboarding slots this month
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={onOpenModal}
            className="inline-flex items-center justify-center gap-2 font-semibold text-[15px] px-6 py-[14px] rounded-full text-white transition-all duration-200 hover:shadow-[0_18px_44px_rgba(45,107,255,.45)] w-full max-w-[330px] sm:w-auto"
            style={{ background: "var(--ai-grad)", boxShadow: "0 12px 30px rgba(45,107,255,.32)" }}
          >
            Book a free demo call →
          </button>
          <a
            href="#pricing"
            className="inline-flex items-center justify-center gap-2 font-semibold text-[15px] px-6 py-[14px] rounded-full border border-[var(--ai-line)] bg-[var(--ai-panel)] text-[var(--ai-ink)] hover:border-[var(--ai-blue)] transition-colors duration-200 w-full max-w-[330px] sm:w-auto"
          >
            See pricing
          </a>
        </div>
      </div>
    </section>
  );
}
