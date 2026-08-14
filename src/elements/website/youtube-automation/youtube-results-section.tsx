"use client";
import React from "react";
import Image from "next/image";

import { motion } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa6";
import { LuCalendarDays } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import DailogLeadForm from "@/components/forms/dailog-lead-form";

import { YoutubeResultsSectionProps } from "@/interfaces/youtube-automation-interfaces";

export default function YoutubeResultsSection({
  eyebrow,
  title,
  highlightText,
  description,
  results,
  footnote,
  ctaText,
}: YoutubeResultsSectionProps) {
  return (
    <section className="relative section-padding-standard overflow-hidden bg-secondary-background">
      {/* Soft radial wash behind the grid */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_60%,hsl(var(--primary)/0.08),transparent)]" />
      {/* Thin vertical hairline dropping from the top edge */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-primary/40 to-transparent" />

      <div className="layout-standard relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-block text-[10px] md:text-xs font-bold uppercase tracking-[5px] text-primary mb-5">
            {eyebrow}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-heading leading-[1.08] mb-5">
            {title} <span className="italic text-primary">{highlightText}</span>
          </h2>
          <p className="text-base text-paragraph font-medium max-w-md mx-auto leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* 3D tilted dashboard cards — each snaps flat on hover */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14"
          style={{ perspective: "1200px" }}
        >
          {results.map((result, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Blurred colour glow that intensifies on hover */}
              <div
                className="absolute -inset-4 rounded-3xl opacity-40 group-hover:opacity-80 transition-opacity duration-500 blur-2xl pointer-events-none"
                style={{ background: result.glowColor }}
              />

              <motion.div
                style={{ transformStyle: "preserve-3d" }}
                initial={false}
                variants={{
                  rest: {
                    rotateY: result.rotateY,
                    rotateX: result.rotateX,
                    rotate: result.rotateZ,
                    scale: 1,
                  },
                  hover: {
                    rotateY: 0,
                    rotateX: 0,
                    rotate: 0,
                    scale: 1.03,
                  },
                }}
                animate="rest"
                whileHover="hover"
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-2xl overflow-hidden border border-border bg-background shadow-[0_30px_80px_rgba(0,0,0,0.18)] transition-shadow duration-500 group-hover:shadow-[0_40px_100px_rgba(0,0,0,0.28)] cursor-pointer"
              >
                {/* Corner tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-block bg-heading/80 backdrop-blur-sm border border-white/10 text-white text-[10px] font-bold uppercase tracking-[3px] px-3 py-1 rounded-full">
                    {result.tag}
                  </span>
                </div>

                {/* Revenue pill */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-primary text-primary-foreground font-bold text-sm px-3 py-1.5 rounded-full shadow-[0_0_20px_hsl(var(--primary)/0.5)] leading-none">
                    {result.revenue}
                  </div>
                </div>

                <Image
                  src={result.img}
                  alt={`YouTube Studio: ${result.views}, ${result.revenue} revenue`}
                  width={900}
                  height={560}
                  loading="lazy"
                  className="w-full h-auto block"
                />

                {/* Caption over a bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent flex items-end px-5 pb-4">
                  <p className="text-white font-bold text-sm">{result.views}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-16 lg:mt-20"
        >
          <p className="text-muted-foreground text-xs uppercase tracking-[4px] mb-7">
            {footnote}
          </p>
          <DailogLeadForm
            trigger={
              <Button className="inline-flex items-center gap-3 h-14 px-10 rounded-full bg-primary text-primary-foreground hover:bg-primary-hover font-bold text-base shadow-[0_0_40px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_60px_hsl(var(--primary)/0.5)] hover:scale-[1.04] animation-standard">
                <LuCalendarDays className="w-5 h-5" />
                {ctaText}
                <FaArrowRightLong className="w-4 h-4" />
              </Button>
            }
          />
        </motion.div>
      </div>
    </section>
  );
}
