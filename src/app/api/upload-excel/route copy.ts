import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { writeFile } from "fs/promises";
import { join } from "path";
import { mkdir } from "fs";

export async function POST(req: Request) {
  try {
    // Parse form data
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Read file as ArrayBuffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure uploads directory exists
    const uploadDir = join(process.cwd(), "public/uploads");
    await new Promise((resolve) => mkdir(uploadDir, { recursive: true }, resolve));

    // Save file to disk
    const filePath = join(uploadDir, file.name);
    await writeFile(filePath, buffer as any);

    // Parse Excel file
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0]; // Read first sheet
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    return NextResponse.json({
      message: "File uploaded successfully",
      data: jsonData, // Return extracted JSON
      filePath: `/uploads/${file.name}`,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process file" }, { status: 500 });
  }
}
