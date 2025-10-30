"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface OrderData {
  category: string;
  categoryName: string;
  plan: string;
  price: number | string;
  description: string;
  features: string[];
  badge?: string;
  customerInfo: {
    fullName: string;
    email: string;
    phone: string;
  };
}

export function PaymentLayout() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    // Get order data from URL params
    const category = searchParams.get("category");
    const categoryName = searchParams.get("categoryName");
    const plan = searchParams.get("plan");
    const price = searchParams.get("price");
    const description = searchParams.get("description");
    const features = searchParams.get("features");
    const badge = searchParams.get("badge");
    const fullName = searchParams.get("fullName");
    const email = searchParams.get("email");
    const phone = searchParams.get("phone");

    if (!category || !plan || !price || !fullName || !email || !phone) {
      router.push("/checkout-page");
      return;
    }

    setOrderData({
      category,
      categoryName: categoryName || category,
      plan,
      price: price === "Custom Quote" ? price : Number(price),
      description: description || "",
      features: features ? JSON.parse(features) : [],
      badge: badge || undefined,
      customerInfo: {
        fullName,
        email,
        phone,
      },
    });
    setIsLoading(false);
  }, [searchParams, router]);

  const handlePaymentSuccess = async (details: any) => {
    try {
      setIsProcessingPayment(true);
      // console.log("PayPal payment details:", details);
      
      const paymentData = {
        orderID: details.id || details.orderID,
        payerID: details.payer?.payer_id || details.payerID,
        paymentID: details.id || details.paymentID,
        fullName: orderData?.customerInfo.fullName,
        email: orderData?.customerInfo.email,
        phone: orderData?.customerInfo.phone,
        category: orderData?.category,
        categoryName: orderData?.categoryName,
        plan: orderData?.plan,
        price: orderData?.price.toString(),
        description: orderData?.description,
        features: JSON.stringify(orderData?.features || []),
        badge: orderData?.badge,
      };

      const response = await fetch("/api/process-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();

      if (result.success) {
        // Redirect to success page with order details
        const successParams = new URLSearchParams({
          orderId: result.orderId || "",
          customerName: orderData?.customerInfo.fullName || "",
          customerEmail: orderData?.customerInfo.email || "",
          serviceName: orderData?.categoryName || "",
          planName: orderData?.plan || "",
          amount: orderData?.price.toString() || "",
        });
        router.push(`/payment/success?${successParams.toString()}`);
      } else {
        // Redirect to failure page with error details
        const failureParams = new URLSearchParams({
          error: result.error || "Payment processing failed",
          serviceName: orderData?.categoryName || "",
          planName: orderData?.plan || "",
          amount: orderData?.price.toString() || "",
          category: orderData?.category || "",
          description: orderData?.description || "",
          features: JSON.stringify(orderData?.features || []),
          badge: orderData?.badge || "",
          fullName: orderData?.customerInfo.fullName || "",
          email: orderData?.customerInfo.email || "",
          phone: orderData?.customerInfo.phone || "",
        });
        router.push(`/payment/failure?${failureParams.toString()}`);
      }
    } catch (error) {
      setIsProcessingPayment(false);
      console.error("Payment processing error:", error);
      // Redirect to failure page with error details
      const failureParams = new URLSearchParams({
        error: "Network error occurred",
        serviceName: orderData?.categoryName || "",
        planName: orderData?.plan || "",
        amount: orderData?.price.toString() || "",
        category: orderData?.category || "",
        description: orderData?.description || "",
        features: JSON.stringify(orderData?.features || []),
        badge: orderData?.badge || "",
        fullName: orderData?.customerInfo.fullName || "",
        email: orderData?.customerInfo.email || "",
        phone: orderData?.customerInfo.phone || "",
      });
      router.push(`/payment/failure?${failureParams.toString()}`);
    }
  };

  const handlePaymentError = (error: any) => {
    setIsProcessingPayment(false);
    console.error("PayPal payment error:", error);
    // Redirect to failure page with PayPal error details
    const failureParams = new URLSearchParams({
      error: error.message || "PayPal payment failed",
      serviceName: orderData?.categoryName || "",
      planName: orderData?.plan || "",
      amount: orderData?.price.toString() || "",
      category: orderData?.category || "",
      description: orderData?.description || "",
      features: JSON.stringify(orderData?.features || []),
      badge: orderData?.badge || "",
      fullName: orderData?.customerInfo.fullName || "",
      email: orderData?.customerInfo.email || "",
      phone: orderData?.customerInfo.phone || "",
    });
    router.push(`/payment/failure?${failureParams.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
        <div className="layout-standard section-padding-standard flex flex-col justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Loading...</h1>
            <p className="mt-2 text-muted-foreground">
              Preparing your payment details.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
        <div className="layout-standard section-padding-standard flex flex-col justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">
              Order Not Found
            </h1>
            <p className="mt-2 text-muted-foreground">
              Please start from the checkout page.
            </p>
            <Link href="/checkout-page">
              <Button className="mt-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const displayPrice = typeof orderData.price === "number" ? orderData.price : 0;
  const isCustomQuote = typeof orderData.price === "string";

  // Loading Overlay Component
  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center shadow-2xl">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Processing Payment</h3>
        <p className="text-gray-600 mb-4">
          Please wait while we process your payment securely. This may take a few moments.
        </p>
        <div className="flex items-center justify-center space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Do not close this window or refresh the page.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      {isProcessingPayment && <LoadingOverlay />}
      <div className="layout-standard section-padding-standard">
        <div className="mb-10 flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary-hover text-balance">
            Complete Your Payment
          </h1>
          <p className="mt-3 text-base text-paragraph max-w-3xl">
            Review your order details and complete your payment securely with PayPal.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
          {/* Order Summary */}
          <Card className="shadow-lg border-border/50">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="rounded-lg bg-secondary/30 p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm text-primary font-medium uppercase tracking-wide">
                      {orderData.categoryName}
                    </p>
                    <h3 className="font-bold text-foreground text-lg mt-1">
                      {orderData.plan}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                      {orderData.description}
                    </p>
                  </div>
                  {orderData.badge && (
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary border-primary/20 shrink-0"
                    >
                      {orderData.badge}
                    </Badge>
                  )}
                </div>

                <Separator className="bg-border/50" />

                <div className="space-y-2">
                  {orderData.features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                  {orderData.features.length > 4 && (
                    <p className="text-xs text-muted-foreground italic">
                      +{orderData.features.length - 4} more features
                    </p>
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Customer Information</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Name:</span> {orderData.customerInfo.fullName}</p>
                  <p><span className="font-medium">Email:</span> {orderData.customerInfo.email}</p>
                  <p><span className="font-medium">Phone:</span> {orderData.customerInfo.phone}</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-foreground">
                  Total Amount
                </span>
                <span className="text-2xl font-bold text-primary">
                  {isCustomQuote ? "Custom Quote" : `$${displayPrice}`}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Section */}
          <Card className="shadow-lg border-border/50 h-fit">
            <CardHeader>
              <CardTitle className="text-xl">Payment Method</CardTitle>
              <CardDescription>
                Complete your payment securely with PayPal
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isCustomQuote ? (
                <div className="text-center space-y-4">
                  <p className="text-muted-foreground">
                    This is a custom quote package. Please contact us to discuss pricing and payment options.
                  </p>
                  <Button asChild className="w-full">
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              ) : (
                <PayPalScriptProvider
                  options={{
                    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
                    currency: "USD",
                    intent: "capture",
                  }}
                >
                  <PayPalButtons
                    style={{
                      layout: "vertical",
                      color: "blue",
                      shape: "rect",
                      label: "paypal",
                    }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                          {
                            amount: {
                              value: displayPrice.toString(),
                              currency_code: "USD",
                            },
                            description: `${orderData.categoryName} - ${orderData.plan}`,
                          },
                        ],
                        application_context: {
                          shipping_preference: "NO_SHIPPING",
                        },
                      });
                    }}
                    onApprove={async (data, actions) => {
                      if (actions.order) {
                        const details = await actions.order.capture();
                        handlePaymentSuccess(details);
                      }
                    }}
                    onError={handlePaymentError}
                    onCancel={() => {
                      console.log("Payment cancelled");
                    }}
                  />
                </PayPalScriptProvider>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 text-center">
          <Link href="/checkout-page">
            <Button variant="outline" className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Checkout
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            Powered by{" "}
            <span className="font-semibold text-foreground">Zevitech</span>
          </p>
        </div>
      </div>
    </div>
  );
}