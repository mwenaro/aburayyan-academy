import React from "react";

const AboutPage: React.FC = () => (
  <div className="p-10">
    <h1 className="text-3xl font-bold text-blue-600">About Us</h1>

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
        Aburayan Academy was established in 2010 with a vision to provide
        quality education that integrates modern learning techniques with
        Islamic values. Starting with a single classroom and just a handful of
        students, the academy has grown exponentially over the years, now
        serving hundreds of learners across various age groups.
      </p>
      <p className="mt-2">
        From humble beginnings, we have become a trusted educational institution
        in Mombasa, offering competency-based curriculum (CBC) seamlessly
        integrated with ICT and Islamic studies. Our commitment to holistic
        education has earned us a reputation for nurturing both academic
        excellence and moral integrity.
      </p>
    </div>

    {/* Mission */}
    <div className="mt-8">
      <h2 className="text-xl font-semibold">Our Mission:</h2>
      <p className="mt-2">
        Our mission is to empower learners with knowledge, skills, and values to
        become competent, responsible, and innovative leaders of tomorrow. We
        strive to create a learning environment that fosters curiosity,
        creativity, and critical thinking while remaining rooted in moral and
        ethical teachings.
      </p>
    </div>

    {/* Vision */}
    <div className="mt-8">
      <h2 className="text-xl font-semibold">Our Vision:</h2>
      <p className="mt-2">
        To be a beacon of educational excellence in Mombasa, inspiring students
        to achieve their full potential and contribute positively to society
        through leadership and service.
      </p>
    </div>

    {/* Core Values */}
    <div className="mt-8">
      <h2 className="text-xl font-semibold">Our Core Values:</h2>
      <ul className="mt-2 list-disc pl-5 space-y-2">
        <li>Excellence in education and character development</li>
        <li>Commitment to integrating modern and Islamic education</li>
        <li>Respect for diversity and inclusion</li>
        <li>Innovation in teaching and learning methods</li>
        <li>Accountability and integrity in all we do</li>
      </ul>
    </div>
  </div>
);

export default AboutPage;
