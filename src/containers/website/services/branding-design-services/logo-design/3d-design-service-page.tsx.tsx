import React from "react";

import StatsSection from "@/sections/website/services/branding/stats-section";
import { ServicesPorfolioSection01 } from "@/components/common/services-porfolio-sections";
import AboutSection from "@/sections/website/services/branding/about-section";
import { ServicesProcessSection01 } from "@/components/common/services-process-sections";
import FaqSection from "@/components/common/faq-section";

import WhyChooseUs3DImg01 from "../../../../../../public/images/services/branding/why-choose-us-3d-01.png";
import WhyChooseUs3DImg02 from "../../../../../../public/images/services/branding/why-choose-us-3d-02.jpg";
import WhyChooseUs3DImg03 from "../../../../../../public/images/services/branding/why-choose-us-3d-03.jpg";
import { Gi3dStairs, GiPencilRuler, GiGiftOfKnowledge } from "react-icons/gi";
import ServicesHeroSections01 from "@/components/common/services-hero-sections";
import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import { Portfolio3DLogoDesignContent } from "@/content/services/branding-content";
import { FaqData3DLogoDesign } from "@/content/services/logo-design-services/logo-design-services-content";
import CampaignsSection from "@/elements/website/home/campaigns";
import ContactSection from "@/elements/website/home/home-contact-section";
import CTA02 from "@/components/common/cta02";

import BrandingDesignBadgeIcon01 from "../../../../../../public/icons/branding-design-badge-icon-01.webp";
import BrandingDesignBadgeIcon02 from "../../../../../../public/icons/branding-design-badge-icon-02.webp";
import BrandingDesignBadgeIcon03 from "../../../../..//../public/icons/branding-design-badge-icon-03.webp";
import BrandingDesignBadgeIcon04 from "../../../../..//../public/icons/branding-design-badge-icon-04.jpg";
import BrandingDesignBadgeIcon05 from "../../../../..//../public/icons/branding-design-badge-icon-05.jpg";
import BrandingDesignBadgeIcon06 from "../../../../..//../public/icons/branding-design-badge-icon-06.jpg";

import HeroImage from "../../../../../../public/images/2d-image.png";

// import { FeatureComparisonTable } from "@/components/common/pricing-card";
// import {
//   logo3DDesignFeatures,
//   logo3DDesignPackages,
// } from "@/content/services/services-pricing";

function Design3dServicePage() {
  return (
    <main className="page-layout-standard">
      <ServicesHeroSections01
        title="3D Logo Design – Bold, Dynamic & Modern"
        desc="We craft dynamic, eye-catching 3D logos that bring your brand to life. Perfect for businesses looking to make a powerful impression in digital and print spaces."
      />
      
      <StatsSection />

      <WhyChooseUsSection01
        img01={WhyChooseUs3DImg01}
        img02={WhyChooseUs3DImg02}
        img03={WhyChooseUs3DImg03}
        title="Why Choose Zevitech for 3D Logo Design?"
        desc01="Our 3D logo designs are crafted to give your brand depth, dimension, and a striking visual presence that stands out in today's competitive market."
        desc02="We combine creativity with technical expertise to deliver bold and modern logos that make a lasting impression across all platforms."
      />

      <CTA02
        backgroundClass="bg-about-cta"
        heading="Elevate Your Brand with 3D Logo Design"
        text="Bold, dynamic, and modern designs that give your brand a striking visual edge."
      />

      <ServicesPorfolioSection01
        title="3D Logos That Captivate & Impress"
        description="Explore bold, dimensional 3D logos designed to elevate your brand's visual presence and leave a strong impression across digital and physical platforms."
        portfolioImages={Portfolio3DLogoDesignContent}
      />

      <AboutSection
        badge={{ text: "About 3D Logo Design" }}
        heading="Bring Your Brand to Life in 3D"
        paragraphs={[
          "Zevitech’s 3D logo designs offer depth, realism, and visual impact—perfect for businesses looking to stand out with a dynamic identity.",
          "Whether for digital displays or product packaging, our 3D logos give your brand an immersive and professional presence.",
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
        title="Our 3 Step 3D Logo Design Process"
        description="From sketch to stunning 3D, we combine strategy, modeling, and polish to craft visually powerful 3D logos tailored to your brand."
        process01Icon={
          <Gi3dStairs className="text-primary text-3xl sm:text-4xl" />
        }
        process01Title="Concept & Depth Planning"
        process01Desc="We start by understanding your brand and visual goals, then develop dimensional concepts that bring your identity to life."
        process02Icon={
          <GiPencilRuler className="text-primary text-3xl sm:text-4xl" />
        }
        process02Title="3D Modeling & Design"
        process02Desc="Our designers model your logo in 3D, focusing on realistic lighting, structure, and depth to create bold visual impact."
        process03Icon={
          <GiGiftOfKnowledge className="text-primary text-3xl sm:text-4xl" />
        }
        process03Title="Final Polish & Export"
        process03Desc="We render high-resolution outputs in multiple formats, optimized for web, print, and video usage."
      />

      <ContactSection />

      {/* <section className="section-padding-standard bg-slate-50 py-14 lg:py-20">
        <div className="layout-standard">
          <div className="text-center flex flex-col items-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-heading max-w-3xl font-bold font-heading tracking-wider">
              Get Your <span className="text-primary">3D</span> Logos Designed
              Now!
            </h2>
            <p className="mt-4 text-lg text-paragraph max-w-2xl mx-auto">
              We offer budget-friendly Shopify store design services, ensuring a
              professional and engaging online platform for your business.
            </p>
          </div>

          <FeatureComparisonTable
            packages={logo3DDesignPackages}
            featuresData={logo3DDesignFeatures}
          />
        </div>
      </section> */}

      <FaqSection faqs={FaqData3DLogoDesign} />
    </main>
  );
}

export default Design3dServicePage;
