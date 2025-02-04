import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-600 text-white py-10">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Abu-Rayyan Academy</h2>
          <p>
            Providing a balanced education that integrates CBC, ICT, and Islamic
            values to nurture future leaders.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/programs" className="hover:underline">
                Programs
              </Link>
            </li>
            <li>
              <Link href="/admissions" className="hover:underline">
                Admissions
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact and Social Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <Mail className="w-5 h-5 mr-2" /> info@aburayyanacademy.com
            </li>
            <li className="flex items-center">
              <Phone className="w-5 h-5 mr-2" />0722 299 287 / 0723 755 108
            </li>
          </ul>
          <div className="flex space-x-4 mt-4">
            <Link href="https://www.facebook.com/aburayyanacademy/" target="_blank">
              <Facebook className="w-6 h-6 hover:text-gray-300" />
            </Link>
            <Link href="https://twitter.com" target="_blank">
              <Twitter className="w-6 h-6 hover:text-gray-300" />
            </Link>
            <Link href="https://instagram.com" target="_blank">
              <Instagram className="w-6 h-6 hover:text-gray-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-sm">
        &copy; {new Date().getFullYear()} Abu-Rayyan Academy. All rights
        reserved.
      </div>
    </footer>
  );
};


