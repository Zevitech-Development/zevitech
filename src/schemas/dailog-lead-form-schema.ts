import { z } from "zod";

import {
  EmailSchemaValidator,
  StrictStringValidator,
} from "../utils/form-validators";

export const DailogLeadFormSchema = z.object({
  name: StrictStringValidator("full name"),
  emailAddress: EmailSchemaValidator,
  phoneNumber: z
    .string()
    .min(7, { message: "Phone number is too short" })
    .max(15, { message: "Phone number is too long" }),

  information: z.string().min(1, { message: "Please enter your message" }),
});
