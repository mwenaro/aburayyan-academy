"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, ArrowLeft, Calendar, FileCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface FormDocument {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileSize: string;
  lastUpdated: string;
  category: string;
}

const formDocuments: FormDocument[] = [
  {
    id: "pre-primary-admission",
    title: "Pre-Primary, Primary & Junior School Admission Form",
    description: "Comprehensive admission form for Pre-Primary, Primary and Junior school levels",
    fileName: "pre-primary, primary-and-junior-school-admission-form.pdf",
    fileSize: "280 KB",
    lastUpdated: "2025-09-20",
    category: "Pre-Primary & Primary"
  },
  {
    id: "junior-admission",
    title: "Junior School Admission Form",
    description: "Application form for students seeking admission to junior school (Grade 7-9)",
    fileName: "junior-school-admission-form.pdf",
    fileSize: "198 KB",
    lastUpdated: "2025-09-15",
    category: "Junior School"
  },
  {
    id: "senior-admission",
    title: "Senior School Admission Form",
    description: "Application form for new students seeking admission to senior school (Grade 10-12)",
    fileName: "senior-school-admission-form.pdf",
    fileSize: "245 KB",
    lastUpdated: "2025-09-15",
    category: "Senior School"
  },
    {
    id: "transfer-form",
    title: "Student Transfer Form",
    description: "Required form for students transferring from other institutions",
    fileName: "student-transfer-form.pdf",
    fileSize: "156 KB",
    lastUpdated: "2025-08-30",
    category: "Transfer"
  },
  {
    id: "medical-form",
    title: "Medical Information Form",
    description: "Medical history and health information form for all new students",
    fileName: "medical-information-form.pdf",
    fileSize: "132 KB",
    lastUpdated: "2025-09-01",
    category: "Health"
  },
  {
    id: "transport-form",
    title: "School Transport Registration",
    description: "Registration form for school bus transportation services",
    fileName: "transport-registration-form.pdf",
    fileSize: "98 KB",
    lastUpdated: "2025-08-25",
    category: "Transport"
  }
];

const categories = [
  { name: "All", count: formDocuments.length },
  { name: "Pre-Primary & Primary", count: formDocuments.filter(f => f.category === "Pre-Primary & Primary").length },
  { name: "Junior School", count: formDocuments.filter(f => f.category === "Junior School").length },
  { name: "Senior School", count: formDocuments.filter(f => f.category === "Senior School").length },
  // { name: "Transfer", count: formDocuments.filter(f => f.category === "Transfer").length },
  // { name: "Health", count: formDocuments.filter(f => f.category === "Health").length },
  // { name: "Transport", count: formDocuments.filter(f => f.category === "Transport").length },
];

export default function FormsPage() {
  const handleDownload = (fileName: string, title: string) => {
    // Create a download link
    const link = document.createElement('a');
    link.href = `/forms/${fileName}`;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/downloads">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Downloads
            </Button>
          </Link>
        </div>

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
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">School Forms</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Download official school forms for admissions, transfers, and other school services
          </p>
        </div>

        {/* Categories */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="h-5 w-5" />
              Form Categories
            </CardTitle>
            <CardDescription>
              Forms are organized by category for easy navigation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-center hover:bg-blue-100 transition-colors"
                >
                  <div className="font-semibold text-blue-900 text-sm">{category.name}</div>
                  <div className="text-xs text-blue-600">{category.count} form{category.count !== 1 ? 's' : ''}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Forms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {formDocuments.map((form) => (
            <Card key={form.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {form.category}
                  </div>
                </div>
                <CardTitle className="text-lg font-bold text-gray-900 leading-tight">
                  {form.title}
                </CardTitle>
                <CardDescription className="text-gray-600 text-sm">
                  {form.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {/* File Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>Updated: {new Date(form.lastUpdated).toLocaleDateString()}</span>
                    </div>
                    <span>{form.fileSize}</span>
                  </div>
                  
                  {/* Download Button */}
                  <Button 
                    className="w-full group-hover:bg-blue-700 transition-colors"
                    onClick={() => handleDownload(form.fileName, form.title)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Form
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Instructions */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle>How to Use Forms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Download the Form</h4>
                    <p className="text-gray-600 text-sm">Click the download button to save the PDF form to your device</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Fill Out the Form</h4>
                    <p className="text-gray-600 text-sm">Print the form and fill it out with black or blue ink</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Attach Required Documents</h4>
                    <p className="text-gray-600 text-sm">Include all supporting documents as specified in the form</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Submit to School</h4>
                    <p className="text-gray-600 text-sm">Bring the completed form to the school office during business hours</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">School Office</h4>
                <p className="text-gray-600 text-sm mb-1">Visit us during office hours:</p>
                <p className="text-gray-600 text-sm mb-1">Monday - Friday: 7:00 AM - 5:00 PM</p>
                <p className="text-gray-600 text-sm">Saturday: 8:00 AM - 12:00 PM</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
                <p className="text-gray-600 text-sm mb-1">Phone: 0722299287 / 0723755108</p>
                <p className="text-gray-600 text-sm mb-1">Email: info@aburayyanacademy.com</p>
                <p className="text-gray-600 text-sm">Address: Mombasa, Kenya</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        {/* <div className="text-center mt-12 text-gray-500">
          <p>&copy; 2025 Abu Rayyan Academy. All rights reserved.</p>
        </div> */}
      </div>
    </div>
  );
}