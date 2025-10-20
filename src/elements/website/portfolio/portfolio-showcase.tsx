"use client";
import { useState, useMemo } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import {
  portfolioData,
  categories,
} from "@/content/portfolio/portfolio-page-content";

import { cn } from "@/lib/utils";

import LaptopImg from "../../../../public/images/listing-macbook-img.png";

import { FaArrowRightLong } from "react-icons/fa6";

import MobileAppLayout from "./mobile-app-layout";
import DailogLeadForm from "@/components/forms/dailog-lead-form";
import { OpenLiveChat } from "@/utils/open-live-chat";

export default function PortfolioShowcase() {
  const [activeCategory, setActiveCategory] = useState("all");

  // Use useMemo to optimize filtering and ensure it runs when dependencies change
  const filteredItems = useMemo(() => {
    const result =
      activeCategory === "all"
        ? portfolioData
        : portfolioData.filter((item) => item.category === activeCategory);

    return result;
  }, [activeCategory]);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  return (
    <div className="bg-background">
      {/* Portfolio Tabs */}
      <div className="bg-muted/30 section-padding-standard">
        <div className="layout-standard">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={cn(
                  "px-6 py-5 flex items-center gap-3 rounded-lg font-medium transition-all duration-300",
                  "hover:bg-primary/10 hover:text-primary",
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground hover:text-black/70 shadow-lg"
                    : "bg-card text-card-foreground border border-border"
                )}
              >
                {category.label}
                <category.icon className="w-20 h-20" />
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio Showcase */}
      <div className="">
        {filteredItems.map((item, index) => (
          <div key={`${item.id}-${item.category}-${index}`}>
            {/* Check if item category is mobile, not activeCategory */}
            {item.category === "mobile" ? (
              <MobileAppLayout item={item} />
            ) : (
              // Default layout for all other categories
              <div
                className={cn(
                  "flex items-center py-16 md:py-24 lg:py-28",
                  item.bgColor
                )}
              >
                <div className="layout-standard grid lg:grid-cols-2 gap-12 items-center">
                  {/* Laptop Mockup */}
                  <div className="relative">
                    <div className="relative">
                      <Image
                        src={LaptopImg || "/placeholder.svg"}
                        alt="Laptop mockup"
                        width={800}
                        height={500}
                        className="w-full"
                      />
                      <div className="absolute inset-0 flex-center">
                        <div className="w-[78%] h-[85%] overflow-hidden rounded-lg shadow-2xl mb-[4%]">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            width={600}
                            height={400}
                            className="w-full h-full object-cover transition-all duration-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h2
                        className={cn(
                          "text-3xl md:text-4xl lg:text-5xl font-bold font-heading leading-tight",
                          item.bgColor.includes("white")
                            ? "text-black"
                            : "text-white"
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
                        onClick={OpenLiveChat}
                        variant="outline"
                        size="lg"
                        className={cn(
                          "border-2 transition-all duration-300 font-medium",
                          item.bgColor.includes("white")
                            ? "border-black text-black hover:bg-black hover:text-white"
                            : "border-white text-black hover:bg-gray-300 hover:text-black"
                        )}
                      >
                        Chat Now
                      </Button>
                      <DailogLeadForm
                        trigger={
                          <Button
                            size="lg"
                            className={cn(
                              "flex items-center transition-all font-medium duration-300 bg-primary hover:bg-primary-hover text-white"
                            )}
                          >
                            Let&apos;s Get Started
                            <FaArrowRightLong />
                          </Button>
                        }
                      />
                    </div>

                    {/* Technologies */}
                    <div className="space-y-6">
                      <h3
                        className={cn(
                          "text-sm font-semibold uppercase tracking-wider",
                          item.bgColor.includes("white")
                            ? "text-paragraph"
                            : "text-gray-400"
                        )}
                      >
                        TECHNOLOGIES & TOOLS USED
                      </h3>
                      <div className="grid grid-cols-4 gap-4 max-w-xs">
                        {item.technologies.map((tech, techIndex) => (
                          <div
                            key={`${item.id}-tech-${techIndex}`}
                            className="flex flex-col items-center space-y-2"
                          >
                            <div
                              className={cn(
                                "flex-center w-16 h-16 rounded-full transition-all duration-300 hover:scale-110",
                                item.bgColor.includes("white")
                                  ? "bg-gray-100 border-2 border-gray-400"
                                  : "bg-gray-800 border-2 border-gray-600 hover:border-gray-400"
                              )}
                            >
                              <span className="text-2xl">
                                {typeof tech.icon === "string" ? (
                                  tech.icon
                                ) : (
                                  <tech.icon />
                                )}
                              </span>
                            </div>
                            <span
                              className={cn(
                                "text-xs font-medium text-center",
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
