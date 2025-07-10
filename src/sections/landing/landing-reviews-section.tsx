"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import {
  ReviewsSectionContent01,
  ReviewsSectionContent02,
  ReviewsSectionContent03,
} from "@/contents/landing-page-content";

import ReviewsCard from "@/components/partials/reviews-card";

function LandingReviewsSection() {
  return (
    <section className="layout-standard section-padding-standard md:mb-12 md:mt-[18rem] mt-[13rem]">
      <div className="flex flex-col gap-4 items-center text-center lg:mb-16 md:mb-12 mb-8">
        <h2 className="md:text-lg text-base font-semibold uppercase text-center text-foreground">
          What Clients Say
        </h2>
        <h1 className="text-heading font-heading md:text-6xl text-4xl font-bold text-center lg:max-w-5xl tracking-widest">
          Trusted By <span className="text-secondary">Real Businesses</span>{" "}
          Worldwide
        </h1>
        <p className="md:text-2xl text-base lg:max-w-3xl text-center font-medium text-paragraph">
          Hear directly from the entrepreneurs and store owners who scaled
          faster, sold more, and built better experiences — with us behind the
          scenes.
        </p>
      </div>

      <div className="w-full flex flex-col md:gap-8 gap-4">
        <div className="w-full">
          <Swiper
            modules={[Autoplay]}
            direction="horizontal"
            spaceBetween={15}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              reverseDirection: false,
            }}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1440: { slidesPerView: 3 },
            }}
          >
            {ReviewsSectionContent01.map((rew, index) => (
              <SwiperSlide key={index}>
                <div className="h-full px-2">
                  <ReviewsCard
                    ProfilePicture={rew.ProfilePicture}
                    ClientName={rew.ClientName}
                    ReviewDate={rew.ReviewDate}
                    ReviewsQuote={rew.ReviewsQuote}
                    className="lg:h-[240px] md:h-[280px] h-[250px]"
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
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              reverseDirection: true,
            }}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              1440: { slidesPerView: 3 },
            }}
          >
            {ReviewsSectionContent02.map((rew, index) => (
              <SwiperSlide key={index}>
                <div className="h-full px-2">
                  <ReviewsCard
                    ProfilePicture={rew.ProfilePicture}
                    ClientName={rew.ClientName}
                    ReviewDate={rew.ReviewDate}
                    ReviewsQuote={rew.ReviewsQuote}
                    className="lg:h-[240px] md:h-[180px] h-[250px]"
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
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              reverseDirection: false,
            }}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1440: { slidesPerView: 3 },
            }}
          >
            {ReviewsSectionContent03.map((rew, index) => (
              <SwiperSlide key={index}>
                <div className="h-full px-2">
                  <ReviewsCard
                    ProfilePicture={rew.ProfilePicture}
                    ClientName={rew.ClientName}
                    ReviewDate={rew.ReviewDate}
                    ReviewsQuote={rew.ReviewsQuote}
                    className="lg:h-[240px] md:h-[280px] h-[250px]"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default LandingReviewsSection;
