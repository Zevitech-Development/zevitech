import { ResultSectionContent, TrustbarSectionContent } from "./shopify-landing-page-content";

export const shopifyRestoredProofContent = {
  results: {
    eyebrow: "Client feedback",
    title: "Store snapshots. Customer stories.",
    description: "Explore feedback and store snapshots from our portfolio.",
    note: "These individual examples are not a forecast or guarantee of your store’s results.",
    open: "View full screenshot",
    close: "Close screenshot",
    more: "Show all 5 screenshots",
    fewer: "Show fewer screenshots",
  },
  contact: {
    eyebrow: "A team behind your store",
    title: "Let’s talk through your project.",
    description: "Have a question before choosing a package? Share your plans with us and we’ll help you find the right starting point.",
    chat: "Chat with our team",
    email: "info@zevitech.com",
    emailHref: "mailto:info@zevitech.com",
    phone: "(302) 217-6872",
    phoneHref: "tel:+13022176872",
    trustpilot: "Read reviews on Trustpilot",
    trustpilotHref: "https://www.trustpilot.com/review/zevitech.com",
    clutch: "View Zevitech on Clutch",
    clutchHref: "https://clutch.co/profile/zevitech",
  },
};

const screenshotLabels: Record<number, { name: string; subject: string }> = {
  2: { name: "Jonathan Henry", subject: "Store design and development" },
  3: { name: "Richard Buyers", subject: "Product recommendations and offers" },
  4: { name: "Johnson Smith", subject: "Search visibility" },
  5: { name: "Alice Baker", subject: "Customer accounts and order tracking" },
  6: { name: "Rachel Lisa", subject: "Store design and usability" },
};

// Legacy asset 1 credits another agency; retain the source, but do not present
// it as Zevitech work without clarification of its provenance.
export const shopifyRestoredScreenshots = ResultSectionContent
  .filter(({ resultNo }) => resultNo !== 1)
  .map((result) => ({ ...result, ...screenshotLabels[result.resultNo] }));

const logoNames = ["Fred Meyer", "Hofmann", "Coca-Cola", "Time", "Wawa", "Heavenly"];
export const shopifyRestoredLogos = TrustbarSectionContent.map((logo, index) => ({ ...logo, name: logoNames[index] }));
