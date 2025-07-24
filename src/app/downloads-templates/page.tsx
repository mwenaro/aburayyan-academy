"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, Users, Filter } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

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

export default function DownloadsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [includeHeader, setIncludeHeader] = useState<boolean>(false);
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
  const filteredStudents = selectedClass && selectedClass !== "all"
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
          type: type,
          includeHeader: includeHeader
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        
        // Check if the blob has content
        if (blob.size === 0) {
          toast({
            title: "Error",
            description: "Downloaded file is empty. Please try again.",
            variant: "destructive",
          });
          return;
        }
        
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
        const errorData = await response.text();
        console.error("Download failed:", response.status, errorData);
        toast({
          title: "Error",
          description: `Failed to download template: ${response.status} ${response.statusText}`,
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
      <div className="max-w-4xl mx-auto">
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
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Student Template Downloads</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select your name and download personalized exam templates in Excel or Word format
          </p>
        </div>

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
                  <SelectItem value="all">All Grades</SelectItem>
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
                    <SelectItem value="no-students" disabled>
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
              {/* Header Option */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="include-header"
                    checked={includeHeader}
                    onCheckedChange={(checked) => setIncludeHeader(checked as boolean)}
                  />
                  <label 
                    htmlFor="include-header" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Include school header (logo and name)
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-1 ml-6">
                  By default, templates are empty. Check this option to include school branding.
                </p>
              </div>
              
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
