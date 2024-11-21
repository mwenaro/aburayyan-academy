import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function CategorySection() {
  return (
    <div className="container px-4  block">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl  md:text-2xl font-bold">Shop by Category</h2>
        <Button variant={"link"}>
          <Link
            className="text-primary hover:underline"
            href="#"
          >
            View All
          </Link>
        </Button>
      </div>
      <div className="w-ful  overflow-x-auto [&amp;::-webkit-scrollbar]:hidden [-ms-overflow-style:&#39;none&#39;] [scrollbar-width:&#39;none&#39;]">
        <div className="flex flex-cols-3 sm:flex-cols-5 flex-wrap gap-4 py-2">
          <a
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-wrench h-6 w-6 text-muted-foreground"
              >
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
              </svg>
            </div>
            <span className="text-sm font-medium hidden sm:block">Engine Parts</span>
          </a>
          <a
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-footprints h-6 w-6 text-muted-foreground"
              >
                <path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"></path>
                <path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"></path>
                <path d="M16 17h4"></path>
                <path d="M4 13h4"></path>
              </svg>
            </div>
            <span className="text-sm font-medium hidden sm:block">Tires</span>
          </a>
          <a
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-gauge h-6 w-6 text-muted-foreground"
              >
                <path d="m12 14 4-4"></path>
                <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
              </svg>
            </div>
            <span className="text-sm font-medium hidden sm:block">Accessories</span>
          </a>
          <a
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-pen-tool h-6 w-6 text-muted-foreground"
              >
                <path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"></path>
                <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"></path>
                <path d="m2.3 2.3 7.286 7.286"></path>
                <circle cx="11" cy="11" r="2"></circle>
              </svg>
            </div>
            <span className="text-sm font-medium hidden sm:block">Tools</span>
          </a>
          <a
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-car h-6 w-6 text-muted-foreground"
              >
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
                <circle cx="7" cy="17" r="2"></circle>
                <path d="M9 17h6"></path>
                <circle cx="17" cy="17" r="2"></circle>
              </svg>
            </div>
            <span className="text-sm font-medium hidden sm:block">Car Care</span>
          </a>
        </div>
      </div>
    </div>
  );
}
