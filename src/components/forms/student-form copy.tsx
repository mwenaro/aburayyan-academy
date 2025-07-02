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

const studentFormSchema = z.object({
  name: z.string().min(3),
  dob: z.coerce.date({
    required_error: "Date of birth is required",
    invalid_type_error: "Invalid date",
  }),
  gen: z.enum(["male", "female"]),
  contactDetails: z.object({
    phone: z.string().min(10),
  }),
  class: z.string().min(1),
  address: z.object({
    town: z.string().min(1),
    county: z.string().min(1),
    nationality: z.string().min(1),
    street: z.string().min(1),
  }),
  kas: z.string().optional(),
  birthCertificate: z.string().optional(),
});

type StudentFormValues = z.infer<typeof studentFormSchema>;

interface StudentFormProps {
  initialData: any | null;
  // classes: string;
  classes: { id: string; name: string }[];
  // guardians: { id: string; name: string }[];
}

export const StudentForm: React.FC<StudentFormProps> = ({
  initialData,
  classes,
  // guardians,
}) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit student" : "Create student";
  const description = initialData ? "Edit a student." : "Add a new student.";
  const toastMessage = initialData ? "student updated." : "student created.";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData || {
    name: "",
    dob: "",
    gen: "male",
    contactDetails: {
      phone: "",
    },
    class: "",
    address: {
      town: "Mombasa",
      county: "Mombasa",
      nationality: "kenyan",
      street: "",
    },
    kas: "",
    birthCertificate: "",
  };

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: StudentFormValues) => {
    const formattedData = {
      ...data,
    };
    try {
      setLoading(true);
      if (initialData) {
        await axios.put(`/api/v1/student/${initialData._id}`, formattedData);
      } else {
        await axios.post(`/api/v1/student`, formattedData);
      }
      router.push(`/dashboard/students`);
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
    if (!params.studentId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "student ID is missing.",
      });
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`/api/v1/student/${params.studentId}`);
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Student name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 w-[300px]">
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <input
                    type="date"
                    value={
                      field.value ? field.value.toISOString().split("T")[0] : ""
                    }
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                    className="input-class"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gen"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
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
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      classes.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
          control={form.control}
          name="guardians"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Guardians</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) =>
                    field.onChange([...field.value, value])
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Add guardian" />
                  </SelectTrigger>
                  <SelectContent>
                    {guardians.map((g) => (
                      <SelectItem key={g.id} value={g.id}>
                        {g.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <div className="text-sm text-muted-foreground mt-1">
                Selected: {field.value.length} guardian(s)
              </div>
              <FormMessage />
            </FormItem>
          )}
        /> */}
          <FormField
            control={form.control}
            name="contactDetails.phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.town"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Town</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address.county"
            render={({ field }) => (
              <FormItem>
                <FormLabel>County</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address.nationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nationality</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address.street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="kas"
            render={({ field }) => (
              <FormItem>
                <FormLabel>KAS</FormLabel>
                <FormControl>
                  <Input placeholder="KAS number or info" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthCertificate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Birth Certificate (Upload)</FormLabel>
                <FormControl>
                  <input
                    type="file"
                    accept="application/pdf,image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const formData = new FormData();
                      formData.append("file", file);
                      // You should have an API endpoint to handle file uploads
                      const res = await axios.post("/api/upload", formData, {
                        headers: { "Content-Type": "multipart/form-data" },
                      });
                      // Save the returned file path in the form
                      field.onChange(res.data.filePath);
                    }}
                  />
                  {field.value && (
                    <a
                      href={field.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-2 text-blue-600 underline"
                    >
                      View Uploaded File
                    </a>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
