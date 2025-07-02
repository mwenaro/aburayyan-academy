"use client"
import React from "react";

import { About } from "./About";
import { ProgramDetails } from "./ProgrammDetails";
import { WeeklySchedule } from "./WeeklySchedule";
import { Testimonials } from "./Testimonials";
import { ExpectedOutcomes } from "./ExpectedOutcomes";
import { FAQ } from "./FAQ";

import { RegiForm } from "./RegiForm";
import { HeroSection } from "./HeroSection";
import { Header } from "./Header";
import { Footer } from "./Footer";


export const IctPage: React.FC = () => (
  <div className="bg-gray-50 text-gray-800">
    <Header />
    <div id="home" className="">
      <HeroSection />
    </div>
    <div className="max-w-5xl mx-auto">
      <div id="about" className="pt-10">
        <About />
      </div>

      <div id="programdetails" className="pt-10">
        <ProgramDetails />
      </div>

      <div id="curriculum" className="pt-10">
        <WeeklySchedule />
      </div>

      <div id="testimonials" className="pt-10">
        <Testimonials />
      </div>

      <div id="outcomes" className="pt-10">
        <ExpectedOutcomes />
      </div>

      <div id="faq" className="pt-10">
        <FAQ />
      </div>

      <div id="register" className="pt-10">
        {/* <RegistrationForm /> */}
        <RegiForm />
      </div>
    </div>

    <Footer />
  </div>
);
