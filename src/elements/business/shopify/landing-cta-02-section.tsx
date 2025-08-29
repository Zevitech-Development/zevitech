"use client";

import React from "react";
import Image from "next/image";

import DailogLeadForm from "@/forms/dailog-lead-form";

import { Button } from "@/components/ui/button";

import { OpenLiveChat } from "@/utils/open-live-chat";

import LandingCTAImg from "../../../../public/images/cta-img.jpg";
import { FaArrowRightLong } from "react-icons/fa6";

function LandingCTA02Section() {
  return (
    <div className="layout-standard mb-[6rem]">
      <div className="relative isolate overflow-hidden bg-pattern p-16 max-md:py-6 shadow-2xl rounded-3xl px-4 md:px-8 lg:flex lg:gap-x-20 lg:px-24 lg:pt-4">
        <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
          <h2 className="text-4xl font-semibold tracking-wider text-white font-heading md:text-6xl">
            Launch Your <span className="text-secondary">Shopify</span> Store.
            Scale with Zevitech.
          </h2>
          <p className="mt-6 font-medium md:text-xl text-white/80">
            Take your online store to the next level with Zevitech. From custom
            Shopify design to high-converting development, we build stores that
            grow with your business. Start now and watch your revenue soar.
          </p>
          <div className="flex items-center max-lg:justify-center max-md:flex-col md:gap-4 gap-2 mt-8">
            <DailogLeadForm
              trigger={
                <Button className="cta-button h-[60px] md:px-6 group lg:hover:scale-105 rounded-full lg:hover:bg-primary-hover md:text-xl text-base lg:!animation-standard font-bold max-md:w-full">
                  Let&apos;s Get Started
                  <FaArrowRightLong className="group-hover:translate-x-[2px] animation-standard" />
                </Button>
              }
            />

            <Button
              onClick={OpenLiveChat}
              className="cta-button h-[60px] md:px-6 bg-transparent border-4 border-primary group lg:hover:scale-105 rounded-full text-primary-foreground md:text-xl text-base lg:!animation-standard font-bold max-md:w-full"
            >
              Chat Now
            </Button>
          </div>
        </div>

        <div className="relative md:mt-16 mt-8 h-80 lg:mt-8">
          <Image
            alt="ROI"
            src={LandingCTAImg.src}
            width={1024}
            height={1080}
            className="absolute top-0 left-0 max-w-none rounded-xl bg-white/5 ring-2 ring-border max-md:w-[500px]"
          />
        </div>
      </div>
    </div>
  );
}

export default LandingCTA02Section;
