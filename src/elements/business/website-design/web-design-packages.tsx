"use client";
import Link from "next/link";
import Image from "next/image";

import { CheckCircle } from "lucide-react";

import { websitePricingData } from "@/content/landing/web-design-page-content";

import DirhamLogo from "../../../../public/images/landing/dirham-symbol.png";

import { OpenLiveChat } from "@/utils/open-live-chat";
import DailogLeadForm from "@/components/forms/dailog-lead-form";

// Dirham Symbol Component using the uploaded image
const DirhamIcon = ({ className = "" }: { className?: string }) => (
  <Image
    src={DirhamLogo}
    alt="AED"
    width={24}
    height={24}
    className={className}
  />
);

const Header = () => (
  <header className="relative text-center mb-12 md:mb-16 px-4 z-10">
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-200/50 dark:bg-red-900/30 rounded-full filter blur-3xl opacity-40 -z-10"
      aria-hidden="true"
    ></div>

    <div
      className="flex justify-center mb-4 animate-fade-in-down"
      style={{ animationDelay: "0.2s" }}
    >
      <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-orange-900/30 text-blue-700 text-xs font-bold px-3 py-1 rounded-full tracking-wider">
        <span className="w-2 h-2 bg-primary rounded-full"></span>
        OVER 10,000 USERS
      </div>
    </div>

    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-heading leading-tight tracking-tighter animate-fade-in-down">
      Find the Perfect Plan to <br />
      <span className="text-primary-hover">Power Your Brand</span>
    </h1>

    <p
      className="text-paragraph mt-6 text-base sm:text-lg max-w-2xl mx-auto animate-fade-in-down"
      style={{ animationDelay: "0.4s" }}
    >
      Find the perfect plan to bring your ideas to life and elevate your brand
      with confidence.
    </p>
  </header>
);

export default function WebsitePricing() {
  const pricingPlans = websitePricingData.websiteDesign;

  const createCheckoutUrl = (plan: any) => {
    const params = new URLSearchParams({
      plan: plan.plan,
      price:
        typeof plan.price === "number" ? plan.price.toString() : plan.price,
      features: JSON.stringify([...plan.features, ...plan.logoDesign]),
      badge: plan.badge || "",
    });

    return `/checkout-page?${params.toString()}`;
  };

  return (
    <>
      <div className="relative font-sans flex flex-col items-center justify-center overflow-x-hidden bg-white">
        <div className="layout-standard section-padding-standard py-16 md:py-20">
          <Header />

          {/* Pricing Cards */}
          <main className="relative min-h-[600px]">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-14 items-stretch mx-auto max-w-7xl">
              {pricingPlans.map((plan, index) => {
                const Icon = plan.icon;

                return (
                  <article
                    key={index}
                    className={`relative p-6 md:p-8 rounded-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 flex flex-col ${
                      plan.isFeatured
                        ? "bg-gradient-to-r from-[#3B82F6] to-[#4F7FF3] text-white shadow-2xl lg:scale-105"
                        : "bg-[#F1F5F9] text-heading shadow-lg"
                    }`}
                  >
                    {/* Dynamic Badge */}
                    {plan.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center rounded-full bg-gray-200/80 text-primary text-xs font-semibold px-3 py-1 backdrop-blur">
                          {plan.badge}
                        </span>
                      </div>
                    )}

                    {/* Plan Icon & Name */}
                    <div className="flex items-center gap-3 mb-6">
                      <Icon
                        className={`w-6 h-6 ${
                          plan.isFeatured
                            ? "text-gray-300"
                            : "text-primary-hover"
                        }`}
                      />
                      <h3
                        className={`text-base font-bold tracking-widest uppercase ${
                          plan.isFeatured ? "text-white" : "text-gray-600"
                        }`}
                      >
                        {plan.plan}
                      </h3>
                    </div>

                    {/* Price with Dirham Symbol */}
                    <div className="mb-6">
                      {typeof plan.price === "string" ? (
                        <span
                          className={`text-3xl font-bold ${
                            plan.isFeatured ? "text-white" : "text-heading"
                          }`}
                        >
                          {plan.price}
                        </span>
                      ) : (
                        <div className="flex items-start gap-1.5">
                          <DirhamIcon
                            className={`w-7 h-7 sm:w-9 sm:h-9 mt-1.5 flex-shrink-0 ${
                              plan.isFeatured ? "brightness-0 invert" : ""
                            }`}
                          />
                          <span
                            className={`text-4xl sm:text-5xl font-bold leading-none ${
                              plan.isFeatured ? "text-white" : "text-heading"
                            }`}
                          >
                            {plan.price.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Features - Scrollable Section */}
                    <div className="flex-grow mb-6">
                      <div className="max-h-[280px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-500">
                        <ul className="space-y-4">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div
                                className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                                  plan.isFeatured
                                    ? "bg-white/25"
                                    : "bg-gray-200"
                                }`}
                              >
                                <CheckCircle
                                  className={`${
                                    plan.isFeatured
                                      ? "text-white"
                                      : "text-primary"
                                  } w-3.5 h-3.5`}
                                />
                              </div>
                              <span
                                className={`text-sm font-medium ${
                                  plan.isFeatured
                                    ? "text-white/90"
                                    : "text-paragraph"
                                }`}
                              >
                                {feature}
                              </span>
                            </li>
                          ))}

                          {/* Logo Design Section */}
                          {plan.logoDesign && plan.logoDesign.length > 0 && (
                            <>
                              <li className="pt-4">
                                <h4
                                  className={`text-sm font-bold mb-3 ${
                                    plan.isFeatured
                                      ? "text-white"
                                      : "text-gray-700"
                                  }`}
                                >
                                  Logo Design Included:
                                </h4>
                              </li>
                              {plan.logoDesign.map((logoFeature, idx) => (
                                <li
                                  key={`logo-${idx}`}
                                  className="flex items-start gap-3"
                                >
                                  <div
                                    className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                                      plan.isFeatured
                                        ? "bg-white/25"
                                        : "bg-gray-200"
                                    }`}
                                  >
                                    <CheckCircle
                                      className={`${
                                        plan.isFeatured
                                          ? "text-white"
                                          : "text-primary"
                                      } w-3.5 h-3.5`}
                                    />
                                  </div>
                                  <span
                                    className={`text-sm font-medium ${
                                      plan.isFeatured
                                        ? "text-white/90"
                                        : "text-paragraph"
                                    }`}
                                  >
                                    {logoFeature}
                                  </span>
                                </li>
                              ))}
                            </>
                          )}
                        </ul>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 mt-auto pt-4">
                      <DailogLeadForm
                        trigger={
                          <button
                            type="button"
                            className={`w-full text-center py-3 rounded-lg font-semibold text-sm transition-all duration-300 ease-in-out transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                              plan.isFeatured
                                ? "bg-white text-blue-700 hover:bg-gray-50 ring-white ring-offset-blue-600"
                                : "bg-blue-600 text-white hover:bg-blue-700 ring-blue-500 ring-offset-gray-100"
                            }`}
                          >
                            Let&apos;s Get Started →
                          </button>
                        }
                      />
                      <button
                        onClick={OpenLiveChat}
                        type="button"
                        className={`min-w-[120px] px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ease-in-out transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 whitespace-nowrap inline-flex items-center justify-center ${
                          plan.isFeatured
                            ? "bg-white/10 text-white hover:bg-white/20 border-2 border-white/30 ring-white ring-offset-blue-600"
                            : "bg-transparent text-blue-600 hover:bg-blue-50 border-2 border-blue-600 ring-blue-500 ring-offset-gray-100"
                        }`}
                      >
                        Chat Now
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </main>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thumb-gray-400::-webkit-scrollbar-thumb {
          background-color: #9ca3af;
          border-radius: 3px;
        }

        .scrollbar-thumb-gray-400::-webkit-scrollbar-thumb:hover {
          background-color: #6b7280;
        }

        /* For featured cards (blue background) */
        .bg-gradient-to-r .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.3);
        }

        .bg-gradient-to-r .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </>
  );
}
