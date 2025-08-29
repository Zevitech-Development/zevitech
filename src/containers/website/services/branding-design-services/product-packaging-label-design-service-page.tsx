import React from "react";

import StatsSection from "@/sections/website/services/branding/stats-section";
import AboutSection from "@/sections/website/services/branding/about-section";
import { ServicesProcessSection01 } from "@/components/common/services-process-sections";
import { ServicesPorfolioSection02 } from "@/components/common/services-porfolio-sections";
import FaqSection from "@/components/common/faq-section";

import WhyChooseUsProductPackagingImg01 from "../../../../../public/images/services/branding/why-choose-us-product-packaging-01.jpg";
import WhyChooseUsProductPackagingImg02 from "../../../../../public/images/services/branding/why-choose-us-product-packaging-02.jpg";
import WhyChooseUsProductPackagingImg03 from "../../../../../public/images/services/branding/why-choose-us-product-packaging-03.jpg";
import {
  GiMagnifyingGlass,
  GiPaintBrush,
  GiArchiveRegister,
} from "react-icons/gi";
import ServicesHeroSections01 from "@/components/common/services-hero-sections";
import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import { PortfolioProductPackagingLabelDesignContent } from "@/content/services/branding-content";
import CampaignsSection from "@/elements/website/home/campaigns";
import CTA02 from "@/components/common/cta02";
import ContactSection from "@/elements/website/home/home-contact-section";
import { FaqDataPackagingDesign } from "@/content/services/product-packaging-&-label-design/product-packaging-&-label-content";

import BrandingDesignBadgeIcon01 from "../../../../../public/icons/branding-design-badge-icon-01.webp";
import BrandingDesignBadgeIcon02 from "../../../../../public/icons/branding-design-badge-icon-02.webp";
import BrandingDesignBadgeIcon03 from "../../../../../public/icons/branding-design-badge-icon-03.webp";
import BrandingDesignBadgeIcon04 from "../../../../../public/icons/branding-design-badge-icon-04.jpg";
import BrandingDesignBadgeIcon05 from "../../../../../public/icons/branding-design-badge-icon-05.jpg";
import BrandingDesignBadgeIcon06 from "../../../../../public/icons/branding-design-badge-icon-06.jpg";

import HeroImage from "../../../../../public/images/2d-image.png";

function ProductPackagingLabelDesignServicePage() {
  return (
    <main className="page-layout-standard">
      <ServicesHeroSections01
        title="Product Packaging & Label Design – Packaging That Sells Itself"
        desc="We design eye-catching and functional packaging and labels that make your products stand out on shelves and connect with your target audience."
      />
      <StatsSection />
      <WhyChooseUsSection01
        img01={WhyChooseUsProductPackagingImg01}
        img02={WhyChooseUsProductPackagingImg02}
        img03={WhyChooseUsProductPackagingImg03}
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
      <AboutSection
        badge={{ text: "About Packaging & Label Design" }}
        heading="Packaging That Sells Your Product at First Glance"
        paragraphs={[
          "Our packaging and label designs are crafted to grab attention, communicate value, and reflect your brand identity.",
          "We combine functionality and beauty to create designs that stand out on shelves and online marketplaces.",
        ]}
        buttons={{
          primary: {
            text: "Get Started",
          },
          secondary: {
            text: "Chat Now",
          },
        }}
        badges={[
          {
            src: BrandingDesignBadgeIcon01,
            alt: "Branding & Design Badge",
            width: 70,
          },
          {
            src: BrandingDesignBadgeIcon02,
            alt: "Branding & Design Badge",
            width: 70,
          },
          {
            src: BrandingDesignBadgeIcon03,
            alt: "Branding & Design Badge",
            width: 75,
          },
          {
            src: BrandingDesignBadgeIcon04,
            alt: "Branding & Design Badge",
            width: 80,
          },
          {
            src: BrandingDesignBadgeIcon05,
            alt: "Branding & Design Badge",
            width: 90,
          },
          {
            src: BrandingDesignBadgeIcon06,
            alt: "Branding & Design Badge",
            width: 60,
          },
        ]}
        rightSideImage={{
          src: HeroImage,
          alt: "Zevitech Design & Branding showcase",
          className: "shadow-lg",
        }}
      />

      <CTA02
        backgroundClass="bg-about-cta"
        heading="Stand Out with Stunning Packaging Design"
        text="Creative and functional packaging that captures attention and builds your brand presence."
      />

      <ServicesProcessSection01
        title="Our Packaging & Label Design Process"
        description="From concept to shelf, we design packaging and labels that captivate customers and communicate your brand's value."
        process01Icon={
          <GiMagnifyingGlass className="text-primary text-3xl sm:text-4xl" />
        }
        process01Title="Market & Product Research"
        process01Desc="We analyze your product, audience, and competition to define an effective design direction tailored for your market."
        process02Icon={
          <GiPaintBrush className="text-primary text-3xl sm:text-4xl" />
        }
        process02Title="Creative Design & Mockups"
        process02Desc="Our designers craft visually stunning and brand-aligned packaging and label designs with real-world mockups."
        process03Icon={
          <GiArchiveRegister className="text-primary text-3xl sm:text-4xl" />
        }
        process03Title="Print-Ready Delivery"
        process03Desc="You'll receive high-resolution, print-ready files and dielines to ensure flawless production across formats."
      />

      <ContactSection />

      <FaqSection faqs={FaqDataPackagingDesign} />
    </main>
  );
}

export default ProductPackagingLabelDesignServicePage;
