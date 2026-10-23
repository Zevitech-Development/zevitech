"use client";
import { Button } from "@/components/ui/button";
import { legacyPaymentCopy as copy } from "@/content/payment/legacy-payment-content";
import { OpenLiveChat } from "@/utils/open-live-chat";

/** Do not mount PayPal until the server can verify the captured amount and package. */
export function PaymentLayout() {
  return (
    <section className="layout-standard section-padding-standard text-center">
      <h1 className="font-heading text-3xl text-heading">{copy.title}</h1>
      <p className="mx-auto mt-4 max-w-xl text-paragraph">{copy.description}</p>
      <Button type="button" className="mt-6" onClick={OpenLiveChat}>{copy.help}</Button>
    </section>
  );
}
