"use client";
import Image from "next/image";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

import CtaImg from "../../../../public/images/services/branding/why-choose-us-mascot-04.jpg";

import { Sparkles } from "lucide-react";
import DailogLeadForm from "@/components/forms/dailog-lead-form";
import { FaArrowRightLong } from "react-icons/fa6";
import { OpenLiveChat } from "@/utils/open-live-chat";
import { IoChatbox } from "react-icons/io5";

export function CtaSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, x: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  const buttonHoverVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section className="relative bg-home-page-contact bg-no-repeat bg-cover w-full section-padding-standard overflow-hidden">
      <div className="absolute inset-0 z-10 bg-black/40" />
      {/* Content */}
      <div className="relative layout-standard z-20">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8 flex flex-col justify-center">
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center lg:items-start"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border shadow-sm">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-heading">
                  Professional Logo Design
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl md:text-5xl font-extrabold text-gray-200 leading-tight text-center lg:text-left"
            >
              Transform Your Vision into a Bold
              <span className="text-primary"> Creative Identity</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg font-medium text-center lg:text-left text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Bring your ideas to life with vibrant, custom logo designs that
              reflect your brand&apos;s energy and style. Whether minimal, 3D, or
              animated — we craft visuals that leave a lasting impression.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-normal gap-4"
            >
              <DailogLeadForm
                trigger={
                  <Button className="cta-button hover:bg-primary-hover !border-none py-6 px-6">
                    Get Started <FaArrowRightLong />
                  </Button>
                }
              ></DailogLeadForm>

              <Button
                variant={"outline"}
                onClick={OpenLiveChat}
                className="cta-button-02 hover:bg-primary-hover bg-[#D7D7D7] text-primary"
              >
                <IoChatbox /> Chat Now
              </Button>
            </motion.div>
          </div>
 
          {/* Right Image */}
          <motion.div
            variants={imageVariants}
            className="relative w-full h-full min-h-[400px] lg:min-h-[500px] flex items-center justify-center"
          >
            <div className="relative w-full rounded-2xl overflow-hidden mx-auto">
              <Image
                alt="logo-image"
                src={CtaImg}
                className="w-full object-cover"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
