"use client";
import type React from "react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { User, Mail, Edit3, DollarSign, LoaderCircle } from "lucide-react";

import { HomeContactFormSchema } from "@/schemas/home-contact-form-schema";
import { HomeContactFormType } from "@/interfaces/forms-interface";
import { SendHomeContactFormEmail } from "@/services/email-service";

const services = [
  "Design & Development",
  "App Development",
  "Web Development",
  "Logo Design",
];

export default function ContactSection() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<HomeContactFormType>({
    resolver: zodResolver(HomeContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      project: "",
      services: [],
      budget: "",
    },
  });

  const toggleService = (service: string) => {
    const newServices = selectedServices.includes(service)
      ? selectedServices.filter((s) => s !== service)
      : [...selectedServices, service];

    setSelectedServices(newServices);
    form.setValue("services", newServices);
  };

  const handleSubmit = async (data: HomeContactFormType) => {
    setLoading(true);

    try {
      const success = await SendHomeContactFormEmail({
        ...data,
        services: selectedServices,
      });

      if (success) {
        // Send enhanced conversion with user data
        if (window.gtag_report_conversion) {
          const nameParts = data.name.trim().split(" ");
          const firstName = nameParts[0] || "";
          const lastName = nameParts.slice(1).join(" ") || "";

          await window.gtag_report_conversion(undefined, {
            email: data.email,
            phone: undefined, // No phone field in this form
            firstName: firstName,
            lastName: lastName,
          });
        }

        toast.success("Message sent successfully! We'll get back to you soon.");
        form.reset();
        setSelectedServices([]);
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative section-padding-standard bg-home-page-contact bg-cover bg-opacity-20 py-16 md:py-24 lg:py-28">
      <div className="absolute inset-0 bg-black/20 z-10" />

      <div className="relative z-20 layout-standard flex flex-col gap-8">
        <div className="text-center flex flex-col items-center gap-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-heading text-white max-w-5xl tracking-wider">
            Ready To Amp Up Your <span className="text-primary">Business</span>?
            Our Team Got Your Back For{" "}
            <span className="text-primary">Success!</span>
          </h2>
        </div>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-2 items-center gap-10">
            <div className="space-y-6">
              {/* Name */}
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Your Name"
                  {...form.register("name")}
                  className={cn(
                    "pl-10 py-6 text-lg text-white placeholder:text-base shadow-none placeholder:text-gray-500 font-medium font-inter border-0 border-b-2 border-gray-400 rounded-none bg-transparent",
                    "focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none",
                    form.formState.errors.name && "border-red-500"
                  )}
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-5 w-5 mr-2" />
                {form.formState.errors.name && (
                  <p className="text-red-400 text-sm mt-1">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Business Email"
                  {...form.register("email")}
                  className={cn(
                    "pl-10 py-6 text-lg text-white placeholder:text-base shadow-none placeholder:text-gray-500 font-medium font-inter border-0 border-b-2 border-gray-400 rounded-none bg-transparent",
                    "focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none",
                    form.formState.errors.email && "border-red-500"
                  )}
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-5 w-5 mr-2" />
                {form.formState.errors.email && (
                  <p className="text-red-400 text-sm mt-1">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              {/* Project */}
              <div className="relative">
                <Textarea
                  placeholder="Tell Us About Your Project"
                  {...form.register("project")}
                  className={cn(
                    "pl-10 py-6 text-lg text-white placeholder:text-base shadow-none placeholder:text-gray-500 font-medium font-inter border-0 border-b-2 border-gray-400 rounded-none bg-transparent min-h-[120px] resize-none",
                    "focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none",
                    form.formState.errors.project && "border-red-500"
                  )}
                />
                <Edit3 className="absolute left-3 top-6 text-white h-5 w-5 mr-2" />
                {form.formState.errors.project && (
                  <p className="text-red-400 text-sm mt-1">
                    {form.formState.errors.project.message}
                  </p>
                )}
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {/* Services */}
              <div>
                <h4 className="text-lg text-white font-semibold mb-4">
                  I&apos;m interested in...
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {services.map((service) => (
                    <Button
                      key={service}
                      type="button"
                      variant={
                        selectedServices.includes(service)
                          ? "default"
                          : "outline"
                      }
                      onClick={() => toggleService(service)}
                      className={cn(
                        "text-xs lg:text-sm py-2 px-4 rounded-full transition-all duration-200 border-none",
                        selectedServices.includes(service)
                          ? "bg-primary text-white"
                          : "bg-white text-paragraph border-gray-300 hover:bg-primary-hover"
                      )}
                    >
                      {service}
                    </Button>
                  ))}
                </div>
                {form.formState.errors.services && (
                  <p className="text-red-400 text-sm mt-2">
                    {form.formState.errors.services.message}
                  </p>
                )}
              </div>

              {/* Budget */}
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Budget in Your Mind"
                  {...form.register("budget")}
                  className={cn(
                    "pl-10 py-6 text-lg text-white placeholder:text-base shadow-none placeholder:text-gray-500 font-medium font-inter border-0 border-b-2 border-gray-400 rounded-none bg-transparent",
                    "focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none",
                    form.formState.errors.budget && "border-red-500"
                  )}
                />
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-5 w-5" />
                {form.formState.errors.budget && (
                  <p className="text-red-400 text-sm mt-1">
                    {form.formState.errors.budget.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="text-center pt-8">
            <Button
              type="submit"
              disabled={loading}
              className="w-[160px] md:w-[200px] h-[60px] cta-button px-8 group lg:hover:scale-105 rounded-full lg:hover:bg-primary-hover md:text-lg lg:!animation-standard font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  SENDING...
                </>
              ) : (
                "SUBMIT NOW"
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
