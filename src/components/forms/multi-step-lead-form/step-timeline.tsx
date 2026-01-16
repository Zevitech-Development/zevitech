"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { Zap, Calendar, Clock, Search } from "lucide-react";

interface StepTimelineProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const timelineOptions = [
  {
    id: "asap",
    label: "ASAP",
    description: "Within 2 weeks",
    icon: Zap,
  },
  {
    id: "1-month",
    label: "Within 1 month",
    description: "Standard timeline",
    icon: Calendar,
  },
  {
    id: "2-3-months",
    label: "Within 2-3 months",
    description: "Flexible timeline",
    icon: Clock,
  },
  {
    id: "no-rush",
    label: "No rush",
    description: "Just exploring options",
    icon: Search,
  },
];

export default function StepTimeline({
  value,
  onChange,
  onNext,
  onBack,
}: StepTimelineProps) {
  const handleSelect = (timelineId: string) => {
    onChange(timelineId);
  };

  return (
    <div className="space-y-6 md:space-y-8 pt-4 md:pt-6">
      <div className="text-center">
        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-heading mb-1 md:mb-2">
          When do you need this completed?
        </h3>
        <p className="text-sm md:text-base text-paragraph">
          Select your preferred timeline
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {timelineOptions.map((timeline) => {
          const Icon = timeline.icon;
          const isSelected = value === timeline.id;

          return (
            <button
              key={timeline.id}
              type="button"
              onClick={() => handleSelect(timeline.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-2 md:gap-3 p-4 md:p-6 lg:p-8 rounded-xl border-2 transition-all duration-200",
                "hover:border-primary hover:bg-primary/5",
                isSelected
                  ? "border-primary bg-primary/10"
                  : "border-gray-200 bg-white"
              )}
            >
              <Icon
                className={cn(
                  "w-6 h-6 md:w-8 md:h-8",
                  isSelected ? "text-primary" : "text-gray-500"
                )}
              />
              <div className="text-center">
                <p
                  className={cn(
                    "font-medium text-sm md:text-base",
                    isSelected ? "text-primary" : "text-heading"
                  )}
                >
                  {timeline.label}
                </p>
                <p className="text-xs md:text-sm text-paragraph">{timeline.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-between pt-2 md:pt-4">
        <Button
          onClick={onBack}
          variant="outline"
          className="px-6 md:px-8 py-2 md:py-3 text-sm md:text-base rounded-full border-gray-300"
        >
          <FaArrowLeftLong className="mr-2" /> Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!value}
          className="bg-primary hover:bg-primary-hover text-white px-6 md:px-8 py-2 md:py-3 text-sm md:text-base rounded-full disabled:opacity-50"
        >
          Next <FaArrowRightLong className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
