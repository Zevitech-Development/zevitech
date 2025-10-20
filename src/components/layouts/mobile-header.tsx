"use client";
import * as React from "react";
import Link from "next/link";

import { Menu } from "lucide-react";

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
  return (
    <main>
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="default" className="lg:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px] h-full overflow-y-auto max-h-screen">
          <div className="flex flex-col space-y-4 mt-6">
            <Link
              href="/"
              className="text-lg font-medium text-heading hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-lg font-medium text-heading hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-primary-hover">
                Services
              </h3>
              <Accordion type="multiple" className="w-full">
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

                  return (
                    <AccordionItem
                      key={service.id}
                      value={service.id}
                      className="border-none"
                    >
                      <AccordionTrigger className="pl-4 text-base font-medium hover:text-primary hover:no-underline py-2">
                        {service.label}
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
