"use client";
import React from "react";
import { Link } from "react-scroll";
import { Button } from "../ui/button";

export const Header: React.FC = () => (
  <header className="bg-slate-200  text-center py-16 mt-12 md:mt-4">
    <h1 className="text-4xl font-bold mb-4">ABU-RAYYAN ICT Holiday Program</h1>
    <p className="text-lg mb-6">Empowering Young Minds Through Technology</p>

    <Link
      to="register"
      // className="bg-white text-blue-600 px-6 py-3 font-semibold rounded shadow"
    >
      <Button className="bg-green-600">Register Now</Button>
    </Link>
  </header>
);
