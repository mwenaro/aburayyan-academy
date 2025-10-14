import Image from "next/image";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen,
  Users,
  GraduationCap,
  Award,
  Heart,
  Globe,
  Calculator,
  Languages,
  FlaskConical,
  Computer,
  Palette,
  TreePine
} from "lucide-react";

const CurriculumPage: React.FC = () => {
  const curriculumFramework = [
    {
      title: "Competency-Based Curriculum (CBC)",
      description: "Following Kenya's national curriculum framework focusing on skills and competencies",
      icon: <Award className="w-6 h-6" />,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
    },
    {
      title: "Islamic Education Integration",
      description: "Seamless integration of Islamic teachings and values across all subjects",
      icon: <Heart className="w-6 h-6" />,
      color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
    },
    {
      title: "Global Perspective",
      description: "Preparing students for global citizenship while maintaining cultural identity",
      icon: <Globe className="w-6 h-6" />,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300"
    }
  ];

  const learningAreas = {
    prePrimary: [
      { name: "Language Activities", icon: <Languages className="w-5 h-5" />, description: "Kiswahili, English, and Arabic foundation" },
      { name: "Mathematical Activities", icon: <Calculator className="w-5 h-5" />, description: "Number concepts and patterns" },
      { name: "Environmental Activities", icon: <TreePine className="w-5 h-5" />, description: "Understanding the world around us" },
      { name: "Psychomotor Activities", icon: <Users className="w-5 h-5" />, description: "Physical development and coordination" },
      { name: "Creative Activities", icon: <Palette className="w-5 h-5" />, description: "Art, music, and creative expression" },
      { name: "Islamic Foundation", icon: <Heart className="w-5 h-5" />, description: "Basic Islamic teachings and values" }
    ],
    primary: [
      { name: "Mathematics", icon: <Calculator className="w-5 h-5" />, description: "Number operations, geometry, measurement, and data" },
      { name: "English", icon: <Languages className="w-5 h-5" />, description: "Reading, writing, speaking, and listening skills" },
      { name: "Kiswahili", icon: <Languages className="w-5 h-5" />, description: "National language proficiency and literature" },
      { name: "Science & Technology", icon: <FlaskConical className="w-5 h-5" />, description: "Scientific inquiry and technological literacy" },
      { name: "Social Studies", icon: <Globe className="w-5 h-5" />, description: "History, geography, and citizenship" },
      { name: "Creative Arts", icon: <Palette className="w-5 h-5" />, description: "Music, art, drama, and cultural activities" },
      { name: "Physical Education", icon: <Users className="w-5 h-5" />, description: "Sports, health, and physical fitness" },
      { name: "ICT", icon: <Computer className="w-5 h-5" />, description: "Digital literacy and computational thinking" },
      { name: "Islamic Studies", icon: <Heart className="w-5 h-5" />, description: "Quran, Hadith, Fiqh, and Islamic history" },
      { name: "Arabic Language", icon: <Languages className="w-5 h-5" />, description: "Arabic reading, writing, and communication" }
    ],
    juniorSecondary: [
      { name: "Mathematics", icon: <Calculator className="w-5 h-5" />, description: "Advanced mathematical concepts and applications" },
      { name: "English", icon: <Languages className="w-5 h-5" />, description: "Advanced language skills and literature" },
      { name: "Kiswahili", icon: <Languages className="w-5 h-5" />, description: "Advanced Kiswahili and Swahili literature" },
      { name: "Integrated Science", icon: <FlaskConical className="w-5 h-5" />, description: "Physics, chemistry, and biology integration" },
      { name: "Social Studies", icon: <Globe className="w-5 h-5" />, description: "Advanced social sciences and research skills" },
      { name: "Pre-Technical Studies", icon: <Computer className="w-5 h-5" />, description: "Introduction to technical and vocational skills" },
      { name: "Creative Arts", icon: <Palette className="w-5 h-5" />, description: "Advanced creative expression and performance" },
      { name: "Physical Education", icon: <Users className="w-5 h-5" />, description: "Advanced sports and health education" },
      { name: "Islamic Studies", icon: <Heart className="w-5 h-5" />, description: "Advanced Islamic knowledge and jurisprudence" },
      { name: "Arabic Language", icon: <Languages className="w-5 h-5" />, description: "Advanced Arabic grammar and literature" }
    ]
  };

  const coreCompetencies = [
    {
      title: "Communication & Collaboration",
      description: "Developing effective communication skills in multiple languages and collaborative problem-solving abilities",
      skills: ["Multilingual proficiency", "Active listening", "Team collaboration", "Presentation skills"]
    },
    {
      title: "Critical Thinking & Problem Solving",
      description: "Building analytical skills and creative problem-solving capabilities for complex challenges",
      skills: ["Analytical thinking", "Creative solutions", "Research skills", "Decision making"]
    },
    {
      title: "Creativity & Imagination",
      description: "Fostering innovative thinking and creative expression across various disciplines",
      skills: ["Creative expression", "Innovation", "Artistic skills", "Design thinking"]
    },
    {
      title: "Citizenship & Digital Literacy",
      description: "Preparing responsible global citizens with strong digital and technological competencies",
      skills: ["Digital fluency", "Ethical responsibility", "Global awareness", "Technology integration"]
    },
    {
      title: "Learning to Learn",
      description: "Developing metacognitive skills and fostering a lifelong love for learning",
      skills: ["Self-reflection", "Study strategies", "Goal setting", "Continuous improvement"]
    },
    {
      title: "Self-efficacy",
      description: "Building confidence, resilience, and the ability to overcome challenges",
      skills: ["Self-confidence", "Resilience", "Leadership", "Personal responsibility"]
    }
  ];

  const islamicIntegration = [
    {
      subject: "Mathematics",
      integration: "Islamic calendar calculations, Zakat computation, inheritance distribution, geometric patterns in Islamic art"
    },
    {
      subject: "Science",
      integration: "Scientific discoveries by Muslim scholars, environmental stewardship in Islam, astronomy and prayer times"
    },
    {
      subject: "Social Studies",
      integration: "Islamic civilization, Muslim contributions to world history, Islamic governance principles"
    },
    {
      subject: "Languages",
      integration: "Arabic language learning, Islamic literature, Quranic Arabic comprehension"
    },
    {
      subject: "Arts",
      integration: "Islamic geometric patterns, calligraphy, halal principles in creative expression"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src="/school/computer-lesson.jpg"
          alt="Curriculum - Abu Rayyan Academy"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-blue-700/60 flex items-center justify-center">
          <div className="text-center text-white space-y-4 max-w-4xl mx-auto px-4">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Educational Framework
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold">Our Curriculum</h1>
            <p className="text-xl md:text-2xl">
              A comprehensive educational framework blending academic excellence with Islamic values
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-20">
        {/* Curriculum Framework */}
        <div className="space-y-12">
          <div className="text-center space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Our Curriculum Framework
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Our curriculum is built on three foundational pillars that ensure comprehensive 
              education preparing students for success in both worldly affairs and the hereafter.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {curriculumFramework.map((framework, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className={`p-4 rounded-full ${framework.color}`}>
                      {framework.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{framework.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                    {framework.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Learning Areas by Level */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Learning Areas by Level
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Age-appropriate learning areas designed to build knowledge progressively
            </p>
          </div>

          <Tabs defaultValue="primary" className="w-full">
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
              <TabsTrigger value="prePrimary">Pre-Primary</TabsTrigger>
              <TabsTrigger value="primary">Primary</TabsTrigger>
              <TabsTrigger value="juniorSecondary">Junior Secondary</TabsTrigger>
            </TabsList>

            <TabsContent value="prePrimary" className="space-y-6 mt-8">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Pre-Primary Level (PP1 - PP2)</h3>
                <p className="text-gray-600 dark:text-gray-400">Foundation learning through play and exploration</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {learningAreas.prePrimary.map((area, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-lg text-orange-600 dark:text-orange-300 flex-shrink-0">
                          {area.icon}
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{area.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{area.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="primary" className="space-y-6 mt-8">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Primary Level (Grade 1 - 6)</h3>
                <p className="text-gray-600 dark:text-gray-400">Building strong foundations across all learning areas</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {learningAreas.primary.map((area, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg text-blue-600 dark:text-blue-300 flex-shrink-0">
                          {area.icon}
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{area.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{area.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="juniorSecondary" className="space-y-6 mt-8">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Junior Secondary (Grade 7 - 9)</h3>
                <p className="text-gray-600 dark:text-gray-400">Advanced learning preparing for senior secondary education</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {learningAreas.juniorSecondary.map((area, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg text-purple-600 dark:text-purple-300 flex-shrink-0">
                          {area.icon}
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{area.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{area.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Core Competencies */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-12 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Core Competencies
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Essential skills and competencies we develop in every student
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreCompetencies.map((competency, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{competency.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {competency.description}
                  </p>
                  <div className="space-y-2">
                    <h5 className="font-medium text-sm text-gray-900 dark:text-white">Key Skills:</h5>
                    <div className="flex flex-wrap gap-1">
                      {competency.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Islamic Integration */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Islamic Values Integration
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              We seamlessly integrate Islamic teachings and values across all subjects, 
              ensuring students see the connection between their faith and academic learning. 
              This holistic approach helps develop well-rounded individuals with strong 
              moral foundations.
            </p>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Integration Examples:
              </h3>
              <div className="space-y-3">
                {islamicIntegration.map((item, index) => (
                  <Card key={index} className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-green-800 dark:text-green-200">
                          {item.subject}
                        </h4>
                        <p className="text-sm text-green-700 dark:text-green-300">
                          {item.integration}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/school/ict-learning.jpg"
              alt="Islamic Integration in Learning"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Assessment Approach */}
        <div className="text-center space-y-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-xl p-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Assessment Philosophy
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Our assessment approach is holistic, focusing on the development of competencies 
            rather than just content mastery. We use continuous assessment, portfolio development, 
            and project-based evaluations to ensure comprehensive student growth.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6 text-center space-y-4">
                <BookOpen className="w-8 h-8 mx-auto text-blue-600" />
                <h3 className="text-lg font-semibold">Continuous Assessment</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Regular evaluation throughout the learning process
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6 text-center space-y-4">
                <Award className="w-8 h-8 mx-auto text-green-600" />
                <h3 className="text-lg font-semibold">Competency-Based</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Focus on skills and competencies development
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6 text-center space-y-4">
                <Users className="w-8 h-8 mx-auto text-purple-600" />
                <h3 className="text-lg font-semibold">Holistic Evaluation</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Academic, spiritual, and character development
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurriculumPage;