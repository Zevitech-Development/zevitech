"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";

import logoImg01 from "../../../../public/images/services/branding/2d-logo-portfolio-13.jpg";
import logoImg02 from "../../../../public/images/services/branding/2d-logo-portfolio-45.png";
import logoImg03 from "../../../../public/images/services/branding/2d-logo-portfolio-15.jpg";
import logoImg06 from "../../../../public/images/services/branding/why-choose-us-wordmark-04.webp";
import logoImg09 from "../../../../public/images/services/branding/2d-logo-portfolio-04.webp";
import logoImg10 from "../../../../public/images/services/branding/2d-logo-portfolio-41.png";

const logos = [
  { id: 1, logoImg: logoImg01 },
  { id: 2, logoImg: logoImg02 },
  { id: 3, logoImg: logoImg03 },
  { id: 6, logoImg: logoImg06 },
  { id: 9, logoImg: logoImg09 },
  { id: 10, logoImg: logoImg10 },
];

type LogoType = { id: number; logoImg: StaticImageData };

function LogoMarquee() {
  React.useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @keyframes marquee-move {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="w-full bg-gradient-to-br from-white to-neutral-300 overflow-hidden py-6 md:py-10">
      <div className="layout-standard flex flex-col gap-5 overflow-hidden">
        <div
          className="flex w-max"
          style={{
            animation: "marquee-move 35s linear infinite",
          }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex flex-col gap-3 justify-center items-center mx-8"
            >
              <div className="w-[130px] md:w-[160px] lg:w-[180px] rounded-xl overflow-hidden">
                <Image
                  src={logo.logoImg}
                  alt={`Logo ${logo.id}`}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LogoMarquee;
