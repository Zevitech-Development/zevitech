import { PaymentFailurePage } from "@/containers/payment/payment-failure-page";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Payment Failed - Zevitech",
  description: "Payment processing failed. Please try again.",
};

function PaymentFailureLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="layout-standard section-padding-standard flex flex-col justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Loading...</h1>
          <p className="mt-2 text-muted-foreground">
            Loading payment information.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PaymentFailure() {
  return (
    <Suspense fallback={<PaymentFailureLoading />}>
      <PaymentFailurePage />
    </Suspense>
  );
}