import React from "react";

import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import CampaignsSection from "@/components/common/campaigns";
import ContactSection from "@/components/common/contact-section";
import FaqSection from "@/components/common/faq-section";
import Cta from "@/components/common/cta";
import { ServicesPorfolioSection01 } from "@/components/common/services-porfolio-sections";
import { DynamicHero } from "@/components/common/dynamic-hero";

import WhyChooseUuAnimatedImg01 from "../../../../../../public/images/services/branding/why-choose-us-animated-01.jpg";
import WhyChooseUuAnimatedImg02 from "../../../../../../public/images/services/branding/why-choose-us-animated-02.jpg";
import WhyChooseUuAnimatedImg03 from "../../../../../../public/images/services/branding/why-choose-us-animated-03.webp";
import WhyChooseUuAnimatedImg04 from "../../../../../../public/images/services/branding/why-choose-us-animated-04.gif";
import WhyChooseUuAnimatedImg05 from "../../../../../../public/images/services/branding/why-choose-us-animated-05.gif";
import WhyChooseUuAnimatedImg06 from "../../../../../../public/images/services/branding/why-choose-us-animated-06.gif";

import CtaImg from "../../../../../../public/images/cta-image.webp";
import AnimatedHeroImg from "../../../../../../public/images/hero-images/animated-hero-img.jpg";

import { PortfolioAnimatedLogoDesignContent } from "@/content/services/branding-content";
import { FaqDataAnimatedLogoDesign } from "@/content/services/logo-design-services/logo-design-services-content";

import { PlayCircle } from "lucide-react";

const AnimatedDesignServicePage = () => {
  return (
    <main className="">
      <DynamicHero
        badgeIcon={<PlayCircle />}
        badgeText="Dynamic Branding"
        heading="Make your brand"
        highlightText="move with meaning"
        subheading="Engaging motion, lasting impression"
        description="At Zevitech, we craft animated logos that breathe life into your brand. Through seamless motion and creativity, we transform static designs into captivating visuals that leave a lasting impact."
        heroImage={AnimatedHeroImg}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUuAnimatedImg01}
        img02={WhyChooseUuAnimatedImg02}
        img03={WhyChooseUuAnimatedImg03}
        badgeCotent="Why Choose Us"
        title="Why Choose Zevitech for Animated Logo Design?"
        desc01="We design captivating animated logos that make your brand dynamic and memorable, perfect for engaging audiences across digital platforms."
        desc02="Our team combines creativity with motion design expertise to deliver animations that elevate your brand identity and leave a lasting impact."
      />

      <CampaignsSection />

      <ServicesPorfolioSection01
        title="Animated Logos That Bring Brands to Life"
        description="Browse our portfolio of dynamic animated logos designed to capture attention, enhance brand recognition, and elevate digital presence across video, web, and social platforms."
        portfolioImages={PortfolioAnimatedLogoDesignContent}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUuAnimatedImg04}
        img02={WhyChooseUuAnimatedImg05}
        img03={WhyChooseUuAnimatedImg06}
        badgeCotent="About Animated Logo Design"
        sectionOrder="order-2"
        title="Animated Logos That Capture Attention"
        desc01="We create smooth, eye-catching animated logos that bring energy and motion to your brand."
        desc02="Perfect for video intros, social media, and websites, our animations give your brand a modern, memorable edge."
      />

      <ContactSection />

      <Cta
        image={CtaImg}
        heading="Make Your Brand Move with an Animated Logo"
        text="At Zevitech, we create engaging animated logos that breathe life into your brand. From subtle motion to dynamic effects, our animations make your brand unforgettable across digital platforms."
      />

      <FaqSection faqItems={FaqDataAnimatedLogoDesign} defaultOpenIndex={0} />
    </main>
  );
};

export default AnimatedDesignServicePage;
