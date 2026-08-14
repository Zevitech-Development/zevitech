import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import DailogLeadForm from "@/components/forms/dailog-lead-form";

import { FaArrowRightLong } from "react-icons/fa6";

import { TestingApproachesSectionProps } from "@/interfaces/common-interfaces";

import YoutubeProcessImg from "../../../../public/images/services/digital-marketing/youtube-automation-process.gif";

export default function YoutubeProcessSection({
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
        {/* Heading */}
        <div className="flex flex-col items-center gap-3 lg:gap-5 text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-heading max-w-4xl leading-tight">
            {mainTitle} <span className="text-primary">{highlightedWord}</span>
          </h2>
          <p className="text-base lg:text-lg font-medium text-paragraph max-w-4xl">
            {subtitle}
          </p>
        </div>

        <div className="grid xl:grid-cols-2 gap-10 xl:gap-16">
          {/* Left — sticky GIF + copy */}
          <div className="relative">
            <div className="xl:sticky top-52 xl:self-start">
              <div className="rounded-lg space-y-6 overflow-hidden">
                <Image
                  src={YoutubeProcessImg}
                  alt="YouTube Automation Process"
                  unoptimized
                  className="w-full h-full rounded-lg"
                />
                <h1 className="text-3xl md:text-4xl text-heading font-extrabold font-heading leading-tight">
                  {leftCardTitle}
                </h1>
                <p className="text-sm md:text-base font-medium text-paragraph">
                  {leftCardDescription}
                </p>

                <DailogLeadForm
                  trigger={
                    <Button className="cta-button w-full sm:w-auto bg-primary text-base font-semibold !border-primary hover:bg-primary text-primary-foreground py-6 px-6 mt-6">
                      Let&apos;s Get Started
                      <FaArrowRightLong />
                    </Button>
                  }
                />
              </div>
            </div>
          </div>

          {/* Right — scrolling step cards */}
          <div className="space-y-8 xl:space-y-16">
            {approaches.map((item, index) => (
              <div
                key={index}
                className="flex-center w-full rounded-2xl xl:rounded-3xl text-white"
              >
                <div className="w-full hover:border-2 hover:border-gray-400 flex items-center rounded-2xl p-6 xl:p-8 xl:py-12">
                  <div className="flex flex-col justify-between gap-6">
                    <div className="flex gap-5">
                      <div className="w-12 h-12 rounded-full flex-center flex-shrink-0 bg-black/80">
                        <span className="text-2xl text-white">{item.icon}</span>
                      </div>

                      <div className="flex flex-col gap-3">
                        <h3 className="text-2xl font-bold text-heading">
                          {item.title}
                        </h3>
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
