import React from "react";

import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import CampaignsSection from "@/components/common/campaigns";
import ContactSection from "@/components/common/contact-section";
import FaqSection from "@/components/common/faq-section";
import Cta from "@/components/common/cta";
import ScrollingApproachesSection from "@/components/common/scrolling-approach-section";
import DynamicServicesSection from "@/components/common/services-section";

import WhyChooseUsAmazonMarketingImg01 from "../../../../../public/images/services/digital-marketing/why-choose-us-amazon-marketing-img01.jpg";
import WhyChooseUsAmazonMarketingImg02 from "../../../../../public/images/services/digital-marketing/why-choose-us-amazon-marketing-img02.jpg";
import WhyChooseUsAmazonMarketingImg03 from "../../../../../public/images/services/digital-marketing/why-choose-us-amazon-marketing-img03.jpg";
import WhyChooseUsAmazonMarketingImg04 from "../../../../../public/images/services/digital-marketing/why-choose-us-amazon-marketing-img04.jpg";
import WhyChooseUsAmazonMarketingImg05 from "../../../../../public/images/services/digital-marketing/why-choose-us-amazon-marketing-img05.jpg";
import WhyChooseUsAmazonMarketingImg06 from "../../../../../public/images/services/digital-marketing/why-choose-us-amazon-marketing-img06.jpg";

import CtaImg from "../../../../../public/images/cta-image.webp";
import AmazonMarketingHeroImg from "../../../.././../public/images/hero-images/amazon-marketing-hero-img.png";

import {
  amazonMarketingAdvantagesData,
  amazonMarketingApproachesData,
  FaqDataAmazonMarketing,
} from "@/content/overall-services-content/all-services-content";
import { DynamicHero } from "@/components/common/dynamic-hero";
import { ShoppingCart } from "lucide-react";

function AmazonMarketingPage() {
  return (
    <main className="">
      <DynamicHero
        badgeIcon={<ShoppingCart />}
        badgeText="Ecommerce Marketing"
        heading="Boost your product visibility with"
        highlightText="expert Amazon marketing"
        subheading="Optimized, data-driven, and sales-focused"
        description="Zevitech helps brands succeed on Amazon through powerful marketing strategies. From product listings to sponsored ads, we enhance visibility, drive traffic, and increase your online sales performance."
        heroImage={AmazonMarketingHeroImg}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsAmazonMarketingImg01}
        img02={WhyChooseUsAmazonMarketingImg02}
        img03={WhyChooseUsAmazonMarketingImg03}
        badgeCotent="Why Choose Us"
        title="Why Choose Zevitech for Amazon Marketing?"
        desc01="At Zevitech, we help brands maximize their visibility and sales on Amazon through strategic advertising, listing optimization, and data-driven marketing."
        desc02="Our Amazon experts manage your campaigns, product pages, and performance analytics to ensure your brand stands out in a competitive marketplace."
      />

      <DynamicServicesSection
        title="Amazon Marketing"
        highlightedText="Advantages"
        description="Our Amazon marketing solutions empower your brand to outperform competitors, increase visibility, and boost profitability. By leveraging advanced data insights, strategic advertising, and continuous optimization, we help you achieve long-term success in the competitive Amazon marketplace."
        servicesData={amazonMarketingAdvantagesData}
      />

      <CampaignsSection />

      <ScrollingApproachesSection
        mainTitle="Amazon Marketing"
        highlightedWord="Approaches We Use"
        subtitle="We implement data-driven and performance-focused Amazon marketing strategies to boost your product visibility, maximize ROI, and drive consistent sales growth."
        leftCardTitle="Our Proven Amazon Marketing Methodology"
        leftCardDescription="Our Amazon marketing approach combines keyword optimization, PPC campaigns, store management, and performance analytics to ensure your brand stands out in the competitive Amazon marketplace. We focus on improving rankings, conversions, and overall profitability with smart, data-backed strategies."
        approaches={amazonMarketingApproachesData}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsAmazonMarketingImg04}
        img02={WhyChooseUsAmazonMarketingImg05}
        img03={WhyChooseUsAmazonMarketingImg06}
        badgeCotent="About Amazon Marketing"
        sectionOrder="order-2"
        title="Boost Sales with Smart Amazon Strategies"
        desc01="We craft customized Amazon marketing solutions including PPC management, SEO optimization, and brand store creation to enhance your reach."
        desc02="Perfect for sellers and businesses looking to increase conversions, improve rankings, and build a strong presence on Amazon."
      />

      <ContactSection />

      <Cta
        image={CtaImg}
        heading="Boost Sales with Expert Amazon Marketing"
        text="At Zevitech, we help brands succeed on Amazon through strategic marketing and optimization. From product listings and keyword targeting to sponsored ads and performance analysis, our Amazon marketing solutions are designed to increase visibility, drive sales, and grow your store’s reputation."
      />

      <FaqSection faqItems={FaqDataAmazonMarketing} defaultOpenIndex={0} />
    </main>
  );
}

export default AmazonMarketingPage;
