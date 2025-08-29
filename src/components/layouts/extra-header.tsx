"use client";

import React from "react";
import { useRouter } from "next/navigation";

import Logo from "../partials/logo";
import { CTAButton01 } from "../partials/cta-buttons";

function ExtraHeader() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <header className="h-[90px] border-b border-border bg-secondary-background">
      <div className="layout-standard flex items-center h-full justify-between">
        <Logo />

        <div className="flex items-center gap-4">

          <CTAButton01
            ctaButton01OnClick={() => handleNavigate("/get-started")}
            ctaButton01Text="Let's get started"
            class="max-md:!hidden"
          />
        </div>
      </div>
    </header>
  );
}

export default ExtraHeader;
