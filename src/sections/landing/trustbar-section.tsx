import { TrustbarSectionContent } from "@/contents/landing-page-content";
import Image from "next/image";
import React from "react";

function TrustbarSection() {
  return (
    <section className="layout-standard section-margin-standard mt-8 flex items-center gap-6 border-b border-border pb-8 justify-center max-lg:flex-wrap">
      {TrustbarSectionContent.map((client, index) => (
        <Image
          key={index}
          src={client.img}
          alt={`client - 0${client.clientNo}`}
          className="animation-standard hover:scale-105 cursor-pointer"
        />
      ))}
    </section>
  );
}

export default TrustbarSection;
