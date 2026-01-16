"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import MultiStepLeadForm from "@/components/forms/multi-step-lead-form";
import { Lightbulb, MessageSquarePlus } from "lucide-react";

export default function FloatingCtaButton() {
  return (
    <>
      {/* Desktop - Side button */}
      <div className="fixed left-0 top-1/3 z-40 hidden lg:block">
        <MultiStepLeadForm
          trigger={
            <Button
              className="bg-primary hover:bg-primary-hover text-white font-medium px-2 py-6 xl:px-3 xl:py-8 rounded-r-lg rounded-l-none shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-x-1 flex flex-col items-center gap-1.5 h-auto group border-l-0"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
              {/* <Lightbulb className="w-4 h-4 xl:w-5 xl:h-5 rotate-90 group-hover:animate-pulse" /> */}
              <span className="text-xs xl:text-sm tracking-wide">Project in mind?</span>
            </Button>
          }
        />
      </div>

      {/* Mobile & Tablet - Bottom floating button */}
      <div className="fixed bottom-11 left-4 z-40 lg:hidden">
        <MultiStepLeadForm
          trigger={
            <Button
              className="bg-primary hover:bg-primary-hover text-white font-medium px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 h-auto group animate-bounce-slow"
            >
              <MessageSquarePlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold">Get Quote</span>
            </Button>
          }
        />
      </div>
    </>
  );
}
