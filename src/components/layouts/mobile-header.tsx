"use client";
import * as React from "react";
import Link from "next/link";

import { Menu, ChevronDown } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
  servicesConfig,
  navigationItems,
} from "@/content/components.layout-content";

function MobileHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [openAccordions, setOpenAccordions] = React.useState<string[]>([]);

  const handleAccordionChange = (value: string[]) => {
    setOpenAccordions(value);
  };

  const toggleAccordion = (serviceId: string) => {
    if (openAccordions.includes(serviceId)) {
      setOpenAccordions(openAccordions.filter((id) => id !== serviceId));
    } else {
      setOpenAccordions([...openAccordions, serviceId]);
    }
  };

  return (
    <main>
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="default" className="lg:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-[300px] sm:w-[400px] h-full overflow-y-auto max-h-screen"
        >
          <div className="flex flex-col space-y-4 mt-6">
            <Link
              href="/"
              className="text-lg font-medium text-heading hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about-us"
              className="text-lg font-medium text-heading hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-primary-hover">
                Services
              </h3>
              <Accordion
                type="multiple"
                className="w-full"
                value={openAccordions}
                onValueChange={handleAccordionChange}
              >
                {servicesConfig.items.map((service) => {
                  const hasChildren = service.children.length > 0;

                  if (!hasChildren) {
                    return (
                      <div key={service.id} className="pl-4">
                        <Link
                          href={service.href!}
                          className="block text-sm text-paragraph hover:text-primary transition-colors py-2"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {service.label}
                        </Link>
                      </div>
                    );
                  }

                  // Special handling for Logo Design
                  if (service.id === "logo-design") {
                    return (
                      <AccordionItem
                        key={service.id}
                        value={service.id}
                        className="border-none"
                      >
                        <div className="flex items-center pl-4 py-2">
                          <Link
                            href={service.href!}
                            className="flex-1 text-base font-medium hover:text-primary transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {service.label}
                          </Link>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              toggleAccordion(service.id);
                            }}
                            className="p-2 hover:text-primary transition-colors"
                            aria-label={`Toggle ${service.label} submenu`}
                          >
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-200 ${
                                openAccordions.includes(service.id)
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </button>
                        </div>
                        <AccordionContent className="pl-8 pb-2">
                          <div className="space-y-1">
                            {service.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                className="block text-xs text-paragraph hover:text-primary transition-colors py-1"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  }

                  // Default accordion behavior for all other services
                  return (
                    <AccordionItem
                      key={service.id}
                      value={service.id}
                      className="border-none"
                    >
                      <AccordionTrigger className="pl-4 text-base font-medium hover:text-primary hover:no-underline py-2">
                        <span>{service.label}</span>
                      </AccordionTrigger>
                      <AccordionContent className="pl-8 pb-2">
                        <div className="space-y-1">
                          {service.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="block text-xs text-paragraph hover:text-primary transition-colors py-1"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>

            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-lg font-medium hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </main>
  );
}

export default MobileHeader;
