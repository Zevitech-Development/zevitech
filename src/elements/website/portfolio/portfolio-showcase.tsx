"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  portfolioData,
  categories,
} from "@/content/portfolio/portfolio-page-content";

import { cn } from "@/lib/utils";

import LaptopImg from "../../../../public/images/listing-macbook-img.png";

import { FaArrowRightLong } from "react-icons/fa6";

import DailogLeadForm from "@/components/forms/dailog-lead-form";
import { OpenLiveChat } from "@/utils/open-live-chat";
import { isLightBackground } from "./portfolio-utils";
import type { PortfolioItem } from "@/interfaces/components-partials-interface";

const GRID_CATEGORIES = ["mobile", "custom-projects"];

export default function PortfolioShowcase() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems = useMemo(() => {
    return activeCategory === "all"
      ? portfolioData
      : portfolioData.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const websiteItems = filteredItems.filter(
    (item) => !GRID_CATEGORIES.includes(item.category),
  );
  const gridItems = filteredItems.filter((item) =>
    GRID_CATEGORIES.includes(item.category),
  );

  return (
    <div className="bg-background">
      {/* Portfolio Tabs */}
      <div className="z-30 bg-background section-padding-standard !pb-8">
        <div className="layout-standard">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <Button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "relative px-5 py-5 flex items-center gap-2.5 rounded-full font-medium animation-standard",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary"
                      : "bg-card text-card-foreground border border-border hover:border-primary/40 hover:text-primary",
                  )}
                >
                  {category.label}
                  <category.icon className="w-4 h-4" />
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Website case studies — contained, alternating blocks */}
          {websiteItems.length > 0 && (
            <div className="layout-standard flex flex-col gap-16 md:gap-20 lg:gap-24 py-4 md:py-8">
              {websiteItems.map((item, index) => (
                <WebsiteCaseStudy key={item.id} item={item} index={index} />
              ))}
            </div>
          )}

          {/* Mobile apps / custom projects — card grid */}
          {gridItems.length > 0 && (
            <div
              className={cn(
                "layout-standard section-padding-standard",
                websiteItems.length > 0 && "!pt-8",
              )}
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {gridItems.map((item, index) => (
                  <PortfolioCard key={item.id} item={item} index={index} />
                ))}
              </div>
            </div>
          )}

          {filteredItems.length === 0 && (
            <div className="layout-standard section-padding-standard text-center text-paragraph">
              More projects in this category are coming soon.
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function WebsiteCaseStudy({
  item,
  index,
}: {
  item: PortfolioItem;
  index: number;
}) {
  const light = isLightBackground(item.bgColor);
  const imageLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "relative rounded-3xl overflow-hidden",
        light
          ? "border border-border shadow-sm"
          : "ring-1 ring-black/5 shadow-lg",
        item.bgColor,
      )}
    >
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center p-8 md:p-12 lg:p-16">
        {/* Laptop Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className={cn("relative", imageLeft ? "" : "lg:order-2")}
        >
          <div className="relative max-w-md mx-auto lg:max-w-none">
            <Image
              src={LaptopImg || "/placeholder.svg"}
              alt="Laptop mockup"
              width={800}
              height={500}
              className="w-full drop-shadow-2xl"
            />
            <div className="absolute inset-0 flex-center">
              <div className="w-[78%] h-[85%] overflow-hidden rounded-lg shadow-xl mb-[4%]">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className={cn("space-y-6", imageLeft ? "" : "lg:order-1")}>
          <Badge
            className={cn(
              "uppercase tracking-wider text-[11px] font-semibold",
              light
                ? "bg-black/10 text-black border-transparent"
                : "bg-white/10 text-white border-transparent",
            )}
          >
            Case Study
          </Badge>

          <h2
            className={cn(
              "text-2xl md:text-3xl lg:text-4xl font-bold font-heading leading-tight",
              light ? "text-black" : "text-white",
            )}
          >
            {item.title}
          </h2>
          <p
            className={cn(
              "text-base md:text-lg leading-relaxed",
              light ? "text-paragraph" : "text-gray-300",
            )}
          >
            {item.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {item.technologies.map((tech, techIndex) => (
              <span
                key={`${item.id}-tech-${techIndex}`}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium",
                  light
                    ? "bg-black/5 text-paragraph"
                    : "bg-white/10 text-gray-200",
                )}
              >
                {typeof tech.icon === "string" ? tech.icon : <tech.icon />}
                {tech.name}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button
              onClick={OpenLiveChat}
              variant="outline"
              size="lg"
              className={cn(
                "border-2 animation-standard font-medium",
                light
                  ? "border-black text-black hover:bg-black hover:text-white"
                  : "border-white text-black hover:bg-gray-300 hover:text-black",
              )}
            >
              Chat Now
            </Button>
            <DailogLeadForm
              trigger={
                <Button
                  size="lg"
                  className="flex items-center gap-2 animation-standard font-medium bg-primary hover:bg-primary-hover text-white"
                >
                  Let&apos;s Get Started
                  <FaArrowRightLong />
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PortfolioCard({
  item,
  index,
}: {
  item: PortfolioItem;
  index: number;
}) {
  const isMobile = item.category === "mobile";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: (index % 3) * 0.08 }}
      className="group relative rounded-2xl border border-border bg-card overflow-hidden animation-standard hover:-translate-y-1 hover:shadow-xl"
    >
      <div
        className={cn(
          "relative overflow-hidden bg-secondary-background",
          isMobile ? "aspect-[4/5]" : "aspect-[4/3]",
        )}
      >
        <Image
          src={(isMobile ? item.video : item.image) || "/placeholder.svg"}
          alt={item.title}
          fill
          className="object-cover animation-standard group-hover:scale-110"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 animation-standard flex flex-col justify-end p-5">
          <div className="flex flex-wrap gap-2 mb-3">
            {item.technologies.slice(0, 4).map((tech, techIndex) => (
              <span
                key={`${item.id}-hover-tech-${techIndex}`}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/15 text-white backdrop-blur-sm"
              >
                {typeof tech.icon === "string" ? tech.icon : <tech.icon />}
                {tech.name}
              </span>
            ))}
          </div>
          <DailogLeadForm
            trigger={
              <Button
                size="sm"
                className="w-fit flex items-center gap-2 font-medium bg-primary hover:bg-primary-hover text-white"
              >
                Let&apos;s Get Started
                <FaArrowRightLong className="text-xs" />
              </Button>
            }
          />
        </div>
      </div>

      <div className="p-5 space-y-2">
        <h3 className="font-heading font-bold text-lg text-heading leading-snug line-clamp-1">
          {item.title}
        </h3>
        <p className="text-sm text-paragraph leading-relaxed line-clamp-2">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}
