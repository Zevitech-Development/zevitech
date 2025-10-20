import React from "react";

import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import CampaignsSection from "@/components/common/campaigns";
import ContactSection from "@/components/common/contact-section";
import FaqSection from "@/components/common/faq-section";
import Cta from "@/components/common/cta";
import { ServicesPorfolioSection02 } from "@/components/common/services-porfolio-sections";
import { DynamicHero } from "@/components/common/dynamic-hero";

import WhyChooseUsProductPackagingImg01 from "../../../../../public/images/services/branding/why-choose-us-product-packaging-01.jpg";
import WhyChooseUsProductPackagingImg02 from "../../../../../public/images/services/branding/why-choose-us-product-packaging-02.jpg";
import WhyChooseUsProductPackagingImg03 from "../../../../../public/images/services/branding/why-choose-us-product-packaging-03.jpg";
import WhyChooseUsProductPackagingImg04 from "../../../../../public/images/services/branding/why-choose-us-product-packaging-04.jpeg";
import WhyChooseUsProductPackagingImg05 from "../../../../../public/images/services/branding/why-choose-us-product-packaging-05.jpeg";
import WhyChooseUsProductPackagingImg06 from "../../../../../public/images/services/branding/why-choose-us-product-packaging-06.jpeg";

import CtaImg from "../../../../../public/images/cta-image.webp";
import ProductPackageDesignkHeroImg from "../../../../../public/images/hero-images/product-packaging-hero-img.jpg";

import { FaqDataPackagingLabelDesign } from "@/content/overall-services-content/all-services-content";
import { PortfolioProductPackagingLabelDesignContent } from "@/content/services/branding-content";

import { Package } from "lucide-react";

const ProductPackagingLabelDesignServicePage = () => {
  return (
    <main className="page-layout-standard">
      <DynamicHero
        badgeIcon={<Package />}
        badgeText="Creative Packaging"
        heading="Designing packaging that"
        highlightText="tells your brand’s story"
        subheading="Eye-catching, functional, and memorable"
        description="Zevitech creates product packaging and label designs that combine aesthetics with strategy. We craft visuals that enhance shelf appeal, communicate value, and strengthen your brand identity across every product line."
        heroImage={ProductPackageDesignkHeroImg}
      />
      <WhyChooseUsSection01
        img01={WhyChooseUsProductPackagingImg01}
        img02={WhyChooseUsProductPackagingImg02}
        img03={WhyChooseUsProductPackagingImg03}
        badgeCotent="Why Choose Us"
        title="Why Choose Zevitech for Packaging & Label Design?"
        desc01="We create innovative and visually striking packaging designs that attract customers and communicate your brand's story effectively."
        desc02="Our designs balance creativity and functionality to ensure your products stand out and leave a lasting impression on the shelves."
      />

      <CampaignsSection />

      <ServicesPorfolioSection02
        title="Product Packaging & Label Designs That Captivate"
        description="Explore our collection of product packaging and label designs that blend creativity and strategy. From food labels to cosmetic packaging, our designs help brands stand out on the shelf and win customer attention."
        portfolioImages={PortfolioProductPackagingLabelDesignContent}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsProductPackagingImg04}
        img02={WhyChooseUsProductPackagingImg05}
        img03={WhyChooseUsProductPackagingImg06}
        badgeCotent="About Packaging & Label Design"
        sectionOrder="order-2"
        title="Packaging That Sells Your Product at First Glance"
        desc01="Our packaging and label designs are crafted to grab attention, communicate value, and reflect your brand identity."
        desc02="We combine functionality and beauty to create designs that stand out on shelves and online marketplaces."
      />

      <ContactSection />

      <Cta
        image={CtaImg}
        heading="Transform Products with Stunning Packaging & Labels"
        text="At Zevitech, we design eye-catching product packaging and labels that capture attention and communicate your brand story. Our designs balance creativity and functionality, making your products stand out on the shelves and online."
      />

      <FaqSection faqItems={FaqDataPackagingLabelDesign} defaultOpenIndex={0} />
    </main>
  );
};

export default ProductPackagingLabelDesignServicePage;
