import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const GOOGLE_ADS_RECIPIENT = process.env.GOOGLE_ADS_LEAD_EMAIL;

const GoogleAdsLeadSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().min(5).max(40),
  growthGoal: z.string().trim().min(2).max(160),
  message: z.string().trim().min(2).max(3000),
  services: z.array(z.string().trim().min(1).max(100)).max(8).optional(),
  sourceSection: z.enum(["hero", "contact"]),
  attribution: z
    .object({
      utm_source: z.string().trim().max(240).optional(),
      utm_medium: z.string().trim().max(240).optional(),
      utm_campaign: z.string().trim().max(240).optional(),
      utm_term: z.string().trim().max(240).optional(),
      utm_content: z.string().trim().max(240).optional(),
      gclid: z.string().trim().max(240).optional(),
      landingPage: z.string().trim().max(500).optional(),
    })
    .optional(),
});

const ATTRIBUTION_LABELS: Array<[key: string, label: string]> = [
  ["utm_source", "UTM source"],
  ["utm_medium", "UTM medium"],
  ["utm_campaign", "UTM campaign"],
  ["utm_term", "UTM term"],
  ["utm_content", "UTM content"],
  ["gclid", "Google click ID"],
  ["landingPage", "Landing page"],
];

const escapeHtml = (value: string) =>
  value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character];
  });

function buildAttributionBlock(
  lead: z.infer<typeof GoogleAdsLeadSchema>,
): string {
  const attribution = lead.attribution;
  if (!attribution) return "";

  const rows = ATTRIBUTION_LABELS.filter(
    ([key]) => attribution[key as keyof typeof attribution],
  )
    .map(
      ([key, label]) =>
        `<tr><td style="width:150px;padding:7px 0;color:#65758b;font-weight:700">${label}</td><td style="padding:7px 0;word-break:break-all">${escapeHtml(String(attribution[key as keyof typeof attribution]))}</td></tr>`,
    )
    .join("");

  if (!rows) return "";

  return `
          <div style="margin-top:20px;border:1px solid #dbe8f5;border-radius:8px;background:#fbfdff;padding:18px">
            <p style="margin:0 0 7px;color:#65758b;font-size:12px;font-weight:700;text-transform:uppercase">Campaign attribution</p>
            <table style="width:100%;border-collapse:collapse;font-size:13px;line-height:1.5">${rows}</table>
          </div>`;
}

function buildGoogleAdsLeadEmail(lead: z.infer<typeof GoogleAdsLeadSchema>) {
  const services = lead.services?.length
    ? lead.services.map((service) => escapeHtml(service)).join(", ")
    : "Not selected";
  const servicesLabel =
    lead.sourceSection === "hero" ? "Pain points" : "Services";

  return `
    <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;padding:24px;background:#f3f7fb;color:#17243a">
      <div style="overflow:hidden;border:1px solid #dbe8f5;border-radius:18px;background:#ffffff">
        <div style="padding:24px 28px;background:#071a35;color:#ffffff">
          <p style="margin:0 0 8px;color:#72c7ff;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase">Google Ads landing page</p>
          <h1 style="margin:0;font-size:25px">New growth audit request</h1>
        </div>
        <div style="padding:28px">
          <table style="width:100%;border-collapse:collapse;font-size:15px;line-height:1.55">
            <tr><td style="width:150px;padding:9px 0;color:#65758b;font-weight:700">Name</td><td style="padding:9px 0">${escapeHtml(lead.name)}</td></tr>
            <tr><td style="padding:9px 0;color:#65758b;font-weight:700">email</td><td style="padding:9px 0"><a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></td></tr>
            <tr><td style="padding:9px 0;color:#65758b;font-weight:700">Phone</td><td style="padding:9px 0">${escapeHtml(lead.phone)}</td></tr>
            <tr><td style="padding:9px 0;color:#65758b;font-weight:700">Growth goal</td><td style="padding:9px 0">${escapeHtml(lead.growthGoal)}</td></tr>
            <tr><td style="padding:9px 0;color:#65758b;font-weight:700">${servicesLabel}</td><td style="padding:9px 0">${services}</td></tr>
            <tr><td style="padding:9px 0;color:#65758b;font-weight:700">Form location</td><td style="padding:9px 0">${lead.sourceSection === "hero" ? "Hero growth form" : "Bottom contact form"}</td></tr>
          </table>
          <div style="margin-top:20px;border-left:4px solid #007afc;border-radius:8px;background:#f5f9fd;padding:18px">
            <p style="margin:0 0 7px;color:#65758b;font-size:12px;font-weight:700;text-transform:uppercase">Website and growth challenge</p>
            <p style="margin:0;white-space:pre-wrap;line-height:1.65">${escapeHtml(lead.message)}</p>
          </div>
          ${buildAttributionBlock(lead)}
        </div>
      </div>
    </div>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const isGoogleAdsLead = body.formType === "google-ads";
    let { to, subject, html, attachments } = body;
    let replyTo: string | undefined = body.replyTo;

    if (isGoogleAdsLead) {
      const parsedLead = GoogleAdsLeadSchema.safeParse(body.lead);

      if (!parsedLead.success) {
        return NextResponse.json(
          { error: "Please check the form fields and try again." },
          { status: 400 },
        );
      }

      if (!GOOGLE_ADS_RECIPIENT) {
        console.error(
          "GOOGLE_ADS_LEAD_EMAIL is not configured — cannot route Google Ads lead.",
        );
        return NextResponse.json(
          { error: "Lead routing is not configured." },
          { status: 500 },
        );
      }

      const lead = parsedLead.data;
      to = GOOGLE_ADS_RECIPIENT;
      replyTo = lead.email;
      subject = `[Google Ads Lead] ${lead.name} — ${lead.growthGoal}`;
      html = buildGoogleAdsLeadEmail(lead);
      attachments = undefined;
    }

    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const gmailPort = Number(process.env.EMAIL_PORT) || 587;
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: gmailPort,
      secure: gmailPort === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      debug: false,
    });

    const hostingerPort = Number(process.env.HOSTINGER_EMAIL_PORT) || 465;
    const hostingerTransporter = nodemailer.createTransport({
      host: process.env.HOSTINGER_EMAIL_HOST || "smtp.hostinger.com",
      port: hostingerPort,
      secure: hostingerPort === 465,
      auth: {
        user: process.env.HOSTINGER_EMAIL_USER,
        pass: process.env.HOSTINGER_EMAIL_PASSWORD,
      },
      debug: process.env.NODE_ENV === "development",
    });

    const gmailPromise = transporter.sendMail({
      from: `Zevitech <${process.env.EMAIL_USER}>`,
      to,
      replyTo,
      subject,
      html,
      attachments,
    });

    // Google Ads leads are routed to their own inbox on both transports.
    // Every other form keeps the existing HOSTINGER_EMAIL_TO behaviour.
    const hostingerRecipient = isGoogleAdsLead
      ? to
      : process.env.HOSTINGER_EMAIL_TO ||
        process.env.HOSTINGER_EMAIL_USER ||
        to;

    const hostingerPromise = hostingerTransporter.sendMail({
      from: `Zevitech <${process.env.HOSTINGER_EMAIL_USER}>`,
      to: hostingerRecipient,
      replyTo,
      subject,
      html,
      attachments,
    });

    // Optional connectivity verification (helps debug misconfigured SMTP)
    try {
      await hostingerTransporter.verify();
    } catch (e) {
      console.error("Hostinger SMTP verify failed:", e);
    }

    const [gmailResult, hostingerResult] = await Promise.allSettled([
      gmailPromise,
      hostingerPromise,
    ]);

    const gmailOk =
      gmailResult.status === "fulfilled" &&
      typeof gmailResult.value?.messageId === "string";
    const hostingerOk =
      hostingerResult.status === "fulfilled" &&
      typeof hostingerResult.value?.messageId === "string";

    if (gmailOk || hostingerOk) {
      return NextResponse.json({
        success: true,
        gmail: gmailOk,
        hostinger: hostingerOk,
        messageIdGmail: gmailOk ? gmailResult.value.messageId : undefined,
        messageIdHostinger: hostingerOk
          ? hostingerResult.value.messageId
          : undefined,
      });
    }

    console.error(
      "Dual SMTP delivery failed: ",
      gmailResult.status === "rejected" ? gmailResult.reason : "Gmail OK",
      hostingerResult.status === "rejected"
        ? hostingerResult.reason
        : "Hostinger OK"
    );
    return NextResponse.json(
      { error: "Failed to send via both providers" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        error: "Failed to send email",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
