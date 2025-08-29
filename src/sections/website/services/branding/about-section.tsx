"use client";
import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { IoSparklesOutline } from "react-icons/io5";
import { MessageCircle } from "lucide-react";
import { FaArrowRightLong } from "react-icons/fa6";
import { AboutSectionProps } from "@/interfaces/common-interfaces";
import DailogLeadForm from "@/forms/dailog-lead-form";
import { OpenLiveChat } from "@/utils/open-live-chat";

function AboutSection({
  badge,
  heading,
  paragraphs,
  buttons,
  badges,
  rightSideImage,
}: AboutSectionProps) {
  return (
    <section className="layout-standard flex flex-wrap section-padding-standard items-center">
      <div className="flex flex-wrap mt-auto mb-auto w-full lg:w-1/2 content-start lg:pr-16">
        <div className="w-full mb-10">
          <span className="flex items-center gap-2 mb-4 font-semibold text-primary bg-[#007afc]/10 w-fit px-4 py-2 rounded-full border-primary border-2 text-xs">
            <IoSparklesOutline />
            {badge?.text}
          </span>

          <h1 className="md:text-6xl font-medium text-heading font-heading text-3xl tracking-wider mb-8">
            {heading}
          </h1>

          <div className="space-y-5">
            {paragraphs.map((paragraph, index) => (
              <div key={index} className="text-base">
                {paragraph}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            <DailogLeadForm
              trigger={
                <Button className="cta-button hover:bg-primary-hover !border-none">
                  {buttons.primary.text} <FaArrowRightLong />
                </Button>
              }
            ></DailogLeadForm>

            <Button
              onClick={OpenLiveChat}
              className="cta-button text-heading !border-primary bg-[#D7D7D7] hover:bg-primary-hover hover:text-white"
            >
              <MessageCircle /> {buttons.secondary.text}
            </Button>
          </div>

          <div className="w-full flex flex-wrap items-center gap-4 mt-10">
            {badges.map((badge, index) => (
              <Image
                key={index}
                src={badge.src}
                alt={badge.alt}
                width={badge.width}
                className="object-cover"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2 sm:w-1/3 w-full rounded-3xl overflow-hidden mt-6 sm:mt-0">
        <Image
          src={rightSideImage.src}
          alt={rightSideImage.alt}
          width={600}
          height={500}
          className={`w-full h-[380px] object-contain rounded-3xl ${
            rightSideImage.className || ""
          }`}
        />
      </div>
    </section>
  );
}

export default AboutSection;
