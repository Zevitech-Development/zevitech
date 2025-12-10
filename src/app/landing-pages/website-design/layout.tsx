import WebDesignHeader from "@/components/layouts/web-design-header";
import WebDesignFooter from "@/components/layouts/web-design-footer";
import WhatsAppPopup from "@/elements/business/logo-design/whatsapp-popup";

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <WebDesignHeader />
      {children}
      <WhatsAppPopup />
      <WebDesignFooter />
    </>
  );
}
