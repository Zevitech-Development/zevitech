"use client";
import React from "react";
import Link from "next/link";

import { Button } from "../ui/button";

import { OpenLiveChat } from "@/utils/open-live-chat";

import DailogLeadForm from "@/forms/dailog-lead-form";

import { CTA02Props } from "@/interfaces/common-interfaces";

import { Phone } from "lucide-react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoChatbox } from "react-icons/io5";

function CTA02({ backgroundClass, heading, text }: CTA02Props) {
  return (
    <section
      className={`relative section-padding-standard py-16 lg:py-20 rounded-lg text-white bg-cover ${backgroundClass}`}
    >
      {/* Background Overlay */}
      {/* <div className="absolute inset-0 bg-black/40 z-10" /> */}

      <div className="relative z-20 layout-standard">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold mb-4 tracking-widest">
              {heading}
            </h2>
            <p className="text-gray-200 text-lg max-w-xl lg:max-w-md mx-auto lg:mx-0">
              {text}
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end justify-start gap-6">
            <div className="w-full flex-center gap-4">
              {/* Get Started Button (Dialog) */}
              <DailogLeadForm
                trigger={
                  <Button className="cta-button bg-primary !border-primary hover:bg-primary text-primary-foreground md:text-lg md:px-6 md:py-6">
                    Let&apos;s Get Started
                    <FaArrowRightLong className="group-hover:translate-x-[2px] animation-standard" />
                  </Button>
                }
              ></DailogLeadForm>

              {/* Live Chat Button */}
              <Button
                variant={"outline"}
                onClick={OpenLiveChat}
                className="cta-button-02 hover:bg-primary-hover text-primary"
              >
                <IoChatbox /> Chat Now
              </Button>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-2 mx-auto">
              <div className="px-3">
                <p className="flex items-center gap-2 text-sm sm:text-base">
                  <Phone /> CONTACT NUMBER :{" "}
                  <Link
                    href={"tel:(302) 217-6211"}
                    className="font-bold text-primary"
                  >
                    (302) 217-6211
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA02;
