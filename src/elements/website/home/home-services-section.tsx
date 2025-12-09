import { Card } from "@/components/ui/card";

import { services as defaultServices, techStack as defaultTech } from "@/content/homepage/home-page-content";

import { Sparkles } from "lucide-react";
import Link from "next/link";
import React from "react";

type IconType = React.ComponentType<{ className?: string }>;

type ServiceItem = {
  icon?: IconType;
  title: string;
  description: string;
  ctaHref?: string;
  ctaText?: string;
};

type TechItem = {
  icon: IconType;
  label: string;
  link: string;
};

type HomeServicesSectionProps = {
  showButtons?: boolean;
  services?: ServiceItem[];
  techStack?: TechItem[];
};

function HomeServicesSection({ showButtons = true, services, techStack }: HomeServicesSectionProps) {
  const servicesList = (services ?? defaultServices) as ServiceItem[];
  const techList = (techStack ?? defaultTech) as TechItem[];
  return (
    <section className="bg-gradient-to-t from-[#262626] to-[#121212] section-padding-standard py-14 md:py-20">
      <div className="layout-standard space-y-8 md:space-y-12">
        <div className="relative py-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white leading-tight max-w-5xl">
            Empowering Brands with Innovative Services
          </h1>
          <span className="absolute top-0 md:top-8 md:-left-9 text-primary">
            <Sparkles className="w-8 h-8" />
          </span>
        </div>
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((service, index) => (
            <Card
              key={index}
              className="p-7 bg-white hover:bg-primary-hover group transition-all duration-300 cursor-pointer border-none"
            >
              <div className="text-center flex flex-col items-center gap-5">
                {service.icon && (
                  <div className="w-12 h-12 text-primary group-hover:text-white transition-colors">
                    <service.icon className="w-full h-full" />
                  </div>
                )}
                <h3 className="font-semibold text-heading text-lg md:text-xl group-hover:text-white transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm md:text-base font-medium text-paragraph group-hover:text-white/90 transition-colors">
                  {service.description}
                </p>
                {(service.ctaHref || service.ctaText) && (
                  <div className="w-full border-t border-gray-200 mt-4 pt-4">
                    <Link
                      href={service.ctaHref ?? "/contact-us"}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-white"
                    >
                      {service.ctaText ?? "Enquire Now"} <span>→</span>
                    </Link>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {showButtons && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {techList.map((tech, index) => (
              <Link href={tech.link} key={index}>
                <div className="h-[80px] sm:h-auto bg-primary border-white/20 text-white hover:text-black rounded-lg hover:bg-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col lg:flex-row items-center justify-center gap-3 p-1 lg:p-4">
                  <tech.icon className="w-6 h-6 *:" />
                  <span className="text-sm font-medium text-center">
                    {tech.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default HomeServicesSection;
