import React from "react";
import { Metadata } from "next";

import AndroidDevelopmentPage from "@/containers/website/services/app-development/android-development-page";

import { GetPageMetadata, buildServiceSchema } from "@/utils/meta-data";
import JsonLd from "@/components/common/json-ld";

export const metadata: Metadata = GetPageMetadata({
  title: "Custom Android App Development Services | Kotlin & Flutter | Zevitech",
  description:
    "End-to-end Android mobile app development. We build secure, high-performance native Kotlin and cross-platform apps scaled for the Google Play Store.",
  path: "/services/app-development/android-development",
});

function AndroidDevelopment() {
  return (
    <>
      <JsonLd data={buildServiceSchema("/services/app-development/android-development", "Android App Development")} />
      <AndroidDevelopmentPage />
    </>
  );
}

export default AndroidDevelopment;
