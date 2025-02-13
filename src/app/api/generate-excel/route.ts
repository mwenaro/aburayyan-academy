import { ExcelService } from "@/contollers/ExcelService";
import { NextResponse } from "next/server";
// import * as XLSX from "xlsx";

export async function POST(req: Request) {
  try {
    const { columns, title, defaultData } = await req.json();
    // console.log({ columns, title });
    if (!Array.isArray(columns) || columns.length === 0) {
      return NextResponse.json(
        { error: "Invalid fields array" },
        { status: 400 }
      );
    }
    const excelBuffer =Object.keys(defaultData).length? ExcelService.generateExcelWidthDefaultColumns(title, columns,defaultData):ExcelService.generateExcel(title, columns);

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
