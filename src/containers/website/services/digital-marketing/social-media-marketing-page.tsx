import React from "react";

import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import CampaignsSection from "@/components/common/campaigns";
import ContactSection from "@/components/common/contact-section";
import FaqSection from "@/components/common/faq-section";
import Cta from "@/components/common/cta";
import { ServicesPorfolioSection02 } from "@/components/common/services-porfolio-sections";
import { DynamicHero } from "@/components/common/dynamic-hero";

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
} from "@/content/overall-services-content/all-services-content";

import { Megaphone } from "lucide-react";

const SocialMediaMarketingPage = () => {
  return (
    <main className="">
      <DynamicHero
        badgeIcon={<Megaphone />}
        badgeText="Digital Marketing"
        heading="Boost your online presence with"
        highlightText="strategic social media marketing"
        subheading="Engaging, data-driven, and brand-focused"
        description="Zevitech helps brands grow through tailored social media marketing strategies. We create impactful campaigns that increase reach, engagement, and conversions across all major platforms."
        heroImage={SocialMediaMarketingHeroImg}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsSocialMediaMarketingImg01}
        img02={WhyChooseUsSocialMediaMarketingImg02}
        img03={WhyChooseUsSocialMediaMarketingImg03}
        badgeCotent="Why Choose Us"
        title="Why Choose Zevitech for Social Media Marketing?"
        desc01="At Zevitech, we craft data-driven social media strategies that enhance your brand visibility and build meaningful engagement with your audience."
        desc02="Our team manages content creation, campaigns, and analytics to help your business grow across all major platforms like Facebook, Instagram, and LinkedIn."
      />

      <CampaignsSection />

      <ServicesPorfolioSection02
        title="Social Media Marketing That Grows Your Brand Online"
        description="Explore our portfolio of successful social media marketing campaigns designed to boost engagement, awareness, and conversions. From creative content strategies to targeted ad campaigns, we help brands build strong connections and achieve measurable growth across all platforms."
        portfolioImages={PortfolioSocialMediaMarketingContent}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsSocialMediaMarketingImg04}
        img02={WhyChooseUsSocialMediaMarketingImg05}
        img03={WhyChooseUsSocialMediaMarketingImg06}
        badgeCotent="About Social Media Marketing"
        sectionOrder="order-2"
        title="Engage, Grow, and Convert"
        desc01="We design creative campaigns, compelling visuals, and targeted ads that connect your brand with the right audience."
        desc02="Perfect for businesses aiming to boost brand awareness, generate leads, and achieve measurable growth through social media."
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
