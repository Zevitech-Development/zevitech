import React from "react";

import { LandingDynamicHero } from "@/components/common/landing-dynamic-hero";
import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import CampaignsSection from "@/components/common/campaigns";
import ScrollingApproachesSection from "@/components/common/scrolling-approach-section";
import DynamicServicesSection from "@/components/common/services-section";
import CommonResultSection from "@/components/common/common-result-section";
import WebDesignContactSection from "@/elements/business/website-design/web-design-contact-section";
import LandingReviewsSection from "@/components/common/reviews-section";

import WhyChooseUsGoogleAdsImg01 from "../../../../../public/images/landing/why-choose-us-google-ads-img01.png";
import WhyChooseUsGoogleAdsImg02 from "../../../../../public/images/landing/why-choose-us-google-ads-img02.png";
import WhyChooseUsGoogleAdsImg03 from "../../../../../public/images/landing/why-choose-us-google-ads-img03.png";
import WhyChooseUsGoogleAdsImg04 from "../../../../../public/images/landing/why-choose-us-google-ads-img04.png";
import WhyChooseUsGoogleAdsImg05 from "../../../../../public/images/landing/why-choose-us-google-ads-img05.png";
import WhyChooseUsGoogleAdsImg06 from "../../../../../public/images/landing/why-choose-us-google-ads-img06.jpg";

import { FaGlobe } from "react-icons/fa";

import {
  googleAdsAdvantagesData,
  googleAdsApproachesData,
  GoogleAdsResultSectionContent,
} from "@/content/landing/google-ads-page-content";

function GoogleAdsPage() {
  return (
    <main className="">
      <LandingDynamicHero
        badgeIcon={<FaGlobe />}
        badgeText="Web Solutions"
        normalText="Drive instant traffic with"
        highlightText="targeted google ads advertising"
        subheading="Strategic, measurable, and ROI-focused"
        description="Zevitech delivers high-performing google ads campaigns that maximize ROI by reaching the right audience with precise targeting and optimized ads."
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsGoogleAdsImg01}
        img02={WhyChooseUsGoogleAdsImg02}
        img03={WhyChooseUsGoogleAdsImg03}
        badgeCotent="Why Choose Us"
        title="Why Choose Zevitech for Google Ads Management?"
        desc01="At Zevitech, we build high-performing Google Ads campaigns that boost visibility, attract qualified traffic, and maximize your conversions with precise targeting strategies."
        desc02="Our certified Google Ads specialists optimize every keyword, ad group, and landing page to ensure your budget delivers measurable results and long-term business growth."
      />

      <DynamicServicesSection
        title="Google Ads"
        highlightedText="Advantages"
        description="Our Google Ads solutions help businesses reach the right audience, drive high-quality traffic, and generate measurable results. Discover how Google Ads can accelerate your growth and deliver a stronger return on investment."
        servicesData={googleAdsAdvantagesData}
      />

      <CampaignsSection />

      <ScrollingApproachesSection
        mainTitle="Google Ads"
        highlightedWord="Approaches We Use"
        subtitle="Our Google Ads approach focuses on strategic targeting, creative optimization, and real-time data analysis to maximize ROI and deliver measurable business growth."
        leftCardTitle="Our Proven Google Ads Methodology"
        leftCardDescription="We follow a systematic and results-oriented Google Ads methodology to drive quality traffic and maximize conversions. From campaign strategy and keyword targeting to ad testing and performance tracking, our approach ensures every click adds real value to your business."
        approaches={googleAdsApproachesData}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsGoogleAdsImg04}
        img02={WhyChooseUsGoogleAdsImg05}
        img03={WhyChooseUsGoogleAdsImg06}
        badgeCotent="About Google Ads"
        sectionOrder="order-2"
        title="High-Performing Google Ads Campaigns"
        desc01="We create and manage targeted Google Ads campaigns with real-time tracking, audience segmentation, and continuous optimization for maximum results."
        desc02="Ideal for businesses looking to increase visibility, generate qualified leads, and achieve scalable growth through paid search advertising."
      />

      <WebDesignContactSection />

      <CommonResultSection
        subtitle="Proven Ad Success"
        title="Campaigns That Deliver"
        titleHighlight="Real Conversions!"
        description="We don’t just manage Google Ads — we build data-driven campaigns that maximize ROI and attract high-intent customers. Explore real Google Ads results, performance insights, and success stories from our satisfied clients."
        results={GoogleAdsResultSectionContent}
      />

      {/* <Cta
        image={CtaImg}
        heading="Drive Instant Traffic with Pay Per Click Advertising"
        text="At Zevitech, we create targeted PPC campaigns that deliver measurable results. From keyword research and ad creation to performance tracking, our experts ensure every click counts—helping you maximize ROI and reach the right audience instantly."
      /> */}

      <LandingReviewsSection />
    </main>
  );
}

export default GoogleAdsPage;
