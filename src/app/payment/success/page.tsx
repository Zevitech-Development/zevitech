import { PaymentSuccessPage } from "@/containers/payment/payment-success-page";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Payment Success - Zevitech",
  description: "Your payment has been processed successfully",
};

function PaymentSuccessLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="layout-standard section-padding-standard flex flex-col justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Loading...</h1>
          <p className="mt-2 text-muted-foreground">
            Loading your payment confirmation.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<PaymentSuccessLoading />}>
      <PaymentSuccessPage />
    </Suspense>
  );
}