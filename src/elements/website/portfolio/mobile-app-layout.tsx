"use client";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { FaArrowRightLong } from "react-icons/fa6";

import type { PortfolioItem } from "@/interfaces/components-partials-interface";
import DailogLeadForm from "@/components/forms/dailog-lead-form";

interface MobileAppLayoutProps {
  item: PortfolioItem;
}

export default function MobileAppLayout({ item }: MobileAppLayoutProps) {
  return (
    <div
      className={cn("flex items-center py-16 md:py-24 lg:py-28", item.bgColor)}
    >
      <div className="layout-standard">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Content - Title and Description */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-4">
              <h2
                className={cn(
                  "text-3xl md:text-4xl lg:text-5xl font-bold font-heading leading-tight",
                  item.bgColor.includes("white") ? "text-black" : "text-white"
                )}
              >
                {item.title}
              </h2>
              <p
                className={cn(
                  "text-lg leading-relaxed",
                  item.bgColor.includes("white")
                    ? "text-paragraph"
                    : "text-gray-300"
                )}
              >
                {item.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                size="lg"
                className={cn(
                  "border-2 transition-all px-4 duration-300 font-medium",
                  item.bgColor.includes("white")
                    ? "border-black text-black hover:bg-black hover:text-white"
                    : "border-white hover:bg-white hover:text-black"
                )}
              >
                SEE DETAILS
              </Button>
              <DailogLeadForm
                trigger={
                  <Button
                    size="lg"
                    className={cn(
                      "flex items-center gap-2 px-4 transition-all font-medium duration-300",
                      item.bgColor.includes("white")
                        ? "bg-primary hover:bg-primary-hover text-white"
                        : "bg-primary hover:bg-primary-hover text-white"
                    )}
                  >
                    Let&apos;s Get Started
                    <FaArrowRightLong />
                  </Button>
                }
              />
            </div>
          </div>

          {/* Center - Phone Section */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-full flex-center">
              <div className="overflow-hidden rounded-[2rem]">
                {item.video ? (
                  <Image
                    src={item.video}
                    alt={item.title}
                    width={600}
                    height={800}
                    className="w-full h-[500px] xl:h-[600px] object-cover transition-all duration-500"
                  />
                ) : null}
              </div>
            </div>
          </div>

          {/* Right Content - Technologies */}
          <div className="lg:col-span-4 space-y-6">
            <h3
              className={cn(
                "text-sm md:text-lg font-semibold uppercase tracking-wider text-left",
                item.bgColor.includes("white")
                  ? "text-paragraph"
                  : "text-gray-400"
              )}
            >
              TECHNOLOGIES & TOOLS USED
            </h3>
            <div className="flex flex-wrap gap-5">
              {item.technologies.map((tech, techIndex) => (
                <div
                  key={`${item.id}-tech-${techIndex}`}
                  className="flex flex-col items-center space-y-2"
                >
                  <div
                    className={cn(
                      "flex-center w-14 h-14 md:w-16 md:h-16 rounded-lg transition-all duration-300 hover:scale-110",
                      item.bgColor.includes("white")
                        ? "bg-gray-100 border-2 border-gray-300"
                        : "bg-white/10 border-2 border-white/20 hover:border-white/40"
                    )}
                  >
                    <span className="text-xl md:text-2xl lg:text-3xl">
                      {typeof tech.icon === "string" ? (
                        tech.icon
                      ) : (
                        <tech.icon />
                      )}
                    </span>
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium text-center leading-tight",
                      item.bgColor.includes("white")
                        ? "text-gray-600"
                        : "text-gray-300"
                    )}
                  >
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
