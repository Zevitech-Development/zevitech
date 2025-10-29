"use client";
import React from "react";

import { motion } from "framer-motion";
import Image from "next/image";

export function Testimonial() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };
  return (
    <section className="layout-standard section-padding-standard relative">
      <div className="relative z-10 flex flex-col items-center px-4 text-gray-900 dark:text-white pt-[5rem] md:pt-[3rem]">
        <motion.h1
          variants={{
            hidden: {
              opacity: 0,
              y: 30,
              scale: 0.95,
            },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                duration: 0.6,
                ease: [0.43, 0.13, 0.23, 0.96],
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-heading font-extrabold text-center max-w-4xl leading-tight mb-4 sm:mb-6 tracking-wider font-heading"
        >
          Innovate with Ease,{" "}
          <span className="text-primary">Trusted by Global Developers</span>
        </motion.h1>

        <motion.p
          variants={{
            hidden: {
              opacity: 0,
              y: 30,
              scale: 0.95,
            },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                duration: 0.6,
                ease: [0.43, 0.13, 0.23, 0.96],
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-sm sm:text-base md:text-lg text-paragraph text-center max-w-3xl mb-8 sm:mb-12 px-2"
        >
          Our platform empowers creators to build groundbreaking applications,
          offering robust APIs and comprehensive tools that streamline
          development and foster innovation.
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
        >
          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: 30,
                scale: 0.95,
              },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  duration: 0.6,
                  ease: [0.43, 0.13, 0.23, 0.96],
                },
              },
            }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
            className="bg-[#0B1F3A] p-4 sm:p-6 lg:p-8 rounded-2xl flex flex-col justify-between backdrop-blur-md shadow-lg"
          >
            <div className="mb-6 sm:mb-8 lg:mt-20">
              <motion.div className="flex items-center mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary dark:bg-primary rounded-full flex-center text-white text-xl sm:text-2xl font-bold">
                  D
                </div>
              </motion.div>
              <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-200 leading-relaxed font-medium">
                &quot;Working with this platform has dramatically improved our
                development cycle. The intuitive design tools and robust API
                integrations have allowed us to innovate faster and deliver
                high-quality solutions to our clients with unprecedented
                efficiency. It&apos;s truly a game-changer for modern software
                development.&quot;
              </p>
            </div>
            <div className="flex items-center">
              <Image
                src="https://i.pinimg.com/736x/6f/a3/6a/6fa36aa2c367da06b2a4c8ae1cf9ee02.jpg"
                alt="Shekinah Tshikulila"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover mr-3 sm:mr-4 border-2 border-blue-300"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  (e.target as HTMLImageElement).onerror = null;
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/56x56/6B7280/FFFFFF?text=ST";
                }}
              />
              <div>
                <p className="font-bold text-gray-100 text-base sm:text-lg">
                  Shekinah Tshikulila
                </p>
                <p className="text-xs sm:text-sm text-gray-400">
                  Software Engineer at InnovateCorp
                </p>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col gap-4 sm:gap-6">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: 30,
                  scale: 0.95,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    duration: 0.6,
                    ease: [0.43, 0.13, 0.23, 0.96],
                  },
                },
              }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              className="bg-[#0B1F3A] p-4 sm:p-6 lg:p-8 rounded-2xl flex flex-col justify-between backdrop-blur-md shadow-lg"
            >
              <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-200 leading-relaxed mb-6 sm:mb-8 font-medium">
                &quot;This framework is incredibly powerful and user-friendly.
                It eliminated so many headaches in our workflow, allowing us to
                focus on creativity rather than tedious setup. A truly
                invaluable asset for any developer.&quot;
              </p>
              <div className="flex items-center">
                <Image
                  src="https://i.pinimg.com/736x/89/4e/16/894e16749bb2800527958cf7813b998e.jpg"
                  alt="Jonathan Yombo"
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover mr-3 sm:mr-4 border-2 border-blue-300"
                  onError={(
                    e: React.SyntheticEvent<HTMLImageElement, Event>
                  ) => {
                    (e.target as HTMLImageElement).onerror = null;
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/56x56/6B7280/FFFFFF?text=JY";
                  }}
                />
                <div>
                  <p className="font-bold text-gray-100 text-base sm:text-lg">
                    Jonathan Yombo
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Lead Developer at TechSolutions
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <motion.div
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 30,
                    scale: 0.95,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      duration: 0.6,
                      ease: [0.43, 0.13, 0.23, 0.96],
                    },
                  },
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                className="bg-[#0B1F3A] p-4 sm:p-6 rounded-2xl flex flex-col justify-between backdrop-blur-md shadow-lg"
              >
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-4 sm:mb-6">
                  &quot;The templates provided here are top-notch. They&apos;ve
                  saved me countless hours and the designs are simply stunning.
                  Highly recommend for anyone building a personal website!&quot;
                </p>
                <div className="flex items-center">
                  <Image
                    src="https://i.pinimg.com/736x/5a/ac/66/5aac6619a8b81993b10be58fbded3951.jpg"
                    alt="Yucel Farukşahan"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover mr-2 sm:mr-3 border-2 border-blue-400 dark:border-blue-300"
                    onError={(
                      e: React.SyntheticEvent<HTMLImageElement, Event>
                    ) => {
                      (e.target as HTMLImageElement).onerror = null;
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/48x48/6B7280/FFFFFF?text=YF";
                    }}
                  />
                  <div>
                    <p className="font-bold text-gray-100 text-sm sm:text-base">
                      Yucel Farukşahan
                    </p>
                    <p className="text-xs text-gray-400">Creator, Tailkits</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 30,
                    scale: 0.95,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      duration: 0.6,
                      ease: [0.43, 0.13, 0.23, 0.96],
                    },
                  },
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                className="bg-[#0B1F3A] p-4 sm:p-6 rounded-2xl flex flex-col justify-between backdrop-blur-md shadow-lg"
              >
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-4 sm:mb-6">
                  &quot;Exceptional quality and incredible attention to detail.
                  This platform has truly elevated my web projects. The best
                  personal website resource I&apos;ve come across!&quot;
                </p>
                <div className="flex items-center">
                  <Image
                    src="https://i.pinimg.com/736x/d9/7f/aa/d97faa4ca82603ea39b68b534f63b89a.jpg"
                    alt="Rodrigo Aguilar"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover mr-2 sm:mr-3 border-2 border-blue-300"
                    onError={(
                      e: React.SyntheticEvent<HTMLImageElement, Event>
                    ) => {
                      (e.target as HTMLImageElement).onerror = null;
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/48x48/6B7280/FFFFFF?text=RA";
                    }}
                  />
                  <div>
                    <p className="font-bold text-gray-100 text-sm sm:text-base">
                      Rodrigo Aguilar
                    </p>
                    <p className="text-xs text-gray-400">
                      Creator, <br /> TailwindAwesome
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonial;
