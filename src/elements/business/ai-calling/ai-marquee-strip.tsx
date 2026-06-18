import { aiMarqueeText } from "@/content/landing/ai-calling-page-content";

export default function AiMarqueeStrip() {
  return (
    <div className="border-t border-b border-[var(--ai-line)] py-[22px] overflow-hidden whitespace-nowrap relative z-[2] bg-[var(--ai-bg2)]">
      <div
        className="inline-flex gap-[46px] font-mono text-[14px] text-[var(--ai-muted)]"
        style={{ animation: "ai-scroll 28s linear infinite" }}
      >
        <span dangerouslySetInnerHTML={{ __html: aiMarqueeText.replace(/\*\*(.*?)\*\*/g, "<b class='text-[var(--ai-ink)]'>$1</b>") }} />
        <span dangerouslySetInnerHTML={{ __html: aiMarqueeText.replace(/\*\*(.*?)\*\*/g, "<b class='text-[var(--ai-ink)]'>$1</b>") }} />
      </div>
    </div>
  );
}
