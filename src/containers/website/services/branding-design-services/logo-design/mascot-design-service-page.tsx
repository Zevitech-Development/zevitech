import React from "react";

import StatsSection from "@/sections/website/services/branding/stats-section";
import { ServicesPorfolioSection01 } from "@/components/common/services-porfolio-sections";
import AboutSection from "@/sections/website/services/branding/about-section";
import { ServicesProcessSection01 } from "@/components/common/services-process-sections";
import FaqSection from "@/components/common/faq-section";

import WhyChooseUsMascotImg01 from "../../../../../../public/images/services/branding/why-choose-us-mascot-01.png";
import WhyChooseUsMascotImg02 from "../../../../../../public/images/services/branding/why-choose-us-mascot-02.jpg";
import WhyChooseUsMascotImg03 from "../../../../../../public/images/services/branding/why-choose-us-mascot-03.jpg";
import {
  GiFoxHead,
  GiMagnifyingGlass,
  GiVibratingSmartphone,
} from "react-icons/gi";
import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import ServicesHeroSections01 from "@/components/common/services-hero-sections";
import { PortfolioMascotLogoDesignContent } from "@/content/services/branding-content";
import CTA02 from "@/components/common/cta02";
import CampaignsSection from "@/elements/website/home/campaigns";
import ContactSection from "@/elements/website/home/home-contact-section";
import { FaqDataMascotLogoDesign } from "@/content/services/logo-design-services/logo-design-services-content";
// import { FeatureComparisonTable } from "@/components/common/pricing-card";
// import {
//   mascotLogoFeatures,
//   mascotLogoPackages,
// } from "@/content/services/services-pricing";

import BrandingDesignBadgeIcon01 from "../../../../../../public/icons/branding-design-badge-icon-01.webp";
import BrandingDesignBadgeIcon02 from "../../../../../../public/icons/branding-design-badge-icon-02.webp";
import BrandingDesignBadgeIcon03 from "../../../../..//../public/icons/branding-design-badge-icon-03.webp";
import BrandingDesignBadgeIcon04 from "../../../../..//../public/icons/branding-design-badge-icon-04.jpg";
import BrandingDesignBadgeIcon05 from "../../../../..//../public/icons/branding-design-badge-icon-05.jpg";
import BrandingDesignBadgeIcon06 from "../../../../..//../public/icons/branding-design-badge-icon-06.jpg";

import HeroImage from "../../../../../../public/images/2d-image.png";

function MascotDesignServicePage() {
  return (
    <main className="page-layout-standard">
      <ServicesHeroSections01
        title="Mascot Logo Design That Gives Your Brand a Personality"
        desc="We create vibrant and memorable mascot logos that connect with your audience and make your brand instantly recognizable. Perfect for businesses looking to stand out with a unique character."
      />
      <StatsSection />
      <WhyChooseUsSection01
        img01={WhyChooseUsMascotImg01}
        img02={WhyChooseUsMascotImg02}
        img03={WhyChooseUsMascotImg03}
        title="Why Choose Zevitech for Mascot Logo Design?"
        desc01="Our mascot logos are designed to give your brand a unique character and emotional connection with your audience."
        desc02="We blend creativity and storytelling to craft mascots that make your brand memorable and stand out in competitive markets."
      />

      <CTA02
        backgroundClass="bg-home-cta"
        heading="Stand Out with a Custom Mascot Logo"
        text="Fun, unique, and memorable designs that give your brand a personality customers love."
      />

      <ServicesPorfolioSection01
        title="Mascot Logos That Bring Your Brand to Life"
        description="Dive into our collection of custom mascot logos designed to add personality, energy, and memorability to your brand. Perfect for sports teams, gaming, and character-driven businesses."
        portfolioImages={PortfolioMascotLogoDesignContent}
      />
      <AboutSection
        badge={{ text: "About Mascot Logo Design" }}
        heading="Mascot Logos That Build Personality & Connection"
        paragraphs={[
          "Zevitech creates custom mascot logos that give your brand a face and a voice, perfect for playful or community-driven businesses.",
          "From bold illustrations to lovable characters, we make mascots that audiences connect with instantly.",
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
        title="Our 3 Step Mascot Logo Design Process"
        description="We design custom mascot logos that bring character, personality, and emotion to your brand through creativity and storytelling."
        process01Icon={
          <GiMagnifyingGlass className="text-primary text-3xl sm:text-4xl" />
        }
        process01Title="Discovery & Style Direction"
        process01Desc="We explore your brand identity and audience to define the right mascot style and personality traits."
        process02Icon={
          <GiFoxHead className="text-primary text-3xl sm:text-4xl" />
        }
        process02Title="Mascot Sketch & Illustration"
        process02Desc="Our illustrators create expressive character sketches, refining them into a unique and recognizable mascot."
        process03Icon={
          <GiVibratingSmartphone className="text-primary text-3xl sm:text-4xl" />
        }
        process03Title="Final Design & Delivery"
        process03Desc="We deliver your mascot logo in high-resolution formats — ready to be used on web, merchandise, and beyond."
      />

      <ContactSection />

      {/* <section className="section-padding-standard bg-slate-50 py-14 lg:py-20">
        <div className="layout-standard">
          <div className="text-center flex flex-col items-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-heading max-w-3xl font-bold font-heading tracking-wider">
              Get Your <span className="text-primary">Mascot</span> Logos
              Designed Now!
            </h2>
            <p className="mt-4 text-lg text-paragraph max-w-2xl mx-auto">
              Our mascot logo design packages create unique character-based
              logos, giving your brand a fun and relatable personality.
            </p>
          </div>

          <FeatureComparisonTable
            packages={mascotLogoPackages}
            featuresData={mascotLogoFeatures}
          />
        </div>
      </section> */}

      <FaqSection faqs={FaqDataMascotLogoDesign} />
    </main>
  );
}

export default MascotDesignServicePage;
