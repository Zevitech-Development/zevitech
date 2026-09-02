"use client";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

import { FaArrowRightLong } from "react-icons/fa6";
import { Clock, ShieldCheck } from "lucide-react";

import DailogLeadForm from "@/components/forms/dailog-lead-form";
import { OpenLiveChat } from "@/utils/open-live-chat";

const trustPoints = [
  { icon: Clock, label: "Reply within 24 hours" },
  { icon: ShieldCheck, label: "NDA available on request" },
];

export default function CustomProjectCta() {
  return (
    <section className="bg-background section-padding-standard">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="layout-standard relative"
      >
        <div className="relative layout-standard rounded-[2rem] border border-border bg-card px-8 py-14 md:px-16 md:py-16 text-center shadow-lg">
          {/* Corner accents */}
          <span className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-primary/40 rounded-tl-lg" />
          <span className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-primary/40 rounded-br-lg" />

          <div className="flex-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-6">
            <FaArrowRightLong className="text-primary -rotate-45" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold font-heading text-heading leading-tight">
            Have a project like this in mind?
          </h2>

          <p className="mt-4 text-base md:text-lg text-paragraph max-w-md mx-auto">
            Tell us what you&apos;re trying to build — we&apos;ll come back with
            a clear plan, timeline, and quote.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <DailogLeadForm
              trigger={
                <Button
                  size="lg"
                  className="flex items-center gap-2 animation-standard font-medium bg-primary hover:bg-primary-hover text-white px-8"
                >
                  Start Your Project
                  <FaArrowRightLong className="text-sm" />
                </Button>
              }
            />
            <Button
              onClick={OpenLiveChat}
              variant="outline"
              size="lg"
              className="border-2 border-border hover:bg-primary-hover text-heading hover:text-white font-medium animation-standard px-8"
            >
              Chat With Our Team
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 pt-6 border-t border-border">
            {trustPoints.map((point) => (
              <div
                key={point.label}
                className="flex items-center gap-1.5 text-xs font-medium text-paragraph/80"
              >
                <point.icon className="w-3.5 h-3.5 text-primary" />
                {point.label}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
