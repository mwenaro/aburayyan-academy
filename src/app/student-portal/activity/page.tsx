"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Search, 
  Activity,
  Clock,
  Shield,
  Monitor,
  LogIn,
  LogOut,
  Eye,
  Settings,
  User,
  Calendar,
  Filter
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

interface ActivityData {
  loginHistory: Array<{
    _id: string;
    loginMethod: "regno" | "kas";
    identifier: string;
    ipAddress: string;
    userAgent: string;
    deviceInfo?: string;
    location?: string;
    loginTime: string;
    logoutTime?: string;
    sessionDuration?: number;
    activityLog: Array<{
      action: string;
      timestamp: string;
      details?: string;
    }>;
    isActive: boolean;
  }>;
  statistics: {
    totalLogins: number;
    lastLogin?: string;
    totalTimeSpent: number;
    averageSessionTime: number;
    accountCreated: string;
  };
}

export default function StudentActivityPage() {
  const [activityData, setActivityData] = useState<ActivityData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    loadActivity();
  }, []);

  const loadActivity = async () => {
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

      setActivityData({
        loginHistory: data.data.loginHistory,
        statistics: data.data.statistics,
      });

    } catch (error: any) {
      console.error("Error loading activity:", error);
      toast({
        title: "Error",
        description: "Failed to load activity data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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

  const getActionIcon = (action: string) => {
    const iconClass = "h-4 w-4";
    switch (action.toLowerCase()) {
      case "login_success":
        return <LogIn className={`${iconClass} text-green-600`} />;
      case "login_failed":
        return <LogIn className={`${iconClass} text-red-600`} />;
      case "logout":
        return <LogOut className={`${iconClass} text-gray-600`} />;
      case "view_results":
        return <Eye className={`${iconClass} text-blue-600`} />;
      case "view_profile":
        return <User className={`${iconClass} text-purple-600`} />;
      case "update_profile":
        return <Settings className={`${iconClass} text-orange-600`} />;
      case "password_changed":
        return <Shield className={`${iconClass} text-yellow-600`} />;
      case "session_verified":
        return <Shield className={`${iconClass} text-green-600`} />;
      default:
        return <Activity className={`${iconClass} text-gray-600`} />;
    }
  };

  const getActionDescription = (action: string, details?: string) => {
    switch (action.toLowerCase()) {
      case "login_success":
        return "Successful login";
      case "login_failed":
        return "Failed login attempt";
      case "logout":
        return "Logged out";
      case "view_results":
        return "Viewed academic results";
      case "view_profile":
        return "Viewed profile";
      case "update_profile":
        return "Updated profile information";
      case "password_changed":
        return "Changed password";
      case "session_verified":
        return "Session verified";
      default:
        return action.replace(/_/g, " ").toLowerCase();
    }
  };

  const filteredSessions = activityData?.loginHistory.filter((session) => {
    const matchesSearch = 
      session.identifier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.ipAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.deviceInfo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      false;

    const matchesFilter = 
      filterType === "all" ||
      (filterType === "active" && session.isActive) ||
      (filterType === "completed" && !session.isActive) ||
      (filterType === "regno" && session.loginMethod === "regno") ||
      (filterType === "kas" && session.loginMethod === "kas");

    return matchesSearch && matchesFilter;
  }) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading activity data...</p>
        </div>
      </div>
    );
  }

  if (!activityData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Link href="/student-portal/dashboard">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Activity Log</h1>
              <p className="text-sm text-gray-600">
                Monitor your portal usage and login history
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
              <Monitor className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activityData.statistics.totalLogins}</div>
              <p className="text-xs text-muted-foreground">Login sessions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatDuration(activityData.statistics.totalTimeSpent)}
              </div>
              <p className="text-xs text-muted-foreground">Time spent</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Session</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatDuration(activityData.statistics.averageSessionTime)}
              </div>
              <p className="text-xs text-muted-foreground">Per session</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Login</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-bold">
                {activityData.statistics.lastLogin 
                  ? formatDateTime(activityData.statistics.lastLogin)
                  : "Never"
                }
              </div>
              <p className="text-xs text-muted-foreground">Previous session</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search sessions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label>Session Type</Label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sessions</SelectItem>
                    <SelectItem value="active">Active Sessions</SelectItem>
                    <SelectItem value="completed">Completed Sessions</SelectItem>
                    <SelectItem value="regno">Registration Number Login</SelectItem>
                    <SelectItem value="kas">KAS Number Login</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery("");
                    setFilterType("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Session History */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sessions List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Login Sessions ({filteredSessions.length})</CardTitle>
                <CardDescription>
                  Your portal access history and session details
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredSessions.length > 0 ? (
                  <div className="space-y-4">
                    {filteredSessions.map((session) => (
                      <div
                        key={session._id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedSession === session._id 
                            ? "border-blue-500 bg-blue-50" 
                            : "hover:bg-gray-50"
                        }`}
                        onClick={() => setSelectedSession(session._id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant={session.isActive ? "default" : "secondary"}>
                                {session.isActive ? "Active" : "Completed"}
                              </Badge>
                              <Badge variant="outline">
                                {session.loginMethod.toUpperCase()}
                              </Badge>
                            </div>
                            
                            <p className="font-medium text-sm">
                              {formatDateTime(session.loginTime)}
                            </p>
                            
                            <div className="text-xs text-gray-600 space-y-1 mt-2">
                              <p>Identifier: {session.identifier}</p>
                              <p>IP Address: {session.ipAddress}</p>
                              {session.sessionDuration && (
                                <p>Duration: {formatDuration(session.sessionDuration)}</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-xs text-gray-500">
                              {session.activityLog.length} activities
                            </p>
                            {session.logoutTime && (
                              <p className="text-xs text-gray-500">
                                Ended: {formatDateTime(session.logoutTime)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No sessions found matching your criteria.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Session Details */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Session Activities</CardTitle>
                <CardDescription>
                  {selectedSession ? "Activities for selected session" : "Select a session to view details"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedSession ? (
                  (() => {
                    const session = filteredSessions.find(s => s._id === selectedSession);
                    return session ? (
                      <div className="space-y-4">
                        {/* Session Info */}
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-sm mb-2">Session Details</h4>
                          <div className="text-xs space-y-1">
                            <p><strong>Method:</strong> {session.loginMethod.toUpperCase()}</p>
                            <p><strong>Identifier:</strong> {session.identifier}</p>
                            <p><strong>IP:</strong> {session.ipAddress}</p>
                            {session.deviceInfo && (
                              <p><strong>Device:</strong> {session.deviceInfo}</p>
                            )}
                            {session.location && (
                              <p><strong>Location:</strong> {session.location}</p>
                            )}
                          </div>
                        </div>

                        {/* Activities */}
                        <div className="space-y-3">
                          <h4 className="font-medium text-sm">Activities</h4>
                          {session.activityLog.length > 0 ? (
                            session.activityLog.map((activity, index) => (
                              <div key={index} className="flex items-start space-x-3">
                                <div className="mt-1">
                                  {getActionIcon(activity.action)}
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium">
                                    {getActionDescription(activity.action, activity.details)}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {formatDateTime(activity.timestamp)}
                                  </p>
                                  {activity.details && (
                                    <p className="text-xs text-gray-600 mt-1">
                                      {activity.details}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-gray-500">No activities recorded</p>
                          )}
                        </div>
                      </div>
                    ) : null;
                  })()
                ) : (
                  <div className="text-center py-8">
                    <Activity className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">
                      Click on a session to view its activities
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
