import React from "react";

import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import CampaignsSection from "@/components/common/campaigns";
import ContactSection from "@/components/common/contact-section";
import FaqSection from "@/components/common/faq-section";
import Cta from "@/components/common/cta";
import { ServicesPorfolioSection02 } from "@/components/common/services-porfolio-sections";

import WhyChooseUsCustomEcommerceDevelopmentImg01 from "../../../../../public/images/services/e-commerce/why-choose-us-custom-ecommerce-img01.png";
import WhyChooseUsCustomEcommerceDevelopmentImg02 from "../../../../../public/images/services/e-commerce/why-choose-us-custom-ecommerce-img02.png";
import WhyChooseUsCustomEcommerceDevelopmentImg03 from "../../../../../public/images/services/e-commerce/why-choose-us-custom-ecommerce-img03.png";
import WhyChooseUsCustomEcommerceDevelopmentImg04 from "../../../../../public/images/services/e-commerce/why-choose-us-custom-ecommerce-img04.png";
import WhyChooseUsCustomEcommerceDevelopmentImg05 from "../../../../../public/images/services/e-commerce/why-choose-us-custom-ecommerce-img05.png";
import WhyChooseUsCustomEcommerceDevelopmentImg06 from "../../../../../public/images/services/e-commerce/why-choose-us-custom-ecommerce-img06.png";

import CtaImg from "../../../../../public/images/cta-image.webp";
import CustomEcommerceHeroImg from "../../../../../public/images/hero-images/custom-ecommerce-hero-img.png";

import {
  FaqDataCustomEcommerceDevelopment,
  PortfolioCustomEcommerceDevelopmentContent,
} from "@/content/overall-services-content/all-services-content";
import { DynamicWebsiteDevHero } from "@/components/common/dynamic-website-dev-hero";
import { Globe } from "lucide-react";

function CustomEcommerceDevelopmentPage() {
  return (
    <main className="">
      <DynamicWebsiteDevHero
        badgeIcon={<Globe />}
        badgeText="Ecommerce Solutions"
        heading="Create a powerful online store with"
        highlightText="custom eCommerce development"
        subheading="Tailored, scalable, and revenue-driven"
        description="Zevitech builds fully customized eCommerce platforms that align with your business vision. From design to functionality, we craft solutions that offer seamless shopping experiences and drive sustainable growth."
        heroImage={CustomEcommerceHeroImg}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsCustomEcommerceDevelopmentImg01}
        img02={WhyChooseUsCustomEcommerceDevelopmentImg02}
        img03={WhyChooseUsCustomEcommerceDevelopmentImg03}
        badgeCotent="Why Choose Us"
        title="Why Choose Zevitech for Custom eCommerce Development?"
        desc01="At Zevitech, we craft tailored eCommerce platforms designed to meet your unique business requirements and customer expectations."
        desc02="Our solutions are scalable, secure, and feature-rich, helping you deliver seamless online shopping experiences that drive growth."
      />

      <CampaignsSection />

      <ServicesPorfolioSection02
        title="Custom E-Commerce Development Tailored to Your Business"
        description="Explore our portfolio of custom e-commerce solutions built from the ground up. From unique storefront designs to advanced integrations and scalable architectures, we create platforms that align perfectly with your business goals and customer needs."
        portfolioImages={PortfolioCustomEcommerceDevelopmentContent}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsCustomEcommerceDevelopmentImg04}
        img02={WhyChooseUsCustomEcommerceDevelopmentImg05}
        img03={WhyChooseUsCustomEcommerceDevelopmentImg06}
        badgeCotent="About Custom eCommerce"
        sectionOrder="order-2"
        title="Tailored Solutions for Every Business"
        desc01="We develop bespoke eCommerce platforms with custom features, integrations, and designs that align perfectly with your goals."
        desc02="Ideal for businesses seeking a competitive edge with a flexible, high-performing, and future-ready online store."
      />

      <ContactSection />

      <Cta
        image={CtaImg}
        heading="Drive Growth with Custom eCommerce Development"
        text="At Zevitech, we build tailor-made eCommerce solutions designed around your unique business needs. From advanced features to seamless integrations, our custom platforms give you full control, scalability, and a shopping experience that stands out."
      />

      <FaqSection
        faqItems={FaqDataCustomEcommerceDevelopment}
        defaultOpenIndex={0}
      />
    </main>
  );
}

export default CustomEcommerceDevelopmentPage;
