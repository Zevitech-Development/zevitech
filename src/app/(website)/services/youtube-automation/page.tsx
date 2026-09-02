import React from "react";
import { Metadata } from "next";

import YoutubeAutomationPage from "@/containers/website/services/youtube-automation/youtube-automation-page";

import { GetPageMetadata, buildServiceSchema } from "@/utils/meta-data";
import JsonLd from "@/components/common/json-ld";

export const metadata: Metadata = GetPageMetadata({
  title: "YouTube Automation Services | Faceless Channel Management | Zevitech",
  description:
    "Zevitech builds and manages monetisation-ready faceless YouTube channels — niche research, scripting, voiceover, editing, thumbnails, SEO, and uploads. You own the channel and the revenue.",
  path: "/services/youtube-automation",
});

function YoutubeAutomation() {
  return (
    <>
      <JsonLd data={buildServiceSchema("/services/youtube-automation", "YouTube Automation")} />
      <YoutubeAutomationPage />
    </>
  );
}

export default YoutubeAutomation;
