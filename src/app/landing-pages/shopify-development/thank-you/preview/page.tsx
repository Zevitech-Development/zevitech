import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ShopifyOrderConfirmation from "@/elements/business/shopify/shopify-order-confirmation";
import type { ShopifyCheckoutPublicOrder } from "@/interfaces/shopify-checkout-interface";

export const metadata: Metadata = { title: "Confirmation Design Preview | Zevitech", robots: { index: false, follow: false } };
const example: ShopifyCheckoutPublicOrder = {
  id: "EXAMPLE-ORDER", status: "paid", packageName: "Growth", amount: 59.9,
  totalAmount: 599, upfrontAmount: 59.9, balanceAmount: 539.1, amountPaid: 59.9,
  paymentStage: "upfront", paymentVersion: "upfront-10-v3", currency: "USD", mode: "sandbox",
  transactionId: "EXAMPLE-PAYMENT", briefFingerprint: "preview-only",
};
export default function ConfirmationDesignPreview() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <ShopifyOrderConfirmation previewOrder={example}/>;
}
