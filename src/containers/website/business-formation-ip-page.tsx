import React from "react";

import { DynamicHero } from "@/components/common/dynamic-hero";
import Cta from "@/components/common/cta";
import DailogLeadForm from "@/components/forms/dailog-lead-form";
import { Button } from "@/components/ui/button";

import {
  BFIPServicesData,
  BFIPProcessSteps,
  BFIPClarificationPoints,
} from "@/content/services/business-formation-ip-content";

import HeroImg from "../../../public/images/hero-images/about-hero-img.jpg";
import CtaImg from "../../../public/images/cta-img.jpg";

import { Building2, ShieldCheck } from "lucide-react";
import { FaArrowRightLong } from "react-icons/fa6";

function BusinessFormationIPPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <DynamicHero
        badgeIcon={<Building2 />}
        badgeText="Corporate Services"
        heading="Business Formation &"
        highlightText="IP Consultancy"
        subheading="Administrative coordination and documentation support"
        description="Administrative coordination and documentation support for company registration and trademark filings through authorized channels."
        heroImage={HeroImg}
      />

      {/* ── OVERVIEW ──────────────────────────────────────────────────────── */}
      <section className="section-padding-standard bg-secondary-background">
        <div className="layout-standard max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-heading">
            Overview
          </h2>
          <p className="text-base md:text-lg text-paragraph font-medium leading-relaxed">
            Zevitech Information Technology LLC provides independent consultancy
            and administrative coordination services for clients seeking business
            formation and intellectual property registration in the United States
            and other jurisdictions.
          </p>
          <p className="text-base md:text-lg text-paragraph font-medium leading-relaxed">
            Our role is limited to documentation preparation support, application
            coordination, and communication management. All official filings are
            processed through authorized channels based on client instruction and
            approval.
          </p>
          <p className="text-base md:text-lg text-paragraph font-medium leading-relaxed">
            Zevitech operates as a technology and administrative support company
            and does not function as a government authority or regulatory body.
          </p>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────────────── */}
      <section className="section-padding-standard">
        <div className="layout-standard">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-heading">
              Our Services
            </h2>
            <p className="text-base md:text-lg text-paragraph font-medium max-w-2xl mx-auto">
              We provide structured administrative support across three core
              service areas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BFIPServicesData.map((service, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-5"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold font-heading text-heading">
                  {service.title}
                </h3>
                <ul className="space-y-2">
                  {service.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-paragraph font-medium"
                    >
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* <div className="flex justify-center mt-10">
            <DailogLeadForm
              trigger={
                <Button className="cta-button py-6 px-8 rounded-full font-bold text-base">
                  Request Consultation <FaArrowRightLong />
                </Button>
              }
            />
          </div> */}
        </div>
      </section>

      {/* ── HOW IT WORKS (4-STEP PROCESS) ─────────────────────────────────── */}
      <section className="section-padding-standard bg-secondary-background">
        <div className="layout-standard">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-heading">
              How Our Consultancy Model Works
            </h2>
            <p className="text-base md:text-lg text-paragraph font-medium max-w-2xl mx-auto">
              A clear, four-step approach from initial engagement to ongoing
              status tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BFIPProcessSteps.map((step, index) => (
              <div key={step.id} className="relative group">
                <div className="bg-card border border-border rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col gap-4">
                  {/* Watermark number */}
                  <div className="text-8xl font-bold text-black/5 absolute top-3 right-5 leading-none select-none">
                    {step.number}
                  </div>
                  {/* Icon */}
                  <div className="relative z-10">{step.icon}</div>
                  {/* Content */}
                  <div className="relative z-10 flex flex-col gap-2">
                    <h3 className="text-base font-semibold font-heading text-heading">
                      {step.title}
                    </h3>
                    <p className="text-sm text-paragraph font-medium leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Arrow connector — shown between cards on large screens */}
                {index < BFIPProcessSteps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-20">
                    <FaArrowRightLong className="w-5 h-5 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROFESSIONAL CLARIFICATION ────────────────────────────────────── */}
      <section className="section-padding-standard">
        <div className="layout-standard max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-7 h-7 text-primary flex-shrink-0" />
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-heading">
              Professional & Regulatory Clarification
            </h2>
          </div>

          <div className="border-l-4 border-primary bg-secondary-background rounded-r-2xl p-8 space-y-4">
            <p className="text-base md:text-lg font-semibold text-heading">
              Zevitech is an independent consultancy company.
            </p>
            <ul className="space-y-3">
              {BFIPClarificationPoints.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm md:text-base text-paragraph font-medium"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
            <p className="text-sm md:text-base text-paragraph font-medium pt-2">
              Services are initiated only after voluntary client engagement and
              confirmation of scope.
            </p>
          </div>
        </div>
      </section>

      {/* ── PARTNER & BRAND COLLABORATION ────────────────────────────────── */}
      <section className="section-padding-standard bg-secondary-background">
        <div className="layout-standard grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-heading mb-4">
              Partner & Brand Collaboration
            </h2>
          </div>
          <div className="space-y-4">
            <p className="text-base md:text-lg text-paragraph font-medium leading-relaxed">
              Zevitech may provide backend administrative and operational support
              to other brands or companies offering similar services.
            </p>
            <p className="text-base md:text-lg text-paragraph font-medium leading-relaxed">
              In such arrangements, Zevitech performs documentation coordination
              and processing tasks under structured service agreements. All
              official submissions are completed through authorized legal and
              administrative channels.
            </p>
          </div>
        </div>
      </section>

      {/* ── INFORMATION HANDLING ──────────────────────────────────────────── */}
      <section className="section-padding-standard">
        <div className="layout-standard grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-heading mb-4">
              Information Handling
            </h2>
          </div>
          <div className="space-y-3">
            <p className="text-base md:text-lg text-paragraph font-medium leading-relaxed">
              Zevitech collects only the information necessary for documentation
              and coordination purposes.
            </p>
            <ul className="space-y-2 mt-2">
              {[
                "Payment processing is conducted through secure and authorized merchant systems in accordance with applicable service agreements.",
                "We do not request banking passwords, OTPs, or unrelated financial authentication credentials.",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm md:text-base text-paragraph font-medium"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      {/* <Cta
        image={CtaImg}
        heading="Have Questions About Business Formation or Trademark Support?"
        text="Our team is available to walk you through the process, answer your questions, and help you get started."
      /> */}
    </>
  );
}

export default BusinessFormationIPPage;
