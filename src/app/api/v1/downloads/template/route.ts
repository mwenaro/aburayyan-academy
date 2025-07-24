import { NextRequest, NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { Document, Packer, Paragraph, TextRun, AlignmentType } from "docx";

interface TemplateRequest {
  studentId: string;
  studentName: string;
  grade: string;
  regno: string;
  type: 'excel' | 'word';
  includeHeader?: boolean; // Optional header flag
}

export async function POST(request: NextRequest) {
  try {
    const body: TemplateRequest = await request.json();
    const { studentName, grade, regno, type, includeHeader = false } = body;

    if (!studentName || !grade || !regno || !type) {
      return NextResponse.json(
        { error: "Missing required fields: studentName, grade, regno, type" },
        { status: 400 }
      );
    }

    const sanitizedName = studentName.replace(/[^a-zA-Z0-9\s]/g, '').trim();
    const fileName = `${sanitizedName}-${grade}-exam-${type === 'excel' ? 'excel' : 'word'}`;

    if (type === 'excel') {
      // Create Excel template
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Template');

      let currentRow = 1;

      // Add header only if requested
      if (includeHeader) {
        worksheet.mergeCells('A1:E1');
        worksheet.getCell('A1').value = 'ABU RAYYAN ACADEMY';
        worksheet.getCell('A1').font = { bold: true, size: 16 };
        worksheet.getCell('A1').alignment = { horizontal: 'center' };

        // Add empty row for spacing
        worksheet.addRow([]);
        currentRow = 3;
      }

      // Don't add any content - keep the template completely blank
      // Remove all the pre-filled content like headers, questions, etc.
      // The template should be empty except for the optional header

      // Generate Excel buffer
      const buffer = await workbook.xlsx.writeBuffer();

      return new NextResponse(buffer as any, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': `attachment; filename="${fileName}.xlsx"`,
        },
      });

    } else if (type === 'word') {
      // Create Word template
      const docChildren = [];

      // Add header only if requested
      if (includeHeader) {
        docChildren.push(
          // School name only
          new Paragraph({
            children: [
              new TextRun({
                text: "ABU RAYYAN ACADEMY",
                bold: true,
                size: 32,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          })
        );
      }

      // Template is completely blank - no questions, no content

      const doc = new Document({
        sections: [
          {
            properties: {},
            children: docChildren,
          },
        ],
      });

      // Generate Word buffer
      const buffer = await Packer.toBuffer(doc);

      return new NextResponse(buffer as any, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'Content-Disposition': `attachment; filename="${fileName}.docx"`,
        },
      });
    }

    return NextResponse.json(
      { error: "Invalid template type. Must be 'excel' or 'word'" },
      { status: 400 }
    );

  } catch (error: any) {
    console.error("Template generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate template: " + error.message },
      { status: 500 }
    );
  }
}
