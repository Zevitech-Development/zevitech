"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";



import { FaStore } from "react-icons/fa6";
import { FaPalette, FaCode, FaVideo, FaBook } from "react-icons/fa";
import { FaMobileScreen } from "react-icons/fa6";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { MegaMenuProps } from "@/interfaces/components.partials-interfaces";
import { HeaderServicesNavLinkContent } from "@/content/components.layout-content";

function MegaMenu({
  handleMouseEnter,
  handleMouseLeave,
  setIsServicesOpen,
}: MegaMenuProps) {
  const [openAccordion, setOpenAccordion] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleAccordion = (key: string) => {
    setOpenAccordion((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <nav
      className="w-full bg-secondary-background border-b border-border py-12 absolute top-[110px] left-0 z-50 max-lg:hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="layout-standard w-full h-full grid grid-cols-[400px_1fr] gap-[3rem]">
        {/* LEFT PANEL */}
        <div className="w-full h-[600px] rounded-3xl overflow-hidden border">
          <video
            src="/videos/header-nav-menu-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full grid grid-cols-3 gap-8">
          {HeaderServicesNavLinkContent.map((service, index) => (
            <div key={index} className="space-y-6">
              {/* CATEGORY TITLE WITH ICON */}
              <div className="flex items-center gap-2 mb-3">
                {service.title === "Branding & Design" && (
                  <div className="p-2 rounded-2xl bg-[#db2777]">
                    <FaPalette className="text-white" size={14} />
                  </div>
                )}

                {service.title === "Website Development" && (
                  <div className="p-2 rounded-2xl bg-[#1d4ed8]">
                    <FaCode className="text-white" size={14} />
                  </div>
                )}

                {service.title === "Mobile App Development" && (
                  <div className="p-2 rounded-2xl bg-[#ea580c]">
                    <FaMobileScreen className="text-white" size={14} />
                  </div>
                )}

                {service.title === "E-commerce Automation Stores" && (
                  <div className="p-2 rounded-2xl bg-[#d22626]">
                    <FaStore className="text-white" size={14} />
                  </div>
                )}

                {service.title === "Video & Media Production" && (
                  <div className="p-2 rounded-2xl bg-[#15803d]">
                    <FaVideo className="text-white" size={14} />
                  </div>
                )}

                {service.title === "Book Publishing" && (
                  <div className="p-2 rounded-2xl bg-[#6b21a8]">
                    <FaBook className="text-white" size={14} />
                  </div>
                )}

                <span className="font-bold text-heading">{service.title}</span>
              </div>

              {/* SUBMENU ITEMS */}
              <ul className="space-y-4">
                {service.subMenu.map((sub, subIndex) => {
                  const key = `${index}-${subIndex}`;
                  const isOpen = openAccordion[key] || false;

                  return (
                    <li key={subIndex}>
                      <div
                        className={`flex justify-between items-center cursor-pointer`}
                        onClick={() => sub.menu && toggleAccordion(key)}
                      >
                        {sub.href ? (
                          <Link
                            href={sub.href}
                            className="hover:text-primary transition-colors duration-200 text-sm"
                            onClick={() => setIsServicesOpen(false)}
                          >
                            {sub.title}
                          </Link>
                        ) : (
                          <span className="hover:text-primary transition-colors duration-200 text-sm">
                            {sub.title}
                          </span>
                        )}
                        {sub.menu &&
                          (isOpen ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          ))}
                      </div>

                      <AnimatePresence>
                        {sub.menu && isOpen && (
                          <motion.ul
                            key="content"
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={{
                              open: { opacity: 1, height: "auto" },
                              collapsed: { opacity: 0, height: 0 },
                            }}
                            transition={{
                              duration: 0.3,
                              ease: "easeInOut",
                            }}
                            className="overflow-hidden my-4 space-y-4 pl-3 border-l border-gray-200"
                          >
                            {sub.menu.map((nested, nestedIndex) => (
                              <li key={nestedIndex}>
                                <Link
                                  href={nested.href}
                                  className="hover:text-primary transition-colors duration-200 text-sm flex items-center gap-2"
                                  onClick={() => setIsServicesOpen(false)}
                                >
                                  <ArrowRight size={12} />
                                  {nested.title}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default MegaMenu;
