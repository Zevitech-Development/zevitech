"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

import Logo from "../../../../public/favicon/logo-black.png";

import StepService from "./step-service";
import StepBudget from "./step-budget";
import StepTimeline from "./step-timeline";
import StepContact from "./step-contact";
import ProgressBar from "./progress-bar";

import { SendMultiStepLeadFormEmail } from "@/services/email-service";

export interface MultiStepFormData {
  service: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
}

interface MultiStepLeadFormProps {
  trigger: React.ReactNode;
}

const TOTAL_STEPS = 4;

export default function MultiStepLeadForm({ trigger }: MultiStepLeadFormProps) {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  const [formData, setFormData] = useState<MultiStepFormData>({
    service: "",
    budget: "",
    timeline: "",
    name: "",
    email: "",
    phone: "",
  });

  const updateFormData = (field: keyof MultiStepFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      service: "",
      budget: "",
      timeline: "",
      name: "",
      email: "",
      phone: "",
    });
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const success = await SendMultiStepLeadFormEmail(formData);

      if (success) {
        // Send enhanced conversion with user data
        if (window.gtag_report_conversion) {
          const nameParts = formData.name.trim().split(" ");
          const firstName = nameParts[0] || "";
          const lastName = nameParts.slice(1).join(" ") || "";

          await window.gtag_report_conversion(undefined, {
            email: formData.email,
            phone: formData.phone,
            firstName: firstName,
            lastName: lastName,
          });
        }

        toast.success("Thank you! We'll contact you shortly.");

        // Store submitted data before resetting
        const submittedName = formData.name;

        // Reset and close form
        resetForm();
        setOpen(false);

        // Redirect to WhatsApp after 1.5 seconds
        setTimeout(() => {
          const whatsappNumber = "971588669020";
          const whatsappMessage = encodeURIComponent(
            `Hi, I just submitted a form on your website. My name is ${submittedName}. I'm interested in ${formData.service || "web design services"}.`
          );
          const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
          window.open(whatsappURL, "_blank");
        }, 1500);
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepService
            value={formData.service}
            onChange={(value) => updateFormData("service", value)}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <StepBudget
            value={formData.budget}
            onChange={(value) => updateFormData("budget", value)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <StepTimeline
            value={formData.timeline}
            onChange={(value) => updateFormData("timeline", value)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <StepContact
            formData={formData}
            updateFormData={updateFormData}
            onBack={prevStep}
            onSubmit={handleSubmit}
            loading={loading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-white w-[95vw] max-w-[600px] md:max-w-[700px] lg:max-w-[750px] max-h-[90vh] overflow-y-auto overflow-x-hidden !rounded-2xl border-2 p-0">
        {/* Close Button - Left Side */}
        <DialogClose className="absolute left-3 top-3 md:left-4 md:top-4 z-50 rounded-full bg-gray-100 hover:bg-gray-200 p-2 transition-colors">
          <X className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
          <span className="sr-only">Close</span>
        </DialogClose>

        {/* Discount Badge */}
        <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 z-50">
          <div className="bg-primary rounded-full p-3 md:p-4 shadow-lg">
            <div className="text-white text-center">
              <div className="text-[10px] md:text-xs font-bold uppercase">GET</div>
              <div className="text-xl md:text-2xl font-black leading-none">20%</div>
              <div className="text-[10px] md:text-xs font-bold uppercase">OFF</div>
            </div>
          </div>
        </div>

        {/* Header */}
        <DialogHeader className="px-6 md:px-10 pt-6 md:pt-8 pb-2">
          <div className="flex-center mb-3">
            <Image src={Logo} alt="Zevitech" className="w-[180px] md:w-[220px]" />
          </div>
          <DialogTitle className="text-center text-xl md:text-2xl lg:text-3xl font-bold text-heading">
            Get Your Free Quote
          </DialogTitle>
          <DialogDescription className="text-center text-sm md:text-base text-paragraph mt-2">
            Answer a few questions and we&apos;ll provide a custom quote
          </DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="px-6 md:px-10">
          <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        </div>

        {/* Form Steps */}
        <div className="px-6 md:px-10 pb-6 md:pb-8 min-h-[380px] md:min-h-[420px] overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
