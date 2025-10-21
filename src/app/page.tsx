import React from "react";
import Link from "next/link";
import { MyShineBorder } from "@/components/custom/MyShinyBorder";
import { MyMagicCard } from "@/components/custom/MyMagicCard";
import { MyShimmerButton } from "@/components/custom/MyShimmerButton";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
          Learners Today … Leaders Tomorrow. Experience quality education that blends
          CBE, ICT, Islamic studies, and co-curricular activities. Serving over 300 students (by Jan 2025)
          since 2017 with excellence in education.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <MyShimmerButton shimmerSize="0.5em" shimmerColor="purple">
            <Link
              href="/about"
              className="bg-white text-blue-600 px-6 py-3 font-semibold rounded hover:bg-gray-200"
            >
              Learn More About Us
            </Link>
          </MyShimmerButton>
          <Link
            href="/contact"
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition-colors"
          >
            Schedule a Visit
          </Link>
        </div>
      </div>
    </div>

    {/* Statistics Section */}
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Abu-Rayyan Academy by the Numbers
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">8+</div>
            <div className="text-xl">Years of Excellence</div>
            <div className="text-sm opacity-80">Since 2017</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">300+</div>
            <div className="text-xl">Students</div>
            <div className="text-sm opacity-80">By January 2025</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">95%</div>
            <div className="text-xl">Success Rate</div>
            <div className="text-sm opacity-80">Academic Excellence</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">30+</div>
            <div className="text-xl">Qualified Teachers</div>
            <div className="text-sm opacity-80">Dedicated Staff</div>
          </div>
        </div>
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
            alt="CBE Curriculum"
            width={2050}
            height={2050}
            className="mx-auto mb-4 w-full h-auto"
          />
          <h3 className="text-xl font-semibold mb-4">
            Competency-Based Education (CBE)
          </h3>
          <p className="max-w-3xl text-thin text-justify px-2 py-1 text-wrap">
            We follow the Competency-Based Education (CBE) system that nurtures critical thinking,
            creativity, and problem-solving skills. Our programs cover Nursery & Lower Primary
            (Baby Class, PP1, PP2, Grades 1–3), Upper Primary (Grades 4–6), Junior Secondary
            (Grades 7–9), and Senior Secondary (Grades 10–12).
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
            Our comprehensive ICT programs provide students with essential digital skills
            integrated into the CBE curriculum. We have a dedicated ICT lab and offer
            specialized ICT programs to prepare students for the digital world.
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
            We offer an Islamic Integrated Program and Tahfidh Program that blend
            academics with Islamic teachings, promoting moral integrity, responsibility,
            and strong Islamic values among our students.
          </p>
        </MyShineBorder>
      </div>
    </div>

    {/* Trust Indicators Section */}
    <div className="py-16 px-10 bg-white">
      <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
        Accreditations & Achievements
      </h2>
      <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        <div className="text-center p-4">
          <div className="text-4xl mb-3">🏆</div>
          <h4 className="font-semibold mb-2">MoE Registered</h4>
          <p className="text-sm text-gray-600">Fully accredited by Kenya Ministry of Education</p>
        </div>
        <div className="text-center p-4">
          <div className="text-4xl mb-3">🔒</div>
          <h4 className="font-semibold mb-2">Safe Environment</h4>
          <p className="text-sm text-gray-600">CCTV monitored campus with trained security</p>
        </div>
        <div className="text-center p-4">
          <div className="text-4xl mb-3">💻</div>
          <h4 className="font-semibold mb-2">Modern Facilities</h4>
          <p className="text-sm text-gray-600">State-of-the-art ICT labs and equipment</p>
        </div>
        <div className="text-center p-4">
          <div className="text-4xl mb-3">📚</div>
          <h4 className="font-semibold mb-2">CBE Compliant</h4>
          <p className="text-sm text-gray-600">Fully aligned with Kenya CBE curriculum</p>
        </div>
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
            Nursery & Lower Primary (Baby Class, PP1, PP2, Grades 1–3)
          </h3>
          <p className="max-w-3xl text-thin text-justify px-2 py-1 text-wrap">
            Our early childhood and lower primary programs provide a nurturing environment
            where young learners develop foundational skills through play-based learning
            and structured CBE activities.
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
            Upper Primary (Grades 4–6)
          </h3>
          <p className="max-w-3xl text-thin text-justify px-2 py-1 text-wrap">
            Our upper primary curriculum strengthens academic foundations with
            comprehensive CBE, ICT integration, and Islamic studies to prepare
            students for secondary education.
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
            Junior & Senior Secondary (Grades 7–12)
          </h3>
          <p className="max-w-3xl text-thin text-justify px-2 py-1 text-wrap">
            We provide robust academic programs for secondary students, emphasizing
            critical thinking, advanced ICT skills, and Islamic values to prepare
            them for higher education and future careers.
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
          <h3 className="text-xl font-semibold mb-4">Special Programs</h3>
          <p className="max-w-3xl text-thin text-justify px-2 py-1 text-wrap">
            We offer specialized programs including Islamic
            Integrated Program, Tahfidh Program, Swimming Program, ICT Program, and Tuition Program
            to cater to diverse learning needs.
          </p>
        </MyMagicCard>
      </div>
    </div>

    {/* News & Events Section */}
    <div className="py-16 px-10 bg-gradient-to-br from-blue-50 to-purple-50">
      <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
        Latest News & Events
      </h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow">
          <div className="text-sm text-blue-600 font-semibold mb-2">📅 Upcoming Event</div>
          <h3 className="text-xl font-bold mb-3">Graduation Ceremony 2025</h3>
          <p className="text-gray-600 mb-4">
            Join us on <strong>8th November, 2025</strong> for our annual graduation ceremony, celebrating all graduating classes—PP2, Grade 6, and Grade 9—as they transition to their next academic levels. Note: Senior School (Grade 10) begins January 2026 under CBE.
          </p>
          <Link href="/contact" className="text-blue-600 font-semibold hover:underline">
            RSVP for Graduation →
          </Link>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow">
          <div className="text-sm text-green-600 font-semibold mb-2">🎉 Achievement</div>
          <h3 className="text-xl font-bold mb-3">100% CBE Transition</h3>
          <p className="text-gray-600 mb-4">
            Proud to announce 100% of our Grade 6 students successfully 
            transitioned to Junior Secondary with excellent results!
          </p>
          <Link href="/about" className="text-blue-600 font-semibold hover:underline">
            Read More →
          </Link>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow">
          <div className="text-sm text-purple-600 font-semibold mb-2">💡 New Program</div>
          <h3 className="text-xl font-bold mb-3">Advanced ICT Labs</h3>
          <p className="text-gray-600 mb-4">
            New computer labs with latest technology now available. Enhanced 
            digital learning for all grades starting this term.
          </p>
          <Link href="/programs" className="text-blue-600 font-semibold hover:underline">
            Learn More →
          </Link>
        </div>
      </div>
    </div>

    {/* Testimonials Section */}
    <div className="py-16 px-10 bg-white">
      <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
        What Parents Say About Us
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-gray-50 p-6 shadow-lg rounded-lg border-l-4 border-blue-500">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
              A
            </div>
            <div className="ml-3">
              <p className="font-bold">Aisha Ahmed</p>
              <p className="text-sm text-gray-500">Parent, Grade 5</p>
            </div>
          </div>
          <div className="text-yellow-400 mb-3">⭐⭐⭐⭐⭐</div>
          <p className="italic text-gray-700">
            &quot;Abu-Rayyan Academy has transformed my child&apos;s learning
            experience. The CBE approach combined with ICT and Islamic studies
            is exceptional! My daughter loves coming to school every day.&quot;
          </p>
        </div>
        <div className="bg-gray-50 p-6 shadow-lg rounded-lg border-l-4 border-green-500">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center text-green-600 font-bold text-xl">
              Y
            </div>
            <div className="ml-3">
              <p className="font-bold">Yusuf Hassan</p>
              <p className="text-sm text-gray-500">Parent, Grade 8</p>
            </div>
          </div>
          <div className="text-yellow-400 mb-3">⭐⭐⭐⭐⭐</div>
          <p className="italic text-gray-700">
            &quot;The balance between academics and Islamic values has made this
            school stand out. My son is thriving here and the teachers are very
            dedicated and caring!&quot;
          </p>
        </div>
        <div className="bg-gray-50 p-6 shadow-lg rounded-lg border-l-4 border-purple-500">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center text-purple-600 font-bold text-xl">
              F
            </div>
            <div className="ml-3">
              <p className="font-bold">Fatma Ali</p>
              <p className="text-sm text-gray-500">Parent, PP2</p>
            </div>
          </div>
          <div className="text-yellow-400 mb-3">⭐⭐⭐⭐⭐</div>
          <p className="italic text-gray-700">
            &quot;The early childhood program is outstanding! My child has developed
            confidence and foundational skills. The ICT integration even at this
            level is impressive.&quot;
          </p>
        </div>
      </div>
    </div>

    {/* FAQ Section */}
    <div className="py-16 px-10 bg-gray-50">
      <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left font-semibold">
              What age groups do you accept?
            </AccordionTrigger>
            <AccordionContent>
              We accept students from Baby Class (age 3) through Senior Secondary (Grade 12). 
              Our programs include Nursery & Lower Primary (Baby Class, PP1, PP2, Grades 1–3), 
              Upper Primary (Grades 4–6), and Junior & Senior Secondary (Grades 7–12).
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left font-semibold">
              What curriculum do you follow?
            </AccordionTrigger>
            <AccordionContent>
              We follow the Kenyan Competency-Based Education (CBE) curriculum, fully integrated 
              with ICT programs and Islamic studies. Our approach nurtures critical thinking, 
              creativity, and problem-solving skills while maintaining strong Islamic values.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left font-semibold">
              How do I enroll my child?
            </AccordionTrigger>
            <AccordionContent>
              You can start by contacting us through our contact page or visiting our campus. 
              We recommend scheduling a tour to meet our staff, see our facilities, and learn 
              more about our programs. Our admissions team will guide you through the enrollment process.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left font-semibold">
              What makes Abu-Rayyan Academy different?
            </AccordionTrigger>
            <AccordionContent>
              We offer a unique blend of academic excellence through CBE, comprehensive ICT integration, 
              strong Islamic foundation with Tahfidh programs, qualified and caring teachers, modern 
              facilities, and a safe learning environment. We&apos;ve been serving the community with 
              excellence since 2017.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-left font-semibold">
              Do you offer transportation and meals?
            </AccordionTrigger>
            <AccordionContent>
              Yes, we offer school transportation services covering various routes in Mombasa. 
              We also provide nutritious meals and snacks as part of our comprehensive care for students. 
              Contact us for specific details about routes and meal plans.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger className="text-left font-semibold">
              What are your class sizes?
            </AccordionTrigger>
            <AccordionContent>
              We maintain small class sizes to ensure personalized attention for each student. 
              Our teacher-to-student ratio allows for effective learning, individual support, 
              and strong relationships between teachers and students.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>

    {/* Mid-page CTA */}
    <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-12 px-10 text-center">
      <h3 className="text-2xl font-bold mb-4">
        Ready to Give Your Child the Best Education?
      </h3>
      <p className="mb-6 max-w-2xl mx-auto">
        Join hundreds of satisfied parents who have chosen Abu-Rayyan Academy for 
        academic excellence and moral development.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/contact"
          className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
        >
          Enroll Now
        </Link>
        <Link
          href="/about"
          className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
        >
          Download Prospectus
        </Link>
      </div>
    </div>
  </div>
);

export default LandingPage;
