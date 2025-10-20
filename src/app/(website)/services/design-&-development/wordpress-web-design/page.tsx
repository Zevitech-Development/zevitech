import React from "react";
import { Metadata } from "next";

import WordPressWebDesignPage from "@/containers/website/services/design-&-development/wordpress-web-design-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "WordPress Web Design Services | Zevitech Custom WordPress Experts",
  description:
    "Create a stunning and high-performing website with Zevitech’s WordPress web design services. We offer custom themes, responsive layouts, plugin integration, and SEO-friendly design tailored to your business goals.",
});

function WordPressWebDesign() {
  return <WordPressWebDesignPage />;
}

export default WordPressWebDesign;
