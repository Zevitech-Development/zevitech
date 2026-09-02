import React from "react";
import { Metadata } from "next";

import CustomEcommerceDevelopmentPage from "@/containers/website/services/e-commerce//custom-ecommerce-development-page";

import { GetPageMetadata, buildServiceSchema } from "@/utils/meta-data";
import JsonLd from "@/components/common/json-ld";

export const metadata: Metadata = GetPageMetadata({
  title:
    "Custom eCommerce Development Services | Zevitech Online Store Solutions",
  description:
    "Transform your business with Zevitech’s custom eCommerce development services. We build tailored online stores with unique designs, seamless integrations, secure checkout, and optimized performance for maximum growth.",
  path: "/services/ecommerce/custom-ecommerce-development",
});

function CustomEcommerceDevelopment() {
  return (
    <>
      <JsonLd data={buildServiceSchema("/services/ecommerce/custom-ecommerce-development", "Custom eCommerce Development")} />
      <CustomEcommerceDevelopmentPage />
    </>
  );
}

export default CustomEcommerceDevelopment;
