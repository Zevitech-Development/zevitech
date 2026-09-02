"use client";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import {
  ReviewsSectionContent01,
  ReviewsSectionContent02,
  ReviewsSectionContent03,
} from "@/content/landing/shopify-landing-page-content";

import ReviewsCard from "@/components/partials/reviews-card";

import { ReviewCardInterface } from "@/interfaces/components-partials-interface";

import "swiper/css";

type LandingReviewsSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  autoPlay?: boolean;
  /** Optional overrides — default to the shared Shopify reviews when omitted */
  row01?: ReviewCardInterface[];
  row02?: ReviewCardInterface[];
  row03?: ReviewCardInterface[];
};

function LandingReviewsSection({
  eyebrow = "What Clients Say",
  title = "Our Trusted Customers",
  description = "Hear directly from the entrepreneurs and store owners who scaled faster, sold more, and built better experiences — with us behind the scenes.",
  autoPlay = true,
  row01 = ReviewsSectionContent01,
  row02 = ReviewsSectionContent02,
  row03 = ReviewsSectionContent03,
}: LandingReviewsSectionProps) {
  return (
    <section className=" section-padding-standard ">
      <div className="layout-standard md:mb-12">
        <div className="flex flex-col gap-4 items-center text-center lg:mb-16 md:mb-12 mb-8">
          <h2 className="md:text-lg text-base font-semibold uppercase text-center text-primary">
            {eyebrow}
          </h2>
          <h2 className="text-heading font-heading md:text-6xl text-4xl font-bold text-center lg:max-w-5xl tracking-widest">
            {title}
          </h2>
          <p className="md:text-2xl text-base lg:max-w-3xl text-center font-medium text-paragraph">
            {description}
          </p>
        </div>

        <div className="w-full flex flex-col md:gap-8 gap-4">
          <div className="w-full">
            <Swiper
              modules={[Autoplay]}
              direction="horizontal"
              spaceBetween={15}
              loop={autoPlay}
              autoplay={
                autoPlay
                  ? {
                      delay: 4000,
                      disableOnInteraction: false,
                      reverseDirection: false,
                    }
                  : false
              }
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1440: { slidesPerView: 3 },
              }}
            >
              {row01.map((rew, index) => (
                <SwiperSlide key={index}>
                  <div className="h-full px-2">
                    <ReviewsCard
                      ProfilePicture={rew.ProfilePicture}
                      ClientName={rew.ClientName}
                      ReviewDate={rew.ReviewDate}
                      ReviewsQuote={rew.ReviewsQuote}
                      className="lg:h-[300px] bg-[#b8ceb9] h-[300px] text-xs md:text-sm"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="w-full">
            <Swiper
              modules={[Autoplay]}
              direction="horizontal"
              spaceBetween={15}
              loop={autoPlay}
              autoplay={
                autoPlay
                  ? {
                      delay: 4000,
                      disableOnInteraction: false,
                      reverseDirection: true,
                    }
                  : false
              }
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1 },
                1440: { slidesPerView: 3 },
              }}
            >
              {row02.map((rew, index) => (
                <SwiperSlide key={index}>
                  <div className="h-full px-2">
                    <ReviewsCard
                      ProfilePicture={rew.ProfilePicture}
                      ClientName={rew.ClientName}
                      ReviewDate={rew.ReviewDate}
                      ReviewsQuote={rew.ReviewsQuote}
                      className="lg:h-[240px] bg-[#92aa94] md:h-[180px] h-[250px] text-xs md:text-base"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="w-full">
            <Swiper
              modules={[Autoplay]}
              direction="horizontal"
              spaceBetween={15}
              loop={autoPlay}
              autoplay={
                autoPlay
                  ? {
                      delay: 4000,
                      disableOnInteraction: false,
                      reverseDirection: false,
                    }
                  : false
              }
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1440: { slidesPerView: 3 },
              }}
            >
              {row03.map((rew, index) => (
                <SwiperSlide key={index}>
                  <div className="h-full px-2">
                    <ReviewsCard
                      ProfilePicture={rew.ProfilePicture}
                      ClientName={rew.ClientName}
                      ReviewDate={rew.ReviewDate}
                      ReviewsQuote={rew.ReviewsQuote}
                      className="bg-[#b8ceb9] lg:h-[240px] md:h-[280px] h-[250px] text-xs md:text-sm"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingReviewsSection;
