"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import ExtraHeader from "@/components/layouts/extra-header";
import { Button } from "@/components/ui/button";

import Error404Img from "../../../public/images/error-404-img.svg";
import { FaArrowLeftLong } from "react-icons/fa6";

function Error404Page() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <ExtraHeader />
      <main className="md:h-[calc(100svh-90px)] flex items-center layout-standard">
        <section className="w-full text-center flex flex-col items-center section-padding-standard">
          <Image src={Error404Img} alt="Error 404" width={400} priority />
          <div className="flex flex-col gap-4">
            <h1 className="font-extrabold md:text-[120px] text-[90px] leading-none text-foreground font-heading tracking-widest">
              404
            </h1>

            <p className="md:text-3xl text-lg font-semibold text-heading">
              Oops! You&apos;ve Reached a Blank Canvas
            </p>

            <p className="md:text-lg text-sm text-paragraph font-normal lg:max-w-5xl lg:mx-auto">
              The page you&apos;re looking for doesn&apos;t seem to exist. It may
              have been moved, renamed, or never existed. Use the menu to find
              what you need, or head back to the homepage and let&apos;s design
              something great together.
            </p>

            <div className="flex items-center gap-4 justify-center md:flex-row flex-col mt-4 max-md:w-full">
              <Button
                onClick={() => handleNavigate("/")}
                className="cta-button-02 hover:bg-primary-hover max-md:w-full"
              >
                <FaArrowLeftLong /> Back to Homepage
              </Button>
              <Button
                onClick={() => handleNavigate("/contact-us")}
                className="cta-button-02 bg-transparent hover:bg-primary !border-primary text-heading hover:text-primary-foreground max-md:w-full"
              >
                {" "}
                Contact Support
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Error404Page;
