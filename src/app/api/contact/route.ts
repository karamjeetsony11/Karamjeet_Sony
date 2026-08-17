import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Simple validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "All fields (name, email, subject, message) are required.",
        },
        { status: 400 },
      );
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpSecure = process.env.SMTP_SECURE !== "false"; // Default to secure (true)
    const receiverEmail =
      process.env.CONTACT_RECEIVER_EMAIL || "erkaramjeetsony11@gmail.com";

    // If SMTP credentials are not configured, run in Simulation Mode
    if (!smtpUser || !smtpPass) {
      console.log("==========================================");
      console.log("📬 CONTACT FORM SUBMISSION (SIMULATION MODE)");
      console.log(`From: ${name} <${email}>`);
      console.log(`Subject: ${subject}`);
      console.log(`Date: ${new Date().toLocaleString()}`);
      console.log("------------------------------------------");
      console.log(message);
      console.log("==========================================");
      console.log(
        "💡 TIP: Define SMTP_USER, SMTP_PASS, and CONTACT_RECEIVER_EMAIL in .env.local to send real emails.",
      );

      return NextResponse.json({
        success: true,
        simulated: true,
        message:
          "Submission received in local simulation mode. Configure .env.local to send actual emails.",
      });
    }

    // Configure SMTP transport
    const transporter = nodemailer.createTransport({
      host: smtpHost || "smtp.gmail.com",
      port: parseInt(smtpPort || "465"),
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Email options
    const mailOptions = {
      from: `"${name}" <${smtpUser}>`, // SMTP servers like Gmail often rewrite the 'from' to match SMTP_USER anyway
      to: receiverEmail,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: `You received a message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #F5A623; border-bottom: 2px solid #F5A623; padding-bottom: 10px;">New Portfolio Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #ccc; white-space: pre-wrap;">
            ${message.replace(/\n/g, "<br>")}
          </div>
          <hr style="border: 0; border-top: 1px solid #eee; margin-top: 30px;" />
          <p style="font-size: 11px; color: #999;">Sent from Karamjeet Sony's Portfolio Contact Form.</p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      simulated: false,
      message: "Your message has been successfully transmitted.",
    });
  } catch (error: unknown) {
    console.error("Error in contact route handler:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to transmit message.";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}
