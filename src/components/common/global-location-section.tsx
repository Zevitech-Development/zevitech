"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import { LocationStepsProps } from "@/interfaces/common-interfaces";

import { motion, AnimatePresence } from "framer-motion";

import { Locate } from "lucide-react";

import { HiOutlineLocationMarker } from "react-icons/hi";

import { cn } from "@/lib/utils";

export function GlobalLocationSection({
  locations,
  className,
  title = "Our Global Presence",
  autoPlayInterval = 3000,
}: LocationStepsProps) {
  const [currentLocation, setCurrentLocation] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 160));
      } else {
        setCurrentLocation((prev) => (prev + 1) % locations.length);
        setProgress(0);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [progress, locations.length, autoPlayInterval, isPaused]);

  const handleLocationHover = (index: number) => {
    setIsPaused(true);
    setCurrentLocation(index);
    setProgress(0);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    setProgress(0);
  };

  return (
    <div className={cn("p-8 md:p-12", className)}>
      <div className="layout-standard section-padding-standard">
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold font-heading mb-10 text-center">
          {title}
        </h2>

        <div className="flex flex-col md:grid md:grid-cols-2 items-center gap-6 md:gap-10">
          {/* Text Section */}
          <div
            className="order-2 md:order-1 space-y-8 w-full"
            onMouseLeave={handleMouseLeave}
          >
            {locations.map((location, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-6 md:gap-8 cursor-pointer"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: index === currentLocation ? 1 : 0.3 }}
                transition={{ duration: 0.5 }}
                onMouseEnter={() => handleLocationHover(index)}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className={cn(
                    "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    index === currentLocation
                      ? "bg-primary border-primary text-primary-foreground scale-110"
                      : "bg-muted border-muted-foreground"
                  )}
                >
                  {index <= currentLocation ? (
                    <HiOutlineLocationMarker className="w-4 h-4" />
                  ) : (
                    <Locate className="w-4 h-4" />
                  )}
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl text-primary-hover font-semibold">
                    {location.title || location.location}
                  </h3>
                  <p className="text-sm md:text-lg text-muted-foreground">
                    {location.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Image Section */}
          <div
            className={cn(
              "order-1 md:order-2 relative min-h-[200px] md:min-h-[300px] lg:min-h-[400px] w-full overflow-hidden rounded-lg flex-shrink-0"
            )}
          >
            <AnimatePresence mode="wait">
              {locations[currentLocation] && (
                <motion.div
                  key={currentLocation}
                  className="absolute inset-0 rounded-lg overflow-hidden"
                  initial={{ y: 100, opacity: 0, rotateX: -20 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  exit={{ y: -100, opacity: 0, rotateX: 20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <Image
                    src={locations[currentLocation].image}
                    alt={locations[currentLocation].location}
                    className="w-full h-full object-cover"
                    width={1000}
                    height={500}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
