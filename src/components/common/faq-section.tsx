import React from "react";
import Image from "next/image";

import { FaqSectionContent } from "@/contents/common-components-content";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import FaqSectionImg from "../../../public/images/faq-section-img.png";

function FaqSection() {
  return (
    <section className="layout-standard pb-12 overflow-hidden grid grid-cols-1 md:grid-cols-2">
      <div className="flex-center">
        <Image className="w-[400px]" src={FaqSectionImg} alt="Our Faq" />
      </div>

      <div className="flex flex-col justify-center">
        {FaqSectionContent.map((data, index) => (
          <div key={index}>
            <Accordion className="w-full" type="single" collapsible>
              <AccordionItem className="group" value="item-1">
                <AccordionTrigger className="md:text-lg text-base font-medium text-heading group-hover:no-underline">
                  {data.faqHeader}
                </AccordionTrigger>
                <AccordionContent className="md:text-base text-sm">
                  {data.faqContent}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FaqSection;
