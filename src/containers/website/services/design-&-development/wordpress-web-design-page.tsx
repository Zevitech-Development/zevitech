import React from "react";

import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import CampaignsSection from "@/components/common/campaigns";
import ContactSection from "@/components/common/contact-section";
import FaqSection from "@/components/common/faq-section";
import Cta from "@/components/common/cta";
import { ServicesPorfolioSection02 } from "@/components/common/services-porfolio-sections";
import { DynamicWebsiteDevHero } from "@/components/common/dynamic-website-dev-hero";

import WhyChooseUsWordPressWebDesignImg01 from "../../../../../public/images/services/design-and-development/why-choose-us-wordpress-web-img01.png";
import WhyChooseUsWordPressWebDesignImg02 from "../../../../../public/images/services/design-and-development/why-choose-us-wordpress-web-img02.png";
import WhyChooseUsWordPressWebDesignImg03 from "../../../../../public/images/services/design-and-development/why-choose-us-wordpress-web-img03.png";
import WhyChooseUsWordPressWebDesignImg04 from "../../../../../public/images/services/design-and-development/why-choose-us-wordpress-web-img04.png";
import WhyChooseUsWordPressWebDesignImg05 from "../../../../../public/images/services/design-and-development/why-choose-us-wordpress-web-img05.png";
import WhyChooseUsWordPressWebDesignImg06 from "../../../../../public/images/services/design-and-development/why-choose-us-wordpress-web-img06.png";

import CtaImg from "../../../../../public/images/cta-image.webp";
import WordpressDesignHeroImg from "../../../../../public/images/portfolio/ui-ux-img05.jpg";

import {
  FaqDataWordPressWebDesign,
  PortfolioWordPressWebDesignContent,
} from "@/content/overall-services-content/all-services-content";

import { Globe } from "lucide-react";

function WordPressWebDesignPage() {
  return (
    <main className="">
      <DynamicWebsiteDevHero
        badgeIcon={<Globe />}
        badgeText="Web Design Solutions"
        heading="Design powerful websites with"
        highlightText="custom WordPress web design"
        subheading="Creative, responsive, and SEO-friendly"
        description="Zevitech crafts modern WordPress websites that combine aesthetics with performance. Our expert designers build responsive, user-focused websites that enhance visibility and help your brand stand out online."
        heroImage={WordpressDesignHeroImg}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsWordPressWebDesignImg01}
        img02={WhyChooseUsWordPressWebDesignImg02}
        img03={WhyChooseUsWordPressWebDesignImg03}
        badgeCotent="Why Choose Us"
        title="Why Choose Zevitech for WordPress Web Design?"
        desc01="At Zevitech, we design WordPress websites that are visually stunning, user-friendly, and optimized for performance."
        desc02="From themes to custom designs, we ensure your website reflects your brand identity while engaging your visitors effectively."
      />

      <CampaignsSection />

      <ServicesPorfolioSection02
        title="WordPress Web Design That Blends Creativity and Functionality"
        description="Browse our portfolio of WordPress websites designed to deliver seamless user experiences and stunning visuals. From business sites to personal blogs, we create responsive, SEO-friendly, and easy-to-manage WordPress designs tailored to your brand."
        portfolioImages={PortfolioWordPressWebDesignContent}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsWordPressWebDesignImg04}
        img02={WhyChooseUsWordPressWebDesignImg05}
        img03={WhyChooseUsWordPressWebDesignImg06}
        badgeCotent="About WordPress Web Design"
        sectionOrder="order-2"
        title="Custom Designs That Make an Impact"
        desc01="We create responsive WordPress designs tailored to your goals, combining aesthetics with functionality for a seamless experience."
        desc02="Perfect for businesses, entrepreneurs, and organizations wanting a professional, scalable, and easy-to-manage website."
      />

      <ContactSection />

      <Cta
        image={CtaImg}
        heading="Build a Powerful Website with WordPress Web Design"
        text="At Zevitech, we design and develop WordPress websites that are fast, secure, and fully customizable. From business sites to blogs and portfolios, our WordPress solutions combine stunning design with smooth functionality to help your brand thrive online."
      />

      <FaqSection faqItems={FaqDataWordPressWebDesign} defaultOpenIndex={0} />
    </main>
  );
}

export default WordPressWebDesignPage;
