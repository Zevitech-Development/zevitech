"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

import { CtaProps } from "@/interfaces/common-interfaces";

import { FaArrowRightLong } from "react-icons/fa6";

import { Button } from "@/components/ui/button";

import { ContactOptions } from "@/content/components.layout-content";

import DailogLeadForm from "../forms/dailog-lead-form";

function Cta({ image, heading, text }: CtaProps) {
  return (
    <section className="section-padding-standard py-16 lg:py-20">
      <div className="layout-standard grid lg:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center lg:justify-normal">
          <Image src={image} alt="cta image" />
        </div>

        <div className="flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl leading-tight font-extrabold text-heading max-w-4xl">
            {heading}
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-paragraph font-medium max-w-3xl ">
            {text}
          </p>

          {/* Buttons (static for all) */}
          <div>
            <DailogLeadForm
              trigger={
                <Button className="cta-button h-[60px] md:px-6 group lg:hover:scale-105 rounded-full lg:hover:bg-primary-hover md:text-xl text-base lg:!animation-standard font-bold">
                  Let&apos;s Get Started
                  <FaArrowRightLong className="group-hover:translate-x-[2px] animation-standard" />
                </Button>
              }
            />
          </div>

          {/* Bottom Cards (static for all) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ContactOptions.map((data, index) => (
              <Link key={index} href={data.href}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="min-h-[100px] flex flex-col items-center gap-3 justify-between text-center bg-gradient-to-tr from-[#1a1a1a] via-[#222222] to-[#2b2b2b]
                 shadow-lg rounded-lg p-4"
                >
                  <div>
                    <data.icon className="text-white text-3xl" />
                  </div>
                  <div className="text-sm text-white/80 font-medium">
                    {data.text}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cta;
