"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";

import { OpenLiveChat } from "@/utils/open-live-chat";
import { SendContactFormEmail } from "@/services/email-service";

import MultiStepLeadForm from "@/components/forms/multi-step-lead-form";
import HeroMarquee from "@/components/common/hero-marquee";
import AnimatedCloudBackground from "@/components/common/cloud-background-effect";
import { AnimatedBadge } from "@/components/common/animatedbadge";

import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineStar } from "react-icons/md";

import TrustpilotIcon from "../../../public/icons/trustpilot-icon-01.svg";
import ClutchIOIcon from "../../../public/icons/clutch-io-icon.png";
import GoogleReviewsIcon from "../../../public/icons/google-reviews-icon.png";

import { LandingDynamicHeroProps } from "@/interfaces/common-interfaces";

const rattingStars = Array(5)
  .fill(0)
  .map((_, i) => <MdOutlineStar key={i} className="w-4 h-4" />);

export function LandingDynamicHero({
  badgeIcon,
  badgeText,
  normalText,
  highlightText,
  subheading,
  description,
}: LandingDynamicHeroProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);

      const submitted = { ...formData };

      const success = await SendContactFormEmail({ ...formData });

      if (success) {
        toast.success("Message sent successfully!");

        setFormData({ name: "", email: "", phone: "", message: "" });

        setTimeout(() => {
          const whatsappURL = `https://wa.me/971588669020?text=${encodeURIComponent(
            `Hi, I just submitted a form. My name is ${submitted.name}.`
          )}`;
          window.open(whatsappURL, "_blank");
        }, 1500);
      } else {
        toast.error("Failed to send message.");
      }
    } catch (err) {
      toast.error("Error… try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative md:pt-[12rem] pt-[10rem] lg:pb-[8rem] overflow-hidden">
      <AnimatedCloudBackground />

      <div className="layout-standard flex flex-col gap-12 relative z-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE CONTENT */}
          <div className="space-y-8">
            {/* Rating */}
            <div className="flex items-center gap-2 text-sm text-paragraph">
              <div className="flex text-accent">{rattingStars}</div>
              <span>Rated 5 on Clutch</span>
            </div>

            {/* Badge */}
            <AnimatedBadge text={badgeText} icon={badgeIcon} />

            {/* HEADINGS */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-heading leading-tight max-w-2xl">
                {normalText} <br />
                <span className="text-primary">{highlightText}</span>
              </h1>

              <p className="text-xl text-accent font-semibold">{subheading}</p>

              <p className="text-paragraph mt-2 font-medium md:text-lg max-w-2xl">
                {description}
              </p>
            </div>

            {/* CTA BUTTONS */}
            <div className="flex items-center md:gap-4 gap-2 mt-4">
              <Button
                onClick={OpenLiveChat}
                className="cta-button-02 hidden sm:flex hover:bg-primary-hover"
              >
                Chat Now
              </Button>

              <MultiStepLeadForm
                trigger={
                  <Button className="cta-button-02 text-black w-full sm:w-auto bg-transparent !border-primary">
                    Let&apos;s get started! <FaArrowRightLong />
                  </Button>
                }
              />
            </div>

            {/* LOGOS */}
            <div className="flex items-center gap-6 sm:gap-8 mt-10">
              <Link
                href="https://clutch.co/profile/zevitech"
                target="_blank"
                passHref
              >
                <Image
                  src={ClutchIOIcon}
                  alt="Clutch IO"
                  width={110}
                  className="hover:scale-105 animation-standard"
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
                  className="hover:scale-105 animation-standard invert"
                />
              </Link>

              <Link
                href="https://www.google.com/search?q=zevitech"
                target="_blank"
                passHref
              >
                <Image
                  src={GoogleReviewsIcon}
                  alt="Google Reviews"
                  width={120}
                  className="hover:scale-105 animation-standard"
                />
              </Link>
            </div>
          </div>

          {/* RIGHT FORM BOX */}
          <div className="relative flex justify-center">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden">
              {/* Discount Badge */}
              <div className="absolute -top-1 md:-top-3 -right-2 md:-right-3 z-10">
                <div className="bg-primary rounded-full p-3 md:p-4 shadow-lg text-white text-center">
                  <div className="text-xs font-bold uppercase">GET</div>
                  <div className="md:text-3xl font-black leading-none">20%</div>
                  <div className="text-xs font-bold uppercase">OFF NOW</div>
                </div>
              </div>

              {/* Form Heading */}
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-heading mb-2">
                  Chat With Us to
                </h2>
                <h3 className="text-xl md:text-2xl font-bold text-heading">
                  Avail 20% Discount
                </h3>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name *"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-b-2 border-primary outline-none bg-transparent"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-b-2 border-primary outline-none bg-transparent"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone No. *"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-b-2 border-primary outline-none bg-transparent"
                />

                <textarea
                  name="message"
                  rows={3}
                  placeholder="To help us understand your project..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-b-2 border-primary outline-none bg-transparent resize-none"
                />

                <button
                  type="submit"
                  className="cta-button-02 w-full flex-center gap-2 bg-primary text-white font-bold rounded-lg hover:shadow-lg transition-all"
                >
                  Get Started <FaArrowRightLong />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* MARQUEE */}
        <HeroMarquee />
      </div>
    </section>
  );
}
