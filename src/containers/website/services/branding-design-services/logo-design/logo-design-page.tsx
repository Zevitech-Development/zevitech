import React from "react";

import { LogoHero } from "@/elements/business/logo-design/logo-hero";
import LogoDesignProcess from "@/elements/business/logo-design/logo-design-process-section";
import CampaignsSection from "@/components/common/campaigns";
import LogoDesignShowcase from "@/elements/business/logo-design/logo-design-showcase";
import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import LandingReviewsSection from "@/components/common/reviews-section";
import FaqSection from "@/components/common/faq-section";
import LogoMarquee from "@/elements/business/logo-design/logo-marquee-section";
import LogoPricing from "@/elements/business/logo-design/logo-landing-pricing";
import { CtaSection } from "@/elements/business/logo-design/logo-cta";

import WhyChooseUsAboutImg01 from "../../../../../../public/images/services/branding/why-choose-us-2d-01.png";
import WhyChooseUsAboutImg02 from "../../../../../../public/images/services/branding/why-choose-us-3d-05.jpg";
import WhyChooseUsAboutImg03 from "../../../../../../public/images/services/branding/why-choose-us-3d-03.jpg";

import {
  FaqDataLogoDesign,
  logoDesignProcessData,
} from "@/content/services/logo-landing-content/logo-landing-content";

function LogoDesignPage() {
  return (
    <section>
      <LogoHero />
      <LogoMarquee />
      <LogoDesignProcess approaches={logoDesignProcessData} />
      <LogoDesignShowcase />
      <CampaignsSection />
      <WhyChooseUsSection01
        img01={WhyChooseUsAboutImg01}
        img02={WhyChooseUsAboutImg02}
        img03={WhyChooseUsAboutImg03}
        badgeCotent="About Logo Design"
        title="Crafting Visual Identities That Inspire"
        desc01="We design impactful logos that convey your brand story through colors, shapes, and typography—creating a strong visual foundation for your business."
        desc02="Ideal for startups, rebrands, or established businesses looking to refresh their identity with a modern and professional logo design."
      />
      <LogoPricing />
      <CtaSection />
      <LandingReviewsSection />
      <FaqSection faqItems={FaqDataLogoDesign} defaultOpenIndex={0} />
    </section>
  );
}
export default LogoDesignPage;
