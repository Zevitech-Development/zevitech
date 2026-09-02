import React from "react";
import { Metadata } from "next";

import AppTestingPage from "@/containers/website/services/app-development/app-testing-page";

import { GetPageMetadata, buildServiceSchema } from "@/utils/meta-data";
import JsonLd from "@/components/common/json-ld";

export const metadata: Metadata = GetPageMetadata({
  title: "App Testing Services | Zevitech QA & Performance Experts",
  description:
    "Ensure flawless performance with Zevitech’s app testing services. We provide comprehensive manual and automated testing for mobile and web apps to guarantee usability, security, and bug-free user experiences.",
  path: "/services/app-development/app-testing",
});

function AppTesting() {
  return (
    <>
      <JsonLd data={buildServiceSchema("/services/app-development/app-testing", "App Testing & QA")} />
      <AppTestingPage />
    </>
  );
}

export default AppTesting;
