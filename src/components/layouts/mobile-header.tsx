"use client";
import Link from "next/link";
import { useState } from "react";

import { Menu } from "lucide-react";

import Logo from "../partials/logo";

import DailogLeadForm from "@/forms/dailog-lead-form";

import { FaArrowRightLong } from "react-icons/fa6";

import {
  navigationItems,
  brandingServices,
  websiteServices,
} from "@/content/components.layout-content";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className="lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[350px]">
          <SheetHeader className="text-left">
            <SheetTitle className="">
              <Logo />
            </SheetTitle>
          </SheetHeader>

          <div className="mt-8 flex flex-col space-y-3">
            {/* Navigation Links */}
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-3 py-2 font-semibold text-paragraph transition-colors hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Services Accordion */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="services" className="border-none">
                <AccordionTrigger className="rounded-lg px-3 py-2 text-xl text-primary font-bold hover:text-heading hover:no-underline">
                  Our Services
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <div className="space-y-3 pl-3">
                    <Accordion type="single" collapsible>
                      <AccordionItem value="branding" className="border-none">
                        <AccordionTrigger className="rounded-lg px-3 py-2 text-lg text-gray-700 font-semibold hover:text-primary hover:no-underline">
                          Branding & Design
                        </AccordionTrigger>
                        <AccordionContent className="pb-0">
                          <div className="space-y-2 pl-3">
                            {/* Logo Design Accordion */}
                            <Accordion type="single" collapsible>
                              <AccordionItem
                                value="logo-design"
                                className="border-none"
                              >
                                <AccordionTrigger className="rounded-lg px-3 py-1.5 text-lg text-paragraph font-medium hover:text-primary hover:no-underline">
                                  Logo Design
                                </AccordionTrigger>
                                <AccordionContent className="pb-0">
                                  <div className="space-y-1 pl-3">
                                    {brandingServices.logoDesign.map(
                                      (service, index) => (
                                        <Link
                                          key={index}
                                          href={service.href}
                                          className="block rounded-md px-3 py-1.5 text-sm text-paragraph font-medium transition-colors hover:bg-muted hover:text-foreground"
                                          onClick={() => setIsOpen(false)}
                                        >
                                          {service.name}
                                        </Link>
                                      )
                                    )}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>

                            {/* Separate Branding Services */}
                            {brandingServices.separateServices.map(
                              (service, index) => (
                                <Link
                                  key={index}
                                  href={service.href}
                                  className="block rounded-md px-3 py-1.5 text-base text-paragraph transition-colors hover:bg-muted hover:text-foreground"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {service.name}
                                </Link>
                              )
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <Accordion type="single" collapsible>
                      <AccordionItem value="website" className="border-none">
                        <AccordionTrigger className="rounded-lg px-3 py-2 text-lg text-gray-700 font-semibold hover:text-primary hover:no-underline">
                          Website Development
                        </AccordionTrigger>
                        <AccordionContent className="pb-0">
                          <div className="space-y-2 pl-3">
                            {/* E-Commerce Website Accordion */}
                            <Accordion type="single" collapsible>
                              <AccordionItem
                                value="ecommerce"
                                className="border-none"
                              >
                                <AccordionTrigger className="rounded-lg px-3 py-1.5 text-lg text-paragraph font-medium hover:text-primary hover:no-underline">
                                  E-Commerce Website
                                </AccordionTrigger>
                                <AccordionContent className="pb-0">
                                  <div className="space-y-1 pl-3">
                                    {websiteServices.ecommerce.map(
                                      (service, index) => (
                                        <a
                                          key={index}
                                          href={service.href}
                                          className="block rounded-md px-3 py-1.5 text-base text-paragraph transition-colors hover:bg-muted hover:text-foreground"
                                          onClick={() => setIsOpen(false)}
                                        >
                                          {service.name}
                                        </a>
                                      )
                                    )}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* CTA Button */}
            <div className="pt-4">
              <DailogLeadForm
                trigger={
                  <Button className="cta-button bg-primary !border-primary hover:bg-primary text-primary-foreground md:text-lg md:px-6 md:py-6">
                    Let&apos;s Get Started
                    <FaArrowRightLong className="group-hover:translate-x-[2px] animation-standard" />
                  </Button>
                }
              ></DailogLeadForm>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
