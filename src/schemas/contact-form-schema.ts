import { z } from "zod";
import { EmailSchemaValidator, StrictStringValidator } from "@/utils/form-validators";

export const ContactFormSchema = z.object({
    name: StrictStringValidator("Name"),
    email: EmailSchemaValidator,
    phone: StrictStringValidator("Phone number"),
    message: StrictStringValidator("Message"),
});

export type ContactFormType = z.infer<typeof ContactFormSchema>;