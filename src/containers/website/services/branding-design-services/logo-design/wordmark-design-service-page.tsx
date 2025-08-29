import React from "react";

import StatsSection from "@/sections/website/services/branding/stats-section";
import { ServicesPorfolioSection01 } from "@/components/common/services-porfolio-sections";
import AboutSection from "@/sections/website/services/branding/about-section";
import { ServicesProcessSection01 } from "@/components/common/services-process-sections";
import FaqSection from "@/components/common/faq-section";

import WhyChooseUsWordmarkImg01 from "../../../../../../public/images/services/branding/why-choose-us-wordmark-01.webp";
import WhyChooseUsWordmarkImg02 from "../../../../../../public/images/services/branding/why-choose-us-wordmark-02.jpeg";
import WhyChooseUsWordmarkImg03 from "../../../../../../public/images/services/branding/why-choose-us-wordmark-03.jpg";
import {
  TbLetterCaseUpper,
  TbTypography,
  TbLayoutDashboard,
} from "react-icons/tb";
import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import ServicesHeroSections01 from "@/components/common/services-hero-sections";
import CTA02 from "@/components/common/cta02";
import CampaignsSection from "@/elements/website/home/campaigns";
import ContactSection from "@/elements/website/home/home-contact-section";
import { PortfolioWordmarkLogoDesignContent } from "@/content/services/branding-content";
// import { FeatureComparisonTable } from "@/components/common/pricing-card";
import { FaqDataWordmarkLogoDesign } from "@/content/services/logo-design-services/logo-design-services-content";
// import {
//   wordmarkLogoFeatures,
//   wordmarkLogoPackages,
// } from "@/content/services/services-pricing";

import BrandingDesignBadgeIcon01 from "../../../../../../public/icons/branding-design-badge-icon-01.webp";
import BrandingDesignBadgeIcon02 from "../../../../../../public/icons/branding-design-badge-icon-02.webp";
import BrandingDesignBadgeIcon03 from "../../../../..//../public/icons/branding-design-badge-icon-03.webp";
import BrandingDesignBadgeIcon04 from "../../../../..//../public/icons/branding-design-badge-icon-04.jpg";
import BrandingDesignBadgeIcon05 from "../../../../..//../public/icons/branding-design-badge-icon-05.jpg";
import BrandingDesignBadgeIcon06 from "../../../../..//../public/icons/branding-design-badge-icon-06.jpg";

import HeroImage from "../../../../../../public/images/2d-image.png";

function WordmarkDesignServicePage() {
  return (
    <main className="page-layout-standard">
      <ServicesHeroSections01
        title="Wordmark Logo Design – Typography That Speaks Volumes"
        desc="We design elegant and distinctive wordmark logos that showcase your brand name with style and clarity. Perfect for businesses seeking a professional and memorable identity."
      />
      <StatsSection />
      <WhyChooseUsSection01
        img01={WhyChooseUsWordmarkImg01}
        img02={WhyChooseUsWordmarkImg02}
        img03={WhyChooseUsWordmarkImg03}
        title="Why Choose Zevitech for Wordmark Logo Design?"
        desc01="We create refined wordmark logos that present your brand name with style, professionalism, and impact."
        desc02="Our designs focus on typography and subtle detailing to ensure your brand stands out with a clean and memorable identity."
      />

      <CTA02
        backgroundClass="bg-about-cta"
        heading="Stand Out with Wordmark Logo Design"
        text="Clean, professional, and memorable text-based logos that define your brand identity."
      />

      <ServicesPorfolioSection01
        title="Wordmark Logos That Speak Your Brand's Name with Style"
        description="Browse our collection of custom wordmark logos—designed to transform your brand name into a distinctive, memorable visual identity with strategic typography and clean design."
        portfolioImages={PortfolioWordmarkLogoDesignContent}
      />
      <AboutSection
        badge={{ text: "About Wordmark Logo Design" }}
        heading="Typography-Driven Logos That Leave a Mark"
        paragraphs={[
          "Our wordmark logos focus on custom typography that makes your brand name unforgettable.",
          "Clean, stylish, and professional, wordmarks are ideal for brands that want their name to stand out with authority and style.",
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
        title="Our 3 Step Wordmark Logo Design Process"
        description="We create clean, distinctive wordmark logos that make your brand name instantly recognizable and timeless."
        process01Icon={
          <TbLetterCaseUpper className="text-primary text-3xl sm:text-4xl" />
        }
        process01Title="Typography Exploration"
        process01Desc="We experiment with fonts, spacing, and letterforms to set the right tone and personality for your brand."
        process02Icon={
          <TbTypography className="text-primary text-3xl sm:text-4xl" />
        }
        process02Title="Custom Lettering & Refinement"
        process02Desc="We refine characters, ligatures, and style to create a completely custom and polished wordmark logo."
        process03Icon={
          <TbLayoutDashboard className="text-primary text-3xl sm:text-4xl" />
        }
        process03Title="Finalization & Formats"
        process03Desc="We deliver multiple file types with guidelines, so your logo looks sharp on every platform and medium."
      />

      <ContactSection />

      {/* <section className="section-padding-standard bg-slate-50 py-14 lg:py-20">
        <div className="layout-standard">
          <div className="text-center flex flex-col items-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-heading max-w-3xl font-bold font-heading tracking-wider">
              Get Your <span className="text-primary">Wordmark</span> Logos
              Designed Now!
            </h2>
            <p className="mt-4 text-lg text-paragraph max-w-2xl mx-auto">
              Our wordmark logo design packages focus on clean, text-based
              branding, giving your business a professional identity with custom
              fonts and styles.
            </p>
          </div>

          <FeatureComparisonTable
            packages={wordmarkLogoPackages}
            featuresData={wordmarkLogoFeatures}
          />
        </div>
      </section> */}

      <FaqSection faqs={FaqDataWordmarkLogoDesign} />
    </main>
  );
}

export default WordmarkDesignServicePage;
