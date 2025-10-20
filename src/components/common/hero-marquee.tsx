"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";

import logoImg01 from "../../../public/images/marquee-logos/marquee-logo-01.png";
import logoImg02 from "../../../public/images/marquee-logos/marquee-logo-02.png";
import logoImg03 from "../../../public/images/marquee-logos/marquee-logo-03.png";
import logoImg06 from "../../../public/images/marquee-logos/marquee-logo-04.png";
import logoImg09 from "../../../public/images/marquee-logos/marquee-logo-05.png";
import logoImg10 from "../../../public/images/marquee-logos/marquee-logo-06.png";

const logos = [
  { id: 1, logoImg: logoImg01 },
  { id: 2, logoImg: logoImg02 },
  { id: 3, logoImg: logoImg03 },
  { id: 6, logoImg: logoImg06 },
  { id: 9, logoImg: logoImg09 },
  { id: 10, logoImg: logoImg10 },
];

type LogoType = { id: number; logoImg: StaticImageData };

function HeroMarquee() {
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
    <div className="w-full overflow-hidden py-6">
      <div className="relative w-full overflow-hidden">
        <div
          className="flex w-max"
          style={{
            animation: "marquee-move 40s linear infinite",
          }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex justify-center items-center mx-8"
            >
              <Image
                src={logo.logoImg}
                alt={`Logo ${logo.id}`}
                className="w-[130px] md:w-[160px] lg:w-[180px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroMarquee;
