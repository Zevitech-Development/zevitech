"use client";

import { useSearchParams, useRouter } from "next/navigation";
import {
  XCircle,
  RefreshCw,
  Mail,
  Phone,
  ArrowLeft,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function PaymentFailureLayout() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const errorMessage = searchParams.get("error") || "Payment processing failed";
  const serviceName = searchParams.get("serviceName");
  const planName = searchParams.get("planName");
  const amount = searchParams.get("amount");

  const handleRetryPayment = () => {
    // Get all the original order data from URL params and redirect back to payment
    const orderParams = new URLSearchParams();

    // Copy all relevant params back to payment page
    const paramsToKeep = [
      "category",
      "categoryName",
      "plan",
      "price",
      "description",
      "features",
      "badge",
      "fullName",
      "email",
      "phone",
    ];

    paramsToKeep.forEach((param) => {
      const value = searchParams.get(param);
      if (value) {
        orderParams.set(param, value);
      }
    });

    router.push(`/payment?${orderParams.toString()}`);
  };

  const handleGoToCheckout = () => {
    // Redirect back to checkout with the same order data
    const orderParams = new URLSearchParams();

    const paramsToKeep = ["category", "plan"];
    paramsToKeep.forEach((param) => {
      const value = searchParams.get(param);
      if (value) {
        orderParams.set(param, value);
      }
    });

    router.push(`/checkout-page?${orderParams.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        {/* Error Icon and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <XCircle className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Failed
          </h1>
          <p className="text-lg text-gray-600">
            We encountered an issue processing your payment. Please try again.
          </p>
        </div>

        {/* Error Details Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Transaction Details
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Status:</span>
              <span className="font-semibold text-red-600">Failed</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Error:</span>
              <span className="font-semibold text-gray-900">
                {errorMessage}
              </span>
            </div>

            {serviceName && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Service:</span>
                <span className="font-semibold text-gray-900">
                  {serviceName}
                </span>
              </div>
            )}

            {planName && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Plan:</span>
                <span className="font-semibold text-gray-900">{planName}</span>
              </div>
            )}

            {amount && (
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold text-gray-900">${amount}</span>
              </div>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Need Assistance? We&apos;re Here to Help
          </h3>
          <p className="text-gray-600 mb-4">
            If you continue to experience issues, please contact our support
            team. We&apos;ll help you complete your order.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-gray-600 mr-2" />
              <span className="text-gray-600">support@zevitech.com</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-gray-600 mr-2" />
              <span className="text-gray-600">+1 (555) 123-4567</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handleRetryPayment}
            className="flex-1 h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Try Payment Again
          </Button>

          <Button
            variant="outline"
            onClick={handleGoToCheckout}
            className="flex-1 h-12 text-base font-semibold"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Checkout
          </Button>
        </div>

        {/* Alternative Options */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">Or explore other options:</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="text-gray-600 hover:text-gray-900"
            >
              Return to Home
            </Button>
            <Button
              variant="ghost"
              onClick={() => router.push("/services")}
              className="text-gray-600 hover:text-gray-900"
            >
              Browse Services
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
