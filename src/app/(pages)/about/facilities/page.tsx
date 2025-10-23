import Image from "next/image";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen,
  Monitor,
  FlaskConical,
  Users,
  Gamepad2,
  Utensils,
  Car,
  Shield,
  Heart,
  Wifi,
  Camera,
  Zap
} from "lucide-react";

const FacilitiesPage: React.FC = () => {
  const facilities = [
    {
      name: "Modern Classrooms",
      icon: <BookOpen className="w-8 h-8" />,
      image: "/school/computer-lesson.jpg",
      description: "Spacious, well-ventilated classrooms equipped with modern teaching aids and comfortable furniture designed for optimal learning.",
      features: ["Interactive whiteboards",  "Natural lighting", "Ergonomic furniture"],
      capacity: "25-30 students per class"
    },
    {
      name: "Computer Laboratory",
      icon: <Monitor className="w-8 h-8" />,
      image: "/school/computer-lab.jpg",
      description: "State-of-the-art computer lab with latest technology for digital literacy and programming education.",
      features: ["30+ modern computers", "High-speed internet", "Programming software", "Technical support"], //"Digital projectors"
      capacity: "30 students"
    },
    {
      name: "Science Laboratory",
      icon: <FlaskConical className="w-8 h-8" />,
      image: "/school/ict-computer-lab.jpg",
      description: "Fully equipped science laboratory for hands-on experiments and practical learning in physics, chemistry, and biology.",
      features: ["Safety equipment", "Modern instruments", "Chemical storage", "Demonstration area"],
      capacity: "25 students"
    },
    // {
    //   name: "Library & Resource Center",
    //   icon: <BookOpen className="w-8 h-8" />,
    //   image: "/school/computer-lab2.jpg",
    //   description: "Comprehensive library with extensive collection of books, digital resources, and quiet study areas.",
    //   features: ["5000+ books", "Digital resources", "Study carrels", "Reading lounges"],
    //   capacity: "50 students"
    // },
    {
      name: "Multi-Purpose Hall",
      icon: <Users className="w-8 h-8" />,
      image: "/school/about-hero-image.jpg",
      description: "Spacious hall for assemblies, performances, meetings, and special events with modern audio-visual equipment.",
      features: ["Sound system", "Stage lighting", "Seating for 300"],
      capacity: "300 people"
    },
    // {
    //   name: "Playground & Sports",
    //   icon: <Gamepad2 className="w-8 h-8" />,
    //   image: "/school/school-image.jpg",
    //   description: "Safe and well-maintained playground areas for physical education and recreational activities.",
    //   features: ["Football field", "Basketball court", "Play equipment", "Running track"],
    //   capacity: "All students"
    // }
  ];

  const supportFacilities = [
    // {
    //   name: "Cafeteria",
    //   icon: <Utensils className="w-6 h-6" />,
    //   description: "Clean, hygienic dining area serving nutritious halal meals and snacks.",
    //   features: ["Halal certified", "Nutritious menus", "Clean environment", "Affordable prices"]
    // },
    {
      name: "Transportation",
      icon: <Car className="w-6 h-6" />,
      description: "Safe and reliable school transport covering major routes in Mombasa.",
      features: ["GPS tracking", "Qualified drivers", "Route coverage", "Safety protocols"]
    },
    {
      name: "Security",
      icon: <Shield className="w-6 h-6" />,
      description: "Comprehensive security system ensuring student and staff safety.",
      features: ["CCTV surveillance", "Security guards", "Access control", "Emergency protocols"]
    },
    // {
    //   name: "Health Center",
    //   icon: <Heart className="w-6 h-6" />,
    //   description: "On-site medical facility with qualified nurse for health emergencies.",
    //   features: ["First aid", "Health monitoring", "Emergency care", "Health education"]
    // },
    // {
    //   name: "WiFi Network",
    //   icon: <Wifi className="w-6 h-6" />,
    //   description: "High-speed internet connectivity throughout the campus for digital learning.",
    //   features: ["Campus-wide coverage", "Filtered content", "High bandwidth", "Reliable connection"]
    // },
    // {
    //   name: "Backup Power",
    //   icon: <Zap className="w-6 h-6" />,
    //   description: "Uninterrupted power supply ensuring continuous learning environment.",
    //   features: ["Generator backup", "UPS systems", "Power management", "Energy efficiency"]
    // }
  ];

  const safetyFeatures = [
    "24/7 security surveillance",
    "Fire safety equipment and protocols",
    "Emergency evacuation procedures",
    "First aid stations throughout campus",
    "Secure entry and exit points",
    "Regular safety drills and training",
    "Child protection policies",
    "Anti-bullying measures"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src="/school/computer-lab.jpg"
          alt="Facilities - Abu Rayyan Academy"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 to-blue-700/60 flex items-center justify-center">
          <div className="text-center text-white space-y-4 max-w-4xl mx-auto px-4">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              World-Class Infrastructure
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold">Our Facilities</h1>
            <p className="text-xl md:text-2xl">
              State-of-the-art learning environments designed for academic excellence
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-20">
        {/* Introduction */}
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Excellence in Infrastructure
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            Our campus features modern facilities designed to support comprehensive education, 
            combining academic spaces with recreational areas to create an optimal learning environment 
            for students of all ages.
          </p>
        </div>

        {/* Main Facilities */}
        <div className="space-y-16">
          {facilities.map((facility, index) => (
            <div key={index} className="space-y-8">
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className={`grid md:grid-cols-2 gap-0 ${index % 2 === 1 ? 'md:grid-flow-col-dense' : ''}`}>
                  <div className={`relative h-80 md:h-96 ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                    <Image
                      src={facility.image}
                      alt={facility.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className={`p-8 md:p-12 space-y-6 ${index % 2 === 1 ? 'md:col-start-1' : ''}`}>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full text-blue-600 dark:text-blue-300">
                          {facility.icon}
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                          {facility.name}
                        </h3>
                      </div>
                      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        {facility.description}
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {facility.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Badge variant="outline" className="text-sm">
                        Capacity: {facility.capacity}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Support Facilities */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-12 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Support Facilities
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Additional amenities and services that enhance the overall educational experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {supportFacilities.map((facility, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
                <CardHeader className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg text-green-600 dark:text-green-300">
                      {facility.icon}
                    </div>
                    <CardTitle className="text-xl">{facility.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {facility.description}
                  </p>
                  <div className="space-y-2">
                    {facility.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Safety & Security */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Safety & Security
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              The safety and security of our students is our top priority. We have implemented 
              comprehensive safety measures and protocols to ensure a secure learning environment 
              where students can focus on their education without concerns.
            </p>
            <div className="space-y-3">
              {safetyFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/school/computer-lab2.jpg"
                alt="Security Systems"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/school/ict-learning.jpg"
                alt="Safe Environment"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg col-span-2">
              <Image
                src="/school/ict-computer-lab.jpg"
                alt="Campus Security"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Virtual Tour CTA */}
        <div className="text-center space-y-8 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-950 dark:to-teal-950 rounded-xl p-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Experience Our Campus
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We invite you to visit our campus and see our world-class facilities firsthand. 
            Schedule a tour to experience the environment where your child will learn and grow.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6 text-center space-y-4">
                <Camera className="w-8 h-8 mx-auto text-blue-600" />
                <h3 className="text-lg font-semibold">Campus Tour</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Schedule a guided tour of our facilities
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6 text-center space-y-4">
                <Users className="w-8 h-8 mx-auto text-green-600" />
                <h3 className="text-lg font-semibold">Meet the Team</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Interact with our educators and staff
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6 text-center space-y-4">
                <BookOpen className="w-8 h-8 mx-auto text-purple-600" />
                <h3 className="text-lg font-semibold">See Learning</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Observe classes and educational activities
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilitiesPage;