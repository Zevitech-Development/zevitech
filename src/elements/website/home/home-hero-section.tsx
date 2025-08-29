"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { CTAButton02 } from "@/components/partials/cta-buttons";

import HomeHeroImg from "../../../../public/images/home-hero-img.png";
import { FaLongArrowAltRight, FaPhoneAlt } from "react-icons/fa";
import ClutchIOIcon from "../../../../public/icons/clutch-io-icon.png";
import TrustpilotIcon from "../../../../public/icons/trustpilot-icon-02.png";
import GoogleReviewsIcon from "../../../../public/icons/google-reviews-icon.png";

function HomeHeroSection() {

  return (
    <section className="relative h-[950px] md:h-[900px]">
      <div className="absolute inset-0 -z-10" data-name="Background">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 1920 1172"
        >
          <path
            d="M1920 0H0V1038.86H829.945L1040.44 1171.63H1920V0Z"
            fill="var(--fill-0, #f9f9f9)"
            id="Background"
          />
        </svg>
      </div>

      <div className="relative z-10 w-full h-full">
        <div className="w-full overflow-hidden absolute inset-0 top-1/2 left-0">
          <svg
            width="1920"
            height="203"
            viewBox="0 0 1920 203"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-13.7724 184.395H818.08L1038.44 19.1261H1925.38"
              stroke="black"
              strokeOpacity="0.08"
              strokeWidth="37"
            />
          </svg>
        </div>

        <div className="layout-standard hero-section-layout-standard h-full relative">
          <div className="flex flex-col justify-between py-16 h-[88%]">
            <div className="flex flex-col gap-4">
              <h1 className="text-6xl font-light max-w-[700px] font-heading tracking-wider mb-2 text-heading">
                Custom Branding & Design Solutions That Make You Stand Out
              </h1>
              <p className="text-xl font-normal max-w-2xl">
                At Zevitech, we craft impactful brand identities, logos, and
                digital assets tailored to your business goals. From custom logo
                design to full brand packages, our expert designers help you
                leave a lasting impression across every platform.
              </p>

              <div className="w-full flex items-center gap-4 mt-4">
                <CTAButton02
                  class="bg-primary !border-primary hover:bg-primary-hover text-primary-foreground"
                  ctaButton02Text="Get Started"
                  ctaButton02IconRight={<FaLongArrowAltRight />}
                />

                <CTAButton02
                  class="bg-transparent !border-primary hover:bg-primary hover:text-primary-foreground text-heading"
                  ctaButton02Text="Call Now"
                  ctaButton02IconLeft={<FaPhoneAlt />}
                />
              </div>
            </div>

            <div className="flex items-center gap-8">
              <Link
                href={"https://clutch.co/profile/zevitech"}
                target="_blank"
                passHref
              >
                <Image
                  src={ClutchIOIcon}
                  alt="Clutch IO"
                  className="flex-shrink-0 hover:scale-105 animation-standard"
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
                  width={140}
                  className="flex-shrink-0 hover:scale-105 animation-standard "
                />
              </Link>
            </div>
          </div>

          <Image
            src={HomeHeroImg}
            alt=""
            className="absolute bottom-0 right-0 h-[850px] w-auto max-h-full hidden lg:block"
          />
        </div>
      </div>
    </section>
  );
}

export default HomeHeroSection;
