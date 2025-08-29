import React from "react";

import StatsSection from "@/sections/website/services/branding/stats-section";
import { ServicesPorfolioSection01 } from "@/components/common/services-porfolio-sections";
import AboutSection from "@/sections/website/services/branding/about-section";
import { ServicesProcessSection01 } from "@/components/common/services-process-sections";
import FaqSection from "@/components/common/faq-section";

import WhyChooseUsCustomizeImg01 from "../../../../../../public/images/services/branding/why-choose-us-customize-01.png";
import WhyChooseUsCustomizeImg02 from "../../../../../../public/images/services/branding/why-choose-us-customize-02.jpg";
import WhyChooseUsCustomizeImg03 from "../../../../../../public/images/services/branding/why-choose-us-customize-03.jpg";
import { FaSearchPlus, FaPencilRuler, FaCheckDouble } from "react-icons/fa";
import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import CTA02 from "@/components/common/cta02";
import CampaignsSection from "@/elements/website/home/campaigns";
import ContactSection from "@/elements/website/home/home-contact-section";
import ServicesHeroSections01 from "@/components/common/services-hero-sections";
import { PortfolioCustomizeLogoDesignContent } from "@/content/services/branding-content";
import { FaqDataCustomizeLogoDesign } from "@/content/services/logo-design-services/logo-design-services-content";

import BrandingDesignBadgeIcon01 from "../../../../../../public/icons/branding-design-badge-icon-01.webp";
import BrandingDesignBadgeIcon02 from "../../../../../../public/icons/branding-design-badge-icon-02.webp";
import BrandingDesignBadgeIcon03 from "../../../../..//../public/icons/branding-design-badge-icon-03.webp";
import BrandingDesignBadgeIcon04 from "../../../../..//../public/icons/branding-design-badge-icon-04.jpg";
import BrandingDesignBadgeIcon05 from "../../../../..//../public/icons/branding-design-badge-icon-05.jpg";
import BrandingDesignBadgeIcon06 from "../../../../..//../public/icons/branding-design-badge-icon-06.jpg";

import HeroImage from "../../../../../../public/images/2d-image.png";
// import { FeatureComparisonTable } from "@/components/common/pricing-card";
// import {
//   customizedLogoFeatures,
//   customizedLogoPackages,
// } from "@/content/services/services-pricing";

function CustomizeDesignServicePage() {
  return (
    <main className="page-layout-standard">
      <ServicesHeroSections01
        title="Custom Logo Design Tailored to Your Brand Vision"
        desc="We design fully customized logos that reflect your brand's unique personality and values. Get a logo that's original, versatile, and aligned with your business goals."
      />
      <StatsSection />
      <WhyChooseUsSection01
        img01={WhyChooseUsCustomizeImg01}
        img02={WhyChooseUsCustomizeImg02}
        img03={WhyChooseUsCustomizeImg03}
        title="Why Choose Zevitech for Custom Logo Design?"
        desc01="We specialize in creating original, tailored logo designs that perfectly align with your brand's personality and target audience."
        desc02="Our process ensures your logo is distinctive, versatile, and crafted to leave a lasting impression across all mediums."
      />

      <CTA02
        backgroundClass="bg-about-cta"
        heading="Get a Logo That’s Truly Yours"
        text="Tailored designs made to match your brand’s unique style, vision, and personality."
      />

      <ServicesPorfolioSection01
        title="Custom Logos That Truly Represent Your Brand"
        description="Explore our collection of fully customized logos, each thoughtfully designed to align with a brand’s core identity, voice, and long-term vision. No templates—just original, strategy-driven design."
        portfolioImages={PortfolioCustomizeLogoDesignContent}
      />
      <AboutSection
        badge={{ text: "About Custom Logo Design" }}
        heading="Tailored Logo Designs for Your Unique Vision"
        paragraphs={[
          "Your brand is one-of-a-kind—your logo should be too. We craft fully custom logos that align perfectly with your vision, market, and voice.",
          "From concept to final polish, every detail is designed to make your brand identity stand out.",
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
        title="Our 3 Step Custom Logo Design Process"
        description="We craft 100% original logos tailored to your brand’s personality, ensuring uniqueness, clarity, and long-term brand value."
        process01Icon={
          <FaSearchPlus className="text-primary text-3xl sm:text-4xl" />
        }
        process01Title="Brand Discovery"
        process01Desc="We dive into your brand story, values, and audience to define a creative direction aligned with your vision."
        process02Icon={
          <FaPencilRuler className="text-primary text-3xl sm:text-4xl" />
        }
        process02Title="Concept Design"
        process02Desc="Our designers create multiple logo concepts, refining the style, color, and typography based on your feedback."
        process03Icon={
          <FaCheckDouble className="text-primary text-3xl sm:text-4xl" />
        }
        process03Title="Final Delivery"
        process03Desc="Once approved, we deliver high-resolution logo files with variations for web, print, and social usage."
      />

      <ContactSection />

      {/* <section className="section-padding-standard bg-slate-50 py-14 lg:py-20">
        <div className="layout-standard">
          <div className="text-center flex flex-col items-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-heading max-w-3xl font-bold font-heading tracking-wider">
              Get Your <span className="text-primary">Customized</span> Logos
              Designed Now!
            </h2>
            <p className="mt-4 text-lg text-paragraph max-w-2xl mx-auto">
              We offer budget-friendly Shopify store design services, ensuring a
              professional and engaging online platform for your business.
            </p>
          </div>

          <FeatureComparisonTable
            packages={customizedLogoPackages}
            featuresData={customizedLogoFeatures}
          />
        </div>
      </section> */}

      <FaqSection faqs={FaqDataCustomizeLogoDesign} />
    </main>
  );
}

export default CustomizeDesignServicePage;
