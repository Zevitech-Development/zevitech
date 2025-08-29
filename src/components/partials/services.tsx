
import { ComponentType, SVGProps } from "react";
import { StaticImageData } from "next/image";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { ServicesCardData } from "@/content/home-page/home-page-content";

import DailogLeadForm from "@/forms/dailog-lead-form";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ArrowDownRight,
} from "lucide-react";
import { FaArrowRightLong } from "react-icons/fa6";

export interface ServiceCardType {
  image: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  href: string;
  backgroundImage?: string | StaticImageData;
}

const Services = () => {
  return (
    <>
      <section className="layout-standard flex flex-col gap-12 section-padding-standard py-14 md:py-20">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-heading text-blue-heading tracking-wider">
            Core <span className="text-primary">Services</span> We Provide
          </h1>
          <p className="text-base md:text-lg text-paragraph max-w-lg font-medium">
            Our core services are designed to bring your ideas to life with
            innovation and impact.
          </p>
        </div>

        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {ServicesCardData.map((data, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="relative p-6 h-[480px] flex flex-col items-start gap-6 transition-all duration-500 ease-in-out group overflow-hidden cursor-pointer bg-gray-100 hover:shadow-xl rounded-2xl">
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out after:absolute after:inset-0 after:bg-white/80"
                      style={{
                        backgroundImage: `url(${
                          typeof data.backgroundImage === "string"
                            ? data.backgroundImage
                            : data.backgroundImage?.src ||
                              "/placeholder.svg?height=480&width=400"
                        })`,
                      }}
                    />

                    {/* Content Container */}
                    <div className="relative z-10 flex flex-col items-start gap-6 h-full">
                      {/* Icon - Fades out on hover */}
                      <div className="opacity-100 group-hover:opacity-0 transition-opacity duration-300 ease-in-out">
                        <data.image className="text-primary w-12 h-12 lg:w-16 lg:h-16" />
                      </div>

                      {/* Title - Changes color on hover */}
                      <h3 className="text-xl lg:text-3xl font-semibold font-inter text-heading transition-colors duration-300 ease-in-out">
                        {data.title}
                      </h3>

                      {/* Description - Changes color on hover */}
                      <p className="text-paragraph text-sm lg:text-xl transition-colors duration-300 ease-in-out font-sans">
                        {data.description}
                      </p>
                    </div>

                    <div className="absolute bottom-[0.9rem] right-[1.5rem] opacity-1 group-hover:opacity-100 transition-all duration-300 ease-in-out transform group-hover:translate-x-1 group-hover:translate-y-1">
                      <div className="rounded-full p-2">
                        <ArrowRight className="w-10 h-10 text-black block group-hover:hidden transition-all duration-300" />
                        <ArrowDownRight className="w-10 h-10 text-primary hidden group-hover:block transition-all duration-300" />
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Custom Navigation Arrows */}
            <div className="hidden lg:block">
              <CarouselPrevious className="absolute left-[-4rem] top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white shadow-lg border-none hover:bg-primary hover:text-white transition-all duration-300 ease-in-out z-10">
                <ChevronLeft className="h-6 w-6" />
              </CarouselPrevious>

              <CarouselNext className="absolute right-[-4rem] top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white shadow-lg border-none hover:bg-primary hover:text-white transition-all duration-300 ease-in-out z-10">
                <ChevronRight className="h-6 w-6" />
              </CarouselNext>
            </div>
          </Carousel>
        </div>

        <div className="flex-center">
          <DailogLeadForm
            trigger={
              <Button className="cta-button h-[60px] md:px-6 group lg:hover:scale-105 rounded-full lg:hover:bg-primary-hover md:text-xl text-base lg:!animation-standard font-bold">
                Let&apos;s Get Started
                <FaArrowRightLong className="group-hover:translate-x-[2px] animation-standard" />
              </Button>
            }
          />
        </div>
      </section>
    </>
  );
};

export default Services;
