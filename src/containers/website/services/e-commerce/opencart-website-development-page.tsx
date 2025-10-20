import React from "react";

import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import CampaignsSection from "@/components/common/campaigns";
import ContactSection from "@/components/common/contact-section";
import FaqSection from "@/components/common/faq-section";
import Cta from "@/components/common/cta";
import { DynamicWebsiteDevHero } from "@/components/common/dynamic-website-dev-hero";
import { ServicesPorfolioSection02 } from "@/components/common/services-porfolio-sections";

import WhyChooseUsSocialMediaKitImg01 from "../../../../../public/images/services/e-commerce/why-choose-open-cart-01.jpg";
import WhyChooseUsSocialMediaKitImg02 from "../../../../../public/images/services/e-commerce/why-choose-open-cart-02.jpg";
import WhyChooseUsSocialMediaKitImg03 from "../../../../../public/images/services/e-commerce/why-choose-open-cart-03.jpg";
import WhyChooseUsSocialMediaKitImg04 from "../../../../../public/images/services/e-commerce//why-choose-open-cart-04.jpg";
import WhyChooseUsSocialMediaKitImg05 from "../../../../../public/images/services/e-commerce/why-choose-open-cart-05.jpg";
import WhyChooseUsSocialMediaKitImg06 from "../../../../../public/images/services/e-commerce/why-choose-open-cart-06.jpg";

import CtaImg from "../../../../../public/images/cta-image.webp";
import OpencartHeroImg from "../../../../../public/images/portfolio/ecommerce-img01.jpg";

import {
  FaqDataOpenCartWebsite,
  PortfolioOpenCartWebsiteDevelopmentContent,
} from "@/content/overall-services-content/all-services-content";

import { ShoppingCart } from "lucide-react";

function OpenCartWebsiteDevelopmentPage() {
  return (
    <main className="">
      <DynamicWebsiteDevHero
        badgeIcon={<ShoppingCart />}
        badgeText="Ecommerce Solutions"
        heading="Empower your online store with"
        highlightText="custom OpenCart development"
        subheading="Flexible, scalable, and performance-driven"
        description="Zevitech builds powerful OpenCart websites tailored to your business goals. Our expert developers create seamless, secure, and conversion-optimized stores designed to deliver exceptional user experiences."
        heroImage={OpencartHeroImg}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsSocialMediaKitImg02}
        img02={WhyChooseUsSocialMediaKitImg01}
        img03={WhyChooseUsSocialMediaKitImg03}
        badgeCotent="Trusted OpenCart Experts"
        title="Why Choose Zevitech for OpenCart Website Development?"
        desc01="At Zevitech, we build robust and scalable OpenCart websites tailored to your business needs, ensuring a seamless shopping experience for your customers."
        desc02="Our expert developers deliver high-performing, secure, and fully customized OpenCart solutions that help you boost sales and manage your store with ease."
      />

      <CampaignsSection />

      <ServicesPorfolioSection02
        title="OpenCart Website Development for Flexible Online Stores"
        description="Browse our portfolio of OpenCart-powered websites built for performance, scalability, and customization. From sleek storefronts to advanced e-commerce features, we create solutions that help businesses sell smarter and grow faster."
        portfolioImages={PortfolioOpenCartWebsiteDevelopmentContent}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsSocialMediaKitImg04}
        img02={WhyChooseUsSocialMediaKitImg05}
        img03={WhyChooseUsSocialMediaKitImg06}
        badgeCotent="About OpenCart Development"
        sectionOrder="order-2"
        title="Custom Solutions That Drive Sales"
        desc01="We craft OpenCart stores with tailored designs, advanced extensions, and smooth functionality to match your unique business goals."
        desc02="Ideal for businesses seeking a flexible, scalable, and cost-effective eCommerce platform to grow their online sales."
      />

      <ContactSection />

      <Cta
        image={CtaImg}
        heading="Grow Your Store with OpenCart Website Development"
        text="At Zevitech, we build powerful and scalable OpenCart websites tailored to your business needs. From custom features to seamless integrations, our solutions help you manage products, boost sales, and deliver a smooth shopping experience."
      />

      <FaqSection faqItems={FaqDataOpenCartWebsite} defaultOpenIndex={0} />
    </main>
  );
}

export default OpenCartWebsiteDevelopmentPage;
