import React from "react";

import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import CampaignsSection from "@/components/common/campaigns";
import ContactSection from "@/components/common/contact-section";
import FaqSection from "@/components/common/faq-section";
import Cta from "@/components/common/cta";
import { ServicesPorfolioSection01 } from "@/components/common/services-porfolio-sections";
import { DynamicHero } from "@/components/common/dynamic-hero";

import WhyChooseUsMinimalImg01 from "../../../../../../public/images/services/branding/why-choose-us-minimal-01.jpg";
import WhyChooseUsMinimalImg02 from "../../../../../../public/images/services/branding/why-choose-us-minimal-02.jpg";
import WhyChooseUsMinimalImg03 from "../../../../../../public/images/services/branding/why-choose-us-minimal-03.jpg";
import WhyChooseUsMinimalImg04 from "../../../../../../public/images/services/branding/why-choose-us-minimal-04.jpg";
import WhyChooseUsMinimalImg05 from "../../../../../../public/images/services/branding/why-choose-us-minimal-05.jpg";
import WhyChooseUsMinimalImg06 from "../../../../../../public/images/services/branding/why-choose-us-minimal-06.jpg";

import CtaImg from "../../../../../../public/images/cta-image.webp";
import MinimalHeroImg from "../../../../../../public/images/hero-images/minimal-hero-img.jpg";

import { PortfolioMinimalLogoDesignContent } from "@/content/services/branding-content";
import { FaqDataMinimalLogoDesign } from "@/content/services/logo-design-services/logo-design-services-content";

import { MinusSquare } from "lucide-react";

const MinimalDesignServicePage = () => {
  return (
    <main className="">
      <DynamicHero
        badgeIcon={<MinusSquare />}
        badgeText="Clean & Timeless"
        heading="Designing simplicity that"
        highlightText="speaks volumes"
        subheading="Elegant, clear, and impactful"
        description="Zevitech creates minimal logo designs that embody clarity and sophistication. We focus on essential elements to deliver logos that are timeless, memorable, and effortlessly professional."
        heroImage={MinimalHeroImg}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsMinimalImg01}
        img02={WhyChooseUsMinimalImg02}
        img03={WhyChooseUsMinimalImg03}
        badgeCotent="Why Choose Us"
        title="Why Choose Zevitech for Minimal Logo Design?"
        desc01="We specialize in designing clean, modern logos that communicate your brand's identity with clarity and sophistication."
        desc02="Our minimal designs are versatile, timeless, and perfect for businesses that value simplicity and elegance."
      />

      <CampaignsSection />

      <ServicesPorfolioSection01
        title="Minimal Logo Designs That Speak Volumes"
        description="Explore our sleek and sophisticated minimal logo designs—crafted with simplicity, clarity, and modern aesthetics to ensure your brand leaves a lasting impression with less."
        portfolioImages={PortfolioMinimalLogoDesignContent}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsMinimalImg04}
        img02={WhyChooseUsMinimalImg05}
        img03={WhyChooseUsMinimalImg06}
        badgeCotent="About Minimal Logo Design"
        sectionOrder="order-2"
        title="Less Is More — Timeless Minimal Branding"
        desc01="Our minimal logo designs focus on clean lines, smart typography, and elegant simplicity—perfect for premium and modern brands.."
        desc02="We design with purpose, ensuring your logo communicates your identity without the clutter."
      />

      <ContactSection />

      <Cta
        image={CtaImg}
        heading="Elevate Your Brand with a Minimal Logo"
        text="At Zevitech, we design sleek and timeless minimal logos that speak volumes with simplicity. Perfect for modern brands, our minimal designs ensure clarity, versatility, and lasting impact."
      />

      <FaqSection faqItems={FaqDataMinimalLogoDesign} defaultOpenIndex={0} />
    </main>
  );
};

export default MinimalDesignServicePage;
