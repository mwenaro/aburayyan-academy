
import Image from "next/image";
import React from "react";
import { BookOpen, Users, Star, Heart, Lightbulb, Shield, Globe, Award, School, Building2, Trophy, MapPin, Layers, Book, GraduationCap, Eye } from "lucide-react";
import { motto, mission, vision, values, philosophy, history, stats } from "./aboutData";

const AboutPage: React.FC = () => (
  <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
    {/* Hero Section */}
    <div className="relative h-[45vh] w-full overflow-hidden flex items-center justify-center">
      <Image
        src="/school/about-us-hero-image.jpg"
        alt="School Environment"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-green-700/60 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg mb-4">About Us</h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto drop-shadow">{motto}</p>
      </div>
    </div>

    {/* Stats Section */}
    <div className="max-w-5xl mx-auto -mt-16 z-10 relative grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center">
        <Users className="w-10 h-10 text-blue-600 mb-2" />
        <div className="text-3xl font-bold">{stats.learners}+</div>
        <div className="text-gray-600 dark:text-gray-300">Learners</div>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center">
        <GraduationCap className="w-10 h-10 text-green-600 mb-2" />
        <div className="text-3xl font-bold">{stats.educators}+</div>
        <div className="text-gray-600 dark:text-gray-300">Educators</div>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center">
        <Trophy className="w-10 h-10 text-yellow-500 mb-2" />
        <div className="text-3xl font-bold">2017</div>
        <div className="text-gray-600 dark:text-gray-300">Established</div>
      </div>
    </div>

    {/* Main Content Section */}
    <div className="max-w-5xl mx-auto py-16 px-4 space-y-16">
      {/* History Timeline */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-blue-900 dark:text-blue-200 flex items-center gap-2"><BookOpen className="w-7 h-7" /> Our History</h2>
        <ol className="relative border-l-4 border-blue-200 dark:border-blue-800 ml-4">
          {history.map((item, idx) => (
            <li key={idx} className="mb-10 ml-6">
              <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full ring-4 ring-white dark:ring-gray-900 text-white font-bold">{item.year}</span>
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>


      {/* Mission & Vision */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 rounded-xl p-8 shadow flex flex-col items-center text-center">
          <Star className="w-10 h-10 text-yellow-500 mb-2" />
          <h2 className="text-2xl font-bold mb-2">Mission</h2>
          <p className="text-lg text-gray-700 dark:text-gray-200">{mission}</p>
        </div>
        <div className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-xl p-8 shadow flex flex-col items-center text-center">
          <Eye className="w-10 h-10 text-blue-500 mb-2" />
          <h2 className="text-2xl font-bold mb-2">Vision</h2>
          <p className="text-lg text-gray-700 dark:text-gray-200">{vision}</p>
        </div>
      </section>

      {/* History */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Our History:</h2>
        <ul className="mt-2 list-disc pl-5 space-y-2">
          {history.map((item, idx) => (
            <li key={idx}>
              <strong>{item.year} - {item.title}:</strong> {item.description}
            </li>
          ))}
        </ul>
      </div>


      {/* Leadership */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Users className="w-7 h-7" /> Our Leadership</h2>
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
          <div className="mb-2"><strong>Directors:</strong> Dr. Abdirazack Yussuf Abdinur & Madam Salatha Mohammed</div>
          <div><strong>Principal:</strong> Mr. Duke Okioga</div>
        </div>
      </section>


      {/* School Sections */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Layers className="w-7 h-7" /> School Sections</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
            <strong>Nursery & Lower Primary:</strong> Baby Class, PP1, PP2, Grades 1–3
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
            <strong>Upper Primary:</strong> Grades 4–6
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
            <strong>Junior Secondary:</strong> Grades 7–9
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
            <strong>Senior Secondary:</strong> Grades 10–12
          </div>
        </div>
      </section>


      {/* Programs Offered */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Book className="w-7 h-7" /> Programs Offered</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">Formal School (CBE – formerly CBC)</div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">Islamic Integrated Program</div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">Tahfidh Program</div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">ICT Program</div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">Tuition Program</div>
        </div>
      </section>


      {/* Facilities */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Building2 className="w-7 h-7" /> Our Facilities</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">Spacious classrooms</div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">Assembly hall</div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">Multi-purpose hall</div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">ICT lab</div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">Science lab</div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">School canteen</div>
        </div>
      </section>


      {/* Co-curricular Activities */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Trophy className="w-7 h-7" /> Co-curricular Activities</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">Swimming</div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">Sports (football, basketball, athletics, volleyball)</div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">Scouting</div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">Debate & Mjadala</div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">Guidance & Counselling</div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">ICT</div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">Journalism clubs</div>
        </div>
      </section>


      {/* Our Values */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Heart className="w-7 h-7" /> Our Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((v, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 flex flex-col items-center text-center">
              <div className="mb-2">
                {v.title === "Excellence" && <Star className="w-8 h-8 text-yellow-500" />}
                {v.title === "Compassion" && <Heart className="w-8 h-8 text-pink-500" />}
                {v.title === "Integrity" && <Shield className="w-8 h-8 text-blue-500" />}
                {v.title === "Respect" && <Users className="w-8 h-8 text-green-500" />}
                {v.title === "Passion" && <Lightbulb className="w-8 h-8 text-orange-500" />}
                {v.title === "Unity" && <Globe className="w-8 h-8 text-purple-500" />}
              </div>
              <div className="font-semibold text-lg mb-1">{v.title}</div>
              <div className="text-gray-600 dark:text-gray-300">{v.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* School Philosophy */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Lightbulb className="w-7 h-7" /> School Philosophy</h2>
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 text-lg text-gray-700 dark:text-gray-200">
          {philosophy}
        </div>
      </section>

      {/* Additional Information */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><MapPin className="w-7 h-7" /> Why Choose Abu-Rayyan Academy</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">Over {stats.learners}+ students enrolled and growing</div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">Experienced team of over {stats.educators} teaching and non-teaching staff</div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">Modern facilities including ICT and science laboratories</div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">Comprehensive co-curricular activities program</div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">Strong track record since establishment in 2017</div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">Convenient location along Ronald Ngala Road, Mombasa</div>
        </div>
      </section>

    </div>
  </div>
);

export default AboutPage;
