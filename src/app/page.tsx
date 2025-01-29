import React from "react";
import Link from "next/link";
import { MyShineBorder } from "@/components/custom/MyShinyBorder";
import { MyMagicCard } from "@/components/custom/MyMagicCard";
import { MyShimmerButton } from "@/components/custom/MyShimmerButton";

const LandingPage: React.FC = () => (
  <div className="bg-gray-100">
    {/* Hero Section */}
    <div className="bg-blue-300 text-white py-20 text-center">
      <h1 className="text-5xl font-bold mb-4">Welcome to Aburayan Academy</h1>
      <p className="text-lg mb-8">
        Empowering learners today to become the leaders of tomorrow with a blend
        of CBC, ICT, and Islamic education.
      </p>
      <MyShimmerButton shimmerSize="0.5em" shimmerColr="purple">
        <Link
          href="/about"
          // className="px-6 py-3 bg-white text-blue-600 font-semibold rounded hover:bg-gray-200"
          className=" bg-white text-blue-600 font-semibold rounded hover:bg-gray-200"
        >
          Learn More About Us
        </Link>
      </MyShimmerButton>
    </div>

    {/* Why Choose Us Section */}
    <div className="py-16 px-10 text-center">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">
        Why Choose Aburayan Academy?
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        <MyShineBorder className="bg-white p-6 shadow rounded">
          <h3 className="text-xl font-semibold mb-4">
            Competency-Based Curriculum
          </h3>
          <p>
            We provide a modern CBC curriculum designed to nurture critical
            thinking, creativity, and innovation in students.
          </p>
        </MyShineBorder>
        <MyShineBorder className="bg-white p-6 shadow rounded">
          <h3 className="text-xl font-semibold mb-4">
            Integrated ICT Learning
          </h3>
          <p>
            Our ICT-integrated programs ensure students gain essential digital
            skills to excel in a technology-driven world.
          </p>
        </MyShineBorder>
        <MyShineBorder className="bg-white p-6 shadow rounded">
          <h3 className="text-xl font-semibold mb-4">
            Strong Islamic Foundation
          </h3>
          <p>
            We instill Islamic values alongside academics to nurture morally
            upright and responsible individuals.
          </p>
        </MyShineBorder>
      </div>
    </div>

    {/* Programs Section */}
    <div className="bg-blue-50 py-16 px-10">
      <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
        Our Programs
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        <MyMagicCard>
          <h3 className="text-xl font-semibold mb-4">
            Early Childhood Education
          </h3>
          <p>
            A nurturing environment where young learners explore and grow
            through play-based and structured activities.
          </p>
        </MyMagicCard>
        <MyMagicCard>
          <h3 className="text-xl font-semibold mb-4">Primary School</h3>
          <p>
            Comprehensive academic programs that combine CBC, ICT, and Islamic
            studies to prepare students for the future.
          </p>
        </MyMagicCard>
        <MyMagicCard>
          <h3 className="text-xl font-semibold mb-4">After-School Programs</h3>
          <p>
            Enrichment activities including coding, swimming and Quran
            memorization to enhance student skills and knowledge.
          </p>
        </MyMagicCard>
      </div>
    </div>

    {/* Testimonials Section */}
    <div className="py-16 px-10 bg-white">
      <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
        What Parents Say
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-100 p-6 shadow rounded">
          <p className="italic">
            &quot;Aburayan Academy has transformed my child&apos;s learning
            experience. The blend of CBC and ICT is incredible!&quot;
          </p>
          <p className="text-right mt-4 font-bold">- Aisha Ahmed</p>
        </div>
        <div className="bg-gray-100 p-6 shadow rounded">
          <p className="italic">
            &quot;The focus on Islamic education alongside academics makes this
            school unique and valuable.&quot;
          </p>
          <p className="text-right mt-4 font-bold">- Yusuf Hassan</p>
        </div>
      </div>
    </div>

    {/* Call to Action */}
    <div className="bg-blue-300 text-white py-16 text-center">
      <h2 className="text-3xl font-bold mb-4">Join Aburayan Academy Today!</h2>
      <p className="text-lg mb-8">
        Give your child the opportunity to excel academically and morally.
        Enroll now!
      </p>
      <Link
        href="/contact"
        className="px-6 py-3 bg-white text-blue-600 font-semibold rounded hover:bg-gray-200"
      >
        Contact Us
      </Link>
    </div>
  </div>
);

export default LandingPage;
