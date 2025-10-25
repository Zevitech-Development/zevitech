"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import { motion, AnimatePresence } from "framer-motion";

import { ChevronLeft, ChevronRight, Palette } from "lucide-react";

import { logoDesignServices } from "@/content/services/logo-landing-content/logo-landing-content";

// --- Custom hook for mobile detection ---
const useIsMobile = (breakpoint: number = 768): boolean => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const checkScreenSize = () => setIsMobile(window.innerWidth < breakpoint);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [breakpoint]);

  return isMobile;
};

// --- Main Component ---
export default function LogoOrbitCarousel() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const isMobile = useIsMobile();

  const containerRadius = isMobile ? 140 : 200;
  const profileSize = isMobile ? 60 : 80;
  const containerSize = containerRadius * 2 + 52;

  const getRotation = React.useCallback(
    (index: number): number =>
      (index - activeIndex) * (360 / logoDesignServices.length),
    [activeIndex]
  );

  const next = () => setActiveIndex((i) => (i + 1) % logoDesignServices.length);
  const prev = () =>
    setActiveIndex(
      (i) => (i - 1 + logoDesignServices.length) % logoDesignServices.length
    );

  React.useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 2300);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleProfileClick = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
  };

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "ArrowLeft") prev();
      else if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col items-center relative min-h-[400px] transition-colors duration-300">
      <div
        className="relative flex items-center justify-center"
        style={{ width: containerSize, height: containerSize }}
      >
        {/* Orbit Circle */}
        <div
          className="absolute rounded-full border-[3px] border-gray-300 dark:border-gray-700"
          style={{
            width: containerRadius * 2,
            height: containerRadius * 2,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Active Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={logoDesignServices[activeIndex].id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="z-10 bg-white dark:bg-gray-950 backdrop-blur-sm shadow-xl rounded-xl p-1 sm:p-3 md:p-4 lg:p-4 w-48 md:w-52 xl:w-56 text-center border border-gray-100 dark:border-gray-800"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto -mt-10 md:-mt-12 border-4 border-white dark:border-black shadow-md overflow-hidden"
            >
              <Image
                src={logoDesignServices[activeIndex].profile}
                alt={logoDesignServices[activeIndex].name}
                width={80}
                height={80}
                className="object-cover w-full h-full"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src =
                    "https://placehold.co/100x100/E0E7FF/4338CA?text=Error";
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <h2 className="mt-2 text-base md:text-lg font-bold text-gray-800 dark:text-white">
                {logoDesignServices[activeIndex].name}
              </h2>
              <div className="flex items-center justify-center text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                <Palette size={12} className="mr-1" />
                <span>{logoDesignServices[activeIndex].category}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex justify-center items-center mt-3 space-x-2"
            >
              <button
                onClick={prev}
                className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                <ChevronLeft
                  size={16}
                  className="text-gray-700 dark:text-gray-300"
                />
              </button>
              <Link href={logoDesignServices[activeIndex].href}>
                <button className="px-4 py-1 text-sm rounded-full bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors">
                  Let's Start
                </button>
              </Link>
              <button
                onClick={next}
                className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                <ChevronRight
                  size={16}
                  className="text-gray-700 dark:text-gray-300"
                />
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Orbiting Profiles */}
        {logoDesignServices.map((p, i) => {
          const rotation = getRotation(i);
          return (
            <motion.div
              key={p.id}
              animate={{
                transform: `rotate(${rotation}deg) translateY(-${containerRadius}px)`,
              }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                width: profileSize,
                height: profileSize,
                position: "absolute",
                top: `calc(50% - ${profileSize / 2}px)`,
                left: `calc(50% - ${profileSize / 2}px)`,
              }}
            >
              <motion.div
                animate={{ rotate: -rotation }}
                transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                className="w-full h-full"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleProfileClick(i)}
                  className={`w-full h-full overflow-hidden rounded-full cursor-pointer transition-all duration-300 ${
                    i === activeIndex
                      ? "border-4 border-indigo-500 shadow-lg"
                      : "border-2 border-gray-300 hover:border-indigo-400"
                  }`}
                >
                  <Image
                    src={p.profile}
                    alt={p.name}
                    width={profileSize}
                    height={profileSize}
                    className="object-cover w-full h-full"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
