import React from "react";

import StatsSection from "@/sections/website/services/branding/stats-section";
import { ServicesPorfolioSection01 } from "@/components/common/services-porfolio-sections";
import AboutSection from "@/sections/website/services/branding/about-section";
import { ServicesProcessSection01 } from "@/components/common/services-process-sections";
import FaqSection from "@/components/common/faq-section";

import WhyChooseUsMinimalImg01 from "../../../../../../public/images/services/branding/why-choose-us-minimal-01.jpg";
import WhyChooseUsMinimalImg02 from "../../../../../../public/images/services/branding/why-choose-us-minimal-02.jpg";
import WhyChooseUsMinimalImg03 from "../../../../../../public/images/services/branding/why-choose-us-minimal-03.jpg";
import { LuPenTool, LuShapes, LuBox } from "react-icons/lu";
import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import ServicesHeroSections01 from "@/components/common/services-hero-sections";
import CTA02 from "@/components/common/cta02";
import CampaignsSection from "@/elements/website/home/campaigns";
import ContactSection from "@/elements/website/home/home-contact-section";
// import { FeatureComparisonTable } from "@/components/common/pricing-card";
import { PortfolioMinimalLogoDesignContent } from "@/content/services/branding-content";
import { FaqDataMinimalLogoDesign } from "@/content/services/logo-design-services/logo-design-services-content";
// import {
//   minimalLogoFeatures,
//   minimalLogoPackages,
// } from "@/content/services/services-pricing";

import BrandingDesignBadgeIcon01 from "../../../../../../public/icons/branding-design-badge-icon-01.webp";
import BrandingDesignBadgeIcon02 from "../../../../../../public/icons/branding-design-badge-icon-02.webp";
import BrandingDesignBadgeIcon03 from "../../../../..//../public/icons/branding-design-badge-icon-03.webp";
import BrandingDesignBadgeIcon04 from "../../../../..//../public/icons/branding-design-badge-icon-04.jpg";
import BrandingDesignBadgeIcon05 from "../../../../..//../public/icons/branding-design-badge-icon-05.jpg";
import BrandingDesignBadgeIcon06 from "../../../../..//../public/icons/branding-design-badge-icon-06.jpg";

import HeroImage from "../../../../../../public/images/2d-image.png";

function MinimalDesignServicePage() {
  return (
    <main className="page-layout-standard">
      <ServicesHeroSections01
        title="Minimal Logo Design for Clean, Timeless Branding"
        desc="We craft sleek and sophisticated minimal logos that convey your brand's essence with simplicity. Perfect for modern businesses seeking an elegant and professional look."
      />
      <StatsSection />
      <WhyChooseUsSection01
        img01={WhyChooseUsMinimalImg01}
        img02={WhyChooseUsMinimalImg02}
        img03={WhyChooseUsMinimalImg03}
        title="Why Choose Zevitech for Minimal Logo Design?"
        desc01="We specialize in designing clean, modern logos that communicate your brand's identity with clarity and sophistication."
        desc02="Our minimal designs are versatile, timeless, and perfect for businesses that value simplicity and elegance."
      />

      <CTA02
        backgroundClass="bg-about-cta"
        heading="Design Your Minimal Logo Today"
        text="Clean, modern, and timeless logos that speak volumes with simplicity."
      />

      <ServicesPorfolioSection01
        title="Minimal Logo Designs That Speak Volumes"
        description="Explore our sleek and sophisticated minimal logo designs—crafted with simplicity, clarity, and modern aesthetics to ensure your brand leaves a lasting impression with less."
        portfolioImages={PortfolioMinimalLogoDesignContent}
      />
      <AboutSection
        badge={{ text: "About Minimal Logo Design" }}
        heading="Less Is More — Timeless Minimal Branding"
        paragraphs={[
          "Our minimal logo designs focus on clean lines, smart typography, and elegant simplicity—perfect for premium and modern brands.",
          "We design with purpose, ensuring your logo communicates your identity without the clutter.",
        ]}
        buttons={{
          primary: {
            text: "Get Started",
          },
          secondary: {
            text: "Chat Now",
          },
        }}
        badges={[
          {
            src: BrandingDesignBadgeIcon01,
            alt: "Branding & Design Badge",
            width: 70,
          },
          {
            src: BrandingDesignBadgeIcon02,
            alt: "Branding & Design Badge",
            width: 70,
          },
          {
            src: BrandingDesignBadgeIcon03,
            alt: "Branding & Design Badge",
            width: 75,
          },
          {
            src: BrandingDesignBadgeIcon04,
            alt: "Branding & Design Badge",
            width: 80,
          },
          {
            src: BrandingDesignBadgeIcon05,
            alt: "Branding & Design Badge",
            width: 90,
          },
          {
            src: BrandingDesignBadgeIcon06,
            alt: "Branding & Design Badge",
            width: 60,
          },
        ]}
        rightSideImage={{
          src: HeroImage,
          alt: "Zevitech Design & Branding showcase",
          className: "shadow-lg",
        }}
      />

      <CampaignsSection />

      <ServicesProcessSection01
        title="Our 3 Step Minimal Logo Design Process"
        description="We distill your brand essence into simple, powerful marks that are timeless, versatile, and instantly recognizable."
        process01Icon={
          <LuPenTool className="text-primary text-3xl sm:text-4xl" />
        }
        process01Title="Concept Ideation"
        process01Desc="We brainstorm abstract and minimal concepts that align with your brand identity and industry."
        process02Icon={
          <LuShapes className="text-primary text-3xl sm:text-4xl" />
        }
        process02Title="Shape Design & Balance"
        process02Desc="Our designers craft geometric forms with perfect proportion and whitespace for visual impact."
        process03Icon={<LuBox className="text-primary text-3xl sm:text-4xl" />}
        process03Title="Delivery & Usage Guide"
        process03Desc="Receive scalable vector files with clear usage guidelines for consistent branding everywhere."
      />

      <ContactSection />

      {/* <section className="section-padding-standard bg-slate-50 py-14 lg:py-20">
        <div className="layout-standard">
          <div className="text-center flex flex-col items-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-heading max-w-3xl font-bold font-heading tracking-wider">
              Get Your <span className="text-primary">Minimal</span> Logos
              Designed Now!
            </h2>
            <p className="mt-4 text-lg text-paragraph max-w-2xl mx-auto">
              Our minimal logo design packages focus on simplicity and elegance,
              creating timeless visuals that represent your brand with clarity.
            </p>
          </div>

          <FeatureComparisonTable
            packages={minimalLogoPackages}
            featuresData={minimalLogoFeatures}
          />
        </div>
      </section> */}

      <FaqSection faqs={FaqDataMinimalLogoDesign} />
    </main>
  );
}

export default MinimalDesignServicePage;
