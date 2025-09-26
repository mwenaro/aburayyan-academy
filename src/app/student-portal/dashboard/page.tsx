"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  BookOpen, 
  BarChart3, 
  Settings, 
  LogOut, 
  Clock,
  TrendingUp,
  Award,
  Calendar,
  Eye,
  Activity
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

interface Student {
  _id: string;
  name: string;
  regno: string;
  kas?: string;
  class: any;
  photo?: string;
  gen: string;
  lastLogin?: string;
  isFirstLogin?: boolean;
  passwordResetRequired?: boolean;
}

interface DashboardStats {
  totalResults: number;
  averagePercentage: number;
  totalLoginSessions: number;
  lastLogin?: string;
}

export default function StudentDashboard() {
  const [student, setStudent] = useState<Student | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentResults, setRecentResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);

      // Load student profile
      const profileResponse = await fetch("/api/student-portal/profile");
      const profileData = await profileResponse.json();

      if (!profileData.success) {
        router.push("/student-portal/login");
        return;
      }

      setStudent(profileData.data.student);

      // Load recent results
      const resultsResponse = await fetch("/api/student-portal/results?limit=5");
      const resultsData = await resultsResponse.json();

      if (resultsData.success) {
        setRecentResults(resultsData.data.results);
        setStats({
          totalResults: resultsData.data.statistics.totalMarks,
          averagePercentage: resultsData.data.statistics.averagePercentage,
          totalLoginSessions: profileData.data.statistics.totalLogins,
          lastLogin: profileData.data.statistics.lastLogin,
        });
      }

    } catch (error) {
      console.error("Error loading dashboard:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/student-auth/logout", { method: "POST" });
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      router.push("/student-portal");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getGradeColor = (grade?: { name: string; points: number }) => {
    if (!grade) return "bg-gray-100 text-gray-800";
    if (grade.points >= 4) return "bg-green-100 text-green-800";
    if (grade.points >= 3) return "bg-blue-100 text-blue-800";
    if (grade.points >= 2) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={student.photo} alt={student.name} />
                <AvatarFallback>
                  {student.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Welcome, {student.name}
                </h1>
                <p className="text-sm text-gray-600">
                  {student.regno} • {student.class?.name || "No Class Assigned"}
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Results</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalResults || 0}</div>
              <p className="text-xs text-muted-foreground">
                Examination records
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.averagePercentage ? `${stats.averagePercentage.toFixed(1)}%` : "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">
                Overall performance
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Login Sessions</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalLoginSessions || 0}</div>
              <p className="text-xs text-muted-foreground">
                Portal access count
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Login</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-bold">
                {formatDate(stats?.lastLogin)}
              </div>
              <p className="text-xs text-muted-foreground">
                Previous session
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href="/student-portal/results">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>View Results</CardTitle>
                <CardDescription>
                  Access your examination results and academic performance
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/student-portal/profile">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <User className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>My Profile</CardTitle>
                <CardDescription>
                  View and update your personal information and settings
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/student-portal/activity">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <Activity className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle>Activity Log</CardTitle>
                <CardDescription>
                  Monitor your portal usage and login history
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Recent Results */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Results</CardTitle>
            <CardDescription>
              Your latest examination results and grades
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentResults.length > 0 ? (
              <div className="space-y-4">
                {recentResults.slice(0, 5).map((result: any, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium">{result.subject}</h4>
                      <p className="text-sm text-gray-600">
                        {result.examName} • {result.testingAreaName}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium">
                          {result.score}/{result.outOf}
                        </p>
                        <p className="text-sm text-gray-600">
                          {result.percentage}%
                        </p>
                      </div>
                      <Badge className={getGradeColor(result.grade)}>
                        {result.grade?.name || "N/A"}
                      </Badge>
                    </div>
                  </div>
                ))}
                <div className="text-center pt-4">
                  <Link href="/student-portal/results">
                    <Button variant="outline">View All Results</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No examination results found.</p>
                <p className="text-sm text-gray-500 mt-2">
                  Results will appear here once your exams are graded.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
