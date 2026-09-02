import React from "react";
import { Metadata } from "next";

import WordPressWebDesignPage from "@/containers/website/services/design-&-development/wordpress-web-design-page";

import { GetPageMetadata, buildServiceSchema } from "@/utils/meta-data";
import JsonLd from "@/components/common/json-ld";

export const metadata: Metadata = GetPageMetadata({
  title: "WordPress Web Design Services | Zevitech Custom WordPress Experts",
  description:
    "Create a stunning and high-performing website with Zevitech’s WordPress web design services. We offer custom themes, responsive layouts, plugin integration, and SEO-friendly design tailored to your business goals.",
  path: "/services/design-&-development/wordpress-web-design",
});

function WordPressWebDesign() {
  return (
    <>
      <JsonLd data={buildServiceSchema("/services/design-&-development/wordpress-web-design", "WordPress Web Design")} />
      <WordPressWebDesignPage />
    </>
  );
}

export default WordPressWebDesign;
