// import ConfirmationEmail from "@/app/_components/emails/confirmation";
// import { render } from "@react-email/components";
// import { renderToHTML, renderToHTMLImpl } from "next/dist/server/render";

const nodemailer = require("nodemailer");
type Mailer = (
  to: string,
  subject: string,
  body: string,
  bodyType?: 'html' | 'react' | 'text',
  sender?: string | undefined
) => any;
// const reactBody = renderToHTML(<Email url="https://example.com" />);
// const resolvedReactBody = await reactBody;




export const sendTestEmail: Mailer = async (
  to,
  subject,
  body,
  bodyType = 'text',
  sender = undefined
) => {
  // Create a nodemailer transport object
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",

    port: 587,
    secure: false,
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL_USER,
      pass: process.env.NEXT_PUBLIC_EMAIL_PWD,
    },
    tls: {
      rejectUnauthorized: true  // Set to true in production
  }
  });

  // Define the email message
  const message: {
    from: any;
    to: string | string[];
    subject: string;
    text?: string 
    html?: any;
  } = {
    // from: process.env.NEXT_PUBLIC_EMAIL_USER as string,
    // from: sender? sender: "Mombasa DigitalSolutions<mweroabdalla@gmail.com>",
    from: sender??"EasyTruck <info@easytruck.com>",
    to: Array.isArray(to) ? to.join(", ") : to,
    subject: subject || "Test Email",
    text: body || "Test email text",
  };
  if (['react', 'html'].includes(bodyType)) {
    delete message["text"];
     message["html"] = body;
    // if(bodyType === 'html') message["html"] = body;
    // else message['html'] = resolvedReactBody;
  }

  

  try {
    // Send the email
    const info = await transporter.sendMail(message);
    console.log(`Email sent: ${info.messageId}`);
    return { flag: true, info };
  } catch (error: any) {
    console.error("Error occurred while sending email:", error);
    return { flag: false, msg: error.message };
  }
};

// Call the function to send the test email
// sendTestEmail();
