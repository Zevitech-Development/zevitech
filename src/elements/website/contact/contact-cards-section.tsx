import React from "react";


import { Button } from "@/components/ui/button";

import { FaArrowRightLong } from "react-icons/fa6";
import { contactCardsData } from "@/content/contact/contact-us-content";

function ContactUsCardsSection() {
  return (
    <main className="section-padding-standard py-12">
      <div className="layout-standard flex flex-col gap-14">
        <div className="text-center flex flex-col items-center gap-3">
          <h1 className="text-4xl md:text-6xl font-bold font-heading text-blue-heading mb-2">
            <span className="text-primary">Let&apos;s</span> Connect Together
          </h1>
          <p className="text-xl md:text-2xl max-w-[800px] text-paragraph">
            We&apos;re here to answer your questions, explore opportunities, and
            help bring your vision to life. Drop us a message — we&apos;ll get
            back to you shortly.
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-3 justify-items-center gap-12">
          {contactCardsData.map((data, index) => (
            <div
              key={index}
              className='relative lg:h-[290px] border p-6 flex flex-col justify-between gap-4 rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.15)] bg-white hover:bg-white/80 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer"               '
            >
              <div className="flex justify-center">
                <div className="absolute -top-7 lg:w-[70px] w-[60px] lg:h-[70px] h-[60px] flex-center rounded-full bg-muted">
                  <span className="lg:text-3xl text-xl text-primary">
                    <data.icon className="w-6 h-6 lg:w-7 lg:h-7" />
                  </span>
                </div>
              </div>

              <div className="flex items-center flex-col gap-3 text-center ">
                <h3 className="md:text-xl lg:text-2xl font-bold text-heading font-inter mt-2">
                  {data.title}
                </h3>
                <p className="lg:text-lg md:text-base text-sm font-medium">
                  {data.description}
                </p>
              </div>
              <div className="flex-center">
                <Button className="h-[50px] bg-primary hover:bg-primary-hover md:px-8 px-4 py-4 rounded-full font-bold md:text-base text-sm !animation-standard flex items-center gap-2 group md:hover:scale-105 cta-button">
                  {data.cardButton}
                  <FaArrowRightLong className="md:w-5 md:h-5 w-3 h-3 md:group-hover:translate-x-[3px] md:animation-standard" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default ContactUsCardsSection;