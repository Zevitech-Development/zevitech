import {
  getGoogleAdsAttribution,
  type GoogleAdsAttribution,
} from "@/lib/google-ads-attribution";

export type GoogleAdsLeadData = {
  name: string;
  email: string;
  phone: string;
  growthGoal: string;
  message: string;
  services?: string[];
  sourceSection: "hero" | "contact";
  attribution?: GoogleAdsAttribution;
};

export async function SendGoogleAdsLeadEmail(
  lead: GoogleAdsLeadData,
): Promise<boolean> {
  try {
    const attribution = lead.attribution ?? getGoogleAdsAttribution();
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formType: "google-ads",
        lead: { ...lead, attribution },
      }),
    });

    if (!response.ok) {
      console.error("Failed to send Google Ads lead:", await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error sending Google Ads lead:", error);
    return false;
  }
}
