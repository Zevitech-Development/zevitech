import React from "react";

import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import CampaignsSection from "@/components/common/campaigns";
import ContactSection from "@/components/common/contact-section";
import FaqSection from "@/components/common/faq-section";
import Cta from "@/components/common/cta";
import { ServicesPorfolioSection02 } from "@/components/common/services-porfolio-sections";
import { DynamicWebsiteDevHero } from "@/components/common/dynamic-website-dev-hero";

import WhyChooseUsMagentoWebsiteDevelopmentImg01 from "../../../../../public/images/services/e-commerce/why-choose-magento-website-img01.png";
import WhyChooseUsMagentoWebsiteDevelopmentImg02 from "../../../../../public/images/services/e-commerce/why-choose-magento-website-img02.png";
import WhyChooseUsMagentoWebsiteDevelopmentImg03 from "../../../../../public/images/services/e-commerce/why-choose-magento-website-img03.png";
import WhyChooseUsMagentoWebsiteDevelopmentImg04 from "../../../../../public/images/services/e-commerce/why-choose-magento-website-img04.png";
import WhyChooseUsMagentoWebsiteDevelopmentImg05 from "../../../../../public/images/services/e-commerce/why-choose-magento-website-img05.png";
import WhyChooseUsMagentoWebsiteDevelopmentImg06 from "../../../../../public/images/services/e-commerce/why-choose-magento-website-img06.png";

import CtaImg from "../../../../../public/images/cta-image.webp";
import MagentoWebHeroImg from "../../../../../public/images/hero-images/magento-hero-img.png";

import {
  FaqDataMagentoWebsite,
  PortfolioMagentoWebsiteDevelopmentContent,
} from "@/content/overall-services-content/all-services-content";

import { ShoppingCart } from "lucide-react";

function MagentoWebsiteDevelopmentPage() {
  return (
    <main className="">
      <DynamicWebsiteDevHero
        badgeIcon={<ShoppingCart />}
        badgeText="Ecommerce Solutions"
        heading="Unlock enterprise power with"
        highlightText="custom Magento development"
        subheading="Robust, scalable, and business-focused"
        description="Zevitech delivers high-performance Magento websites designed to help your business scale. Our expert developers build secure, feature-rich ecommerce stores that offer seamless management and exceptional customer experiences."
        heroImage={MagentoWebHeroImg}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsMagentoWebsiteDevelopmentImg01}
        img02={WhyChooseUsMagentoWebsiteDevelopmentImg02}
        img03={WhyChooseUsMagentoWebsiteDevelopmentImg03}
        badgeCotent="Why Choose Us"
        title="Why Choose Zevitech for Magento Website Development?"
        desc01="At Zevitech, we specialize in creating powerful and scalable Magento websites that deliver seamless shopping experiences for customers."
        desc02="Our team ensures your Magento store is secure, feature-rich, and optimized for performance to help you maximize online sales."
      />

      <CampaignsSection />

      <ServicesPorfolioSection02
        title="Magento Website Development for Enterprise-Grade E-Commerce"
        description="Discover our portfolio of Magento websites designed to power high-performing online stores. From advanced product catalogs to seamless integrations, we build scalable and secure solutions tailored for growing enterprises."
        portfolioImages={PortfolioMagentoWebsiteDevelopmentContent}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsMagentoWebsiteDevelopmentImg04}
        img02={WhyChooseUsMagentoWebsiteDevelopmentImg05}
        img03={WhyChooseUsMagentoWebsiteDevelopmentImg06}
        badgeCotent="About Magento Development"
        sectionOrder="order-2"
        title="Scalable Solutions for Growing Businesses"
        desc01="We develop Magento websites with robust architecture, custom features, and seamless integrations to meet your business demands."
        desc02="Best suited for enterprises and ambitious brands looking for a flexible and future-ready eCommerce platform."
      />

      <ContactSection />

      <Cta
        image={CtaImg}
        heading="Power Your Store with Magento Website Development"
        text="At Zevitech, we create robust and feature-rich Magento websites designed for flexibility and growth. Our Magento solutions offer advanced customization, secure transactions, and seamless shopping experiences to scale your eCommerce business."
      />

      <FaqSection faqItems={FaqDataMagentoWebsite} defaultOpenIndex={0} />
    </main>
  );
}

export default MagentoWebsiteDevelopmentPage;
