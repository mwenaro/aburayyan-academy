"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { FileText, DollarSign, Download, ChevronRight, Users, Filter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface DownloadCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  itemCount: number;
}

interface Student {
  _id: string;
  name: string;
  regno: string;
  class: {
    _id: string;
    name: string;
    grade: string;
  };
}

interface Class {
  _id: string;
  name: string;
  grade: string;
  ukey: string;
}

const downloadCategories: DownloadCategory[] = [
  {
    id: "forms",
    title: "Forms",
    description: "School admission forms, application forms, and other official documents",
    icon: <FileText className="h-8 w-8" />,
    href: "/forms",
    itemCount: 5,
  },
  {
    id: "fee-structure",
    title: "Fee Structure",
    description: "School fee schedules, payment plans, and financial information",
    icon: <DollarSign className="h-8 w-8" />,
    href: "/fee-structure",
    itemCount: 3,
  },
  {
    id: "student-templates",
    title: "Student Templates",
    description: "Personalized exam templates and student-specific documents",
    icon: <Users className="h-8 w-8" />,
    href: "/downloads/student-templates",
    itemCount: 2,
  },
];

export default function DownloadsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const { toast } = useToast();

  // Fetch students and classes on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoadingData(true);
      
      const [studentsResponse, classesResponse] = await Promise.all([
        fetch('/api/v1/students/public'),
        fetch('/api/v1/classes/public')
      ]);

      if (studentsResponse.ok && classesResponse.ok) {
        const studentsData = await studentsResponse.json();
        const classesData = await classesResponse.json();
        
        setStudents(studentsData.data || []);
        setClasses(classesData.data || []);
      } else {
        toast({
          title: "Error",
          description: "Failed to load student data",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error", 
        description: "Failed to load data",
        variant: "destructive",
      });
    } finally {
      setIsLoadingData(false);
    }
  };

  // Filter students by selected class
  const filteredStudents = selectedClass 
    ? students.filter(student => student.class._id === selectedClass)
    : students;

  const handleDownload = async (type: 'excel' | 'word') => {
    if (!selectedStudent) {
      toast({
        title: "Error",
        description: "Please select a student first",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      
      const response = await fetch('/api/v1/downloads/template', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: selectedStudent._id,
          studentName: selectedStudent.name,
          grade: selectedStudent.class.name,
          regno: selectedStudent.regno,
          type: type
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        
        const fileName = `${selectedStudent.name.replace(/[^a-zA-Z0-9\s]/g, '').trim()}-${selectedStudent.class.name}-exam-${type === 'excel' ? 'excel' : 'word'}.${type === 'excel' ? 'xlsx' : 'docx'}`;
        a.download = fileName;
        
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        toast({
          title: "Success",
          description: `${type === 'excel' ? 'Excel' : 'Word'} template downloaded successfully!`,
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to download template",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Error",
        description: "An error occurred while downloading",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStudentSelect = (studentId: string) => {
    const student = filteredStudents.find(s => s._id === studentId);
    setSelectedStudent(student || null);
  };

  const handleClassFilter = (classId: string) => {
    setSelectedClass(classId);
    setSelectedStudent(null); // Reset selected student when class changes
  };

  if (isLoadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading student data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Image 
              src="/courses/aburayyan-logo.webp"
              alt="Abu Rayyan Academy"
              width={100}
              height={100}
              className="rounded-full shadow-lg"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Abu Rayyan Academy</h1>
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Downloads Center</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Access all school forms, fee structures, and important documents in one convenient location
          </p>
        </div>

        {/* Download Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {downloadCategories.map((category) => (
            <Card key={category.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <div className="text-blue-600">
                      {category.icon}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {category.itemCount} item{category.itemCount !== 1 ? 's' : ''}
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {category.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Link href={category.href}>
                  <Button 
                    className="w-full group-hover:bg-blue-700 transition-colors"
                    size="lg"
                  >
                    <span>Browse {category.title}</span>
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Access Section */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Quick Access
            </CardTitle>
            <CardDescription>
              Frequently downloaded documents and forms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/forms">
                <div className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Senior School Admission Form</h3>
                      <p className="text-sm text-gray-600">Application form for new students</p>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/downloads/student-templates">
                <div className="p-4 border border-green-200 rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Student Exam Templates</h3>
                      <p className="text-sm text-gray-600">Personalized exam templates</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>How to Download</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Choose a Category</h4>
                  <p className="text-gray-600">Select from Forms, Fee Structure, or Student Templates</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Browse Documents</h4>
                  <p className="text-gray-600">View available documents in your selected category</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Download</h4>
                  <p className="text-gray-600">Click on the document title or download button to save the file</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>&copy; 2025 Abu Rayyan Academy. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

    description: "School admission forms, application forms, and other official documents",

    icon: <FileText className="h-8 w-8" />,interface Class {

    href: "/forms",  _id: string;

    itemCount: 5,  name: string;

  },  grade: string;

  {  ukey: string;

    id: "fee-structure",}

    title: "Fee Structure",

    description: "School fee schedules, payment plans, and financial information",export default function DownloadsPage() {

    icon: <DollarSign className="h-8 w-8" />,  const [students, setStudents] = useState<Student[]>([]);

    href: "/fee-structure",  const [classes, setClasses] = useState<Class[]>([]);

    itemCount: 3,  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  },  const [selectedClass, setSelectedClass] = useState<string>("");

  {  const [isLoading, setIsLoading] = useState(false);

    id: "student-templates",  const [isLoadingData, setIsLoadingData] = useState(true);

    title: "Student Templates",  const { toast } = useToast();

    description: "Personalized exam templates and student-specific documents",

    icon: <Users className="h-8 w-8" />,  // Fetch students and classes on component mount

    href: "/downloads/student-templates",  useEffect(() => {

    itemCount: 2,    fetchData();

  },  }, []);

];

  const fetchData = async () => {

export default function DownloadsPage() {    try {

  return (      setIsLoadingData(true);

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">      

      <div className="max-w-6xl mx-auto">      const [studentsResponse, classesResponse] = await Promise.all([

        {/* Header */}        fetch('/api/v1/students/public'),

        <div className="text-center mb-12">        fetch('/api/v1/classes/public')

          <div className="flex justify-center mb-6">      ]);

            <Image 

              src="/courses/aburayyan-logo.webp"       if (studentsResponse.ok && classesResponse.ok) {

              alt="Abu Rayyan Academy"         const studentsData = await studentsResponse.json();

              width={100}         const classesData = await classesResponse.json();

              height={100}        

              className="rounded-full shadow-lg"        setStudents(studentsData.data || []);

            />        setClasses(classesData.data || []);

          </div>      } else {

          <h1 className="text-4xl font-bold text-gray-900 mb-2">Abu Rayyan Academy</h1>        toast({

          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Downloads Center</h2>          title: "Error",

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">          description: "Failed to load student data",

            Access all school forms, fee structures, and important documents in one convenient location          variant: "destructive",

          </p>        });

        </div>      }

    } catch (error) {

        {/* Download Categories Grid */}      console.error("Error fetching data:", error);

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">      toast({

          {downloadCategories.map((category) => (        title: "Error", 

            <Card key={category.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">        description: "Failed to load data",

              <CardHeader className="pb-4">        variant: "destructive",

                <div className="flex items-center justify-between">      });

                  <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">    } finally {

                    <div className="text-blue-600">      setIsLoadingData(false);

                      {category.icon}    }

                    </div>  };

                  </div>

                  <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">  // Filter students by selected class

                    {category.itemCount} item{category.itemCount !== 1 ? 's' : ''}  const filteredStudents = selectedClass 

                  </div>    ? students.filter(student => student.class._id === selectedClass)

                </div>    : students;

                <CardTitle className="text-xl font-bold text-gray-900">

                  {category.title}  const handleDownload = async (type: 'excel' | 'word') => {

                </CardTitle>    if (!selectedStudent) {

                <CardDescription className="text-gray-600">      toast({

                  {category.description}        title: "Error",

                </CardDescription>        description: "Please select a student first",

              </CardHeader>        variant: "destructive",

              <CardContent className="pt-0">      });

                <Link href={category.href}>      return;

                  <Button     }

                    className="w-full group-hover:bg-blue-700 transition-colors"

                    size="lg"    try {

                  >      setIsLoading(true);

                    <span>Browse {category.title}</span>      

                    <ChevronRight className="ml-2 h-4 w-4" />      const response = await fetch('/api/v1/downloads/template', {

                  </Button>        method: 'POST',

                </Link>        headers: {

              </CardContent>          'Content-Type': 'application/json',

            </Card>        },

          ))}        body: JSON.stringify({

        </div>          studentId: selectedStudent._id,

          studentName: selectedStudent.name,

        {/* Quick Access Section */}          grade: selectedStudent.class.name,

        <Card className="mb-8 shadow-lg">          regno: selectedStudent.regno,

          <CardHeader>          type: type

            <CardTitle className="flex items-center gap-2">        }),

              <Download className="h-5 w-5" />      });

              Quick Access

            </CardTitle>      if (response.ok) {

            <CardDescription>        const blob = await response.blob();

              Frequently downloaded documents and forms        const url = window.URL.createObjectURL(blob);

            </CardDescription>        const a = document.createElement('a');

          </CardHeader>        a.style.display = 'none';

          <CardContent>        a.href = url;

            <div className="grid md:grid-cols-2 gap-4">        

              <Link href="/forms">        const fileName = `${selectedStudent.name.replace(/[^a-zA-Z0-9\s]/g, '').trim()}-${selectedStudent.class.name}-exam-${type === 'excel' ? 'excel' : 'word'}.${type === 'excel' ? 'xlsx' : 'docx'}`;

                <div className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">        a.download = fileName;

                  <div className="flex items-center gap-3">        

                    <FileText className="h-5 w-5 text-blue-600" />        document.body.appendChild(a);

                    <div>        a.click();

                      <h3 className="font-semibold text-gray-900">Senior School Admission Form</h3>        window.URL.revokeObjectURL(url);

                      <p className="text-sm text-gray-600">Application form for new students</p>        document.body.removeChild(a);

                    </div>        

                  </div>        toast({

                </div>          title: "Success",

              </Link>          description: `${type === 'excel' ? 'Excel' : 'Word'} template downloaded successfully!`,

              <Link href="/downloads/student-templates">        });

                <div className="p-4 border border-green-200 rounded-lg hover:bg-green-50 transition-colors cursor-pointer">      } else {

                  <div className="flex items-center gap-3">        toast({

                    <Users className="h-5 w-5 text-green-600" />          title: "Error",

                    <div>          description: "Failed to download template",

                      <h3 className="font-semibold text-gray-900">Student Exam Templates</h3>          variant: "destructive",

                      <p className="text-sm text-gray-600">Personalized exam templates</p>        });

                    </div>      }

                  </div>    } catch (error) {

                </div>      console.error("Download error:", error);

              </Link>      toast({

            </div>        title: "Error",

          </CardContent>        description: "An error occurred while downloading",

        </Card>        variant: "destructive",

      });

        {/* Instructions */}    } finally {

        <Card className="shadow-lg">      setIsLoading(false);

          <CardHeader>    }

            <CardTitle>How to Download</CardTitle>  };

          </CardHeader>

          <CardContent>  const handleStudentSelect = (studentId: string) => {

            <div className="space-y-4">    const student = filteredStudents.find(s => s._id === studentId);

              <div className="flex items-start gap-3">    setSelectedStudent(student || null);

                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">  };

                  1

                </div>  const handleClassFilter = (classId: string) => {

                <div>    setSelectedClass(classId);

                  <h4 className="font-semibold text-gray-900">Choose a Category</h4>    setSelectedStudent(null); // Reset selected student when class changes

                  <p className="text-gray-600">Select from Forms, Fee Structure, or Student Templates</p>  };

                </div>

              </div>  if (isLoadingData) {

              <div className="flex items-start gap-3">    return (

                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">

                  2        <div className="text-center">

                </div>          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>

                <div>          <p className="text-lg text-gray-600">Loading student data...</p>

                  <h4 className="font-semibold text-gray-900">Browse Documents</h4>        </div>

                  <p className="text-gray-600">View available documents in your selected category</p>      </div>

                </div>    );

              </div>  }

              <div className="flex items-start gap-3">

                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">  return (

                  3    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">

                </div>      <div className="max-w-4xl mx-auto">

                <div>        {/* Header */}

                  <h4 className="font-semibold text-gray-900">Download</h4>        <div className="text-center mb-12">

                  <p className="text-gray-600">Click on the document title or download button to save the file</p>          <div className="flex justify-center mb-6">

                </div>            <Image 

              </div>              src="/courses/aburayyan-logo.webp" 

            </div>              alt="Abu Rayyan Academy" 

          </CardContent>              width={100} 

        </Card>              height={100}

              className="rounded-full shadow-lg"

        {/* Footer */}            />

        <div className="text-center mt-12 text-gray-500">          </div>

          <p>&copy; 2025 Abu Rayyan Academy. All rights reserved.</p>          <h1 className="text-4xl font-bold text-gray-900 mb-2">Abu Rayyan Academy</h1>

        </div>          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Student Template Downloads</h2>

      </div>          <p className="text-xl text-gray-600 max-w-2xl mx-auto">

    </div>            Select your name and download personalized exam templates in Excel or Word format

  );          </p>

}        </div>

        {/* Selection Card */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Select Student
            </CardTitle>
            <CardDescription>
              Choose your grade first, then select your name from the dropdown
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Grade Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter by Grade (Optional)
              </label>
              <Select value={selectedClass} onValueChange={handleClassFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Grades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Grades</SelectItem>
                  {classes.map((cls) => (
                    <SelectItem key={cls._id} value={cls._id}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Student Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Select Your Name
              </label>
              <Select 
                value={selectedStudent?._id || ""} 
                onValueChange={handleStudentSelect}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose your name from the list" />
                </SelectTrigger>
                <SelectContent>
                  {filteredStudents.length === 0 ? (
                    <SelectItem value="" disabled>
                      No students found for selected grade
                    </SelectItem>
                  ) : (
                    filteredStudents.map((student) => (
                      <SelectItem key={student._id} value={student._id}>
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium">{student.name}</span>
                          <div className="flex items-center gap-2 ml-4">
                            <Badge variant="secondary" className="text-xs">
                              {student.class.name}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {student.regno}
                            </Badge>
                          </div>
                        </div>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Selected Student Display */}
            {selectedStudent && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">Selected Student:</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-600">
                    {selectedStudent.name}
                  </Badge>
                  <Badge variant="secondary">
                    {selectedStudent.class.name}
                  </Badge>
                  <Badge variant="outline">
                    Reg: {selectedStudent.regno}
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Download Section */}
        {selectedStudent && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Download Templates
              </CardTitle>
              <CardDescription>
                Download your personalized exam templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Excel Template */}
                <div className="p-6 border border-green-200 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-600 rounded-lg">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-green-900">Excel Template</h3>
                        <p className="text-sm text-green-700">Spreadsheet format with tables</p>
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleDownload('excel')}
                    disabled={isLoading}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {isLoading ? "Generating..." : "Download Excel"}
                  </Button>
                </div>

                {/* Word Template */}
                <div className="p-6 border border-blue-200 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-600 rounded-lg">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-blue-900">Word Template</h3>
                        <p className="text-sm text-blue-700">Document format with lines</p>
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleDownload('word')}
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isLoading ? "Generating..." : "Download Word"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card className="mt-8 shadow-lg">
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-gray-600">
              <p>1. Use the grade filter to narrow down the student list (optional)</p>
              <p>2. Select your name from the dropdown menu</p>
              <p>3. Choose your preferred template format (Excel or Word)</p>
              <p>4. Click download to get your personalized exam template</p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>&copy; 2025 Abu Rayyan Academy. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
