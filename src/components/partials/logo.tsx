"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import LogoBlack from "../../../public/favicons/logo-white.png";

function Logo() {
  return (
    <Link
      passHref
      href={"/"}
      target="_blank"
      className="w-fit group cursor-pointer"
    >
      <Image
        src={LogoBlack}
        alt="Zevitech - Custom Software, App Development & Digital Transformation Agency"
        priority
        className="group-hover:scale-105 animation-standard"
        width={120}
      />
    </Link>
  );
}

export default Logo;