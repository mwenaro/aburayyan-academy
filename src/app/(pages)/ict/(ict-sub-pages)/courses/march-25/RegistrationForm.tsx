"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Swal from "sweetalert2";

const phoneRegex = /^((\+254|0)7\d{8})$/;

const formSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(phoneRegex, "Invalid Kenyan phone number"),
  residence: z.string().min(3, "Residence is required"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["Male", "Female"]),
  purpose: z.enum([
    "Preparing for tertiary studies",
    "Starting a cyber café or ICT business",
    "Gaining essential digital skills for work or daily life",
  ]),
});

export default function RegistrationForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      residence: "",
      dob: "",
      gender: "",
      purpose: "Preparing for tertiary studies",
    },
  });

  const onSubmit = (data: any) => {
    Swal.fire({
      title: "Registration Successful!",
      text: "You have successfully registered for the course.",
      icon: "success",
    });
    console.log("Form submitted:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="fullName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="phone"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="07xxxxxxxx or +2547xxxxxxxx"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="residence"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Residence</FormLabel>
              <FormControl>
                <Input placeholder="Enter your residence" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="dob"
          control={form.control}
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
          name="gender"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  {/* <SelectItem value="Other">Other</SelectItem> */}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="purpose"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purpose</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Preparing for tertiary studies">
                    Preparing for tertiary studies
                  </SelectItem>
                  <SelectItem value="Starting a cyber café or ICT business">
                    Starting a cyber café or ICT business
                  </SelectItem>
                  <SelectItem value="Gaining essential digital skills for work or daily life">
                    Gaining essential digital skills for work or daily life
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
    </Form>
  );
}
