import { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

export const defaultMetadata: Metadata = {
  title:
    "Zevitech - Custom Software, App Development & Digital Transformation Agency",
  description:
    "Zevitech is a full-spectrum digital solutions agency delivering mobile apps, web platforms, custom software, SaaS products, UI/UX design, eCommerce (Shopify, WordPress), digital marketing, SEO, automation, and scalable branding strategies — all in one place.",
  creator: "Zevitech",
  applicationName: "Zevitech",

  icons: {
    icon: [
      {
        rel: "icon",
        type: "image/png",
        url: "/favicons/logo-512x512.png",
        sizes: "512x512",
      },
      {
        rel: "icon",
        type: "image/png",
        url: "/favicons/logo-192x192.png",
        sizes: "192x192",
      },
      {
        rel: "icon",
        type: "image/png",
        url: "/favicons/logo-96x96.png",
        sizes: "96x96",
      },
      { rel: "icon", type: "image/svg+xml", url: "/favicons/short-logo.svg" },
      { rel: "icon", type: "image/x-icon", url: "/favicons/favicon.ico" },
      {
        rel: "shortcut icon",
        type: "image/png",
        url: "/favicons/logo-96x96.png",
      },
    ],
    apple: [
      {
        rel: "apple-touch-icon",
        url: "/favicons/apple-icon.png",
        sizes: "180x180",
      },
    ],
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    title: "Zevitech - Scalable Tech, SaaS, Web & App Development Agency",
    description:
      "Build smarter with Zevitech: from mobile apps, websites, and SaaS platforms to Shopify, WordPress, UI/UX design, branding, SEO, and marketing. One partner for all your digital product and growth needs.",
    siteName: "Zevitech",
    images: [
      {
        url: "/favicons/short-logo.svg",
        width: 96,
        height: 58,
        alt: "Zevitech Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Zevitech - End-to-End Software, App & eCommerce Development",
    description:
      "Zevitech provides complete solutions: mobile & web apps, custom software, SaaS, Shopify, WordPress, UI/UX, SEO, digital marketing, and automation services to accelerate your digital transformation.",
    images: "/favicons/short-logo.svg",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export function GetPageMetadata(overrides: Partial<Metadata> = {}): Metadata {
  return {
    ...defaultMetadata,
    ...overrides,
    title: overrides.title ?? defaultMetadata.title,
    description: overrides.description ?? defaultMetadata.description,
    openGraph: {
      ...defaultMetadata.openGraph,
      ...overrides.openGraph,
      title: overrides.title || defaultMetadata.openGraph?.title,
      description:
        overrides.description || defaultMetadata.openGraph?.description,
    },
    twitter: {
      ...defaultMetadata.twitter,
      ...overrides.twitter,
      title: overrides.title || defaultMetadata.twitter?.title,
      description:
        overrides.description || defaultMetadata.twitter?.description,
    },
  };
}
