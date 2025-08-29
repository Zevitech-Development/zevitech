"use client"

import GlobalAccordian from '@/components/layouts/global-accordian'
import { GlobalSidebar } from '@/components/layouts/global-sidebar'
import { privacyData } from '@/content/privacy/privacy-content-data'
import React, { useEffect, useState } from 'react'

const PrivacyPolicySection = () => {

    const [activeSection, setActiveSection] = useState("introduction");

    useEffect(() => {
        const handleScroll = () => {
            const sections = privacyData.sections.map((section) => section.id);
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
        <div className="layout-standard">
            {/* Desktop Layout with Sidebar */}
            <div className="hidden lg:block">
                <div className="flex gap-8">
                    <div className="w-80 flex-shrink-0">
                        <GlobalSidebar
                            activeSection={activeSection}
                            onSectionClick={scrollToSection}
                            data={privacyData}
                        />
                    </div>
                    <div className="flex-1">
                        <GlobalAccordian data={privacyData} />

                    </div>
                </div>
            </div>

            {/* Mobile Layout without Sidebar */}
            <div className="lg:hidden">
                <GlobalAccordian data={privacyData} />

            </div>
        </div>
    )
}

export default PrivacyPolicySection