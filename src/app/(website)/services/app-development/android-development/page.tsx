import React from "react";
import { Metadata } from "next";

import AndroidDevelopmentPage from "@/containers/website/services/app-development/android-development-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Android App Development Services | Zevitech ",
  description:
    "Build scalable Android apps with Zevitech. We deliver custom features, seamless integrations, and Google Play Store optimization to drive growth.",
});

function AndroidDevelopment() {
  return <AndroidDevelopmentPage />;
}

export default AndroidDevelopment;
