import { cn } from "@/lib/utils";

interface AiSectionHeadProps {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
}

export default function AiSectionHead({
  eyebrow,
  title,
  description,
  center,
}: AiSectionHeadProps) {
  return (
    <div className={cn("max-w-[760px] mb-14", center && "mx-auto text-center")}>
      <span className="ai-eyebrow font-mono text-[12px] tracking-[0.22em] uppercase text-[var(--ai-blue)]">
        {eyebrow}
      </span>
      <h2 className="font-sora font-extrabold text-[var(--ai-ink)] text-[clamp(30px,4vw,50px)] mt-[14px] leading-[1.05] tracking-[-0.02em]">
        {title}
      </h2>
      {description && (
        <p className="text-[var(--ai-muted)] text-[17px] mt-4">{description}</p>
      )}
    </div>
  );
}
