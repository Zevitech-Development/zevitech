import React from "react";

import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import CampaignsSection from "@/components/common/campaigns";
import ContactSection from "@/components/common/contact-section";
import FaqSection from "@/components/common/faq-section";
import Cta from "@/components/common/cta";
import { ServicesPorfolioSection01 } from "@/components/common/services-porfolio-sections";
import { DynamicHero } from "@/components/common/dynamic-hero";

import WhyChooseUs2DImg01 from "../../../../../../public/images/services/branding/why-choose-us-2d-01.png";
import WhyChooseUs2DImg02 from "../../../../../../public/images/services/branding/why-choose-us-2d-07.png";
import WhyChooseUs2DImg03 from "../../../../../../public/images/services/branding/why-choose-us-2d-03.jpg";
import WhyChooseUs2DImg04 from "../../../../../../public/images/services/branding/2d-logo-portfolio-13.jpg";
import WhyChooseUs2DImg05 from "../../../../../../public/images/services/branding/2d-logo-portfolio-18.jpg";
import WhyChooseUs2DImg06 from "../../../../../../public/images/services/branding/2d-logo-portfolio-43.jpg";

import CtaImg from "../../../../../../public/images/cta-image.webp";
import Logo2dHeroImg from "../../../../../../public/images/hero-images/2d-log-hero-img.jpg";

import { Portfolio2DLogoDesignContent } from "@/content/services/branding-content";
import { FaqData2DLogoDesign } from "@/content/services/logo-design-services/logo-design-services-content";

import { Palette } from "lucide-react";

const Design2dServicePage = () => {
  return (
    <main className="">
      <DynamicHero
        badgeIcon={<Palette />}
        badgeText="Creative Branding"
        heading="Crafting impactful"
        highlightText="2D logo designs"
        subheading="Simple, memorable, and brand-driven"
        description="At Zevitech, we design 2D logos that capture your brand’s identity with clarity and creativity. Our goal is to make your first impression unforgettable through clean, versatile, and professional designs."
        heroImage={Logo2dHeroImg}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUs2DImg01}
        img02={WhyChooseUs2DImg02}
        img03={WhyChooseUs2DImg03}
        badgeCotent="Why Choose Us"
        title="Why Choose Zevitech for 2D Logo Design?"
        desc01="Our 2D logo designs are simple, timeless, and versatile, ensuring your brand is instantly recognizable across all mediums."
        desc02="We focus on clarity and creativity, delivering logos that are easy to scale, adapt, and leave a memorable mark on your audience."
      />

      <CampaignsSection />

      <ServicesPorfolioSection01
        title="2D Logos That Define Our Brands"
        description="Discover clean, versatile 2D logos designed to make brands memorable and stand out across industries."
        portfolioImages={Portfolio2DLogoDesignContent}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUs2DImg04}
        img02={WhyChooseUs2DImg05}
        img03={WhyChooseUs2DImg06}
        badgeCotent="About 2D Logo Design"
        sectionOrder="order-2"
        title="Clean & Memorable Logos That Speak Volumes"
        desc01="Our 2D logo designs are simple, sharp, and versatile—perfect for startups and modern brands that want clarity and instant recognition."
        desc02="With timeless aesthetics and scalable design, we ensure your brand looks great on all platforms—from business cards to billboards."
      />

      <ContactSection />

      <Cta
        image={CtaImg}
        heading="Shape Your Brand with a Timeless 2D Logo"
        text="At Zevitech, we craft simple, versatile, and memorable 2D logos that capture your brand’s identity. Let’s design a mark that speaks for your business everywhere."
      />

      <FaqSection faqItems={FaqData2DLogoDesign} defaultOpenIndex={0} />
    </main>
  );
};

export default Design2dServicePage;
