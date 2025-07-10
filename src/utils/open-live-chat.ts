/* eslint-disable @typescript-eslint/no-explicit-any */

export const OpenLiveChat = () => {
  if (typeof window !== "undefined" && (window as any).LiveChatWidget) {
    (window as any).LiveChatWidget.call("maximize");
  }
};
