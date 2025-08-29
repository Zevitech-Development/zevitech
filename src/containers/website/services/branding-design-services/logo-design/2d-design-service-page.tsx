import ServicesHeroSections01 from "@/components/common/services-hero-sections";
import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import StatsSection from "@/sections/website/services/branding/stats-section";
import React from "react";

import WhyChooseUs2DImg01 from "../../../../../../public/images/services/branding/why-choose-us-2d-01.png";
import WhyChooseUs2DImg02 from "../../../../../../public/images/services/branding/why-choose-us-2d-02.jpg";
import WhyChooseUs2DImg03 from "../../../../../../public/images/services/branding/why-choose-us-2d-03.jpg";

import { ServicesPorfolioSection01 } from "@/components/common/services-porfolio-sections";
import { Portfolio2DLogoDesignContent } from "@/content/services/branding-content";
// import {
//   twoDLogoFeatures,
//   twoDLogoPackages,
// } from "@/content/services/services-pricing";
import AboutSection from "@/sections/website/services/branding/about-section";
import { ServicesProcessSection01 } from "@/components/common/services-process-sections";
import { FaLightbulb, FaPenNib } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { FaqData2DLogoDesign } from "@/content/services/logo-design-services/logo-design-services-content";
import FaqSection from "@/components/common/faq-section";
import CTA02 from "@/components/common/cta02";
import CampaignsSection from "@/elements/website/home/campaigns";
import ContactSection from "@/elements/website/home/home-contact-section";
// import { FeatureComparisonTable } from "@/components/common/pricing-card";

import BrandingDesignBadgeIcon01 from "../../../../../../public/icons/branding-design-badge-icon-01.webp";
import BrandingDesignBadgeIcon02 from "../../../../../../public/icons/branding-design-badge-icon-02.webp";
import BrandingDesignBadgeIcon03 from "../../../../..//../public/icons/branding-design-badge-icon-03.webp";
import BrandingDesignBadgeIcon04 from "../../../../..//../public/icons/branding-design-badge-icon-04.jpg";
import BrandingDesignBadgeIcon05 from "../../../../..//../public/icons/branding-design-badge-icon-05.jpg";
import BrandingDesignBadgeIcon06 from "../../../../..//../public/icons/branding-design-badge-icon-06.jpg";

import HeroImage from "../../../../../../public/images/2d-image.webp";
  
const Design2dServicePage = () => {
  return (
    <main className="page-layout-standard">
      <ServicesHeroSections01
        title="2D Logo Design – Clean, Simple & Versatile"
        desc="We create clean, memorable, and custom 2D logos that represent your brand's identity. Perfect for startups, small businesses, and enterprises ready to stand out."
      />
      <StatsSection />

      <WhyChooseUsSection01
        img01={WhyChooseUs2DImg01}
        img02={WhyChooseUs2DImg02}
        img03={WhyChooseUs2DImg03}
        title="Why Choose Zevitech for Your Brand Identity?"
        desc01="At Zevitech, we don’t just design logos — we craft brand experiences. Our team builds cohesive, memorable brand identities that reflect your business’s purpose and values."
        desc02="Whether you’re launching a startup or refreshing an existing brand, we deliver professional, consistent designs that make you instantly recognizable and trusted in your market."
      />

      <CTA02
        backgroundClass="bg-about-cta"
        heading="Craft Your Perfect 2D Logo Today"
        text="Simple, creative, and impactful designs that bring your brand identity to life."
      />

      <ServicesPorfolioSection01
        title="2D Logos That Define Our Brands"
        description="Discover clean, versatile 2D logos designed to make brands memorable and stand out across industries."
        portfolioImages={Portfolio2DLogoDesignContent}
      />

      <AboutSection
        badge={{ text: "About 2D Logo Design" }}
        heading="Clean & Memorable Logos That Speak Volumes"
        paragraphs={[
          "Our 2D logo designs are simple, sharp, and versatile—perfect for startups and modern brands that want clarity and instant recognition.",
          "With timeless aesthetics and scalable design, we ensure your brand looks great on all platforms—from business cards to billboards.",
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
        title="Our 3 Step 2D Logo Design Process"
        description="We follow a focused and collaborative approach to craft clean, timeless 2D logos that elevate your brand identity."
        process01Icon={
          <FaLightbulb className="text-primary text-3xl sm:text-4xl" />
        }
        process01Title="Discovery & Strategy"
        process01Desc="We begin by understanding your business, target audience, and design goals to set a strong creative direction."
        process02Icon={
          <FaPenNib className="text-primary text-3xl sm:text-4xl" />
        }
        process02Title="Concept Design"
        process02Desc="Our designers create multiple logo concepts focused on simplicity, uniqueness, and brand alignment."
        process03Icon={
          <FaCheckCircle className="text-primary text-3xl sm:text-4xl" />
        }
        process03Title="Refinement & Delivery"
        process03Desc="We finalize the chosen concept, refine it based on feedback, and deliver logo files in all formats you need."
      />

      <ContactSection />

      {/* <section className="section-padding-standard bg-slate-50 py-14 lg:py-20">
        <div className="layout-standard">
          <div className="text-center flex flex-col items-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-heading max-w-3xl font-bold font-heading tracking-wider">
              Get Your <span className="text-primary">2D</span> Logos Designed
              Now!
            </h2>
            <p className="mt-4 text-lg text-paragraph max-w-2xl mx-auto">
              Our 2D logo design packages deliver modern, versatile, and
              creative logos tailored to represent your business identity.
            </p>
          </div>

          <FeatureComparisonTable
            packages={twoDLogoPackages}
            featuresData={twoDLogoFeatures}
          />
        </div>
      </section> */}

      <FaqSection faqs={FaqData2DLogoDesign} />
    </main>
  );
};

export default Design2dServicePage;
