"use client";
import React from "react";
import Image from "next/image";

import { motion } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import DailogLeadForm from "@/components/forms/dailog-lead-form";

import { YoutubeGrowthSectionProps } from "@/interfaces/youtube-automation-interfaces";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

/** Shared CTA pair — outline button inverts to primary, solid button lightens. */
function GrowthCtaPair({ phoneNumber }: { phoneNumber: string }) {
  const telHref = `tel:${phoneNumber.replace(/[^\d+]/g, "")}`;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <DailogLeadForm
        trigger={
          <Button
            variant="outline"
            className="group rounded-full border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground uppercase text-sm font-semibold h-[52px] pl-6 pr-2 gap-4 animation-standard hover:scale-105"
          >
            Book a Meeting
            <span className="flex-center w-8 h-8 rounded-full border border-current animation-standard group-hover:translate-x-1">
              <FaArrowRightLong className="w-3 h-3" />
            </span>
          </Button>
        }
      />

      <Button
        asChild
        className="group rounded-full border-2 border-primary bg-primary text-primary-foreground hover:bg-primary-hover hover:border-primary-hover uppercase text-sm font-semibold h-[52px] pl-6 pr-2 gap-4 animation-standard hover:scale-105"
      >
        <a href={telHref}>
          {phoneNumber}
          <span className="flex-center w-8 h-8 rounded-full border border-current animation-standard group-hover:translate-x-1">
            <FaArrowRightLong className="w-3 h-3" />
          </span>
        </a>
      </Button>
    </div>
  );
}

export default function YoutubeGrowthSection({
  introTitle,
  introTitleHighlight,
  introDescription,
  cardTitle,
  cardTitleHighlight,
  cardDescription,
  phoneNumber,
  image,
  imageAlt,
}: YoutubeGrowthSectionProps) {
  return (
    <section className="section-padding-standard py-16 lg:py-20">
      <div className="layout-standard">
        {/* Intro: heading left, paragraph right */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-12 lg:mb-20"
        >
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-heading uppercase leading-[1.1] max-w-md">
              {introTitle}{" "}
              <span className="text-primary">{introTitleHighlight}</span>
            </h2>

            <GrowthCtaPair phoneNumber={phoneNumber} />
          </div>

          <p className="text-base lg:text-lg font-medium text-paragraph leading-relaxed">
            {introDescription}
          </p>
        </motion.div>

        {/* Tinted feature card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-3xl bg-secondary-background border border-border p-8 md:p-12 lg:p-16"
        >
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-heading uppercase leading-[1.1]">
                {cardTitle}{" "}
                <span className="text-primary">{cardTitleHighlight}</span>
              </h3>

              <p className="text-base md:text-lg font-medium text-paragraph leading-relaxed">
                {cardDescription}
              </p>

              <div className="border-t border-border pt-6">
                <GrowthCtaPair phoneNumber={phoneNumber} />
              </div>
            </div>

            <div className="relative w-full">
              <Image
                src={image}
                alt={imageAlt}
                className="w-full h-auto object-contain rounded-2xl"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
