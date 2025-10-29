"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

import {
  companyLinks,
  Footerconfig,
  serviceLinks,
  socialLinks,
} from "@/content/components.layout-content";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  NewsletterFormSchema,
  NewsletterFormType,
} from "@/schemas/newsletter-form-schema";
import { SendNewsletterSubscriptionEmail } from "@/services/email-service";

import DmcaLogo01 from "../../../public/images/DMCA-Logo-01.png";
import DmcaLogo02 from "../../../public/images/DMCA-Logo-02.png";
import { OpenLiveChat } from "@/utils/open-live-chat";

function Footer() {
  const [loading, setLoading] = useState(false);

  const form = useForm<NewsletterFormType>({
    resolver: zodResolver(NewsletterFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: NewsletterFormType) => {
    try {
      setLoading(true);
      await SendNewsletterSubscriptionEmail(data);
      toast.success("Thank you for subscribing to our newsletter!");
      form.reset();
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#1E293B] text-white">
      {/* Main footer content */}
      <div className="layout-standard section-padding-standard flex flex-col gap-16 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 border-b-2 border-b-gray-400 pb-6 lg:pb-10">
          {/* Company Links */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <h3 className="text-lg md:text-xl font-semibold text-primary">
                Company
              </h3>
            </div>
            <ul className="space-y-4">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white hover:text-primary transition-colors text-base font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <h3 className="text-lg md:text-xl font-semibold text-primary">
                Services
              </h3>
            </div>
            <ul className="space-y-4">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white hover:text-primary transition-colors text-base font-medium"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 border-b-2 border-b-gray-400 pb-6 lg:pb-10">
          {/* Company Info */}
          <div className="flex flex-col gap-7">
            <div className="">
              <h3 className="text-xl font-bold text-white mb-2">
                SERVING GLOBALLY
              </h3>
              <p className="text-gray-300 text-lg">
                Based in {Footerconfig.location}!
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2
                onClick={OpenLiveChat}
                className="text-6xl md:text-7xl lg:text-8xl font-bold hover:cursor-pointer text-white hover:underline decoration-[4px] underline-offset-8 decoration-primary leading-relaxed"
              >
                Let&apos;s Chat
              </h2>
              <a
                href={`mailto:${Footerconfig.contactEmail}`}
                className="text-white hover:text-primary transition-colors text-base underline"
              >
                {Footerconfig.contactEmail}
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-bold text-white">
                Email Newsletter
              </h3>
              <p className="text-gray-300 text-lg">
                Get the Latest Inspiration & Insights
              </p>
            </div>

            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-3"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Your Email"
                    {...form.register("email")}
                    className="bg-transparent border-paragraph text-white placeholder:text-gray-400 focus:border-primary-hover h-12 text-lg"
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-400 text-sm mt-1">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-primary hover:bg-primary-hover text-white px-8 h-12 text-base font-semibold rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin mr-2" size={16} />
                      SUBSCRIBING...
                    </>
                  ) : (
                    "SIGN UP"
                  )}
                </Button>
              </div>
            </form>

            {/* DMCA Protection badges would go here if needed */}
            <div className="flex gap-5">
              <Image
                className="w-16 rounded-lg"
                src={DmcaLogo01}
                alt="dmca-logo"
              />
              <Image
                className="w-16 rounded-lg"
                src={DmcaLogo02}
                alt="dmca-logo"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="layout-standard py-6">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          {/* Copyright and contact */}
          <div className="flex flex-col gap-2 text-gray-300">
            <span>
              © {Footerconfig.year} {Footerconfig.companyName}
            </span>
            <a
              href={`mailto:${Footerconfig.contactEmail}`}
              className="hover:text-primary transition-colors"
            >
              {Footerconfig.contactEmail}
            </a>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white text-heading rounded-full flex-center hover:bg-primary hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <IconComponent size={20} />
                </a>
              );
            })}
          </div>

          {/* Legal links */}
          <div className="flex items-center gap-4 text-gray-300">
            <a
              href="/privacy-policy"
              className="hover:text-primary text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <span>|</span>
            <a
              href="/terms-service"
              className="hover:text-primary text-sm transition-colors"
            >
              Terms and Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
