import {
  ReviewsSectionContent01,
  ReviewsSectionContent02,
  ReviewsSectionContent03,
} from "@/content/landing/shopify-landing-page-content";

// Keep the original customer names, dates, photographs and quotes unchanged.
export const shopifyRestoredReviews = [
  ...ReviewsSectionContent01,
  ...ReviewsSectionContent02,
  ...ReviewsSectionContent03,
];

export const shopifyRestoredReviewsContent = {
  eyebrow: "CLIENT EXPERIENCES",
  title: "What our clients say.",
  introduction: "From first launches to store redesigns, hear about working with Zevitech.",
  initialCount: 3,
  showAll: "Show all {count} reviews",
  showFewer: "Show fewer reviews",
  count: "Showing {shown} of {total} reviews",
  trustpilotLabel: "Read reviews on Trustpilot",
  trustpilotHref: "https://www.trustpilot.com/review/zevitech.com",
};
