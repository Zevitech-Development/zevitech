import React from "react";
import { Metadata } from "next";

import GameDevelopmentPage from "@/containers/website/services/app-development/game-development-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Game Development Services | Zevitech 2D & 3D Game Studio",
  description:
    "Bring your gaming vision to life with Zevitech’s professional game development services. We design and develop immersive 2D and 3D games with stunning graphics, engaging gameplay, and cross-platform compatibility.",
});

function GameDevelopment() {
  return <GameDevelopmentPage />;
}

export default GameDevelopment;
