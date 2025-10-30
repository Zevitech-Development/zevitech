"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, Mail, Phone, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PaymentSuccessLayout() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get("orderId");
  const customerName = searchParams.get("customerName");
  const customerEmail = searchParams.get("customerEmail");
  const serviceName = searchParams.get("serviceName");
  const planName = searchParams.get("planName");
  const amount = searchParams.get("amount");

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        {/* Success Icon and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for choosing Zevitech. Your order has been confirmed.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Order Details
          </h2>
          
          <div className="space-y-4">
            {orderId && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-semibold text-gray-900">{orderId}</span>
              </div>
            )}
            
            {serviceName && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Service:</span>
                <span className="font-semibold text-gray-900">{serviceName}</span>
              </div>
            )}
            
            {planName && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Plan:</span>
                <span className="font-semibold text-gray-900">{planName}</span>
              </div>
            )}
            
            {amount && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-semibold text-green-600 text-lg">${amount}</span>
              </div>
            )}
            
            {customerEmail && (
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Confirmation sent to:</span>
                <span className="font-semibold text-gray-900">{customerEmail}</span>
              </div>
            )}
          </div>
        </div>

    
        {/* Contact Information */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Need Help? Contact Us
          </h3>
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
            onClick={() => router.push("/")}
            className="flex-1 h-12 bg-white text-black hover:bg-primary-hover hover:text-white   text-base font-semibold"
          >
            Return to Home
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          
          <Button
            variant="outline"
            onClick={() => router.push("/landing-pages/logo-design")}
            className="flex-1 h-12 bg-primary text-white hover:bg-primary-hover text-base font-semibold"
          >
            Browse More Services
          </Button>
        </div>
      </div>
    </div>
  );
}


// hidden lg:flex px-6 py-6 bg-primary text-white hover:bg-primary-hover text-base font-semibold
