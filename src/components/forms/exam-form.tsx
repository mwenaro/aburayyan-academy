"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useToast } from "../ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "../modal/alert-modal";
import { Heading } from "../ui/heading";
import { Trash } from "lucide-react";
import { Separator } from "../ui/separator";

// Exam form schema based on Exam model
const examFormSchema = z.object({
  name: z.string().min(3),
  term: z.enum(["1", "2", "3"]),
  year: z.coerce.number().min(2020),
//   school: z.string().min(1),
});

type ExamFormValues = z.infer<typeof examFormSchema>;

interface ExamFormProps {
  initialData: any | null;
//   schools: { id: string; name: string }[];
}

export const ExamForm: React.FC<ExamFormProps> = ({ initialData}) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit exam" : "Create exam";
  const description = initialData ? "Edit an exam." : "Add a new exam.";
  const toastMessage = initialData ? "Exam updated." : "Exam created.";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData || {
    name: "",
    term: "1",
    year: new Date().getFullYear(),
    school: "",
  };

  const form = useForm<ExamFormValues>({
    resolver: zodResolver(examFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: ExamFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.put(`/api/v3/exam/${initialData._id}`, data);
      } else {
        await axios.post(`/api/v3/exam`, data);
      }
      router.push(`/dashboard/exams`);
      toast({
        title: "Success",
        description: toastMessage,
      });
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          error?.response?.data?.error || error?.response?.data?.message ||
          "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    if (!params.examId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Exam ID is missing.",
      });
      return;
    }
    try {
      setLoading(true);
      await axios.delete(`/api/v3/exam/${params.examId}`);
      router.push(`/dashboard/exams`);
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          error?.response?.data?.error || error?.response?.data?.message ||
          "There was a problem with the deletion.",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exam Name</FormLabel>
                <FormControl>
                  <Input placeholder="Exam name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="term"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Term</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select term" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Term 1</SelectItem>
                    <SelectItem value="2">Term 2</SelectItem>
                    <SelectItem value="3">Term 3</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Input type="number" min={2020} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="school"
            render={({ field }) => (
              <FormItem>
                <FormLabel>School</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select school" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {schools.map((school) => (
                      <SelectItem key={school.id} value={school.id}>
                        {school.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
