'use client'

import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

import Image, { StaticImageData } from 'next/image';

import HomePageLogo1 from "../../../../public/images/home logos/home-page-logo-01.webp"
import HomePageLogo2 from "../../../../public/images/home logos/home-page-logo-2.webp"
import HomePageLogo3 from "../../../../public/images/home logos/home-page-logo-03.webp"
import HomePageLogo4 from "../../../../public/images/home logos/home-page-logo-4.webp"
import HomePageLogo5 from "../../../../public/images/home logos/home-page-logo-05.webp"
import HomePageLogo6 from "../../../../public/images/home logos/home-page-logo-06.webp"
import HomePageLogo7 from "../../../../public/images/home logos/home-page-logo-07.webp"
import HomePageLogo8 from "../../../../public/images/home logos/home-page-logo-08.webp"
import HomePageLogo9 from "../../../../public/images/home logos/home-page-logo-09.webp"
import HomePageLogo10 from "../../../../public/images/home logos/home-page-logo-10.webp"
import HomePageLogo11 from "../../../../public/images/home logos/home-page-logo-11.webp"
import HomePageLogo12 from "../../../../public/images/home logos/home-page-logo-12.webp"



const brandLogos = [
    { id: 1, src: HomePageLogo1, alt: "Brand Logo 1" },
    { id: 2, src: HomePageLogo2, alt: "Brand Logo 2" },
    { id: 3, src: HomePageLogo3, alt: "Brand Logo 3" },
    { id: 4, src: HomePageLogo4, alt: "Brand Logo 4" },
    { id: 5, src: HomePageLogo5, alt: "Brand Logo 5" },
    { id: 6, src: HomePageLogo6, alt: "Brand Logo 6" },
];

const brandLogo2 = [
    { id: 7, src: HomePageLogo7, alt: "Tech Logo 7" },
    { id: 8, src: HomePageLogo8, alt: "Tech Logo 8" },
    { id: 9, src: HomePageLogo9, alt: "Tech Logo 9" },
    { id: 10, src: HomePageLogo10, alt: "Tech Logo 10" },
    { id: 11, src: HomePageLogo11, alt: "Tech Logo 11" },
    { id: 12, src: HomePageLogo12, alt: "Tech Logo 12" },
];

declare global {
    interface Window {
        [key: `swiper${number}`]: SwiperType;
    }
}

interface Logo {
    id: number;
    src: StaticImageData;
    alt: string;
}

interface MarqueeProps {
    logos: Logo[];
    direction?: 'left' | 'right';
    speed?: number;
    rowIndex?: number;
}

function LogoMarquee() {

    React.useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrolled = window.scrollY;

                    // Control each swiper individually
                    [0, 1, 2].forEach((index) => {
                        const swiper = window[`swiper${index}`];
                        if (swiper) {
                            const direction = index % 2 === 0 ? 1 : -1;
                            const speed = index === 1 ? 0.1 : 0.2; // Middle row slower
                            const progress = (scrolled * speed * direction) % (swiper.slides.length * 40);

                            // Use Swiper's setTranslate method for smooth movement
                            swiper.setTranslate(-progress);
                        }
                    });

                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const Marquee = ({ logos,  rowIndex = 0 }: MarqueeProps) => {
        const swiperRef = React.useRef(null);
        return (
            <div className='overflow-hidden'>
                <Swiper
                    ref={swiperRef}
                    modules={[FreeMode]}
                    spaceBetween={30}
                    slidesPerView="auto"
                    freeMode={{
                        enabled: true,
                        momentum: false,
                    }}
                    loop={true}
                    slidesPerGroup={logos.length}
                    allowTouchMove={false}
                    autoplay={false}
                    centeredSlides={false}
                    className="!overflow-visible"
                    onSwiper={(swiper) => {
                        // Store swiper instance for manual control
                        window[`swiper${rowIndex}`] = swiper;
                    }}
                >
                    {/* Duplicate logo sets for seamless loop */}
                    {[...Array(8)].map((_, setIndex) =>
                        logos.map((logo, index) => (
                            <SwiperSlide key={`${setIndex}-${index}`} className="!w-40">
                                <div className="flex justify-center items-center text-white/70 hover:text-white transition-all duration-300 w-24 h-24">
                                    <div className="w-44 h-44 flex items-center justify-center">
                                        <Image
                                            src={logo.src}
                                            alt={logo.alt}
                                            width={176}
                                            height={176}
                                            className="object-contain filter brightness-75 hover:brightness-100 transition-all duration-300"
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    )}
                </Swiper>
            </div>
        );
    };

    return (
        <div className="w-full pt-20">
            <div className="space-y-8 w-full opacity-60">
                <Marquee logos={brandLogos} direction="left" rowIndex={0} />
                <div className='py-10'>
                    <Marquee logos={brandLogo2} direction="left" rowIndex={1} />
                </div>
                <Marquee logos={[...brandLogos, ...brandLogo2]} direction="left" rowIndex={2} />
            </div>
        </div>
    );
}

export default LogoMarquee;   