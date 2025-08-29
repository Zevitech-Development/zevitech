import React from "react";
import Link from "next/link";
import Image from "next/image";

import { ServicesHeroSection01Props } from "@/interfaces/common-interfaces";

import { cn } from "@/lib/utils";

import { Spotlight } from "../partials/spotlight";

import { Button } from "../ui/button";

import DailogLeadForm from "@/forms/dailog-lead-form";

import ClutchIOIcon from "../../../public/icons/clutch-io-icon.png";
import TrustpilotIcon from "../../../public/icons/trustpilot-icon-01.svg";
import GoogleReviewsIcon from "../../../public/icons/google-reviews-icon.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";

const ServicesHeroSections01 = ({
  title,
  desc,
}: ServicesHeroSection01Props) => {
  return (
    <>
      <section className="relative w-full md:h-[800px] section-padding-standard flex overflow-hidden bg-black/[0.96] antialiased md:items-center md:justify-center py-16 md:py-20">
        <div
          className={cn(
            "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
            "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
          )}
        />

        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="white"
        />

        <div className="layout-standard relative z-10 pt-14">
          <div className="flex flex-col gap-6">
            <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-transparent max-w-[80%] font-heading tracking-wider leading-tight mx-auto py-3">
              {title}
            </h1>

            <p className="mx-auto mt-2 max-w-5xl text-center text-lg md:text-xl font-normal text-neutral-300">
              {desc}
            </p>

            <div className="w-full flex-center gap-4 mt-8">
              <Link href="tel:(302) 217-6211">
                <Button className="cta-button bg-[#D7D7D7] hover:bg-primary text-primary hover:text-white !border-primary ">
                  <FaPhoneAlt /> Call Now
                </Button>
              </Link>

              {/* <Button className="cta-button bg-primary !border-primary hover:bg-primary text-primary-foreground">
                Get Started <FaLongArrowAltRight />
              </Button> */}

              <DailogLeadForm
                trigger={
                  <Button className="cta-button bg-primary !border-primary hover:bg-primary text-primary-foreground">
                    Let&apos;s Get Started
                    <FaArrowRightLong className="group-hover:translate-x-[2px] animation-standard" />
                  </Button>
                }
              ></DailogLeadForm>
            </div>
          </div>

          <div className="flex-center gap-8 mt-10">
            <Link
              href={"https://clutch.co/profile/zevitech"}
              target="_blank"
              passHref
            >
              <Image
                src={ClutchIOIcon}
                alt="Clutch IO"
                className="brightness-50 invert flex-shrink-0 hover:scale-105 animation-standard"
                width={140}
              />
            </Link>

            <Link
              href={"https://www.trustpilot.com/review/zevitech.com"}
              target="_blank"
              passHref
            >
              <Image
                src={TrustpilotIcon}
                alt="Trustpilot"
                width={180}
                className="flex-shrink-0 hover:scale-105 animation-standard"
              />
            </Link>

            <Link
              href={
                "https://www.google.com/search?q=zevitech&oq=zevitech&gs_lcrp=EgZjaHJvbWUyDggAEEUYJxg5GIAEGIoFMgYIARBFGDwyBggCECMYJzIHCAMQABjvBTIKCAQQABiABBiiBDIKCAUQABiABBiiBDIKCAYQABiABBiiBDIGCAcQRRg80gEJNjkzN2owajE1qAIIsAIB8QXmrH0VQ5vS1A&sourceid=chrome&ie=UTF-8#lrd=0xa6b3ae377e4210c3:0x375b0f1a6e9d091e,1,,,,"
              }
              target="_blank"
              passHref
            >
              <Image
                src={GoogleReviewsIcon}
                alt="Google Reviews"
                width={140}
                className="flex-shrink-0 hover:scale-105 animation-standard"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesHeroSections01;
