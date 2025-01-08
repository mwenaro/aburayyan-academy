import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
import fs from "fs/promises";
import path from "path";

// Utility: Save uploaded file
async function saveFile(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadDir = path.join(process.cwd(), "uploads");
  await fs.mkdir(uploadDir, { recursive: true }); // Ensure directory exists
  const filePath = path.join(uploadDir, file.name);
  await fs.writeFile(filePath, buffer as any);
  return filePath;
}

// Utility: Format PDF into booklet
async function formatAsBooklet(filePath: string): Promise<Buffer> {
  const existingPdf = await fs.readFile(filePath);
  const pdfDoc = await PDFDocument.load(existingPdf as any);

  const newPdf = await PDFDocument.create();
  newPdf
  const blankPage = newPdf.addPage();
  const totalPages = Math.ceil(pdfDoc.getPageCount() / 4) * 4;

  for (let i = 0; i < totalPages; i += 4) {
    const pageOrder = [i + 3, i, i + 1, i + 2];
    for (const index of pageOrder) {
      if (index < pdfDoc.getPageCount()) {
        const [page] = await newPdf.copyPages(pdfDoc, [index]);
        newPdf.addPage(page);
      } else {
        newPdf.addPage(blankPage);
      }
    }
  }

  return Buffer.from(await newPdf.save());
}

// API Route Handler
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "File not provided" }, { status: 400 });
    }

    const filePath = await saveFile(file);
    const formattedPDF = await formatAsBooklet(filePath);

    // Clean up the uploaded file
    await fs.unlink(filePath);

    return new NextResponse(formattedPDF, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="booklet.pdf"',
      },
    });
  } catch (error) {
    console.error("Error formatting PDF:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
