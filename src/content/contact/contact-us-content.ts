import { Phone, Mail, HelpCircle } from "lucide-react";

export const contactCardsData = [
  {
    title: "(302) 219-0703",
    description:
      "Have a question or need immediate assistance? Our team is just a call away.",
    icon: Phone,
    cardButton: "Call Now",
    href: "tel:(302) 219-0703",
  },
  {
    title: "support@zevitech.com",
    description:
      "Reach out to us anytime with your inquiries, ideas, or feedback — we'll respond promptly.",
    icon: Mail,
    cardButton: "Email Now",
  },
  {
    title: "We're Here to Help!",
    description:
      "Have questions or need guidance? Reach out to our support team for expert assistance, we're happy to help.",
    icon: HelpCircle, // Assuming a Help or Assistance icon
    cardButton: "Contact Support",
  },
];
