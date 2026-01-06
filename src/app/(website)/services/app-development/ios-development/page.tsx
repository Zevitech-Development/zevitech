import React from "react";
import { Metadata } from "next";

import IOSDevelopmentPage from "@/containers/website/services/app-development/ios-development-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "iOS App Development Services | Zevitech Mobile App Experts",
  description:
    "Turn your app idea into reality with Zevitech’s iOS app development services. We build secure, high-performing, user-friendly apps with custom features",
});

function IOSDevelopment() {
  return <IOSDevelopmentPage />;
}

export default IOSDevelopment;
