"use client";
import type React from "react";
import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import { Mail, Phone } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import UserImg from "../../../../public/images/contact-form-img.jpg";

import { SendContactFormEmail } from "@/services/email-service";

function ContactUsForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    agreeToPolicy: false,
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<
    { type: "success" | "error"; message: string } | null
  >(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeToPolicy: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setLoading(true);
    const toastId = toast.loading("Sending your message...");
    try {
      const name = `${formData.firstName} ${formData.lastName}`.trim();
      const success = await SendContactFormEmail({
        name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        budget: "", // No budget field in this form
      });

      if (success) {
        // Send enhanced conversion with user data
        if (window.gtag_report_conversion) {
          await window.gtag_report_conversion(undefined, {
            email: formData.email,
            phone: formData.phone,
            firstName: formData.firstName,
            lastName: formData.lastName,
          });
        }

        toast.success("Thanks! We'll be in touch soon.", { id: toastId, duration: 4000 });
        setFeedback({ type: "success", message: "Thanks! We'll be in touch soon." });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
          agreeToPolicy: false,
        });
      } else {
        toast.error("Failed to send. Please try again.", { id: toastId });
        setFeedback({ type: "error", message: "Failed to send. Please try again." });
      }
    } catch (error) {
      console.error("Form submit error:", error);
      toast.error("Unexpected error. Please try later.", { id: toastId });
      setFeedback({ type: "error", message: "Unexpected error. Please try later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-padding-standard layout-standard">
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden min-h-[600px] p-4">
        <div className="grid md:grid-cols-2 gap-6 min-h-[600px]">
          {/* Left side - Form */}
          <div className="md:p-8 lg:p-12 flex flex-col">
            <div className="">
              <div className="mb-8 space-y-3 md:space-y-4">
                <span className="inline-block px-4 py-2 bg-blue-100 text-primary text-sm font-medium rounded-full">
                  Get in Touch
                </span>
                <h1 className="text-3xl lg:text-4xl font-bold text-heading text-balance leading-tight">
                  Let&apos;s Chat, Reach Out to Us
                </h1>
                <p className="text-paragraph text-base font-medium leading-relaxed">
                  Have questions or feedback? We&apos;re here to help. Send us a
                  message, and we&apos;ll respond within 24 hours
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-heading mb-2"
                    >
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={cn(
                        "w-full h-12 border-gray-200 rounded-lg",
                        "focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                      )}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-heading mb-2"
                    >
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={cn(
                        "w-full h-12 border-gray-200 rounded-lg",
                        "focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                      )}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-heading mb-2"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={cn(
                      "w-full h-12 border-gray-200 rounded-lg",
                      "focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                    )}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-heading mb-2"
                  >
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={cn(
                      "w-full h-12 border-gray-200 rounded-lg",
                      "focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                    )}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-heading mb-2"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Leave us message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={cn(
                      "w-full min-h-[100px] border-gray-200 rounded-lg resize-none",
                      "focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                    )}
                    required
                  />
                </div>

                <div className="flex items-start space-x-3 pt-2">
                  <Checkbox
                    id="privacy"
                    checked={formData.agreeToPolicy}
                    onCheckedChange={handleCheckboxChange}
                    className="mt-1"
                  />
                  <label
                    htmlFor="privacy"
                    className="text-sm text-paragraph font-semibold leading-relaxed"
                  >
                    I agree to our friendly
                  </label>
                </div>

                {feedback && (
                  <p
                    className={cn(
                      "text-sm",
                      feedback.type === "success" ? "text-green-600" : "text-red-600"
                    )}
                  >
                    {feedback.message}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-hover text-white py-5 rounded-lg font-medium transition-colors"
                  disabled={!formData.agreeToPolicy || loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>

          {/* Right side - Image and Contact Info */}
          <div className="bg-gray-50 rounded-md flex flex-col justify-center md:p-8 lg:p-12">
            {/* Contact Person Image - Takes up half the height */}
            <div className="flex-1 max-h-[450px] md:max-h-[500px] flex-center rounded-lg relative overflow-hidden xl:px-14">
              <Image
                src={UserImg}
                alt="Contact person - friendly customer service representative"
                className="w-full h-full rounded-lg object-cover"
              />
            </div>

            {/* Contact Information - Bottom half */}
            <div className="flex flex-col md:p-8 lg:p-12 space-y-6 mt-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-heading text-lg">Email</h3>
                  <p className="text-paragraph">support@zevitech.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-heading text-lg">Phone</h3>
                  <p className="text-paragraph">(302) 217-6211</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUsForm;
