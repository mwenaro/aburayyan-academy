"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Zod Schema for form validation
const schema = z.object({
  studentName: z.string().min(1, "Student Name is required"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  dob: z.string().min(1, "Date of Birth is required"),
  gender: z.enum(["Male", "Female"], {
    required_error: "Gender is required",
  }),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  county: z.string().min(1, "County is required"),
  citizenship: z.string().min(1, "Citizenship is required"),
  school: z.string().min(1, "School is required"),
  grade: z.string().min(1, "Grade or Form is required"),
  previousComputerTraining: z.string().default("NO"),
  medicalCondition: z.enum(["YES", "NO"], {
    required_error: "Medical condition is required",
  }),
  preferredHospital: z.string().optional(),
  parentName: z.string().min(1, "Parent/Guardian Name is required"),
  parentPhoneNumber: z
    .string()
    .min(10, "Parent Phone number must be at least 10 digits"),
  session: z.enum(["Morning", "Afternoon"], {
    errorMap: () => ({ message: "Please select a session" }),
  }),
});

type FormData = z.infer<typeof schema>;

export const RegiForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/v1/ict/regi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Registration failed");
      }

      alert("Student Registered Successfully!");
      reset(); // Reset form on successful submission
    } catch (error: any) {
      console.error("Error:", error);
      alert(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false); // Stop loading state once complete
    }
  };

  // Watch medical condition field to show/hide the hospital field
  const hasMedicalCondition = watch("medicalCondition") === "YES";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4  p-4 bg-white rounded-md shadow-lg"
    >
      <h2 className="text-2xl font-bold text-center">
        Student Registration Form
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label>Student Name</label>
          <Input
            {...register("studentName")}
            placeholder="Enter student name"
          />
          {errors.studentName && (
            <p className="text-red-500">{errors.studentName.message}</p>
          )}
        </div>

        <div>
          <label>Phone Number</label>
          <Input
            {...register("phoneNumber")}
            placeholder="Enter phone number"
          />
          {errors.phoneNumber && (
            <p className="text-red-500">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div>
          <label>Date of Birth</label>
          <Input type="date" {...register("dob")} />
          {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}
        </div>

        <div>
          <label>Gender</label>
          <Select onValueChange={(value: any) => setValue("gender", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="text-red-500">{errors.gender.message}</p>
          )}
        </div>

        <div>
          <label>Address</label>
          <Input {...register("address")} placeholder="Enter address" />
          {errors.address && (
            <p className="text-red-500">{errors.address.message}</p>
          )}
        </div>

        <div>
          <label>City</label>
          <Input {...register("city")} placeholder="Enter city" />
          {errors.city && <p className="text-red-500">{errors.city.message}</p>}
        </div>

        <div>
          <label>County</label>
          <Input {...register("county")} placeholder="Enter county" />
          {errors.county && (
            <p className="text-red-500">{errors.county.message}</p>
          )}
        </div>

        <div>
          <label>Citizenship</label>
          <Input {...register("citizenship")} placeholder="Enter citizenship" />
          {errors.citizenship && (
            <p className="text-red-500">{errors.citizenship.message}</p>
          )}
        </div>

        <div>
          <label>School</label>
          <Input {...register("school")} placeholder="Enter school name" />
          {errors.school && (
            <p className="text-red-500">{errors.school.message}</p>
          )}
        </div>

        <div>
          <label>Grade/Form</label>
          <Input {...register("grade")} placeholder="Enter grade or form" />
          {errors.grade && (
            <p className="text-red-500">{errors.grade.message}</p>
          )}
        </div>

        <div>
          <label>Any Previous Computer Training?</label>

          <Select
            onValueChange={(value: any) =>
              setValue("previousComputerTraining", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Any Computer Skills" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NO">NO</SelectItem>
              <SelectItem value="YES">YES</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="text-red-500">{errors.gender.message}</p>
          )}
        </div>

        <div>
          <label>Any Medical Condition?</label>
          <Select
            onValueChange={(value: any) => setValue("medicalCondition", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select medical condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NO">No</SelectItem>
              <SelectItem value="YES">Yes</SelectItem>
            </SelectContent>
          </Select>
          {errors.medicalCondition && (
            <p className="text-red-500">{errors.medicalCondition.message}</p>
          )}
        </div>

        {hasMedicalCondition && (
          <div>
            <label>Preferred Hospital</label>
            <Input
              {...register("preferredHospital")}
              placeholder="Enter preferred hospital"
            />
            {errors.preferredHospital && (
              <p className="text-red-500">{errors.preferredHospital.message}</p>
            )}
          </div>
        )}

        <div>
          <label>Session Time</label>
          <Select onValueChange={(value: any) => setValue("session", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Suitable Session" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Morning">Morning Session</SelectItem>
              <SelectItem value="Afternoon">Afternoon Session</SelectItem>
            </SelectContent>
          </Select>
          {errors.session && (
            <p className="text-red-500 text-sm">{errors.session.message}</p>
          )}
        </div>
      </div>
      {/* ------------------------- */}
      <h3 className="text-xl font-bold mt-4">Parent/Guardian Information</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="">
          <label>Parent/Guardian Name</label>
          <Input
            {...register("parentName")}
            placeholder="Enter parent/guardian name"
          />
          {errors.parentName && (
            <p className="text-red-500">{errors.parentName.message}</p>
          )}
        </div>

        <div>
          <label>Parent/Guardian Phone Number</label>
          <Input
            {...register("parentPhoneNumber")}
            placeholder="Enter parent/guardian phone number"
          />
          {errors.parentPhoneNumber && (
            <p className="text-red-500">{errors.parentPhoneNumber.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full bg-green-600">
        {isLoading ? "Registering..." : "Submit"}
      </Button>
    </form>
  );
};
