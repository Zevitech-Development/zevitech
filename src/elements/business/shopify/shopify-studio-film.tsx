import { shopifySalesCtaContent } from "@/content/landing/shopify-sales-cta-content";
import { ShopifyStudioProps } from "@/interfaces/shopify-studio-interface";
export default function ShopifyStudioFilm({
  copy,
}: Pick<ShopifyStudioProps, "copy">) {
  return (
    <section className="section-padding-standard">
      <div className="layout-standard grid md:grid-cols-2 items-center gap-10">
        <div className="min-w-0">
          <p className="text-primary tracking-widest text-sm mb-4">
            {copy.eyebrow}
          </p>
          <h2 className="font-heading text-heading text-3xl leading-tight md:text-4xl lg:text-5xl mb-5">
            {copy.filmTitle}
          </h2>
          <p className="text-paragraph text-base leading-relaxed md:text-lg mb-6">{copy.filmBody}</p>
          <a
            href={shopifySalesCtaContent.href}
            className="inline-flex min-h-12 items-center justify-center bg-primary text-primary-foreground rounded-xl px-5 py-3 text-center font-semibold leading-snug hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            {shopifySalesCtaContent.label}
          </a>
        </div>
        <video
          controls
          playsInline
          preload="metadata"
          poster="/store-studio/intro-poster.jpg"
          width={1080}
          height={1350}
          className="mx-auto aspect-[4/5] w-full min-w-0 max-w-sm rounded-2xl bg-secondary object-contain focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          aria-label={copy.filmTitle}
        >
          <source src="/store-studio/intro.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
