import React from "react";
import Image from "next/image";

import WhyChooseUsImg from "../../../public/images/why-choose-us-img.png";
import { FaComputer, FaTruckFast, FaUserTie } from "react-icons/fa6";
import { IoShieldCheckmark } from "react-icons/io5";

function WhyChooseUsSection() {
  return (
    <section className="bg-secondary-background section-padding-standard">
      <div className="layout-standard section-padding-standard">
        {/* HEADER */}
        <div className="flex flex-col gap-4 items-center text-center lg:mb-16 mb-12">
          <h2 className="md:text-lg text-base font-semibold uppercase text-center text-foreground">
            WHY CHOOSE US
          </h2>
          <h1 className="text-heading font-heading md:text-6xl text-4xl font-bold text-center md:max-w-5xl tracking-widest">
            For Your <span className="text-secondary">Shopify</span> Store
            Design
          </h1>
          <p className="md:text-2xl text-base md:max-w-3xl text-center font-medium">
            At Zevitech, we've got a top-notch team of award-winning designers
            with extensive experience and skills ready to handle your Shopify
            project.
          </p>
        </div>

        <div className="w-full grid lg:grid-cols-3 lg:gap-12 gap-16">
          <Image
            src={WhyChooseUsImg}
            alt="Why Us"
            className="lg:col-span-1 mx-auto max-lg:w-[400px] "
            width={700}
          />

          <div className="lg:col-span-2 grid md:grid-cols-2 gap-4">
            <div className="bg-card lg:hover:bg-white rounded-xl border border-border flex flex-col items-center gap-4 justify-center px-8 py-8 cursor-pointer group lg:animation-standard">
              <FaComputer
                size={80}
                className="lg:group-hover:scale-105 lg:animation-standard text-primary"
              />

              <h1 className="lg:text-4xl text-2xl font-heading font-semibold text-heading tracking-widest text-center transition-colors">
                Customized Shopify
              </h1>

              <p className="md:text-base text-sm text-center transition-colors">
                At Shopify Web Designers, we craft captivating, personalized
                designs that not only look stunning but also strengthen your
                brand identity.
              </p>
            </div>

            <div className="bg-card lg:hover:bg-white rounded-xl border border-border flex flex-col items-center gap-4 justify-center px-8 py-8 cursor-pointer group lg:animation-standard">
              <FaTruckFast
                size={80}
                className="lg:group-hover:scale-105 lg:animation-standard text-primary"
              />

              <h1 className="lg:text-4xl text-2xl font-heading font-semibold text-heading text-center transition-colors tracking-widest">
                Fast turnaround
              </h1>

              <p className="md:text-base text-sm text-center transition-colors">
                We prioritize on-time project completion, ensuring your Shopify
                store is delivered and launches within agreed deadlines.
              </p>
            </div>

            <div className="bg-card lg:hover:bg-white rounded-xl border border-border flex flex-col items-center gap-4 justify-center px-8 py-8 cursor-pointer group lg:animation-standard">
              <IoShieldCheckmark
                size={80}
                className="lg:group-hover:scale-105 lg:animation-standard text-primary"
              />

              <h1 className="lg:text-4xl text-2xl font-heading font-semibold text-heading text-center transition-colors tracking-widest">
                Robust security
              </h1>

              <p className="md:text-base text-sm text-center transition-colors">
                Our experts implement strong security measures to protect your
                store and customer data, ensuring peace of mind.
              </p>
            </div>

            <div className="bg-card lg:hover:bg-white rounded-xl border border-border flex flex-col items-center gap-4 justify-center px-8 py-8 cursor-pointer group lg:animation-standard">
              <FaUserTie
                size={80}
                className="lg:group-hover:scale-105 lg:animation-standard text-primary"
              />

              <h1 className="lg:text-4xl text-2xl font-heading font-semibold text-heading text-center transition-colors tracking-widest">
                Project manager
              </h1>

              <p className="md:text-base text-sm text-center transition-colors">
                You&apos;ll have a dedicated project manager as your main
                contact for clear communication, timely updates, and
                accountability throughout the process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUsSection;
