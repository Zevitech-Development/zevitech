"use client";
import React, { useState } from "react";

import { Check, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import DailogLeadForm from "@/forms/dailog-lead-form";
import { FaArrowRightLong } from "react-icons/fa6";
import DailogLeadForm from "@/components/forms/dailog-lead-form";

// Helper component to display feature status (check, cross, or text/number)
function FeatureValueDisplay({ value }: { value: boolean | string | number }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="h-5 w-5 font-extrabold text-emerald-500" />
    ) : (
      <X className="h-5 w-5 text-red-600" />
    );
  }
  return <span className="text-sm text-paragraph">{value}</span>;
}

interface Package {
  id: string;
  name: string;
  price: string;
  highlight: boolean;
  badge: string | null;
}

interface FeatureItem {
  name: string;
  // Dynamic access like feature[pkg.id]
  [key: string]: boolean | string | number;
}

interface FeatureCategory {
  category: string;
  items: FeatureItem[];
}

type Row =
  | {
      isCategory: true;
      name: string;
      data: null;
      type: "category";
    }
  | {
      isCategory: false;
      name: string;
      data: FeatureItem;
      type: "feature";
    };

// 🔁 Direction-aware slide variants for mobile package transitions
const mobileSlide = {
  enter: (dir: number) => ({
    x: dir > 0 ? 40 : -40,
    opacity: 0,
    scale: 0.98,
    position: "absolute" as const,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    position: "relative" as const,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -40 : 40,
    opacity: 0,
    scale: 0.98,
    position: "absolute" as const,
  }),
};

export const FeatureComparisonTable: React.FC<{
  packages: Package[];
  featuresData: FeatureCategory[];
}> = ({ packages, featuresData }) => {
  // 👉 local state for MOBILE header/value navigation only
  const [currentPackageIndex, setCurrentPackageIndex] = useState(0);
  const [pkgDirection, setPkgDirection] = useState(0); // -1 = prev, 1 = next

  // Flatten all features (category rows reserved if you add them later)
  const allRows: Row[] = featuresData.flatMap((section) =>
    section.items.map<Row>((item) => ({
      type: "feature",
      name: item.name,
      isCategory: false,
      data: item,
    }))
  );

  const nextPackage = () => {
    setCurrentPackageIndex((prev) => {
      const nextIndex = prev + 1;
      if (nextIndex >= packages.length) return prev; // stop at last
      setPkgDirection(1);
      return nextIndex;
    });
  };

  const prevPackage = () => {
    setCurrentPackageIndex((prev) => {
      const prevIndex = prev - 1;
      if (prevIndex < 0) return prev; // stop at first
      setPkgDirection(-1);
      return prevIndex;
    });
  };

  const currentPackage = packages[currentPackageIndex];

  return (
    <div className="mt-16 w-full relative">
      <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden w-full transition-all duration-300 ease-in-out">
        {/* Main Grid Container */}
        <div className="w-full">
          {/* Header Row */}
          <div className="grid grid-cols-[minmax(160px,1fr)_minmax(160px,1fr)] md:grid-cols-[minmax(250px,300px)_repeat(4,minmax(180px,1fr))] w-full border-b border-gray-200">
            {/* Features Header */}
            <div className="flex items-center justify-center h-[90px] lg:h-24 bg-primary text-white font-bold text-base md:text-lg border-r border-gray-200">
              Features
            </div>

            {/* Package Headers - Mobile: Show only current package, Desktop: Show all */}
            <div className="md:hidden relative flex flex-col items-center justify-center h-[90px] border-r border-gray-200 last:border-r-0 bg-gray-50 text-gray-900 overflow-hidden">
              <AnimatePresence custom={pkgDirection} mode="wait">
                <motion.div
                  key={`mobile-header-${currentPackageIndex}`}
                  custom={pkgDirection}
                  variants={mobileSlide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="relative w-full h-full flex flex-col items-center justify-center"
                >
                  {currentPackage.badge && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.15, duration: 0.25 }}
                      className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] font-bold bg-primary text-white rounded-bl-lg rounded-tr-lg shadow-sm"
                    >
                      {currentPackage.badge}
                    </motion.span>
                  )}
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.2 }}
                    className="text-sm font-bold text-center px-2"
                  >
                    {currentPackage.name}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.25 }}
                    className="text-base font-extrabold mt-1"
                  >
                    {currentPackage.price}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile Navigation Arrows */}
            <div className="md:hidden">
              {/* Backward Button (Left side) */}
              <motion.button
                onClick={prevPackage}
                disabled={currentPackageIndex === 0}
                className={`absolute right-[38%] top-11 z-20 rounded-full p-2 sm:p-3 shadow-lg border transition-all duration-200 
                  ${
                    currentPackageIndex === 0
                      ? "bg-gray-200 border-gray-200 cursor-not-allowed"
                      : "bg-white border-gray-300 hover:bg-gray-50 hover:shadow-xl"
                  }`}
                whileHover={currentPackageIndex === 0 ? {} : { scale: 1.05 }}
                whileTap={currentPackageIndex === 0 ? {} : { scale: 0.95 }}
                aria-label="Previous package"
              >
                <ChevronRight className="h-4 w-4 text-gray-700 rotate-180" />
              </motion.button>

              {/* Forward Button (Right side) */}
              <motion.button
                onClick={nextPackage}
                disabled={currentPackageIndex === packages.length - 1}
                className={`absolute right-2 sm:right-4 top-[46px] z-20 rounded-full p-2 sm:p-3 shadow-lg border transition-all duration-200 
                  ${
                    currentPackageIndex === packages.length - 1
                      ? "bg-gray-200 border-gray-200 cursor-not-allowed"
                      : "bg-white border-gray-300 hover:bg-gray-50 hover:shadow-xl"
                  }`}
                whileHover={
                  currentPackageIndex === packages.length - 1
                    ? {}
                    : { scale: 1.05 }
                }
                whileTap={
                  currentPackageIndex === packages.length - 1
                    ? {}
                    : { scale: 0.95 }
                }
                aria-label="Next package"
              >
                <ChevronRight className="h-4 w-4 text-gray-700" />
              </motion.button>
            </div>

            {/* Desktop Package Headers */}
            {packages.map((pkg) => (
              <div
                key={`hdr-${pkg.id}`}
                className={cn(
                  "hidden md:flex relative flex-col items-center justify-center h-20 lg:h-24 border-r border-gray-200 last:border-r-0",
                  pkg.highlight
                    ? "bg-gray-800 text-white"
                    : "bg-gray-50 text-gray-900"
                )}
              >
                {pkg.badge && (
                  <span
                    className={cn(
                      "absolute top-0 right-0 px-2 py-1 lg:py-1 text-xs font-semibold",
                      pkg.highlight
                        ? "bg-emerald-500 text-white"
                        : "bg-primary text-white"
                    )}
                    style={{ borderRadius: "0 0 0 0.5rem" }}
                  >
                    {pkg.badge}
                  </span>
                )}
                <h3 className="text-sm lg:text-base font-bold text-center px-2">
                  {pkg.name}
                </h3>
                <p className="text-lg lg:text-xl font-extrabold mt-1">
                  {pkg.price}
                </p>
              </div>
            ))}
          </div>

          {/* Scrollable Content Area */}
          <div className="overflow-x-auto w-full">
            <div className="min-w-full">
              {/* All Rows (Categories + Features) */}
              {allRows.map((row, index) => {
                if (row.isCategory) {
                  // (Reserved) Category Row support if needed later
                  return (
                    <div
                      key={`category-${row.name}-${index}`}
                      className="grid grid-cols-[minmax(200px,1fr)_minmax(180px,1fr)] md:grid-cols-[minmax(250px,300px)_repeat(4,minmax(180px,1fr))] w-full border-b border-gray-200 bg-gray-50"
                    >
                      <div className="py-4 border-r border-gray-200 bg-gray-50" />
                      {packages.map((pkg) => (
                        <div
                          key={`category-spacer-${pkg.id}-${index}`}
                          className="hidden md:block py-4 border-r border-gray-200 last:border-r-0 bg-gray-50"
                        />
                      ))}
                    </div>
                  );
                }

                // Feature Row
                return (
                  <div
                    key={`feature-${row.name}-${index}`}
                    className={cn(
                      "grid grid-cols-[minmax(160px,1fr)_minmax(160px,1fr)] md:grid-cols-[minmax(250px,300px)_repeat(4,minmax(180px,1fr))] w-full border-b border-gray-200 hover:bg-gray-50/50 transition-colors",
                      index === allRows.length - 1 && "border-b-0"
                    )}
                  >
                    {/* Feature Name */}
                    <div className="py-3 md:py-4 px-3 md:px-4 text-gray-700 font-medium text-xs md:text-sm lg:text-base border-r border-gray-200 flex items-center min-h-[50px] md:min-h-[60px]">
                      {row.name}
                    </div>

                    {/* Mobile: Show only current package (animated direction-aware) */}
                    <div className="md:hidden relative flex items-center justify-center py-3 px-2 text-xs min-h-[50px] overflow-hidden">
                      <AnimatePresence custom={pkgDirection} mode="wait">
                        <motion.div
                          key={`mcell-${currentPackageIndex}-${row.name}`}
                          custom={pkgDirection}
                          variants={mobileSlide}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="w-full flex items-center justify-center"
                        >
                          <FeatureValueDisplay
                            value={
                              row.data[
                                currentPackage.id as keyof typeof row.data
                              ] as boolean | string | number
                            }
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Desktop: Feature Values for each package */}
                    {packages.map((pkg) => (
                      <div
                        key={`feature-value-${pkg.id}-${row.name}-${index}`}
                        className="hidden md:flex items-center justify-center py-4 px-2 text-sm border-r border-gray-200 last:border-r-0 min-h-[60px]"
                      >
                        <FeatureValueDisplay
                          value={
                            row.data[pkg.id as keyof typeof row.data] as
                              | boolean
                              | string
                              | number
                          }
                        />
                      </div>
                    ))}
                  </div>
                );
              })}

              {/* Call-to-Action Row */}
              <div className="grid grid-cols-[minmax(160px,1fr)_minmax(160px,1fr)] md:grid-cols-[minmax(250px,300px)_repeat(4,minmax(180px,1fr))] w-full bg-gray-50 border-t-2 border-gray-200">
                {/* Empty cell for features column */}
                <div className="py-4 md:py-6 px-3 md:px-4 border-r border-gray-200 flex items-center justify-center">
                  <span className="text-gray-600 font-semibold text-sm md:text-lg">
                    Choose Your Plan
                  </span>
                </div>

                {/* Mobile: Show only current package CTA */}
                <div className="md:hidden py-4 px-3 flex items-center justify-center">
                  <DailogLeadForm
                    trigger={
                      <Button className="h-[50px] bg-primary hover:bg-primary-hover md:px-8 px-4 py-4 rounded-full font-bold md:text-base text-sm !animation-standard flex items-center gap-2 group md:hover:scale-105 cta-button">
                        Let&apos;s Get Started
                        <FaArrowRightLong className="hidden sm:block md:w-5 md:h-5 w-3 h-3 md:group-hover:translate-x-[3px] md:animation-standard" />
                      </Button>
                    }
                  />
                </div>

                {/* Desktop: CTA Buttons for each package */}
                {packages.map((pkg) => (
                  <div
                    key={`cta-${pkg.id}`}
                    className="hidden md:flex py-6 px-4 border-r border-gray-200 last:border-r-0 items-center justify-center"
                  >
                    <DailogLeadForm
                      trigger={
                        <Button className="h-[50px] bg-primary hover:bg-primary-hover md:px-8 px-4 py-4 rounded-full font-bold xl:text-base text-sm !animation-standard flex items-center gap-2 group md:hover:scale-105 cta-button">
                          Let&apos;s Get Started
                          <FaArrowRightLong className="hidden xl:block lg:w-5 lg:h-5 w-3 h-3 md:group-hover:translate-x-[3px] md:animation-standard" />
                        </Button>
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
