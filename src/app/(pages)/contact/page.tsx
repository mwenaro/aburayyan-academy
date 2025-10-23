"use client";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const validationErrors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          validationErrors[error.path[0] as string] = error.message;
        }
      });
      setErrors(validationErrors);
    } else {
      setErrors({});
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      // Handle successful submission (e.g., send data to API)
    }
  };

  return (
    <div>
      <style>{`
        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.8s forwards;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
      {/* Hero Section */}
      <div
        className="relative h-64 w-full bg-cover bg-center fade-in"
        style={{
          backgroundImage: `url('/school/about-hero-image.jpg')`, // Replace with your image URL
        }}
      >
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Contact Us</h1>
        </div>
      </div>

      {/* Content Section */}
  <div className="p-10 fade-in" style={{ animationDelay: '0.2s' }}>
        {/* Contact Information */}
  <div className="mt-8 grid md:grid-cols-2 gap-8 fade-in" style={{ animationDelay: '0.4s' }}>
          {/* Contact Details */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Get in Touch:</h2>
            <div className="space-y-3">
              <div>
             <h3 className="font-semibold flex items-center gap-2"><FaPhoneAlt className="inline-block text-blue-500" /> Phone Numbers:</h3>
             <p>0722299287 / 0723755108</p>
              </div>
              <div>
             <h3 className="font-semibold flex items-center gap-2"><FaEnvelope className="inline-block text-blue-500" /> Email:</h3>
             <p>info@aburayyanacademy.com</p>
              </div>
              <div>
             <h3 className="font-semibold flex items-center gap-2"><FaMapMarkerAlt className="inline-block text-blue-500" /> Postal Address:</h3>
             <p>P.O. BOX 86845 – 80100, MOMBASA</p>
              </div>
            </div>
          </div>

          {/* Office Hours & Additional Info */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Visit Us:</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold">Location:</h3>
                <p>Along Ronald Ngala Road, opposite Petro Gas Station, Mombasa</p>
              </div>
              {/* <div>
                <h3 className="font-semibold">Head of Institution:</h3>
                <p>Mr. Duke Okioga</p>
              </div> */}
              <div>
                <h3 className="font-semibold">Banking Details:</h3>
                <p>Gulf Bank, Mombasa Branch<br/>Account Number: 1700006102<br/><em>Note: Cash payments not accepted</em></p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
  <div className="mt-8 fade-in" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-xl font-semibold mb-4">Send us a Message:</h2>
        {showSuccess && (
          <Alert className="mb-4">
            <AlertTitle>Message Sent!</AlertTitle>
            <AlertDescription>
              Thank you for reaching out. We will get back to you soon.
            </AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4 fade-in" style={{ animationDelay: '0.8s' }}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded ${
                errors.message ? "border-red-500" : "border-gray-300"
              }`}
              rows={4}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Send Message
          </Button>
        </form>
        </div>

        {/* Physical Address */}
  <div className="mt-8 fade-in" style={{ animationDelay: '1s' }}>
          <h2 className="text-xl font-semibold">Our Location:</h2>
          <p className="mt-2">Along Ronald Ngala Road, opposite Petro Gas Station, Mombasa, Kenya</p>
          <p className="mt-1 text-gray-600">P.O. BOX 86845 – 80100, MOMBASA</p>
        </div>

        {/* Map */}
  <div className="mt-6 fade-in" style={{ animationDelay: '1.2s' }}>
          <h2 className="text-xl font-semibold">Find Us on the Map:</h2>
          <p className="mt-2 text-gray-600 mb-2">Abu-Rayyan Academy - Ronald Ngala Road, opposite Petro Gas Station</p>
          <iframe
            className="w-full h-64 mt-2"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d836.6690269640336!2d39.659403010462604!3d-4.042651684181943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x184012b6536946a3%3A0xf121aa4ab5a0a1cc!2sAbu-Rayyan%20Academy!5e0!3m2!1sen!2ske!4v1736515654476!5m2!1sen!2ske"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Social Media */}
  <div className="mt-8 fade-in" style={{ animationDelay: '1.4s' }}>
          <h2 className="text-xl font-semibold">Follow Us:</h2>
          <div className="flex space-x-4 mt-2">
              <Link href="https://facebook.com/aburayyanacademy" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-2xl text-blue-600 hover:scale-110 transition-transform cursor-pointer" title="Facebook" />
              </Link>
              <Link href="https://twitter.com/aburayyanacademy" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-2xl text-blue-400 hover:scale-110 transition-transform cursor-pointer" title="Twitter" />
              </Link>
              <Link href="https://instagram.com/aburayyanacademy" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-2xl text-pink-500 hover:scale-110 transition-transform cursor-pointer" title="Instagram" />
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
