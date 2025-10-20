"use client";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoChatbox } from "react-icons/io5";

import DailogLeadForm from "@/components/forms/dailog-lead-form";
import { Button } from "@/components/ui/button";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { OpenLiveChat } from "@/utils/open-live-chat";
import { ServicesProps } from "@/interfaces/common-interfaces";

export default function DynamicServicesSection({
  title,
  highlightedText,
  description,
  servicesData,
}: ServicesProps) {
  return (
    <section className="layout-standard section-padding-standard grid lg:grid-cols-5 gap-4">
      <div className="lg:col-span-2 py-7">
        <div className="flex flex-col gap-5 text-center lg:text-start">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading leading-tight">
            {title} <span className="text-primary">{highlightedText}</span>
          </h1>
          <p className="text-base md:text-lg text-paragraph font-medium max-w-3xl">
            {description}
          </p>

          <div className="flex justify-center lg:justify-normal gap-4">
            <DailogLeadForm
              trigger={
                <Button className="cta-button hover:bg-primary-hover !border-none py-6 px-6">
                  Get Started <FaArrowRightLong />
                </Button>
              }
            ></DailogLeadForm>

            <Button
              variant={"outline"}
              onClick={OpenLiveChat}
              className="cta-button-02 hover:bg-primary-hover bg-[#D7D7D7] text-primary"
            >
              <IoChatbox /> Chat Now
            </Button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-3">
        <HoverEffect items={servicesData} />
      </div>
    </section>
  );
}
