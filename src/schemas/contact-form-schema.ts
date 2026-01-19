import { z } from "zod";
import { EmailSchemaValidator, StrictStringValidator } from "@/utils/form-validators";

export const ContactFormSchema = z.object({
    name: StrictStringValidator("Name"),
    email: EmailSchemaValidator,
    phone: StrictStringValidator("Phone Number"),
    message: StrictStringValidator("Message"),
    budget: StrictStringValidator("Budget"),
});

export type ContactFormType = z.infer<typeof ContactFormSchema>;