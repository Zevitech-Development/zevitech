import { EmailRegex, HiddenCharacterRegex, StringRegex } from "@/constants/regex-formats";
import { z } from "zod";

export const StrictStringValidator = (field: string) =>
  z
    .string()
    .min(1, { message: `Please provide your ${field}.` })
    .regex(StringRegex, {
      message: `Invalid whitespace in ${field}.`,
    })
    .refine((val) => !HiddenCharacterRegex.test(val), {
      message: `Invalid characters detected in ${field}.`,
    });

export const EmailSchemaValidator = z
  .string()
  .regex(EmailRegex, {
    message: "Enter a valid email address (e.g., example@email.com).",
  })
  .refine((val) => !HiddenCharacterRegex.test(val), {
    message: "Invalid characters detected in email address.",
  })
  .transform((val) => val.trim());



  