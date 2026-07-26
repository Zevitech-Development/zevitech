export const OpenLiveChat = () => {
  if (typeof window === "undefined") return;

  // Tawk.to wins wherever it is loaded (the Google Ads page). Checked before
  // unhiding LiveChat so a chat CTA there never reveals both widgets.
  try {
    const tawk = (window as any).Tawk_API;
    if (tawk && typeof tawk.maximize === "function") {
      tawk.maximize();
      return;
    }
  } catch {}

  document.body.classList.remove("google-ads-livechat-hidden");

  try {
    const liveChat = (window as any).LiveChatWidget;
    if (liveChat) liveChat.call("maximize");
  } catch {}
};
