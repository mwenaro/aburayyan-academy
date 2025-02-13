import { BulkyInsertService } from "@/contollers/BulkyInsertService";
import { ExcelService } from "@/contollers/ExcelService";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const table = searchParams.get("table");
    // Parse form data
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Extract data (file is processed in memory, not saved)
    const { headers, data } = await ExcelService.extractData(file);
    let inserted = null;
    if (table) {
      inserted = await BulkyInsertService.insert(table as string, data);
    }
    console.log({ inserted });
    return NextResponse.json({
      message: "File processed successfully",
      headers,
      data,
      table,
    });
  } catch (error: any) {
    console.log({ error: error.message });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
