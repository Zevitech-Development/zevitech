import React from "react";

import { cn } from "@/lib/utils";

import { TopicHighlightsSectionProps } from "@/interfaces/common-interfaces";

/**
 * Renders a titled group of topical sub-sections as explicit h2/h3 headings.
 * Used to give service pages distinct, keyword-bearing heading structure
 * instead of the shared twin-template boilerplate.
 */
export default function TopicHighlightsSection({
  title,
  description,
  topics,
  className,
}: TopicHighlightsSectionProps) {
  return (
    <section
      className={cn("section-padding-standard py-14 md:py-20", className)}
    >
      <div className="layout-standard flex flex-col gap-10">
        <div className="flex flex-col gap-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-heading leading-tight">
            {title}
          </h2>
          {description && (
            <p className="text-base md:text-lg text-paragraph font-medium">
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <article
              key={topic.heading}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm animation-standard hover:shadow-md"
            >
              <h3 className="text-lg md:text-xl font-semibold font-heading text-heading">
                {topic.heading}
              </h3>
              <p className="text-sm md:text-base text-paragraph font-medium leading-relaxed">
                {topic.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
