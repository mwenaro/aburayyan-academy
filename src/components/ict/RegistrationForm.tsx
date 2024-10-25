"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

 const registrationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  age: z
    .number({ invalid_type_error: "Age is required" })
    .min(5, { message: "Age must be at least 5" })
    .max(18, { message: "Age must be 18 or below" }),
  session: z.enum(["Morning", "Afternoon"], {
    errorMap: () => ({ message: "Please select a session" }),
  }),
  contact: z
    .string()
    .min(10, { message: "Contact must be at least 10 characters" })
    .regex(/^\d+$/, { message: "Contact must be numbers only" }),
});

// Define TypeScript type based on the schema
type RegistrationFormData = z.infer<typeof registrationSchema>;

export const RegistrationForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = (data: RegistrationFormData) => {
    console.log("Form data:", data);
    // Add your form submission logic here
  };

  return (
    <section className="px-6 py-10 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Register Now</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("name")}
            placeholder="Student Name"
            className="w-full px-4 py-2 border rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        
        <div>
          <input
            {...register("age", { valueAsNumber: true })}
            placeholder="Age"
            type="number"
            className="w-full px-4 py-2 border rounded"
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
        </div>
        
        <div>
          <select {...register("session")} className="w-full px-4 py-2 border rounded">
            <option value="">Select Session</option>
            <option value="Morning">Morning Session</option>
            <option value="Afternoon">Afternoon Session</option>
          </select>
          {errors.session && <p className="text-red-500 text-sm">{errors.session.message}</p>}
        </div>
        
        <div>
          <input
            {...register("contact")}
            placeholder="Parent Contact"
            className="w-full px-4 py-2 border rounded"
          />
          {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
        </div>
        
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </section>
  );
};


