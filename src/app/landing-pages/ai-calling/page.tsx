import { Metadata } from "next";
import { GetPageMetadata } from "@/utils/meta-data";
import AiCallingPage from "@/containers/landing-page/ai-calling-page";

export const metadata: Metadata = GetPageMetadata({
  title: "AI Sales Agents That Book Appointments 24/7 | Zevitech",
  description:
    "Zevitech builds custom AI sales agents that call every lead in seconds, qualify them, and book appointments straight to your calendar — 20–50× the output of a human rep for 90% less.",
});

export default function AiCallingLandingPage() {
  return <AiCallingPage />;
}
