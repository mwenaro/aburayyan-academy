import Image from "next/image";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  Eye,
  Heart,
  Users,
  BookOpen,
  Star,
  Globe,
  Lightbulb,
  Shield,
  Award,
} from "lucide-react";

const MissionVisionPage: React.FC = () => {
  const coreValues = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Islamic Values",
      description:
        "Integrating Islamic principles in all aspects of education and character development",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Academic Excellence",
      description:
        "Pursuing the highest standards in teaching, learning, and student achievement",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community",
      description:
        "Building strong relationships within our school community and broader society",
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation",
      description:
        "Embracing modern teaching methods and technology to enhance learning experiences",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Integrity",
      description:
        "Upholding honesty, transparency, and ethical behavior in all our interactions",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Citizenship",
      description:
        "Preparing students to be responsible citizens who contribute to global well-being",
    },
  ];

  const objectives = [
    {
      icon: <Star className="w-6 h-6" />,
      title: "Holistic Development",
      description:
        "Nurture intellectual, spiritual, emotional, and physical growth in every student",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Leadership Skills",
      description:
        "Develop confident leaders who can make positive changes in their communities",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Critical Thinking",
      description:
        "Foster analytical thinking and problem-solving abilities for lifelong learning",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Moral Character",
      description:
        "Build strong ethical foundations based on Islamic teachings and universal values",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src="/school/about-us-hero-image.jpg"
          alt="Mission and Vision - Abu Rayyan Academy"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-blue-700/60 flex items-center justify-center">
          <div className="text-center text-white space-y-4 max-w-4xl mx-auto px-4">
            <Badge
              variant="secondary"
              className="bg-white/20 text-white border-white/30"
            >
              Guided by Purpose
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold">Mission & Vision</h1>
            <p className="text-xl md:text-2xl">
              Our commitment to excellence in Islamic education and character
              development
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-20">
        {/* Mission Statement */}
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full">
              <Target className="w-12 h-12 text-blue-600 dark:text-blue-300" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Our Mission
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 border-none shadow-lg">
              <CardContent className="p-12">
                <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 leading-relaxed text-center font-medium">
                  &quot;To provide exceptional Islamic education that nurtures
                  academic excellence, moral character, and spiritual growth,
                  preparing students to become confident, compassionate, and
                  responsible global citizens who contribute positively to
                  society.&quot;
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Vision Statement */}
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full">
              <Eye className="w-12 h-12 text-green-600 dark:text-green-300" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Our Vision
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-green-50 to-purple-50 dark:from-green-950 dark:to-purple-950 border-none shadow-lg">
              <CardContent className="p-12">
                <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 leading-relaxed text-center font-medium">
                  &quot;To be the leading Islamic educational institution in
                  East Africa, recognized for academic excellence, innovative
                  teaching methods, and graduates who exemplify Islamic values
                  while making meaningful contributions to the global
                  community.&quot;
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Core Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              The principles that guide our educational philosophy and daily
              practices
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <CardHeader className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full text-blue-600 dark:text-blue-300">
                      {value.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Educational Objectives */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-12 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Educational Objectives
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              The specific goals we aim to achieve through our comprehensive
              educational approach
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {objectives.map((objective, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-gray-800 hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg text-green-600 dark:text-green-300 flex-shrink-0">
                      {objective.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {objective.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {objective.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Commitment Statement */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Our Commitment
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                At Abu Rayyan Academy, we are committed to creating an
                environment where every student can thrive academically,
                spiritually, and socially. Our dedicated team of educators works
                tirelessly to ensure that our mission and vision are reflected
                in every aspect of our students&apos; educational journey.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                We believe that education is not just about acquiring knowledge,
                but about developing the wisdom to use that knowledge for the
                betterment of oneself and society. Through our Islamic-centered
                approach, we prepare students to face the challenges of the
                modern world while remaining true to their faith and values.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">14+</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Years of Excellence
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">100%</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Commitment to Values
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/school/abu-rayyan-teaching-staff.jpg"
              alt="Abu Rayyan Academy Commitment"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVisionPage;
