"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const stepLabels = ["Service", "Budget", "Timeline", "Contact"];

export default function ProgressBar({
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  return (
    <div className="py-4 md:py-6">
      {/* Step indicators */}
      <div className="flex items-center justify-between relative">
        {/* Progress line background */}
        <div className="absolute top-4 md:top-5 left-0 right-0 h-0.5 md:h-1 bg-gray-200 -z-10" />

        {/* Progress line filled */}
        <div
          className="absolute top-4 md:top-5 left-0 h-0.5 md:h-1 bg-primary -z-10 transition-all duration-300"
          style={{
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
          }}
        />

        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={stepNumber} className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-base font-semibold transition-all duration-300",
                  isCompleted
                    ? "bg-primary text-white"
                    : isCurrent
                    ? "bg-primary text-white ring-4 ring-primary/20"
                    : "bg-gray-200 text-gray-500"
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 md:w-5 md:h-5" />
                ) : (
                  stepNumber
                )}
              </div>
              <span
                className={cn(
                  "text-xs md:text-sm mt-1 md:mt-2 font-medium",
                  isCurrent || isCompleted ? "text-primary" : "text-gray-400"
                )}
              >
                {stepLabels[index]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
