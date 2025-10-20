import React from "react";

import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import CampaignsSection from "@/components/common/campaigns";
import ContactSection from "@/components/common/contact-section";
import FaqSection from "@/components/common/faq-section";
import Cta from "@/components/common/cta";
import { ServicesPorfolioSection01 } from "@/components/common/services-porfolio-sections";
import { DynamicHero } from "@/components/common/dynamic-hero";

import WhyChooseUsCustomizeImg01 from "../../../../../../public/images/services/branding/why-choose-us-customize-01.png";
import WhyChooseUsCustomizeImg02 from "../../../../../../public/images/services/branding/why-choose-us-customize-02.jpg";
import WhyChooseUsCustomizeImg03 from "../../../../../../public/images/services/branding/why-choose-us-customize-03.jpg";
import WhyChooseUsCustomizeImg04 from "../../../../../../public/images/services/branding/why-choose-us-customize-04.jpg";
import WhyChooseUsCustomizeImg05 from "../../../../../../public/images/services/branding/why-choose-us-customize-05.jpg";
import WhyChooseUsCustomizeImg06 from "../../../../../../public/images/services/branding/why-choose-us-customize-06.jpg";

import CtaImg from "../../../../../../public/images/cta-image.webp";
import CustomizeHeroImg from "../../../../../../public/images/hero-images/customize-logo-hero-img.jpg";

import { PortfolioCustomizeLogoDesignContent } from "@/content/services/branding-content";
import { FaqDataCustomLogoDesign } from "@/content/services/logo-design-services/logo-design-services-content";

import { Settings } from "lucide-react";

const CustomizeDesignServicePage = () => {
  return (
    <main className="">
      <DynamicHero
        badgeIcon={<Settings />}
        badgeText="Tailored Creativity"
        heading="Personalize your brand with"
        highlightText="custom logo designs"
        subheading="Unique ideas built just for you"
        description="Zevitech specializes in custom logo designs that reflect your brand’s individuality. We blend creativity and strategy to craft one-of-a-kind visuals that align perfectly with your vision and audience."
        heroImage={CustomizeHeroImg}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsCustomizeImg01}
        img02={WhyChooseUsCustomizeImg02}
        img03={WhyChooseUsCustomizeImg03}
        badgeCotent="Why Choose Us"
        title="Why Choose Zevitech for Custom Logo Design?"
        desc01="We specialize in creating original, tailored logo designs that perfectly align with your brand's personality and target audience."
        desc02="Our process ensures your logo is distinctive, versatile, and crafted to leave a lasting impression across all mediums."
      />

      <CampaignsSection />

      <ServicesPorfolioSection01
        title="Custom Logos That Truly Represent Your Brand"
        description="Explore our collection of fully customized logos, each thoughtfully designed to align with a brand’s core identity, voice, and long-term vision. No templates—just original, strategy-driven design."
        portfolioImages={PortfolioCustomizeLogoDesignContent}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsCustomizeImg04}
        img02={WhyChooseUsCustomizeImg05}
        img03={WhyChooseUsCustomizeImg06}
        badgeCotent="About Custom Logo Design"
        sectionOrder="order-2"
        title="Tailored Logo Designs for Your Unique Vision"
        desc01="Your brand is one-of-a-kind—your logo should be too. We craft fully custom logos that align perfectly with your vision, market, and voice."
        desc02="From concept to final polish, every detail is designed to make your brand identity stand out."
      />

      <ContactSection />

      <Cta
        image={CtaImg}
        heading="Stand Out with a Custom Logo Design"
        text="At Zevitech, we create tailor-made custom logos designed exclusively for your brand. Whether bold or subtle, our custom designs capture your unique vision and set you apart from the competition."
      />

      <FaqSection faqItems={FaqDataCustomLogoDesign} defaultOpenIndex={0} />
    </main>
  );
};

export default CustomizeDesignServicePage;
