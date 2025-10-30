"use client";
import { useState } from "react";
import { useEffect, useRef } from "react";
import Image from "next/image";

import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";

import { logoCategories } from "@/content/services/logo-landing-content/logo-landing-content";

// Grid layouts for desktop
const gridLayouts = [
  { count: 10, height: 100, gridCols: "grid-cols-10" },
  { count: 8, height: 150, gridCols: "grid-cols-8" },
  { count: 10, height: 100, gridCols: "grid-cols-10" },
  { count: 8, height: 150, gridCols: "grid-cols-8" },
  { count: 10, height: 100, gridCols: "grid-cols-10" },
];

// Grid layouts for mobile
const mobileGridLayouts = [
  { count: 3, height: 100, gridCols: "grid-cols-3" },
  { count: 3, height: 150, gridCols: "grid-cols-3" },
  { count: 3, height: 100, gridCols: "grid-cols-3" },
  { count: 3, height: 150, gridCols: "grid-cols-3" },
  { count: 3, height: 100, gridCols: "grid-cols-3" },
];

// Motion Variants for Swipe Effect
const swipeVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
    position: "absolute" as const,
  }),
  center: {
    x: 0,
    opacity: 1,
    position: "relative" as const,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -200 : 200,
    opacity: 0,
    position: "absolute" as const,
  }),
};

export default function LogoDesignShowcase() {
  const [activeCategory, setActiveCategory] = useState("logo2d");
  const [direction, setDirection] = useState(1);
  const [visibleCount, setVisibleCount] = useState(15);

  const currentCategory = logoCategories.find(
    (cat) => cat.id === activeCategory
  );

  const handleCategoryChange = (newCategory: string) => {
    if (newCategory === activeCategory) return;

    const oldIndex = logoCategories.findIndex(
      (cat) => cat.id === activeCategory
    );
    const newIndex = logoCategories.findIndex((cat) => cat.id === newCategory);

    setDirection(newIndex > oldIndex ? 1 : -1);
    setActiveCategory(newCategory);
  };

  return (
    <section className="layout-standard section-padding-standard py-14">
      <div className="flex flex-col items-center gap-6 text-center mb-12 max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Where Creativity Meets{" "}
          <span className="text-primary">Brand Purpose</span>
        </motion.h2>
        <p className="md:text-lg text-paragraph font-medium max-w-3xl">
          Explore distinctive logos crafted with creativity, strategy, and
          precision—turning ideas into lasting brand identities.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-16 max-w-5xl mx-auto">
        {logoCategories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            onClick={() => handleCategoryChange(category.id)}
            className="min-w-[160px] hover:bg-primary-hover text-base font-semibold py-5 px-5"
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Portfolio Section with Animation */}
      <div className="relative min-h-[400px]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={`portfolio-${activeCategory}`}
            custom={direction}
            variants={swipeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="w-full"
          >
            {currentCategory && currentCategory.portfolioImages && (
              <>
                {/* Mobile Layout */}
                <div className="lg:hidden flex flex-col gap-4">
                  {mobileGridLayouts
                    .slice(0, Math.ceil(visibleCount / 3))
                    .map((layout, rowIndex) => {
                      let imageIndex =
                        rowIndex === 0
                          ? 0
                          : mobileGridLayouts
                              .slice(0, rowIndex)
                              .reduce((sum, l) => sum + l.count, 0);

                      return (
                        <div
                          key={rowIndex}
                          className={`grid ${layout.gridCols} gap-4 justify-center`}
                        >
                          {Array.from({ length: layout.count }).map((_, i) => {
                            const image =
                              currentCategory.portfolioImages[
                                imageIndex %
                                  currentCategory.portfolioImages.length
                              ];
                            imageIndex++;

                            return (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{
                                  opacity: 0,
                                  scale: 0.5,
                                  transition: {
                                    duration: 1,
                                    ease: "easeInOut",
                                  },
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
                                  width={200}
                                  height={layout.height}
                                  className="object-cover object-center w-full h-full"
                                  unoptimized={true}
                                  loading="lazy"
                    
                                />
                              </motion.div>
                            );
                          })}
                        </div>
                      );
                    })}
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:flex flex-col gap-4">
                  {gridLayouts
                    .slice(0, Math.ceil(visibleCount / 10))
                    .map((layout, rowIndex) => {
                      let imageIndex =
                        rowIndex === 0
                          ? 0
                          : gridLayouts
                              .slice(0, rowIndex)
                              .reduce((sum, l) => sum + l.count, 0);

                      return (
                        <div
                          key={rowIndex}
                          className={`grid ${layout.gridCols} gap-4 justify-center`}
                        >
                          {Array.from({ length: layout.count }).map((_, i) => {
                            const image =
                              currentCategory.portfolioImages[
                                imageIndex %
                                  currentCategory.portfolioImages.length
                              ];
                            imageIndex++;

                            return (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{
                                  opacity: 0,
                                  scale: 0.5,
                                  transition: {
                                    duration: 1,
                                    ease: "easeInOut",
                                  },
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
                                  width={200}
                                  height={layout.height}
                                  className="object-cover w-full h-full"
                                  unoptimized={true}
                                  loading="lazy"
                                />
                              </motion.div>
                            );
                          })}
                        </div>
                      );
                    })}
                </div>
                {currentCategory.portfolioImages.length > visibleCount && (
                  <div className="flex items-center justify-center">
                    <Button
                    onClick={() => setVisibleCount((prev) => prev + 15)}
                    className="mt-8"
                  >
                    Load More
                  </Button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
