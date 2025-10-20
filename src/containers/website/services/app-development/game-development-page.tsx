import React from "react";

import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import CampaignsSection from "@/components/common/campaigns";
import ContactSection from "@/components/common/contact-section";
import FaqSection from "@/components/common/faq-section";
import Cta from "@/components/common/cta";
import { ServicesPorfolioSection02 } from "@/components/common/services-porfolio-sections";
import { DynamicHero } from "@/components/common/dynamic-hero";

import WhyChooseUsGameDevelopmentImg01 from "../../../../../public/images/services/app-development/why-choose-us-game-development-img01.jpg";
import WhyChooseUsGameDevelopmentImg02 from "../../../../../public/images/services/app-development/why-choose-us-game-development-img02.jpg";
import WhyChooseUsGameDevelopmentImg03 from "../../../../../public/images/services/app-development/why-choose-us-game-development-img03.jpg";
import WhyChooseUsGameDevelopmentImg04 from "../../../../../public/images/services/app-development/why-choose-us-game-development-img04.jpg";
import WhyChooseUsGameDevelopmentImg05 from "../../../../../public/images/services/app-development/why-choose-us-game-development-img05.jpg";
import WhyChooseUsGameDevelopmentImg06 from "../../../../../public/images/services/app-development/why-choose-us-game-development-img06.jpg";

import CtaImg from "../../../../../public/images/cta-image.webp";
import GameDevelopmentHeroImg from "../../../.././../public/images/hero-images/game-dev-hero-img.jpg";

import {
  FaqDataGameDevelopment,
  PortfolioGameDevelopmentContent,
} from "@/content/overall-services-content/all-services-content";

import { Gamepad2 } from "lucide-react";

function GameDevelopmentPage() {
  return (
    <main className="">
      <DynamicHero
        badgeIcon={<Gamepad2 />}
        badgeText="Interactive Experiences"
        heading="Turn ideas into"
        highlightText="immersive gaming realities"
        subheading="Creative, engaging, and performance-optimized"
        description="Zevitech designs and develops high-quality games that captivate players and bring your vision to life. From concept to launch, we deliver fun, dynamic, and visually stunning gaming experiences across all platforms."
        heroImage={GameDevelopmentHeroImg}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsGameDevelopmentImg01}
        img02={WhyChooseUsGameDevelopmentImg02}
        img03={WhyChooseUsGameDevelopmentImg03}
        badgeCotent="Why Choose Us"
        title="Why Choose Zevitech for Game Development?"
        desc01="At Zevitech, we design and develop immersive, high-quality games with stunning visuals, engaging gameplay, and seamless performance across platforms."
        desc02="Our creative developers and designers bring your ideas to life using advanced game engines and the latest technologies for a truly captivating experience."
      />

      <CampaignsSection />

      <ServicesPorfolioSection02
        title="Game Development That Brings Ideas to Life"
        description="Browse our portfolio of immersive games crafted with creativity and cutting-edge technology. From mobile adventures to multiplayer experiences, we design and develop games that captivate players and deliver unforgettable entertainment."
        portfolioImages={PortfolioGameDevelopmentContent}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsGameDevelopmentImg04}
        img02={WhyChooseUsGameDevelopmentImg05}
        img03={WhyChooseUsGameDevelopmentImg06}
        badgeCotent="About Game Development"
        sectionOrder="order-2"
        title="Bringing Imagination to Reality"
        desc01="We build custom games that blend storytelling, mechanics, and artistry—whether for mobile, desktop, or consoles."
        desc02="Perfect for studios, brands, and startups seeking interactive entertainment that connects with players worldwide."
      />

      <ContactSection />

      <Cta
        image={CtaImg}
        heading="Turn Ideas into Reality with Game Development"
        text="At Zevitech, we design and develop immersive games that combine creativity, technology, and engaging gameplay. From mobile to desktop, our game development solutions bring your concepts to life with stunning visuals and seamless performance."
      />

      <FaqSection faqItems={FaqDataGameDevelopment} defaultOpenIndex={0} />
    </main>
  );
}

export default GameDevelopmentPage;
