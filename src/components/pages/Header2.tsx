import Image from "next/image";
import React from "react";

export default function Header2() {
  return (
    <header className="bg-white border-b-2 text-foreground">
      <div className="container py-4 px-6 flex items-center justify-between">
        <a
          className="flex items-center gap-2"
          href="https://almahdi.splendidmedia.co.ke/"
        >
          <Image
            alt="Al-Hamdi Auto Parts Ltd"
            loading="lazy"
            width="200"
            height="250"
            decoding="async"
            data-nimg="1"
            style={{ color: "transparent" }}
            src="/assets/logo.png"
          />
        </a>
        <div className="flex items-center gap-4">
          <a
            className="hover:underline font-bold"
            href="https://almahdi.splendidmedia.co.ke/login"
          >
            Login
          </a>
          <a
            className="hover:underline font-bold"
            href="https://almahdi.splendidmedia.co.ke/backoffice"
          >
            Admin
          </a>
          <a
            className="relative font-bold"
            href=""
          >
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
              className="lucide lucide-shopping-bag h-6 w-6 text-primary"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
              <path d="M3 6h18"></path>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span className="absolute -top-2 -right-2 font-bold bg-accent text-foreground rounded-full px-2 py-0.5 text-xs">
              3
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
