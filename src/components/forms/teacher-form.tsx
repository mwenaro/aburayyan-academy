"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
// import FileUpload from "../file-upload";
import { useToast } from "../ui/use-toast";

// const ImgSchema = z.object({
//   fileName: z.string(),
//   name: z.string(),
//   fileSize: z.number(),
//   size: z.number(),
//   fileKey: z.string(),
//   key: z.string(),
//   fileUrl: z.string(),
//   url: z.string(),
// });

const teacherFormSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(10),
  // imgUrl: z.array(ImgSchema).min(1),
  qualifications: z.string().min(3),
  // subjects: z.array(z.string()).min(1),
  // responsibility: z.discriminatedUnion("type", [
  //   z.object({
  //     type: z.literal("class-teacher"),
  //     classId: z.string().min(1, "Class ID required"),
  //   }),
  //   z.object({
  //     type: z.literal("subject-teacher"),
  //     subjectId: z.string().min(1, "Subject ID required"),
  //   }),
  // ]),
});

type TeacherFormValues = z.infer<typeof teacherFormSchema>;

interface teacherFormProps {
  initialData: any | null;

  // subCategories:any
}

export const TeacherForm: React.FC<teacherFormProps> = ({ initialData }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const defaultValues = initialData
    ? initialData
    : {
        name: "",
        email: "",
        phone: "",
        // imgUrl: [],
        qualifications: "",
        // subjects: [],
        // responsibility: {
        //   type: "class-teacher",
        //   classId: "",
        // },
      };

  const form = useForm<TeacherFormValues>({
    resolver: zodResolver(teacherFormSchema),
    defaultValues,
  });

  // const responsibilityType = form.watch("responsibility.type");

  const onSubmit = async (values: TeacherFormValues) => {
    try {
      setLoading(true);
      console.log("Submitting teacher data:", values);
      // await axios.post('/api/teachers', values);
      toast({ title: "Success", description: "Teacher saved successfully" });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not save teacher.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* <FormField
          control={form.control}
          name="imgUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <FileUpload
                  value={field.value}
                  onChange={field.onChange}
                  onRemove={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
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
          name="qualifications"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Qualifications</FormLabel>
              <FormControl>
                <Input placeholder="e.g., B.Ed, M.Ed" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="subjects"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subjects</FormLabel>
              <FormControl>
                <Input
                  placeholder="Comma-separated (e.g., Math, English)"
                  value={field.value.join(", ")}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value.split(",").map((s) => s.trim())
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        {/* <FormField
          control={form.control}
          name="responsibility.type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Responsibility Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="class-teacher">Class Teacher</SelectItem>
                  <SelectItem value="subject-teacher">
                    Subject Teacher
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        {/* {responsibilityType === "class-teacher" && (
          <FormField
            control={form.control}
            name="responsibility.classId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Class ID</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter class ID" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {responsibilityType === "subject-teacher" && (
          <FormField
            control={form.control}
            name="responsibility.subjectId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject ID</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter subject ID" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )} */}

        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Register Teacher"}
        </Button>
      </form>
    </Form>
  );
};
