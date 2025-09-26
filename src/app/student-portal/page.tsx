"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  GraduationCap,
  BookOpen,
  User,
  BarChart3,
  Clock,
  Shield,
} from "lucide-react";
import Link from "next/link";

export default function StudentPortalPage() {
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/student-auth/session");
        const data = await response.json();

        if (data.success) {
          // User is logged in, redirect to dashboard
          router.push("/student-portal/dashboard");
        }
      } catch (error) {
        // User not logged in, stay on this page
      }
    };

    checkSession();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600 mr-2" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Abu Rayyan Academy
                </h1>
                <p className="text-sm text-gray-600">Student Portal</p>
              </div>
            </div>
            <Link href="/student-portal/login">
              <Button>Student Login</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Your Academic Journey
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Access your academic records, view examination results, manage your
            profile, and stay connected with your educational progress.
          </p>
          <Link href="/student-portal/login">
            <Button size="lg" className="px-8 py-3 text-lg">
              Access Student Portal
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <BookOpen className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Academic Results</CardTitle>
              <CardDescription>
                View your examination results, grades, and academic performance
                across all subjects and terms.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <User className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Student Profile</CardTitle>
              <CardDescription>
                Manage your personal information, contact details, and view your
                academic journey.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <BarChart3 className="h-10 w-10 text-purple-600 mb-2" />
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>
                Track your academic progress with detailed statistics and
                performance insights.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Clock className="h-10 w-10 text-orange-600 mb-2" />
              <CardTitle>Activity Tracking</CardTitle>
              <CardDescription>
                Monitor your portal usage and maintain accountability for your
                academic activities.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Shield className="h-10 w-10 text-red-600 mb-2" />
              <CardTitle>Secure Access</CardTitle>
              <CardDescription>
                Your data is protected with secure authentication and
                comprehensive activity logging.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <GraduationCap className="h-10 w-10 text-indigo-600 mb-2" />
              <CardTitle>Academic Records</CardTitle>
              <CardDescription>
                Access comprehensive records of your educational progress and
                achievements.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Login Information */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            How to Access Your Portal
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Login Credentials
              </h4>
              <div className="space-y-2 text-gray-600">
                <p>
                  • Use your <strong>Registration Number</strong> (e.g.,
                  abu/s/2024/001)
                </p>
                <p>
                  • Or use your <strong>KAS Number</strong> if provided
                </p>
                <p>
                  • Default password:{" "}
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                    2025
                  </span>
                </p>
                <p>
                  • You&apos;ll be prompted to change your password on first
                  login
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Security Features
              </h4>
              <div className="space-y-2 text-gray-600">
                <p>• Secure session management</p>
                <p>• Login activity tracking</p>
                <p>• Account lockout protection</p>
                <p>• Password encryption</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800">
              <strong>Need Help?</strong> If you&apos;re having trouble
              accessing your account, please contact your class teacher or the
              school administration for assistance.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 Abu Rayyan Academy. All rights reserved.</p>
            <p className="mt-2 text-sm">
              For technical support, contact the school administration.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
