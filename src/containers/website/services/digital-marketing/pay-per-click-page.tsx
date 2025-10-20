import React from "react";

import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import CampaignsSection from "@/components/common/campaigns";
import ContactSection from "@/components/common/contact-section";
import FaqSection from "@/components/common/faq-section";
import Cta from "@/components/common/cta";
import ScrollingApproachesSection from "@/components/common/scrolling-approach-section";
import DynamicServicesSection from "@/components/common/services-section";
import { DynamicHero } from "@/components/common/dynamic-hero";

import WhyChooseUsPayPerClickImg01 from "../../../../../public/images/services/digital-marketing/why-choose-us-ppc-img01.jpg";
import WhyChooseUsPayPerClickImg02 from "../../../../../public/images/services/digital-marketing/why-choose-us-ppc-img02.jpg";
import WhyChooseUsPayPerClickImg03 from "../../../../../public/images/services/digital-marketing/why-choose-us-ppc-img03.jpg";
import WhyChooseUsPayPerClickImg04 from "../../../../../public/images/services/digital-marketing/why-choose-us-ppc-img04.jpg";
import WhyChooseUsPayPerClickImg05 from "../../../../../public/images/services/digital-marketing/why-choose-us-ppc-img05.jpg";
import WhyChooseUsPayPerClickImg06 from "../../../../../public/images/services/digital-marketing/why-choose-us-ppc-img06.jpg";

import CtaImg from "../../../../../public/images/cta-image.webp";
import PayPerClickHeroImg from "../../../.././../public/images/hero-images/ppc-hero-img.png";

import {
  FaqDataPayPerClick,
  payPerClickAdvantagesData,
  payPerClickApproachesData,
} from "@/content/overall-services-content/all-services-content";

import { MousePointerClick } from "lucide-react";

function PayPerClickPage() {
  return (
    <main className="">
      <DynamicHero
        badgeIcon={<MousePointerClick />}
        badgeText="Digital Advertising"
        heading="Drive instant traffic with"
        highlightText="targeted PPC advertising"
        subheading="Strategic, measurable, and ROI-focused"
        description="Zevitech delivers high-performing PPC campaigns that maximize your return on investment. From keyword targeting to ad optimization, we help your business reach the right audience at the right time."
        heroImage={PayPerClickHeroImg}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsPayPerClickImg01}
        img02={WhyChooseUsPayPerClickImg02}
        img03={WhyChooseUsPayPerClickImg03}
        badgeCotent="Why Choose Us"
        title="Why Choose Zevitech for Pay-Per-Click Advertising?"
        desc01="At Zevitech, we create result-oriented PPC campaigns that drive quality traffic, generate leads, and maximize your ROI across Google Ads and social platforms."
        desc02="Our certified PPC specialists optimize every ad, keyword, and landing page to ensure your marketing budget delivers measurable business growth."
      />

      <DynamicServicesSection
        title="Pay Per Click Advertising"
        highlightedText="Advantages"
        description="Our Pay Per Click (PPC) advertising solutions empower businesses to reach the right audience, generate instant traffic, and achieve measurable results. Discover how PPC can accelerate your growth and deliver a higher return on investment."
        servicesData={payPerClickAdvantagesData}
      />

      <CampaignsSection />

      <ScrollingApproachesSection
        mainTitle="Pay Per Click"
        highlightedWord="Approaches We Use"
        subtitle="Our Pay Per Click approach focuses on strategic targeting, creative optimization, and real-time data analysis to maximize ROI and deliver measurable business growth."
        leftCardTitle="Our Proven Pay Per Click Methodology"
        leftCardDescription="We follow a systematic and results-oriented PPC methodology to drive quality traffic and maximize conversions. From campaign strategy and keyword targeting to ad testing and performance tracking, our approach ensures every click adds real value to your business."
        approaches={payPerClickApproachesData}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsPayPerClickImg04}
        img02={WhyChooseUsPayPerClickImg05}
        img03={WhyChooseUsPayPerClickImg06}
        badgeCotent="About PPC Marketing"
        sectionOrder="order-2"
        title="Targeted Campaigns That Convert"
        desc01="We design and manage high-performance PPC campaigns with real-time tracking, audience targeting, and continuous optimization."
        desc02="Perfect for businesses seeking instant visibility, better conversions, and scalable growth through paid advertising."
      />

      <ContactSection />

      <Cta
        image={CtaImg}
        heading="Drive Instant Traffic with Pay Per Click Advertising"
        text="At Zevitech, we create targeted PPC campaigns that deliver measurable results. From keyword research and ad creation to performance tracking, our experts ensure every click counts—helping you maximize ROI and reach the right audience instantly."
      />

      <FaqSection faqItems={FaqDataPayPerClick} defaultOpenIndex={0} />
    </main>
  );
}

export default PayPerClickPage;
