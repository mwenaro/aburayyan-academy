"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { FileDown, FileText, FileSpreadsheet, Download } from "lucide-react";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface ReportData {
  examId: string;
  examName: string;
  examTerm: number;
  examYear: number;
  school: any;
  testingAreaId: string;
  testingAreaName: string;
  subject: any;
  class: any;
  teacher: any;
  dueDate: string;
  dateDone?: string;
  status: "DONE" | "PENDING";
  outOf: number;
  statistics: {
    totalStudents: number;
    averageScore: number;
    averagePercentage: number;
    highestScore: number;
    lowestScore: number;
    passedStudents: number;
    passRate: number;
    gradeDistribution: {
      "E.E": number;
      "M.E": number;
      "A.E": number;
      "B.E": number;
      // Legacy grades for backward compatibility
      E: number;
      M: number;
      A: number;
      B: number;
    };
  };
  marks: any[];
}

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: ReportData[];
}

export function ExportDialog({ open, onOpenChange, data }: ExportDialogProps) {
  const [exportFormat, setExportFormat] = useState("pdf");
  const [includeStudentMarks, setIncludeStudentMarks] = useState(true);
  const [includeStatistics, setIncludeStatistics] = useState(true);
  const [includeCharts, setIncludeCharts] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const generateFileName = () => {
    const timestamp = new Date().toISOString().split("T")[0];
    return `exam-reports-${timestamp}`;
  };

  const exportToPDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.width;
    let yPosition = 20;

    // Title
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.text("Exam Reports", pageWidth / 2, yPosition, { align: "center" });
    yPosition += 20;

    // Summary information
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, yPosition);
    yPosition += 10;
    pdf.text(`Total Reports: ${data.length}`, 20, yPosition);
    yPosition += 15;

    // For each report
    for (const report of data) {
      // Check if we need a new page
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = 20;
      }

      // Report header
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text(`${report.examName} - ${report.testingAreaName}`, 20, yPosition);
      yPosition += 8;

      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.text(
        `Subject: ${report.subject.name} | Grade: ${report.class.name} | Term ${report.examTerm} ${report.examYear}`,
        20,
        yPosition
      );
      yPosition += 8;

      if (includeStatistics) {
        // Statistics table
        const statsData = [
          ["Total Students", report.statistics.totalStudents.toString()],
          [
            "Average Score",
            `${report.statistics.averageScore}/${report.outOf} (${report.statistics.averagePercentage}%)`,
          ],
          ["Highest Score", `${report.statistics.highestScore}%`],
          ["Lowest Score", `${report.statistics.lowestScore}%`],
          [
            "Pass Rate",
            `${report.statistics.passRate}% (${report.statistics.passedStudents}/${report.statistics.totalStudents})`,
          ],
          [
            "Grade Distribution",
            `E.E:${report.statistics.gradeDistribution["E.E"]} M.E:${report.statistics.gradeDistribution["M.E"]} A.E:${report.statistics.gradeDistribution["A.E"]} B.E:${report.statistics.gradeDistribution["B.E"]}`,
          ],
        ];

        autoTable(pdf, {
          startY: yPosition,
          head: [["Statistic", "Value"]],
          body: statsData,
          theme: "grid",
          styles: { fontSize: 8 },
          columnStyles: { 0: { cellWidth: 50 }, 1: { cellWidth: 100 } },
        });

        yPosition = (pdf as any).lastAutoTable.finalY + 10;
      }

      if (includeStudentMarks && report.marks.length > 0) {
        // Check if we need a new page for the marks table
        if (yPosition > 200) {
          pdf.addPage();
          yPosition = 20;
        }

        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text("Student Marks", 20, yPosition);
        yPosition += 8;

        // Sort marks alphabetically by student name
        const sortedMarks = [...report.marks].sort((a, b) => {
          const nameA = a.student?.name || "Unknown Student";
          const nameB = b.student?.name || "Unknown Student";
          return nameA.localeCompare(nameB);
        });

        const marksData = sortedMarks.map((mark) => [
          mark.student?.name || "Unknown Student",
          mark.student?.admissionNumber || "N/A",
          `${mark.score}/${report.outOf}`,
          `${mark.percentage}%`,
          mark.grade?.name || "B.E",
          mark.remark || "-",
        ]);

        autoTable(pdf, {
          startY: yPosition,
          head: [
            [
              "Student Name",
              "Admission No.",
              "Score",
              "Percentage",
              "Grade",
              "Remark",
            ],
          ],
          body: marksData,
          theme: "striped",
          styles: { fontSize: 7 },
          columnStyles: {
            0: { cellWidth: 40 },
            1: { cellWidth: 25 },
            2: { cellWidth: 20 },
            3: { cellWidth: 20 },
            4: { cellWidth: 15 },
            5: { cellWidth: 30 },
          },
        });

        yPosition = (pdf as any).lastAutoTable.finalY + 15;
      }
    }

    pdf.save(`${generateFileName()}.pdf`);
  };

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();

    // Summary sheet
    const summaryData = data.map((report) => ({
      "Exam Name": report.examName,
      "Testing Area": report.testingAreaName,
      Subject: report.subject.name,
      Class: report.class.name,
      Teacher: report.teacher?.name || "",
      Term: report.examTerm,
      Year: report.examYear,
      Status: report.status,
      "Due Date": new Date(report.dueDate).toLocaleDateString(),
      "Total Students": report.statistics.totalStudents,
      "Average Score": report.statistics.averageScore,
      "Average Percentage": report.statistics.averagePercentage,
      "Highest Score": report.statistics.highestScore,
      "Lowest Score": report.statistics.lowestScore,
      "Pass Rate": report.statistics.passRate,
      "Passed Students": report.statistics.passedStudents,
      "Grade E.E": report.statistics.gradeDistribution["E.E"],
      "Grade M.E": report.statistics.gradeDistribution["M.E"],
      "Grade A.E": report.statistics.gradeDistribution["A.E"],
      "Grade B.E": report.statistics.gradeDistribution["B.E"],
    }));

    const summarySheet = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");

    // Student marks sheets (if enabled)
    if (includeStudentMarks) {
      data.forEach((report, index) => {
        if (report.marks.length > 0) {
          // Sort marks alphabetically by student name
          const sortedMarks = [...report.marks].sort((a, b) => {
            const nameA = a.student?.name || "Unknown Student";
            const nameB = b.student?.name || "Unknown Student";
            return nameA.localeCompare(nameB);
          });

          const marksData = sortedMarks.map((mark) => ({
            "Student Name": mark.student?.name || "Unknown Student",
            "Admission Number": mark.student?.admissionNumber || "N/A",
            Score: mark.score,
            "Out Of": report.outOf,
            Percentage: mark.percentage,
            Grade: mark.grade?.name || "B.E",
            "Grade Points": mark.grade?.points || 1,
            Remark: mark.remark || "",
          }));

          const marksSheet = XLSX.utils.json_to_sheet(marksData);
          const sheetName =
            `${report.subject.shortForm}_${report.class.name}`.substring(0, 31);
          XLSX.utils.book_append_sheet(workbook, marksSheet, sheetName);
        }
      });
    }

    XLSX.writeFile(workbook, `${generateFileName()}.xlsx`);
  };

  const exportToCSV = () => {
    console.log("Starting CSV export...");
    let csvContent = "data:text/csv;charset=utf-8,";

    // Headers
    csvContent +=
      "Exam Name,Testing Area,Subject,Grade,Teacher,Term,Year,Status,Due Date,Total Students,Average Score,Average Percentage,Highest Score,Lowest Score,Pass Rate,Passed Students,Grade E.E,Grade M.E,Grade A.E,Grade B.E\n";

    // Data rows
    data.forEach((report) => {
      const teacher = report.teacher
        ? `${report.teacher.firstName} ${report.teacher.lastName}`
        : "";
      const row = [
        report.examName,
        report.testingAreaName,
        report.subject.name,
        report.class.name,
        teacher,
        report.examTerm,
        report.examYear,
        report.status,
        new Date(report.dueDate).toLocaleDateString(),
        report.statistics.totalStudents,
        report.statistics.averageScore,
        report.statistics.averagePercentage,
        report.statistics.highestScore,
        report.statistics.lowestScore,
        report.statistics.passRate,
        report.statistics.passedStudents,
        report.statistics.gradeDistribution["E.E"],
        report.statistics.gradeDistribution["M.E"],
        report.statistics.gradeDistribution["A.E"],
        report.statistics.gradeDistribution["B.E"],
      ]
        .map((field) => `"${field}"`)
        .join(",");

      csvContent += row + "\n";
    });

    console.log("CSV content generated, length:", csvContent.length);

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${generateFileName()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log("CSV download triggered");
  };

  const handleExport = async () => {
    console.log("Export button clicked");
    console.log("Export format:", exportFormat);
    console.log("Data length:", data.length);

    setIsExporting(true);

    try {
      switch (exportFormat) {
        case "pdf":
          await exportToPDF();
          break;
        case "excel":
          exportToExcel();
          break;
        case "csv":
          exportToCSV();
          break;
        default:
          console.log("Unknown export format:", exportFormat);
      }

      console.log("Export completed successfully");
      onOpenChange(false);
    } catch (error: any) {
      console.error("Export error:", error);
      alert(`Export failed: ${error.message}`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileDown className="h-5 w-5" />
            Export Reports
          </DialogTitle>
          <DialogDescription>
            Choose your export format and options to download the exam reports.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Export Format */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Export Format</Label>
            <RadioGroup value={exportFormat} onValueChange={setExportFormat}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="pdf" />
                <FileText className="h-4 w-4" />
                <Label htmlFor="pdf">PDF Document</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="excel" id="excel" />
                <FileSpreadsheet className="h-4 w-4" />
                <Label htmlFor="excel">Excel Spreadsheet</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="csv" id="csv" />
                <FileText className="h-4 w-4" />
                <Label htmlFor="csv">CSV File</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Export Options */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Include in Export</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="statistics"
                  checked={includeStatistics}
                  onCheckedChange={(checked) => setIncludeStatistics(!!checked)}
                />
                <Label htmlFor="statistics" className="text-sm">
                  Summary Statistics
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="marks"
                  checked={includeStudentMarks}
                  onCheckedChange={(checked) =>
                    setIncludeStudentMarks(!!checked)
                  }
                />
                <Label htmlFor="marks" className="text-sm">
                  Individual Student Marks
                </Label>
              </div>
              {exportFormat === "pdf" && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="charts"
                    checked={includeCharts}
                    onCheckedChange={(checked) => setIncludeCharts(!!checked)}
                    disabled
                  />
                  <Label
                    htmlFor="charts"
                    className="text-sm text-muted-foreground"
                  >
                    Charts & Graphs (Coming Soon)
                  </Label>
                </div>
              )}
            </div>
          </div>

          {/* Preview Info */}
          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Export Preview:</strong> {data.length} report(s) will be
              exported
              {includeStudentMarks && ` with individual student marks`}
              {includeStatistics && ` and summary statistics`}.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting ? (
              <>
                <Download className="mr-2 h-4 w-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
