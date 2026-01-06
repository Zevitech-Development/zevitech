import React from "react";
import { Metadata } from "next";

import GameDevelopmentPage from "@/containers/website/services/app-development/game-development-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Game Development Services | Zevitech 2D & 3D Game Studio",
  description:
    "Bring your gaming vision to life with Zevitech’s game development services. We create immersive 2D & 3D games with stunning graphics and engaging gameplay.",
});

function GameDevelopment() {
  return <GameDevelopmentPage />;
}

export default GameDevelopment;
