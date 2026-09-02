import { Metadata } from "next";

import HomePage from "@/containers/website/home-page";

import { GetPageMetadata } from "@/utils/meta-data";
export const metadata: Metadata = GetPageMetadata({
  title: "Custom Software Development Company | Web & Mobile Apps | Zevitech",
  description:
    "Zevitech builds scalable custom software, native iOS & Android mobile apps, web platforms, and data-driven digital marketing campaigns for global brands.",
  path: "/",
});
export default function Home() {
  return (
    <main>
      <HomePage />
    </main>
  );
}
