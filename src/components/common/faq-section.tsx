"use client";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { FaqSectionProps } from "@/interfaces/common-interfaces";

export default function FaqSection({
  faqItems,
  defaultOpenIndex = 0,
}: FaqSectionProps) {
  const [openItem, setOpenItem] = useState(
    faqItems[defaultOpenIndex]?.question
  );

  return (
    <section className="bg-[#1a1a1a] flex items-center page-layout-standard">
      <div className="grid lg:grid-cols-2 lg:gap-12 items-center">
        {/* Left Column - Background Image (hidden on small screens) */}
        <div className="hidden lg:block relative min-h-[600px] lg:h-full overflow-hidden w-full bg-faq-img bg-cover bg-no-repeat bg-center">
          <div className="absolute inset-0 bg-black/80" />
        </div>

        {/* Right Column - FAQ Content */}
        <div className="w-[90%] lg:w-full space-y-8 py-14 md:py-16 lg:p-10 xl:p-14 mx-auto">
          <div className="space-y-4">
            <p className="text-primary text-sm font-medium tracking-wide uppercase">
              HAVE A CONFUSION YOU WANT CLEARED UP?
            </p>
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-balance">
              Take A Look Through Our FAQs.
            </h2>
          </div>

          {/* FAQ Accordion */}
          <Accordion
            type="single"
            value={openItem}
            onValueChange={setOpenItem}
            className="space-y-4"
          >
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={item.question}
                className="border-none"
              >
                <AccordionTrigger
                  className={`px-6 py-4 rounded-lg text-left font-medium transition-all duration-300 hover:no-underline shadow-sm
                    ${
                      openItem === item.question
                        ? "text-white"
                        : "bg-black text-white hover:bg-gray-900"
                    }
                  `}
                >
                  <span className="text-base">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-paragraph text-white rounded-b-lg mt-1 animate-accordion-down shadow-sm space-y-3">
                  <p className="text-sm leading-relaxed">{item.answer}</p>

                  {item.list && (
                    <ul className="list-disc pl-6 space-y-1 text-sm text-white/90">
                      {item.list.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
