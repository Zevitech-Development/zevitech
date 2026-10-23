import { shopifyPackageCatalog } from "@/content/landing/shopify-package-catalog";
import { shopifyPaymentCopy } from "@/content/landing/shopify-payment-content";
import { SITE_URL } from "@/utils/site-url";

const pageUrl = `${SITE_URL}/landing-pages/shopify-development`;

// Describe the real service and full package prices, never the deposit as the
// total price. Preview stores, sample products and testimonials are not offers.
export const shopifyServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${pageUrl}#service`,
  name: "Custom Shopify Store Development",
  serviceType: "Shopify ecommerce store design and development",
  url: pageUrl,
  description: "Custom Shopify development with sales-focused product pages and an easy shopping experience. " + shopifyPaymentCopy.terms,
  provider: { "@id": `${SITE_URL}/#organization` },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Shopify development packages",
    itemListElement: shopifyPackageCatalog.map((plan) => ({
      "@type": "Offer",
      name: `${plan.name} Shopify development package`,
      price: plan.price,
      priceCurrency: "USD",
      url: `${pageUrl}#studio`,
      description: `Full development fee. ${shopifyPaymentCopy.terms} Shopify subscriptions, paid themes, apps and third-party fees are separate.`,
      itemOffered: {
        "@type": "Service",
        name: `${plan.name} Shopify development`,
        provider: { "@id": `${SITE_URL}/#organization` },
      },
    })),
  },
};
