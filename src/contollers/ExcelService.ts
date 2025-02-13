import * as XLSX from "xlsx";

export class ExcelService {
  /**
   * Generates an Excel file with a title in row 1 and headers in row 3.
   */
  static generateExcel(title: string, columns: string[]) {
    if (!Array.isArray(columns) || columns.length === 0) {
      throw new Error("Invalid fields array");
    }

    const worksheetData: any[] = [];

    // Add title row (Row 1)
    worksheetData.push([title]);

    // Add empty row (Row 2) for spacing
    worksheetData.push([]);

    // Add headers (Row 3)
    worksheetData.push(columns);

    // Convert data to worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Adjust column widths (Optional)
    worksheet["!cols"] = columns.map(() => ({ wch: 20 }));

    // Create workbook and append worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `${title} Sheet`);

    // Generate Excel buffer
    return XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
  }

  /**
   * Generates an Excel file with a title in row 1, headers in row 3,
   * and includes default values as additional columns. If any value in defaultData is an array,
   * creates multiple rows equal to the maximum array length, populating values accordingly.
   */
  static generateExcelWidthDefaultColumns(
    title: string,
    columns: string[],
    defaultData: Record<string, any>
  ) {
    if (!Array.isArray(columns) || columns.length === 0) {
      throw new Error("Invalid fields array");
    }

    const worksheetData: any[] = [];

    // Add title row (Row 1)
    worksheetData.push([title]);

    // Add empty row (Row 2) for spacing
    worksheetData.push([]);

    // Extract default data keys
    const defaultKeys = Object.keys(defaultData);

    // Determine max length of array values in defaultData
    const maxRows = Math.max(
      1,
      ...defaultKeys.map((key) =>
        Array.isArray(defaultData[key]) ? defaultData[key].length : 1
      )
    );

    // Add headers (Row 3) with default keys included first
    worksheetData.push([...defaultKeys, ...columns]);

    // Generate row data with default values first
    for (let i = 0; i < maxRows; i++) {
      const defaultValues = defaultKeys.map((key) => {
        const value = defaultData[key];
        return Array.isArray(value) ? value[i] ?? "" : value;
      });
      const rowData = columns.map(() => ""); // Empty row for main columns
      worksheetData.push([...defaultValues, ...rowData]);
    }

    // Convert data to worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Adjust column widths (Optional)
    worksheet["!cols"] = [...defaultKeys, ...columns].map(() => ({ wch: 20 }));

    // Create workbook and append worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `${title} Sheet`);

    // Generate Excel buffer
    return XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
  }

  /**
   * Generates an Excel file with a title in row 1, headers in row 3,
   * and includes default values as additional columns.
   */
  static generateExcelWidthDefaultColumns2(
    title: string,
    columns: string[],
    defaultData: Record<string, any>
  ) {
    if (!Array.isArray(columns) || columns.length === 0) {
      throw new Error("Invalid fields array");
    }

    const worksheetData: any[] = [];

    // Add title row (Row 1)
    worksheetData.push([title]);

    // Add empty row (Row 2) for spacing
    worksheetData.push([]);

    // Extract default data keys
    const defaultKeys = Object.keys(defaultData);

    // Add headers (Row 3) with default keys included first
    worksheetData.push([...defaultKeys, ...columns]);

    // Generate row data with default values first
    const defaultValues = defaultKeys.map((key) => defaultData[key]); // Values from defaultData
    const rowData = columns.map(() => ""); // Empty row for main columns
    worksheetData.push([...defaultValues, ...rowData]);

    // Convert data to worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Adjust column widths (Optional)
    worksheet["!cols"] = [...defaultKeys, ...columns].map(() => ({ wch: 20 }));

    // Create workbook and append worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `${title} Sheet`);

    // Generate Excel buffer
    return XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
  }

  /**
   * Extracts data from an uploaded Excel file and converts it into JSON objects.
   */

  static async extractData(file: File) {
    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Read workbook
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0]; // Read first sheet
    const sheet = workbook.Sheets[sheetName];

    // Convert sheet to array
    const rows: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Ensure the file has at least 3 rows
    if (rows.length < 3) {
      throw new Error(
        "Excel file must have at least 3 rows (title, headers, data)."
      );
    }

    // Extract headers from row 3 (index 2)
    const headers = rows[2].map((h: any) => h.toString().trim());

    // Extract data starting from row 4 (index 3)
    const formattedData = rows
      .slice(3)
      .map((row) =>
        Object.fromEntries(
          headers.map((key: any, index: any) => [key, row[index] || ""])
        )
      );

    return {
      headers,
      data: formattedData,
    };
  }
}
