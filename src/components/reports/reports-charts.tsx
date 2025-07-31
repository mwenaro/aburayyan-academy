"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";

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

interface ReportsChartsProps {
  data: ReportData[];
}

const GRADE_COLORS = {
  // New grading system
  "E.E": "#22c55e", // green
  "M.E": "#3b82f6", // blue
  "A.E": "#f59e0b", // amber
  "B.E": "#ef4444", // red
  // Legacy grading system (for backward compatibility)
  E: "#22c55e", // green
  M: "#3b82f6", // blue
  A: "#f59e0b", // amber
  B: "#ef4444", // red
};

export function ReportsCharts({ data }: ReportsChartsProps) {
  // Prepare data for performance by subject chart
  const performanceBySubject = data.reduce((acc, report) => {
    const subjectName = report.subject.name;
    const existing = acc.find(item => item.subject === subjectName);
    
    if (existing) {
      existing.totalStudents += report.statistics.totalStudents;
      existing.totalPassRate += report.statistics.passRate;
      existing.count += 1;
      existing.averagePassRate = existing.totalPassRate / existing.count;
    } else {
      acc.push({
        subject: subjectName,
        totalStudents: report.statistics.totalStudents,
        totalPassRate: report.statistics.passRate,
        averagePassRate: report.statistics.passRate,
        count: 1,
      });
    }
    
    return acc;
  }, [] as any[]);

  // Prepare data for performance by class chart
  const performanceByClass = data.reduce((acc, report) => {
    const className = report.class.name;
    const existing = acc.find(item => item.class === className);
    
    if (existing) {
      existing.totalStudents += report.statistics.totalStudents;
      existing.totalPassRate += report.statistics.passRate;
      existing.count += 1;
      existing.averagePassRate = existing.totalPassRate / existing.count;
      existing.averageScore = (existing.averageScore * (existing.count - 1) + report.statistics.averagePercentage) / existing.count;
    } else {
      acc.push({
        class: className,
        totalStudents: report.statistics.totalStudents,
        totalPassRate: report.statistics.passRate,
        averagePassRate: report.statistics.passRate,
        averageScore: report.statistics.averagePercentage,
        count: 1,
      });
    }
    
    return acc;
  }, [] as any[]);

  // Prepare overall grade distribution
  const overallGradeDistribution = data.reduce((acc, report) => {
    Object.entries(report.statistics.gradeDistribution).forEach(([grade, count]) => {
      acc[grade] = (acc[grade] || 0) + count;
    });
    return acc;
  }, {} as Record<string, number>);

  const gradeDistributionData = Object.entries(overallGradeDistribution).map(([grade, count]) => ({
    grade,
    count,
    percentage: Math.round((count / Object.values(overallGradeDistribution).reduce((a, b) => a + b, 0)) * 100),
  }));

  // Prepare timeline data (performance over time)
  const timelineData = data
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .map(report => ({
      date: new Date(report.dueDate).toLocaleDateString(),
      examName: report.examName,
      testingArea: report.testingAreaName,
      passRate: report.statistics.passRate,
      averageScore: report.statistics.averagePercentage,
    }));

  return (
    <div className="space-y-6">
      {/* Performance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {Math.round(data.reduce((sum, report) => sum + report.statistics.averagePercentage, 0) / data.length)}%
              </div>
              <div className="text-sm text-muted-foreground">Overall Average</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {Math.round(data.reduce((sum, report) => sum + report.statistics.passRate, 0) / data.length)}%
              </div>
              <div className="text-sm text-muted-foreground">Overall Pass Rate</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {data.reduce((sum, report) => sum + report.statistics.totalStudents, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Students</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{data.length}</div>
              <div className="text-sm text-muted-foreground">Testing Areas</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance by Subject */}
        <Card>
          <CardHeader>
            <CardTitle>Performance by Subject</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceBySubject}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="subject" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    `${Math.round(Number(value))}%`, 
                    name === 'averagePassRate' ? 'Pass Rate' : 'Students'
                  ]}
                />
                <Bar dataKey="averagePassRate" fill="#3b82f6" name="Pass Rate" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Grade Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Overall Grade Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={gradeDistributionData}
                  dataKey="count"
                  nameKey="grade"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ grade, percentage }) => `${grade}: ${percentage}%`}
                >
                  {gradeDistributionData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={GRADE_COLORS[entry.grade as keyof typeof GRADE_COLORS] || "#8884d8"} 
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} students`, `Grade ${name}`]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance by Class */}
        <Card>
          <CardHeader>
            <CardTitle>Performance by Class</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceByClass}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="class" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    `${Math.round(Number(value))}%`, 
                    name === 'averagePassRate' ? 'Pass Rate' : 'Average Score'
                  ]}
                />
                <Legend />
                <Bar dataKey="averagePassRate" fill="#10b981" name="Pass Rate" />
                <Bar dataKey="averageScore" fill="#f59e0b" name="Average Score" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(label) => `Date: ${label}`}
                  formatter={(value, name) => [
                    `${Math.round(Number(value))}%`, 
                    name === 'passRate' ? 'Pass Rate' : 'Average Score'
                  ]}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="passRate" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Pass Rate"
                />
                <Line 
                  type="monotone" 
                  dataKey="averageScore" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Average Score"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Top Performing Subjects</h4>
              <div className="flex flex-wrap gap-2">
                {performanceBySubject
                  .sort((a, b) => b.averagePassRate - a.averagePassRate)
                  .slice(0, 5)
                  .map((subject, index) => (
                    <Badge key={subject.subject} variant="outline">
                      #{index + 1} {subject.subject} ({Math.round(subject.averagePassRate)}%)
                    </Badge>
                  ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Top Performing Classes</h4>
              <div className="flex flex-wrap gap-2">
                {performanceByClass
                  .sort((a, b) => b.averagePassRate - a.averagePassRate)
                  .slice(0, 5)
                  .map((cls, index) => (
                    <Badge key={cls.class} variant="outline">
                      #{index + 1} {cls.class} ({Math.round(cls.averagePassRate)}%)
                    </Badge>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
