import { EmailSchemaValidator, StrictStringValidator } from "@/utils/form-validators";
import { z } from "zod";

export const HomeContactFormSchema = z.object({
  name: StrictStringValidator("full name"),
  email: EmailSchemaValidator,
  project: z.string().min(1, { message: "Please tell us about your project" }),
  services: z.array(z.string()).min(1, { message: "Please select at least one service" }),
  budget: z.string().min(1, { message: "Please enter your budget" }),
});