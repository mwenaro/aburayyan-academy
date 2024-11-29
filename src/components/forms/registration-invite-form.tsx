"use client";
import axios from "axios";
import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useToast } from "@/components/ui/use-toast";

const registrationInviteSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z
    .string()
    .email({ message: "Invalid email address" }),
});

type RegistrationInviteFormValues = z.infer<typeof registrationInviteSchema>;

interface RegistrationInviteFormProps {
  initialData?: RegistrationInviteFormValues | null;
}

export const RegistrationInviteForm: React.FC<RegistrationInviteFormProps> = ({
  initialData,
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<RegistrationInviteFormValues>({
    resolver: zodResolver(registrationInviteSchema),
    defaultValues: initialData || {
      name: "",
      email: "",
    },
  });

  const onSubmit = async (data: RegistrationInviteFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.put(`/api/registration-invite/${initialData.email}`, data);
        toast({
          title: "Success",
          description: "Registration invite updated.",
        });
      } else {
        await axios.post("/api/registration-invite", data);
        toast({
          title: "Success",
          description: "Registration invite created.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Heading
        title={initialData ? "Edit Registration Invite" : "Create Registration Invite"}
        description={
          initialData
            ? "Edit the registration invite details."
            : "Create a new registration invite."
        }
      />
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Full name"
                      {...field}
                    />
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
                    <Input
                      disabled={loading}
                      placeholder="Email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {initialData ? "Save Changes" : "Send Invite"}
          </Button>
        </form>
      </Form>
    </>
  );
};
