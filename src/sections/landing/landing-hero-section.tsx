"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import DailogLeadForm from "@/forms/dailog-lead-form";

import { Button } from "@/components/ui/button";

import LandingHeroImg from "../../../public/images/landing-hero-img.png";
import { FaCheck, FaArrowRightLong } from "react-icons/fa6";
import ClutchIOIcon from "../../../public/icons/clutch-io-icon.png";
import TrustpilotIcon from "../../../public/icons/truspilot-icon.svg";
import GoogleReviewsIcon from "../../../public/icons/google-reviews-icon.png";
import { OpenLiveChat } from "@/utils/open-live-chat";

function LandingHeroSection() {
  return (
    <section className="md:pt-[12rem] pt-[10rem] lg:pb-[8rem] pb-16 bg-pattern">
      <div className="layout-standard grid lg:grid-cols-2  gap-16 relative items-center">
        <div className="flex flex-col gap-6 relative z-10 lg:order-1 order-2">
          <h1 className="font-heading text-white font-bold md:text-6xl text-4xl tracking-widest">
            Build A <span className="text-secondary">Shopify</span> Store That
            Drives Results
          </h1>

          <h2 className="text-white/90 font-medium md:text-xl text-base leading-relaxed">
            Shopify is a top choice for online businesses. Whether you&apos;re
            starting fresh or moving an established business to Shopify,
            we&apos;ll help your brand reach its full potential. Our Shopify
            store development ensures maximum lead generation and exponential
            sales growth.
          </h2>

          <div className="flex flex-col gap-4 md:text-lg text-sm">
            <div className="flex items-center gap-2">
              <FaCheck className="text-primary" />
              <p className="text-white/80">
                Mobile-responsive Shopify designs for all devices
              </p>
            </div>

            <div className="flex items-center gap-2">
              <FaCheck className="text-primary" />
              <p className="text-white/80">
                Ongoing maintenance and updates for Shopify stores
              </p>
            </div>

            <div className="flex items-center gap-2">
              <FaCheck className="text-primary" />
              <p className="text-white/80">
                Expert in-house team of designers, developers, and marketers
              </p>
            </div>
          </div>

          <div className="flex items-center md:gap-4 gap-2 mt-4">
            <DailogLeadForm
              trigger={
                <Button className="cta-button h-[60px] md:px-6 group lg:hover:scale-105 rounded-full lg:hover:bg-primary-hover md:text-xl text-base lg:!animation-standard font-bold">
                  Let&apos;s Get Started
                  <FaArrowRightLong className="group-hover:translate-x-[2px] animation-standard" />
                </Button>
              }
            />

            <Button
              onClick={OpenLiveChat}
              className="cta-button h-[60px] md:px-6 bg-transparent border-4 border-primary group lg:hover:scale-105 rounded-full text-primary-foreground md:text-xl text-base lg:!animation-standard font-bold"
            >
              Chat Now
            </Button>
          </div>

          <div className="flex items-center gap-8 mt-6">
            <Link
              href={"https://clutch.co/profile/zevitech"}
              target="_blank"
              passHref
            >
              <Image
                src={ClutchIOIcon}
                alt="Clutch IO"
                className="brightness-50 invert flex-shrink-0 hover:scale-105 animation-standard"
                width={120}
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
                width={140}
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
                width={120}
                className="flex-shrink-0 hover:scale-105 animation-standard"
              />
            </Link>
          </div>
        </div>

        <div className="md:flex hidden h-full items-center flex-shrink-0 lg:order-2 order-1 w-full relative z-10">
          <Image
            src={LandingHeroImg}
            alt="Hero Section"
            className="drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]"
          />
        </div>
      </div>
    </section>
  );
}

export default LandingHeroSection;
