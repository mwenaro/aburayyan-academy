"use client";

import React, { useEffect, useState } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export function ClassReportClient() {
  const [classes, setClasses] = useState<any[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedExam, setSelectedExam] = useState<string>("all");
  const [loading, setLoading] = useState(false);

  // report table data
  const [subjects, setSubjects] = useState<string[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [meta, setMeta] = useState<{ schoolName?: string; examName?: string; className?: string }>({});

  useEffect(() => {
    fetchClasses();
    fetchExams();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await fetch("/api/v1/class");
      const j = await res.json();
      setClasses(j.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchExams = async () => {
    try {
      const res = await fetch("/api/v3/exam");
      const j = await res.json();
      setExams(j.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  const generate = async () => {
    if (!selectedClass || selectedClass === "all") return alert("Please select a class/grade");
    if (!selectedExam || selectedExam === "all") return alert("Please select an exam");

    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("classId", selectedClass);
      params.append("examId", selectedExam);
      const res = await fetch(`/api/v3/reports/exam?${params.toString()}`);
      const j = await res.json();
      if (!j.success) throw new Error(j.error || "Failed to fetch reports");

      // j.data is an array of testingArea-level reports for the selected class/exam
      const data: any[] = j.data || [];

      // Subjects order
      const subjList = data.map(d => d.subject?.name || d.testingAreaName);
      setSubjects(subjList);

      // capture meta info for PDF header/footer
      if (data.length > 0) {
        const first = data[0];
        setMeta({
          schoolName: first.school?.name || "",
          examName: first.examName || first.exam || "",
          className: first.class?.name || "",
        });
      } else {
        setMeta({});
      }

      // Build student map: { studentId: { Name, Gender, subject1: score, subject2: score, ... } }
      const studentMap = new Map();
      const getGender = (student: any) => {
        if (!student) return "";
        return student.gender || student.gen || "";
      };
      for (const ta of data) {
        const subjName = ta.subject?.name || ta.testingAreaName;
        for (const mark of ta.marks || []) {
          const student = mark.student || {};
          const id = student._id || student.name;
          if (!studentMap.has(id)) {
            studentMap.set(id, { Name: student.name || "", Gender: getGender(student), _id: id });
          }
          const entry = studentMap.get(id);
          entry[subjName] = mark.score;
        }
      }

      // Convert to array and compute totals & ranks
      const outRows = Array.from(studentMap.values()).map((r: any) => {
        const total = subjList.reduce((sum, s) => {
          const v = r[s];
          return sum + (typeof v === "number" ? v : 0);
        }, 0);
        return { ...r, Total: total };
      });

      // compute ranks (standard competition)
      const totals = outRows.map(r => r.Total).sort((a,b)=>b-a);
      const rankMap = new Map();
      totals.forEach((t, i) => { if (!rankMap.has(t)) rankMap.set(t, i+1); });
      outRows.forEach(r => r.Rank = rankMap.get(r.Total) || null);

      setRows(outRows);
    } catch (err) {
      console.error(err);
      alert("Failed to generate class report: " + (err as any)?.message || err);
    } finally {
      setLoading(false);
    }
  };

  const generateFileName = () => {
    const timestamp = new Date().toISOString().split("T")[0];
    return `class-report-${timestamp}`;
  };

  const exportCSV = () => {
    if (rows.length === 0) return alert("No data to export");
    const headerKeys = ["Name", "Gender", ...subjects, "Total", "Rank"];
    const headerLabels = ["Name", "Gender", ...subjects, "Total", "Rank"];
    const lines = [headerLabels.join(",")];
    rows.forEach(r => {
      const vals = headerKeys.map(h => {
        const v = r[h] ?? "";
        const s = String(v).replace(/"/g, '""');
        return /[,\n"]/g.test(s) ? `"${s}"` : s;
      });
      lines.push(vals.join(","));
    });
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${generateFileName()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportExcel = () => {
    if (rows.length === 0) return alert("No data to export");
    const wb = XLSX.utils.book_new();
    const headerKeys = ["Name", "Gender", ...subjects, "Total", "Rank"];
    const headerLabels = ["Name", "Gender", ...subjects, "Total", "Rank"];
    const data = rows.map(r => {
      const obj: any = {};
      headerKeys.forEach((key, idx) => obj[headerLabels[idx]] = r[key] ?? "");
      return obj;
    });
    const ws = XLSX.utils.json_to_sheet(data, { header: headerLabels });
    XLSX.utils.book_append_sheet(wb, ws, "Class Report");
    XLSX.writeFile(wb, `${generateFileName()}.xlsx`);
  };

  const exportPDF = async () => {
    if (rows.length === 0) return alert("No data to export");
    const pdf = new jsPDF("p", "mm", "a4");
    const title = "Class Exam Report";
    pdf.setFontSize(14);
    pdf.text(title, 105, 15, { align: "center" });
    const schoolName = meta.schoolName || "";
    const examName = meta.examName || "";
    const className = meta.className || "";

    // try to fetch and embed school logo (falls back silently if not available)
    const fetchLogoDataUrl = async (url: string) => {
      try {
        const resp = await fetch(url);
        if (!resp.ok) return null;
        const blob = await resp.blob();
        return await new Promise<string>((res, rej) => {
          const reader = new FileReader();
          reader.onload = () => res(reader.result as string);
          reader.onerror = rej;
          reader.readAsDataURL(blob);
        });
      } catch (e) {
        return null;
      }
    };

  // prefer favicon logo if present in public/favicon
  const logoPath = "/favicon/aburayyan-logo.png";
    const logoDataUrl = await fetchLogoDataUrl(logoPath);
    if (logoDataUrl) {
      try {
        pdf.addImage(logoDataUrl, "PNG", 10, 8, 18, 18);
      } catch (e) {
        // ignore image errors
      }
    }

    // Header
    pdf.setFontSize(12);
    if (schoolName) {
      pdf.text(schoolName, 105, 12, { align: "center" });
    }
    pdf.setFontSize(10);
    const metaText = `${examName}${className ? ` | Class: ${className}` : ""}`;
    pdf.text(metaText, 105, 26, { align: "center" });

    const head = [["Name", "Gender", ...subjects, "Total", "Rank"]];
    const body = rows.map(r => [r.Name, r.Gender || "", ...subjects.map(s => r[s] ?? ""), r.Total, r.Rank]);

    autoTable(pdf, {
      startY: 30,
      head,
      body,
      styles: { fontSize: 8 },
      didDrawPage: (dataArg) => {
        // Footer with page number
        const page = pdf.getNumberOfPages();
        pdf.setFontSize(8);
        pdf.text(`Page ${page}`, pdf.internal.pageSize.getWidth() - 20, pdf.internal.pageSize.getHeight() - 10);
      }
    });
    pdf.save(`${generateFileName()}.pdf`);
  };

  const breadcrumbItems = [
    { title: "Dashboard", link: "/dashboard" },
    { title: "Reports", link: "/dashboard/reports" },
    { title: "Class Report", link: "/dashboard/reports/class-report" },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumbs items={breadcrumbItems} />

      <Card>
        <CardHeader>
          <CardTitle>Class Exam Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue placeholder="Select Grade/Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Choose Grade</SelectItem>
                {classes.map(c => <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>

            <Select value={selectedExam} onValueChange={setSelectedExam}>
              <SelectTrigger>
                <SelectValue placeholder="Select Exam" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Choose Exam</SelectItem>
                {exams.map(e => <SelectItem key={e._id} value={e._id}>{e.name} (T{e.term} {e.year})</SelectItem>)}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <Button onClick={generate} disabled={loading}>{loading ? 'Generating...' : 'Generate Report'}</Button>
              <Button variant="outline" onClick={() => { setRows([]); setSubjects([]); }}>Clear</Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Gender</TableHead>
                    {subjects.map(s => <TableHead key={s}>{s}</TableHead>)}
                    <TableHead>Total</TableHead>
                    <TableHead>Rank</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map(r => (
                  <TableRow key={r._id || r.Name}>
                    <TableCell>{r.Name}</TableCell>
                      <TableCell>{r.Gender}</TableCell>
                      {subjects.map(s => <TableCell key={s}>{r[s] ?? ''}</TableCell>)}
                    <TableCell>{r.Total}</TableCell>
                    <TableCell>{r.Rank}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex gap-2 mt-4">
            <Button onClick={exportPDF} disabled={rows.length === 0}>Export PDF</Button>
            <Button onClick={exportExcel} disabled={rows.length === 0}>Export Excel</Button>
            <Button onClick={exportCSV} disabled={rows.length === 0}>Export CSV</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ClassReportClient;
