"use client";
import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IoSparklesOutline } from "react-icons/io5";
import {
  ServicesPorfolioSection01Props,
  ServicesPorfolioSection02Props,
} from "@/interfaces/common-interfaces";

// import { useInView } from "react-intersection-observer";

export function ServicesPorfolioSection01({
  title,
  description,
  portfolioImages,
}: ServicesPorfolioSection01Props) {
  const gridLayouts = [
    { count: 10, height: 100, gridCols: "grid-cols-10" },
    { count: 8, height: 150, gridCols: "grid-cols-8" },
    { count: 10, height: 100, gridCols: "grid-cols-10" },
    { count: 8, height: 150, gridCols: "grid-cols-8" },
    { count: 10, height: 100, gridCols: "grid-cols-10" },
  ];

  const mobileGridLayouts = [
    { count: 3, height: 100, gridCols: "grid-cols-3" },
    { count: 3, height: 150, gridCols: "grid-cols-3" },
    { count: 3, height: 100, gridCols: "grid-cols-3" },
    { count: 3, height: 150, gridCols: "grid-cols-3" },
    { count: 3, height: 100, gridCols: "grid-cols-3" },
  ];

  let imageIndex = 0;

  return (
    <section className="bg-secondary-background section-padding-standard">
      <div className="layout-standard section-padding-standard flex flex-col gap-12">
        <div className="flex flex-col gap-4 items-center text-center">
          <span className="flex items-center gap-2 font-semibold text-primary bg-[#007afc]/10 w-fit px-4 py-2 rounded-full border-primary border-2 text-xs">
            <IoSparklesOutline /> Crafted With Precision
          </span>
          <h1 className="md:text-6xl font-bold text-heading font-heading text-3xl tracking-wider md:max-w-4xl">
            {title}
          </h1>

          <p className="md:text-lg text-base md:max-w-3xl text-center font-medium">
            {description}
          </p>
        </div>

        <div className="lg:hidden flex flex-col gap-4">
          {mobileGridLayouts.map((layout, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid ${layout.gridCols} gap-4 justify-center`}
            >
              <AnimatePresence>
                {Array.from({ length: layout.count }).map((_, i) => {
                  const image =
                    portfolioImages[imageIndex % portfolioImages.length];
                  imageIndex++;

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{
                        opacity: 0,
                        scale: 0.5,
                        transition: { duration: 1, ease: "easeInOut" },
                      }}
                      whileHover={{
                        scale: 2,
                        y: -20,
                        zIndex: 10,
                        transition: { type: "spring", stiffness: 30 },
                      }}
                      className="w-full rounded-xl bg-card overflow-hidden shadow-md cursor-pointer"
                      style={{ height: `${layout.height}px` }}
                    >
                      <Image
                        src={image.img}
                        alt={image.alt}
                        className="object-cover w-full h-full"
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="hidden lg:flex flex-col gap-4">
          {gridLayouts.map((layout, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid ${layout.gridCols} gap-4 justify-center`}
            >
              <AnimatePresence>
                {Array.from({ length: layout.count }).map((_, i) => {
                  const image =
                    portfolioImages[imageIndex % portfolioImages.length];
                  imageIndex++;

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{
                        opacity: 0,
                        scale: 0.5,
                        transition: { duration: 1, ease: "easeInOut" },
                      }}
                      whileHover={{
                        scale: 2,
                        y: -20,
                        zIndex: 10,
                        transition: { type: "spring", stiffness: 30 },
                      }}
                      className="w-full rounded-xl bg-card overflow-hidden shadow-md cursor-pointer"
                      style={{ height: `${layout.height}px` }}
                    >
                      <Image
                        src={image.img}
                        alt={image.alt}
                        className="object-cover w-full h-full"
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesPorfolioSection02({
  title,
  description,
  portfolioImages,
}: ServicesPorfolioSection02Props) {
  return (
    <section className="bg-secondary-background pt-5">
      <div className="layout-standard section-padding-standard flex flex-col gap-12">
        <div className="flex flex-col gap-4 items-center text-center">
          <span className="flex items-center gap-2 font-semibold text-primary bg-[#007afc]/10 w-fit px-4 py-2 rounded-full border-primary border-2 text-xs">
            <IoSparklesOutline /> Crafted With Precision
          </span>
          <h1 className="md:text-6xl font-bold text-heading font-heading text-3xl tracking-wide md:max-w-4xl">
            {title}
          </h1>

          <p className="md:text-lg text-base md:max-w-3xl text-center font-medium">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {portfolioImages.map((image, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{
                  opacity: 0,
                  scale: 0.5,
                  transition: { duration: 1, ease: "easeInOut" },
                }}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  zIndex: 10,
                  transition: { type: "spring", stiffness: 30 },
                }}
                className="w-full h-[600px] bg-card overflow-hidden rounded-xl shadow-md cursor-pointer"
              >
                <Image
                  src={image.img}
                  alt={image.alt}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
