"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  User, 
  Edit, 
  Save, 
  X,
  Phone,
  MapPin,
  Calendar,
  Users,
  Clock,
  Shield,
  Activity
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

interface ProfileData {
  student: {
    _id: string;
    name: string;
    regno: string;
    kas?: string;
    dob: string;
    gen: string;
    photo?: string;
    class: any;
    contactDetails: { phone: string };
    guardians: any[];
    address: {
      town: string;
      county: string;
      nationality: string;
      street: string;
    };
    createdAt: string;
    lastLogin?: string;
    isFirstLogin?: boolean;
    passwordResetRequired?: boolean;
  };
  loginHistory: any[];
  activeSessions: any[];
  statistics: {
    totalLogins: number;
    lastLogin?: string;
    totalTimeSpent: number;
    averageSessionTime: number;
    accountCreated: string;
  };
}

export default function StudentProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    phone: "",
    street: "",
    town: "",
    county: "",
  });
  
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/student-portal/profile");
      const data = await response.json();

      if (!data.success) {
        if (response.status === 401) {
          router.push("/student-portal/login");
          return;
        }
        throw new Error(data.message);
      }

      setProfileData(data.data);
      
      // Initialize edit form
      setEditForm({
        phone: data.data.student.contactDetails.phone || "",
        street: data.data.student.address.street || "",
        town: data.data.student.address.town || "",
        county: data.data.student.address.county || "",
      });

    } catch (error: any) {
      console.error("Error loading profile:", error);
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      
      const response = await fetch("/api/student-portal/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contactDetails: { phone: editForm.phone },
          address: {
            street: editForm.street,
            town: editForm.town,
            county: editForm.county,
          },
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated.",
        });
        setIsEditing(false);
        loadProfile(); // Reload to get updated data
      } else {
        throw new Error(data.message);
      }

    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return null;
  }

  const { student, loginHistory, activeSessions, statistics } = profileData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Link href="/student-portal/dashboard">
                <Button variant="ghost" size="sm" className="mr-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                <p className="text-sm text-gray-600">
                  Manage your personal information and settings
                </p>
              </div>
            </div>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
            {isEditing && (
              <div className="flex space-x-2">
                <Button onClick={handleSaveProfile} disabled={isSaving}>
                  {isSaving ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={student.photo} alt={student.name} />
                <AvatarFallback className="text-xl">
                  {student.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
                <p className="text-lg text-gray-600">{student.regno}</p>
                {student.kas && (
                  <p className="text-sm text-gray-500">KAS: {student.kas}</p>
                )}
                <div className="flex items-center space-x-4 mt-2">
                  <Badge variant="secondary">{student.class?.name || "No Class"}</Badge>
                  <Badge variant="outline">{student.gen}</Badge>
                  {student.passwordResetRequired && (
                    <Badge variant="destructive">Password Reset Required</Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="info" className="space-y-4">
          <TabsList>
            <TabsTrigger value="info">Personal Information</TabsTrigger>
            <TabsTrigger value="academic">Academic Details</TabsTrigger>
            <TabsTrigger value="activity">Activity & Security</TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Personal Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Full Name</Label>
                    <p className="text-sm">{student.name}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Date of Birth</Label>
                    <p className="text-sm">{formatDate(student.dob)}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Gender</Label>
                    <p className="text-sm capitalize">{student.gen}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Nationality</Label>
                    <p className="text-sm capitalize">{student.address.nationality}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="h-5 w-5 mr-2" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-500">
                      Phone Number
                    </Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={editForm.phone}
                        onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="Enter phone number"
                      />
                    ) : (
                      <p className="text-sm">{student.contactDetails.phone || "Not provided"}</p>
                    )}
                  </div>

                  <Separator />

                  <div>
                    <Label htmlFor="street" className="text-sm font-medium text-gray-500">
                      Street Address
                    </Label>
                    {isEditing ? (
                      <Input
                        id="street"
                        value={editForm.street}
                        onChange={(e) => setEditForm(prev => ({ ...prev, street: e.target.value }))}
                        placeholder="Enter street address"
                      />
                    ) : (
                      <p className="text-sm">{student.address.street || "Not provided"}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="town" className="text-sm font-medium text-gray-500">
                      Town
                    </Label>
                    {isEditing ? (
                      <Input
                        id="town"
                        value={editForm.town}
                        onChange={(e) => setEditForm(prev => ({ ...prev, town: e.target.value }))}
                        placeholder="Enter town"
                      />
                    ) : (
                      <p className="text-sm">{student.address.town}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="county" className="text-sm font-medium text-gray-500">
                      County
                    </Label>
                    {isEditing ? (
                      <Input
                        id="county"
                        value={editForm.county}
                        onChange={(e) => setEditForm(prev => ({ ...prev, county: e.target.value }))}
                        placeholder="Enter county"
                      />
                    ) : (
                      <p className="text-sm">{student.address.county}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Guardians */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Guardians
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {student.guardians.length > 0 ? (
                    <div className="space-y-3">
                      {student.guardians.map((guardian: any, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                          <p className="font-medium">{guardian.name}</p>
                          <p className="text-sm text-gray-600">{guardian.email}</p>
                          <p className="text-sm text-gray-600">{guardian.phone}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No guardians assigned</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="academic">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Academic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Academic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Registration Number</Label>
                    <p className="text-sm font-mono">{student.regno}</p>
                  </div>
                  
                  {student.kas && (
                    <div>
                      <Label className="text-sm font-medium text-gray-500">KAS Number</Label>
                      <p className="text-sm font-mono">{student.kas}</p>
                    </div>
                  )}
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Class</Label>
                    <p className="text-sm">{student.class?.name || "Not assigned"}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Grade</Label>
                    <p className="text-sm">{student.class?.grade || "Not specified"}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Enrollment Date</Label>
                    <p className="text-sm">{formatDate(student.createdAt)}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Account Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Total Login Sessions</Label>
                    <p className="text-2xl font-bold">{statistics.totalLogins}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Total Time Spent</Label>
                    <p className="text-lg font-semibold">{formatDuration(statistics.totalTimeSpent)}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Average Session Time</Label>
                    <p className="text-lg font-semibold">{formatDuration(statistics.averageSessionTime)}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Last Login</Label>
                    <p className="text-sm">{statistics.lastLogin ? formatDateTime(statistics.lastLogin) : "Never"}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Active Sessions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Active Sessions
                  </CardTitle>
                  <CardDescription>
                    Your currently active portal sessions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {activeSessions.length > 0 ? (
                    <div className="space-y-3">
                      {activeSessions.map((session, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium">
                                {formatDateTime(session.loginTime)}
                              </p>
                              <p className="text-xs text-gray-600">
                                {session.ipAddress}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {session.deviceInfo}
                              </p>
                            </div>
                            <Badge variant="secondary">Active</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No active sessions</p>
                  )}
                </CardContent>
              </Card>

              {/* Recent Login History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Recent Login History
                  </CardTitle>
                  <CardDescription>
                    Your recent portal access history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loginHistory.length > 0 ? (
                    <div className="space-y-3">
                      {loginHistory.slice(0, 5).map((login, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium">
                                {formatDateTime(login.loginTime)}
                              </p>
                              <p className="text-xs text-gray-600">
                                Method: {login.loginMethod.toUpperCase()}
                              </p>
                              <p className="text-xs text-gray-600">
                                IP: {login.ipAddress}
                              </p>
                              {login.sessionDuration && (
                                <p className="text-xs text-gray-500">
                                  Duration: {formatDuration(login.sessionDuration)}
                                </p>
                              )}
                            </div>
                            <Badge variant={login.logoutTime ? "secondary" : "default"}>
                              {login.logoutTime ? "Completed" : "Active"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No login history available</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Security Settings */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Change Password</p>
                    <p className="text-sm text-gray-600">
                      Update your account password for better security
                    </p>
                  </div>
                  <Link href="/student-portal/reset-password">
                    <Button variant="outline">
                      Change Password
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
