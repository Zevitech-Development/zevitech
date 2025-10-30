import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface PaymentData {
  orderID: string;
  payerID: string;
  paymentID: string;
  fullName: string;
  email: string;
  phone: string;
  category: string;
  categoryName: string;
  plan: string;
  price: string;
  description: string;
  features: string;
  badge?: string;
}

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: parseInt(process.env.EMAIL_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Generate order ID
const generateOrderId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `ZVT-${timestamp}-${random}`;
};

// Send customer receipt email
const sendCustomerReceipt = async (data: PaymentData, orderId: string) => {
  const transporter = createTransporter();

  const features = JSON.parse(data.features);
  const featuresHtml = features
    .map((feature: string) => `<li>${feature}</li>`)
    .join("");

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: data.email,
    subject: `Payment Confirmation - Order #${orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Payment Confirmation</h2>
        <p>Dear ${data.fullName},</p>
        <p>Thank you for your purchase! Your payment has been successfully processed.</p>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Order Details</h3>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Service:</strong> ${data.categoryName}</p>
          <p><strong>Plan:</strong> ${data.plan} ${
      data.badge ? `(${data.badge})` : ""
    }</p>
          <p><strong>Price:</strong> $${data.price}</p>
          <p><strong>Description:</strong> ${data.description}</p>
          
          <h4>Features Included:</h4>
          <ul>${featuresHtml}</ul>
        </div>

        <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2d5a2d; margin-top: 0;">What's Next?</h3>
          <p>Our team will contact you within 24 hours to begin your project. Please keep this email for your records.</p>
        </div>

        <p>If you have any questions, please don't hesitate to contact us.</p>
        <p>Best regards,<br>Zevitech Team</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Send business notification email
const sendBusinessNotification = async (data: PaymentData, orderId: string) => {
  const transporter = createTransporter();

  const features = JSON.parse(data.features);
  const featuresHtml = features
    .map((feature: string) => `<li>${feature}</li>`)
    .join("");

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.BUSINESS_EMAIL || process.env.EMAIL_USER,
    subject: `New Order Received - #${orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Order Received</h2>
        <p>A new order has been placed and payment has been confirmed.</p>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Order Details</h3>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>PayPal Order ID:</strong> ${data.orderID}</p>
          <p><strong>Service:</strong> ${data.categoryName}</p>
          <p><strong>Plan:</strong> ${data.plan} ${
      data.badge ? `(${data.badge})` : ""
    }</p>
          <p><strong>Price:</strong> $${data.price}</p>
          <p><strong>Description:</strong> ${data.description}</p>
          
          <h4>Features Included:</h4>
          <ul>${featuresHtml}</ul>
        </div>

        <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #856404; margin-top: 0;">Customer Information</h3>
          <p><strong>Name:</strong> ${data.fullName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
        </div>

        <p><strong>Action Required:</strong> Please contact the customer within 24 hours to begin the project.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Send onboarding email
const sendOnboardingEmail = async (data: PaymentData, orderId: string) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: data.email,
    subject: `Welcome to Zevitech - Let's Get Started!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome to Zevitech!</h2>
        <p>Dear ${data.fullName},</p>
        <p>Welcome to the Zevitech family! We're excited to work with you on your ${data.categoryName.toLowerCase()} project.</p>
        
        <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1565c0; margin-top: 0;">Your Project Journey</h3>
          <ol style="color: #333;">
            <li><strong>Initial Consultation</strong> - Our team will contact you within 24 hours</li>
            <li><strong>Design Brief</strong> - We'll discuss your requirements and preferences</li>
            <li><strong>Concept Development</strong> - Our designers will create initial concepts</li>
            <li><strong>Revisions & Refinement</strong> - We'll perfect your design based on your feedback</li>
            <li><strong>Final Delivery</strong> - You'll receive all files in various formats</li>
          </ol>
        </div>

        <div style="background-color: #f3e5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #7b1fa2; margin-top: 0;">What We Need From You</h3>
          <p>To ensure we create the perfect design for you, please prepare:</p>
          <ul>
            <li>Your brand/company name and tagline (if any)</li>
            <li>Industry and target audience information</li>
            <li>Color preferences or brand guidelines</li>
            <li>Any inspiration or reference materials</li>
            <li>Specific requirements or must-have elements</li>
          </ul>
        </div>

        <p>Our project manager will reach out to you soon to schedule your consultation call.</p>
        <p>Thank you for choosing Zevitech. We can't wait to bring your vision to life!</p>
        <p>Best regards,<br>The Zevitech Team</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export async function POST(request: NextRequest) {
  try {
    const data: PaymentData = await request.json();

    // Validate required fields
    if (!data.orderID || !data.fullName || !data.email || !data.phone) {
      return NextResponse.json(
        { error: "Missing required payment data" },
        { status: 400 }
      );
    }

    // Generate internal order ID
    const orderId = generateOrderId();

    // Send emails
    await Promise.all([
      sendCustomerReceipt(data, orderId),
      sendBusinessNotification(data, orderId),
      sendOnboardingEmail(data, orderId),
    ]);

    return NextResponse.json({
      success: true,
      orderId,
      message: "Payment processed successfully",
    });
  } catch (error) {
    console.error("Payment processing error:", error);
    return NextResponse.json(
      { error: "Failed to process payment" },
      { status: 500 }
    );
  }
}
