import React from "react";
import { Metadata } from "next";

import YoutubeAutomationPage from "@/containers/website/services/youtube-automation/youtube-automation-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "YouTube Automation Services | Faceless Channel Management | Zevitech",
  description:
    "Zevitech builds and manages monetisation-ready faceless YouTube channels — niche research, scripting, voiceover, editing, thumbnails, SEO, and uploads. You own the channel and the revenue.",
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/services/youtube-automation`,
  },
  alternates: {
    canonical: "/services/youtube-automation",
  },
});

function YoutubeAutomation() {
  return <YoutubeAutomationPage />;
}

export default YoutubeAutomation;
