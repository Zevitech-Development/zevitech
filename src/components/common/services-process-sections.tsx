import { ServicesProcessSection01Props } from "@/interfaces/common-interfaces";
import React from "react";


import { IoSparklesOutline } from "react-icons/io5";

export function ServicesProcessSection01({
  title,
  description,

  process01Icon,
  process01Title,
  process01Desc,

  process02Icon,
  process02Title,
  process02Desc,

  process03Icon,
  process03Title,
  process03Desc,
}: ServicesProcessSection01Props) {
  return (
    <section className="bg-secondary-background section-padding-standard">
      <div className="layout-standard section-padding-standard flex flex-col gap-12">
        <div className="flex flex-col gap-4 items-center text-center">
          <span className="flex items-center gap-2 font-semibold text-primary bg-[#007afc]/10 w-fit px-4 py-2 rounded-full border-primary border-2 text-xs">
            <IoSparklesOutline /> Simple. Strategic. Seamless.
          </span>
          <h1 className="md:text-6xl font-medium text-heading font-heading text-3xl tracking-wider md:max-w-4xl">
            {title}
          </h1>

          <p className="md:text-lg text-base md:max-w-3xl text-center font-medium">
            {description}
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-16 sm:gap-8 mt-8">
          <div className="text-center">
            <div className="relative w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mx-auto left-2">
              <div className="z-10 relative w-full h-full bg-white rounded-full border border-gray-300 shadow flex items-center justify-center">
                {process01Icon}
              </div>

              <div className="absolute inset-0 -translate-x-2 -translate-y-2 bg-primary rounded-full" />
            </div>
            <h3 className="font-bold text-heading text-xl sm:text-2xl mt-6 sm:mt-10">
              1. {process01Title}
            </h3>
            <p className="leading-relaxed text-base font-medium mt-4">
              {process01Desc}
            </p>
          </div>

          <div className="text-center">
            <div className="relative w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mx-auto left-2">
              <div className="z-10 relative w-full h-full bg-white rounded-full border border-gray-300 shadow flex items-center justify-center">
                {process02Icon}
              </div>

              <div className="absolute inset-0 -translate-x-2 -translate-y-2 bg-primary rounded-full" />
            </div>
            <h3 className="font-bold text-heading text-xl sm:text-2xl mt-6 sm:mt-10">
              2. {process02Title}
            </h3>
            <p className="leading-relaxed text-base font-medium mt-4">
              {process02Desc}
            </p>
          </div>

          <div className="text-center">
            <div className="relative w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mx-auto left-2">
              <div className="z-10 relative w-full h-full bg-white rounded-full border border-gray-300 shadow flex items-center justify-center">
                {process03Icon}
              </div>

              <div className="absolute inset-0 -translate-x-2 -translate-y-2 bg-primary rounded-full" />
            </div>
            <h3 className="font-bold text-heading text-xl sm:text-2xl mt-6 sm:mt-10">
              3. {process03Title}
            </h3>
            <p className="leading-relaxed text-base font-medium mt-4">
              {process03Desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
