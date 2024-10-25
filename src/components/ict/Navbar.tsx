"use client";
import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { XCircleIcon } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white fixed top-0 left-0 w-full z-10 shadow">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src="/path-to-logo.png" alt="Logo" className="h-8 w-8 mr-2" /> {/* Replace with your logo path */}
          <span className="font-bold text-lg">Your Logo</span>
        </div>

        {/* Mobile Menu Button */}
        <div className="ml-auto md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            {isOpen ? (
              <XCircleIcon className="h-6 w-6 text-white" /> // Close icon
            ) : (
              <HamburgerMenuIcon className="h-6 w-6 text-white" /> // Hamburger menu icon
            )}
          </button>
        </div>

        {/* Menu Links */}
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } md:flex md:space-x-6 items-center w-full md:w-auto`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 items-center">
            {[
              'About',
              'Program Details',
              'Curriculum',
              'Testimonials',
              'Outcomes',
              'FAQ',
              'Register',
            ].map((section) => (
              <li key={section}>
                <Link
                  to={section.toLowerCase().replace(' ', '')}
                  smooth={true}
                  duration={500}
                  className="block cursor-pointer hover:underline"
                  onClick={() => setIsOpen(false)} // Close the menu when a link is clicked (for mobile)
                >
                  {section}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
