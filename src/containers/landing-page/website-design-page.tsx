import React from "react";

import { LandingDynamicHero } from "@/components/common/landing-dynamic-hero";
import WebDesignPricing from "@/elements/business/website-design/web-design-packages";
import WebDesignContactSection from "@/elements/business/website-design/web-design-contact-section";
import LandingReviewsSection from "@/components/common/reviews-section";
import TechStackExpertise from "@/elements/website/home/tech-stack-experties";
import { ServicesPorfolioSection02 } from "@/components/common/services-porfolio-sections";
import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import HomeServicesSection from "@/elements/website/home/home-services-section";

import WhyChooseUsWebDesignImg01 from "../../../public/images/services/design-and-development/why-choose-us-joomla-website-img01.png";
import WhyChooseUsWebDesignImg02 from "../../../public/images/services/design-and-development/why-choose-us-wordpress-web-img04.png";
import WhyChooseUsWebDesignImg03 from "../../../public/images/services/design-and-development/why-choose-us-joomla-website-img03.png";

import {
  landingWebDesignServices,
  WebDesignPortfolioData,
} from "@/content/landing/web-design-page-content";
import { FaGlobe } from "react-icons/fa";


function WebsiteDesignPage() {

  return (
    <div>
      <LandingDynamicHero
        badgeIcon={<FaGlobe />}
        badgeText="Web Solutions"
        normalText="Leading Web Design Agency"
        highlightText="Delivering the Best Results"
        subheading="Tailored, scalable, and revenue-driven"
        description="Dubai’s leading web design agency, delivering expert, reliable, and top-quality web designing services for impactful online results."
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsWebDesignImg01}
        img02={WhyChooseUsWebDesignImg02}
        img03={WhyChooseUsWebDesignImg03}
        badgeCotent="Why Choose Us"
        title="Why Choose Zevitech for Website Design & Development?"
        desc01="At Zevitech, we build custom websites that reflect your brand and drive results—boosting trust, engagement, and visibility online."
        desc02="With a smart blend of creativity and functionality, we create responsive websites that increase user engagement, improve conversions, and support long-term growth."
      />

      <TechStackExpertise />

      <HomeServicesSection
        showButtons={false}
        services={landingWebDesignServices}
      />

      <ServicesPorfolioSection02
        title="Modern Web Design Built for Speed and Conversion"
        description="Explore our portfolio of modern, high-performing web designs. We create responsive, user-focused websites built for seamless functionality and business growth."
        portfolioImages={WebDesignPortfolioData}
      />

      <WebDesignPricing />

      <WebDesignContactSection />

      <LandingReviewsSection />

      {/* <CampaignsSection /> */}
    </div>
  );
}

export default WebsiteDesignPage;
