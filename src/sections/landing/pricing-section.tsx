"use client";

import React from "react";
import Image from "next/image";

import { PricingSectionContent } from "@/contents/landing-page-content";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { OpenLiveChat } from "@/utils/open-live-chat";

import AddCreaditSealIcon from "../../../public/icons/add-creadit-seal-icon.webp";
import BestSellerSealIcon from "../../../public/icons/best-seller-seal-icon.webp";
import { FaArrowRightLong } from "react-icons/fa6";
import { GiCheckMark } from "react-icons/gi";

function ProcessSection() {
  return (
    <section className="layout-standard section-padding-standard section-margin-standard max-lg:mb-0 !mb-4">
      <div className="flex flex-col gap-4 items-center text-center lg:mb-16 mb-12">
        <h2 className="md:text-lg text-base font-semibold uppercase text-center text-foreground">
          Affordable Packages
        </h2>
        <h1 className="text-heading font-heading md:text-6xl text-4xl font-bold text-center md:max-w-4xl tracking-widest">
          Get Your <span className="text-secondary">Shopify</span> Stores
          Designed Now!
        </h1>
        <p className="md:text-2xl text-base md:max-w-3xl text-center font-medium">
          We offer budget-friendly Shopify store design services, ensuring a
          professional and engaging online platform for your business.
        </p>
      </div>

      <div className="w-full md:grid lg:grid-cols-3 md:grid-cols-2 md:gap-x-8 md:gap-y-12 max-md:space-y-8 gap-4">
        {PricingSectionContent.map((item, index) => (
          <Card key={index} className="border-border relative">
            <CardHeader className="bg-secondary-background border-b border-border">
              <CardTitle className="md:text-2xl text-xl font-bold text-foreground">
                {item.name}
              </CardTitle>

              <h1 className="md:text-6xl text-4xl text-secondary font-bold pt-3">
                {item.price}
              </h1>

              {item.badge === "BEST SELLER" ? (
                <Image
                  src={BestSellerSealIcon}
                  alt="Best Seller"
                  width={110}
                  height={110}
                  className="absolute top-0 right-0 -translate-x-[10%] -translate-y-[6px] max-lg:w-[80px]"
                />
              ) : item.badge === "FREE $500 ADS CREDIT" ? (
                <Image
                  src={AddCreaditSealIcon}
                  alt="Add Credit"
                  width={110}
                  height={110}
                  className="absolute top-0 right-0 -translate-x-[10%] -translate-y-[6px] max-lg:w-[80px]"
                />
              ) : null}
            </CardHeader>

            <CardContent className="py-4 flex flex-col gap-4 border-b border-border">
              <p className="md:text-base text-sm font-medium h-24">
                {item.description}
              </p>

              <div className="md:!h-72 !h-24 w-full overflow-y-auto pr-2 custom-scrollbar">
                <div className="h-full w-full flex flex-col gap-3">
                  {item.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <GiCheckMark className="flex-shrink-0 text-secondary md:text-xl text-sm mt-1" />
                      <p className="md:text-base text-sm font-semibold text-heading">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>

            <CardFooter className="gap-2 pt-6">
              <Button className="h-[50px] bg-primary hover:bg-primary-hover md:px-8 px-4 py-4 rounded-full font-bold md:text-base text-sm !animation-standard flex items-center gap-2 group md:hover:scale-105 cta-button">
                Let&apos;s Get Started
                <FaArrowRightLong className="md:w-5 md:h-5 w-3 h-3 md:group-hover:translate-x-[3px] md:animation-standard" />
              </Button>

              <Button
                onClick={OpenLiveChat}
                className="h-[50px] text-heading bg-transparent px-4 py-4 rounded-full font-bold md:text-base md:!animation-standard flex items-center gap-2 border-4 border-primary cta-button text-sm md:hover:scale-105"
              >
                Chat Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default ProcessSection;
