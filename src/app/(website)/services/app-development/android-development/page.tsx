import React from "react";
import { Metadata } from "next";

import AndroidDevelopmentPage from "@/containers/website/services/app-development/android-development-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Android App Development Services | Zevitech Mobile App Experts",
  description:
    "Build powerful and scalable Android applications with Zevitech’s Android app development services. From custom features to seamless integrations and Google Play Store optimization, we create apps that drive growth.",
});

function AndroidDevelopment() {
  return <AndroidDevelopmentPage />;
}

export default AndroidDevelopment;
