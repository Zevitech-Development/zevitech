"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronDown } from "lucide-react";

import {
  shopifyRestoredReviews,
  shopifyRestoredReviewsContent,
} from "@/content/landing/shopify-restored-reviews-content";
import type {
  ShopifyRestoredReviewCardProps,
  ShopifyRestoredReviewsProps,
} from "@/interfaces/shopify-restored-reviews-interface";
import { cn } from "@/lib/utils";

function ReviewCard({ review }: ShopifyRestoredReviewCardProps) {
  return (
    <figure className="h-full min-w-0 rounded-2xl border border-border bg-background p-5 md:p-6">
      <figcaption className="flex min-w-0 items-center gap-3 border-b border-border pb-4">
        <Image
          src={review.ProfilePicture}
          alt=""
          width={48}
          height={48}
          sizes="48px"
          className="h-12 w-12 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="break-words text-base font-semibold text-heading">
            {review.ClientName}
          </p>
          <time dateTime={review.ReviewDate} className="mt-1 block text-xs text-paragraph">
            {review.ReviewDate}
          </time>
        </div>
      </figcaption>
      <blockquote className="mt-4 break-words text-base leading-relaxed text-paragraph">
        <p>{review.ReviewsQuote}</p>
      </blockquote>
    </figure>
  );
}

export default function LandingReviewsSection({
  content = shopifyRestoredReviewsContent,
  reviews = shopifyRestoredReviews,
}: ShopifyRestoredReviewsProps) {
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  const extraReviewsId = `${id}-more-reviews`;
  const initialReviews = reviews.slice(0, content.initialCount);
  const additionalReviews = reviews.slice(content.initialCount);
  const gridClass = "grid min-w-0 grid-cols-1 items-start gap-5 md:grid-cols-2 xl:grid-cols-3";

  return (
    <section id="shopify-reviews" className="section-padding-standard scroll-mt-6 bg-secondary-background" aria-labelledby={`${id}-title`}>
      <div className="layout-standard">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold tracking-widest text-primary">{content.eyebrow}</p>
          <h2 id={`${id}-title`} className="font-heading text-3xl leading-tight text-heading md:text-4xl lg:text-5xl">
            {content.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-paragraph">{content.introduction}</p>
        </div>

        <div className="mx-auto grid max-w-5xl min-w-0 grid-cols-1 gap-5 md:grid-cols-2">
          {initialReviews.map((review, index) => (
            <div key={`${review.ClientName}-${review.ReviewDate}`} className={cn("min-w-0", index === 0 && "md:row-span-2")}>
              <ReviewCard review={review} />
            </div>
          ))}
        </div>

        <div className="my-6 flex flex-wrap items-center justify-center gap-3">
          {additionalReviews.length > 0 && (
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={extraReviewsId}
              onClick={() => setExpanded((current) => !current)}
              className="inline-flex min-h-12 max-w-full items-center justify-center gap-2 rounded-xl border border-primary px-5 py-3 text-center text-sm font-semibold text-primary transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {expanded ? content.showFewer : content.showAll.replace("{count}", String(reviews.length))}
              <ChevronDown aria-hidden="true" className={cn("h-4 w-4 shrink-0 transition-transform motion-reduce:transition-none", expanded && "rotate-180")} />
            </button>
          )}
          <a
            href={content.trustpilotHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 max-w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-center text-sm font-semibold text-heading underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {content.trustpilotLabel}
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
          </a>
        </div>
        <p role="status" aria-live="polite" className="sr-only">
          {content.count.replace("{shown}", String(expanded ? reviews.length : initialReviews.length)).replace("{total}", String(reviews.length))}
        </p>
        <div id={extraReviewsId} hidden={!expanded} className={cn(gridClass, !expanded && "hidden")}>
          {additionalReviews.map((review) => (
            <ReviewCard key={`${review.ClientName}-${review.ReviewDate}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
