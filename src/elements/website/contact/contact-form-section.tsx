"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

import { FaArrowRightLong } from "react-icons/fa6";
import { LoaderCircle } from "lucide-react";

import { ContactFormSchema } from "@/schemas/contact-form-schema";
import { ContactFormType } from "@/interfaces/forms-interface";
import { SendContactFormEmail } from "@/services/email-service";

function ContactFormSection() {
    const [loading, setLoading] = useState(false);

    const form = useForm<ContactFormType>({
        resolver: zodResolver(ContactFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: "",
        },
    });

    const handleSubmit = async (data: ContactFormType) => {
        setLoading(true);
        
        try {
            const success = await SendContactFormEmail(data);
            
            if (success) {
                toast.success("Message sent successfully! We'll get back to you within 24 hours.");
                form.reset();
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
        <section className="layout-standard section-padding-standard py-12 md:py-16 px-5 rounded-lg flex flex-col gap-16">
            <div className="flex-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold font-inter text-primary-hover mb-6">
                            Get In Touch !!
                        </h3>
                        <p className="text-lg md:text-xl font-medium max-w-[800px] text-paragraph">
                            Whether you have a question, a project idea, or just want to say
                            hello — we&apos;d love to hear from you. Fill out the form below and
                            we&apos;ll get back to you as soon as we can. Our team is always
                            ready to assist, collaborate, or simply start a meaningful
                            conversation.
                        </p>
                    </div>


                    <div className="md:px-10 xl:px-20">

                        <Card className="relative bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
                            <CardContent className="p-8">
                                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-blue-900 uppercase tracking-wide">Full Name</label>
                                            <div className="relative">
                                                <Input
                                                    type="text"
                                                    placeholder="Enter your name"
                                                    {...form.register("name")}
                                                    className={`h-12 border-2 rounded-xl transition-all duration-300 ${
                                                        form.formState.errors.name ? "border-red-500" : ""
                                                    }`}
                                                />
                                                {form.formState.errors.name && (
                                                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-blue-900 uppercase tracking-wide">
                                                Email Address
                                            </label>
                                            <div className="relative">
                                                <Input
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    {...form.register("email")}
                                                    className={`h-12 border-2 rounded-xl transition-all duration-300 ${
                                                        form.formState.errors.email ? "border-red-500" : ""
                                                    }`}
                                                />
                                                {form.formState.errors.email && (
                                                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-blue-900 uppercase tracking-wide">Phone Number</label>
                                        <div className="relative">
                                            <Input
                                                type="tel"
                                                placeholder="Enter your phone number"
                                                {...form.register("phone")}
                                                className={`h-12 border-2 rounded-xl transition-all duration-300 ${
                                                    form.formState.errors.phone ? "border-red-500" : ""
                                                }`}
                                            />
                                            {form.formState.errors.phone && (
                                                <p className="text-red-500 text-sm mt-1">{form.formState.errors.phone.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-blue-900 uppercase tracking-wide">Message</label>
                                        <div className="relative">
                                            <Textarea
                                                placeholder="Tell us about your project or inquiry..."
                                                rows={5}
                                                {...form.register("message")}
                                                className={`border-2 rounded-xl resize-none transition-all duration-300 ${
                                                     form.formState.errors.message ? "border-red-500" : ""
                                                 }`}
                                            />
                                            {form.formState.errors.message && (
                                                <p className="text-red-500 text-sm mt-1">{form.formState.errors.message.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex-center">
                                        <Button 
                                            type="submit"
                                            disabled={loading}
                                            className="h-[50px] bg-primary hover:bg-primary-hover md:px-8 px-4 py-4 rounded-full font-bold md:text-base text-sm !animation-standard flex items-center gap-2 group md:hover:scale-105 cta-button disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? (
                                                <>
                                                    <LoaderCircle className="md:w-5 md:h-5 w-3 h-3 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    Let&apos;s Get Started
                                                    <FaArrowRightLong className="md:w-5 md:h-5 w-3 h-3 md:group-hover:translate-x-[3px] md:animation-standard" />
                                                </>
                                            )}
                                        </Button>
                                    </div>

                                    <div className="text-center pt-4">
                                        <p className="text-sm text-blue-600">We&apos;ll get back to you within 24 hours</p>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                    </div>

                </div>
            </div>

            <Card className="bg-white border-blue-200 shadow-lg overflow-hidden">
  <CardContent className="p-0">
    <div className="w-full h-64 md:h-[400px] bg-blue-100 relative overflow-hidden">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9917.789086838942!2d-0.018829199999999997!3d51.589979199999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761d8a598c38b3%3A0x7b68c63e9cf84a12!2s30%20Riverhead%20Cl%2C%20London%20E17%205PY%2C%20UK!5e0!3m2!1sen!2suk!4v1724854800000!5m2!1sen!2suk"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0"
      />
    </div>
  </CardContent>
</Card>

        </section>
    );
}

export default ContactFormSection;