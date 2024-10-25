const nodemailer = require("nodemailer");

type Mailer = (
  to: string | string[],
  subject: string,
  body: string,
  isHTML?: boolean,
  sender?: string
) => Promise<{ flag: boolean, info?: any, msg?: string }>;

export const sendTestEmail: Mailer = async (
  to,
  subject,
  body,
  isHTML = false,
  sender = "EasyTruck <info@easytruck.com>"
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL_USER,
      pass: process.env.NEXT_PUBLIC_EMAIL_PWD,
    },
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === "production",
    },
  });

  let message : {from:string, to:string, subject:string, text?:string, html?:string} = {
    from: sender,
    to: Array.isArray(to) ? to.join(", ") : to,
    subject: subject || "Test Email",
  };

  if (isHTML) {
    message["html"] = body;
    message = {...message, html: body };
  } 

  try {
    const info = await transporter.sendMail(message);
    console.log(`Email sent: ${info.messageId}`);
    return { flag: true, info };
  } catch (error:any) {
    console.error("Error occurred while sending email:", error.message);
    return { flag: false, msg: error.message };
  }
};

// Call the function to send the test email
// sendTestEmail("recipient@example.com", "Test Subject", "Test Body", true);