export const OpenLiveChat = () => {
  if (typeof window === "undefined") return;

  // Widgets survive client-side navigation. Use Tawk only on its own pages;
  // Shopify project-manager buttons must always use the site’s LiveChat account.
  try {
    const tawk = (window as any).Tawk_API;
    const tawkPage = window.location.pathname.startsWith("/services/digital-marketing/google-ads")
      || window.location.pathname.startsWith("/landing-pages/website-design");
    if (tawkPage && tawk && typeof tawk.maximize === "function") {
      tawk.maximize();
      return;
    }
  } catch {}

  document.body.classList.remove("google-ads-livechat-hidden");

  try {
    const liveChat = (window as any).LiveChatWidget;
    if (liveChat && typeof liveChat.call === "function") {
      liveChat.call("maximize");
      return;
    }
  } catch {}

  // Local previews and browsers blocking the embed can still reach our chat.
  window.open("https://www.livechat.com/chat-with/19229942/", "_blank", "noopener,noreferrer");
};
