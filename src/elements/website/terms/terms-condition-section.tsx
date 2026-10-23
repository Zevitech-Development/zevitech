"use client"

import GlobalAccordian from '@/components/layouts/global-accordian'
import { GlobalSidebar } from '@/components/layouts/global-sidebar'
import { TermsServicesData } from '@/content/terms/terms-content'
import React, { useEffect, useState } from 'react'

const TermsServicesSection = () => {

    const [activeSection, setActiveSection] = useState("introduction");

    useEffect(() => {
        const handleScroll = () => {
            const sections = TermsServicesData.sections.map((section) => section.id);
            const scrollPosition = window.scrollY + 150;

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (
                        scrollPosition >= offsetTop &&
                        scrollPosition < offsetTop + offsetHeight
                    ) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            // Add offset to account for any fixed headers
            const yOffset = -110; // Adjust this value based on your header height
            const y =
                element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };
    return (
    <div className="layout-standard flex items-start gap-8">
      <aside className="hidden w-80 shrink-0 lg:block">
        <GlobalSidebar
          activeSection={activeSection}
          onSectionClick={scrollToSection}
          data={TermsServicesData}
        />
      </aside>
      <div className="min-w-0 flex-1">
        <GlobalAccordian data={TermsServicesData} />
      </div>
    </div>
    )
}

export default TermsServicesSection