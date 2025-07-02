import { generateAdminNotificationTemplate } from "./email-templates";
const nodemailer = require("nodemailer");

// Configure the Nodemailer transporter with correct SSL/TLS settings
const transporter = nodemailer.createTransport({
  host: "mail.aburayyanacademy.com",
  port: 465, // SSL/TLS recommended
  secure: true, // Use SSL
  auth: {
    user: "system@aburayyanacademy.com",
    pass: "Pwd@1211email",
  },
});

// Send admin notification function
export async function sendAdminNotification(
  studentDetails: string,
  guardianDeatils: string | null,
  totalNoStudents: any,
  url: string
): Promise<void> {
  const subject: string = "New User Registration Notification"; // Declare subject type
  const registrationDate: string = new Date().toLocaleDateString(); // Declare registrationDate type

  // Generate dynamic email template
  const emailTemplate: string = generateAdminNotificationTemplate(
    studentDetails,
    guardianDeatils,
    registrationDate,
    totalNoStudents,
    url
  );

  try {
    await transporter.sendMail({
      from: '"ICT Aburayyan Academy" <system@aburayyanacademy.com>',
      to: "mweroabdalla@gmail.com", // Admin email
      subject: subject,
      html: emailTemplate, // Dynamic HTML template
    });
    console.log("Admin notification email sent successfully");
  } catch (error: any) {
    console.log("Error sending admin notification email: ", error.message);
    throw new Error("Email could not be sent: " + error.message);
  }
}
