"use client";
import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

import { logoPricingData } from "@/content/services/logo-landing-content/logo-landing-content";

// Logo categories
const logoCategories = [
  { id: "twoDLogoDesign", name: "2D Logo Design" },
  { id: "threeDLogoDesign", name: "3D Logo Design" },
  { id: "animatedLogoDesign", name: "Animated Logo Design" },
  { id: "minimalLogoDesign", name: "Minimal Logo Design" },
  { id: "mascotLogoDesign", name: "Mascot Logo Design" },
  { id: "wordmarkLogoDesign", name: "Wordmark Logo Design" },
  { id: "customizeLogoDesign", name: "Customize Logo Design" },
];

// Fade Animation Variants (Different from swipe)
const fadeVariants = {
  enter: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
  },
};

// HEADER SECTION
const Header = () => (
  <header className="relative text-center mb-12 md:mb-16 px-4 z-10">
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-200/50 dark:bg-red-900/30 rounded-full filter blur-3xl opacity-40 -z-10"
      aria-hidden="true"
    ></div>

    <div
      className="flex justify-center mb-4 animate-fade-in-down"
      style={{ animationDelay: "0.2s" }}
    >
      <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-orange-900/30 text-blue-700 text-xs font-bold px-3 py-1 rounded-full tracking-wider">
        <span className="w-2 h-2 bg-primary rounded-full"></span>
        OVER 10,000 USERS
      </div>
    </div>

    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-heading leading-tight tracking-tighter animate-fade-in-down">
      Find the Perfect Plan to <br />
      <span className="text-primary-hover">Power Your Brand</span>
    </h1>

    <p
      className="text-paragraph mt-6 text-base sm:text-lg max-w-2xl mx-auto animate-fade-in-down"
      style={{ animationDelay: "0.4s" }}
    >
      Find the perfect plan to bring your ideas to life and elevate your brand
      with confidence.
    </p>
  </header>
);

export default function LogoPricing() {
  const [activeCategory, setActiveCategory] = useState("twoDLogoDesign");

  const currentPricingPlans =
    logoPricingData[activeCategory as keyof typeof logoPricingData] || [];

  const handleCategoryChange = (newCategory: string) => {
    if (newCategory === activeCategory) return;
    setActiveCategory(newCategory);
  };

  return (
    <>
      <style>{`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out both;
        }
      `}</style>

      <div className="relative font-sans flex flex-col items-center justify-center overflow-x-hidden bg-white">
        <div className="layout-standard section-padding-standard py-16 md:py-20">
          <Header />

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-16 max-w-5xl mx-auto">
            {logoCategories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => handleCategoryChange(category.id)}
                className="cta-button-02 !border-primary min-w-[160px] hover:bg-primary-hover text-base font-semibold py-5 px-5"
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Pricing Cards with Fade Animation */}
          <main className="relative min-h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                variants={fadeVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-10 lg:gap-y-20 items-stretch mx-auto"
              >
                {currentPricingPlans.map((plan, index) => {
                  const Icon = plan.icon;

                  return (
                    <article
                      key={index}
                      className={`relative p-6 md:p-8 rounded-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 ${
                        plan.isFeatured
                          ? "bg-gradient-to-r from-[#3B82F6] to-[#0F172A] text-white shadow-2xl lg:scale-105"
                          : "bg-[#F1F5F9] text-heading shadow-lg"
                      }`}
                    >
                      {/* Dynamic Badge */}
                      {plan.badge && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <span className="inline-flex items-center rounded-full bg-gray-200/80 text-primary text-xs font-semibold px-3 py-1 backdrop-blur">
                            {plan.badge}
                          </span>
                        </div>
                      )}

                      {/* Plan Icon & Name */}
                      <div className="flex items-center gap-3 mb-6">
                        <Icon
                          className={`w-6 h-6 ${
                            plan.isFeatured
                              ? "text-gray-300"
                              : "text-primary-hover"
                          }`}
                        />
                        <h3
                          className={`text-base font-bold tracking-widest uppercase ${
                            plan.isFeatured ? "text-white" : "text-gray-600"
                          }`}
                        >
                          {plan.plan}
                        </h3>
                      </div>

                      {/* Price */}
                      <div className="mb-6 flex items-baseline gap-1.5">
                        {plan.plan === "Custom-Package" ? (
                          <span
                            className={`text-3xl font-bold ${
                              plan.isFeatured ? "text-white" : "text-heading"
                            }`}
                          >
                            {plan.price}
                          </span>
                        ) : (
                          <span
                            className={`text-4xl sm:text-5xl font-bold ${
                              plan.isFeatured ? "text-white" : "text-heading"
                            }`}
                          >
                            ${plan.price}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p
                        className={`mb-8 text-base font-medium ${
                          plan.isFeatured ? "text-white/85" : "text-paragraph"
                        }`}
                      >
                        {plan.description}
                      </p>

                      {/* Button */}
                      <div className="mb-8">
                        <button
                          type="button"
                          className={`w-full text-center py-3.5 rounded-lg font-semibold text-md transition-all duration-300 ease-in-out transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                            plan.isFeatured
                              ? "bg-white text-blue-700 hover:text-blue-800 ring-orange-500 ring-offset-orange-500/20"
                              : "bg-gray-200 text-gray-800 hover:bg-gray-300 ring-gray-300 ring-offset-white"
                          }`}
                        >
                          Get Started
                        </button>
                      </div>

                      {/* Features */}
                      <ul className="space-y-4">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div
                              className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                                plan.isFeatured ? "bg-white/25" : "bg-gray-200"
                              }`}
                            >
                              <CheckCircle
                                className={`${
                                  plan.isFeatured
                                    ? "text-white"
                                    : "text-primary"
                                } w-3.5 h-3.5`}
                              />
                            </div>
                            <span
                              className={`text-sm font-medium ${
                                plan.isFeatured
                                  ? "text-white/90"
                                  : "text-paragraph"
                              }`}
                            >
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </>
  );
}
