"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Plus, 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Download, 
  Upload,
  Users,
  Award,
  BarChart3,
  CalendarCheck 
} from "lucide-react";
import { useRouter } from "next/navigation";
import { IExam, ITestingArea, IMarkScore } from "@/models/Exam";
import { AlertModal } from "@/components/modal/alert-modal";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { MarkDialog } from "@/components/testing-area-details/mark-dialog";
import { BulkMarksDialog } from "@/components/testing-area-details/bulk-marks-dialog";

interface TestingAreaDetailsClientProps {
  exam: IExam;
  testingArea: ITestingArea;
  marks: IMarkScore[];
}

export const TestingAreaDetailsClient: React.FC<TestingAreaDetailsClientProps> = ({
  exam,
  testingArea,
  marks: initialMarks,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [marks, setMarks] = useState<IMarkScore[]>(initialMarks);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [markDialogOpen, setMarkDialogOpen] = useState(false);
  const [bulkDialogOpen, setBulkDialogOpen] = useState(false);
  const [selectedMark, setSelectedMark] = useState<IMarkScore | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteMark = async (markId: string) => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/v3/exam/${exam._id}/testing-area/${testingArea._id}/mark/${markId}`);
      setMarks(prev => prev.filter(mark => mark._id?.toString() !== markId));
      toast({
        title: "Success",
        description: "Mark deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to delete mark",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  const handleMarkSaved = (mark: IMarkScore) => {
    if (selectedMark) {
      // Update existing
      setMarks(prev => 
        prev.map(m => m._id === mark._id ? mark : m)
      );
    } else {
      // Add new
      setMarks(prev => [...prev, mark]);
    }
    setMarkDialogOpen(false);
    setSelectedMark(null);
  };

  const handleBulkMarksSaved = (newMarks: IMarkScore[]) => {
    setMarks(prev => [...prev, ...newMarks]);
    setBulkDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    return status === "DONE" ? "bg-green-500" : "bg-yellow-500";
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getGradeColor = (points: number) => {
    if (points >= 4) return "text-green-600 bg-green-50";
    if (points >= 3) return "text-blue-600 bg-blue-50";
    if (points >= 2) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const calculateStats = () => {
    if (marks.length === 0) return { average: 0, highest: 0, lowest: 0, passRate: 0 };
    
    const scores = marks.map(m => m.score);
    const average = scores.reduce((a, b) => a + b, 0) / scores.length;
    const highest = Math.max(...scores);
    const lowest = Math.min(...scores);
    const passRate = (scores.filter(s => s >= (testingArea.outOf * 0.5)).length / scores.length) * 100;
    
    return { average, highest, lowest, passRate };
  };

  const stats = calculateStats();

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/dashboard/exams/${exam._id}`)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Exam
            </Button>
            <div>
              <Heading
                title={testingArea.name}
                description={`${exam.name} • Term ${exam.term}, ${exam.year}`}
              />
            </div>
          </div>
        </div>

        {/* Testing Area Info */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  Testing Area Details
                  <Badge className={getStatusColor(testingArea.status)}>
                    {testingArea.status}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  View and manage marks for this testing area
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Subject</p>
                <p className="font-medium">
                  {typeof testingArea.subject === 'object' && 'name' in testingArea.subject ? testingArea.subject.name : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Class</p>
                <p className="font-medium">
                  {typeof testingArea.class === 'object' && 'name' in testingArea.class ? testingArea.class.name : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Due Date</p>
                <p className="font-medium">{formatDate(testingArea.dueDate)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Out Of</p>
                <p className="font-medium">{testingArea.outOf}</p>
              </div>
              {testingArea.teacher && (
                <div>
                  <p className="text-sm text-muted-foreground">Teacher</p>
                  <p className="font-medium">
                    {typeof testingArea.teacher === 'object' && 'firstName' in testingArea.teacher && 'lastName' in testingArea.teacher
                      ? `${testingArea.teacher.firstName} ${testingArea.teacher.lastName}`
                      : 'N/A'
                    }
                  </p>
                </div>
              )}
              {testingArea.dateDone && (
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="font-medium">{formatDate(testingArea.dateDone)}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{marks.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.average.toFixed(1)}/{testingArea.outOf}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Highest Score</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.highest}/{testingArea.outOf}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
              <CalendarCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.passRate.toFixed(0)}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Marks Management */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Heading title="Student Marks" description="Manage individual student marks" />
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setBulkDialogOpen(true)}
              >
                <Upload className="mr-2 h-4 w-4" />
                Bulk Add
              </Button>
              <Button
                onClick={() => {
                  setSelectedMark(null);
                  setMarkDialogOpen(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Mark
              </Button>
            </div>
          </div>

          {marks.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No marks recorded yet</h3>
                <p className="text-muted-foreground">
                  Start adding student marks for this testing area.
                </p>
                <div className="flex gap-2 justify-center mt-4">
                  <Button
                    onClick={() => {
                      setSelectedMark(null);
                      setMarkDialogOpen(true);
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add First Mark
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setBulkDialogOpen(true)}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Bulk Import
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Admission No.</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Percentage</TableHead>
                      <TableHead>Remark</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {marks.map((mark) => (
                      <TableRow key={mark._id?.toString()}>
                        <TableCell className="font-medium">
                          {typeof mark.student === 'object' && 'firstName' in mark.student && 'lastName' in mark.student
                            ? `${mark.student.firstName} ${mark.student.lastName}`
                            : 'N/A'
                          }
                        </TableCell>
                        <TableCell>
                          {typeof mark.student === 'object' && 'admissionNumber' in mark.student ? String(mark.student.admissionNumber) : 'N/A'}
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">
                            {mark.score}/{testingArea.outOf}
                          </span>
                        </TableCell>
                        <TableCell>
                          {mark.grade ? (
                            <Badge 
                              variant="secondary" 
                              className={`font-mono ${getGradeColor(mark.grade.points)}`}
                            >
                              {mark.grade.name}
                            </Badge>
                          ) : 'N/A'}
                        </TableCell>
                        <TableCell>
                          {((mark.score / testingArea.outOf) * 100).toFixed(1)}%
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">
                            {mark.remark || 'No remark'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedMark(mark);
                                setMarkDialogOpen(true);
                              }}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedMark(mark);
                                setDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Mark Dialog */}
      <MarkDialog
        open={markDialogOpen}
        onOpenChange={setMarkDialogOpen}
        examId={exam._id?.toString() || ""}
        testingAreaId={testingArea._id?.toString() || ""}
        testingArea={testingArea}
        mark={selectedMark}
        onSaved={handleMarkSaved}
      />

      {/* Bulk Marks Dialog */}
      <BulkMarksDialog
        open={bulkDialogOpen}
        onOpenChange={setBulkDialogOpen}
        examId={exam._id?.toString() || ""}
        testingAreaId={testingArea._id?.toString() || ""}
        testingArea={testingArea}
        onSaved={handleBulkMarksSaved}
      />

      {/* Delete Confirmation */}
      <AlertModal
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => selectedMark && handleDeleteMark(selectedMark._id?.toString() || "")}
        loading={isLoading}
      />
    </>
  );
};
