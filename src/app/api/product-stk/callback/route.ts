// app/api/mpesa/callback/route.ts
import { dbCon } from "@/libs/mongoose/dbCon";
import { Transaction } from "@/models/Transaction";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  await req.json();
  await dbCon();
  const data = await Transaction.find();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const callback = data.Body?.stkCallback;
  await dbCon();
  if (!callback)
    return NextResponse.json({ error: "Invalid callback" }, { status: 400 });

  const checkoutRequestID = callback.CheckoutRequestID;
  const resultCode = callback.ResultCode;
  const resultDesc = callback.ResultDesc;
  const mpesaReceiptNumber = callback.CallbackMetadata?.Item?.find(
    (item: any) => item.Name === "MpesaReceiptNumber"
  )?.Value;

  try {
    const update = {
      status: resultCode === 0 ? "SUCCESS" : "FAILED",
      resultCode,
      resultDesc,
      mpesaReceiptNumber,
    };

    const trans = await Transaction.findOneAndUpdate(
      { checkoutRequestID },
      update,
      { new: true }
    );
    console.log("from callback ", trans);
    return NextResponse.json({ message: "Callback received" });
  } catch (err: any) {
    console.log("callback, ", err.message);
    return NextResponse.json({ error: "DB update failed" }, { status: 500 });
  }
}
