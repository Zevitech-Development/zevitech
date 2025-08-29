import React from 'react'

import { CaseStudyProps } from '@/interfaces/common-interfaces'

import { Badge } from '../ui/badge'
import { Button } from '../ui/button'


import Image from 'next/image'

import { ArrowRight } from 'lucide-react'

const CaseStudyCard = ({
    title,
    description,
    tags,
    features,
    ctaText,
    ctaHref,
    onCtaClick,
    images,
    layout = "image-right",
    className = "",
}: CaseStudyProps) => {

    const isImageRight = layout === "image-right"

   const ContentSection = () => (
    <div className="flex-1 space-y-8 relative z-10">
      <div className="space-y-6">
        {/* Title with gradient */}
        <div className="relative">
          <h2 className="text-4xl lg:text-5xl xl:text-6xl text-primary max-w-xl font-extrabold font-heading tracking-wider">
            {title}
          </h2>
          <div className="absolute -bottom-2 left-0 w-20 h-1 bg-black rounded-full" />
        </div>

        {/* Enhanced tags */}
        <div className="flex flex-wrap gap-3">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant={tag.variant || "secondary"}
              className={`px-6 py-3 text-xs lg:text-sm font-semibold rounded-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                tag.className ||
                "bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 hover:from-slate-200 hover:to-slate-300"
              }`}
            >
              {tag.label}
            </Badge>
          ))}
        </div>

        {/* Enhanced description */}
        <p className="text-paragraph text-base md:text-lg font-medium">
          {description}
        </p>
      </div>

      {/* Creative features grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative bg-gradient-to-br from-white to-slate-50 p-4 rounded-2xl border border-slate-200/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary-hover rounded-full group-hover:scale-150 transition-transform duration-300" />
              <span className="text-paragraph font-medium text-sm">
                {feature}
              </span>
            </div>
          </div>
        ))}
      </div>


      <div className="">
        {ctaHref ? (
          <Button
            asChild
            className="cta-button hover:bg-primary-hover !border-none"
          >
            <a href={ctaHref} className="inline-flex items-center gap-3">
              {ctaText}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </Button>
        ) : (
          <Button
            onClick={onCtaClick}
            className="cta-button hover:bg-primary-hover !border-none"
          >
            {ctaText}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        )}
      </div>
    </div>
  );

   const ImageSection = () => (
    <div className="flex-1 relative w-full">
      <div className="flex justify-center flex-wrap gap-7 lg:gap-9">
        {images.map((image, index) => (
          <div key={index}>
            <Image
              src={image.src}
              alt={image.alt || "Case Study Image"}
              width={600}
              height={400}
              objectFit="cover"
              className="rounded-3xl"
            />
          </div>
        ))}
      </div>
    </div>
  );

    return (
        <>
            <div className={`relative overflow-hidden ${className}`}>
        <div className="relative py-16 lg:py-16">
          <div className="container mx-auto px-6 lg:px-12">
            <div
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
                isImageRight ? "" : "lg:flex-row-reverse"
              }`}
            >
              <ContentSection />
              <ImageSection />
            </div>
          </div>
        </div>
      </div>

        </>
    )
}

export default CaseStudyCard