import React from "react";

import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import CampaignsSection from "@/components/common/campaigns";
import ContactSection from "@/components/common/contact-section";
import FaqSection from "@/components/common/faq-section";
import Cta from "@/components/common/cta";
import { ServicesPorfolioSection02 } from "@/components/common/services-porfolio-sections";
import { DynamicHero } from "@/components/common/dynamic-hero";
import TopicHighlightsSection from "@/components/common/topic-highlights-section";

import WhyChooseUsSocialMediaMarketingImg01 from "../../../../../public/images/services/digital-marketing/why-choose-us-social-media-marketing-img01.jpg";
import WhyChooseUsSocialMediaMarketingImg02 from "../../../../../public/images/services/digital-marketing/why-choose-us-social-media-marketing-img02.jpg";
import WhyChooseUsSocialMediaMarketingImg03 from "../../../../../public/images/services/digital-marketing/why-choose-us-social-media-marketing-img03.gif";
import WhyChooseUsSocialMediaMarketingImg04 from "../../../../../public/images/services/digital-marketing//why-choose-us-social-media-marketing-img04.jpg";
import WhyChooseUsSocialMediaMarketingImg05 from "../../../../../public/images/services/digital-marketing/why-choose-us-social-media-marketing-img05.jpg";
import WhyChooseUsSocialMediaMarketingImg06 from "../../../../../public/images/services/digital-marketing/why-choose-us-social-media-marketing-img06.gif";

import CtaImg from "../../../../../public/images/cta-image.webp";
import SocialMediaMarketingHeroImg from "../../../.././../public/images/hero-images/socail-media-marketing-hero-img.png";

import {
  FaqDataSocialMediaMarketing,
  PortfolioSocialMediaMarketingContent,
  SocialMediaTopicHighlights,
} from "@/content/overall-services-content/all-services-content";

import { Megaphone } from "lucide-react";

const SocialMediaMarketingPage = () => {
  return (
    <main className="">
      <DynamicHero
        badgeIcon={<Megaphone />}
        badgeText="Digital Marketing"
        heading="Strategic Social Media Marketing"
        highlightText="& Paid Advertising Services"
        subheading="Engaging, data-driven, and brand-focused"
        description="Zevitech helps brands grow through tailored social media marketing strategies. We create impactful campaigns that increase reach, engagement, and conversions across all major platforms."
        heroImage={SocialMediaMarketingHeroImg}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsSocialMediaMarketingImg01}
        img02={WhyChooseUsSocialMediaMarketingImg02}
        img03={WhyChooseUsSocialMediaMarketingImg03}
        badgeCotent="Why Choose Us"
        title="Performance Paid Social Media Advertising (Meta, TikTok & LinkedIn)"
        desc01="Zevitech delivers paid social media advertising services built on data — tightly targeted campaigns that lift brand visibility and drive measurable engagement."
        desc02="As a Meta ads management agency, our team runs creative, budget, and analytics across Facebook, Instagram, TikTok, and LinkedIn to scale what converts."
      />

      <CampaignsSection />

      <ServicesPorfolioSection02
        title="B2B Social Media Marketing & Demand Generation"
        description="Explore our work as a social media marketing agency for B2B brands — demand generation programs that fill pipeline, not just feeds. From LinkedIn marketing for business to full-funnel paid campaigns, we build connections that turn into revenue."
        portfolioImages={PortfolioSocialMediaMarketingContent}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsSocialMediaMarketingImg04}
        img02={WhyChooseUsSocialMediaMarketingImg05}
        img03={WhyChooseUsSocialMediaMarketingImg06}
        badgeCotent="About Social Media Marketing"
        sectionOrder="order-2"
        title="SMM Agency Services Across Every Major Platform"
        desc01="We design creative campaigns, compelling visuals, and targeted ads that connect your brand with the right audience."
        desc02="Our SMM agency services suit businesses aiming to build brand awareness, generate qualified leads, and prove measurable growth from social."
      />

      <TopicHighlightsSection
        title="Creative Production, Copywriting & Conversion Tracking"
        description="Ad creative, copywriting, and conversion tracking built into platform-specific programs — so you can see exactly which campaigns produce pipeline."
        topics={SocialMediaTopicHighlights}
      />

      <ContactSection />

      <Cta
        image={CtaImg}
        heading="Grow Your Brand with Social Media Marketing"
        text="At Zevitech, we craft data-driven social media strategies that boost engagement, increase followers, and strengthen your brand presence. From content creation to campaign management, we help you connect with your audience and achieve real business results."
      />

      <FaqSection faqItems={FaqDataSocialMediaMarketing} defaultOpenIndex={0} />
    </main>
  );
};

export default SocialMediaMarketingPage;
