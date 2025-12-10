import React from "react";
import Image from "next/image";

import { ResultSectionProps } from "@/interfaces/common-interfaces";

function CommonResultSection({
  subtitle = "Real Client Wins",
  title,
  titleHighlight,
  titleAfterHighlight,
  description,
  results,
}: ResultSectionProps) {
  return (
    <section className="layout-standard section-padding-standard section-margin-standard mt-4">
      <div className="flex flex-col gap-4 items-center text-center lg:mb-16 mb-12">
        {subtitle && (
          <h2 className="text-base font-semibold uppercase text-center text-primary-hover">
            {subtitle}
          </h2>
        )}
        <h1 className="text-heading font-heading md:text-6xl text-4xl font-bold text-center md:max-w-4xl tracking-wide">
          {title}{" "}
          {titleHighlight && (
            <span className="text-primary">{titleHighlight}</span>
          )}{" "}
          {titleAfterHighlight}
        </h1>
        <p className="md:text-xl text-base md:max-w-3xl text-center font-medium">
          {description}
        </p>
      </div>

      <div className="w-full grid lg:grid-cols-3 lg:grid-col-2 gap-8 lg:max-w-[80%] lg:mx-auto">
        {results.map((result) => (
          <a
            key={result.resultNo}
            href="https://www.trustpilot.com/review/zevitech.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Image
              src={result.img}
              alt={`Result No-${result.resultNo}`}
              className="lg:w-[400px] md:w-[500px] w-full mx-auto lg:h-[500px] md:h-[600px] h-[450px] rounded-2xl shadow-lg animate-glow-blue animation-standard hover:scale-105 cursor-pointer"
            />
          </a>
        ))}
      </div>
    </section>
  );
}

export default CommonResultSection;
