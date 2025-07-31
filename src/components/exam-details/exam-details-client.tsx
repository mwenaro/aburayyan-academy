"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus, Calendar, Users, BookOpen, Edit, Eye, Trash2, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { IExam, ITestingArea } from "@/models/Exam";
import { AlertModal } from "@/components/modal/alert-modal";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { TestingAreaDialog } from "@/components/exam-details/testing-area-dialog";
import { RegradeDialog } from "@/components/exam-details/regrade-dialog";
import { getGradingSystemDisplayName } from "@/constants/grading-systems";

interface ExamDetailsClientProps {
  exam: IExam | null;
  testingAreas: ITestingArea[];
}

export const ExamDetailsClient: React.FC<ExamDetailsClientProps> = ({
  exam,
  testingAreas: initialTestingAreas,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [testingAreas, setTestingAreas] = useState<ITestingArea[]>(initialTestingAreas || []);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [testingAreaDialogOpen, setTestingAreaDialogOpen] = useState(false);
  const [regradeDialogOpen, setRegradeDialogOpen] = useState(false);
  const [selectedTestingArea, setSelectedTestingArea] = useState<ITestingArea | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Early return if exam is not loaded
  if (!exam) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-semibold">Loading exam details...</h3>
        <p className="text-muted-foreground">Please wait while we load the exam information.</p>
      </div>
    );
  }

  const handleDeleteTestingArea = async (testingAreaId: string) => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/v3/exam/${exam._id}/testing-area?testingAreaId=${testingAreaId}`);
      setTestingAreas(prev => prev.filter(ta => ta._id?.toString() !== testingAreaId));
      toast({
        title: "Success",
        description: "Testing area deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to delete testing area",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  const handleTestingAreaSaved = (testingArea: ITestingArea) => {
    if (selectedTestingArea) {
      // Update existing
      setTestingAreas(prev => 
        prev.map(ta => ta._id === testingArea._id ? testingArea : ta)
      );
    } else {
      // Add new
      setTestingAreas(prev => [...prev, testingArea]);
    }
    setTestingAreaDialogOpen(false);
    setSelectedTestingArea(null);
  };

  const handleTestingAreaRegraded = (regradedTestingArea: ITestingArea) => {
    setTestingAreas(prev => 
      prev.map(ta => ta._id === regradedTestingArea._id ? regradedTestingArea : ta)
    );
    setRegradeDialogOpen(false);
    setSelectedTestingArea(null);
  };

  const getStatusColor = (status: string) => {
    return status === "DONE" ? "bg-green-500" : "bg-yellow-500";
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <div className="space-y-6">
        {/* Exam Header */}
        <div className="flex items-start justify-between">
          <div>
            <Heading
              title={exam.name}
              description={`Term ${exam.term}, ${exam.year} • ${testingAreas.length} Testing Areas`}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => router.push(`/dashboard/exams/${exam._id}/edit`)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Exam
            </Button>
            <Button
              onClick={() => {
                setSelectedTestingArea(null);
                setTestingAreaDialogOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Testing Area
            </Button>
          </div>
        </div>

        <Separator />

        {/* Exam Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Testing Areas</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{testingAreas.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {testingAreas.filter(ta => ta.status === "DONE").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {testingAreas.filter(ta => ta.status === "PENDING").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Marks</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {testingAreas.reduce((total, ta) => total + (ta.marks?.length || 0), 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Testing Areas List */}
        <div className="space-y-4">
          <Heading title="Testing Areas" description="Manage testing areas for this exam" />
          
          {testingAreas.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No testing areas yet</h3>
                <p className="text-muted-foreground">
                  Create your first testing area to start managing marks.
                </p>
                <Button
                  className="mt-4"
                  onClick={() => {
                    setSelectedTestingArea(null);
                    setTestingAreaDialogOpen(true);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Testing Area
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {testingAreas.map((testingArea) => (
                <Card key={testingArea._id?.toString()} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{testingArea.name}</CardTitle>
                        <CardDescription>
                          {typeof testingArea.subject === 'object' && 'name' in testingArea.subject && testingArea.subject.name} • 
                          {typeof testingArea.class === 'object' && 'name' in testingArea.class && testingArea.class.name}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(testingArea.status)}>
                        {testingArea.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {getGradingSystemDisplayName(testingArea.gradingSystem || "general")}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Due Date</p>
                        <p className="font-medium">{formatDate(testingArea.dueDate)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Out Of</p>
                        <p className="font-medium">{testingArea.outOf}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Marks</p>
                        <p className="font-medium">{testingArea.marks?.length || 0}</p>
                      </div>
                      {testingArea.dateDone && (
                        <div>
                          <p className="text-muted-foreground">Completed</p>
                          <p className="font-medium">{formatDate(testingArea.dateDone)}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => router.push(`/dashboard/exams/${exam._id}/testing-area/${testingArea._id}`)}
                        className="flex-1"
                      >
                        <Eye className="mr-2 h-3 w-3" />
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedTestingArea(testingArea);
                          setRegradeDialogOpen(true);
                        }}
                        title="Re-grade with different system"
                      >
                        <RefreshCw className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedTestingArea(testingArea);
                          setTestingAreaDialogOpen(true);
                        }}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedTestingArea(testingArea);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Testing Area Dialog */}
      <TestingAreaDialog
        open={testingAreaDialogOpen}
        onOpenChange={setTestingAreaDialogOpen}
        examId={exam._id?.toString() || ""}
        testingArea={selectedTestingArea}
        onSaved={handleTestingAreaSaved}
      />

      {/* Regrade Dialog */}
      {selectedTestingArea && (
        <RegradeDialog
          open={regradeDialogOpen}
          onOpenChange={setRegradeDialogOpen}
          examId={exam._id?.toString() || ""}
          testingArea={selectedTestingArea}
          onRegraded={handleTestingAreaRegraded}
        />
      )}

      {/* Delete Confirmation */}
      <AlertModal
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => selectedTestingArea && handleDeleteTestingArea(selectedTestingArea._id?.toString() || "")}
        loading={isLoading}
      />
    </>
  );
};
