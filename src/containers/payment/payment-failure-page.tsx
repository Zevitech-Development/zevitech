"use client";

import { PaymentFailureLayout } from "@/elements/payment/payment-failure-layout";

export function PaymentFailurePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <PaymentFailureLayout />
    </main>
  );
}
