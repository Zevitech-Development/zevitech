import { Metadata } from "next";
import { GetPageMetadata } from "@/utils/meta-data";
import AiCallingPage from "@/containers/landing-page/ai-calling-page";

export const metadata: Metadata = GetPageMetadata({
  title: "AI Voice Agent for Business | AI Calling Solutions | Zevitech",
  description:
    "Zevitech builds custom AI sales agents that call every lead in seconds, qualify them, and book appointments straight to your calendar — 20–50× the output of a human rep for 90% less.",
  path: "/landing-pages/ai-calling",
});

export default function AiCallingLandingPage() {
  return <AiCallingPage />;
}
  