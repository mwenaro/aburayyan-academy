import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function POST(req: Request) {
  try {
    const { columns, title } = await req.json();
    // console.log({ columns, title });
    if (!Array.isArray(columns) || columns.length === 0) {
      return NextResponse.json(
        { error: "Invalid fields array" },
        { status: 400 }
      );
    }

    // Create an empty worksheet and manually insert the title in the first row
    const worksheetData: any[] = [];

    // Add title row
    worksheetData.push([title]); // Row 1

    // Add empty row to separate title and headers
    worksheetData.push([]);

    // Add headers row
    worksheetData.push(columns);

    // Convert data to worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Adjust column widths (Optional)
    worksheet["!cols"] = columns.map(() => ({ wch: 20 })); // Set width of columns

    // Create workbook and append worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `${title} Sheet`);

    // Generate Excel buffer
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    });

    return new Response(excelBuffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${title}-bulk-insert-${new Date().toDateString()}.xlsx"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
