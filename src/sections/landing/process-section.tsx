import React from "react";

import { ProcessSectionContent } from "@/contents/landing-page-content";

import { Button } from "@/components/ui/button";

import { FaArrowRightLong } from "react-icons/fa6";

function ProcessSection() {
  return (
    <section className="bg-secondary-background section-padding-standard">
      <div className="layout-standard section-padding-standard">
        {/* HEADER */}
        <div className="flex flex-col gap-4 items-center text-center lg:mb-16 mb-12">
          <h2 className="md:text-lg text-base font-semibold uppercase text-center text-foreground">
            Our Easy Process
          </h2>
          <h1 className="text-heading font-heading md:text-6xl text-4xl font-bold text-center max-w-4xl tracking-widest">
            How We Build <span className="text-secondary">Shopify</span> Stores
          </h1>
          <p className="md:text-2xl text-base md:max-w-3xl text-center font-medium">
            We use a proven approach to create attractive and fully functional
            Shopify stores for our clients. Here&apos;s how we work:
          </p>
        </div>

        {/* PROCESS STEP */}
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12 gap-8 lg:mb-16 mb-12">
          {ProcessSectionContent.map((step, index) => (
            <div key={step.id} className="relative group">
              {/* STEP CARD */}
              <div className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full cursor-pointer">
                {/* STEP NUMBER */}
                <div className="text-8xl font-bold text-black/10 absolute top-4 right-6 leading-none select-none">
                  {step.number}
                </div>

                {/* ICON */}
                <div className="relative z-10 mb-12">{step.icon}</div>

                {/* CONTENT */}
                <div className="relative z-10">
                  <h3 className="md:text-2xl text-lg font-semibold font-heading text-heading mb-4 tracking-widest">
                    {step.title}
                  </h3>
                  <p className="leading-relaxed md:text-base text-sm">
                    {step.description}
                  </p>
                </div>

                {index < ProcessSectionContent.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-10 transform -translate-y-1/2 z-20">
                    <FaArrowRightLong className="w-8 h-8 text-primary" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CALL TO ACTION */}
        <div
          className="flex flex-col md:flex-row md:gap-4 gap-2
         items-center justify-center"
        >
          <Button className="cta-button h-[60px] px-6 group lg:hover:scale-105 rounded-full lg:hover:bg-primary-hover md:text-xl text-base lg:!animation-standard font-bold max-md:w-full">
            Let&apos;s Get Started
            <FaArrowRightLong className="w-5 h-5 lg:group-hover:translate-x-[3px] animation-standard" />
          </Button>

          <Button className="cta-button h-[60px] px-6 bg-transparent border-4 border-primary group lg:hover:scale-105 rounded-full text-heading md:text-xl text-base lg:!animation-standard font-bold max-md:w-full">
            Chat Now
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ProcessSection;
