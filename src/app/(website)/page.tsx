import { Metadata } from "next";

import HomePage from "@/containers/website/home-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Zevitech | Software, Apps & Digital Transformation",
  description:
    "Zevitech is a full-spectrum digital solutions agency offering mobile apps, web platforms, SaaS, UI/UX design, eCommerce, SEO, automation, and branding.",
});

export default function Home() {
  return (
    <main>
      <HomePage />
    </main>
  );
}
