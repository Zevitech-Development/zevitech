import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";

import DailogLeadForm from "@/components/forms/dailog-lead-form";

import { TestingApproachesSectionProps } from "@/interfaces/common-interfaces";

import { FaArrowRightLong } from "react-icons/fa6";

export default function ScrollingApproachesSection({
  mainTitle,
  highlightedWord,
  subtitle,
  leftCardTitle,
  leftCardDescription,
  approaches,
}: TestingApproachesSectionProps) {
  return (
    <section className="relative section-padding-standard xl:py-16 bg-white">
      <div className="layout-standard">
        <div className="flex flex-col items-center gap-3 lg:gap-5 text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-heading max-w-4xl leading-tight">
            {mainTitle} <span className="text-primary">{highlightedWord}</span>
          </h2>
          <p className="text-base lg:text-lg font-medium text-paragraph max-w-4xl">
            {subtitle}
          </p>
        </div>

        <div className="grid xl:grid-cols-2 gap-10 xl:gap-16">
          {/* Left Content - Simple Sticky */}
          <div className="relative">
            <div className="xl:sticky top-52 xl:self-start">
              <div className="p-8 lg:p-14 bg-gradient-to-tr from-[#40447d] to-[#171e31] space-y-8 rounded-lg">
                <h1 className="text-3xl md:text-4xl text-gray-200 font-extrabold font-heading leading-tight">
                  {leftCardTitle}
                </h1>
                <p className="text-sm md:text-base font-medium text-gray-300">
                  {leftCardDescription}
                </p>

                <DailogLeadForm
                  trigger={
                    <Button className="cta-button bg-primary text-base font-semibold !border-primary hover:bg-primary text-primary-foreground py-6 px-6 mt-6">
                      Let&apos;s Get Started
                      <FaArrowRightLong />
                    </Button>
                  }
                />
              </div>
            </div>
          </div>

          {/* Right Content - Scrollable Cards */}
          <div className="space-y-8 xl:space-y-16">
            {approaches.map((item, index) => (
              <div
                key={index}
                className="flex-center w-full rounded-2xl xl:rounded-3xl text-white"
              >
                <div className="w-full hover:border-2 hover:border-gray-400 flex items-center rounded-2xl p-6 xl:p-8 xl:py-12">
                  <div className="flex flex-col justify-between gap-6">
                    <div className="flex gap-5">
                      <div className="w-12 h-12 rounded-full flex-center flex-shrink-0 bg-black/90">
                        <span className="text-2xl">{item.icon}</span>
                      </div>

                      <div className="flex flex-col gap-3">
                        <h1 className="text-2xl font-bold text-heading">
                          {item.title}
                        </h1>
                        <p className="max-w-3xl text-black">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
