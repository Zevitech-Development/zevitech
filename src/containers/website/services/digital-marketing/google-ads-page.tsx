import React from "react";

import DynamicServicesSection from "@/components/common/services-section";
import LandingReviewsSection from "@/components/common/reviews-section";
import GoogleAdsHero from "@/components/google-ads/google-ads-hero";
import GoogleAdsResultsSection from "@/components/google-ads/google-ads-results-section";
import { GoogleAdsCampaignCta, GoogleAdsStickyCta } from "@/components/google-ads/google-ads-cta";
import GoogleAdsGrowthStory from "@/components/google-ads/google-ads-growth-story";
import GoogleAdsShowcase from "@/components/google-ads/google-ads-showcase";
import GoogleAdsPositioning from "@/components/google-ads/google-ads-positioning";
import GoogleAdsReveal from "@/components/google-ads/google-ads-reveal";
import GoogleAdsFaq from "@/components/google-ads/google-ads-faq";
import GoogleAdsDifference from "@/components/google-ads/google-ads-difference";

import {
  googleAdsAdvantagesData,
  GoogleAdsResultSectionContent,
} from "@/content/landing/google-ads-page-content";

function GoogleAdsPage() {
  return (
    <main className="google-ads-page ga-perspective-root pb-20 lg:pb-0">
      <GoogleAdsHero />

      <GoogleAdsReveal className="ga-why-block ga-why-block-one" direction="left">
        <GoogleAdsShowcase
          variant="audit"
          badge="Why Choose Us"
          title="Google Ads Built Around Business Results"
          desc01="Zevitech builds campaigns for the outcome that matters to your business—qualified service inquiries, booked conversations, ecommerce purchases, or product sales."
          desc02="We connect targeting, ad creative, landing-page experience, checkout behavior, and conversion tracking so optimization can move beyond clicks and toward measurable growth signals."
        />
      </GoogleAdsReveal>

      <GoogleAdsReveal className="ga-services-block">
        <DynamicServicesSection
          title="Beyond Clicks:"
          highlightedText="Business Outcomes"
          description="Whether your conversion is a phone call, form, booked appointment, add-to-cart, checkout, or completed purchase, we build the campaign around the result—not vanity traffic."
          servicesData={googleAdsAdvantagesData}
          ctaHref="#google-ads-growth-form"
          primaryButtonText="Request My Free Growth Audit"
        />
      </GoogleAdsReveal>

      <GoogleAdsReveal className="ga-positioning-block">
        <GoogleAdsPositioning />
      </GoogleAdsReveal>

      <GoogleAdsReveal>
        <GoogleAdsCampaignCta />
      </GoogleAdsReveal>

      <GoogleAdsReveal className="ga-difference-block" parallax={0}>
        <GoogleAdsDifference />
      </GoogleAdsReveal>

      <GoogleAdsGrowthStory />

      <GoogleAdsReveal className="ga-why-block ga-why-block-two" direction="right">
        <GoogleAdsShowcase
          variant="system"
          reverse
          badge="The Growth System"
          title="From Search Intent to Leads, Checkouts, and Sales"
          desc01="For service businesses, we optimize toward calls, forms, bookings, and lead quality. For ecommerce and product brands, we connect product discovery to cart, checkout, and purchase events."
          desc02="Your campaigns keep learning through audience signals, search behavior, conversion data, and continuous testing—creating a clearer path for confident scaling."
        />
      </GoogleAdsReveal>

      <GoogleAdsResultsSection results={GoogleAdsResultSectionContent} />

      <GoogleAdsReveal className="ga-faq-block">
        <GoogleAdsFaq />
      </GoogleAdsReveal>

      <GoogleAdsReveal className="ga-reviews-experience">
        <LandingReviewsSection
          eyebrow="The People Behind The Growth"
          title="Businesses Choose Zevitech To Move Forward"
          description="Hear from clients who trusted Zevitech to strengthen their digital experience, remove growth friction, and help their business reach its next stage."
          autoPlay={false}
        />
      </GoogleAdsReveal>

      <GoogleAdsStickyCta />
    </main>
  );
}

export default GoogleAdsPage;
