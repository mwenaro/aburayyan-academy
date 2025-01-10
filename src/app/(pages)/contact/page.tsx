import React from 'react';
import Link from 'next/link';

const ContactPage: React.FC = () => (
  <div className="p-10">
    <h1 className="text-3xl font-bold text-blue-600">Contact Us</h1>

    {/* Contact Form */}
    <form className="mt-6 space-y-4">
      <input
        type="text"
        placeholder="Your Name"
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="email"
        placeholder="Your Email"
        className="w-full px-4 py-2 border rounded"
      />
      <textarea
        placeholder="Your Message"
        className="w-full px-4 py-2 border rounded"
        rows={4}
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Send Message
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
        src="https://www.google.com/maps/embed/v1/place?q=Sabasaba, Mombasa&key=YOUR_GOOGLE_MAPS_API_KEY"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>

    {/* Social Media Handles */}
    <div className="mt-8">
      <h2 className="text-xl font-semibold">Follow Us:</h2>
      <div className="flex space-x-4 mt-2">
        <Link href="https://facebook.com/aburayyanacademy" target="_blank" rel="noopener noreferrer">
          <span className="text-blue-600 cursor-pointer">Facebook</span>
        </Link>
        <Link href="https://twitter.com/aburayyanacademy" target="_blank" rel="noopener noreferrer">
          <span className="text-blue-400 cursor-pointer">Twitter</span>
        </Link>
        <Link href="https://instagram.com/aburayyanacademy" target="_blank" rel="noopener noreferrer">
          <span className="text-pink-500 cursor-pointer">Instagram</span>
        </Link>
      </div>
    </div>
  </div>
);

export default ContactPage;
