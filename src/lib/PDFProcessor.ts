import { PDFDocument } from "pdf-lib";

class PDFProcessor {
  private pdfDoc: PDFDocument | null = null;
  private pageCount: number = 0;

  constructor(private filePath: string) {}

  // Load PDF
  public async loadPDF(): Promise<void> {
    const fileBuffer = await this.readFile(this.filePath);
    this.pdfDoc = await PDFDocument.load(fileBuffer);
    this.pageCount = this.pdfDoc.getPageCount();
  }

  // Reorder pages for booklet layout
  public async formatAsBooklet(): Promise<PDFDocument> {
    if (!this.pdfDoc) {
      throw new Error("PDF not loaded. Call `loadPDF` first.");
    }

    const newPdf = await PDFDocument.create();
    const blankPage = newPdf.addPage();

    // Reordering logic
    const totalPages = Math.ceil(this.pageCount / 4) * 4; // Ensure multiple of 4
    for (let i = 0; i < totalPages; i += 4) {
      const pageOrder = [i + 3, i, i + 1, i + 2];
      for (const index of pageOrder) {
        if (index < this.pageCount) {
          const [page] = await newPdf.copyPages(this.pdfDoc, [index]);
          newPdf.addPage(page);
        } else {
          newPdf.addPage(blankPage); // Add blank page if needed
        }
      }
    }

    return newPdf;
  }

  // Save formatted PDF
  public async savePDF(outputPath: string, pdf: PDFDocument): Promise<void> {
    const pdfBytes = await pdf.save();
    const fs = require("fs/promises");
    await fs.writeFile(outputPath, pdfBytes);
  }

  // Helper: Read file
  private async readFile(path: string): Promise<Uint8Array> {
    const fs = require("fs/promises");
    return await fs.readFile(path);
  }
}

export default PDFProcessor;
