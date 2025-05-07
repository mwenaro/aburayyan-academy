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
import { useToast } from "../ui/use-toast";

const studentFormSchema = z.object({
  name: z.string().min(3),
  dob: z.string(), // ISO date string
  gen: z.enum(["male", "female"]),
  phone: z.string().min(10),
  classId: z.string().min(1),
  town: z.string().min(1),
  county: z.string().min(1),
  nationality: z.string().min(1),
  street: z.string().min(1),
  // guardians: z.array(z.string()).min(1, "At least one guardian is required"),
});

type StudentFormValues = z.infer<typeof studentFormSchema>;

interface StudentFormProps {
  initialData: any | null;
  classes: { id: string; name: string }[];
  // guardians: { id: string; name: string }[];
}

export const StudentForm: React.FC<StudentFormProps> = ({
  initialData,
  classes,
  // guardians,
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const defaultValues = initialData || {
    name: "",
    dob: "",
    gen: "male",
    phone: "",
    classId: "",
    town: "Mombasa",
    county: "Mombasa",
    nationality: "kenyan",
    street: "",
    // guardians: [],
  };

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues,
  });

  const onSubmit = async (values: StudentFormValues) => {
    try {
      setLoading(true);
      console.log("Submitting student data:", values);
      toast({ title: "Success", description: "Student saved successfully" });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not save student.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
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
        <FormField
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
          name="classId"
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
          name="town"
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
          name="county"
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
          name="nationality"
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
          name="street"
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
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Register Student"}
        </Button>
      </form>
    </Form>
  );
};
