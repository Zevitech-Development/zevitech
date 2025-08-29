import { EmailSchemaValidator, StrictStringValidator } from "@/utils/form-validators";
import { z } from "zod";


export const DailogLeadFormSchema = z.object({
  name: StrictStringValidator("full name"),
  emailAddress: EmailSchemaValidator,
  phoneNumber: z
    .string()
    .min(7, { message: "Phone number is too short" })
    .max(15, { message: "Phone number is too long" }),

    services: z.string().min(1, { message: "Please select a service" }), 

  information: z.string().min(1, { message: "Please enter your message" }),
});
