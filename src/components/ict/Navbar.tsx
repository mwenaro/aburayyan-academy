"use client"
import React from 'react';
import { Link } from 'react-scroll';

export const Navbar: React.FC = () => (
  <nav className="bg-blue-600 text-white fixed top-0 left-0 w-full z-10 shadow flex ite">
    <div className="container  px-6 py-4 flex justify-around w-full md:w-1/2 max-md">
      {["About", "Program Details", "Curriculum", "Testimonials", "Outcomes", "FAQ", "Register"].map((section) => (
        <Link
          key={section}
          to={section.toLowerCase().replace(" ", "")}
          smooth={true}
          duration={500}
          className="cursor-pointer hover:underline"
        >
          {section}
        </Link>
      ))}
    </div>
  </nav>
);


