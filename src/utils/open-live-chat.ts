export const OpenLiveChat = () => {
  if (typeof window === "undefined") return;

  // Text (text.com) is the single site-wide chat widget, loaded in the root
  // layout. It exposes the same LiveChatWidget global, so every chat CTA
  // maximizes it the same way on every page.
  try {
    const liveChat = (window as any).LiveChatWidget;
    if (liveChat && typeof liveChat.call === "function") {
      liveChat.call("maximize");
      return;
    }
  } catch {}

  // Local previews and browsers blocking the embed can still reach our chat.
  window.open("https://www.text.com/chat-with-ai-agent/2fa5b9f6-8ddb-461f-8145-75ca7c3e4544/", "_blank", "noopener,noreferrer");
};
