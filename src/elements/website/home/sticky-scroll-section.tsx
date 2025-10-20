"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { FaArrowRightLong } from "react-icons/fa6";

import { Button } from "@/components/ui/button";

import DailogLeadForm from "@/components/forms/dailog-lead-form";

import { contentData, cardContent } from "@/content/homepage/home-page-content";

export default function StickyScrollSection() {
  const [isXLScreen, setIsXLScreen] = useState(false);

  // Check screen size for XL breakpoint
  useEffect(() => {
    const checkScreenSize = () => {
      setIsXLScreen(window.innerWidth >= 1280); // xl breakpoint
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Render interleaved content for smaller screens
  const renderInterleavedContent = () => {
    return (
      <div className="space-y-12">
        {contentData.map((section, index) => (
          <div key={index} className="space-y-8">
            {/* Text Section */}
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-heading leading-tight">
                {section.title}
              </h2>
              <p className="text-lg text-paragraph font-medium leading-relaxed">
                {section.description}
              </p>
            </div>

            {/* Corresponding Card (if exists) */}
            {cardContent[index] && (
              <div className="min-h-[60vh] lg:min-h-[70vh] flex items-center w-full bg-[#25282C] rounded-2xl lg:rounded-3xl text-white">
                <div className="flex items-center justify-center h-full w-full p-6 lg:p-8">
                  <div className="text-center flex flex-col justify-between gap-6">
                    <Image
                      src={cardContent[index].img}
                      alt={cardContent[index].description}
                      className="w-full rounded-lg"
                    />
                    <p className="text-lg max-w-3xl font-semibold">
                      {cardContent[index].description}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* CTA Button */}
        <div className="pt-6 flex-center">
          <DailogLeadForm
            trigger={
              <Button className="cta-button bg-primary text-base font-semibold !border-primary hover:bg-primary text-primary-foreground py-6 px-6 mt-6">
                Let&apos;s Get Started
                <FaArrowRightLong />
              </Button>
            }
          />
        </div>
      </div>
    );
  };

  // Render sticky scroll layout for XL screens
  const renderStickyLayout = () => {
    return (
      <div className="grid xl:grid-cols-2 xl:gap-16">
        {/* Left Content - Simple Sticky */}
        <div className="xl:sticky xl:top-20 xl:self-start">
          <div className="py-10 xl:py-24 space-y-8">
            {contentData.map((section, index) => (
              <div key={index} className="flex flex-col gap-4">
                <h2 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold text-heading leading-tight">
                  {section.title}
                </h2>
                <p className="text-lg text-paragraph font-medium leading-relaxed">
                  {section.description}
                </p>
              </div>
            ))}
            <DailogLeadForm
              trigger={
                <Button className="cta-button bg-primary text-base font-semibold !border-primary hover:bg-primary text-primary-foreground py-6 px-6 mt-6">
                  Let&apos;s Get Started
                  <FaArrowRightLong />
                </Button>
              }
            />
          </div>
        </div>

        {/* Right Content - Scrollable Cards */}
        <div className="py-10 xl:py-24 space-y-8 xl:space-y-12">
          {cardContent.map((item, index) => (
            <div
              key={index}
              className="min-h-[60vh] xl:min-h-[85vh] flex items-center w-full bg-[#25282C] rounded-2xl xl:rounded-3xl text-white"
            >
              <div className="flex items-center justify-center h-full w-full p-6 xl:p-8">
                <div className="text-center flex flex-col justify-between gap-6">
                  <Image
                    src={item.img}
                    alt={item.description}
                    className="w-full rounded-lg"
                  />
                  <p className="text-lg max-w-3xl font-semibold">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="relative section-padding-standard bg-white">
      <div className="layout-standard">
        <div className="flex flex-col items-center gap-3 lg:gap-5 text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-heading max-w-4xl leading-tight">
            We orchestrate better digital{" "}
            <span className="text-primary">solutions and ROI</span>
          </h2>
          <p className="text-base lg:text-lg font-medium text-paragraph max-w-4xl">
            We provide tailored solutions that maximize ROI, using innovative
            strategies and technology to drive measurable results and long-term
            business growth.
          </p>
        </div>

        {/* Conditional rendering based on screen size */}
        {isXLScreen ? renderStickyLayout() : renderInterleavedContent()}
      </div>
    </section>
  );
}
