"use client"
import React, { useState } from "react";

import { Check, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";


import { cn } from "@/lib/utils";
import DailogLeadForm from "@/forms/dailog-lead-form";
import { FaArrowRightLong } from "react-icons/fa6";


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
  [key: string]: boolean | string | number; // Allows dynamic access like feature[pkg.id]
}

interface FeatureCategory {
  category: string;
  items: FeatureItem[];
}

export const FeatureComparisonTable: React.FC<{
  packages: Package[];
  featuresData: FeatureCategory[];
}> = ({ packages, featuresData }) => {
  const [currentPackageIndex, setCurrentPackageIndex] = useState(0);

  const allRows = featuresData.flatMap((section) =>
    section.items.map((item) => ({
      type: 'feature',
      name: item.name,
      isCategory: false,
      data: item
    }))
  );

  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const nextPackage = () => {
    setCurrentPackageIndex((prev) => {
      const nextIndex = prev + 1;
      if (nextIndex >= packages.length) {
        setDirection('backward');
        return prev - 1;
      }
      return nextIndex;
    });
  };

  const prevPackage = () => {
    setCurrentPackageIndex((prev) => {
      const prevIndex = prev - 1;
      if (prevIndex < 0) {
        setDirection('forward');
        return prev + 1;
      }
      return prevIndex;
    });
  };

  const handleNavigation = () => {
    if (direction === 'forward') {
      nextPackage();
    } else {
      prevPackage();
    }
  };

  const currentPackage = packages[currentPackageIndex];

  return (
    <div className="mt-16 w-full relative">
      {/* Mobile Navigation Arrow - Fixed position at top right */}
      <div className="md:hidden">
        <motion.button
          onClick={handleNavigation}
          className="absolute right-4 top-11 z-20 bg-white border border-gray-300 rounded-full p-3 shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={direction}
              initial={{ opacity: 0, rotate: direction === 'backward' ? 180 : 0 }}
              animate={{ opacity: 1, rotate: direction === 'backward' ? 180 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ChevronRight className="h-4 w-4 text-gray-700" />
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>

      <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden w-full transition-all duration-300 ease-in-out">
        {/* Main Grid Container */}
        <div className="w-full">

          {/* Header Row */}
          <div className="grid grid-cols-[minmax(200px,1fr)_minmax(180px,1fr)] md:grid-cols-[minmax(250px,300px)_repeat(4,minmax(180px,1fr))] w-full border-b border-gray-200">
            {/* Features Header */}
            <div className="flex items-center justify-center h-16 md:h-20 lg:h-24 bg-primary text-white font-bold text-base md:text-lg border-r border-gray-200">
              Features
            </div>

            {/* Package Headers - Mobile: Show only current package, Desktop: Show all */}
            <div className="md:hidden relative flex flex-col items-center justify-center h-16 border-r border-gray-200 last:border-r-0 bg-gray-50 text-gray-900 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPackageIndex}
                  initial={{ opacity: 0, x: 30, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -30, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="relative w-full h-full flex flex-col items-center justify-center"
                >
                  {currentPackage.badge && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] font-bold bg-primary text-white rounded-bl-lg rounded-tr-lg shadow-sm"
                    >
                      {currentPackage.badge}
                    </motion.span>
                  )}
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="text-sm font-bold text-center px-2"
                  >
                    {currentPackage.name}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.3 }}
                    className="text-base font-extrabold mt-1"
                  >
                    {currentPackage.price}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Desktop Package Headers */}
            {packages.map((pkg) => (
              <div
                key={pkg.id}
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
                      "absolute top-0 right-0 px-2 py-1 text-xs font-semibold",
                      pkg.highlight
                        ? "bg-emerald-500 text-white"
                        : "bg-primary text-white"
                    )}
                    style={{
                      borderRadius: "0 0 0 0.5rem",
                    }}
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
                  // Category Row
                  return (
                    <div
                      key={`category-${index}`}
                      className="grid grid-cols-[minmax(200px,1fr)_minmax(180px,1fr)] md:grid-cols-[minmax(250px,300px)_repeat(4,minmax(180px,1fr))] w-full border-b border-gray-200 bg-gray-50"
                    >


                      {/* Mobile: Empty cell for current package */}
                      <div className="md:hidden py-4 border-r border-gray-200 bg-gray-50" />

                      {/* Desktop: Empty cells for packages in category rows */}
                      {packages.map((pkg) => (
                        <div
                          key={`category-spacer-${pkg.id}-${index}`}
                          className="hidden md:block py-4 border-r border-gray-200 last:border-r-0 bg-gray-50"
                        />
                      ))}
                    </div>
                  );
                } else {
                  // Feature Row
                  return (
                    <div
                      key={`feature-${index}`}
                      className={cn(
                        "grid grid-cols-[minmax(200px,1fr)_minmax(180px,1fr)] md:grid-cols-[minmax(250px,300px)_repeat(4,minmax(180px,1fr))] w-full border-b border-gray-200 hover:bg-gray-50/50 transition-colors",
                        index === allRows.length - 1 && "border-b-0"
                      )}
                    >
                      {/* Feature Name */}
                      <div className="py-3 md:py-4 px-3 md:px-4 text-gray-700 font-medium text-xs md:text-sm lg:text-base border-r border-gray-200 flex items-center min-h-[50px] md:min-h-[60px]">
                        {row.name}
                      </div>

                      {/* Mobile: Show only current package */}
                      <div className="md:hidden flex items-center justify-center py-3 px-2 text-xs min-h-[50px]">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`${currentPackageIndex}-${row.name}`}
                            initial={{ opacity: 0, x: 20, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -20, scale: 0.9 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <FeatureValueDisplay
                              value={
                                row.data[currentPackage.id as keyof typeof row.data] as
                                | boolean
                                | string
                                | number
                              }
                            />
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* Desktop: Feature Values for each package */}
                      {packages.map((pkg) => (
                        <div
                          key={`feature-value-${pkg.id}-${index}`}
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
                }
              })}

              {/* Call-to-Action Row */}
              <div className="grid grid-cols-[minmax(200px,1fr)_minmax(180px,1fr)] md:grid-cols-[minmax(250px,300px)_repeat(4,minmax(180px,1fr))] w-full bg-gray-50 border-t-2 border-gray-200">
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
                        <FaArrowRightLong className="md:w-5 md:h-5 w-3 h-3 md:group-hover:translate-x-[3px] md:animation-standard" />
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
                        <Button className="h-[50px] bg-primary hover:bg-primary-hover md:px-8 px-4 py-4 rounded-full font-bold md:text-base text-sm !animation-standard flex items-center gap-2 group md:hover:scale-105 cta-button">
                          Let&apos;s Get Started
                          <FaArrowRightLong className="md:w-5 md:h-5 w-3 h-3 md:group-hover:translate-x-[3px] md:animation-standard" />
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

