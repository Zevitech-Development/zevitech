import React from "react";
import { Metadata } from "next";

import AppTestingPage from "@/containers/website/services/app-development/app-testing-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "App Testing Services | Zevitech QA & Performance Experts",
  description:
    "Ensure flawless performance with Zevitech’s app testing services. We provide comprehensive manual and automated testing for mobile and web apps to guarantee usability, security, and bug-free user experiences.",
});

function AppTesting() {
  return <AppTestingPage />;
}

export default AppTesting;
