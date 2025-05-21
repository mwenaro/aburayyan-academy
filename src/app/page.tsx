import React from "react";
import Link from "next/link";
import { MyShineBorder } from "@/components/custom/MyShinyBorder";
import { MyMagicCard } from "@/components/custom/MyMagicCard";
import { MyShimmerButton } from "@/components/custom/MyShimmerButton";
import Image from "next/image";

const LandingPage: React.FC = () => (
  <div className="bg-gray-100">
    {/* Hero Section */}
    <div className="relative text-white py-24 text-center h-1/2 overflow-hidden">
      <Image
        // src="/school/about-us-hero-image.jpg"
        src={"/school/teachers/abu-rayyan-teachers-2024-male-sitting.JPG"}
        alt="School Environment"
        layout="fill"
        // width={1080}
        // height={1008}
        objectFit="cover"
        priority
        className="absolute inset-0  w-full "
      />
      <div className="relative z-10 bg-opacity-95 ">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to Abu-Rayyan Academy
        </h1>
        <p className="text-lg mb-8">
          Empowering learners today to become the leaders of tomorrow with a
          blend of CBC, ICT, swimming, and Islamic education.
        </p>
        <MyShimmerButton shimmerSize="0.5em" shimmerColor="purple">
          <Link
            href="/about"
            className="bg-white text-blue-600 font-semibold rounded hover:bg-gray-200"
          >
            Learn More About Us
          </Link>
        </MyShimmerButton>
      </div>
    </div>

    {/* Why Choose Us Section */}
    <div className="py-16 px-10 text-center">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">
        Why Choose Abu-Rayyan Academy?
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        <MyShineBorder className="bg-white px-2 py-1 shadow rounded">
          <Image
            src="/school/home/cbc-students.jpg"
            alt="CBC Curriculum"
            width={2050}
            height={2050}
            className="mx-auto mb-4 w-full h-auto"
          />
          <h3 className="text-xl font-semibold mb-4">
            Competency-Based Curriculum (CBC)
          </h3>
          <p className="max-w-3xl text-thin text-justify px-2 py-1 text-wrap">
            We offer a CBC curriculum that nurtures critical thinking,
            creativity, and problem-solving in students across various levels:
            Pre-primary (PP1, PP2), Lower Primary (Grade 1-3), Upper Primary
            (Grade 4-6), and Junior Secondary (Grade 7-9).
          </p>
        </MyShineBorder>
        <MyShineBorder className="bg-white px-2 py-1 shadow rounded">
          {/* <Image src="/images/ict-icon.png" alt="ICT Learning" width={2050} height={2050} className="mx-auto mb-4 w-full h-auto" /> */}
          <Image
            src="/school/ict-learning.jpg"
            alt="ICT Learning"
            width={2050}
            height={2050}
            className=" w-full"
          />
          <h3 className="text-xl font-semibold mb-4">
            Integrated ICT Learning
          </h3>
          <p className="max-w-3xl text-thin text-justify px-2 py-1 text-wrap">
            Our ICT programs provide students with essential digital skills that
            are integrated into our CBC curriculum, preparing them for success
            in a technology-driven world.
          </p>
        </MyShineBorder>
        <MyShineBorder className="bg-white px-2 py-1 shadow rounded">
          <Image
            src="/school/home/islamic-studies-students.jpg"
            alt="Islamic Foundation"
            width={2050}
            height={2050}
            className="mx-auto mb-4 w-full h-auto"
          />
          <h3 className="text-xl font-semibold mb-4">
            Strong Islamic Foundation
          </h3>
          <p className="max-w-3xl text-thin text-justify px-2 py-1 text-wrap">
            We blend academics with Islamic teachings, promoting moral integrity
            and responsibility among our students.
          </p>
        </MyShineBorder>
      </div>
    </div>

    {/* Programs Section */}
    <div className="bg-blue-50 py-16 px-10">
      <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
        Our Programs
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2   gap-4">
        <MyMagicCard>
          <Image
            src="/school/home/pp-students.jpg"
            alt="Early Childhood"
            width={300}
            height={200}
            className="rounded mb-4 w-full"
          />
          <h3 className="text-xl font-semibold mb-4">
            Early Childhood Education (PP1, PP2)
          </h3>
          <p className="max-w-3xl text-thin text-justify px-2 py-1 text-wrap">
            Our pre-primary programs offer a nurturing environment where young
            learners grow and explore through play-based and structured
            activities.
          </p>
        </MyMagicCard>
        <MyMagicCard>
          <Image
            src="/school/home/grade1-6.jpg"
            alt="Primary School"
            width={2400}
            height={2400}
            className="rounded mb-4 h-[70%] w-auto"
          />
          <h3 className="text-xl font-semibold mb-4">
            Primary School (Grade 1-6)
          </h3>
          <p className="max-w-3xl text-thin text-justify px-2 py-1 text-wrap">
            Our primary school curriculum blends CBC, ICT, and Islamic studies
            to provide a comprehensive education that fosters holistic
            development.
          </p>
        </MyMagicCard>
        <MyMagicCard>
          <Image
            src="/school/home/junior-grade-9.jpg"
            alt="Junior Secondary"
            width={2400}
            height={2400}
            className="rounded mb-4 h-[70%] w-auto"
          />
          <h3 className="text-xl font-semibold mb-4">
            Junior Secondary (Grade 7-9)
          </h3>
          <p className="max-w-3xl text-thin text-justify px-2 py-1 text-wrap">
            We provide a robust academic program for junior secondary students,
            emphasizing critical thinking, ICT skills, and Islamic values to
            prepare them for further education and life challenges.
          </p>
        </MyMagicCard>
        <MyMagicCard>
          <Image
            src="/school/home/scouts.jpg"
            alt="Co-curricular Activities"
            width={2400}
            height={2400}
            className="rounded mb-4 w-full"
          />
          <h3 className="text-xl font-semibold mb-4">Co-curricular Activities</h3>
          <p className="max-w-3xl text-thin text-justify px-2 py-1 text-wrap">
            We offer enrichment activities including swimming, Scouting,Guiding & Counseling,
            and Quran memorization to enhance student skills and knowledge.
          </p>
        </MyMagicCard>
      </div>
    </div>

    {/* Testimonials Section */}
    {/* <div className="py-16 px-10 bg-white">
      <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
        What Parents Say
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-100 p-6 shadow rounded text-center">
          <Image
            src="/images/parent1.jpg"
            alt="Parent Testimonial"
            width={2050}
            height={2050}
            className="rounded-full mx-auto mb-4 w-full h-auto"
          />
          <p className="italic">
            &quot;Abu-Rayyan Academy has transformed my child&apos;s learning
            experience. The CBC approach combined with ICT and Islamic studies
            is exceptional!&quot;
          </p>
          <p className="text-right mt-4 font-bold">- Aisha Ahmed</p>
        </div>
        <div className="bg-gray-100 p-6 shadow rounded text-center">
          <Image
            src="/images/parent2.jpg"
            alt="Parent Testimonial"
            width={2050}
            height={2050}
            className="rounded-full mx-auto mb-4 w-full h-auto"
          />
          <p className="italic">
            &quot;The balance between academics and Islamic values has made this
            school stand out. My child is thriving here!&quot;
          </p>
          <p className="text-right mt-4 font-bold">- Yusuf Hassan</p>
        </div>
      </div>
    </div> */}

    {/* Call to Action */}
    <div className="bg-blue-300 text-white py-16 text-center">
      <h2 className="text-3xl font-bold mb-4">
        Join Abu-Rayyan Academy Today!
      </h2>
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
