import React from "react";
import { Metadata } from "next";

import Error404Page from "@/containers/extra/error-404-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Page Not Found – Zevitech",
  description:
    "The page you're looking for doesn't exist or has been moved. Navigate back to Zevitech's homepage or explore our design services to get started.",
});

export default function NotFound() {
  return <Error404Page />;
}
