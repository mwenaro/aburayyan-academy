"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, ChevronDown, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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

interface ReportsTableProps {
  data: ReportData[];
}

export function ReportsTable({ data }: ReportsTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRowExpansion = (testingAreaId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(testingAreaId)) {
      newExpanded.delete(testingAreaId);
    } else {
      newExpanded.add(testingAreaId);
    }
    setExpandedRows(newExpanded);
  };

  const getGradeBadgeColor = (grade: string) => {
    switch (grade) {
      case "E":
      case "E.E":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "M":
      case "M.E":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "A":
      case "A.E":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "B":
      case "B.E":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exam Reports Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Exam & Testing Area</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Average</TableHead>
                <TableHead>Pass Rate</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((report) => (
                <React.Fragment key={report.testingAreaId}>
                  <TableRow>
                    <TableCell>
                      <Collapsible>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleRowExpansion(report.testingAreaId)}
                          >
                            {expandedRows.has(report.testingAreaId) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                      </Collapsible>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{report.examName}</div>
                        <div className="text-sm text-muted-foreground">
                          {report.testingAreaName} • T{report.examTerm} {report.examYear}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{report.subject.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {report.subject.shortForm}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{report.class.name}</Badge>
                    </TableCell>
                    <TableCell>
                      {report.teacher && (
                        <div className="text-sm">
                          {report.teacher?.name || "No teacher assigned"}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={report.status === "DONE" ? "default" : "secondary"}
                      >
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{report.statistics.totalStudents}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {report.statistics.averageScore}/{report.outOf}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {report.statistics.averagePercentage}%
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{report.statistics.passRate}%</div>
                        <div className="text-muted-foreground">
                          {report.statistics.passedStudents}/{report.statistics.totalStudents}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                  
                  {expandedRows.has(report.testingAreaId) && (
                    <TableRow>
                      <TableCell colSpan={10} className="p-0">
                        <Collapsible open={expandedRows.has(report.testingAreaId)}>
                          <CollapsibleContent>
                            <div className="p-4 bg-muted/50">
                              {/* Statistics Cards */}
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                <div className="text-center p-3 bg-background rounded-lg">
                                  <div className="text-2xl font-bold">{report.statistics.highestScore}%</div>
                                  <div className="text-sm text-muted-foreground">Highest Score</div>
                                </div>
                                <div className="text-center p-3 bg-background rounded-lg">
                                  <div className="text-2xl font-bold">{report.statistics.lowestScore}%</div>
                                  <div className="text-sm text-muted-foreground">Lowest Score</div>
                                </div>
                                <div className="text-center p-3 bg-background rounded-lg">
                                  <div className="text-2xl font-bold">{report.statistics.passedStudents}</div>
                                  <div className="text-sm text-muted-foreground">Passed</div>
                                </div>
                                <div className="text-center p-3 bg-background rounded-lg">
                                  <div className="text-2xl font-bold">
                                    {report.statistics.totalStudents - report.statistics.passedStudents}
                                  </div>
                                  <div className="text-sm text-muted-foreground">Failed</div>
                                </div>
                              </div>

                              {/* Grade Distribution */}
                              <div className="mb-4">
                                <h4 className="font-medium mb-2">Grade Distribution</h4>
                                <div className="flex gap-2">
                                  {Object.entries(report.statistics.gradeDistribution).map(([grade, count]) => (
                                    <Badge
                                      key={grade}
                                      className={getGradeBadgeColor(grade)}
                                    >
                                      {grade}: {count}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              {/* Student Marks Table */}
                              {report.marks.length > 0 && (
                                <div>
                                  <h4 className="font-medium mb-2">Student Marks</h4>
                                  <div className="rounded-md border bg-background">
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>Student</TableHead>
                                          <TableHead>Admission No.</TableHead>
                                          <TableHead>Score</TableHead>
                                          <TableHead>Percentage</TableHead>
                                          <TableHead>Grade</TableHead>
                                          <TableHead>Remark</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {report.marks.map((mark) => (
                                          <TableRow key={mark._id}>
                                            <TableCell>
                                              {mark.student?.name || "Unknown Student"}
                                            </TableCell>
                                            <TableCell>{mark.student?.admissionNumber || 'N/A'}</TableCell>
                                            <TableCell>
                                              {mark.score}/{report.outOf}
                                            </TableCell>
                                            <TableCell>{mark.percentage}%</TableCell>
                                            <TableCell>
                                              <Badge className={getGradeBadgeColor(mark.grade?.name || "B.E")}>
                                                {mark.grade?.name || "B.E"}
                                              </Badge>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                              {mark.remark || "-"}
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </div>
                                </div>
                              )}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
