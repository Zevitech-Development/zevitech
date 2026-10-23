export const OpenLiveChat = () => {
  if (typeof window === "undefined") return;

  // Text (text.com) is the single site-wide chat widget, loaded in the root
  // layout. It exposes the same LiveChatWidget global, so every chat CTA
  // maximizes it the same way on every page.
  try {
    const liveChat = (window as any).LiveChatWidget;
    if (liveChat) liveChat.call("maximize");
  } catch {}
};
