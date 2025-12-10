"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { MdOutlineStar } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";

import { tabsData } from "@/content/homepage/home-page-content";

import { BotMessageSquare, CodeXml, Handshake } from "lucide-react";

import AnimatedCloudBackground from "@/components/common/cloud-background-effect";
import DailogLeadForm from "@/components/forms/dailog-lead-form";

export function HeroSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const isAdvancingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (isAdvancingRef.current) return 100;
          isAdvancingRef.current = true;

          setIsTransitioning(true);
          timeoutRef.current = setTimeout(() => {
            setActiveTab((current) => {
              const nextTab = (current + 1) % tabsData.length;
              console.log(`Moving from tab ${current} to tab ${nextTab}`);
              return nextTab;
            });
            setProgress(0);
            setIsTransitioning(false);
          }, 300);
          return 100;
        }
        return Math.min(prev + 2, 100);
      });
    }, 100);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      isAdvancingRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (progress < 100 && isAdvancingRef.current) {
      isAdvancingRef.current = false;
    }
  }, [progress]);

  const currentTab = tabsData[activeTab];

  const rattingStars = Array(5)
    .fill(0)
    .map((_, i) => <MdOutlineStar key={i} className="w-4 h-4" />);

  console.log("Current activeTab:", activeTab, "Progress:", progress);

  return (
    <section
      className="relative section-padding-standard py-14 md:py-20 overflow-hidden"
      dir="ltr"
    >
      {/* Add the animated cloud background here - this is the ONLY addition */}
      <AnimatedCloudBackground />

      <div className="layout-standard flex flex-col gap-12 relative z-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-sm text-paragraph">
              <div className="flex text-accent">{rattingStars}</div>
              <span>Rated 5 on Clutch</span>
            </div>

            <div className="space-y-4">
              <div
                className={`transition-all duration-500 ${
                  isTransitioning
                    ? "opacity-0 translate-y-4"
                    : "opacity-100 translate-y-0"
                }`}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-heading leading-tight max-w-2xl">
                  {currentTab.heading}
                  <br />
                  <span className="text-primary">{currentTab.subheading}</span>
                </h1>
              </div>

              <div
                className={`transition-all duration-500 delay-75 ${
                  isTransitioning
                    ? "opacity-0 translate-y-4"
                    : "opacity-100 translate-y-0"
                }`}
              >
                <p className="text-xl text-accent font-semibold">
                  {currentTab.subtitle}
                </p>
                <p className="text-paragraph mt-2 font-medium md:text-lg max-w-2xl">
                  {currentTab.description}
                </p>
              </div>
            </div>

            <div
              className={`transition-all duration-500 delay-150 ${
                isTransitioning
                  ? "opacity-0 translate-y-4"
                  : "opacity-100 translate-y-0"
              }`}
            >
              <DailogLeadForm
                trigger={
                  <Button className="bg-primary w-full sm:w-auto font-extrabold !border-primary rounded-md px-5 py-[22px]">
                    Let&apos;s get started! <FaArrowRightLong />
                  </Button>
                }
              />
            </div>
          </div>

          <div className="relative flex justify-center">
            <div
              className={`transition-all duration-500 ${
                isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <div className="relative">
                <Image
                  src={currentTab.image || "/placeholder.svg"}
                  alt={currentTab.title}
                  className="w-full rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-3 gap-4 ">
            {tabsData.map((tab, index) => (
              <div
                key={tab.id}
                className={`p-6 cursor-pointer transition-all duration-300  `}
                onClick={() => {
                  if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = null;
                  }
                  isAdvancingRef.current = false;
                  setActiveTab(index);
                  setProgress(0);
                  setIsTransitioning(false);
                }}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex-center ${
                        index === activeTab
                          ? "bg-primary text-white"
                          : "bg-muted"
                      }`}
                    >
                      {index === 0 && (
                        <span className="text-sm">
                          <CodeXml />
                        </span>
                      )}
                      {index === 1 && (
                        <span className="text-sm">
                          <Handshake />
                        </span>
                      )}
                      {index === 2 && (
                        <span className="text-sm">
                          <BotMessageSquare />
                        </span>
                      )}
                    </div>
                    <h3 className="hidden md:block font-semibold text-paragraph text-base xl:text-lg">
                      {tab.title}
                    </h3>
                  </div>

                  <Progress
                    value={index === activeTab ? progress : 0}
                    className="h-1"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
