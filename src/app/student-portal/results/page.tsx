"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Award,
  BookOpen,
  Calendar
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

interface ResultData {
  results: any[];
  groupedResults: any[];
  statistics: {
    totalMarks: number;
    totalScore: number;
    totalOutOf: number;
    averagePercentage: number;
    gradeDistribution: { [key: string]: number };
  };
  filters: {
    term: string | null;
    year: string | null;
    subject: string | null;
  };
}

export default function StudentResultsPage() {
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    term: "",
    year: "",
    subject: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async (filterParams?: any) => {
    try {
      setIsLoading(true);
      
      const params = new URLSearchParams();
      if (filterParams?.term) params.append("term", filterParams.term);
      if (filterParams?.year) params.append("year", filterParams.year);
      if (filterParams?.subject) params.append("subject", filterParams.subject);

      const response = await fetch(`/api/student-portal/results?${params.toString()}`);
      const data = await response.json();

      if (!data.success) {
        if (response.status === 401) {
          router.push("/student-portal/login");
          return;
        }
        throw new Error(data.message);
      }

      setResultData(data.data);

    } catch (error: any) {
      console.error("Error loading results:", error);
      toast({
        title: "Error",
        description: "Failed to load results",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Apply filters
    const filterParams = Object.fromEntries(
      Object.entries(newFilters).filter(([_, v]) => v !== "")
    );
    loadResults(filterParams);
  };

  const clearFilters = () => {
    setFilters({ term: "", year: "", subject: "" });
    loadResults();
  };

  const getGradeColor = (grade?: { name: string; points: number }) => {
    if (!grade) return "bg-gray-100 text-gray-800";
    if (grade.points >= 4) return "bg-green-100 text-green-800";
    if (grade.points >= 3) return "bg-blue-100 text-blue-800";
    if (grade.points >= 2) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const filteredResults = resultData?.results.filter((result) =>
    result.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.examName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.testingAreaName.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const years = Array.from(new Set(resultData?.results.map(r => r.year) || [])).sort((a, b) => b - a);
  const subjects = Array.from(new Set(resultData?.results.map(r => r.subject) || [])).sort();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your results...</p>
        </div>
      </div>
    );
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
              <h1 className="text-2xl font-bold text-gray-900">Academic Results</h1>
              <p className="text-sm text-gray-600">
                View your examination results and academic performance
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Overview */}
        {resultData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Results</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{resultData.statistics.totalMarks}</div>
                <p className="text-xs text-muted-foreground">Examination records</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {resultData.statistics.averagePercentage.toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground">Overall performance</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Points</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {resultData.statistics.totalScore}/{resultData.statistics.totalOutOf}
                </div>
                <p className="text-xs text-muted-foreground">Points earned</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Grade Distribution</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {Object.entries(resultData.statistics.gradeDistribution).map(([grade, count]) => (
                    <div key={grade} className="flex justify-between text-xs">
                      <span>{grade}:</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search subjects, exams..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label>Year</Label>
                <Select value={filters.year} onValueChange={(value) => handleFilterChange("year", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All years" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All years</SelectItem>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Term</Label>
                <Select value={filters.term} onValueChange={(value) => handleFilterChange("term", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All terms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All terms</SelectItem>
                    <SelectItem value="1">Term 1</SelectItem>
                    <SelectItem value="2">Term 2</SelectItem>
                    <SelectItem value="3">Term 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Subject</Label>
                <Select value={filters.subject} onValueChange={(value) => handleFilterChange("subject", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All subjects</SelectItem>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {(filters.term || filters.year || filters.subject) && (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Results Display */}
        <Tabs defaultValue="list" className="space-y-4">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="grouped">Grouped by Term</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <Card>
              <CardHeader>
                <CardTitle>All Results ({filteredResults.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredResults.length > 0 ? (
                  <div className="space-y-4">
                    {filteredResults.map((result, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-4">
                            <div>
                              <h4 className="font-medium">{result.subject}</h4>
                              <p className="text-sm text-gray-600">
                                {result.examName} • {result.testingAreaName}
                              </p>
                              <p className="text-xs text-gray-500">
                                {result.year} Term {result.term} • {result.class}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                          <div className="text-right">
                            <p className="font-medium text-lg">
                              {result.score}/{result.outOf}
                            </p>
                            <p className="text-sm text-gray-600">
                              {result.percentage}%
                            </p>
                          </div>
                          
                          <Badge className={`${getGradeColor(result.grade)} text-sm`}>
                            {result.grade?.name || "N/A"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No results found matching your criteria.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grouped">
            <div className="space-y-6">
              {resultData?.groupedResults.map((group: any) => (
                <Card key={`${group.year}-${group.term}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      {group.year} - Term {group.term}
                    </CardTitle>
                    <CardDescription>
                      {group.results.length} results
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {group.results.map((result: any, index: number) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <h5 className="font-medium">{result.subject}</h5>
                            <p className="text-sm text-gray-600">{result.testingAreaName}</p>
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
                    </div>
                  </CardContent>
                </Card>
              )) || (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No grouped results available.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
