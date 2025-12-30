"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { DailogLeadFormSchema } from "@/schemas/dailog-lead-form-schema";

import { SendDailogLeadFormEmail } from "@/services/email-service";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Logo from "../../../public/favicon/logo-black.png";

import { cn } from "@/lib/utils";

import { LoaderCircle } from "lucide-react";
import { FaTimesCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import {
  DailogLeadFormProps,
  DailogLeadFormType,
} from "@/interfaces/forms-interface";
import CustomSystemField from "@/components/common/custom-system-field";
import CustomInput from "@/components/common/custom-input";
import CustomTextarea from "@/components/common/custom-textarea";
import CustomSelect from "@/components/common/custome-select";

function DailogLeadForm({ trigger }: DailogLeadFormProps) {
  const [loading, setLoading] = useState(false);
  const [system01, setSystem01] = useState("");

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(DailogLeadFormSchema),
    defaultValues: {
      name: "",
      emailAddress: "",
      phoneNumber: "",
      services: "",
      information: "",
    },
  });

  const { handleSubmit, control, reset } = form;

  const onSubmit = async (data: DailogLeadFormType) => {
    if (system01) {
      console.warn("Better Luck Next Time!");
      return;
    }

    setLoading(true);

    try {
      const emailSent = await SendDailogLeadFormEmail(data);

      if (emailSent) {
        // Send enhanced conversion with user data
        if (window.gtag_report_conversion) {
          const nameParts = data.name.trim().split(" ");
          const firstName = nameParts[0] || "";
          const lastName = nameParts.slice(1).join(" ") || "";

          await window.gtag_report_conversion(undefined, {
            email: data.emailAddress,
            phone: data.phoneNumber,
            firstName: firstName,
            lastName: lastName,
          });
        }

        sessionStorage.setItem("form_submitted", "true");
        sessionStorage.setItem("submission_timestamp", Date.now().toString());

        reset();

        router.push("/thankyou");
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Submission Failed", {
          description: `There was an issue processing your request: ${error.message}`,
          icon: <FaCircleXmark className="text-red-600" size={24} />,
        });
      } else {
        toast.error("Something went wrong", {
          description: "Please try again later or contact support.",
          icon: <FaTimesCircle className="text-red-600" size={20} />,
          duration: 6000,
          style: {
            border: "1px solid #fee2e2",
            background: "#fef2f2",
            color: "#991b1b",
            boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
          },
          className: "rounded-lg px-4 py-3 text-sm font-medium",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const servicesOptions = [
    { value: "shopify-design", label: "Shopify Store Design" },
    { value: "logo-design", label: "Logo Design" },
    { value: "animated-logo", label: "Animated Logo Design" },
    { value: "web-development", label: "Web Development" },
    { value: "mobile-app", label: "Mobile App Development" },
    { value: "ui-ux-design", label: "UI/UX Design" },
    { value: "digital-marketing", label: "Digital Marketing" },
    { value: "seo", label: "SEO Services" },
    { value: "other", label: "Other" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-white md:max-h-[700px] md:h-full max-md:w-[90%] max-md:max-h-[600px] max-md:h-[90%] max-w-[800px] overflow-auto !rounded-2xl border-2">
        {/* DAILOG HEADER */}
        <DialogHeader className="flex flex-col gap-4">
          <div className="flex-center">
            <Image
              src={Logo}
              alt="Zevitech"
              className="md:w-[250px] w-[200px]"
            />
          </div>
          <DialogTitle hidden />
          <DialogDescription className="text-foreground font-medium text-center text-sm">
            Zevitech is a full-spectrum digital solutions agency delivering
            mobile apps, web platforms, custom software, SaaS products, UI/UX
            design, eCommerce (Shopify, WordPress), digital marketing, SEO,
            automation, and scalable branding strategies — all in one place.
          </DialogDescription>
        </DialogHeader>

        {/* DAILOG FORM */}
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full flex flex-col gap-4">
              {/* SYSTEM FIELD 01 */}
              <CustomSystemField
                name="system01"
                value={system01}
                onChange={setSystem01}
              />

              {/* NAME AND PHONE NUMBER FIELD */}
              <div className="w-full grid grid-cols-2 gap-4">
                <CustomInput
                  control={control}
                  name="name"
                  placeholder="Full Name"
                  className="border-border focus:border-none"
                />
                <CustomInput
                  control={control}
                  name="phoneNumber"
                  className="border-border focus:border-none"
                  placeholder="Phone Number"
                />
              </div>

              <CustomInput
                control={control}
                name="emailAddress"
                placeholder="Email Address"
                className="border-border focus:border-none"
              />

              <CustomSelect
                control={control}
                name="services"
                placeholder="Select a service"
                options={servicesOptions}
                className="border-border focus:border-none"
              />

              <CustomTextarea
                control={control}
                name="information"
                placeholder="Talk about your project"
                className="border-border focus:border-none"
              />
            </div>

            <DialogFooter className="mt-8 flex items-center md:flex-row flex-col gap-4">
              <Button
                className={cn(
                  "w-full h-[60px] text-base !rounded-full hover:bg-primary-hover  bg-primary"
                )}
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <div className="w-full h-full flex items-center justify-center gap-2 ">
                    <p>Submiting</p>{" "}
                    <LoaderCircle className="animate-spin text-primary-foreground" />
                  </div>
                ) : (
                  "Submit"
                )}
              </Button>
              <DialogClose
                className="w-full h-[60px] text-base !rounded-full hover:bg-black/70 bg-black border-none text-white hover:text-white"
                asChild
              >
                <Button variant="outline">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

export default DailogLeadForm;
