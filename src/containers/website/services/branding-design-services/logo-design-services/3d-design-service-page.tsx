import React from "react";

import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import CampaignsSection from "@/components/common/campaigns";
import ContactSection from "@/components/common/contact-section";
import FaqSection from "@/components/common/faq-section";
import Cta from "@/components/common/cta";
import { ServicesPorfolioSection01 } from "@/components/common/services-porfolio-sections";
import { DynamicHero } from "@/components/common/dynamic-hero";

import WhyChooseUs3DImg01 from "../../../../../../public/images/services/branding/why-choose-us-3d-01.png";
import WhyChooseUs3DImg02 from "../../../../../../public/images/services/branding/why-choose-us-3d-02.jpg";
import WhyChooseUs3DImg03 from "../../../../../../public/images/services/branding/why-choose-us-3d-03.jpg";
import WhyChooseUs3DImg04 from "../../../../../../public/images/services/branding/why-choose-us-3d-04.jpg";
import WhyChooseUs3DImg05 from "../../../../../../public/images/services/branding/why-choose-us-3d-05.jpg";
import WhyChooseUs3DImg06 from "../../../../../../public/images/services/branding/why-choose-us-3d-06.jpg";

import CtaImg from "../../../../../../public/images/cta-image.webp";
import Hero3dLogoImg from "../../../../../../public/images/hero-images/3d-logo-hero-img.jpg";

import { Portfolio3DLogoDesignContent } from "@/content/services/branding-content";
import { FaqData3DLogoDesign } from "@/content/services/logo-design-services/logo-design-services-content";

import { FaCube } from "react-icons/fa";

const Design3dServicePage = () => {
  return (
    <main className="">
      <DynamicHero
        badgeIcon={<FaCube />}
        badgeText="Modern Brand Identity"
        heading="Bring your brand to life with stunning"
        highlightText="3D logo designs"
        subheading="Depth, detail, and dynamic visuals"
        description="Zevitech creates 3D logos that add dimension, realism, and impact to your brand identity. Our designs blend creativity with precision to ensure your logo stands out across every platform and medium."
        heroImage={Hero3dLogoImg}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUs3DImg01}
        img02={WhyChooseUs3DImg02}
        img03={WhyChooseUs3DImg03}
        badgeCotent="Why Choose Us"
        title="Why Choose Zevitech for 3D Logo Design?"
        desc01="Our 3D logo designs are crafted to give your brand depth, dimension, and a striking visual presence that stands out in today's competitive market."
        desc02="We combine creativity with technical expertise to deliver bold and modern logos that make a lasting impression across all platforms."
      />

      <CampaignsSection />

      <ServicesPorfolioSection01
        title="3D Logos That Captivate & Impress"
        description="Explore bold, dimensional 3D logos designed to elevate your brand's visual presence and leave a strong impression across digital and physical platforms."
        portfolioImages={Portfolio3DLogoDesignContent}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUs3DImg04}
        img02={WhyChooseUs3DImg05}
        img03={WhyChooseUs3DImg06}
        badgeCotent="About 3D Logo Design"
        sectionOrder="order-2"
        title="Bring Your Brand to Life in 3D"
        desc01="Zevitech’s 3D logo designs offer depth, realism, and visual impact—perfect for businesses looking to stand out with a dynamic identity."
        desc02="Whether for digital displays or product packaging, our 3D logos give your brand an immersive and professional presence."
      />

      <ContactSection />

      <Cta
        image={CtaImg}
        heading="Bring Your Brand to Life with a 3D Logo"
        text="At Zevitech, we design bold and dynamic 3D logos that add depth and realism to your brand identity. Make your business stand out with a modern logo that leaves a lasting impression."
      />

      <FaqSection faqItems={FaqData3DLogoDesign} defaultOpenIndex={0} />
    </main>
  );
};

export default Design3dServicePage;
