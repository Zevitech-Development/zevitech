import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import MoneyBackIcon from "../../../../public/icons/money-back-icon.webp";
import DailogLeadForm from "@/components/forms/dailog-lead-form";

function LandingCTASection() {
  return (
    <section className="layout-standard h-full section-padding-standard flex-center absolute left-0 md:-top-[50px] top-[-30px] inset-0">
      <div className="w-full lg:h-[500px] md:h-[400px] h-[350px] bg-pattern rounded-3xl border border-border flex flex-col items-center justify-center md:px-8 px-4">
        <Image
          src={MoneyBackIcon}
          alt="Money-back"
          className="absolute lg:-translate-y-[16rem] md:-translate-y-[12rem] -translate-y-[10.5rem] lg:w-[200px] md:w-[160px] w-[130px] lg:h-[200px] md:h-[160px] h-[130px]"
        />

        <div className="w-full flex flex-col h-full justify-center md:gap-8 gap-4 items-center text-center mt-16">
          <h1 className="lg:text-6xl md:text-4xl text-2xl font-bold text-white font-heading tracking-widest">
            Money Back Guarantee!
          </h1>
          <p className="lg:text-2xl md:text-base text-sm font-medium text-white/80 lg:max-w-[75%] mx-auto">
            We guarantee complete satisfaction with our Shopify store
            development services. If we are unable to create a winning store for
            you within the given time frame, let us know within 15 days and
            we&apos;ll issue a full refund
          </p>

          <DailogLeadForm
            trigger={
              <Button className="lg:mt-4 mt-2 md:h-[60px] h-[50px] rounded-full md:text-lg text-sm font-bold hover:bg-primary-hover md:px-8 px-4 cta-button">
                I AM READY, LET&apos;S GET STARTED
              </Button>
            }
          />
        </div>
      </div>
    </section>
  );
}

export default LandingCTASection;
