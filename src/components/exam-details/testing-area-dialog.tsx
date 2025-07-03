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
import { ITestingArea } from "@/models/Exam";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const testingAreaSchema = z.object({
  name: z.string().min(1, "Name is required"),
  subject: z.string().min(1, "Subject is required"),
  class: z.string().min(1, "Class is required"),
  teacher: z.string().optional(),
  dueDate: z.date({
    required_error: "Due date is required",
  }),
  outOf: z.coerce.number().min(1, "Out of must be at least 1"),
  invigilators: z.array(z.string()).optional(),
});

type TestingAreaFormData = z.infer<typeof testingAreaSchema>;

interface TestingAreaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  examId: string;
  testingArea?: ITestingArea | null;
  onSaved: (testingArea: ITestingArea) => void;
}

export const TestingAreaDialog: React.FC<TestingAreaDialogProps> = ({
  open,
  onOpenChange,
  examId,
  testingArea,
  onSaved,
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);

  const form = useForm<TestingAreaFormData>({
    resolver: zodResolver(testingAreaSchema),
    defaultValues: {
      name: "",
      subject: "",
      class: "",
      teacher: "",
      dueDate: new Date(),
      outOf: 100,
      invigilators: [],
    },
  });

  // Load form data if editing
  useEffect(() => {
    if (testingArea && open) {
      form.reset({
        name: testingArea.name,
        subject: typeof testingArea.subject === 'object' && testingArea.subject && '_id' in testingArea.subject 
          ? testingArea.subject._id?.toString() || ""
          : (testingArea.subject as string) || "",
        class: typeof testingArea.class === 'object' && testingArea.class && '_id' in testingArea.class 
          ? testingArea.class._id?.toString() || ""
          : (testingArea.class as string) || "",
        teacher: typeof testingArea.teacher === 'object' && testingArea.teacher && '_id' in testingArea.teacher 
          ? testingArea.teacher._id?.toString() || ""
          : String(testingArea.teacher || ""),
        dueDate: new Date(testingArea.dueDate),
        outOf: testingArea.outOf,
        invigilators: testingArea.invigilators?.map(inv => 
          typeof inv === 'object' && inv && '_id' in inv 
            ? inv._id?.toString() || ""
            : (inv as string) || ""
        ) || [],
      });
    } else if (!testingArea && open) {
      form.reset({
        name: "",
        subject: "",
        class: "",
        teacher: "",
        dueDate: new Date(),
        outOf: 100,
        invigilators: [],
      });
    }
  }, [testingArea, open, form]);

  // Load dropdown data
  useEffect(() => {
    if (open) {
      loadDropdownData();
    }
  }, [open]);

  const loadDropdownData = async () => {
    try {
      const [subjectsRes, classesRes, teachersRes] = await Promise.all([
        axios.get('/api/v1/subject'),
        axios.get('/api/v1/class'),
        axios.get('/api/v1/teacher'),
      ]);

      setSubjects(subjectsRes.data.data || []);
      setClasses(classesRes.data.data || []);
      setTeachers(teachersRes.data.data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load form data",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (data: TestingAreaFormData) => {
    setIsLoading(true);
    try {
      let response;
      
      if (testingArea) {
        // Update existing testing area
        response = await axios.put(`/api/v3/exam/${examId}/testing-area`, {
          testingAreaId: testingArea._id,
          ...data,
          dueDate: data.dueDate.toISOString(),
        });
      } else {
        // Create new testing area
        response = await axios.post(`/api/v3/exam/${examId}/testing-area`, {
          ...data,
          dueDate: data.dueDate.toISOString(),
        });
      }

      toast({
        title: "Success",
        description: `Testing area ${testingArea ? 'updated' : 'created'} successfully`,
      });

      onSaved(response.data.data);
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || `Failed to ${testingArea ? 'update' : 'create'} testing area`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {testingArea ? "Edit Testing Area" : "Create Testing Area"}
          </DialogTitle>
          <DialogDescription>
            {testingArea 
              ? "Update the testing area details below."
              : "Add a new testing area to this exam."
            }
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Mathematics - Grade 5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject._id} value={subject._id}>
                            {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="class"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {classes.map((cls) => (
                          <SelectItem key={cls._id} value={cls._id}>
                            {cls.name} - Grade {cls.grade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="teacher"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teacher (Optional)</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select teacher" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {teachers.map((teacher) => (
                          <SelectItem key={teacher._id} value={teacher._id}>
                            {teacher.firstName} {teacher.lastName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="outOf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Out Of</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
                  : testingArea 
                    ? "Update Testing Area" 
                    : "Create Testing Area"
                }
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
