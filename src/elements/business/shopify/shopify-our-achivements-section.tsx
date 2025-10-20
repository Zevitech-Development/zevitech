"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { PortfolioSectionContent } from "@/content/landing/shopify-landing-page-content";

function OurAchievementSection() {
  return (
    <section className="layout-standard">
      <div className="w-full grid lg:grid-cols-3 max-lg:gap-4 md:mb-16 mb-12">
        <div className="lg:col-span-1 flex flex-col gap-2 max-lg:text-center">
          <h2 className="md:text-lg text-base uppercase text-foreground font-semibold">
            See What We&apos;ve Been Up To
          </h2>
          <h1 className="font-heading font-bold md:text-6xl text-4xl text-heading tracking-widest">
            <span className="text-secondary">Shopify</span> Stores We&apos;ve
            Built
          </h1>
        </div>

        <p className="md:text-2xl text-base font-medium lg:col-span-2 max-lg:text-center">
          We&apos;re dedicated to excellence and innovation, showcasing diverse
          projects across industries. Discover the passion and effort we put
          into crafting solutions that meet your needs.
        </p>
      </div>

      <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 md:gap-x-4 md:gap-y-8 gap-8 mb-16 md:pb-12">
        {PortfolioSectionContent.map((portfolio, index) => (
          <motion.div
            key={index}
            className="w-full md:h-[500px] h-[300px] md:rounded-t-2xl rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
          >
            <div className="w-full h-full overflow-hidden relative">
              <motion.div
                initial={{ y: 0 }}
                whileHover={{ y: "-60%" }}
                transition={{ duration: 3, ease: "easeInOut" }}
                className="w-full h-full"
              >
                <Image
                  src={portfolio.img}
                  alt="portfolio"
                  className="w-full h-auto object-cover cursor-pointer"
                />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default OurAchievementSection;
