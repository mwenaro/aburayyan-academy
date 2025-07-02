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
import { useToast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modal/alert-modal";
import { Heading } from "@/components/ui/heading";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const subjectCategories = [
  "PRE-PRIMARY",
  "LOWER_PRIMARY",
  "UPPER_PRIMARY",
  "JUNIOR_SECONDARY",
  "SENIOR_SECONDARY",
] as const;

const subjectFormSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  shortForm: z.string().optional(),
  category: z.enum(subjectCategories),
  // school: z.string().min(1, { message: "School is required" }),
});

type SubjectFormValues = z.infer<typeof subjectFormSchema>;

interface SubjectFormProps {
  initialData: any | null;
  // schools: { id: string; name: string }[];
}

export const SubjectForm: React.FC<SubjectFormProps> = ({
  initialData,
  // schools,
}) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Subject(Learning Area)" : "Create Subject(Learning Area)";
  const description = initialData
    ? "Edit an existing subject/Learning Area."
    : "Add a new subject/Learning Area.";
  const toastMessage = initialData
    ? "Subject updated successfully."
    : "Subject created successfully.";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues: SubjectFormValues = initialData || {
    name: "",
    shortForm: "",
    category: "LOWER_PRIMARY",
    // school: "",
  };

  const form = useForm<SubjectFormValues>({
    resolver: zodResolver(subjectFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: SubjectFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.put(`/api/v1/subject/${initialData._id}`, data);
      } else {
        await axios.post(`/api/v1/subject`, data);
      }
      router.push("/dashboard/subjects");
      toast({ title: "Success", description: toastMessage });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh!",
        description:
          error?.response?.data?.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/v1/subject/${params.subjectId}`);
      router.push("/dashboard/subjects");
      toast({ title: "Deleted", description: "Subject removed." });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to delete",
        description:
          error?.response?.data?.message || "Something went wrong.",
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
          {/* Subject Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Mathematics" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Short Form */}
          <FormField
            control={form.control}
            name="shortForm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Form (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. MTH" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {subjectCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat.replaceAll("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* School */}
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

          {/* Submit */}
          <Button disabled={loading} type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
