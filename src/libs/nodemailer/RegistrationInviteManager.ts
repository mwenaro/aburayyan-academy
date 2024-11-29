import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import {
  RegistrationInvitation,
  IRegistrationInvitation,
} from "@/models/RegistrationInvite";
import { dbCon } from "@/libs/mongoose/dbCon";

export class RegistrationInviteManager {
  private transporter;

  constructor() {
    // Initialize Nodemailer transporter
    this.transporter = nodemailer.createTransport({
      host: "mail.aburayyanacademy.com",
      port: 587,
      secure: false,
      auth: {
        user: "system@aburayyanacademy.com",
        pass: "=[hMoF_O)5XZ",
      },
    });
  }

  /**
   * Generates a hashed code for the registration link.
   * @returns The hashed code for the registration link
   */
  private async generateUniqueCode(): Promise<string> {
    try {
      const uniqueId = `${Date.now()}-${Math.random()}`; // Combine timestamp and random number for uniqueness
      const saltRounds = 10; // Number of bcrypt salt rounds
      const hashedCode = await bcrypt.hash(uniqueId, saltRounds);
      return hashedCode.replace(/\//g, "-"); // Replace forward slashes to ensure URL safety
    } catch (error) {
      console.error("Error generating unique code:", error);
      throw new Error("Failed to generate a unique registration code.");
    }
  }

  /**
   * Creates a new registration invitation and sends the email.
   * @param name - Recipient's name
   * @param email - Recipient's email
   * @returns The created invitation document
   */
  async createAndSendInvite(
    name: string,
    email: string,
    baseUrl: string
  ): Promise<IRegistrationInvitation> {
    await dbCon();
    try {
      const uniqueCode = await this.generateUniqueCode();
      const link = `${baseUrl}/sel-registration/${uniqueCode}`;
    
      const invite = new RegistrationInvitation({ name, email, link });
      await invite.save();

      try {
        await this.sendEmail(name, email, link);
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        // Optionally clean up the invite if the email fails
        await invite.deleteOne();
        throw new Error(
          "Failed to send the registration email. Please try again."
        );
      }

      return invite;
    } catch (error) {
      console.error("Error creating and sending invite:", error);
      throw new Error("Failed to create the registration invitation.");
    }
  }

  /**
   * Sends the registration invitation email.
   * @param name - Recipient's name
   * @param email - Recipient's email
   * @param fullLink - Registration link
   */
  private async sendEmail(
    name: string,
    email: string,
    fullLink: string
  ): Promise<void> {
    try {
      const mailOptions = {
        from: '"Aburayyan Academy" <system@aburayyanacademy.com>',
        to: email,
        subject: "Complete Your Registration",
        html: `
                    <p>Hi ${name},</p>
                    <p>Please click the link below to complete your registration:</p>
                    <a href="${fullLink}" target="_blank">${fullLink}</a>
                    <p>This link will expire in one week.</p>
                    <p>Thank you!</p>
                `,
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send the email. Please try again.");
    }
  }

  /**
   * Confirms if an invitation is valid (not expired) and matches the hashed link.
   * @param link - Registration link
   * @returns The confirmed invitation document if valid
   */
  async confirmInvitation(
    link: string
  ): Promise<IRegistrationInvitation | null> {
    await dbCon();
    try {
      const [baseUrl] = link.split("/sel-registration");
      const hashedCode = link
        .replace(`${baseUrl}/sel-registration/`, "")
        .replace(/-/g, "/"); // Reverse URL-safe transformation
     
      const invite = await RegistrationInvitation.findOne({ link });
      if (!invite) {
        throw new Error("Invalid or expired invitation.");
      }

      const isValid = await bcrypt.compare(hashedCode, invite.link);
      if (!isValid) {
        throw new Error("Invalid registration link.");
      }

      if (new Date() > invite.expiresAt) {
        await invite.deleteOne(); // Clean up expired invite
        throw new Error("This invitation has expired.");
      }

      return invite;
    } catch (error) {
      console.error("Error confirming invitation:", error);
      throw new Error("Failed to confirm the registration invitation.");
    }
  }
}

export const registrationInviteManager = new RegistrationInviteManager();
