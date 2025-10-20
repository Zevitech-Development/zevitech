import React from "react";

import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import CampaignsSection from "@/components/common/campaigns";
import ContactSection from "@/components/common/contact-section";
import FaqSection from "@/components/common/faq-section";
import Cta from "@/components/common/cta";
import { ServicesPorfolioSection01 } from "@/components/common/services-porfolio-sections";
import { DynamicHero } from "@/components/common/dynamic-hero";

import WhyChooseUsWordmarkImg01 from "../../../../../../public/images/services/branding/2d-logo-portfolio-40.webp";
import WhyChooseUsWordmarkImg02 from "../../../../../../public/images/services/branding/2d-logo-portfolio-22.jpg";
import WhyChooseUsWordmarkImg03 from "../../../../../../public/images/services/branding/2d-logo-portfolio-21.jpg";
import WhyChooseUsWordmarkImg04 from "../../../../../../public/images/services/branding/why-choose-us-wordmark-04.webp";
import WhyChooseUsWordmarkImg05 from "../../../../../../public/images/services/branding/wordmark-logo-portfolio-29.jpg";
import WhyChooseUsWordmarkImg06 from "../../../../../../public/images/services/branding/why-choose-us-wordmark-06.png";

import CtaImg from "../../../../../../public/images/cta-image.webp";
import WordmarkHeroImg from "../../../../../../public/images/hero-images/wordmark-hero-img.jpg";

import { PortfolioWordmarkLogoDesignContent } from "@/content/services/branding-content";
import { FaqDataWordmarkLogoDesign } from "@/content/services/logo-design-services/logo-design-services-content";

import { Type } from "lucide-react";

const WordmarkDesignServicePage = () => {
  return (
    <main className="">
      <DynamicHero
        badgeIcon={<Type />}
        badgeText="Typography Excellence"
        heading="Transform your name into a powerful"
        highlightText="visual identity"
        subheading="Distinctive, readable, and brand-focused"
        description="Zevitech designs wordmark logos that turn your brand name into a memorable symbol. Through expert typography and design precision, we create clean, professional wordmarks that speak for your brand."
        heroImage={WordmarkHeroImg}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsWordmarkImg01}
        img02={WhyChooseUsWordmarkImg02}
        img03={WhyChooseUsWordmarkImg03}
        badgeCotent="Why Choose Us"
        title="Why Choose Zevitech for Wordmark Logo Design?"
        desc01="We create refined wordmark logos that present your brand name with style, professionalism, and impact."
        desc02="Our designs focus on typography and subtle detailing to ensure your brand stands out with a clean and memorable identity."
      />

      <CampaignsSection />

      <ServicesPorfolioSection01
        title="Wordmark Logos That Speak Your Brand's Name with Style"
        description="Browse our collection of custom wordmark logos—designed to transform your brand name into a distinctive, memorable visual identity with strategic typography and clean design."
        portfolioImages={PortfolioWordmarkLogoDesignContent}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsWordmarkImg04}
        img02={WhyChooseUsWordmarkImg05}
        img03={WhyChooseUsWordmarkImg06}
        badgeCotent="About Wordmark Logo Design"
        sectionOrder="order-2"
        title="Typography-Driven Logos That Leave a Mark"
        desc01="Our wordmark logos focus on custom typography that makes your brand name unforgettable."
        desc02="Clean, stylish, and professional, wordmarks are ideal for brands that want their name to stand out with authority and style."
      />

      <ContactSection />

      <Cta
        image={CtaImg}
        heading="Define Your Brand with a Wordmark Logo"
        text="At Zevitech, we craft distinctive wordmark logos that put your brand name in the spotlight. With custom typography and clean design, our wordmarks ensure your business name is memorable and impactful."
      />

      <FaqSection faqItems={FaqDataWordmarkLogoDesign} defaultOpenIndex={0} />
    </main>
  );
};

export default WordmarkDesignServicePage;
