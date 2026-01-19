"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SendContactFormEmail } from "@/services/email-service";

import MultiStepLeadForm from "@/components/forms/multi-step-lead-form";
import HeroMarquee from "@/components/common/hero-marquee";
import AnimatedCloudBackground from "@/components/common/cloud-background-effect";
import { AnimatedBadge } from "@/components/common/animatedbadge";

import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineStar } from "react-icons/md";
import { FaGlobe } from "react-icons/fa";

import TrustpilotIcon from "../../../../public/icons/trustpilot-icon-01.svg";
import ClutchIOIcon from "../../../../public/icons/clutch-io-icon.png";
import GoogleReviewsIcon from "../../../../public/icons/google-reviews-icon.png";
import { OpenLiveChat } from "@/utils/open-live-chat";
import { IoChatbox } from "react-icons/io5";

const rattingStars = Array(5)
  .fill(0)
  .map((_, i) => <MdOutlineStar key={i} className="w-4 h-4" />);

export function WebDesignHero() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    budget: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Store form data before resetting
      const submittedData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      };

      const success = await SendContactFormEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        budget: formData.budget,
      });

      if (success) {
        toast.success("Message sent successfully! We'll contact you soon.");

        // Fire Google Ads conversion with enhanced user data
        try {
          if (typeof window !== "undefined" && window.gtag_report_conversion) {
            // Split name into first and last name
            const nameParts = submittedData.name.trim().split(" ");
            const firstName = nameParts[0] || "";
            const lastName = nameParts.slice(1).join(" ") || "";

            await window.gtag_report_conversion(undefined, {
              email: submittedData.email,
              phone: submittedData.phone,
              firstName: firstName,
              lastName: lastName,
            });
          }
        } catch (conversionError) {
          console.error("Conversion tracking error:", conversionError);
        }

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          budget: "",
        });

        // Wait 1.5 seconds before redirecting to WhatsApp
        setTimeout(() => {
          const whatsappNumber = "971588669020";
          const whatsappMessage = encodeURIComponent(
            `Hi, I just submitted a form on your website. My name is ${submittedData.name}.`,
          );
          const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

          // Open WhatsApp in a new tab
          window.open(whatsappURL, "_blank");
        }, 1500); // 1500ms = 1.5 seconds
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="relative md:pt-[12rem] pt-[10rem] lg:pb-[8rem] overflow-hidden">
      {/* Animated cloud background */}
      <AnimatedCloudBackground />

      <div className="layout-standard flex flex-col gap-12 relative z-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side content */}
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-sm text-paragraph">
              <div className="flex text-accent">{rattingStars}</div>
              <span>Rated 5 on Clutch</span>
            </div>

            <AnimatedBadge text="Web Solutions" icon={<FaGlobe />} />

            <div className="space-y-4">
              <div className="transition-all duration-500">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-heading leading-tight max-w-2xl">
                  Leading Web Design Agency <br />
                  <span className="text-primary">
                    Delivering the Best Results
                  </span>
                </h1>
              </div>

              <div className="transition-all duration-500 delay-75">
                <p className="text-xl text-accent font-semibold">
                  Tailored, scalable, and revenue-driven
                </p>
                <p className="text-paragraph mt-2 font-medium md:text-lg max-w-2xl">
                  Dubai’s leading web design agency, delivering expert,
                  reliable, and top-quality web designing services for impactful
                  online results.
                </p>
              </div>
            </div>

            <div className="flex items-center md:gap-4 gap-2 mt-4">
              <Button
                onClick={OpenLiveChat}
                className="cta-button-02 hidden sm:flex hover:bg-primary-hover"
              >
                <IoChatbox /> Chat Now
              </Button>
              <MultiStepLeadForm
                trigger={
                  <Button className="cta-button-02 text-black w-full sm:w-auto bg-transparent !border-primary">
                    Let&apos;s get started! <FaArrowRightLong />
                  </Button>
                }
              />
            </div>

            {/* Static Review Logos */}
            <div className="flex items-center gap-6 sm:gap-8 mt-10">
              <Link
                href="https://clutch.co/profile/zevitech"
                target="_blank"
                passHref
              >
                <Image
                  src={ClutchIOIcon}
                  alt="Clutch IO"
                  className="flex-shrink-0 hover:scale-105 animation-standard"
                  width={110}
                />
              </Link>

              <Link
                href="https://www.trustpilot.com/review/zevitech.com"
                target="_blank"
                passHref
              >
                <Image
                  src={TrustpilotIcon}
                  alt="Trustpilot"
                  width={140}
                  className="flex-shrink-0 hover:scale-105 animation-standard invert"
                />
              </Link>

              <Link
                href="https://www.google.com/search?q=zevitech#lrd=0xa6b3ae377e4210c3:0x375b0f1a6e9d091e,1,,,"
                target="_blank"
                passHref
              >
                <Image
                  src={GoogleReviewsIcon}
                  alt="Google Reviews"
                  width={120}
                  className="flex-shrink-0 hover:scale-105 animation-standard"
                />
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative flex justify-center">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden">
              {/* Discount Badge */}
              <div className="absolute -top-1 md:-top-3 -right-2 md:-right-3 z-10">
                <div className="relative">
                  <div className="bg-primary rounded-full p-3 md:p-4 shadow-lg">
                    <div className="text-white text-center">
                      <div className="text-xs font-bold uppercase">GET</div>
                      <div className="md:text-3xl font-black leading-none">
                        20%
                      </div>
                      <div className="text-xs font-bold uppercase">OFF NOW</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-heading mb-2">
                  Chat With Us to
                </h2>
                <h3 className="text-xl md:text-2xl font-bold text-heading">
                  Avail 20% Discount
                </h3>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name *"
                    required
                    className="w-full px-4 py-3 border-b-2 border-primary focus:border-primary outline-none transition-colors bg-transparent text-gray-800 placeholder-gray-500"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address *"
                    required
                    className="w-full px-4 py-3 border-b-2 border-primary focus:border-primary outline-none transition-colors bg-transparent text-gray-800 placeholder-gray-500"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone No. *"
                    required
                    className="w-full px-4 py-3 border-b-2 border-primary focus:border-primary outline-none transition-colors bg-transparent text-gray-800 placeholder-gray-500"
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="To help us understand better, enter a brief description about your project."
                    rows={3}
                    className="w-full px-4 py-2 border-b-2 border-primary focus:border-primary outline-none transition-colors bg-transparent text-gray-800 placeholder-gray-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="cta-button-02 w-full flex-center gap-2 bg-primary text-white font-bold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 uppercase text-sm tracking-wide hover:bg-primary/90"
                >
                  Get Started <FaArrowRightLong />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Static Marquee */}
        <HeroMarquee />
      </div>
    </section>
  );
}
