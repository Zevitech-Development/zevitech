import React from "react";

import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import CampaignsSection from "@/components/common/campaigns";
import ContactSection from "@/components/common/contact-section";
import FaqSection from "@/components/common/faq-section";
import Cta from "@/components/common/cta";
import { ServicesPorfolioSection02 } from "@/components/common/services-porfolio-sections";
import { DynamicWebsiteDevHero } from "@/components/common/dynamic-website-dev-hero";

import WhyChooseUsPhpWebsiteDevelopmentImg01 from "../../../../../public/images/services/design-and-development/why-choose-us-php-website-img01.png";
import WhyChooseUsPhpWebsiteDevelopmentImg02 from "../../../../../public/images/services/design-and-development/why-choose-us-php-website-img02.png";
import WhyChooseUsPhpWebsiteDevelopmentImg03 from "../../../../../public/images/services/design-and-development/why-choose-us-php-website-img03.png";
import WhyChooseUsPhpWebsiteDevelopmentImg04 from "../../../../../public/images/services/design-and-development/why-choose-us-php-website-img04.png";
import WhyChooseUsPhpWebsiteDevelopmentImg05 from "../../../../../public/images/services/design-and-development/why-choose-us-php-website-img05.png";
import WhyChooseUsPhpWebsiteDevelopmentImg06 from "../../../../../public/images/services/design-and-development/why-choose-us-php-website-img06.png";

import CtaImg from "../../../../../public/images/cta-image.webp";
import PhpWebHeroImg from "../../../../../public/images/portfolio/ui-ux-img03.jpg";

import {
  FaqDataPhpWebsite,
  PortfolioPhpWebsiteDevelopmentContent,
} from "@/content/overall-services-content/all-services-content";

import { Braces } from "lucide-react";

function PhpWebsiteDevelopmentPage() {
  return (
    <main className="">
      <DynamicWebsiteDevHero
        badgeIcon={<Braces />}
        badgeText="Web Development Solutions"
        heading="Power your website with"
        highlightText="custom PHP development"
        subheading="Fast, reliable, and fully scalable"
        description="Zevitech builds dynamic PHP websites tailored to your business needs. Our expert developers deliver secure, high-performing web solutions that ensure speed, functionality, and long-term growth."
        heroImage={PhpWebHeroImg}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsPhpWebsiteDevelopmentImg01}
        img02={WhyChooseUsPhpWebsiteDevelopmentImg02}
        img03={WhyChooseUsPhpWebsiteDevelopmentImg03}
        badgeCotent="Why Choose Us"
        title="Why Choose Zevitech for PHP Website Development?"
        desc01="At Zevitech, we build dynamic and secure PHP websites with robust functionality and tailored features to suit your business needs."
        desc02="Our expert developers craft scalable, high-performing solutions that ensure your website runs smoothly and delivers an excellent user experience."
      />

      <CampaignsSection />

      <ServicesPorfolioSection02
        title="PHP Website Development for Robust and Scalable Solutions"
        description="Explore our portfolio of PHP-based websites engineered for performance, security, and customization. From dynamic business websites to complex web applications, we build scalable solutions that align with your business objectives."
        portfolioImages={PortfolioPhpWebsiteDevelopmentContent}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsPhpWebsiteDevelopmentImg04}
        img02={WhyChooseUsPhpWebsiteDevelopmentImg05}
        img03={WhyChooseUsPhpWebsiteDevelopmentImg06}
        badgeCotent="About PHP Development"
        sectionOrder="order-2"
        title="Powerful Web Solutions for Every Business"
        desc01="We develop PHP websites with clean code, custom integrations, and responsive designs that align perfectly with your goals."
        desc02="Ideal for businesses seeking a cost-effective, flexible, and future-ready web solution built on PHP."
      />

      <ContactSection />

      <Cta
        image={CtaImg}
        heading="Build Dynamic Solutions with PHP Website Development"
        text="At Zevitech, we develop powerful and scalable PHP websites tailored to your business requirements. Our PHP solutions deliver fast performance, secure coding, and flexible functionality to bring your digital ideas to life."
      />

      <FaqSection faqItems={FaqDataPhpWebsite} defaultOpenIndex={0} />
    </main>
  );
}

export default PhpWebsiteDevelopmentPage;
