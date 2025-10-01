import Image from "next/image";
import React from "react";

const AboutPage: React.FC = () => (
  <div>
    {/* Hero Section */}
    <div
    className="relative min-h-96 h-full w-full bg-cover bg-center "
    // style={{
    //   backgroundImage: `url('/school/about-us-hero-image.jpg')`, // Replace with your image URL
    // }}
    >
      <Image
        src="/school/about-us-hero-image.jpg"
        alt="School Environment"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0  w-full "
      />
      {/* <div className="absolute inset-0 bg-blue-900 bg-opacity-25 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">About Us</h1> 
      </div> */}
    </div>

    {/* Content Section */}
    <div className="py-4 px-2 ">
    <h1 className="text-4xl font-bold text-black ">About Us</h1>
 
      {/* Motto */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Our Motto:</h2>
        <p className="mt-2 italic">
          &quot;Learners Today, Leaders Tomorrow.&quot;
        </p>
      </div>

      {/* History */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Our History:</h2>
        <p className="mt-2">
          Abu-Rayyan Academy was established in January 2017 by Directors Dr. Abdirazack Yussuf Abdinur 
          and Madam Salatha Mohammed with a vision to provide quality education that integrates modern 
          learning techniques with Islamic values. Starting with just 3 students in our first location 
          in Nyali, Mombasa, the academy has grown exponentially over the years.
        </p>
        <p className="mt-2">
          Our first graduation ceremony was held in December 2017 with 3 graduates. From these humble 
          beginnings, we have become a trusted educational institution in Mombasa, now serving over 300 
          students at our current location along Ronald Ngala Road, opposite Petro Gas Station. We offer 
          Competency-Based Education (CBE) seamlessly integrated with ICT and Islamic studies, with over 
          25 teaching and non-teaching staff members dedicated to excellence in education.
        </p>
      </div>

      {/* Leadership */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Our Leadership:</h2>
        <p className="mt-2">
          <strong>Directors:</strong> Dr. Abdirazack Yussuf Abdinur & Madam Salatha Mohammed<br/>
          <strong>Head of Institution:</strong> Mr. Duke Okioga
        </p>
      </div>

      {/* School Sections */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">School Sections:</h2>
        <ul className="mt-2 list-disc pl-5 space-y-1">
          <li><strong>Nursery & Lower Primary:</strong> Baby Class, PP1, PP2, Grades 1–3</li>
          <li><strong>Upper Primary:</strong> Grades 4–6</li>
          <li><strong>Junior Secondary:</strong> Grades 7–9</li>
          <li><strong>Senior Secondary:</strong> Grades 10–12</li>
        </ul>
      </div>

      {/* Programs */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Programs Offered:</h2>
        <ul className="mt-2 list-disc pl-5 space-y-1">
          <li>Formal School (CBE – formerly CBC)</li>
          <li>Islamic Integrated Program</li>
          <li>Tahfidh Program</li>
          <li>ICT Program</li>
          <li>Tuition Program</li>
        </ul>
      </div>

      {/* Facilities */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Our Facilities:</h2>
        <ul className="mt-2 list-disc pl-5 space-y-1">
          <li>Spacious classrooms</li>
          <li>Assembly hall</li>
          <li>Multi-purpose hall</li>
          <li>ICT lab</li>
          <li>Science lab</li>
          <li>School canteen</li>
        </ul>
      </div>

      {/* Co-curricular Activities */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Co-curricular Activities:</h2>
        <ul className="mt-2 list-disc pl-5 space-y-1">
          <li>Swimming</li>
          <li>Sports (football, basketball, athletics, volleyball)</li>
          <li>Scouting</li>
          <li>Debate & Mjadala</li>
          <li>Guidance & Counselling</li>
          <li>ICT</li>
          <li>Journalism clubs</li>
        </ul>
      </div>

      {/* Mission */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Our Mission:</h2>
        <p className="mt-2">
          Our mission is to empower learners with knowledge, skills, and values to become competent, 
          responsible, and innovative leaders of tomorrow. We strive to create a learning environment 
          that fosters curiosity, creativity, and critical thinking while remaining rooted in moral 
          and ethical teachings through our integrated approach to education.
        </p>
      </div>

      {/* Vision */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Our Vision:</h2>
        <p className="mt-2">
          To be a beacon of educational excellence in Mombasa and beyond, inspiring students to 
          achieve their full potential and contribute positively to society through leadership, 
          service, and strong moral character rooted in Islamic values.
        </p>
      </div>

      {/* Core Values */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Our Core Values:</h2>
        <ul className="mt-2 list-disc pl-5 space-y-2">
          <li>Excellence in education and character development</li>
          <li>Commitment to integrating modern CBE curriculum with Islamic education</li>
          <li>Respect for diversity and inclusion in our learning community</li>
          <li>Innovation in teaching and learning methods with ICT integration</li>
          <li>Accountability and integrity in all our educational practices</li>
          <li>Holistic development of learners as future leaders</li>
        </ul>
      </div>

      {/* Additional Information */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Why Choose Abu-Rayyan Academy:</h2>
        <ul className="mt-2 list-disc pl-5 space-y-2">
          <li>Over 300 students enrolled and growing</li>
          <li>Experienced team of over 25 teaching and non-teaching staff</li>
          <li>Modern facilities including ICT and science laboratories</li>
          <li>Comprehensive co-curricular activities program</li>
          <li>Strong track record since establishment in 2017</li>
          <li>Convenient location along Ronald Ngala Road, Mombasa</li>
        </ul>
      </div>
    </div>
  </div>
);

export default AboutPage;
