import { safaricomDarajaApi } from "mds-daraja-sdk";
import { NextRequest, NextResponse } from "next/server";

// path to handle stkpush
export async function POST(req: NextRequest) {
  const mpesaUrl = req.url.split("/stk")[0];
  const confirmUrl = `${mpesaUrl}/stk/callback`;
  try {
    const { phone, amount } = await req.json();
    const data = await safaricomDarajaApi.intiateC2bStkPush(
      phone,
      amount,
      confirmUrl
    );

    return NextResponse.json({ sucess: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
