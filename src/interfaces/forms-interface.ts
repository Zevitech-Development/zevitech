import { z } from "zod";

import { DailogLeadFormSchema } from "@/schemas/dailog-lead-form-schema";

export type DailogLeadFormType = z.infer<typeof DailogLeadFormSchema>;

export interface DailogLeadFormProps {
  trigger: React.ReactNode;
}
