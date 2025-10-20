"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";

import logoImg01 from "../../../public/images/marquee-logos/marquee-logo-01.png";
import logoImg02 from "../../../public/images/marquee-logos/marquee-logo-02.png";
import logoImg03 from "../../../public/images/marquee-logos/marquee-logo-03.png";
import logoImg04 from "../../../public/images/marquee-logos/marquee-logo-04.png";
import logoImg05 from "../../../public/images/marquee-logos/marquee-logo-05.png";
import logoImg06 from "../../../public/images/marquee-logos/marquee-logo-06.png";
import logoImg07 from "../../../public/images/marquee-logos/marquee-logo-07.png";
import logoImg08 from "../../../public/images/marquee-logos/marquee-logo-08.png";
import logoImg09 from "../../../public/images/marquee-logos/marquee-logo-09.png";
import logoImg10 from "../../../public/images/marquee-logos/marquee-logo-10.png";
import logoImg11 from "../../../public/images/marquee-logos/marquee-logo-11.png";

export const logos01 = [
  { id: 1, logoImg: logoImg01 },
  { id: 2, logoImg: logoImg02 },
  { id: 3, logoImg: logoImg03 },
  { id: 4, logoImg: logoImg04 },
  { id: 5, logoImg: logoImg05 },
  { id: 6, logoImg: logoImg06 },
];

export const logos02 = [
  { id: 7, logoImg: logoImg07 },
  { id: 8, logoImg: logoImg08 },
  { id: 9, logoImg: logoImg09 },
  { id: 10, logoImg: logoImg10 },
  { id: 11, logoImg: logoImg11 },
];

type LogoType = { id: number; logoImg: StaticImageData };

function MarqueSection() {
  React.useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @keyframes marquee-scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const Marquee = ({
    logos,
    direction = "normal",
  }: {
    logos: LogoType[];
    direction?: "normal" | "reverse";
  }) => {
    // Create multiple duplicates for truly seamless scrolling
    const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

    return (
      <div className="relative w-full overflow-hidden">
        <div
          className="flex"
          style={{
            animation: `marquee-scroll 50s linear infinite`,
            animationDirection: direction,
            width: "fit-content",
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="flex-shrink-0 flex justify-center items-center mx-8"
              style={{ minWidth: "170px" }}
            >
              <Image
                src={logo.logoImg}
                alt={`Logo ${logo.id}`}
                className="w-[130px] md:w-[160px] lg:w-[170px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-gradient-to-b from-white via-gray-50 to-gray-100 overflow-hidden py-6">
      <div className="flex flex-col gap-y-16">
        <Marquee logos={logos01} />
        <Marquee logos={logos02} direction="reverse" />
      </div>
    </div>
  );
}

export default MarqueSection;
