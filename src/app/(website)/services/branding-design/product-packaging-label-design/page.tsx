import React from "react";

import { Metadata } from "next";
import { GetPageMetadata, buildServiceSchema } from "@/utils/meta-data";
import JsonLd from "@/components/common/json-ld";

import ProductPackagingLabelDesignServicePage from "@/containers/website/services/branding-design-services/product-packaging-label-design-servicePage";

export const metadata: Metadata = GetPageMetadata({
  title: "Product Packaging Design Services | Custom Label Design | Zevitech",
  description:
    "Creative product packaging and label design services that make your products stand out and engage your customers effectively.",
  path: "/services/branding-design/product-packaging-label-design",
});

function ProductPackagingLabelDesign() {
  return (
    <>
      <JsonLd data={buildServiceSchema("/services/branding-design/product-packaging-label-design", "Product Packaging & Label Design")} />
      <ProductPackagingLabelDesignServicePage />
    </>
  );
}

export default ProductPackagingLabelDesign;
