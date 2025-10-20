import React from "react";
import { Metadata } from "next";

import CustomEcommerceDevelopmentPage from "@/containers/website/services/e-commerce//custom-ecommerce-development-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title:
    "Custom eCommerce Development Services | Zevitech Online Store Solutions",
  description:
    "Transform your business with Zevitech’s custom eCommerce development services. We build tailored online stores with unique designs, seamless integrations, secure checkout, and optimized performance for maximum growth.",
});

function CustomEcommerceDevelopment() {
  return <CustomEcommerceDevelopmentPage />;
}

export default CustomEcommerceDevelopment;
