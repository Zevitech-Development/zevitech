import { z } from "zod";

import { ContactFormSchema } from "@/schemas/contact-form-schema";
import { DailogLeadFormSchema } from "@/schemas/dailog-lead-form-schema";
import { HomeContactFormSchema } from "@/schemas/home-contact-form-schema";
import { NewsletterFormSchema } from "@/schemas/newsletter-form-schema";

export type DailogLeadFormType = z.infer<typeof DailogLeadFormSchema>;
export type HomeContactFormType = z.infer<typeof HomeContactFormSchema>;
export type ContactFormType = z.infer<typeof ContactFormSchema>;
export type NewsletterFormType = z.infer<typeof NewsletterFormSchema>;

export interface DailogLeadFormProps {
  trigger: React.ReactNode;
}
