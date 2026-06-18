import { aiTasks } from "@/content/landing/ai-calling-page-content";
import AiSectionHead from "./ai-section-head";
import AiTaskIcon from "./ai-task-icon";

export default function AiTasksGrid() {
  return (
    <section className="py-[72px] md:py-[84px] lg:py-[120px] relative z-[2] max-w-[1200px] mx-auto px-6" id="tasks">
      <AiSectionHead
        eyebrow="Your AI workforce"
        title="The jobs your AI does — so your team doesn't have to."
        description="Every repetitive, time-draining task that eats your day. Handled, 24/7, the second it's needed."
        center
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px]">
        {aiTasks.map((task) => (
          <div
            key={task.title}
            className="border border-[var(--ai-line)] bg-[var(--ai-panel)] rounded-[18px] p-6 shadow-[var(--ai-shadow-sm)] transition-all duration-200 hover:-translate-y-[5px] hover:shadow-[var(--ai-shadow)]"
          >
            <AiTaskIcon name={task.icon} />
            <h3 className="font-sora text-base font-bold text-[var(--ai-ink)] mt-[14px] mb-[6px]">
              {task.title}
            </h3>
            <p className="text-[13.5px] text-[var(--ai-muted)] m-0">{task.description}</p>
            <div className="mt-3 font-mono text-[11px] text-[var(--ai-emerald)] font-bold">
              {task.output}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
