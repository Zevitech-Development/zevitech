"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import { FaArrowRightLong } from "react-icons/fa6";
import { carouselSlidesData } from "@/content/home-page/home-page-content";

function CarouselSection() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="layout-standard flex flex-col gap-12 section-padding-standard py-14 md:py-20">
      <h1 className="text-4xl md:text-6xl font-bold font-heading text-blue-heading">
        <span className="text-primary">Next-Gen </span>Solutions Through
        Artificial Intelligence
      </h1>

      <div className="relative rounded-xl overflow-hidden shadow-lg">
        <Carousel
          setApi={setApi}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
        >
          <CarouselContent>
            {carouselSlidesData.map((slide) => (
              <CarouselItem
                key={slide.id}
                className="relative h-[450px] md:h-[500px] xl:h-[600px]"
              >
                <Image
                  src={slide.backgroundImageQuery}
                  alt={`Background image for ${slide.title}`}
                  fill
                  className="object-cover"
                  priority={slide.id === 1}
                />
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-center gap-4 text-left">
                  <h3 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold">
                    {slide.title}{" "}
                    <span className="text-primary">{slide.highlight}</span>
                  </h3>
                  <p className="text-white text-base md:text-lg max-w-md">
                    {slide.description}
                  </p>
                  <Button className="cta-button w-[200px] md:w-[250px] h-[55px] md:h-[60px] p-5 group lg:hover:scale-105 rounded-full lg:hover:bg-primary-hover md:text-xl text-base lg:!animation-standard font-bold">
                    Let&apos;s Get Started
                    <FaArrowRightLong className="group-hover:translate-x-[2px] animation-standard" />
                  </Button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {carouselSlidesData.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                current === index + 1 ? "bg-primary" : "bg-white opacity-50"
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CarouselSection;
