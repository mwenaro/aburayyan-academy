import { safaricomDarajaApi } from "mds-daraja-sdk";
import { NextRequest, NextResponse } from "next/server";

// path to handle stkpush
export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const {success, message, data = {}} = await safaricomDarajaApi.handleTransactionConfirmation(requestBody)

    return NextResponse.json({success,message, data});
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
