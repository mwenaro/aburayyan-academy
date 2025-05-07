import { v4 as uuidv4 } from "uuid";
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
      host: "dx3b.rcnoc.com",
      port: 587,
      secure: false,
      auth: {
        user: "accout-creation@aburayyanacademy.com",
        pass: "Ac@password",
      },
      tls: {
        rejectUnauthorized: false, // <- allows self-signed certs
      },
    });
  }

  /**
   * Generates a hashed code for the registration link.
   * @returns The hashed code for the registration link
   */
  private async generateUniqueCode(): Promise<string> {
    try {
      const token = uuidv4(); // Secure plain token
      const hashedToken = await bcrypt.hash(token, 10);
      return hashedToken;
    } catch (error) {
      console.error("Error generating unique code:", error);
      throw new Error("Failed to generate a unique registration code.");
    }
  }

  async createAndSendInvite2(name: string, email: string, baseUrl: string) {
    await dbCon();

    const token = await this.generateUniqueCode();
    const fullLink = `${baseUrl}/sel-registration/${token}`;

    try {
      await this.sendEmail(name, email, fullLink);
    } catch (emailError) {
      throw new Error("Failed to send registration email.");
    }

    const invite = new RegistrationInvitation({
      name,
      email,
      token,
    });

    try {
      await invite.save();
      return invite;
    } catch (saveError) {
      throw new Error("Failed to save registration invite.");
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
        from: '"Aburayyan Academy" <account-creation@aburayyanacademy.com>',
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

  async confirmInvitation(token: string): Promise<IRegistrationInvitation> {
    await dbCon();

    const invites = await RegistrationInvitation.find(); // Scan all invites
    const matchedInvite = await Promise.any(
      invites.map(async (invite) => {
        const isMatch = await bcrypt.compare(token, invite.token);
        return isMatch ? invite : Promise.reject();
      })
    ).catch(() => null);

    if (!matchedInvite) {
      throw new Error("Invalid or expired invitation.");
    }

    if (new Date() > matchedInvite.expiresAt) {
      await matchedInvite.deleteOne();
      throw new Error("This invitation has expired.");
    }

    return matchedInvite;
  }

  // remove confired invitation
  async removeConfirmedInvites(id: string) {
    await RegistrationInvitation.findByIdAndDelete(id);
  }
}

export const registrationInviteManager = new RegistrationInviteManager();
