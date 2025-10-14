import Image from "next/image";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  BookOpen,
  GraduationCap,
  Award,
  Users,
  Clock,
  Target,
  TrendingUp,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const AcademicsPage: React.FC = () => {
  const academicPrograms = [
    {
      title: "Pre-Primary Education",
      description: "Foundation learning for ages 3-5 with play-based Islamic education",
      grades: "PP1 - PP2",
      icon: <Users className="w-8 h-8" />,
      features: ["Play-based learning", "Islamic foundation", "Motor skills development", "Social interaction"],
      link: "/academics/programs"
    },
    {
      title: "Primary Education",
      description: "Comprehensive curriculum following Kenyan CBC with Islamic values integration",
      grades: "Grade 1 - Grade 6",
      icon: <BookOpen className="w-8 h-8" />,
      features: ["CBC curriculum", "Islamic studies", "STEM focus", "Language development"],
      link: "/academics/programs"
    },
    {
      title: "Junior Secondary",
      description: "Advanced learning preparing students for senior secondary education",
      grades: "Grade 7 - Grade 9",
      icon: <GraduationCap className="w-8 h-8" />,
      features: ["Advanced curriculum", "Career guidance", "Leadership training", "ICT integration"],
      link: "/academics/programs"
    }
  ];

  const keyStrengths = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Academic Excellence",
      description: "Consistently high performance in national examinations and competitions"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Integrated Curriculum",
      description: "Seamless blend of secular education with Islamic teachings and values"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Personalized Learning",
      description: "Individual attention with small class sizes for optimal learning outcomes"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Continuous Assessment",
      description: "Regular evaluation and feedback to ensure student progress and development"
    }
  ];

  const subjects = [
    {
      category: "Core Subjects",
      items: ["Mathematics", "English Language", "Kiswahili", "Science & Technology", "Social Studies"]
    },
    {
      category: "Islamic Studies",
      items: ["Quran Studies", "Islamic History", "Arabic Language", "Fiqh & Aqeedah", "Hadith Studies"]
    },
    {
      category: "Special Programs",
      items: ["ICT & Coding", "Environmental Studies", "Life Skills", "Physical Education", "Creative Arts"]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src="/school/computer-lesson.jpg"
          alt="Academics - Abu Rayyan Academy"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-purple-700/60 flex items-center justify-center">
          <div className="text-center text-white space-y-4 max-w-4xl mx-auto px-4">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Excellence in Education
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold">Academics</h1>
            <p className="text-xl md:text-2xl">
              Comprehensive Islamic education preparing students for success in this world and the hereafter
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-20">
        {/* Introduction */}
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Academic Excellence with Islamic Values
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            Our academic program combines the rigorous Kenyan Competency-Based Curriculum with 
            comprehensive Islamic education, ensuring students excel academically while developing 
            strong moral character and spiritual foundation.
          </p>
        </div>

        {/* Academic Programs */}
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Our Academic Programs
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Structured learning pathways designed to meet the developmental needs of students at every stage
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {academicPrograms.map((program, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full text-blue-600 dark:text-blue-300">
                      {program.icon}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-2xl">{program.title}</CardTitle>
                    <Badge variant="outline" className="text-sm">
                      {program.grades}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                    {program.description}
                  </p>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Key Features:</h4>
                    <div className="space-y-2">
                      {program.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button asChild className="w-full">
                    <Link href={program.link}>
                      Learn More <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Strengths */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-12 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Our Academic Strengths
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              What makes our academic program stand out in providing quality Islamic education
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {keyStrengths.map((strength, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg text-purple-600 dark:text-purple-300 flex-shrink-0">
                      {strength.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {strength.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {strength.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Curriculum Overview */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Comprehensive Curriculum
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Our curriculum is carefully designed to meet both national educational standards 
              and Islamic educational principles. We ensure students receive a well-rounded 
              education that prepares them for academic success and spiritual growth.
            </p>
            
            <div className="space-y-6">
              {subjects.map((category, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {category.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((subject, subjectIndex) => (
                      <Badge key={subjectIndex} variant="secondary" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <Button asChild className="w-fit">
              <Link href="/academics/curriculum">
                View Full Curriculum <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/school/ict-learning.jpg"
              alt="Curriculum and Learning"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Academic Performance */}
        <div className="text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Academic Performance
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our commitment to excellence is reflected in our students&apos; outstanding academic achievements
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="p-6 space-y-4">
                <div className="text-4xl font-bold text-blue-600">95%</div>
                <div className="text-lg font-semibold">KCPE Success Rate</div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Students scoring 250+ marks
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6 space-y-4">
                <div className="text-4xl font-bold text-green-600">100%</div>
                <div className="text-lg font-semibold">Transition Rate</div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  To secondary education
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6 space-y-4">
                <div className="text-4xl font-bold text-purple-600">15+</div>
                <div className="text-lg font-semibold">Academic Awards</div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Regional competitions
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6 space-y-4">
                <div className="text-4xl font-bold text-orange-600">1:20</div>
                <div className="text-lg font-semibold">Teacher Ratio</div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Personalized attention
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-xl p-12">
          <div className="text-center space-y-8">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Explore Our Academic Resources
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <Button asChild variant="outline" className="h-auto p-6 flex-col space-y-2">
                <Link href="/academics/curriculum">
                  <BookOpen className="w-8 h-8" />
                  <span>Curriculum</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-6 flex-col space-y-2">
                <Link href="/academics/programs">
                  <GraduationCap className="w-8 h-8" />
                  <span>Programs</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-6 flex-col space-y-2">
                <Link href="/academics/assessment">
                  <Target className="w-8 h-8" />
                  <span>Assessment</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-6 flex-col space-y-2">
                <Link href="/academics/calendar">
                  <Clock className="w-8 h-8" />
                  <span>Calendar</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicsPage;