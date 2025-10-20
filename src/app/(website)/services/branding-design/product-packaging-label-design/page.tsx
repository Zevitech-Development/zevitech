import React from "react";

import { Metadata } from "next";
import { GetPageMetadata } from "@/utils/meta-data";

import ProductPackagingLabelDesignServicePage from "@/containers/website/services/branding-design-services/product-packaging-label-design-servicePage";

export const metadata: Metadata = GetPageMetadata({
  title: "Product Packaging & Label Design Services | Zevitech",
  description:
    "Creative product packaging and label design services that make your products stand out and engage your customers effectively.",
});

function ProductPackagingLabelDesign() {
  return <ProductPackagingLabelDesignServicePage />;
}

export default ProductPackagingLabelDesign;
