import { dbCon } from "@/libs/mongoose/dbCon";
import { mpesaClient } from "@/models/MpesaClient";
import { Transaction } from "@/models/Transaction";
import { NextRequest, NextResponse } from "next/server";

function formatPhone(phone: string): string {
  if (phone.startsWith("07")) {
    return phone.replace(/^0/, "254");
  } else if (phone.startsWith("+254")) {
    return phone.replace("+", "");
  }
  return phone;
}

export async function GET(req: NextRequest) {
  console.log(req);
  await dbCon();
  const data = await Transaction.find();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { phone, amount, productId, productName } = body;

  if (!phone || !amount || !productId || !productName) {
    return NextResponse.json(
      {
        success: false,
        message: "Missing required fields",
      },
      { status: 400 }
    );
  }

  const formattedPhone = formatPhone(phone);

  const callbackUrl = `${
    req.url.split("/product-stk")[0]
  }/product-stk/callback`;

  try {
    const response = await mpesaClient.stkPush({
      phone: formattedPhone,
      amount: 1,
      accountReference: `Product-${productId}`,
      transactionDesc: `Purchase of ${productName}`,
      cbUrl: callbackUrl,
    });

    const transaction = await Transaction.create({
      phone: formattedPhone,
      amount,
      productId,
      productName,
      checkoutRequestID: response.CheckoutRequestID,
      merchantRequestID: response.MerchantRequestID,
      status: "PENDING",
      response: response,
    });
    console.log({ transaction });

    return NextResponse.json({
      success: true,
      message: "STK push sent. Complete payment on your phone.",
      checkoutRequestID: response.CheckoutRequestID,
      transactionId: transaction._id,
    });
  } catch (error: any) {
    console.error("STK Push Error:", {
      message: error.message,
      data: error.response?.data,
      status: error.response?.status,
    });
    return NextResponse.json(
      {
        success: false,
        message: "Failed to initiate STK push",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
