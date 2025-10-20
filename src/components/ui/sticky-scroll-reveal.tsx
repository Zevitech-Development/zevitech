"use client";
import React, { useRef } from "react";
import Image, { StaticImageData } from "next/image";

import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    image?: string | StaticImageData;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end end"],
  });

  const cardLength = content.length;

  // Fix breakpoint calculation so last card is included
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map(
      (_, index) => index / (cardLength - 1)
    );
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = ["#0f172a", "#000000", "#26282c", "#1c1c22"];
  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="relative h-[620px] overflow-y-auto p-10 py-12"
      ref={ref}
    >
      <div className="flex flex-col items-center gap-4 text-center mb-4">
        <h1 className="text-4xl md:text-5xl text-gray-300 font-bold font-heading max-w-3xl">
          Boost Your Sales with Our Amazon Marketing Expertise
        </h1>
        <p className="text-slate-300 font-medium max-w-3xl">
          Unlock your brand&apos;s potential on Amazon with Zevitech&apos;s
          expert marketing. From optimized listings to strategic ads, we help
          boost visibility, sales, and growth.
        </p>
      </div>

      <div className="layout-standard flex justify-center lg:justify-between gap-6">
        {/* LEFT SIDE CONTENT */}
        <div className="relative flex items-start">
          <div>
            {content.map((item, index) => (
              <div
                key={item.title + index}
                className="space-y-10 my-20 md:my-24"
              >
                <motion.h2
                  animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                  className="text-3xl font-bold text-primary"
                >
                  {item.title}
                </motion.h2>
                <motion.p
                  animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                  className="max-w-sm text-sm lg:text-base font-medium text-slate-300"
                >
                  {item.description}
                </motion.p>
              </div>
            ))}

            <Link href={"https://zevitechautomation.com/"} target="_blank">
              <Button className="cta-button bg-primary text-base font-semibold !border-primary hover:bg-primary text-primary-foreground py-6 px-6 mt-6">
                Let&apos;s Get Started
                <FaArrowRightLong />
              </Button>
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div
          className={cn(
            "sticky top-10 hidden w-[670px] h-[470px] overflow-hidden rounded-md bg-white lg:block",
            contentClassName
          )}
        >
          {content[activeCard].image && (
            <Image
              src={content[activeCard].image}
              alt={content[activeCard].title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};
