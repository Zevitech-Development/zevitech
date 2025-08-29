import React from "react";
import Image from "next/image";


import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FaCircleCheck } from "react-icons/fa6";
import { InformationSectionContent } from "@/content/landing/shopify-landing-page-content";

function InformationSection() {
  return (
    <section className="bg-secondary-background section-padding-standard">
      <div className="layout-standard section-padding-standard">
        <div className="flex flex-col gap-4 items-center text-center lg:mb-16 mb-12">
          <h2 className="md:text-lg text-base font-semibold uppercase text-center text-foreground">
            How to boost conversions
          </h2>
          <h1 className="text-heading font-heading md:text-6xl text-4xl font-bold text-center md:max-w-5xl tracking-widest">
            Boost <span className="text-secondary">Conversions</span> With
            Easy-To-Use Features!
          </h1>
          <p className="md:text-2xl text-base md:max-w-3xl text-center font-medium">
            Discover our conversion-focused features designed to make your
            website easy to use and drive more sales effortlessly.
          </p>
        </div>

        <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 gap-4 gap-y-8 lg:mb-[21rem] md:mb-[16rem] mb-[13rem]">
          {InformationSectionContent.map((info) => (
            <Card
              key={info.infoNo}
              className="border-border p-0 overflow-hidden"
            >
              <CardHeader className="p-0 md:h-[300px] h-[250px] border-b border-border">
                <Image
                  className="w-full h-full object-cover object-top"
                  src={info.img}
                  alt={info.heading}
                />
              </CardHeader>
              <CardContent className="flex flex-col gap-2 pt-8 mb-4">
                <h1 className="lg:text-2xl text-lg font-semibold text-heading">
                  {info.heading}
                </h1>
                <p className="lg:text-base text-sm mb-4">{info.description}</p>

                {info.features.map((feature, index) => (
                  <span
                    key={index}
                    className="flex gap-2 items-center lg:text-base text-sm"
                  >
                    <FaCircleCheck className="flex-shrink-0 text-primary" />
                    <p>{feature}</p>
                  </span>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InformationSection;
