// lib/mpesa/MpesaClient.ts
import axios, { AxiosInstance } from "axios";
import { config } from "dotenv";
config();

interface MpesaClientOptions {
  shortCode: string;
  consumerKey: string;
  consumerSecret: string;
  passkey: string;
  initiatorName: string;
  initiatorPassword: string;
  environment?: "sandbox" | "production";
}

class MpesaClient {
  private readonly baseUrl: string;
  private readonly auth: { key: string; secret: string };
  private readonly shortCode: string;
  private readonly passkey: string;
  private readonly initiatorName: string;
  private readonly initiatorPassword: string;
  private axios: AxiosInstance;
  private token: string | null = null;

  constructor(private options: MpesaClientOptions) {
    this.auth = {
      key: options.consumerKey,
      secret: options.consumerSecret,
    };

    this.shortCode = options.shortCode;
    this.passkey = options.passkey;
    this.initiatorName = options.initiatorName;
    this.initiatorPassword = options.initiatorPassword;
    this.baseUrl =
      options.environment === "production"
        ? "https://api.safaricom.co.ke"
        : "https://sandbox.safaricom.co.ke";

    this.axios = axios.create({
      baseURL: this.baseUrl,
    });
  }

  private async authenticate() {
    const credentials = Buffer.from(
      `${this.auth.key}:${this.auth.secret}`
    ).toString("base64");

    const response = await axios.get(
      `${this.baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
      {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      }
    );

    this.token = response.data.access_token;
    console.log({ token: this.token });
    this.axios = axios.create({
      baseURL: this.baseUrl,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  private getTimestamp(): string {
    return new Date()
      .toISOString()
      .replace(/[^0-9]/g, "")
      .slice(0, 14);
  }

  private getPassword(timestamp: string): string {
    return Buffer.from(`${this.shortCode}${this.passkey}${timestamp}`).toString(
      "base64"
    );
  }

  private formatPhone(phone: string): string {
    return phone.replace(/^0/, "254");
  }

  async requestStkPush({
    amount,
    phoneNumber,
    accountReference,
    transactionDesc,
    callbackUrl,
  }: {
    amount: number;
    phoneNumber: string;
    accountReference: string;
    transactionDesc: string;
    callbackUrl: string;
  }) {
    if (!this.token) await this.authenticate();

    const timestamp = this.getTimestamp();
    const password = this.getPassword(timestamp);

    const response = await this.axios.post("/mpesa/stkpush/v1/processrequest", {
      BusinessShortCode: this.shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: this.formatPhone(phoneNumber),
      PartyB: this.shortCode,
      PhoneNumber: this.formatPhone(phoneNumber),
      CallBackURL: callbackUrl,
      AccountReference: accountReference,
      TransactionDesc: transactionDesc,
    });

    return response.data;
  }

  async queryStkStatus({ checkoutRequestId }: { checkoutRequestId: string }) {
    if (!this.token) await this.authenticate();

    const timestamp = this.getTimestamp();
    const password = this.getPassword(timestamp);

    const response = await this.axios.post("/mpesa/stkpushquery/v1/query", {
      BusinessShortCode: this.shortCode,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestId,
    });

    return response.data;
  }

  async registerUrls({
    validationUrl,
    confirmationUrl,
    responseType = "Completed",
  }: {
    validationUrl: string;
    confirmationUrl: string;
    responseType?: "Completed" | "Cancelled";
  }) {
    if (!this.token) await this.authenticate();

    const response = await this.axios.post("/mpesa/c2b/v1/registerurl", {
      ShortCode: this.shortCode,
      ResponseType: responseType,
      ConfirmationURL: confirmationUrl,
      ValidationURL: validationUrl,
    });

    return response.data;
  }

  async simulateC2B({
    phoneNumber,
    amount,
    billRefNumber,
  }: {
    phoneNumber: string;
    amount: number;
    billRefNumber: string;
  }) {
    if (!this.token) await this.authenticate();

    const response = await this.axios.post("/mpesa/c2b/v1/simulate", {
      ShortCode: this.shortCode,
      CommandID: "CustomerPayBillOnline",
      Amount: amount,
      Msisdn: this.formatPhone(phoneNumber),
      BillRefNumber: billRefNumber,
    });

    return response.data;
  }

  async checkAccountBalance(callbackUrl: string) {
    if (!this.token) await this.authenticate();

    const response = await this.axios.post("/mpesa/accountbalance/v1/query", {
      Initiator: this.initiatorName,
      SecurityCredential: this.initiatorPassword,
      CommandID: "AccountBalance",
      PartyA: this.shortCode,
      IdentifierType: "4",
      Remarks: "Balance Request",
      QueueTimeOutURL: callbackUrl,
      ResultURL: callbackUrl,
    });

    return response.data;
  }

  async reverseTransaction({
    transactionId,
    amount,
    callbackUrl,
    remarks,
  }: {
    transactionId: string;
    amount: number;
    callbackUrl: string;
    remarks: string;
  }) {
    if (!this.token) await this.authenticate();

    const response = await this.axios.post("/mpesa/reversal/v1/request", {
      Initiator: this.initiatorName,
      SecurityCredential: this.initiatorPassword,
      CommandID: "TransactionReversal",
      TransactionID: transactionId,
      Amount: amount,
      ReceiverParty: this.shortCode,
      ReceiverIdentifierType: "11",
      ResultURL: callbackUrl,
      QueueTimeOutURL: callbackUrl,
      Remarks: remarks,
      Occasion: remarks,
    });

    return response.data;
  }

  handleValidation = (reqBody: any) => {
    console.log("VALIDATION:", reqBody);
    return { ResultCode: 0, ResultDesc: "Accepted" };
  };

  handleConfirmation = (reqBody: any) => {
    console.log("CONFIRMATION:", reqBody);
    // Save to DB, notify, etc.
    return { ResultCode: 0, ResultDesc: "Received successfully" };
  };
}

// ✅ Export instance using environment variables
// const mpesa = new MpesaClient({
//   shortCode: process.env.MPESA_SHORTCODE!,
//   consumerKey: process.env.MPESA_CONSUMER_KEY!,
//   consumerSecret: process.env.MPESA_CONSUMER_SECRET!,
//   passkey: process.env.MPESA_PASSKEY!,
//   initiatorName: process.env.MPESA_INITIATOR_NAME!,
//   initiatorPassword: process.env.MPESA_INITIATOR_PASSWORD!,
//   environment: process.env.MPESA_ENV === 'production' ? 'production' : 'sandbox',
// });

export const mpesaClient = new MpesaClient({
  consumerKey: process.env.DARAJA_API_CONSUMER_KEY!,
  consumerSecret: process.env.DARAJA_API_CONSUMER_SECRET!,
  shortCode: process.env.DARAJA_API_BUSINESS_SHORT_CODE!,
  passkey: process.env.DARAJA_API_PASSKEY!,
  initiatorName: process.env.DARAJA_API_INITIATOR_NAME!,
  initiatorPassword: process.env.DARAJA_API_INITIATOR_PASSWORD!,
  environment: "test" !== "test" ? "production" : "sandbox",
  // : "https://api.safaricom.co.ke", // change for live
  //   callbackBaseUrl: process.env.DARAJA_API_CALLBACK_URL!,
});
