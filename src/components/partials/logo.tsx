"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import LogoBlack from "../../../public/favicon/logo-black.png";

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
        alt="Custom Software & App Development Agency | Zevitech"
        priority
        className="group-hover:scale-105 animation-standard"
        width={120}
      />
    </Link>
  );
}

export default Logo;
