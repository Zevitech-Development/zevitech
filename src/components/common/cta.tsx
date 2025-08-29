import React from "react";

import DailogLeadForm from "@/forms/dailog-lead-form";

import { Button } from "../ui/button";

import { FaArrowRightLong } from "react-icons/fa6";

import { CTAProps } from "@/interfaces/common-interfaces";

const CTA = ({
  backgroundImageClass,
  heading,
  highlightedText,
  paragraph,
}: CTAProps) => {
  return (
    <section className="layout-standard bg-[#052535] h-[450px] md:h-[500px] xl:h-[500px] rounded-3xl flex flex-col justify-center lg:flex-row overflow-hidden">
      {/* Text Content - Left Side */}
      <div className="flex flex-col justify-center gap-8 px-5 lg:pl-9 text-center lg:text-left w-full lg:w-1/2">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-heading text-white tracking-wider">
          {heading} <span className="text-primary">{highlightedText}</span>
        </h1>
        <p className="text-white/90 text-base md:text-lg">{paragraph}</p>
        <div>
          <DailogLeadForm
            trigger={
              <Button className="cta-button h-[60px] md:px-6 group lg:hover:scale-105 rounded-full lg:hover:bg-primary-hover md:text-xl text-base lg:!animation-standard font-bold">
                Let&apos;s Get Started
                <FaArrowRightLong className="group-hover:translate-x-[2px] animation-standard" />
              </Button>
            }
          />
        </div>
      </div>

      {/* Background Image - Right Side */}
      <div
        className={`hidden lg:block w-full lg:w-1/2 h-full ${backgroundImageClass} bg-cover bg-no-repeat bg-right`}
      />
    </section>
  );
};

export default CTA;
