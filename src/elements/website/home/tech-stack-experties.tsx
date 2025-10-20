"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { techColumns } from "@/content/homepage/home-page-content";

import { MarqueeColumnProps } from "@/interfaces/home-interfaces";

function MarqueeColumn({ items, direction, speed = 30 }: MarqueeColumnProps) {
  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items];

  return (
    <div className="relative h-[450px] overflow-hidden">
      {/* The scrolling content */}
      <div
        className={`flex flex-col gap-4 ${
          direction === "up" ? "animate-marquee-up" : "animate-marquee-down"
        }`}
        style={{
          animationDuration: `${speed}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {duplicatedItems.map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="flex-shrink-0 rounded-2xl p-6 hover:scale-105 transition-all duration-300 w-full flex flex-col items-center justify-center group cursor-pointer"
          >
            <Image
              src={tech.icon}
              alt={tech.name}
              className="w-16 mb-2 group-hover:scale-110 transition-transform duration-300"
            />
            <p className="text-[10px] sm:text-sm font-medium text-paragraph text-center">
              {tech.name}
            </p>
          </div>
        ))}
      </div>

      {/* Top fade overlay */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-[#EAF6FA] to-transparent" />

      {/* Bottom fade overlay */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#EAF6FA] to-transparent" />
    </div>
  );
}

export default function TechStackExpertise() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const visibleColumns = isMobile ? techColumns.slice(0, 4) : techColumns;

  return (
    <section className="section-padding-standard py-14 md:py-20 bg-[#E6F4F9] overflow-hidden">
      <div className="layout-standard flex flex-col gap-12 md:gap-14">
        {/* Heading */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-heading max-w-4xl leading-tight">
            Tech Stack Expertise to Build{" "}
            <span className="text-primary">Future-Ready</span> Solutions
          </h2>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-7 gap-4">
          {visibleColumns.map((column, index) => (
            <MarqueeColumn
              key={index}
              items={column}
              direction={index % 2 === 0 ? "up" : "down"}
              speed={25 + index * 2} // Varying speeds for visual interest
            />
          ))}
        </div>
      </div>
    </section>
  );
}
