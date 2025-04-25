import { mpesaClient } from "@/models/MpesaClient";
import { Transaction } from "@/models/Transaction";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { phone, amount, productId, productName } = body;
  // const mpesaUrl = req.url.split("/stk")[0];
  const callbackUrl = `${
    req.url.split("/product-stk")[0]
  }/product-stk/callback`;

  try {
    // Initiate STK Push
    const response = await mpesaClient.stkPush({
      phone,
      amount: 1,
      accountReference: `Product-${productId}`,
      transactionDesc: `Purchase of ${productName}`,
      cbUrl: callbackUrl,
    });

    //   // Save transaction to DB
    //   await Transaction.create({
    //     phone,
    //     amount,
    //     productId,
    //     productName,
    //     checkoutRequestID: response.CheckoutRequestID,
    //     merchantRequestID: response.MerchantRequestID,
    //     status: 'PENDING',
    //     response: response,
    //   });

    //   return NextResponse.json({
    //     success: true,
    //     message: 'STK push sent. Complete payment on your phone.',
    //     checkoutRequestID: response.CheckoutRequestID,
    //   });
    // Save transaction to DB
    const transaction = await Transaction.create({
      phone,
      amount,
      productId,
      productName,
      checkoutRequestID: response.CheckoutRequestID,
      merchantRequestID: response.MerchantRequestID,
      status: "PENDING",
      response: response,
    });

    // Return response including transactionId
    return NextResponse.json({
      success: true,
      message: "STK push sent. Complete payment on your phone.",
      checkoutRequestID: response.CheckoutRequestID,
      transactionId: transaction._id, // 👈 Send it back to frontend
    });
  } catch (error: any) {
    console.error("STK Push Error:", error.response?.data || error.message);
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
