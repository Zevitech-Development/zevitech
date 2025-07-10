import { EmailAttachment } from "./services-interface";

export interface SendEmailInterface {
  to: string;
  subject: string;
  html: string;
  attachments?: EmailAttachment[];
}
