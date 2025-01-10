'use client'
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Form Data:", data);
    // Handle form submission logic (e.g., send data to API)
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-blue-600">Contact Us</h1>

      {/* Contact Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <input
            type="text"
            placeholder="Your Name"
            {...register("name")}
            className={`w-full px-4 py-2 border rounded ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            placeholder="Your Email"
            {...register("email")}
            className={`w-full px-4 py-2 border rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <textarea
            placeholder="Your Message"
            {...register("message")}
            className={`w-full px-4 py-2 border rounded ${
              errors.message ? "border-red-500" : "border-gray-300"
            }`}
            rows={4}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>

      {/* Physical Address */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Visit Us:</h2>
        <p className="mt-2">Sabasaba, Mombasa, Kenya</p>
      </div>

      {/* Map (Embed using Google Maps) */}

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Our Location:</h2>
        <iframe
          className="w-full h-64 mt-2"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d836.6690269640336!2d39.659403010462604!3d-4.042651684181943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x184012b6536946a3%3A0xf121aa4ab5a0a1cc!2sAbu-Rayyan%20Academy!5e0!3m2!1sen!2ske!4v1736515654476!5m2!1sen!2ske"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Social Media Handles */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Follow Us:</h2>
        <div className="flex space-x-4 mt-2">
          <Link
            href="https://facebook.com/aburayyanacademy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-blue-600 cursor-pointer">Facebook</span>
          </Link>
          <Link
            href="https://twitter.com/aburayyanacademy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-blue-400 cursor-pointer">Twitter</span>
          </Link>
          <Link
            href="https://instagram.com/aburayyanacademy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-pink-500 cursor-pointer">Instagram</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
