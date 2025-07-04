"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ITestingArea, IMarkScore } from "@/models/Exam";

const markSchema = z.object({
  student: z.string().min(1, "Student is required"),
  score: z.coerce.number().min(0, "Score cannot be negative"),
  remark: z.string().optional(),
});

type MarkFormData = z.infer<typeof markSchema>;

interface MarkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  examId: string;
  testingAreaId: string;
  testingArea: ITestingArea;
  mark?: IMarkScore | null;
  onSaved: (mark: IMarkScore) => void;
}

export const MarkDialog: React.FC<MarkDialogProps> = ({
  open,
  onOpenChange,
  examId,
  testingAreaId,
  testingArea,
  mark,
  onSaved,
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState<any[]>([]);

  const form = useForm<MarkFormData>({
    resolver: zodResolver(markSchema.refine(
      (data) => data.score <= testingArea.outOf,
      {
        message: `Score cannot exceed ${testingArea.outOf}`,
        path: ["score"],
      }
    )),
    defaultValues: {
      student: "",
      score: 0,
      remark: "",
    },
  });

  // Load form data if editing
  useEffect(() => {
    if (mark && open) {
      form.reset({
        student: typeof mark.student === 'object' && '_id' in mark.student ? String(mark.student._id) : String(mark.student || ""),
        score: mark.score,
        remark: mark.remark || "",
      });
    } else if (!mark && open) {
      form.reset({
        student: "",
        score: 0,
        remark: "",
      });
    }
  }, [mark, open, form]);

  // Load students
  useEffect(() => {
    if (open) {
      loadStudents();
    }
  }, [open]);

  const loadStudents = async () => {
    try {
      // Get students from the class of this testing area
      const classId = typeof testingArea.class === 'object' 
        ? testingArea.class._id 
        : testingArea.class;
      
      console.log("Loading students for class:", classId, "testingArea:", testingArea);
      
      const response = await axios.get(`/api/v1/student?class=${classId}`);
      console.log("Students response:", response.data);
      
      const studentsData = response.data.data || response.data || [];
      console.log("Processed students data:", studentsData);
      
      setStudents(studentsData);
    } catch (error) {
      console.error("Error loading students:", error);
      toast({
        title: "Error",
        description: "Failed to load students",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (data: MarkFormData) => {
    setIsLoading(true);
    try {
      let response;
      
      if (mark) {
        // Update existing mark
        response = await axios.put(
          `/api/v3/exam/${examId}/testing-area/${testingAreaId}/mark/${mark._id}`,
          {
            score: data.score,
            remark: data.remark,
          }
        );
      } else {
        // Create new mark
        response = await axios.post(
          `/api/v3/exam/${examId}/testing-area/${testingAreaId}/mark`,
          data
        );
      }

      toast({
        title: "Success",
        description: `Mark ${mark ? 'updated' : 'created'} successfully`,
      });

      onSaved(response.data.data);
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || `Failed to ${mark ? 'update' : 'create'} mark`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mark ? "Edit Mark" : "Add Mark"}
          </DialogTitle>
          <DialogDescription>
            {mark 
              ? "Update the student's mark below."
              : "Add a new mark for a student in this testing area."
            }
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="student"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value}
                    disabled={!!mark} // Disable if editing existing mark
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select student" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {students.length === 0 ? (
                        <SelectItem value="no-students" disabled>
                          No students found
                        </SelectItem>
                      ) : (
                        students.map((student) => (
                          <SelectItem key={student._id} value={student._id}>
                            {student.firstName} {student.lastName} ({student.admissionNumber})
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="score"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Score (out of {testingArea.outOf})</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0" 
                      {...field}
                      min={0}
                      max={testingArea.outOf}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="remark"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remark (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Add any remarks about the student's performance..."
                      {...field}
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                {isLoading 
                  ? "Saving..." 
                  : mark 
                    ? "Update Mark" 
                    : "Add Mark"
                }
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
