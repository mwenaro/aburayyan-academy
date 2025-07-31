"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ITestingArea, IMarkScore } from "@/models/Exam";
import { Plus, Trash2, Users } from "lucide-react";
import { strCapitalize } from "@/libs/str_functions";
import { IStudent } from "@/models/Student";

const bulkMarkSchema = z.object({
  marks: z.array(z.object({
    student: z.string().min(1, "Student is required"),
    score: z.coerce.number().min(0, "Score cannot be negative"),
    remark: z.string().optional(),
  })).min(1, "At least one mark is required"),
});

type BulkMarkFormData = z.infer<typeof bulkMarkSchema>;

interface BulkMarksDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  examId: string;
  testingAreaId: string;
  testingArea: ITestingArea;
  currentMarks?: IMarkScore[]; // Add current marks prop
  onSaved: (marks: IMarkScore[]) => void;
}

export const BulkMarksDialog: React.FC<BulkMarksDialogProps> = ({
  open,
  onOpenChange,
  examId,
  testingAreaId,
  testingArea,
  currentMarks = [],
  onSaved,
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState<any[]>([]);

  const form = useForm<BulkMarkFormData>({
    resolver: zodResolver(bulkMarkSchema.refine(
      (data) => data.marks.every(mark => mark.score <= testingArea.outOf),
      {
        message: `All scores must not exceed ${testingArea.outOf}`,
        path: ["marks"],
      }
    )),
    defaultValues: {
      marks: [{ student: "", score: 0, remark: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "marks",
  });

  // Load students
  useEffect(() => {
    if (open) {
      loadStudents();
    }
  }, [open, currentMarks]); // Re-load when currentMarks changes

  const loadStudents = async () => {
    try {
      // Get students from the class of this testing area
      const classId = typeof testingArea.class === 'object' 
        ? testingArea.class._id 
        : testingArea.class;
      
      console.log('Bulk marks - Loading students for class:', classId);
      
      // Use the same endpoint as the main students page with proper parameters
      const response = await axios.get(`/api/v1/student`, {
        params: {
          class: classId, // Use 'class' parameter instead of 'classId'
          limit: 1000, // Get all students in the class
          page: 1
        }
      });
      
      const allStudents: IStudent[] = response.data.data || [];
      console.log('Bulk marks - All students found for class:', classId, allStudents.length);
      
      // Get students who already have marks in this testing area (use currentMarks instead of testingArea.marks)
      const studentsWithMarks = currentMarks?.map(mark => {
        const studentId = typeof mark.student === 'object' && '_id' in mark.student 
          ? mark.student._id 
          : mark.student;
        return String(studentId);
      }) || [];
      
      console.log('Bulk marks - Students with marks:', studentsWithMarks.length);
      
      // Filter out students who already have marks
      const availableStudents = allStudents.filter(student => {
        const studentIdStr = String(student._id);
        const hasMarks = studentsWithMarks.includes(studentIdStr);
        return !hasMarks;
      });
      
      console.log('Bulk marks - Available students after filtering:', availableStudents.length);
      
      // Sort students alphabetically by name for consistent display
      availableStudents.sort((a, b) => a.name.localeCompare(b.name));
      
      setStudents(availableStudents);
    } catch (error) {
      console.error("Error loading students:", error);
      toast({
        title: "Error",
        description: "Failed to load students",
        variant: "destructive",
      });
    }
  };

  const loadAllAvailableStudents = () => {
    // Clear current marks and add all available students (who don't have marks yet)
    form.setValue("marks", students.map(student => ({
      student: student._id,
      score: 0,
      remark: "",
    })));
  };

  const onSubmit = async (data: BulkMarkFormData) => {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `/api/v3/exam/${examId}/testing-area/${testingAreaId}/mark`,
        { marks: data.marks }
      );

      toast({
        title: "Success",
        description: `${data.marks.length} marks added successfully`,
      });

      onSaved(response.data.data || []);
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to add marks",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStudentName = (studentId: string) => {
    const student = students.find(s => s._id === studentId);
    return student ? `${strCapitalize(student.name)} (${student.admissionNumber || ""})` : "Select student";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Bulk Add Marks</DialogTitle>
          <DialogDescription>
            Add marks for multiple students at once. You can add individual entries or load all students from the class.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2 mb-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => append({ student: "", score: 0, remark: "" })}
            disabled={students.length === 0}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Row
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={loadAllAvailableStudents}
            disabled={students.length === 0}
          >
            <Users className="mr-2 h-4 w-4" />
            Load Available Students ({students.length})
          </Button>
        </div>

        {students.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  No Students Available
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    All students in this class already have marks for this testing area. 
                    You can edit existing marks individually if needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Score (out of {testingArea.outOf})</TableHead>
                    <TableHead>Remark</TableHead>
                    <TableHead className="w-[50px]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((field, index) => (
                    <TableRow key={field.id}>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`marks.${index}.student`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <select 
                                  {...field}
                                  className="w-full p-2 border rounded-md text-sm"
                                >
                                  <option value="">
                                    {students.length === 0 
                                      ? "No students available" 
                                      : "Select student"
                                    }
                                  </option>
                                  {students.map((student) => (
                                    <option key={student._id} value={student._id}>
                                      {strCapitalize(student.name)}  ({student.admissionNumber || ""})
                                    </option>
                                  ))}
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`marks.${index}.score`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="0" 
                                  {...field}
                                  min={0}
                                  max={testingArea.outOf}
                                  className="w-20"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`marks.${index}.remark`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input 
                                  placeholder="Optional remark"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => remove(index)}
                          disabled={fields.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {form.formState.errors.marks && (
              <p className="text-sm text-red-500">
                {form.formState.errors.marks.message}
              </p>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Adding Marks..." : `Add ${fields.length} Mark${fields.length > 1 ? 's' : ''}`}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
