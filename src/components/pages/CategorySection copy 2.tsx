"use client"
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function CategorySection() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const categories = [
    { name: "Engine Parts", href: "#", icon: "wrench" },
    { name: "Tires", href: "#", icon: "footprints" },
    { name: "Accessories", href: "#", icon: "gauge" },
    { name: "Tools", href: "#", icon: "pen-tool" },
    { name: "Car Care", href: "#", icon: "car" },
  ];

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="container px-4 block">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold">Shop by Category</h2>
        <Button variant={"link"}>
          <Link className="text-primary hover:underline" href="#">
            View All
          </Link>
        </Button>
      </div>

      {/* For small devices: Dropdown menu */}
      <div className="block sm:hidden">
        <button
          className="bg-primary text-white p-2 rounded-md w-full text-left"
          onClick={toggleDropdown}
        >
          {dropdownOpen ? "Hide Categories" : "Show Categories"}
        </button>

        {dropdownOpen && (
          <div className="mt-4">
            <select
              className="w-full p-2 border rounded-md"
              onChange={(e) => window.location.href = e.target.value}
            >
              {categories.map((category) => (
                <option key={category.name} value={category.href}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* For larger screens: Flexbox */}
      <div className="hidden sm:block w-full overflow-x-auto">
        <div className="flex flex-wrap gap-4 py-2">
          {categories.map((category) => (
            <a
              key={category.name}
              className="flex flex-col items-center gap-2 shrink-0"
              href={category.href}
            >
              <div className="bg-muted rounded-full p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`lucide lucide-${category.icon} h-6 w-6 text-muted-foreground`}
                >
                  {/* You can use dynamic icons here */}
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                </svg>
              </div>
              <span className="text-sm font-medium">{category.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
