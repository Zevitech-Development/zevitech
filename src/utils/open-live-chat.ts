export const OpenLiveChat = () => {
  if (typeof window === "undefined") return;

  // Tawk.to is the single site-wide chat widget, loaded in the root layout.
  // Every chat CTA maximizes it the same way on every page.
  try {
    const tawk = (window as any).Tawk_API;
    if (tawk && typeof tawk.maximize === "function") tawk.maximize();
  } catch {}

  // Previous Text (text.com) / LiveChat widget — disabled in favour of Tawk.to
  // try {
  //   const liveChat = (window as any).LiveChatWidget;
  //   if (liveChat) liveChat.call("maximize");
  // } catch {}
};
