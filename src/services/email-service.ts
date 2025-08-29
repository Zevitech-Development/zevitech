import { DailogLeadFormType, HomeContactFormType, ContactFormType, NewsletterFormType } from "@/interfaces/forms-interface";
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
          <div class="detail-label">Service: </div>
          <div class="detail-value"> ${data.services}</div>
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

export const SendContactFormEmail = async (data: ContactFormType): Promise<boolean> => {
  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333; text-align: center; margin-bottom: 30px; border-bottom: 2px solid #007bff; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #007bff; margin-bottom: 10px;">Contact Information</h3>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${data.name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${data.email}</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> ${data.phone}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #007bff; margin-bottom: 10px;">Message</h3>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff;">
              <p style="margin: 0; line-height: 1.6;">${data.message}</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px;">This email was sent from your website's contact form.</p>
          </div>
        </div>
      </div>
    `;

    const success = await SendEmail({
      to: "zevitech.official@gmail.com",
      subject: `New Contact Form Submission from ${data.name}`,
      html: htmlContent,
    });

    return success;
  } catch (error) {
    console.error("Error sending contact form email:", error);
    throw error;
  }
};

export const SendNewsletterSubscriptionEmail = async (data: NewsletterFormType) => {
  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-bottom: 20px; text-align: center;">New Newsletter Subscription</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #495057; margin-bottom: 15px;">Subscription Details:</h3>
            
            <div style="margin-bottom: 10px;">
              <strong style="color: #495057;">Email Address:</strong>
              <span style="color: #6c757d; margin-left: 10px;">${data.email}</span>
            </div>
            
            <div style="margin-bottom: 10px;">
              <strong style="color: #495057;">Subscription Date:</strong>
              <span style="color: #6c757d; margin-left: 10px;">${new Date().toLocaleDateString()}</span>
            </div>
            
            <div style="margin-bottom: 10px;">
              <strong style="color: #495057;">Subscription Time:</strong>
              <span style="color: #6c757d; margin-left: 10px;">${new Date().toLocaleTimeString()}</span>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
            <p style="color: #6c757d; margin: 0;">This email was sent from your website's newsletter subscription form.</p>
          </div>
        </div>
      </div>
    `;

    await SendEmail({
      to: process.env.CONTACT_EMAIL || "contact@zevitech.com",
      subject: "New Newsletter Subscription",
      html: htmlContent,
    });
  } catch (error) {
     console.error("Error sending newsletter subscription email:", error);
     throw error;
   }
 };

export const SendHomeContactFormEmail = async (
  data: HomeContactFormType
): Promise<boolean> => {
  const subject = `Zevitech Contact Form: ${data.name}`;

  const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Contact Form Submission</title>
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

        .services-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .service-tag {
          background-color: #007afc;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        .project-description {
          background-color: #f8f9fa;
          padding: 16px;
          border-radius: 8px;
          border-left: 4px solid #007afc;
          margin-top: 8px;
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
          <h1>New Contact Form Submission</h1>
        </div>

        <div class="section">
          <div class="section-title">Submission Details</div>
          <div class="detail-row">
            <div class="detail-label">Submission Date:</div>
            <div class="detail-value">${new Date().toLocaleDateString(
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
            <div class="detail-value">Home Contact Form</div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Contact Information</div>
          <div class="detail-row">
            <div class="detail-label">Name:</div>
            <div class="detail-value">${data.name}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Email:</div>
            <div class="detail-value">${data.email}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Budget:</div>
            <div class="detail-value">${data.budget}</div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Services of Interest</div>
          <div class="services-list">
            ${data.services.map(service => `<span class="service-tag">${service}</span>`).join('')}
          </div>
        </div>

        <div class="section">
          <div class="section-title">Project Description</div>
          <div class="project-description">
            ${data.project}
          </div>
        </div>

        <div class="footer">
          <p>This email was generated automatically by the Zevitech contact form.</p>
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
