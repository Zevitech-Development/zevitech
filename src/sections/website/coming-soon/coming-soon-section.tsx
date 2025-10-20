"use client";
import React from "react";
import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";
import { OpenLiveChat } from "@/utils/open-live-chat";

import { ComingSoonSectionProps } from "@/interfaces/components-partials-interface";

const ComingSoonSection: React.FC<ComingSoonSectionProps> = ({
  serviceName,
}) => {
  return (
    <LampContainer className="rounded-none">
      <div className="layout-standard flex flex-col gap-8 items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: "easeInOut",
          }}
          viewport={{ once: true, amount: 0.25 }}
          className="flex flex-col items-center text-center gap-6"
        >
          {/* Heading */}
          <h1 className="bg-gradient-to-br from-white via-sky-100 to-sky-400 bg-clip-text text-transparent text-4xl font-medium tracking-tight md:text-7xl">
            {serviceName} — Coming Soon
          </h1>

          {/* Description */}
          <p className="max-w-3xl font-medium text-gray-300 leading-relaxed">
            We’re crafting our upcoming {serviceName} — a new addition to
            Zevitech’s digital solutions, designed to elevate your brand and
            deliver exceptional results. Stay tuned for what’s next.
          </p>

          {/* CTA Button */}
          <button
            onClick={OpenLiveChat}
            className="mt-3 cta-button w-[150px] h-[60px] bg-transparent border-4 border-primary group hover:scale-105 rounded-full text-gray-200 md:text-xl text-base font-bold transition-all duration-300"
          >
            Chat Now
          </button>
        </motion.div>
      </div>
    </LampContainer>
  );
};

export default ComingSoonSection;
