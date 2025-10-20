import React from "react";

import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import CampaignsSection from "@/components/common/campaigns";
import ContactSection from "@/components/common/contact-section";
import FaqSection from "@/components/common/faq-section";
import Cta from "@/components/common/cta";
import ScrollingApproachesSection from "@/components/common/scrolling-approach-section";
import DynamicServicesSection from "@/components/common/services-section";
import { DynamicHero } from "@/components/common/dynamic-hero";

import WhyChooseUsAppTestingImg01 from "../../../../../public/images/services/app-development/why-choose-us-app-testing-img01.jpg";
import WhyChooseUsAppTestingImg02 from "../../../../../public/images/services/app-development/why-choose-us-app-testing-img02.jpg";
import WhyChooseUsAppTestingImg03 from "../../../../../public/images/services/app-development/why-choose-us-app-testing-img03.jpg";
import WhyChooseUsAppTestingImg04 from "../../../../../public/images/services/app-development/why-choose-us-app-testing-img04.jpg";
import WhyChooseUsAppTestingImg05 from "../../../../../public/images/services/app-development/why-choose-us-app-testing-img05.jpg";
import WhyChooseUsAppTestingImg06 from "../../../../../public/images/services/app-development/why-choose-us-app-testing-img06.jpg";

import CtaImg from "../../../../../public/images/cta-image.webp";
import AppTestingHeroImg from "../../../.././../public/images/hero-images/app-testing-hero-img.jpg";

import {
  FaqDataAppTesting,
  appTestingApproachesData,
  appTestingServicesData,
} from "@/content/overall-services-content/all-services-content";

import { Bug } from "lucide-react";

function AppTestingPage() {
  return (
    <main className="">
      <DynamicHero
        badgeIcon={<Bug />}
        badgeText="Quality Assurance"
        heading="Ensure flawless performance with"
        highlightText="expert app testing services"
        subheading="Reliable, efficient, and bug-free solutions"
        description="Zevitech provides comprehensive app testing to ensure your product runs smoothly across all devices. Our QA experts detect and fix issues early, guaranteeing stability, security, and an exceptional user experience."
        heroImage={AppTestingHeroImg}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsAppTestingImg01}
        img02={WhyChooseUsAppTestingImg02}
        img03={WhyChooseUsAppTestingImg03}
        badgeCotent="Why Choose Us"
        title="Why Choose Zevitech for App Testing?"
        desc01="At Zevitech, we ensure your applications are bug-free, secure, and optimized for the best performance across all devices and platforms."
        desc02="Our expert QA engineers perform rigorous manual and automated testing to guarantee flawless functionality and a seamless user experience."
      />

      <DynamicServicesSection
        title="App Testing"
        highlightedText="Services"
        description=" In addition to offering a comprehensive range of testing tools,
            services, and facilities, we also ensure that every aspect of mobile
            testing support is delivered promptly, efficiently, and without
            unnecessary delays — helping your app perform flawlessly across all
            devices."
        servicesData={appTestingServicesData}
      />

      <CampaignsSection />

      <ScrollingApproachesSection
        mainTitle="Testing"
        highlightedWord="Approaches We Use"
        subtitle="We follow a strategic mobile testing process that ensures flawless performance, compatibility, and user experience across all devices and platforms."
        leftCardTitle="Our Proven Mobile Testing Methodology"
        leftCardDescription="We follow a structured and result-driven mobile testing methodology designed to deliver flawless app performance. By combining manual and automated testing, we ensure every feature functions seamlessly across different devices, operating systems, and network conditions — guaranteeing a smooth, consistent user experience."
        approaches={appTestingApproachesData}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsAppTestingImg04}
        img02={WhyChooseUsAppTestingImg05}
        img03={WhyChooseUsAppTestingImg06}
        badgeCotent="About App Testing"
        sectionOrder="order-2"
        title="Delivering Quality Without Compromise"
        desc01="We provide end-to-end testing services, including functionality, usability, compatibility, and performance testing for apps of all kinds."
        desc02="Perfect for startups and enterprises seeking reliable, efficient, and thorough quality assurance before launch."
      />

      <ContactSection />

      <Cta
        image={CtaImg}
        heading="Ensure Quality with Expert App Testing"
        text="At Zevitech, we provide comprehensive app testing services to ensure your applications run flawlessly. Our QA experts identify bugs, optimize performance, and guarantee smooth functionality across devices—so your users enjoy a perfect experience every time."
      />

      <FaqSection faqItems={FaqDataAppTesting} defaultOpenIndex={0} />
    </main>
  );
}

export default AppTestingPage;
