import { ResultSectionContent } from "@/content/landing/shopify-landing-page-content";
import Image from "next/image";
import React from "react";

function ResultSection() {
  return (
    <section className="layout-standard section-padding-standard section-margin-standard mt-4">
      <div className="flex flex-col gap-4 items-center text-center lg:mb-16 mb-12">
        <h2 className="md:text-lg text-base font-semibold uppercase text-center text-foreground">
          Real Client Wins
        </h2>
        <h1 className="text-heading font-heading md:text-6xl text-4xl font-bold text-center md:max-w-4xl tracking-widest">
          Results That <span className="text-secondary">Speak</span> For
          Themselves!
        </h1>
        <p className="md:text-2xl text-base md:max-w-3xl text-center font-medium">
          We don&apos;t just talk results — we deliver them. Here&apos;s a
          glimpse of real success stories, performance metrics, and feedback
          directly from our Shopify clients.
        </p>
      </div>

      <div className="w-full grid lg:grid-cols-3 lg:grid-col-2 gap-8 lg:max-w-[80%] lg:mx-auto">
        {ResultSectionContent.map((result) => (
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

export default ResultSection;
