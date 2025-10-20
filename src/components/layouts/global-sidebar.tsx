"use client";
import { cn } from "@/lib/utils";

import { PrivacyPolicySidebarProps } from "@/interfaces/common-interfaces";

export function GlobalSidebar({
  activeSection,
  onSectionClick,
  data,
}: PrivacyPolicySidebarProps) {
  return (
    <div className="sticky top-28 bg-white rounded-lg shadow-sm border border-gray-100 p-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
      <h3 className="text-lg font-semibold text-heading mb-4">
        Table of Contents
      </h3>
      <nav className="space-y-1">
        {data.sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => onSectionClick(section.id)}
            className={cn(
              "w-full text-left py-2 px-3 rounded-md transition-colors text-sm",
              "hover:bg-blue-50 hover:text-primary-hover",
              activeSection === section.id
                ? "bg-blue-100 text-primary-hover font-medium border-l-2 border-primary"
                : "text-paragraph"
            )}
          >
            {index + 1}. {section.title}
          </button>
        ))}
      </nav>
    </div>
  );
}
