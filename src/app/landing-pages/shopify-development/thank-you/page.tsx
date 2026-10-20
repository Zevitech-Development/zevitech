import type { Metadata } from "next";
import ShopifyOrderConfirmation from "@/elements/business/shopify/shopify-order-confirmation";
export const metadata: Metadata = {
  title: "Your Shopify Project Confirmation | Zevitech",
  robots: { index: false, follow: false },
};
export default function ShopifyThankYouPage() { return <ShopifyOrderConfirmation/>; }
