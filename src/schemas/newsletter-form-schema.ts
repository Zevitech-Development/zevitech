import { EmailSchemaValidator } from "@/utils/form-validators";
import { z } from "zod";

export const NewsletterFormSchema = z.object({
  email: EmailSchemaValidator,
});

export type NewsletterFormType = z.infer<typeof NewsletterFormSchema>;