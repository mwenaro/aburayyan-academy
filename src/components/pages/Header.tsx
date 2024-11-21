// src/components/Header.tsx
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ShoppingCartButton } from "./ShoppingCartButton";

const Header: React.FC = () => {
  return (
    <>
    <header className="bg-white border-b-2 text-foreground fixed w-full overflow-hidden min-h-[100px]">
      <div className="container py-4 px-6 flex items-center justify-between">
        <Link className="flex items-center gap-2" href="/">
          <Image
            alt="Al-Hamdi Auto Parts Ltd"
            loading="lazy"
            width="200"
            height="250"
            decoding="async"
            className="w-auto"
            
            src="https://almahdi.splendidmedia.co.ke//images/logo.png"
          />
        </Link>
        <div className="flex items-center gap-4">
          <Link className="hover:underline font-bold" href="/login">
            Login
          </Link>
          <Link className="hover:underline font-bold" href="/backoffice">
            Admin
          </Link>
          <span className="relative font-bold" >
            <ShoppingCartButton />
          </span>
        </div>
      </div>
    </header>
    <div className="mt-[100px]"></div>
    </>
  );
};

export default Header;
