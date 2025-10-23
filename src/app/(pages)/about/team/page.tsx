import Image from "next/image";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Phone, 
  GraduationCap, 
  Users, 
  Award,
  BookOpen,
  Heart,
  Target
} from "lucide-react";

const LeadershipTeamPage: React.FC = () => {
  // Updated leadership structure
  const leadership = [
    {
      name: "Dr. Abdirazack Yussuf Abdinur",
      position: "Director",
      image: "/school/abu-rayyan-teaching-staff.jpg",
      bio: "Dr. Abdirazack Yussuf Abdinur is one of the esteemed Directors of Abu Rayyan Academy, providing visionary leadership and guidance.",
    },
    {
      name: "Madam Salatha Mohammed",
      position: "Director",
      image: "/school/abu-rayyan-teaching-staff.jpg",
      bio: "Madam Salatha Mohammed serves as Director, ensuring the highest standards of administration and care.",
    },
    {
      name: "Mr. Duke Okioga",
      position: "Principal & Sectional Head (Junior & Senior School)",
      image: "/school/abu-rayyan-teaching-staff.jpg",
      bio: "Mr. Duke Okioga leads the school as Principal and also heads the Junior & Senior School Section.",
    },
    {
      name: "Mr. Wekesa",
      position: "Sectional Head (Upper Primary School)",
      image: "/school/abu-rayyan-teaching-staff.jpg",
      bio: "Mr. Wekesa is responsible for the Upper Primary School Section, ensuring academic excellence and student growth.",
    },
    {
      name: "Madam Celestine",
      position: "Sectional Head (Pre-Primary & Lower Primary School)",
      image: "/school/abu-rayyan-teaching-staff.jpg",
      bio: "Madam Celestine leads the Pre-Primary & Lower Primary School Section, nurturing our youngest learners.",
    },
  ];

  // No departments array needed for the new structure

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src="/school/abu-rayyan-teaching-staff.jpg"
          alt="Leadership Team - Abu Rayyan Academy"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-blue-700/60 flex items-center justify-center">
          <div className="text-center text-white space-y-4 max-w-4xl mx-auto px-4">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Educational Excellence
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold">Leadership Team</h1>
            <p className="text-xl md:text-2xl">
              Dedicated educators committed to your child&apos;s success and development
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Introduction */}
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Meet Our Leadership
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            Our experienced leadership team combines decades of educational expertise with a deep 
            commitment to Islamic values. Each leader brings unique skills and perspectives that 
            contribute to our school&apos;s excellence in academic and character development.
          </p>
        </div>

        {/* Leadership Cards - Updated */}
        <div className="space-y-12">
          {leadership.map((leader, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="relative h-80 md:h-full">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:col-span-2 p-8 space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                        {leader.name}
                      </h3>
                      <Badge variant="secondary" className="text-sm">
                        {leader.position}
                      </Badge>
                    </div>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      {leader.bio}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Organizational Structure - Updated */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-12 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Leadership & Administration Structure
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              (From top to bottom)
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <ol className="list-decimal list-inside text-lg text-gray-800 dark:text-gray-200 space-y-4">
              <li>
                <span className="font-semibold">Directors:</span> Dr. Abdirazack Yussuf Abdinur & Madam Salatha Mohammed
              </li>
              <li>
                <span className="font-semibold">Principal:</span> Mr. Duke Okioga
              </li>
              <li>
                <span className="font-semibold">Sectional Heads:</span>
                <ul className="list-disc list-inside ml-6 space-y-2">
                  <li>Junior & Senior School Section – Mr. Duke Okioga</li>
                  <li>Upper Primary School Section – Mr. Wekesa</li>
                  <li>Pre-Primary & Lower Primary School Section – Madam Celestine</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>

        {/* Contact Information - Updated to match footer */}
        <div className="text-center space-y-8 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 rounded-xl p-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Connect with Our Leadership
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Our leadership team is always available to discuss your child&apos;s education and answer
            any questions about our programs and approach.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6 text-center space-y-4">
                <Phone className="w-8 h-8 mx-auto text-blue-600" />
                <h3 className="text-lg font-semibold">Phone</h3>
                <p className="text-gray-600 dark:text-gray-400">0722 299 287 / 0723 755 108</p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6 text-center space-y-4">
                <Mail className="w-8 h-8 mx-auto text-green-600" />
                <h3 className="text-lg font-semibold">Email</h3>
                <p className="text-gray-600 dark:text-gray-400">info@aburayyanacademy.com</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadershipTeamPage;