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
              Abu Rayyan Academy was founded in 2010 with a vision to provide world-class education 
              rooted in Islamic values. What started as a small community initiative in Mombasa has 
              grown into one of Kenya's most respected educational institutions.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Our founders recognized the need for an educational environment that would nurture both 
              academic excellence and strong moral character, creating future leaders who would 
              contribute positively to society.
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
                  2010
                </Badge>
                <h3 className="text-xl font-semibold">Foundation</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Abu Rayyan Academy was established with just 50 students and a passionate team of educators.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  2013
                </Badge>
                <h3 className="text-xl font-semibold">First Graduation</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our first class of students graduated with outstanding KCPE results, setting the standard for excellence.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  2015
                </Badge>
                <h3 className="text-xl font-semibold">Campus Expansion</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  New facilities including science laboratories and a computer lab were added to enhance learning.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                  2018
                </Badge>
                <h3 className="text-xl font-semibold">ICT Integration</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Digital learning tools and coding programs were introduced to prepare students for the modern world.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                  2020
                </Badge>
                <h3 className="text-xl font-semibold">Digital Transition</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Successfully transitioned to online learning during the pandemic, ensuring uninterrupted education.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <Badge className="bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">
                  2024
                </Badge>
                <h3 className="text-xl font-semibold">Excellence Recognition</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Recognized as one of the top performing schools in Mombasa County with multiple awards.
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
              <div className="text-4xl font-bold text-blue-600">1000+</div>
              <div className="text-lg font-semibold">Students Graduated</div>
              <p className="text-gray-600 dark:text-gray-400">
                Alumni making positive contributions across various fields
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
              <div className="text-4xl font-bold text-purple-600">50+</div>
              <div className="text-lg font-semibold">Expert Educators</div>
              <p className="text-gray-600 dark:text-gray-400">
                Dedicated teachers committed to student success
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