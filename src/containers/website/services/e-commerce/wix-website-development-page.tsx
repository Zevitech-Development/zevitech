import React from "react";

import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import CampaignsSection from "@/components/common/campaigns";
import ContactSection from "@/components/common/contact-section";
import FaqSection from "@/components/common/faq-section";
import Cta from "@/components/common/cta";
import { ServicesPorfolioSection02 } from "@/components/common/services-porfolio-sections";
import { DynamicWebsiteDevHero } from "@/components/common/dynamic-website-dev-hero";

import WhyChooseUsWixWebsiteDevelopmentImg01 from "../../../../../public/images/services/e-commerce/why-choose-us-wix-websiteImg01.png";
import WhyChooseUsWixWebsiteDevelopmentImg02 from "../../../../../public/images/services/e-commerce/why-choose-us-wix-websiteImg02.png";
import WhyChooseUsWixWebsiteDevelopmentImg03 from "../../../../../public/images/services/e-commerce/portfolio-wix-website-img04.png";
import WhyChooseUsWixWebsiteDevelopmentImg04 from "../../../../../public/images/services/e-commerce/why-choose-us-wix-websiteImg04.png";
import WhyChooseUsWixWebsiteDevelopmentImg05 from "../../../../../public/images/services/e-commerce/why-choose-us-wix-websiteImg05.png";
import WhyChooseUsWixWebsiteDevelopmentImg06 from "../../../../../public/images/services/e-commerce/why-choose-us-wix-websiteImg06.png";

import CtaImg from "../../../../../public/images/cta-image.webp";
import WixWebsiteHeroImg from "../../../../../public/images/hero-images/wix-website-hero-img.png";

import {
  FaqDataWixWebsite,
  PortfolioWixWebsiteDevelopmentContent,
} from "@/content/overall-services-content/all-services-content";

import { Layout } from "lucide-react";

function WixWebsiteDevelopmentPage() {
  return (
    <main className="">
      <DynamicWebsiteDevHero
        badgeIcon={<Layout />}
        badgeText="Website Solutions"
        heading="Build a stunning online presence with"
        highlightText="custom Wix website development"
        subheading="Creative, responsive, and business-focused"
        description="Zevitech designs high-performing Wix websites that perfectly reflect your brand. Our developers combine sleek visuals with powerful functionality to create websites that attract, engage, and convert visitors effortlessly."
        heroImage={WixWebsiteHeroImg}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsWixWebsiteDevelopmentImg01}
        img02={WhyChooseUsWixWebsiteDevelopmentImg02}
        img03={WhyChooseUsWixWebsiteDevelopmentImg03}
        badgeCotent="Why Choose Us"
        title="Why Choose Zevitech for Wix Website Development?"
        desc01="At Zevitech, we build professional Wix websites that are visually appealing, mobile-responsive, and optimized for performance."
        desc02="Our team customizes every detail—from layouts to integrations—ensuring your site reflects your brand and engages your audience."
      />

      <CampaignsSection />

      <ServicesPorfolioSection02
        title="Wix Website Development for Creative and User-Friendly Sites"
        description="Browse our portfolio of Wix websites designed to combine creativity with functionality. From visually stunning layouts to responsive and easy-to-manage designs, we craft Wix solutions that bring your brand to life online."
        portfolioImages={PortfolioWixWebsiteDevelopmentContent}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsWixWebsiteDevelopmentImg04}
        img02={WhyChooseUsWixWebsiteDevelopmentImg05}
        img03={WhyChooseUsWixWebsiteDevelopmentImg06}
        badgeCotent="About Wix Development"
        sectionOrder="order-2"
        title="Creative Websites Made Simple"
        desc01="We design Wix sites with sleek templates, smooth navigation, and custom functionality tailored to your business needs."
        desc02="Perfect for entrepreneurs and small businesses seeking a cost-effective and easy-to-manage website solution."
      />

      <ContactSection />

      <Cta
        image={CtaImg}
        heading="Create a Stunning Website with Wix Development"
        text="At Zevitech, we build professional and visually appealing Wix websites tailored to your brand. With customizable designs, smooth functionality, and user-friendly features, our Wix solutions help you establish a strong online presence with ease."
      />

      <FaqSection faqItems={FaqDataWixWebsite} defaultOpenIndex={0} />
    </main>
  );
}

export default WixWebsiteDevelopmentPage;
