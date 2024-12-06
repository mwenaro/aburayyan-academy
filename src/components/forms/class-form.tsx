"use client";
import axios from "axios";
import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "../ui/use-toast";
import { AlertModal } from "../modal/alert-modal";

// Define Zod schema for validation
const classSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Class name must be at least 3 characters" }),
  year: z.coerce.number().min(1900, { message: "Year must be valid" }),
  isGraduated: z.string().min(1, { message: "This field must be filled" }),
});

type classFormValues = z.infer<typeof classSchema>;

interface classFormProps {
  initialData: any | null;
}

export const ClassForm: React.FC<classFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Class" : "Create Class";
  const description = initialData ? "Edit a class." : "Add a new class.";
  const toastMessage = initialData ? "Class updated." : "Class created.";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? initialData
    : {
        name: "",
        year: new Date().getFullYear(), // Default to the current year
        isGraduated: 'false',
      };

  const form = useForm<classFormValues>({
    resolver: zodResolver(classSchema),
    defaultValues,
  });

  const onSubmit = async (data: classFormValues) => {
    const formattedData = {
      ...data,
    };
    try {
      setLoading(true);
      if (initialData) {
        await axios.put(`/api/v1/class/${initialData._id}`, formattedData);
      } else {
        await axios.post(`/api/v1/class`, formattedData);
      }
      router.push(`/dashboard/classes`);
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
          error?.response?.data?.message ||
          "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    if (!params.classId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Class ID is missing.",
      });
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`/api/v1/class/${params.classId}`);
      router.push(`/dashboard/classes`);
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          error?.response?.data?.message ||
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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="gap-8 md:grid md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Class name"
                      {...field}
                    />
                  </FormControl>
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
                    <Input
                      disabled={loading}
                      placeholder="Year"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isGraduated"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Graduation Status</FormLabel>
                  <FormControl>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value ? "true" : "false"}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Graduation Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={'true'}>Graduated</SelectItem>
                        <SelectItem value={'false'}>Not Graduated</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
