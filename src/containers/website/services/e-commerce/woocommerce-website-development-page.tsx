import React from "react";

import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import CampaignsSection from "@/components/common/campaigns";
import ContactSection from "@/components/common/contact-section";
import FaqSection from "@/components/common/faq-section";
import Cta from "@/components/common/cta";
import { ServicesPorfolioSection02 } from "@/components/common/services-porfolio-sections";
import { DynamicWebsiteDevHero } from "@/components/common/dynamic-website-dev-hero";

import WhyChooseUsWooCommerceWebsiteDevelopmentImg01 from "../../../../../public/images/services/e-commerce/why-choose-us-woo-commerce-websiteImg01.png";
import WhyChooseUsWooCommerceWebsiteDevelopmentImg02 from "../../../../../public/images/services/e-commerce/why-choose-us-woo-commerce-websiteImg02.png";
import WhyChooseUsWooCommerceWebsiteDevelopmentImg03 from "../../../../../public/images/services/e-commerce/why-choose-us-woo-commerce-websiteImg03.png";
import WhyChooseUsWooCommerceWebsiteDevelopmentImg04 from "../../../../../public/images/services/e-commerce/why-choose-us-woo-commerce-websiteImg04.png";
import WhyChooseUsWooCommerceWebsiteDevelopmentImg05 from "../../../../../public/images/services/e-commerce/why-choose-us-woo-commerce-websiteImg05.png";
import WhyChooseUsWooCommerceWebsiteDevelopmentImg06 from "../../../../../public/images/services/e-commerce/why-choose-us-woo-commerce-websiteImg06.png";

import CtaImg from "../../../../../public/images/cta-image.webp";
import WooCommerceHeroImg from "../../../../../public/images/portfolio/website-img02.png";

import {
  FaqDataWooCommerceWebsite,
  PortfolioWooCommerceWebsiteDevelopmentContent,
} from "@/content/overall-services-content/all-services-content";

import { ShoppingBag } from "lucide-react";

function WooCommerceWebsiteDevelopmentPage() {
  return (
    <main className="">
      <DynamicWebsiteDevHero
        badgeIcon={<ShoppingBag />}
        badgeText="Ecommerce Solutions"
        heading="Transform your WordPress store with"
        highlightText="custom WooCommerce development"
        subheading="Seamless, flexible, and conversion-ready"
        description="Zevitech crafts WooCommerce websites that combine WordPress flexibility with robust ecommerce functionality. We deliver tailored, user-friendly stores optimized for performance and sales growth."
        heroImage={WooCommerceHeroImg}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsWooCommerceWebsiteDevelopmentImg03}
        img02={WhyChooseUsWooCommerceWebsiteDevelopmentImg01}
        img03={WhyChooseUsWooCommerceWebsiteDevelopmentImg02}
        badgeCotent="Why Choose Us"
        title="Why Choose Zevitech for WooCommerce Website Development?"
        desc01="At Zevitech, we create tailored WooCommerce websites that combine the power of WordPress with advanced eCommerce capabilities."
        desc02="Our experts ensure your store is easy to manage, secure, and optimized for sales, giving your customers a smooth shopping experience."
      />

      <CampaignsSection />

      <ServicesPorfolioSection02
        title="WooCommerce Website Development for WordPress-Powered Stores"
        description="Explore our portfolio of WooCommerce websites crafted for businesses that want the flexibility of WordPress with powerful e-commerce capabilities. From simple shops to fully customized online stores, we deliver solutions that are easy to manage and scale."
        portfolioImages={PortfolioWooCommerceWebsiteDevelopmentContent}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsWooCommerceWebsiteDevelopmentImg04}
        img02={WhyChooseUsWooCommerceWebsiteDevelopmentImg05}
        img03={WhyChooseUsWooCommerceWebsiteDevelopmentImg06}
        badgeCotent="About WooCommerce Development"
        sectionOrder="order-2"
        title="Flexible Stores Built for Success"
        desc01="We design WooCommerce solutions with custom themes, plugins, and integrations to fit your business needs perfectly."
        desc02="Ideal for startups and growing businesses wanting a cost-effective, scalable, and user-friendly eCommerce solution."
      />

      <ContactSection />

      <Cta
        image={CtaImg}
        heading="Build a Flexible Store with WooCommerce Development"
        text="At Zevitech, we design and develop customized WooCommerce websites that combine the power of WordPress with seamless eCommerce functionality. Our solutions are scalable, user-friendly, and built to help your business grow online."
      />

      <FaqSection faqItems={FaqDataWooCommerceWebsite} defaultOpenIndex={0} />
    </main>
  );
}

export default WooCommerceWebsiteDevelopmentPage;
