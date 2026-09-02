import { Metadata } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_FRONTEND_URL?.replace(/\/$/, "") ||
  "https://zevitech.com";

export const SITE_URL = BASE_URL;

export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title:
    "Zevitech | Software, Apps & Digital Transformation",
  description:
    "Zevitech is a full-spectrum digital solutions agency offering mobile apps, web platforms, SaaS, UI/UX design, eCommerce, SEO, automation, and branding.",
  creator: "Zevitech",
  applicationName: "Zevitech",

  icons: {
    icon: [
      {
        rel: "icon",
        type: "image/png",
        url: "/favicon/logo-512x512.png",
        sizes: "512x512",
      },

      {
        rel: "icon",
        type: "image/png",
        url: "/favicon/logo-192x192.png",
        sizes: "192x192",
      },

      {
        rel: "icon",
        type: "image/png",
        url: "/favicon/logo-96x96.png",
        sizes: "96x96",
      },

      { rel: "icon", type: "image/svg+xml", url: "/favicon/logo.svg" },

      { rel: "icon", type: "image/x-icon", url: "/favicon.ico" },

      {
        rel: "shortcut icon",
        type: "image/png",
        url: "/favicon/logo-96x96.png",
      },
    ],
    apple: [
      {
        rel: "apple-touch-icon",
        url: "/favicon/apple-icon.png",
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
        url: "/favicon/logo-512x512.png",
        width: 512,
        height: 512,
        alt: "Zevitech Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Zevitech - End-to-End Software, App & eCommerce Development",
    description:
      "Zevitech provides complete solutions: mobile & web apps, custom software, SaaS, Shopify, WordPress, UI/UX, SEO, digital marketing, and automation services to accelerate your digital transformation.",
    images: "/favicon/logo-512x512.png",
  },

  robots: {
    index: true,
    follow: true,
  },
};

type PageMetadataOverrides = Partial<Metadata> & {
  /**
   * Absolute path for this route (e.g. "/about-us"). When provided, a
   * self-referencing canonical URL and matching OpenGraph URL are set.
   */
  path?: string;
};

export function GetPageMetadata(
  overrides: PageMetadataOverrides = {},
): Metadata {
  const { path, ...rest } = overrides;

  // Canonicals are self-referential, lowercase, and free of a trailing
  // slash so each page resolves to exactly one absolute URL.
  const canonicalPath = path
    ? path === "/"
      ? "/"
      : `/${path.replace(/^\/+/, "").replace(/\/+$/, "").toLowerCase()}`
    : undefined;

  return {
    ...defaultMetadata,
    ...rest,
    title: rest.title ?? defaultMetadata.title,
    description: rest.description ?? defaultMetadata.description,
    ...(canonicalPath
      ? {
          alternates: {
            ...rest.alternates,
            canonical: canonicalPath,
          },
        }
      : rest.alternates
        ? { alternates: rest.alternates }
        : {}),
    openGraph: {
      ...defaultMetadata.openGraph,
      ...rest.openGraph,
      title: rest.title || defaultMetadata.openGraph?.title,
      description:
        rest.description || defaultMetadata.openGraph?.description,
      ...(canonicalPath
        ? { url: `${BASE_URL}${canonicalPath === "/" ? "" : canonicalPath}` }
        : {}),
    },

    twitter: {
      ...defaultMetadata.twitter,
      ...rest.twitter,
      title: rest.title || defaultMetadata.twitter?.title,
      description:
        rest.description || defaultMetadata.twitter?.description,
    },
  };
}

/**
 * Organization structured data (JSON-LD) for the site.
 * Rendered once in the root layout.
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Zevitech",
  url: BASE_URL,
  logo: `${BASE_URL}/favicon/logo-512x512.png`,
  description:
    "Zevitech is a global digital solutions agency specializing in custom software development, mobile application engineering, digital marketing, and UI/UX design.",
  email: "support@zevitech.com",
  sameAs: [
    "https://facebook.com/zevitech",
    "https://twitter.com/zevitech",
    "https://instagram.com/zevitech",
  ],
};

const titleCase = (segment: string) =>
  segment
    .replace(/-/g, " ")
    .replace(/&/g, "and")
    .replace(/\b\w/g, (c) => c.toUpperCase());

/**
 * Builds Service + BreadcrumbList JSON-LD for a service page.
 * `path` is the route (e.g. "/services/app-development/android-development").
 * `name` is the human service name; falls back to the last path segment.
 */
export function buildServiceSchema(path: string, name?: string) {
  const clean = `/${path.replace(/^\/+/, "").replace(/\/+$/, "")}`;
  const segments = clean.split("/").filter(Boolean);
  const serviceName = name || titleCase(segments[segments.length - 1] || "");

  const lastIndex = segments.length - 1;
  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: BASE_URL,
    },
    ...segments.map((seg, i) => {
      const crumb: Record<string, unknown> = {
        "@type": "ListItem",
        position: i + 2,
        name: titleCase(seg),
      };
      // Only the final crumb (this page) links — intermediate service
      // hub routes have no page and would 404.
      if (i === lastIndex) {
        crumb.item = `${BASE_URL}${clean}`;
      }
      return crumb;
    }),
  ];

  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: serviceName,
      provider: {
        "@type": "Organization",
        name: "Zevitech",
        url: BASE_URL,
      },
      areaServed: "Worldwide",
      url: `${BASE_URL}${clean}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement,
    },
  ];
}
