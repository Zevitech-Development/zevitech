"use client";
import { useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import DailogLeadForm from "@/forms/dailog-lead-form";
import { Button } from "@/components/ui/button";
import { FaArrowRightLong } from "react-icons/fa6";


import CardImg01 from "../../../../public/images/card-image-01.webp";
import CardImg02 from "../../../../public/images/card-image-01.webp";
// import CardImg03 from "../../../../public/images/card-image-01.webp";
import { cn } from "@/lib/utils";
import Image from "next/image";


gsap.registerPlugin(ScrollTrigger);


export default function Results() {

  useEffect(() => {
    // Use gsap.context for scoping + cleanup in React
    const ctx = gsap.context(() => {
      // use matchMedia to run only on md and larger and auto-clean on smaller
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".model-card");

        // If there are no cards, do nothing
        if (!cards || cards.length === 0) return;

        const tween = gsap.to(cards, {
          yPercent: -100 * (cards.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: ".slider-wrapper",
            start: "top top",
            pin: true,
            scrub: 1  ,
            pinSpacing: true,  
            
          },
        });

        // Ensure ScrollTrigger recalculates after images load
        const images = Array.from(
          document.querySelectorAll<HTMLImageElement>(".slider-content img")
        );

        if (images.length) {
          // wait for all images to be complete
          const promises = images.map(
            (imgEl) =>
              new Promise<void>((resolve) => {
                if (imgEl.complete) {
                  resolve();
                } else {
                  imgEl.addEventListener("load", () => resolve(), {
                    once: true,
                  });
                  imgEl.addEventListener(
                    "error",
                    () => resolve(), // resolve even on error to avoid hanging
                    { once: true }
                  );
                }
              })
          );

          Promise.all(promises).then(() => {
            // refresh measurements once images are loaded
            ScrollTrigger.refresh();
          });
        } else {
          // fallback: still refresh once to be safe
          ScrollTrigger.refresh();
        }

        // Return cleanup for this matchMedia entry
        return () => {
          tween.kill();
          ScrollTrigger.refresh(); 
        };
      });

      // No special setup for smaller devices (they will be static)
    });

    // cleanup on unmount
    return () => {
      ctx.revert(); // kills animations and matchMedia handlers
      // ensure ScrollTrigger instances are removed
      ScrollTrigger.getAll().forEach((st) => st.kill());
      ScrollTrigger.clearMatchMedia?.(); // if available in your GSAP build
    };
  }, []);

  const projectSections = [
    {
      title: "Find Serve & Keep",
      subtitleTags: ["Game Design", "Mobile App Development"],
      description:
        "FSK revolutionizes mobile gaming with its innovative fusion of match-3 puzzles, time management challenges, and captivating role-playing elements.",
      features: [
        "Immersive Role-Playing Narrative",
        "Real-Time Market Strategies",
        "Monetization Without Disruption",
        "Engaging User Experience",
      ],
      caseStudyLink: "#",
      image: CardImg01,
    },
    {
      title: "Super App Yeppy",
      subtitleTags: [
        "UI/UX Design",
        "Mobile App Development",
        "Multi-Service Integration",
      ],
      description:
        "Super App Yeppy revolutionizes mobile experiences by consolidating diverse services into one intuitive platform, catering to users’ daily needs seamlessly.",
      features: [
        "30% increase in user engagement within the first month",
        "Enhanced Convenience and Accessibility",
        "Seamless Navigation and Functionality",
        "95% positive user feedback on app usability",
      ],
      caseStudyLink: "#",
      image: CardImg02,
    },

  ];

  // const CardsData = [CardImg01, CardImg02, CardImg03];
  return (
   <section className="layout-standard slider-wrapper flex flex-col md:flex-row md:h-screen overflow-hidden z-10">
      <div className=" flex flex-col justify-center gap-6 md:p-10">
        <h2 className="text-4xl md:text-6xl lg:text-7xl max-w-2xl text-heading font-extrabold tracking-wider">
          <span className="text-primary">Results</span> that Impress!
        </h2>
        <p className="md:text-lg text-paragraph max-w-lg font-medium">
          Peep the work we&apos;ve done to make our customers&apos; brand stand out
          online! Our custom B2C and B2B solutions—like eShops, domain &
          hosting, website design, development, and maintenance—show how we help
          businesses crush it on the web and grow like never before.
        </p>
        
        <DailogLeadForm
          trigger={
            <Button className="w-[180px] md:w-[210px] h-[60px] px-8 group rounded-full md:text-xl font-bold mx-auto md:mx-0">
              Let&apos;s Get Started
              <FaArrowRightLong className="group-hover:translate-x-[2px] transition-transform" />
            </Button>
          }
        />

       
      </div>
      <div className="slider-content w-full md:w-1/2 flex flex-col">
        {projectSections.map((project, index) => (
          <div key={index} className="model-card flex flex-col gap-10 py-12 md:py-16 ">
            {/* Text Section */}
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl max-w-2xl text-heading font-bold">
                {project.title}
              </h1>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.subtitleTags.map((tag, i) => (
                  <span
                    key={i}
                    className={cn(
                      "px-4 py-1 rounded-full text-sm font-medium",
                      tag === "Mobile App Development"
                        ? "bg-purple-100 text-purple-700"
                        : tag === "UI/UX Design"
                        ? "bg-[#D00747] text-white"
                        : "bg-gray-100 text-gray-700"
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-paragraph max-w-5xl">{project.description}</p>

              {/* Features */}
              <div className="max-w-lg flex flex-wrap gap-3">
                {project.features.map((feature, i) => (
                  <span
                    key={i}
                    className="px-4 py-1 rounded-full text-sm bg-gray-200 text-paragraph"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Case Study Link */}
              <a
                href={project.caseStudyLink}
                className="text-primary hover:text-primary-hover font-semibold inline-block mt-4"
              >
                VIEW CASE STUDY →
              </a>
            </div>

            {/* Image Section */}
            <div className="flex justify-start">
              <Image
                src={project.image.src}
                alt={project.title}
                className="rounded-lg shadow-lg object-cover h-[300px] lg:h-[500px]"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}