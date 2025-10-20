import React from "react";

import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import CampaignsSection from "@/components/common/campaigns";
import ContactSection from "@/components/common/contact-section";
import FaqSection from "@/components/common/faq-section";
import Cta from "@/components/common/cta";
import { ServicesPorfolioSection02 } from "@/components/common/services-porfolio-sections";

import WhyChooseUsSocialMediaKitImg01 from "../../../../../public/images/services/branding/why-choose-us-social-media-kit-01.webp";
import WhyChooseUsSocialMediaKitImg02 from "../../../../../public/images/services/branding/why-choose-us-social-media-kit-02.webp";
import WhyChooseUsSocialMediaKitImg03 from "../../../../../public/images/services/branding/why-choose-us-social-media-kit-03.webp";
import WhyChooseUsProductPackagingImg04 from "../../../../../public/images/services/branding/why-choose-us-social-media-kit-04.jpeg";
import WhyChooseUsProductPackagingImg05 from "../../../../../public/images/services/branding/why-choose-us-social-media-kit-05.jpeg";
import WhyChooseUsProductPackagingImg06 from "../../../../../public/images/services/branding/why-choose-us-social-media-kit-06.jpeg";

import CtaImg from "../../../../../public/images/cta-image.webp";
import SocailMediakitHeroImg from "../../../../../public/images/hero-images/socail-media-kit-hero-img.jpg";

import { FaqDataSocialMediaKitDesign } from "@/content/overall-services-content/all-services-content";
import { PortfolioSocialMediaKitDesignContent } from "@/content/services/branding-content";
import { DynamicHero } from "@/components/common/dynamic-hero";
import { Share2 } from "lucide-react";

const SocialMediaKitDesignServicePage = () => {
  return (
    <main className="">
      <DynamicHero
        badgeIcon={<Share2 />}
        badgeText="Digital Brand Presence"
        heading="Build a consistent brand across"
        highlightText="every social platform"
        subheading="Cohesive visuals, powerful impressions"
        description="Zevitech designs complete social media kits that keep your brand identity strong and unified. From profile graphics to post templates, we ensure every element reflects your brand’s voice and visual appeal."
        heroImage={SocailMediakitHeroImg}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsSocialMediaKitImg01}
        img02={WhyChooseUsSocialMediaKitImg02}
        img03={WhyChooseUsSocialMediaKitImg03}
        badgeCotent="Why Choose Us"
        title="Why Choose Zevitech for Social Media Kit Design?"
        desc01="We design cohesive and eye-catching social media kits that elevate your online presence and keep your branding consistent across all platforms."
        desc02="Our creative team ensures your posts, banners, and profiles align perfectly with your brand identity to engage and grow your audience."
      />

      <CampaignsSection />

      <ServicesPorfolioSection02
        title="Social Media Kit Designs That Build Your Brand"
        description="Browse our curated social media kit designs crafted to give brands a cohesive and professional look across platforms. From profile banners to story templates, we create visual assets that amplify your online presence."
        portfolioImages={PortfolioSocialMediaKitDesignContent}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsProductPackagingImg04}
        img02={WhyChooseUsProductPackagingImg05}
        img03={WhyChooseUsProductPackagingImg06}
        badgeCotent="About Social Media Kit Design"
        sectionOrder="order-2"
        title="Creative Content That Converts"
        desc01="We design cohesive and eye-catching social media kits, including templates, covers, and profile assets tailored to your brand."
        desc02="Perfect for entrepreneurs and businesses wanting to elevate their online presence with style and consistency."
      />

      <ContactSection />

      <Cta
        image={CtaImg}
        heading="Boost Your Online Presence with a Social Media Kit"
        text="At Zevitech, we design cohesive social media kits that keep your brand consistent across all platforms. From profile graphics to post templates, our kits help you engage audiences and strengthen your digital identity."
      />

      <FaqSection faqItems={FaqDataSocialMediaKitDesign} defaultOpenIndex={0} />
    </main>
  );
};

export default SocialMediaKitDesignServicePage;
