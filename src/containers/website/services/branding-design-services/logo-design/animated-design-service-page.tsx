import React from "react";

import StatsSection from "@/sections/website/services/branding/stats-section";
import AboutSection from "@/sections/website/services/branding/about-section";
import { ServicesPorfolioSection01 } from "@/components/common/services-porfolio-sections";
import { ServicesProcessSection01 } from "@/components/common/services-process-sections";
import FaqSection from "@/components/common/faq-section";

import WhyChooseUuAnimatedImg01 from "../../../../../../public/images/services/branding/why-choose-us-animated-01.jpg";
import WhyChooseUuAnimatedImg02 from "../../../../../../public/images/services/branding/why-choose-us-animated-02.jpg";
import WhyChooseUuAnimatedImg03 from "../../../../../../public/images/services/branding/why-choose-us-animated-03.webp";
import { MdAnimation, MdDesignServices, MdRocketLaunch } from "react-icons/md";
import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import ServicesHeroSections01 from "@/components/common/services-hero-sections";
import { PortfolioAnimatedLogoDesignContent } from "@/content/services/branding-content";
import { FaqDataAnimatedLogoDesign } from "@/content/services/logo-design-services/logo-design-services-content";
import ContactSection from "@/elements/website/home/home-contact-section";
import CampaignsSection from "@/elements/website/home/campaigns";

import BrandingDesignBadgeIcon01 from "../../../../../../public/icons/branding-design-badge-icon-01.webp";
import BrandingDesignBadgeIcon02 from "../../../../../../public/icons/branding-design-badge-icon-02.webp";
import BrandingDesignBadgeIcon03 from "../../../../..//../public/icons/branding-design-badge-icon-03.webp";
import BrandingDesignBadgeIcon04 from "../../../../..//../public/icons/branding-design-badge-icon-04.jpg";
import BrandingDesignBadgeIcon05 from "../../../../..//../public/icons/branding-design-badge-icon-05.jpg";
import BrandingDesignBadgeIcon06 from "../../../../..//../public/icons/branding-design-badge-icon-06.jpg";

import AnimatedLogoImage from "../../../../../../public/images/animated-logo.png";

// import CTA from "@/components/common/cta";
import CTA02 from "@/components/common/cta02";
// import { FeatureComparisonTable } from "@/components/common/pricing-card";
// import {
//   animatedLogoFeatures,
//   animatedLogoPackages,
// } from "@/content/services/services-pricing";

function AnimatedDesignServicePage() {
  return (
    <main className="page-layout-standard">
      <ServicesHeroSections01
        title="Animated Logo Design That Brings Brand to Life"
        desc="We create stunning animated logos that capture attention and add energy to your brand. Perfect for websites, videos, social media, and presentations."
      />
      <StatsSection />
      <WhyChooseUsSection01
        img01={WhyChooseUuAnimatedImg01}
        img02={WhyChooseUuAnimatedImg02}
        img03={WhyChooseUuAnimatedImg03}
        title="Why Choose Zevitech for Animated Logo Design?"
        desc01="We design captivating animated logos that make your brand dynamic and memorable, perfect for engaging audiences across digital platforms."
        desc02="Our team combines creativity with motion design expertise to deliver animations that elevate your brand identity and leave a lasting impact."
      />

      <CTA02
        backgroundClass="bg-home-cta"
        heading="Bring Your Brand to Life with Animation"
        text="Engaging, dynamic logos that capture attention and leave a lasting impression."
      />

      <ServicesPorfolioSection01
        title="Animated Logos That Bring Brands to Life"
        description="Browse our portfolio of dynamic animated logos designed to capture attention, enhance brand recognition, and elevate digital presence across video, web, and social platforms."
        portfolioImages={PortfolioAnimatedLogoDesignContent}
      />
      <AboutSection
        badge={{ text: "About Animated Logo Design" }}
        heading="Animated Logos That Capture Attention"
        paragraphs={[
          "We create smooth, eye-catching animated logos that bring energy and motion to your brand.",
          "Perfect for video intros, social media, and websites, our animations give your brand a modern, memorable edge.",
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
          src: AnimatedLogoImage,
          alt: "Zevitech Design & Branding showcase",
          className: "shadow-lg",
        }}
      />

      <CampaignsSection />

      <ServicesProcessSection01
        title="Our 3 Step Animated Logo Design Process"
        description="From concept to captivating motion, we craft animated logos that bring your brand to life across digital platforms."
        process01Icon={
          <MdDesignServices className="text-primary text-3xl sm:text-4xl" />
        }
        process01Title="Creative Brief & Concept"
        process01Desc="We begin by understanding your brand, vision, and goals to craft unique concepts that align with your message."
        process02Icon={
          <MdAnimation className="text-primary text-3xl sm:text-4xl" />
        }
        process02Title="Motion Design"
        process02Desc="Our animation experts bring your logo to life using fluid, eye-catching motion tailored for maximum impact."
        process03Icon={
          <MdRocketLaunch className="text-primary text-3xl sm:text-4xl" />
        }
        process03Title="Delivery & Launch"
        process03Desc="You receive high-quality animated logo files optimized for web, social media, and video use — ready to impress."
      />

      {/* 
      <section className="section-padding-standard bg-slate-50 py-14 lg:py-20">
        <div className="layout-standard">
          <div className="text-center flex flex-col items-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-heading max-w-3xl font-bold font-heading tracking-wider">
              Get Your <span className="text-primary">Animated</span> Logos
              Designed Now!
            </h2>
            <p className="mt-4 text-lg text-paragraph max-w-2xl mx-auto">
              We offer budget-friendly Shopify store design services, ensuring a
              professional and engaging online platform for your business.
            </p>
          </div>

          <FeatureComparisonTable
            packages={animatedLogoPackages}
            featuresData={animatedLogoFeatures}
          />
        </div>
      </section> */}

      <ContactSection />

      <FaqSection faqs={FaqDataAnimatedLogoDesign} />
    </main>
  );
}

export default AnimatedDesignServicePage;
