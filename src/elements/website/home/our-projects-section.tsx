import React from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import DailogLeadForm from "@/forms/dailog-lead-form";


import { FaArrowRightLong } from "react-icons/fa6";
import { ProjectsCardContent } from "@/content/home-page/home-page-content";

function OurProjectsSection() {
  return (
    <section className="layout-standard flex flex-col gap-12 section-padding-standard py-14 md:py-20">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-heading text-blue-heading max-w-3xl">
          Launched Over <span className="text-primary">200 Projects -</span> For
          All-Sized Businesses
        </h1>
        <p className="text-base lg:text-lg text-paragraph font-inter font-medium max-w-3xl">
          From agile startups to established enterprises, we build tailored
          digital solutions that adapt to your business size, goals, and growth
          stage — ensuring scalable success at every level.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ProjectsCardContent.map((data, index) => (
          <Card
            key={index}
            className={`hover:bg-primary flex flex-col gap-12 transition-all duration-300 shadow-lg group p-6
                ${
                  index == 2
                    ? "md:col-span-2 lg:col-span-1 md:text-center lg:text-start"
                    : ""
                }
                `}
          >
            <div className="flex flex-col gap-1">
              <p className="text-base md:text-lg font-medium text-paragraph group-hover:text-white/90">
                For
              </p>
              <h3 className="text-2xl md:text-3xl font-bold font-inter text-heading group-hover:text-white">
                {data.title}
              </h3>
              <p className="text-sm text-paragraph group-hover:text-white/90 font-medium mt-2">
                {data.description}
              </p>
            </div>

            <div>
              {data.services.map((service, index) => (
                <div key={index} className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 md:w-10 flex-center rounded-full bg-slate-300/70 group-hover:bg-primary-hover">
                    <service.icon className="w-5 h-5 text-primary group-hover:text-white" />
                  </div>

                  <p className="text-sm text-paragraph group-hover:text-white">
                    {service.text}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
      <div className="flex-center">
        <DailogLeadForm
          trigger={
            <Button className="cta-button h-[60px] md:px-6 group lg:hover:scale-105 rounded-full lg:hover:bg-primary-hover md:text-xl text-base lg:!animation-standard font-bold">
              Let&apos;s Get Started
              <FaArrowRightLong className="group-hover:translate-x-[2px] animation-standard" />
            </Button>
          }
        />
      </div>
    </section>
  );
}

export default OurProjectsSection;