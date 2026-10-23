import { shopifyLandingFooterContent } from "./shopify-landing-footer-content";
import { shopifyPaymentCopy } from "./shopify-payment-content";

export const shopifyProjectTermsContent = {
  title: "Shopify development project terms",
  description: "Review the scope of your Shopify development project before placing your order.",
  backLabel: "Back to Shopify development",
  backHref: "/landing-pages/shopify-development#studio",
  sections: [
    { id: "scope", title: "Your package and project scope", body: "Your selected package lists the development services, product setup limit and included features. Review these details and the displayed package price before payment. Your brief records your preferences and requirements; requests outside the selected package need a separate agreement with Zevitech." },
    { id: "payments", title: "10% upfront, 90% after delivery", body: `${shopifyPaymentCopy.terms} This applies to every Shopify development package. ${shopifyPaymentCopy.noAutomaticCharge}` },
    { id: "reference", title: "Your reference is a starting direction", body: "Store previews, reference designs, uploaded assets and colour choices communicate your preferred direction. The preview is not the finished store. Every design reference is available with every package. Packages differ in setup allowances, customization, features and service scope. Review the displayed price and scope before confirming a package change. Zevitech develops the final store around your brand, agreed brief and selected scope. Features visible in a reference are not automatically included in every package." },
    { id: "external-costs", title: "Third-party costs", body: "Shopify subscriptions, paid themes, third-party apps and other external fees are separate unless explicitly included in the selected package or agreed in writing. Domain purchasing and registration remain the client's responsibility unless otherwise agreed in writing." },
    { id: "project-details", title: "Your content and project plan", body: "The build depends on the required content, product information and assets being supplied. Project timing depends on scope, integrations and content readiness. Zevitech confirms the brief and project timeline after reviewing your requirements." },
    { id: "refund", title: "Non-refundable policy", body: shopifyLandingFooterContent.policy },
    { id: "results", title: "Sales-focused development", body: "Zevitech designs to make shopping clearer and easier. Sales also depend on products, pricing, traffic and fulfilment. A specific revenue or conversion result is not guaranteed." },
  ],
  contactLabel: "Questions about your project?",
  contactEmail: "info@zevitech.com",
};
