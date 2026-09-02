import React from "react";

import { DynamicHero } from "@/components/common/dynamic-hero";
import DynamicServicesSection from "@/components/common/services-section";
import LandingReviewsSection from "@/components/common/reviews-section";
import FaqSection from "@/components/common/faq-section";
import { CtaSection } from "@/elements/business/logo-design/logo-cta";

import YoutubeGrowthSection from "@/elements/website/youtube-automation/youtube-growth-section";
import YoutubeProcessSection from "@/elements/website/youtube-automation/youtube-process-section";
import YoutubeResultsSection from "@/elements/website/youtube-automation/youtube-results-section";

// TODO: swap for dedicated YouTube Automation artwork when it is ready.
import YoutubeAutomationHeroImg from "../../../../../public/images/hero-images/yt-automation-img-02.jpeg";
import YoutubeGrowthImg from "../../../../../public/images/services/digital-marketing/yt-cta-img.png";
import CtaImg from "../../../../../public/images/services/digital-marketing/yt-cta-img-02.png";

import {
  FaqDataYoutubeAutomation,
  youtubeAutomationApproachesData,
  youtubeAutomationServicesData,
  youtubeAutomationResults,
} from "@/content/services/youtube-automation-content";
import {
  YoutubeReviewsContent01,
  YoutubeReviewsContent02,
  YoutubeReviewsContent03,
} from "@/content/services/youtube-automation-reviews-content";

import { Youtube } from "lucide-react";

function YoutubeAutomationPage() {
  return (
    <main>
      <DynamicHero
        badgeIcon={<Youtube />}
        badgeText="YouTube Automation"
        heading="Grow a YouTube channel"
        highlightText="without doing the work yourself"
        subheading="Done-for-you channel management built to monetise"
        description="Zevitech builds and runs monetisation-ready YouTube channels end to end — niche research, scripting, voiceover or on-camera production, editing, thumbnails, SEO, and uploads. You keep full ownership and the revenue; we handle everything that gets it there."
        heroImage={YoutubeAutomationHeroImg}
      />

      <YoutubeGrowthSection
        introTitle="Join The YouTube Boom,"
        introTitleHighlight="Stand Out & Thrive"
        introDescription="YouTube is a global competitive hub, and its algorithms reward the channels that treat content as a system rather than a hobby. Our YouTube automation services help entrepreneurs turn an idea into a channel that publishes consistently, ranks, and earns — so you can stay ahead, scale faster, and own a real asset in your niche."
        cardTitle="YouTube Automation Done For You,"
        cardTitleHighlight="Seamless & Scalable"
        cardDescription="Our team handles niche research, scripting, voiceover, editing, thumbnails, scheduling, and comment moderation — the entire workflow that normally eats your week. Whether you present on camera or run the channel through voiceover and edited footage, you keep full ownership while we keep it publishing on schedule."
        phoneNumber="(302) 219-0703"
        image={YoutubeGrowthImg}
        imageAlt="YouTube automation channel dashboard"
      />

      <YoutubeProcessSection
        mainTitle="Our YouTube Automation"
        highlightedWord="Process"
        subtitle="Five stages take a channel from an empty account to a consistent, monetisation-ready publisher — with your approval at every decision point and none of the daily work landing on you."
        leftCardTitle="How We Build and Run Your Channel"
        leftCardDescription="Our process is built around what actually moves the needle on YouTube: a niche that can monetise, scripts written for retention, thumbnails that earn the click, and a publishing schedule we hold to. Every stage feeds the next, and the analytics from each batch of uploads shape the batch that follows."
        approaches={youtubeAutomationApproachesData}
      />

      <CtaSection
        badgeText="Done-For-You YouTube Automation"
        heading="Turn YouTube into a Revenue Stream"
        headingHighlight="You Do Not Have to Run"
        description="From niche research to monthly reporting, we handle the entire channel while you keep full ownership of it. Book a call and we will map out the niche, format, and publishing schedule before you commit to anything."
        image={CtaImg}
        imageAlt="YouTube automation channel growth"
      />

      <DynamicServicesSection
        title="YouTube Automation"
        highlightedText="Services"
        description="Everything required to launch, grow, and monetise a YouTube channel — available as a full done-for-you package or as individual services if you already handle part of the workflow in house."
        servicesData={youtubeAutomationServicesData}
      />

      <YoutubeResultsSection
        eyebrow="Verified Proof"
        title="Numbers that"
        highlightText="speak for themselves"
        description="Real YouTube Studio dashboards from channels under our management. No edits, no cropping — just the analytics as they appear in the account."
        results={youtubeAutomationResults}
        footnote="Your channel could be next"
        ctaText="Book Your Free Strategy Call"
      />

      <LandingReviewsSection
        eyebrow="What Clients Say"
        title="Channel Owners Who Stopped Doing the Work"
        description="Feedback from the founders and creators whose channels we research, produce, and publish — on camera or off — so the work stops landing on them."
        row01={YoutubeReviewsContent01}
        row02={YoutubeReviewsContent02}
        row03={YoutubeReviewsContent03}
      />

      <FaqSection faqItems={FaqDataYoutubeAutomation} defaultOpenIndex={0} />
    </main>
  );
}

export default YoutubeAutomationPage;
