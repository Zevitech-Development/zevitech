"use client";
import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { OpenLiveChat } from "@/utils/open-live-chat";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FeatureCategory, FeatureComparisonTable, Package } from "@/elements/website/pricing/feature-comparison-table";

// ✅ Import all pricing data
import {
  shopifyPackages,
  shopifyFeatures,
  twoDLogoPackages,
  twoDLogoFeatures,
  logo3DDesignPackages,
  logo3DDesignFeatures,
  animatedLogoPackages,
  animatedLogoFeatures,
  customizedLogoPackages,
  customizedLogoFeatures,
  minimalLogoPackages,
  minimalLogoFeatures,
  mascotLogoPackages,
  mascotLogoFeatures,
  wordmarkLogoPackages,
  wordmarkLogoFeatures,
  packagingDesignPackages,
  packagingDesignFeatures,
  socialMediaKitPackages,
  socialMediaKitFeatures,
  brandIdentityPackages,
  brandIdentityFeatures,
} from "@/content/services/services-pricing";

// ✅ Non-logo services
const services = [
  { id: "shopify", name: "Shopify Stores" },
  { id: "packaging", name: "Packaging Design" },
  { id: "socialMedia", name: "Social Media Kit" },
  { id: "brandIdentity", name: "Brand Identity" },
];

// ✅ Logo services (dropdown)
const logoServices = [
  { id: "logo2d", name: "2D Logo Design" },
  { id: "logo3d", name: "3D Logo Design" },
  { id: "logoAnimated", name: "Animated Logo Design" },
  { id: "logoMinimal", name: "Minimal Logo Design" },
  { id: "logoMascot", name: "Mascot Logo Design" },
  { id: "logoWordmark", name: "Wordmark Logo Design" },
  { id: "logoCustom", name: "Customize Logo Design" },
];

// ✅ Pricing Data Map

const pricingData: Record<string, { packages: Package[]; features: FeatureCategory[] }> = {
  shopify: { packages: shopifyPackages, features: shopifyFeatures },
  logo2d: { packages: twoDLogoPackages, features: twoDLogoFeatures },
  logo3d: { packages: logo3DDesignPackages, features: logo3DDesignFeatures },
  logoAnimated: { packages: animatedLogoPackages, features: animatedLogoFeatures },
  logoCustom: { packages: customizedLogoPackages, features: customizedLogoFeatures },
  logoMinimal: { packages: minimalLogoPackages, features: minimalLogoFeatures },
  logoMascot: { packages: mascotLogoPackages, features: mascotLogoFeatures },
  logoWordmark: { packages: wordmarkLogoPackages, features: wordmarkLogoFeatures },
  packaging: { packages: packagingDesignPackages, features: packagingDesignFeatures },
  socialMedia: { packages: socialMediaKitPackages, features: socialMediaKitFeatures },
  brandIdentity: { packages: brandIdentityPackages, features: brandIdentityFeatures },
};

// ✅ Motion Variants for Swipe Effect
const swipeVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
    position: "absolute" as const,
  }),
  center: {
    x: 0,
    opacity: 1,
    position: "relative" as const,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -200 : 200,
    opacity: 0,
    position: "absolute" as const,
  }),
};

export default function PricingSection() {
  const [activeService, setActiveService] = useState("shopify");
  const [direction, setDirection] = useState(1);

  const { packages, features } = pricingData[activeService] || {};

  const handleServiceChange = (newService: string) => {
    if (newService === activeService) return;
    setDirection(
      logoServices.findIndex((s) => s.id === newService) >
        logoServices.findIndex((s) => s.id === activeService)
        ? 1
        : -1
    );
    setActiveService(newService);
  };

  return (
    <section className="layout-standard section-padding-standard">
      {/* Header */}
      <div className="flex flex-col items-center gap-6 text-center mb-12">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-6xl xl:text-8xl font-bold font-heading text-blue-heading tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Professional <span className="text-primary">Services</span>
        </motion.h2>
        <p className="text-lg md:text-lg text-paragraph font-medium max-w-3xl">
          Choose the perfect plan for your creative needs. From logo design to
          full-scale web development.
        </p>
      </div>

      {/* Service Tabs */}
      <div className="flex flex-wrap justify-center gap-5 mb-10 md:mx-10 lg:mx-16">
        {services.map((service) => (
          <Button
            key={service.id}
            variant={activeService === service.id ? "default" : "outline"}
            onClick={() => handleServiceChange(service.id)}
            className="hover:bg-primary-hover hover:text-white w-[150px]"
          >
            {service.name}
          </Button>
        ))}

        {/* Logo Services Dropdown */}
        <Select onValueChange={(value) => handleServiceChange(value)}>
          <SelectTrigger className="w-[200px] text-paragraph text-sm hover:bg-gray-100 font-medium flex items-center justify-between">
            <span className="flex-1 text-center">
              <SelectValue placeholder="Select Logo Service" />
            </span>
          </SelectTrigger>

          <SelectContent>
            {logoServices.map((logo) => (
              <SelectItem
                className="hover:bg-blue-100 focus:bg-blue-500 focus:text-white"
                key={logo.id}
                value={logo.id}
              >
                {logo.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Swipe Animation for Feature Table */}
      <div className="relative min-h-[400px]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={activeService}
            custom={direction}
            variants={swipeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="w-full"
          >
            {packages && features && (
              <FeatureComparisonTable
                packages={packages}
                featuresData={features}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer CTA */}
      <div className="text-center mt-16">
        <p className="text-paragraph mb-4">
          Need a custom solution? Let&apos;s discuss your specific requirements.
        </p>
        <Button
          onClick={OpenLiveChat}
          className="cta-button h-[60px] md:px-6 bg-transparent border-4 border-primary group lg:hover:scale-105 rounded-full text-black md:text-xl text-base lg:!animation-standard font-bold"
        >
          Chat Now
        </Button>
      </div>
    </section>
  );
}
