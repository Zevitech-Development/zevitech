import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, html, attachments } = body;

    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: false,
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
      subject,
      html,
      attachments,
    });

    const hostingerRecipient =
      process.env.HOSTINGER_EMAIL_TO ||
      process.env.HOSTINGER_EMAIL_USER ||
      to;

    const hostingerPromise = hostingerTransporter.sendMail({
      from: `Zevitech <${process.env.HOSTINGER_EMAIL_USER}>`,
      to: hostingerRecipient,
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
