import { ExcelService } from "@/contollers/ExcelService";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    // Parse form data
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Extract data (file is processed in memory, not saved)
    const { headers, data } = await ExcelService.extractData(file);

    return NextResponse.json({
      message: "File processed successfully",
      headers,
      data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
