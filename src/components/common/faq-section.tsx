import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaqSectionProps } from "@/interfaces/common-interfaces";

const FaqSection = ({ faqs }: FaqSectionProps) => {
  return (
    <>
      <section className="layout-standard flex flex-col gap-8 sm:gap-12 section-padding-standard py-14 md:py-20">
        <div className="text-center flex flex-col items-center gap-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-heading text-blue-heading tracking-wider">
            <span className="text-primary">Frequently</span> Asked Questions
          </h2>
          <p className="text-base lg:text-lg text-paragraph font-inter font-medium max-w-3xl">
            Explore our frequently asked questions to find quick solutions and
            helpful information about our services, processes, and support.
            Still need help? Don&apos;t hesitate to reach out — we&apos;re here
            for you.
          </p>
        </div>

        <div className="relative z-10">
          {/* Wrap all items inside a single Accordion */}
          <Accordion type="single" collapsible className="w-full">
            {faqs?.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-base md:text-lg xl:text-xl text-heading font-inter font-bold hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-paragraph flex flex-col gap-5">
                  <p className="text-base font-inter font-medium">
                    {faq.answer}
                  </p>

                  {faq.list && faq.list.length > 0 && (
                    <div>
                      {faq.list.map((data, listIndex) => (
                        <div
                          key={listIndex}
                          className="flex items-center gap-3 mb-3"
                        >
                          <div className="w-[5px] h-[5px] rounded-full bg-black/70" />
                          <p className="text-paragraph text-base">{data}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
};

export default FaqSection;
