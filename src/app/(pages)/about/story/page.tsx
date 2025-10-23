import Image from "next/image";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const OurStoryPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src="/school/about-us-hero-image.jpg"
          alt="Abu Rayyan Academy Story"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/60 flex items-center justify-center">
          <div className="text-center text-white space-y-4">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Est. 2010
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold">Our Story</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto px-4">
              A journey of excellence in Islamic education and academic achievement
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Foundation Story */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              The Beginning
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Abu-Rayyan Academy was established in January 2017 by Directors Dr. Abdirazack Yussuf Abdinur and Madam Salatha Mohammed with a vision to provide quality education that integrates modern learning techniques with Islamic values. Starting with just 3 students in our first location in Nyali, Mombasa, the academy has grown exponentially over the years.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Our first graduation ceremony was held in December 2017 with 3 graduates. From these humble beginnings, we have become a trusted educational institution in Mombasa, now serving over 300 students at our current location along Ronald Ngala Road, opposite Petro Gas Station. We offer Competency-Based Education (CBE) seamlessly integrated with ICT and Islamic studies, with over 25 teaching and non-teaching staff members dedicated to excellence in education.
            </p>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/school/school-image.jpg"
              alt="Abu Rayyan Academy Foundation"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Milestones Timeline */}
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white">
            Our Journey
          </h2>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  2017
                </Badge>
                <h3 className="text-xl font-semibold">Establishment</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Abu-Rayyan Academy is established in January 2017 by Dr. Abdirazack Yussuf Abdinur and Madam Salatha Mohammed, starting with just 3 students in Nyali, Mombasa.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  2017
                </Badge>
                <h3 className="text-xl font-semibold">First Graduation</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  The first graduation ceremony is held in December 2017 with 3 graduates, marking the beginning of a tradition of excellence.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  2018–2022
                </Badge>
                <h3 className="text-xl font-semibold">Growth & Relocation</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  The academy grows rapidly, expanding its student body and staff, and relocates to Ronald Ngala Road, opposite Petro Gas Station, to accommodate increasing enrollment.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                  2023
                </Badge>
                <h3 className="text-xl font-semibold">Modern Facilities</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Introduction of modern facilities including ICT and science labs, multi-purpose halls, and a canteen, supporting holistic education.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <Badge className="bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">
                  2024
                </Badge>
                <h3 className="text-xl font-semibold">Current Status</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Now serving over 300 students with 25+ staff, Abu-Rayyan Academy is recognized for its commitment to quality education, Islamic values, and innovation in Mombasa.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Values and Impact */}
        <div className="text-center space-y-8 bg-gray-50 dark:bg-gray-900 rounded-xl p-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Our Impact Today
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="text-4xl font-bold text-blue-600">300+</div>
              <div className="text-lg font-semibold">Learners</div>
              <p className="text-gray-600 dark:text-gray-400">
                Over 300 learners currently enrolled and growing
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-bold text-green-600">95%</div>
              <div className="text-lg font-semibold">Success Rate</div>
              <p className="text-gray-600 dark:text-gray-400">
                Students progressing to secondary education with excellent grades
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-bold text-purple-600">20+</div>
              <div className="text-lg font-semibold">Educators</div>
              <p className="text-gray-600 dark:text-gray-400">
                Over 20 dedicated teaching and non-teaching staff members
              </p>
            </div>
          </div>
        </div>

        {/* Future Vision */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/school/computer-lab.jpg"
              alt="Future of Abu Rayyan Academy"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Looking Forward
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              As we continue our journey, Abu Rayyan Academy remains committed to innovation in education 
              while staying true to our Islamic values. We are expanding our programs to include more 
              STEM initiatives, environmental conservation projects, and community outreach programs.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Our vision is to be the leading Islamic educational institution in East Africa, 
              preparing students not just for academic success, but for meaningful lives of service 
              and leadership in their communities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStoryPage;