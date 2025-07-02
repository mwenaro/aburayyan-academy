// CheckoutDetails.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input"; // Assuming you're using shadcn's Input
import { Button } from "../ui/button"; // Assuming shadcn's Button
import { cn } from "@/lib/utils"; // Utility for conditional classnames

// Define the validation schema with Zod
const checkoutSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  pickupDetails: z.string().min(1, "Pickup details are required"),
});

// Define TypeScript types based on the schema
type CheckoutFormData = z.infer<typeof checkoutSchema>;

export function CheckoutDetails({cart}:any) {
  // Initialize react-hook-form with Zod resolver for validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  // Handle form submission
  const onSubmit = (data: CheckoutFormData) => {
    console.log("Form Data", {cart, data});
    // You can now send this data to an API or process it further
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto space-y-4 p-4 bg-white shadow-md rounded-lg"
    >
      {/* Name Input */}
      <div className="space-y-1">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <Input
          id="name"
          placeholder="John Doe"
          {...register("name")}
          className={cn("border-gray-300", errors.name ? "border-red-600" : "")}
        />
        {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
      </div>

      {/* Email Input */}
      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="example@example.com"
          {...register("email")}
          className={cn("border-gray-300", errors.email ? "border-red-600" : "")}
        />
        {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
      </div>

      {/* Pickup Details */}
      <div className="space-y-1">
        <label htmlFor="pickupDetails" className="block text-sm font-medium text-gray-700">
          Pickup Details
        </label>
        <Input
          id="pickupDetails"
          placeholder="Enter pickup time or location"
          {...register("pickupDetails")}
          className={cn("border-gray-300", errors.pickupDetails ? "border-red-600" : "")}
        />
        {errors.pickupDetails && (
          <p className="text-red-600 text-sm">{errors.pickupDetails.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full bg-blue-600 text-white">
        Submit
      </Button>
    </form>
  );
}
