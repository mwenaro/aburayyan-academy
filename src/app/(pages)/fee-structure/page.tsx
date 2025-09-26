"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Download, ArrowLeft, Calendar, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface FeeDocument {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileSize: string;
  lastUpdated: string;
  academicYear: string;
}

const feeDocuments: FeeDocument[] = [
  {
    id: "fee-structure-2025",
    title: "Fee Structure 2025/2026",
    description: "Complete fee structure for all grades for academic year 2025/2026",
    fileName: "fee-structure-2025-2026.pdf",
    fileSize: "187 KB",
    lastUpdated: "2025-09-01",
    academicYear: "2025/2026"
  },
  {
    id: "payment-plan",
    title: "Payment Plan Options",
    description: "Various payment plan options and installment schedules",
    fileName: "payment-plan-options.pdf",
    fileSize: "125 KB",
    lastUpdated: "2025-08-15",
    academicYear: "2025/2026"
  },
  {
    id: "additional-fees",
    title: "Additional Fees & Services",
    description: "Fees for extra-curricular activities, transport, and other services",
    fileName: "additional-fees-services.pdf",
    fileSize: "98 KB",
    lastUpdated: "2025-08-10",
    academicYear: "2025/2026"
  }
];

export default function FeeStructurePage() {
  const handleDownload = (fileName: string, title: string) => {
    // Create a download link
    const link = document.createElement('a');
    link.href = `/fee-structure/${fileName}`;
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
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Fee Structure</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Download current fee schedules, payment plans, and financial information
          </p>
        </div>

        {/* Academic Year Info */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Academic Year 2025/2026
            </CardTitle>
            <CardDescription>
              Current fee structure and payment information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200 text-center">
                <div className="font-semibold text-green-900">Term 1</div>
                <div className="text-sm text-green-600">January - April 2025</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 text-center">
                <div className="font-semibold text-blue-900">Term 2</div>
                <div className="text-sm text-blue-600">May - August 2025</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 text-center">
                <div className="font-semibold text-purple-900">Term 3</div>
                <div className="text-sm text-purple-600">September - December 2025</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fee Documents Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {feeDocuments.map((doc) => (
            <Card key={doc.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {doc.academicYear}
                  </div>
                </div>
                <CardTitle className="text-lg font-bold text-gray-900 leading-tight">
                  {doc.title}
                </CardTitle>
                <CardDescription className="text-gray-600 text-sm">
                  {doc.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {/* File Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>Updated: {new Date(doc.lastUpdated).toLocaleDateString()}</span>
                    </div>
                    <span>{doc.fileSize}</span>
                  </div>
                  
                  {/* Download Button */}
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 transition-colors"
                    onClick={() => handleDownload(doc.fileName, doc.title)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Information */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Payment Methods
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Bank Transfer</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">M-Pesa Payments</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">Cash Payments (School Office)</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">Cheque Payments</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Important Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-600">
                <p>• Fees should be paid at the beginning of each term</p>
                <p>• Late payment may incur additional charges</p>
                <p>• Payment plans are available - contact the accounts office</p>
                <p>• All payments should include the student&apos;s name and class</p>
                <p>• Fee receipts should be kept for records</p>
                <p>• Scholarships and bursaries are available for qualifying students</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Accounts Office Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Office Hours</h4>
                <p className="text-gray-600 text-sm mb-1">Monday - Friday: 8:00 AM - 4:00 PM</p>
                <p className="text-gray-600 text-sm mb-1">Saturday: 8:00 AM - 12:00 PM</p>
                <p className="text-gray-600 text-sm">Sunday: Closed</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Contact Details</h4>
                <p className="text-gray-600 text-sm mb-1">Phone: +254 XXX XXX XXX</p>
                <p className="text-gray-600 text-sm mb-1">Email: accounts@aburayyanacademy.ac.ke</p>
                <p className="text-gray-600 text-sm">Office: Ground Floor, Administration Block</p>
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