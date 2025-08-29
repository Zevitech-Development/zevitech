import React from "react";

import StatsSection from "@/sections/website/services/branding/stats-section";
import AboutSection from "@/sections/website/services/branding/about-section";
import { ServicesProcessSection01 } from "@/components/common/services-process-sections";
import { ServicesPorfolioSection02 } from "@/components/common/services-porfolio-sections";
import FaqSection from "@/components/common/faq-section";

import WhyChooseUsBrandIdentityImg01 from "../../../../../public/images/services/branding/why-choose-us-brand-identity-01.jpg";
import WhyChooseUsBrandIdentityImg02 from "../../../../../public/images/services/branding/why-choose-us-brand-identity-02.jpg";
import WhyChooseUsBrandIdentityImg03 from "../../../../../public/images/services/branding/why-choose-us-brand-identity-03.jpg";
import { FaLightbulb, FaDraftingCompass, FaLayerGroup } from "react-icons/fa";
import ServicesHeroSections01 from "@/components/common/services-hero-sections";
import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import CampaignsSection from "@/elements/website/home/campaigns";
import CTA02 from "@/components/common/cta02";
import ContactSection from "@/elements/website/home/home-contact-section";
import { PortfolioBrandIdentityDesignContent } from "@/content/services/branding-content";
import { FaqDataBrandIdentityDesign } from "@/content/services/brand-identity-design/brand-identity-design-content";

import BrandingDesignBadgeIcon01 from "../../../../../public/icons/branding-design-badge-icon-01.webp";
import BrandingDesignBadgeIcon02 from "../../../../../public/icons/branding-design-badge-icon-02.webp";
import BrandingDesignBadgeIcon03 from "../../../../../public/icons/branding-design-badge-icon-03.webp";
import BrandingDesignBadgeIcon04 from "../../../../../public/icons/branding-design-badge-icon-04.jpg";
import BrandingDesignBadgeIcon05 from "../../../../../public/icons/branding-design-badge-icon-05.jpg";
import BrandingDesignBadgeIcon06 from "../../../../../public/icons/branding-design-badge-icon-06.jpg";

import HeroImage from "../../../../../public/images/2d-image.png";

// import CTA from "@/components/common/cta";

function BrandIdentityDesignServicePage() {
  return (
    <main className="page-layout-standard">
      <ServicesHeroSections01
        title="Brand Identity Design That Defines Your Business"
        desc="We craft a complete visual language — from colors and fonts to brand guidelines — making your brand consistent, recognizable, and memorable across every platform."
      />
      <StatsSection />
      <WhyChooseUsSection01
        img01={WhyChooseUsBrandIdentityImg01}
        img02={WhyChooseUsBrandIdentityImg02}
        img03={WhyChooseUsBrandIdentityImg03}
        title="Why Choose Zevitech for Brand Identity Design?"
        desc01="We design cohesive brand identities that capture your business’s vision and create a lasting impression across all touchpoints."
        desc02="From logos to complete branding systems, our team ensures your brand is professional, consistent, and instantly recognizable."
      />

      <CampaignsSection />

      <ServicesPorfolioSection02
        title="Cohesive Brand Identity Designs That Speak Volumes"
        description="Explore our brand identity design portfolio, showcasing cohesive visual systems including logos, typography, color palettes, and brand guidelines that reflect the core of each business."
        portfolioImages={PortfolioBrandIdentityDesignContent}
      />
      <AboutSection
        badge={{ text: "About Brand Identity Design" }}
        heading="Build a Complete & Cohesive Brand Identity"
        paragraphs={[
          "Zevitech delivers full identity systems that align your visual elements with your values, story, and target market.",
          "From logo to color palette and typography, we help you craft a brand that's consistent and unforgettable.",
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

      <CTA02
        backgroundClass="bg-home-cta"
        heading="Build a Strong Brand Identity"
        text="From logos to visuals, we create cohesive designs that define and elevate your brand."
      />

      <ServicesProcessSection01
        title="Our Brand Identity Design Process"
        description="We build cohesive and impactful brand identities that reflect your mission and set you apart in the market."
        process01Icon={
          <FaLightbulb className="text-primary text-3xl sm:text-4xl" />
        }
        process01Title="Discovery & Strategy"
        process01Desc="We begin by understanding your brand’s purpose, audience, and industry to define the identity direction."
        process02Icon={
          <FaDraftingCompass className="text-primary text-3xl sm:text-4xl" />
        }
        process02Title="Visual Identity Creation"
        process02Desc="Our designers craft a consistent visual language including logo, colors, typography, and iconography."
        process03Icon={
          <FaLayerGroup className="text-primary text-3xl sm:text-4xl" />
        }
        process03Title="Brand Kit Delivery"
        process03Desc="We deliver a full brand kit with style guidelines to maintain visual consistency across all platforms."
      />

      <ContactSection />

      <FaqSection faqs={FaqDataBrandIdentityDesign} />
    </main>
  );
}

export default BrandIdentityDesignServicePage;
