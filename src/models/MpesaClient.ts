import axios from "axios";
import moment from "moment";

interface MpesaClientConfig {
  consumerKey: string;
  consumerSecret: string;
  shortCode: string;
  passkey: string;
  initiatorName: string;
  securityCredential: string;
  baseUrl: string;
  callbackBaseUrl: string;
}

interface StkPushParams {
  phone: string;
  amount: number;
  accountReference: string;
  transactionDesc: string;
  cbUrl?: any;
}

interface RegisterUrlsParams {
  validationUrl: string;
  confirmationUrl: string;
}

interface SimulateC2BParams {
  phone: string;
  amount: number;
  billRefNumber?: string;
}

interface QueryStkStatusParams {
  checkoutRequestID: string;
}

export class MpesaClient {
  private consumerKey: string;
  private consumerSecret: string;
  private shortCode: string;
  private passkey: string;
  //   private initiatorName: string;
  //   private securityCredential: string;
  private baseUrl: string;
  private callbackBaseUrl: string;

  constructor({
    consumerKey,
    consumerSecret,
    shortCode,
    passkey,
    // initiatorName,
    // securityCredential,
    baseUrl,
    callbackBaseUrl,
  }: MpesaClientConfig) {
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
    this.shortCode = shortCode;
    this.passkey = passkey;
    // this.initiatorName = initiatorName;
    // this.securityCredential = securityCredential;
    this.baseUrl = baseUrl;
    this.callbackBaseUrl = callbackBaseUrl;
  }

  async getAccessToken(): Promise<string> {
    const auth = Buffer.from(
      `${this.consumerKey}:${this.consumerSecret}`
    ).toString("base64");
    try {
      const response = await axios.get(
        `${this.baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
        {
          headers: {
            Authorization: `Basic ${auth}`,
          },
        }
      );
      return response.data.access_token;
    } catch (error) {
      console.error("Error fetching access token:", error);
      throw error;
    }
  }

  async stkPush({
    phone,
    amount,
    accountReference,
    transactionDesc,
    cbUrl,
  }: StkPushParams): Promise<any> {
    const timestamp = moment().format("YYYYMMDDHHmmss");
    const password = Buffer.from(
      `${this.shortCode}${this.passkey}${timestamp}`
    ).toString("base64");

    const accessToken = await this.getAccessToken();

    const payload = {
      BusinessShortCode: this.shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: this.shortCode,
      PhoneNumber: phone,
      CallBackURL: cbUrl ?? `${this.callbackBaseUrl}/api/mpesa/callback`,
      AccountReference: accountReference,
      TransactionDesc: transactionDesc,
    };

    try {
      const response = await axios.post(
        `${this.baseUrl}/mpesa/stkpush/v1/processrequest`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error during STK push:", error);
      throw error;
    }
  }

  async registerUrls({
    validationUrl,
    confirmationUrl,
  }: RegisterUrlsParams): Promise<any> {
    const accessToken = await this.getAccessToken();

    const payload = {
      ShortCode: this.shortCode,
      ResponseType: "Completed",
      ConfirmationURL: confirmationUrl,
      ValidationURL: validationUrl,
    };

    try {
      const response = await axios.post(
        `${this.baseUrl}/mpesa/c2b/v1/registerurl`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error registering URLs:", error);
      throw error;
    }
  }

  async simulateC2B({
    phone,
    amount,
    billRefNumber = "account",
  }: SimulateC2BParams): Promise<any> {
    const accessToken = await this.getAccessToken();

    const payload = {
      ShortCode: this.shortCode,
      CommandID: "CustomerPayBillOnline",
      Amount: amount,
      Msisdn: phone,
      BillRefNumber: billRefNumber,
    };

    try {
      const response = await axios.post(
        `${this.baseUrl}/mpesa/c2b/v1/simulate`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error simulating C2B:", error);
      throw error;
    }
  }

  async queryStkStatus({
    checkoutRequestID,
  }: QueryStkStatusParams): Promise<any> {
    const timestamp = moment().format("YYYYMMDDHHmmss");
    const password = Buffer.from(
      `${this.shortCode}${this.passkey}${timestamp}`
    ).toString("base64");

    const accessToken = await this.getAccessToken();

    const payload = {
      BusinessShortCode: this.shortCode,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestID,
    };

    try {
      const response = await axios.post(
        `${this.baseUrl}/mpesa/stkpushquery/v1/query`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error querying STK status:", error);
      throw error;
    }
  }
}

// consumerKey: string = process.env.DARAJA_API_CONSUMER_KEY!,
//     consumerSecret: string = process.env.DARAJA_API_CONSUMER_SECRET!,
//     businessShortCode: string = process.env.DARAJA_API_BUSINESS_SHORT_CODE!,
//     passkey: string = process.env.DARAJA_API_PASS_KEY!
export const mpesaClient = new MpesaClient({
  consumerKey: process.env.DARAJA_API_CONSUMER_KEY!,
  consumerSecret: process.env.DARAJA_API_CONSUMER_SECRET!,
  shortCode: process.env.DARAJA_API_BUSINESS_SHORT_CODE!,
  passkey: process.env.DARAJA_API_PASSKEY!,
  initiatorName: process.env.DARAJA_API_INITIATOR_NAME!,
  securityCredential: process.env.DARAJA_API_SECURITY_CREDENTIAL!,
  baseUrl:
    // process.env.NODE_ENV !== "production"
    "https://sandbox.safaricom.co.ke",
  //   : "https://api.safaricom.co.ke", // change for live
  callbackBaseUrl: process.env.DARAJA_API_CALLBACK_URL!,
});
