"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, Users, Filter, Search, Calendar, User } from "lucide-react";
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

interface Template {
  _id: string;
  title: string;
  description?: string;
  fileName: string;
  fileType: string;
  fileSizeFormatted: string;
  grade: string;
  subject?: string;
  category: string;
  downloadCount: number;
  tags?: string[];
  createdAt: string;
  uploadedBy: {
    userName: string;
    userRole: string;
  };
}

export default function DownloadsPage() {
  // Student template generation states
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [includeHeader, setIncludeHeader] = useState<boolean>(false);
  
  // Uploaded templates states
  const [uploadedTemplates, setUploadedTemplates] = useState<Template[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [templateSearchTerm, setTemplateSearchTerm] = useState("");
  const [selectedTemplateGrade, setSelectedTemplateGrade] = useState("all");
  const [selectedTemplateCategory, setSelectedTemplateCategory] = useState("all");
  const [templateGrades, setTemplateGrades] = useState<string[]>([]);
  
  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);
  
  const { toast } = useToast();

  // Fetch students and classes on component mount
  useEffect(() => {
    fetchData();
    fetchUploadedTemplates();
  }, []);

  // Filter uploaded templates based on search and filters
  useEffect(() => {
    filterUploadedTemplates();
  }, [uploadedTemplates, templateSearchTerm, selectedTemplateGrade, selectedTemplateCategory]);

  const fetchData = async () => {
    try {
      setIsLoadingData(true);
      console.log("Fetching students and classes...");
      
      const [studentsResponse, classesResponse] = await Promise.all([
        fetch("/api/v1/students/public"),
        fetch("/api/v1/classes/public")
      ]);

      console.log("Response status:", { 
        students: studentsResponse.status, 
        classes: classesResponse.status 
      });

      if (studentsResponse.ok && classesResponse.ok) {
        const studentsData = await studentsResponse.json();
        const classesData = await classesResponse.json();
        
        console.log("Fetched data:", { 
          studentsData: studentsData, 
          classesData: classesData 
        });
        
        if (studentsData.success && classesData.success) {
          setStudents(studentsData.data || []);
          setClasses(classesData.data || []);
          console.log("Data set successfully:", { 
            studentsCount: (studentsData.data || []).length, 
            classesCount: (classesData.data || []).length 
          });
        } else {
          console.error("API responded with success=false");
          toast({
            title: "Error",
            description: "Failed to load student data",
            variant: "destructive",
          });
        }
      } else {
        console.error("HTTP request failed");
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

  const fetchUploadedTemplates = async () => {
    try {
      setIsLoadingTemplates(true);
      const response = await fetch("/api/v1/templates");
      const data = await response.json();

      if (data.success) {
        setUploadedTemplates(data.data.templates);
        setTemplateGrades(data.data.filters.grades);
      } else {
        toast({
          title: "Error",
          description: "Failed to load templates",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
      toast({
        title: "Error",
        description: "Failed to load templates",
        variant: "destructive",
      });
    } finally {
      setIsLoadingTemplates(false);
    }
  };

  const filterUploadedTemplates = () => {
    let filtered = uploadedTemplates;

    // Filter by search term
    if (templateSearchTerm) {
      const searchLower = templateSearchTerm.toLowerCase();
      filtered = filtered.filter(template =>
        template.title.toLowerCase().includes(searchLower) ||
        template.description?.toLowerCase().includes(searchLower) ||
        template.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Filter by grade
    if (selectedTemplateGrade !== "all") {
      filtered = filtered.filter(template => template.grade === selectedTemplateGrade);
    }

    // Filter by category
    if (selectedTemplateCategory !== "all") {
      filtered = filtered.filter(template => template.category === selectedTemplateCategory);
    }

    setFilteredTemplates(filtered);
  };

  // Filter students by selected class
  const filteredStudents = selectedClass && selectedClass !== "all"
    ? students.filter(student => student.class._id === selectedClass)
    : students;

  const handleGeneratedTemplateDownload = async (type: 'excel' | 'word') => {
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

  const handleUploadedTemplateDownload = async (templateId: string, templateTitle: string) => {
    try {
      const response = await fetch(`/api/v1/templates/${templateId}/download`);
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        
        const contentDisposition = response.headers.get('Content-Disposition');
        const filename = contentDisposition?.match(/filename="([^"]+)"/)?.[1] || `${templateTitle}.pdf`;
        a.download = filename;
        
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        toast({
          title: "Success",
          description: "Template downloaded successfully!",
        });

        // Refresh templates to update download count
        fetchUploadedTemplates();
      } else {
        throw new Error("Download failed");
      }
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Error",
        description: "Failed to download template",
        variant: "destructive",
      });
    }
  };

  const handleStudentSelect = (studentId: string) => {
    const student = filteredStudents.find(s => s._id === studentId);
    setSelectedStudent(student || null);
  };

  const handleClassFilter = (classId: string) => {
    setSelectedClass(classId);
    setSelectedStudent(null);
  };

  const getCategoryBadgeColor = (category: string) => {
    const colors: Record<string, string> = {
      'exam': 'bg-red-100 text-red-800',
      'assignment': 'bg-blue-100 text-blue-800',
      'worksheet': 'bg-green-100 text-green-800',
      'lesson-plan': 'bg-purple-100 text-purple-800',
      'other': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors.other;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading data...</p>
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
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Template Downloads</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Download personalized exam templates or access educational resources uploaded by teachers
          </p>
        </div>

        {/* Tabs for different download types */}
        <Tabs defaultValue="generated" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generated">Generated Templates</TabsTrigger>
            <TabsTrigger value="uploaded">Educational Resources</TabsTrigger>
          </TabsList>
          
          {/* Generated Templates Tab */}
          <TabsContent value="generated" className="space-y-6">
            {/* Selection Card */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Generate Personalized Template
                </CardTitle>
                <CardDescription>
                  Choose your grade first, then select your name to generate a personalized exam template
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Grade Filter */}
                <div className="space-y-2">
                  <Label>Filter by Grade (Optional)</Label>
                  <Select value={selectedClass} onValueChange={handleClassFilter}>
                    <SelectTrigger>
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
                  <p className="text-xs text-gray-500">
                    {classes.length} classes loaded
                  </p>
                </div>

                {/* Student Selection */}
                <div className="space-y-2">
                  <Label>Select Your Name</Label>
                  <Select 
                    value={selectedStudent?._id || ""} 
                    onValueChange={handleStudentSelect}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your name..." />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredStudents.map((student) => (
                        <SelectItem key={student._id} value={student._id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{student.name}</span>
                            <Badge variant="outline" className="ml-2">
                              {student.class?.name || 'No class'}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">
                    {filteredStudents.length} students available
                    {selectedClass !== "all" && ` (filtered by grade)`}
                  </p>
                  {filteredStudents.length === 0 && (
                    <p className="text-sm text-gray-500">
                      {selectedClass === "all" ? "No students found" : "No students found in selected grade"}
                    </p>
                  )}
                </div>

                {/* Selected Student Info */}
                {selectedStudent && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-2">Selected Student</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Name:</span> {selectedStudent.name}
                      </div>
                      <div>
                        <span className="font-medium">Registration:</span> {selectedStudent.regno}
                      </div>
                      <div>
                        <span className="font-medium">Grade:</span> {selectedStudent.class.name}
                      </div>
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
                        onClick={() => handleGeneratedTemplateDownload('excel')}
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
                        onClick={() => handleGeneratedTemplateDownload('word')}
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
            <Card className="shadow-lg">
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
          </TabsContent>

          {/* Uploaded Templates Tab */}
          <TabsContent value="uploaded" className="space-y-6">
            {/* Filters */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Find Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Search</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search templates..."
                        value={templateSearchTerm}
                        onChange={(e) => setTemplateSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Grade</Label>
                    <Select value={selectedTemplateGrade} onValueChange={setSelectedTemplateGrade}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Grades</SelectItem>
                        {templateGrades.map((grade) => (
                          <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Category</Label>
                    <Select value={selectedTemplateCategory} onValueChange={setSelectedTemplateCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="exam">Exam</SelectItem>
                        <SelectItem value="assignment">Assignment</SelectItem>
                        <SelectItem value="worksheet">Worksheet</SelectItem>
                        <SelectItem value="lesson-plan">Lesson Plan</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoadingTemplates ? (
                Array(6).fill(0).map((_, i) => (
                  <Card key={i} className="shadow-lg">
                    <CardContent className="p-6">
                      <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                        <div className="h-8 bg-gray-200 rounded"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : filteredTemplates.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
                  <p className="text-gray-600">
                    {templateSearchTerm || selectedTemplateGrade !== 'all' || selectedTemplateCategory !== 'all'
                      ? "Try adjusting your filters"
                      : "No educational resources have been uploaded yet"
                    }
                  </p>
                </div>
              ) : (
                filteredTemplates.map((template) => (
                  <Card key={template._id} className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Header */}
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{template.title}</h3>
                          {template.description && (
                            <p className="text-sm text-gray-600 mb-3">
                              {template.description.length > 100
                                ? `${template.description.substring(0, 100)}...`
                                : template.description
                              }
                            </p>
                          )}
                        </div>

                        {/* Metadata */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline">{template.grade}</Badge>
                            <Badge className={getCategoryBadgeColor(template.category)}>
                              {template.category}
                            </Badge>
                          </div>
                          
                          {template.subject && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">Subject:</span>
                              <Badge variant="outline">{template.subject}</Badge>
                            </div>
                          )}

                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <FileText className="h-4 w-4" />
                              <span>{template.fileName}</span>
                            </div>
                            <span>{template.fileSizeFormatted}</span>
                          </div>

                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{template.downloadCount} downloads</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(template.createdAt)}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <User className="h-4 w-4" />
                            <span>By {template.uploadedBy.userName}</span>
                          </div>
                        </div>

                        {/* Tags */}
                        {template.tags && template.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {template.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {template.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{template.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}

                        {/* Download Button */}
                        <Button 
                          onClick={() => handleUploadedTemplateDownload(template._id, template.title)}
                          className="w-full"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>&copy; 2025 Abu Rayyan Academy. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
