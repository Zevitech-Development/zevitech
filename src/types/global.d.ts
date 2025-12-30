
interface UserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
}

interface Window {
  gtag_report_conversion?: (url?: string, userData?: UserData) => Promise<boolean>;
  gtag?: (...args: any[]) => void;
  dataLayer?: any[];
  __lc?: any;
  LiveChatWidget?: any;
  clarity?: (...args: any[]) => void;
}

declare global {
  interface Window {
    gtag_report_conversion?: (url?: string, userData?: UserData) => Promise<boolean>;
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    __lc?: any;
    LiveChatWidget?: any;
    clarity?: (...args: any[]) => void;
  }
}

export {};
