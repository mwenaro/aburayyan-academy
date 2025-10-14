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
  const leadership = [
    {
      name: "Dr. Ahmed Hassan",
      position: "Principal",
      image: "/school/abu-rayyan-teaching-staff.jpg",
      qualifications: "PhD in Educational Leadership, M.Ed in Islamic Studies",
      experience: "15+ years in Islamic education",
      specialization: "Curriculum Development & Educational Innovation",
      email: "principal@aburayyanacademy.ac.ke",
      bio: "Dr. Ahmed has dedicated his career to advancing Islamic education and has been instrumental in developing our innovative curriculum that balances academic excellence with spiritual growth."
    },
    {
      name: "Sister Fatima Al-Zahra",
      position: "Deputy Principal - Academic Affairs",
      image: "/school/abu-rayyan-teaching-staff.jpg",
      qualifications: "M.Ed in Curriculum & Instruction, B.Ed Mathematics",
      experience: "12+ years in academic administration",
      specialization: "Mathematics & STEM Education",
      email: "deputy.academic@aburayyanacademy.ac.ke",
      bio: "Sister Fatima leads our academic programs with a focus on STEM education and ensuring high academic standards across all grade levels."
    },
    {
      name: "Ustadh Omar Abdullahi",
      position: "Director of Islamic Studies",
      image: "/school/abu-rayyan-teaching-staff.jpg",
      qualifications: "M.A. in Islamic Studies, Diploma in Quranic Studies",
      experience: "10+ years in Islamic education",
      specialization: "Quran, Hadith, and Islamic Character Development",
      email: "islamic.studies@aburayyanacademy.ac.ke",
      bio: "Ustadh Omar oversees our comprehensive Islamic studies program, ensuring students develop a deep understanding of their faith alongside their academic pursuits."
    },
    {
      name: "Mrs. Aisha Mohamed",
      position: "Head of Primary Section",
      image: "/school/abu-rayyan-teaching-staff.jpg",
      qualifications: "B.Ed Early Childhood Education, Diploma in Special Needs",
      experience: "8+ years in primary education",
      specialization: "Early Childhood Development & Special Needs",
      email: "primary@aburayyanacademy.ac.ke",
      bio: "Mrs. Aisha brings expertise in early childhood development and ensures our youngest learners receive the foundation they need for lifelong success."
    },
    {
      name: "Mr. Hassan Ali",
      position: "ICT Coordinator",
      image: "/school/computer-lesson.jpg",
      qualifications: "B.Sc Computer Science, Certified IT Trainer",
      experience: "6+ years in educational technology",
      specialization: "Digital Learning & Computer Programming",
      email: "ict@aburayyanacademy.ac.ke",
      bio: "Mr. Hassan leads our technology integration efforts, ensuring students are well-prepared for the digital age while maintaining our educational values."
    },
    {
      name: "Sister Zainab Ibrahim",
      position: "Dean of Students",
      image: "/school/abu-rayyan-teaching-staff.jpg",
      qualifications: "M.A. Counseling Psychology, B.Ed Social Studies",
      experience: "9+ years in student affairs",
      specialization: "Student Counseling & Character Development",
      email: "dean.students@aburayyanacademy.ac.ke",
      bio: "Sister Zainab focuses on student welfare, character development, and ensuring a positive school environment for all learners."
    }
  ];

  const departments = [
    {
      name: "Academic Excellence Committee",
      head: "Sister Fatima Al-Zahra",
      icon: <BookOpen className="w-6 h-6" />,
      description: "Oversees curriculum development, assessment standards, and academic performance monitoring."
    },
    {
      name: "Islamic Studies Department",
      head: "Ustadh Omar Abdullahi",
      icon: <Heart className="w-6 h-6" />,
      description: "Manages Islamic education curriculum, character development programs, and spiritual guidance."
    },
    {
      name: "Student Affairs Division",
      head: "Sister Zainab Ibrahim",
      icon: <Users className="w-6 h-6" />,
      description: "Handles student welfare, counseling services, and extracurricular activities coordination."
    },
    {
      name: "Technology Integration Unit",
      head: "Mr. Hassan Ali",
      icon: <Target className="w-6 h-6" />,
      description: "Leads digital learning initiatives, ICT curriculum, and educational technology implementation."
    }
  ];

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

        {/* Leadership Cards */}
        <div className="space-y-12">
          {leadership.map((leader, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className={`grid md:grid-cols-3 gap-6 ${index % 2 === 1 ? 'md:grid-flow-col-dense' : ''}`}>
                <div className={`relative h-80 md:h-full ${index % 2 === 1 ? 'md:col-start-3' : ''}`}>
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className={`md:col-span-2 p-8 space-y-6 ${index % 2 === 1 ? 'md:col-start-1' : ''}`}>
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
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">Qualifications:</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 pl-6">
                        {leader.qualifications}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-green-600" />
                        <span className="font-medium">Experience:</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 pl-6">
                        {leader.experience}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-purple-600" />
                        <span className="font-medium">Specialization:</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 pl-6">
                        {leader.specialization}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-red-600" />
                        <span className="font-medium">Contact:</span>
                      </div>
                      <a 
                        href={`mailto:${leader.email}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline pl-6 block"
                      >
                        {leader.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Organizational Structure */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-12 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Organizational Structure
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our structured approach ensures effective coordination and excellence in all areas of education
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {departments.map((dept, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
                <CardHeader className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg text-blue-600 dark:text-blue-300">
                      {dept.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {dept.name}
                    </h3>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    Head: {dept.head}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {dept.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Information */}
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
                <p className="text-gray-600 dark:text-gray-400">+254 XXX XXX XXX</p>
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