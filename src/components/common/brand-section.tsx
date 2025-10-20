import React from "react";

import { Star } from "lucide-react";
import { HomePageBrandSectionProps } from "@/interfaces/home-interfaces";
import Image from "next/image";

const BrandSection = ({
  heading,
  ratingText,
  logos,
}: HomePageBrandSectionProps) => {
  const starRating = [1, 2, 3, 4, 5];
  return (
    <>
      <section className="layout-standard flex flex-col gap-12 section-padding-standard">
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-blue-heading tracking-wider">
            {heading}
          </h2>
          <div className="flex items-center justify-center gap-2">
            {starRating.map((_, index) => (
              <Star
                key={index}
                className="w-5 h-5 fill-yellow-500 text-yellow-500"
              />
            ))}
            <span className="text-paragraph ml-2">{ratingText}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-12 items-center justify-items-center">
          {logos.map((logo, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <Image
                src={logo.brandImg}
                alt={logo.alt}
                className="w-80 object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default BrandSection;
