"use client";

import React from "react";
import CountUp from "react-countup";

function StatsSection() {
  return (
    <section className="layout-standard flex items-center justify-center max-w-[900px]">
      <div className="grid md:grid-cols-3 gap-6 items-center">
        <div className="flex flex-col gap-2 items-center text-center border-b-2 md:border-b-0 pb-4">
          <div className="md:border-r-2 px-6">
            <h1 className="text-7xl font-bold text-heading">
              <CountUp end={2437} duration={2} suffix="+" />
            </h1>
          </div>
          <p className="text-lg font-medium">Logos & Brand Assets Delivered</p>
        </div>

        <div className="flex flex-col gap-2 items-center text-center border-b-2 md:border-b-0 pb-4">
          <div className="md:border-r-2 px-6">
            <h1 className="text-7xl font-bold text-heading">
              <CountUp end={56} duration={2} suffix="+" />
            </h1>
          </div>
          <p className="text-lg font-medium">Industries Served Globally</p>
        </div>

        <div className="flex flex-col gap-2 items-center text-center border-b-2 md:border-b-0 pb-4">
          <div className="md:border-r-2 px-6">
            <h1 className="text-7xl font-bold text-heading">
              <CountUp end={98} duration={2} suffix="%" />
            </h1>
          </div>
          <p className="text-lg font-medium">Client Satisfaction Rate</p>
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
