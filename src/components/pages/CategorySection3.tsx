import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

// Define categories with their label and SVG path
const categories = [
  {
    name: "Engine Parts",
    path: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
  },
  {
    name: "Tires",
    path: "M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z M16 17h4 M4 13h4"
  },
  {
    name: "Accessories",
    path: "m12 14 4-4 M3.34 19a10 10 0 1 1 17.32 0"
  },
  {
    name: "Tools",
    path: "M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z M18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18 m-10.7-12.7 7.286 7.286 M11 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
  },
  {
    name: "Car Care",
    path: "M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2 M7 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M9 17h6 M17 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
  }
];

export default function CategorySection() {
  return (
    <div className="container px-4 block">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold">Shop by Category</h2>
        <Button variant={"link"}>
          <Link
            className="text-primary hover:underline"
            href="#"
          >
            View All
          </Link>
        </Button>
      </div>

      {/* For smaller screens, you can render a dropdown */}
      <div className="sm:hidden mb-4">
        <select className="w-full p-2 border border-gray-300 rounded-md">
          {categories.map((category, index) => (
            <option key={index} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Flex items for larger screens */}
      <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        <div className="hidden sm:flex sm:flex-cols-3 sm:flex-wrap gap-4 py-2">
          {categories.map((category, index) => (
            <a
              key={index}
              className="flex flex-col items-center gap-2 shrink-0"
              href="#"
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
                  className="lucide h-6 w-6 text-muted-foreground"
                >
                  <path d={category.path}></path>
                </svg>
              </div>
              <span className="text-sm font-medium hidden sm:block">
                {category.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
