import React from "react";
import { Metadata } from "next";

import GameDevelopmentPage from "@/containers/website/services/app-development/game-development-page";

import { GetPageMetadata, buildServiceSchema } from "@/utils/meta-data";
import JsonLd from "@/components/common/json-ld";

export const metadata: Metadata = GetPageMetadata({
  title: "2D Game Development Services | 3D & Unity Game Studio | Zevitech",
  description:
    "Full-cycle 2D and 3D game development for mobile, PC, and web. Custom game mechanics, 3D asset modeling, and cross-platform Unity & Unreal deployment.",
  path: "/services/app-development/game-development",
});

function GameDevelopment() {
  return (
    <>
      <JsonLd data={buildServiceSchema("/services/app-development/game-development", "Game Development")} />
      <GameDevelopmentPage />
    </>
  );
}

export default GameDevelopment;
