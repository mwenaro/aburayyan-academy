
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Computer, 
  Globe, 
  Monitor, 
  Smartphone, 
  Code, 
  Database, 
  Shield, 
  Wifi,
  BookOpen,
  Users,
  Trophy,
  Target,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  GraduationCap
} from "lucide-react";

const ictPrograms = [
  {
    title: "Computer Fundamentals",
    description: "Essential computer skills including MS Office, Internet navigation, and basic troubleshooting",
    duration: "2 Months",
    level: "Beginner",
    icon: <Computer className="w-6 h-6" />,
    features: ["Microsoft Office Suite", "Internet & Email", "File Management", "Basic Troubleshooting"]
  },
  {
    title: "Digital Literacy for Students",
    description: "Age-appropriate digital skills integrated into CBC curriculum",
    duration: "Ongoing",
    level: "All Levels",
    icon: <BookOpen className="w-6 h-6" />,
    features: ["CBC Integration", "Age-appropriate Content", "Digital Citizenship", "Creative Projects"]
  },
  {
    title: "Programming & Coding",
    description: "Introduction to programming languages and computational thinking",
    duration: "3 Months",
    level: "Intermediate",
    icon: <Code className="w-6 h-6" />,
    features: ["Scratch Programming", "Python Basics", "Web Development", "Problem Solving"]
  },
  {
    title: "AI & Machine Learning",
    description: "Introduction to artificial intelligence and modern technology trends",
    duration: "1 Month",
    level: "Advanced",
    icon: <Database className="w-6 h-6" />,
    features: ["AI Fundamentals", "ChatGPT Usage", "Data Analysis", "Future Technology"]
  }
];

const facilities = [
  {
    name: "Modern Computer Lab",
    description: "State-of-the-art computer laboratory with latest hardware and software",
    icon: <Monitor className="w-8 h-8" />,
    features: ["30+ Desktop Computers", "High-Speed Internet", "Modern Software", "Interactive Whiteboard"]
  },
  {
    name: "Wi-Fi Campus",
    description: "School-wide wireless internet connectivity for enhanced learning",
    icon: <Wifi className="w-8 h-8" />,
    features: ["Campus-wide Coverage", "Secure Network", "Student Access", "Educational Content Filter"]
  },
  {
    name: "Digital Library",
    description: "Online resources and digital books for research and learning",
    icon: <Globe className="w-8 h-8" />,
    features: ["E-Books Collection", "Research Databases", "Online Journals", "Digital Archives"]
  },
  {
    name: "Smart Classrooms",
    description: "Technology-enhanced classrooms for interactive learning",
    icon: <Smartphone className="w-8 h-8" />,
    features: ["Projectors", "Audio Systems", "Interactive Displays", "Digital Content"]
  }
];

const benefits = [
  "Digital literacy for the 21st century",
  "Preparation for higher education",
  "Career readiness in technology fields",
  "Enhanced problem-solving skills",
  "Creative and critical thinking development",
  "Safe and responsible internet usage"
];

const achievements = [
  {
    icon: <Users className="w-6 h-6" />,
    number: "300+",
    label: "Students Trained",
    description: "Students who have completed our ICT programs"
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    number: "95%",
    label: "Success Rate",
    description: "Program completion and certification rate"
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    number: "50+",
    label: "Certified Graduates",
    description: "Students certified in various ICT programs"
  },
  {
    icon: <Star className="w-6 h-6" />,
    number: "8+",
    label: "Years Experience",
    description: "Years of excellence in ICT education"
  }
];

export default function ICTPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <Image
          src="/school/ict-computer-lab.jpg"
          alt="ICT Learning at Abu Rayyan Academy"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-700/60 flex items-center justify-center">
          <div className="text-center text-white space-y-6 max-w-4xl mx-auto px-4">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mb-4">
              Technology & Innovation
            </Badge>
            <motion.h1 
              className="text-5xl md:text-6xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              ICT Excellence Center
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Empowering students with digital skills for the future. Our comprehensive ICT programs 
              integrate technology with Islamic values and academic excellence.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
                <Link href="/ict/courses/march-25">
                  <Play className="w-5 h-5 mr-2" />
                  Explore Our Programs
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                The Center of ICT and Artificial Intelligence (AI)
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                Leading Digital Education in Mombasa
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Abu Rayyan Academy stands as the premier institution for ICT education in Mombasa, 
                offering cutting-edge technology programs that prepare students for the digital future. 
                Our ICT Center combines modern facilities with expert instruction to deliver world-class 
                digital education.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Since 2017, we have been at the forefront of integrating technology into education, 
                ensuring our students are not just consumers but creators of technology, all while 
                maintaining our commitment to Islamic values and character development.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild variant="default">
                  <Link href="/about/team">
                    <Users className="w-4 h-4 mr-2" />
                    Meet Our ICT Team
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/academics/curriculum">
                    <BookOpen className="w-4 h-4 mr-2" />
                    View Curriculum
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/school/ict-learning.jpg"
                alt="ICT Learning Environment"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our ICT Achievements
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Proud milestones in our journey to digital excellence
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                  <div className="text-blue-600 dark:text-blue-400">
                    {achievement.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {achievement.number}
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {achievement.label}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {achievement.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Programs Section */}
      <div className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our ICT Programs
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Comprehensive technology education for all skill levels
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {ictPrograms.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <div className="text-blue-600 dark:text-blue-400">
                          {program.icon}
                        </div>
                      </div>
                      <div>
                        <Badge variant="secondary" className="mb-2">
                          {program.level}
                        </Badge>
                        <CardTitle className="text-xl">{program.title}</CardTitle>
                      </div>
                    </div>
                    <CardDescription className="text-base">
                      {program.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        Duration: {program.duration}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">Key Features:</h4>
                      <ul className="space-y-1">
                        {program.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/ict/courses/march-25">
                <ArrowRight className="w-5 h-5 mr-2" />
                Register for Programs
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Facilities Section */}
      <div className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              World-Class ICT Facilities
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              State-of-the-art infrastructure supporting digital learning
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg flex-shrink-0">
                    <div className="text-blue-600 dark:text-blue-400">
                      {facility.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {facility.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {facility.description}
                    </p>
                    <ul className="space-y-2">
                      {facility.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/school/computer-lab.jpg"
                alt="Computer Lab at Abu Rayyan Academy"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                Why Choose Our ICT Programs?
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Our ICT programs are designed to prepare students for the digital future while 
                maintaining our commitment to Islamic values and character development.
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="pt-4">
                <Button asChild size="lg">
                  <Link href="/contact">
                    <Target className="w-5 h-5 mr-2" />
                    Get Started Today
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your ICT Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of students who have transformed their futures through our ICT programs. 
            Register today and take the first step towards digital excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/ict/courses/march-25">
                <ArrowRight className="w-5 h-5 mr-2" />
                Register Now
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link href="/about/team">
                <Users className="w-5 h-5 mr-2" />
                Contact ICT Coordinator
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
