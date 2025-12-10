export const OpenLiveChat = () => {
  if (typeof window === "undefined") return;

  try {
    const tawk = (window as any).Tawk_API;
    if (tawk && typeof tawk.maximize === "function") {
      tawk.maximize();
      return;
    }
  } catch {}

  try {
    const liveChat = (window as any).LiveChatWidget;
    if (liveChat) liveChat.call("maximize");
  } catch {}
};
