import { safaricomDarajaApi } from "mds-daraja-sdk";
import { NextRequest, NextResponse } from "next/server";

// path to handle stkpush
export async function POST(req: NextRequest) {
  const mpesaUrl = req.url.split("/stk")[0];
  const confirmUrl = `${mpesaUrl}/stk/callback`,
    validationUrl = `${mpesaUrl}/stk/validation`;
  try {
    const { token } = await req.json();
    if (!token || token !== "mimi-mwenyewe") throw Error("No token provided");
    const data = await safaricomDarajaApi.registerUrls(
      confirmUrl,
      validationUrl
    );

    return NextResponse.json({ data, confirmUrl, validationUrl });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
