import React from "react";

import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import CampaignsSection from "@/components/common/campaigns";
import ContactSection from "@/components/common/contact-section";
import FaqSection from "@/components/common/faq-section";
import Cta from "@/components/common/cta";
import { ServicesPorfolioSection02 } from "@/components/common/services-porfolio-sections";
import { DynamicWebsiteDevHero } from "@/components/common/dynamic-website-dev-hero";

import WhyChooseUsJoomlaWebsiteDevelopmentImg01 from "../../../../../public/images/services/design-and-development/why-choose-us-joomla-website-img01.png";
import WhyChooseUsJoomlaWebsiteDevelopmentImg02 from "../../../../../public/images/services/design-and-development/why-choose-us-joomla-website-img02.png";
import WhyChooseUsJoomlaWebsiteDevelopmentImg03 from "../../../../../public/images/services/design-and-development/why-choose-us-joomla-website-img03.png";
import WhyChooseUsJoomlaWebsiteDevelopmentImg04 from "../../../../../public/images/services/design-and-development/why-choose-us-joomla-website-img04.png";
import WhyChooseUsJoomlaWebsiteDevelopmentImg05 from "../../../../../public/images/services/design-and-development/why-choose-us-joomla-website-img05.png";
import WhyChooseUsJoomlaWebsiteDevelopmentImg06 from "../../../../../public/images/services/design-and-development/why-choose-us-joomla-website-img06.png";

import CtaImg from "../../../../../public/images/cta-image.webp";
import joomlaWebHeroImg from "../../../../../public/images/hero-images/joomla-web-hero-img.png";

import {
  FaqDataJoomlaWebsite,
  PortfolioJoomlaWebsiteDevelopmentContent,
} from "@/content/overall-services-content/all-services-content";

import { Code2 } from "lucide-react";

function JoomlaWebsiteDevelopmentPage() {
  return (
    <main className="">
      <DynamicWebsiteDevHero
        badgeIcon={<Code2 />}
        badgeText="Web Development Solutions"
        heading="Build dynamic websites with"
        highlightText="custom Joomla development"
        subheading="Flexible, secure, and content-driven"
        description="Zevitech develops robust Joomla websites that empower businesses with full control and flexibility. Our expert team builds scalable, SEO-friendly solutions tailored to your specific goals and audience."
        heroImage={joomlaWebHeroImg}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsJoomlaWebsiteDevelopmentImg01}
        img02={WhyChooseUsJoomlaWebsiteDevelopmentImg02}
        img03={WhyChooseUsJoomlaWebsiteDevelopmentImg03}
        badgeCotent="Why Choose Us"
        title="Why Choose Zevitech for Joomla Website Development?"
        desc01="At Zevitech, we build dynamic and secure Joomla websites tailored to your business needs, ensuring flexibility and ease of management."
        desc02="Our Joomla experts deliver high-quality solutions with custom extensions, responsive designs, and smooth functionality to power your online growth."
      />

      <CampaignsSection />

      <ServicesPorfolioSection02
        title="Joomla Website Development for Dynamic Online Solutions"
        description="Browse our portfolio of Joomla-powered websites built for businesses that need flexibility, scalability, and strong content management. From corporate portals to e-commerce solutions, we craft Joomla websites tailored to your specific goals."
        portfolioImages={PortfolioJoomlaWebsiteDevelopmentContent}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsJoomlaWebsiteDevelopmentImg04}
        img02={WhyChooseUsJoomlaWebsiteDevelopmentImg05}
        img03={WhyChooseUsJoomlaWebsiteDevelopmentImg06}
        badgeCotent="About Joomla Development"
        sectionOrder="order-2"
        title="Flexible CMS Solutions That Work"
        desc01="We craft Joomla websites with intuitive navigation, custom features, and seamless integrations to meet your unique business goals."
        desc02="Perfect for businesses and organizations seeking a reliable, scalable, and easy-to-manage content management system."
      />

      <ContactSection />

      <Cta
        image={CtaImg}
        heading="Enhance Your Online Presence with Joomla Development"
        text="At Zevitech, we build dynamic and secure Joomla websites tailored to your business needs. Our Joomla solutions offer powerful content management, custom extensions, and user-friendly designs that help your brand grow online with confidence."
      />

      <FaqSection faqItems={FaqDataJoomlaWebsite} defaultOpenIndex={0} />
    </main>
  );
}

export default JoomlaWebsiteDevelopmentPage;
