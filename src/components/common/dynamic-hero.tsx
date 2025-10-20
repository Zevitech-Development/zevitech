"use client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { AnimatedBadge } from "./animatedbadge";

import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineStar } from "react-icons/md";

import { DynamicHeroProps } from "@/interfaces/common-interfaces";

import HeroMarquee from "./hero-marquee";
import DailogLeadForm from "../forms/dailog-lead-form";

import TrustpilotIcon from "../../../public/icons/trustpilot-icon-01.svg";

import ClutchIOIcon from "../../../public/icons/clutch-io-icon.png";
import GoogleReviewsIcon from "../../../public/icons/google-reviews-icon.png";

import AnimatedCloudBackground from "./cloud-background-effect";

const rattingStars = Array(5)
  .fill(0)
  .map((_, i) => <MdOutlineStar key={i} className="w-4 h-4" />);

export function DynamicHero({
  badgeIcon,
  badgeText,
  heading,
  highlightText,
  subheading,
  description,
  heroImage,
}: DynamicHeroProps) {
  return (
    <section className="relative section-padding-standard py-14 md:py-20 overflow-hidden">
      {/* Add the animated cloud background here - this is the ONLY addition */}
      <AnimatedCloudBackground />

      <div className="layout-standard flex flex-col gap-12 relative z-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side content */}
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-sm text-paragraph">
              <div className="flex text-accent">{rattingStars}</div>
              <span>Rated 5 on Clutch</span>
            </div>

            <AnimatedBadge text={badgeText} icon={badgeIcon} />

            <div className="space-y-4">
              <div className="transition-all duration-500">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-heading leading-tight max-w-2xl">
                  {heading}
                  {highlightText && (
                    <>
                      <br />
                      <span className="text-primary">{highlightText}</span>
                    </>
                  )}
                </h1>
              </div>

              <div className="transition-all duration-500 delay-75">
                <p className="text-xl text-accent font-semibold">
                  {subheading}
                </p>
                <p className="text-paragraph mt-2 font-medium md:text-lg max-w-2xl">
                  {description}
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex items-center mt-4">
              <DailogLeadForm
                trigger={
                  <Button className="bg-primary w-full sm:w-auto font-extrabold !border-primary rounded-md px-5 py-[22px]">
                    Let&apos;s get started! <FaArrowRightLong />
                  </Button>
                }
              />
            </div>

            {/* Static Review Logos */}
            <div className="flex items-center gap-6 sm:gap-8 mt-10">
              <Link
                href="https://clutch.co/profile/zevitech"
                target="_blank"
                passHref
              >
                <Image
                  src={ClutchIOIcon}
                  alt="Clutch IO"
                  className="flex-shrink-0 hover:scale-105 animation-standard"
                  width={110}
                />
              </Link>

              <Link
                href="https://www.trustpilot.com/review/zevitech.com"
                target="_blank"
                passHref
              >
                <Image
                  src={TrustpilotIcon}
                  alt="Trustpilot"
                  width={140}
                  className="flex-shrink-0 hover:scale-105 animation-standard invert"
                />
              </Link>

              <Link
                href="https://www.google.com/search?q=zevitech#lrd=0xa6b3ae377e4210c3:0x375b0f1a6e9d091e,1,,,"
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

          {/* Dynamic Hero Image */}
          <div className="relative flex justify-center">
            <div className="transition-all duration-500">
              <Image
                src={heroImage}
                alt="Hero Image"
                className="w-full rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* Static Marquee */}
        <HeroMarquee />
      </div>
    </section>
  );
}
