import React from "react";

import CustomProjectDetail from "@/elements/website/portfolio/custom-project-detail";
import CustomProjectCta from "@/elements/website/portfolio/custom-project-cta";
import { CustomProjectDetailPageProps } from "@/interfaces/components-partials-interface";

function CustomProjectDetailPage({ slug }: CustomProjectDetailPageProps) {
  return (
    <section>
      <CustomProjectDetail slug={slug} />
      <CustomProjectCta />
    </section>
  );
}

export default CustomProjectDetailPage;
