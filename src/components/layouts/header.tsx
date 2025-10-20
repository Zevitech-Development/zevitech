"use client";
import * as React from "react";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import Logo from "@/components/partials/logo";

import MobileHeader from "./mobile-header";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  servicesConfig,
  allNavigationItems,
} from "@/content/components.layout-content";

import { ServiceLink } from "@/interfaces/header-interface";

import DailogLeadForm from "../forms/dailog-lead-form";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const DesktopServiceItem = ({ service }: { service: ServiceLink }) => {
    const hasChildren = service.children.length > 0;
    const [open, setOpen] = React.useState(false);
    const closeTimer = React.useRef<number | null>(null);

    const openMenu = () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
        closeTimer.current = null;
      }
      setOpen(true);
    };

    const delayedClose = () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      closeTimer.current = window.setTimeout(() => setOpen(false), 210);
    };

    if (!hasChildren) {
      return (
        <Link
          href={service.href!}
          className="flex items-center justify-between p-3 rounded-md hover:bg-white hover:text-primary transition-colors"
        >
          <span className="text-xl xl:text-2xl font-bold">{service.label}</span>
        </Link>
      );
    }

    return (
      <Popover open={open}>
        <div className="flex items-center gap-2 p-3 rounded-md hover:bg-white hover:text-primary transition-colors">
          <span className="text-xl xl:text-2xl font-bold flex-1">
            {service.label}
          </span>
          <PopoverTrigger asChild>
            <button
              onMouseEnter={openMenu}
              onMouseLeave={delayedClose}
              aria-haspopup="menu"
              aria-expanded={open}
              className="group flex-shrink-0 p-1 rounded hover:bg-gray-100 transition-colors outline-none focus:outline-none ring-0 border-0"
            >
              <ArrowRight
                className={cn(
                  "h-5 xl:h-6 w-5 xl:w-6 text-primary-hover opacity-60 font-bold group-hover:opacity-100",
                  "transform transition-transform duration-300 ease-in-out delay-130",
                  open ? "rotate-90" : "rotate-0"
                )}
              />
            </button>
          </PopoverTrigger>
        </div>
        <PopoverContent
          side="bottom"
          align="start"
          className="w-56 p-2 bg-white rounded-md shadow-xl border outline z-50"
          onMouseEnter={openMenu}
          onMouseLeave={delayedClose}
        >
          {service.children.map((child) => (
            <Link
              key={child.label}
              href={child.href}
              className="block px-3 py-2 text-base text-paragraph font-semibold hover:text-primary-hover hover:bg-gray-50 rounded-md transition-colors"
            >
              {child.label}
            </Link>
          ))}
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <>
      {/* Blur Backdrop Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[45] transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      <header className="sticky top-0 z-50 bg-neutral-100 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="layout-standard flex h-24 items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <NavigationMenu
            className={cn(
              "hidden lg:flex",
              // Navigation menu root override with pointer-events fix
              "[&>div:last-child]:!left-auto [&>div:last-child]:!justify-start [&>div:last-child]:pointer-events-none [&>div:last-child>*]:pointer-events-auto"
            )}
          >
            <NavigationMenuList className="flex items-center gap-6">
              {/* Dynamic Navigation Items with Services inserted after Pricing */}
              {allNavigationItems.map((item, index) => (
                <React.Fragment key={item.name}>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href={item.href}
                      className={cn(
                        "group inline-flex w-max items-center justify-center rounded-md text-lg text-paragraph font-semibold hover:font-bold transition-colors hover:text-primary focus:text-primary-hover focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                      )}
                    >
                      {item.name}
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  {/* Insert Services dropdown after Pricing */}
                  {item.name === "Pricing" && (
                    <NavigationMenuItem>
                      <NavigationMenuTrigger
                        onPointerEnter={() => setIsMenuOpen(true)}
                        onPointerLeave={() => setIsMenuOpen(false)}
                        className={cn(
                          "text-paragraph hover:text-primary-hover font-semibold hover:font-bold text-lg p-0 cursor-pointer",
                          // Override default Shadcn styles
                          "!bg-transparent hover:!bg-transparent focus:!bg-transparent",
                          "data-[state=open]:!bg-transparent data-[state=open]:hover:!bg-transparent data-[state=open]:focus:!bg-transparent",
                          "data-[state=open]:text-primary-hover focus:text-paragraph"
                        )}
                      >
                        Services
                      </NavigationMenuTrigger>
                      <NavigationMenuContent
                        onPointerEnter={() => setIsMenuOpen(true)}
                        onPointerLeave={() => setIsMenuOpen(false)}
                        className={cn(
                          "[&[data-radix-navigation-menu-viewport]]:!left-auto [&[data-radix-navigation-menu-viewport]]:!origin-top-left"
                        )}
                      >
                        <div className="w-[900px] xl:w-[1100px] p-6 bg-neutral-50">
                          <div className="grid grid-cols-6 gap-8">
                            {/* Left column - Description */}
                            <div className="col-span-2 space-y-3">
                              <h3 className="text-4xl font-bold text-heading font-heading">
                                {servicesConfig.heading}
                              </h3>
                              <p className="text-paragraph font-medium leading-relaxed">
                                {servicesConfig.text}
                              </p>
                            </div>

                            {/* Right side - Dynamic Services containers */}
                            <div className="col-span-4">
                              <div className="grid grid-cols-2 gap-x-5 gap-y-12">
                                {/* Create containers dynamically - each container holds max 5 services */}
                                {Array.from({
                                  length: Math.ceil(
                                    servicesConfig.items.length / 5
                                  ),
                                }).map((_, containerIndex) => (
                                  <div key={containerIndex} className="">
                                    {servicesConfig.items
                                      .slice(
                                        containerIndex * 5,
                                        (containerIndex + 1) * 5
                                      )
                                      .map((service) => (
                                        <DesktopServiceItem
                                          key={service.id}
                                          service={service}
                                        />
                                      ))}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  )}
                </React.Fragment>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Call to Action & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <DailogLeadForm
              trigger={
                <Button className="hidden lg:flex px-6 py-6 bg-primary text-white hover:bg-primary-hover text-base font-semibold">
                  Let&apos;s Get Started
                </Button>
              }
            />
            <MobileHeader />
          </div>
        </div>
      </header>
    </>
  );
}
