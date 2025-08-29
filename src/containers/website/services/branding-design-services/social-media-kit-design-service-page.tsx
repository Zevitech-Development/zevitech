import React from "react";

import StatsSection from "@/sections/website/services/branding/stats-section";
import AboutSection from "@/sections/website/services/branding/about-section";
import { ServicesProcessSection01 } from "@/components/common/services-process-sections";
import { ServicesPorfolioSection02 } from "@/components/common/services-porfolio-sections";
import FaqSection from "@/components/common/faq-section";

import WhyChooseUsSocialMediaKitImg01 from "../../../../../public/images/services/branding/why-choose-us-social-media-kit-01.webp";
import WhyChooseUsSocialMediaKitImg02 from "../../../../../public/images/services/branding/why-choose-us-social-media-kit-02.webp";
import WhyChooseUsSocialMediaKitImg03 from "../../../../../public/images/services/branding/why-choose-us-social-media-kit-03.webp";
import { GiTalk, GiSmartphone, GiMaterialsScience } from "react-icons/gi";
import ServicesHeroSections01 from "@/components/common/services-hero-sections";
import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import { PortfolioSocialMediaKitDesignContent } from "@/content/services/branding-content";
import CampaignsSection from "@/elements/website/home/campaigns";
import CTA02 from "@/components/common/cta02";
import ContactSection from "@/elements/website/home/home-contact-section";
import { FaqDataSocialMediaKitDesign } from "@/content/services/social-media-kit-design/social-media-design-content";

import BrandingDesignBadgeIcon01 from "../../../../../public/icons/branding-design-badge-icon-01.webp";
import BrandingDesignBadgeIcon02 from "../../../../../public/icons/branding-design-badge-icon-02.webp";
import BrandingDesignBadgeIcon03 from "../../../../../public/icons/branding-design-badge-icon-03.webp";
import BrandingDesignBadgeIcon04 from "../../../../../public/icons/branding-design-badge-icon-04.jpg";
import BrandingDesignBadgeIcon05 from "../../../../../public/icons/branding-design-badge-icon-05.jpg";
import BrandingDesignBadgeIcon06 from "../../../../../public/icons/branding-design-badge-icon-06.jpg";

import HeroImage from "../../../../../public/images/2d-image.png";

function SocialMediaKitDesignServicePage() {
  return (
    <main className="page-layout-standard">
      <ServicesHeroSections01
        title="Social Media Kit Design – Consistent & Engaging Across Platforms"
        desc="We create professional and engaging social media kits that ensure your brand looks consistent and impactful across all platforms."
      />
      <StatsSection />
      <WhyChooseUsSection01
        img01={WhyChooseUsSocialMediaKitImg01}
        img02={WhyChooseUsSocialMediaKitImg02}
        img03={WhyChooseUsSocialMediaKitImg03}
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
      <AboutSection
        badge={{ text: "About Social Media Kit Design" }}
        heading="Branded Social Content That Connects & Converts"
        paragraphs={[
          "We design cohesive and eye-catching social media kits, including templates, covers, and profile assets tailored to your brand.",
          "Perfect for entrepreneurs and businesses wanting to elevate their online presence with style and consistency.",
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
        backgroundClass="bg-home-cta"
        heading="Power Up Your Brand on Social Media"
        text="Custom-designed kits that keep your profiles consistent, professional, and engaging across every platform."
      />

      <ServicesProcessSection01
        title="Our Social Media Kit Design Process"
        description="We craft custom social media kits that amplify your brand voice, ensure consistency, and boost engagement across platforms."
        process01Icon={<GiTalk className="text-primary text-3xl sm:text-4xl" />}
        process01Title="Brand Voice Discovery"
        process01Desc="We dive into your brand’s tone, audience, and messaging goals to create a consistent and engaging design direction."
        process02Icon={
          <GiSmartphone className="text-primary text-3xl sm:text-4xl" />
        }
        process02Title="Platform-Specific Design"
        process02Desc="From Instagram to LinkedIn, we design visuals tailored to each platform’s specs and audience behavior."
        process03Icon={
          <GiMaterialsScience className="text-primary text-3xl sm:text-4xl" />
        }
        process03Title="Delivery of Editable Assets"
        process03Desc="You receive fully editable design kits and templates for stories, posts, banners, and profile visuals—ready to deploy."
      />

      <ContactSection />

      <FaqSection faqs={FaqDataSocialMediaKitDesign} />
    </main>
  );
}

export default SocialMediaKitDesignServicePage;
