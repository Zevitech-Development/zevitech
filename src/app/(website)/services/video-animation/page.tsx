import React from "react";
import { Metadata } from "next";

import { GetPageMetadata } from "@/utils/meta-data";

import ComingSoonSection from "@/sections/website/coming-soon/coming-soon-section";

export const metadata: Metadata = GetPageMetadata({
  title: "Video Animation Services | Zevitech Creative Motion Experts",
  description:
    "Bring your ideas to life with Zevitech’s professional video animation services. We create engaging 2D and 3D animations, explainer videos, and motion graphics that captivate audiences and boost brand storytelling.",
});

function VideoAnimation() {
  return <ComingSoonSection serviceName="Video Animation" />;
}

export default VideoAnimation;
