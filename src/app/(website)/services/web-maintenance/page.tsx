import React from "react";
import { Metadata } from "next";

import WebMaintenancePage from "@/containers/website/services/web-maintenance/web-maintenance-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Website Maintenance Services | Zevitech Web Support & Optimization",
  description:
    "Keep your website secure, updated, and running smoothly with Zevitech’s website maintenance services. We handle performance monitoring, security updates, backups, and ongoing support to ensure peak site performance.",
});

function WebMaintenance() {
  return <WebMaintenancePage />;
}

export default WebMaintenance;
