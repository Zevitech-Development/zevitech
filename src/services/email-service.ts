import { DailogLeadFormType } from "@/interfaces/forms-interface";

import { SendEmail } from "@/utils/send-email";

export const SendDailogLeadFormEmail = async (
  data: DailogLeadFormType
): Promise<boolean> => {
  const subject = `Zevitech Dailog Lead: ${data.name}`;

  const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Query Details</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f8f9fa;
          margin: 0;
          padding: 0;
          color: #212529;
        }

        .container {
          max-width: 620px;
          margin: 40px auto;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
          padding: 32px;
        }

        .header {
          text-align: center;
          margin-bottom: 30px;
        }

        .logo {
          max-width: 200px;
          margin-bottom: 10px;
        }

        h1 {
          font-size: 24px;
          color: #007afc;
          margin: 0;
        }

        .section {
          margin-bottom: 24px;
        }

        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #000000;
          border-bottom: 1px solid #e9ecef;
          margin-bottom: 12px;
          padding-bottom: 4px;
        }

        .detail-row {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 10px;
        }

        .detail-label {
          flex: 0 0 150px;
          font-weight: 700;
          color: #495057;
        }

        .detail-value {
          flex: 1;
          color: #212529;
        }

        .footer {
          text-align: center;
          font-size: 13px;
          color: #6c757d;
          border-top: 1px solid #e9ecef;
          padding-top: 20px;
          margin-top: 30px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img class="logo" src="https://res.cloudinary.com/dptujgmbz/image/upload/v1752157999/kynkimdiy5jozaxl4jfe.png" alt="Zevitech" />
          <h1>Design Lead - "Good Luck!"</h1>
        </div>

        <div class="section">
          <div class="section-title">Dailog Lead Details</div>
          <div class="detail-row">
            <div class="detail-label">Submission Date:</div>
            <div class="detail-value"> ${new Date().toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }
            )}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Submission Source:</div>
            <div class="detail-value">Dailog Lead Form</div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Personal Information</div>
          <div class="detail-row">
            <div class="detail-label">Name:</div>
            <div class="detail-value"> ${data.name}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Email: </div>
            <div class="detail-value"> ${data.emailAddress}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Phone: </div>
            <div class="detail-value"> ${data.phoneNumber}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Lead Information: </div>
            <div class="detail-value"> ${data.information}</div>
          </div>
        </div>

        <div class="footer">
          <p>This email was generated automatically by the Zevitech system.</p>
          <p>© ${new Date().getFullYear()} Zevitech. All rights reserved.</p>
        </div>
      </div>
    </body>
  </html>
  `;

  return await SendEmail({
    to: process.env.EMAIL_USER || "zevitech25@gmail.com",
    subject,
    html,
  });
};
