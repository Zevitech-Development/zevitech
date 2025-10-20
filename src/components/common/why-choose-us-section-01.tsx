"use client";
import Image from "next/image";
import React from "react";

import DottedDoodle from "../partials/dotted-doodle";

import { WhyChooseUsSection01Props } from "@/interfaces/common-interfaces";

import { IoChatbox, IoSparklesOutline } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";

import { Button } from "../ui/button";

import { OpenLiveChat } from "@/utils/open-live-chat";

import BrandingDesignBadgeIcon01 from "../../../public/icons/branding-design-badge-icon-01.webp";
import BrandingDesignBadgeIcon02 from "../../../public/icons/branding-design-badge-icon-02.webp";
import BrandingDesignBadgeIcon03 from "../../../public/icons/branding-design-badge-icon-03.webp";
import BrandingDesignBadgeIcon04 from "../../../public/icons/branding-design-badge-icon-04.jpg";
import BrandingDesignBadgeIcon05 from "../../../public/icons/branding-design-badge-icon-05.jpg";
import BrandingDesignBadgeIcon06 from "../../../public/icons/branding-design-badge-icon-06.jpg";

import DailogLeadForm from "../forms/dailog-lead-form";

const WhyChooseUsSection01 = ({
  img01,
  img02,
  img03,
  title,
  badgeCotent,
  desc01,
  desc02,
  sectionOrder,
}: WhyChooseUsSection01Props) => {
  return (
    <>
      <section className="layout-standard section-padding-standard flex flex-wrap items-center justify-between pb-14">
        {/* LEFT SIDE */}
        <div className={`w-full px-4 lg:w-6/12 ${sectionOrder}`}>
          <div className="flex items-center -mx-3 sm:-mx-4">
            <div className="w-full px-1 sm:px-4 xl:w-1/2">
              <div className="py-2">
                <Image
                  src={img01}
                  alt="why-choose-us-01"
                  className="w-full rounded-2xl h-[320px] object-cover"
                />
              </div>
              <div className="hidden md:block py-2">
                <Image
                  src={img02}
                  alt="why-choose-us-02"
                  className="w-full rounded-2xl h-[320px] object-cover"
                />
              </div>
            </div>
            <div className="hidden md:block w-full px-1 md:w-1/2">
              <div className="relative z-10 my-4">
                <Image
                  src={img03}
                  alt="why-choose-us-03"
                  className="w-full rounded-2xl h-[550px] object-cover"
                />
                <span className="absolute -right-5 -bottom-7 z-[-1]">
                  <DottedDoodle />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
          <div className="mt-10 lg:mt-0">
            <span className="flex items-center gap-2 mb-4 font-semibold text-primary bg-[#007afc]/10 w-fit px-4 py-2 rounded-full border-primary border-2 text-xs">
              <IoSparklesOutline /> {badgeCotent}
            </span>

            <h2 className="mb-8 md:text-6xl font-bold text-heading font-heading text-3xl tracking-tight">
              {title}
            </h2>

            <p className="mb-5 text-base">{desc01}</p>
            <p className="mb-8 text-base">{desc02}</p>

            <div className="flex items-center gap-4">
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

            <div className="flex flex-wrap items-center gap-6 mt-10">
              <Image
                src={BrandingDesignBadgeIcon01}
                alt="Branding & Design Badge"
                width={70}
              />

              <Image
                src={BrandingDesignBadgeIcon02}
                alt="Branding & Design Badge"
                width={70}
              />

              <Image
                src={BrandingDesignBadgeIcon03}
                alt="Branding & Design Badge"
                width={75}
              />

              <Image
                src={BrandingDesignBadgeIcon04}
                alt="Branding & Design Badge"
                width={80}
              />

              <Image
                src={BrandingDesignBadgeIcon05}
                alt="Branding & Design Badge"
                width={90}
              />

              <Image
                src={BrandingDesignBadgeIcon06}
                alt="Branding & Design Badge"
                width={60}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUsSection01;
