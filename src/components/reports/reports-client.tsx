"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileDown, Filter, Calendar, Users, TrendingUp, BarChart3 } from "lucide-react";

import { ReportsTable } from "./reports-table";
import { ReportsCharts } from "./reports-charts";
import { ExportDialog } from "./export-dialog";

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

export function ReportsClient() {
  const [reportData, setReportData] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState(false);
  const [exams, setExams] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  
  // Filters
  const [selectedExam, setSelectedExam] = useState<string>("all");
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedTerm, setSelectedTerm] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  
  const [showExportDialog, setShowExportDialog] = useState(false);

  // Fetch initial data
  useEffect(() => {
    fetchExams();
    fetchClasses();
    fetchSubjects();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await fetch("/api/v3/exam");
      const result = await response.json();
      console.log({result})
      if (result.data) {
        setExams(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await fetch("/api/v1/class");
      const result = await response.json();
      if (result.data) {
        setClasses(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await fetch("/api/v1/subject");
      const result = await response.json();
      if (result.data) {
        setSubjects(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const fetchReports = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedExam && selectedExam !== "all") params.append("examId", selectedExam);
      if (selectedClass && selectedClass !== "all") params.append("classId", selectedClass);
      if (selectedTerm && selectedTerm !== "all") params.append("term", selectedTerm);
      if (selectedYear && selectedYear !== "all") params.append("year", selectedYear);

      const response = await fetch(`/api/v3/reports/exam?${params.toString()}`);
      const result = await response.json();
      
      if (result.success) {
        let data = result.data || [];
        
        // Filter by subject if selected
        if (selectedSubject && selectedSubject !== "all") {
          data = data.filter((report: ReportData) => 
            report.subject._id === selectedSubject
          );
        }
        
        setReportData(data);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSelectedExam("all");
    setSelectedClass("all");
    setSelectedSubject("all");
    setSelectedTerm("all");
    setSelectedYear("all");
    setReportData([]);
  };

  const getOverallStatistics = () => {
    if (reportData.length === 0) return null;

    const totalStudents = reportData.reduce((sum, report) => sum + report.statistics.totalStudents, 0);
    const totalExams = reportData.length;
    const averagePassRate = reportData.reduce((sum, report) => sum + report.statistics.passRate, 0) / totalExams;
    const completedExams = reportData.filter(report => report.status === "DONE").length;

    return {
      totalStudents,
      totalExams,
      averagePassRate: Math.round(averagePassRate * 100) / 100,
      completedExams,
      completionRate: Math.round((completedExams / totalExams) * 10000) / 100
    };
  };

  const overallStats = getOverallStatistics();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Exam Reports</h1>
          <p className="text-muted-foreground">
            View and export detailed exam performance reports
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              console.log("Export button clicked", { reportDataLength: reportData.length });
              setShowExportDialog(true);
            }}
            disabled={reportData.length === 0}
            title={reportData.length === 0 ? "Generate reports first to enable export" : "Export reports"}
          >
            <FileDown className="h-4 w-4 mr-2" />
            Export {reportData.length > 0 && `(${reportData.length})`}
          </Button>
          {/* Test button for export functionality */}
          <Button
            variant="secondary"
            onClick={() => {
              console.log("Test export clicked");
              setShowExportDialog(true);
            }}
            size="sm"
          >
            Test Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Select value={selectedExam} onValueChange={setSelectedExam}>
              <SelectTrigger>
                <SelectValue placeholder="Select Exam" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Exams</SelectItem>
                {exams.map((exam) => (
                  <SelectItem key={exam._id} value={exam._id}>
                    {exam.name} (T{exam.term} {exam.year})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue placeholder="Select Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                {classes.map((cls) => (
                  <SelectItem key={cls._id} value={cls._id}>
                    {cls.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Select Testing Area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Testing Areas</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject._id} value={subject._id}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedTerm} onValueChange={setSelectedTerm}>
              <SelectTrigger>
                <SelectValue placeholder="Select Term" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Terms</SelectItem>
                <SelectItem value="1">Term 1</SelectItem>
                <SelectItem value="2">Term 2</SelectItem>
                <SelectItem value="3">Term 3</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {Array.from(new Set([2023, 2024, 2025, 2026])).map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button onClick={fetchReports} className="flex-1" disabled={loading}>
                {loading ? "Loading..." : "Generate Report"}
              </Button>
              <Button variant="outline" onClick={clearFilters}>
                Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overall Statistics */}
      {overallStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold">{overallStats.totalStudents}</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Assessments</p>
                  <p className="text-2xl font-bold">{overallStats.totalExams}</p>
                </div>
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Pass Rate</p>
                  <p className="text-2xl font-bold">{overallStats.averagePassRate}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed Assessments</p>
                  <p className="text-2xl font-bold">{overallStats.completedExams}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                  <p className="text-2xl font-bold">{overallStats.completionRate}%</p>
                </div>
                <Badge variant={overallStats.completionRate >= 80 ? "default" : "secondary"}>
                  {overallStats.completionRate >= 80 ? "Good" : "Needs Attention"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Report Results */}
      {reportData.length > 0 && (
        <Tabs defaultValue="table" className="space-y-4">
          <TabsList>
            <TabsTrigger value="table">Table View</TabsTrigger>
            <TabsTrigger value="charts">Charts & Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="table">
            <ReportsTable data={reportData} />
          </TabsContent>

          <TabsContent value="charts">
            <ReportsCharts data={reportData} />
          </TabsContent>
        </Tabs>
      )}

      {/* No Data Message */}
      {!loading && reportData.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Reports Found</h3>
            <p className="text-muted-foreground mb-4">
              Select filters and click &quot;Generate Report&quot; to view exam reports.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Export Dialog */}
      <ExportDialog
        open={showExportDialog}
        onOpenChange={setShowExportDialog}
        data={reportData}
      />
    </div>
  );
}
