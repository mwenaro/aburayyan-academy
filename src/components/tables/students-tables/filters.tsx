"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Filter, Search, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterOption {
  value: string;
  label: string;
  classes?: Array<{
    _id: string;
    name: string;
    grade: string | number;
    ukey: string;
  }>;
}

interface FilterOptions {
  grades: FilterOption[];
  classes: Array<{
    _id: string;
    name: string;
    grade: string | number;
    ukey: string;
  }>;
  classesByGrade: Record<string, any[]>;
}

interface StudentFiltersProps {
  className?: string;
  onFiltersChange?: (activeFilters: Record<string, string>) => void;
}

export const StudentFilters: React.FC<StudentFiltersProps> = ({
  className,
  onFiltersChange,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Filter states
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Get current URL params
  const currentGrade = searchParams?.get("grade") || "all";
  const currentClass = searchParams?.get("classId") || "all";
  const currentGender = searchParams?.get("gen") || "all";
  const currentSearch = searchParams?.get("search") || "";

  // Fetch filter options
  const fetchFilterOptions = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/v1/students/filter-options");
      const data = await response.json();
      if (data.success) {
        console.log('Filter options loaded:', data.data);
        console.log('Classes available:', data.data.classes?.length);
        console.log('Classes by grade:', data.data.classesByGrade);
        setFilterOptions(data.data);
      }
    } catch (error) {
      console.error("Error fetching filter options:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initialize component
  useEffect(() => {
    fetchFilterOptions();
    // Set initial values from URL params
    setSelectedGrade(currentGrade);
    setSelectedClass(currentClass);
    setSelectedGender(currentGender);
    setSearchQuery(currentSearch);
  }, [fetchFilterOptions, currentGrade, currentClass, currentGender, currentSearch]);

  // Create query string helper
  const createQueryString = useCallback(
    (params: Record<string, string | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      // Reset page when filters change
      newSearchParams.delete("page");

      for (const [key, value] of Object.entries(params)) {
        if (value === null || value === "") {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams]
  );

  // Apply filters
  const applyFilters = useCallback(() => {
    const params: Record<string, string | null> = {
      grade: selectedGrade === "all" ? null : selectedGrade,
      classId: selectedClass === "all" ? null : selectedClass,
      gen: selectedGender === "all" ? null : selectedGender,
      search: searchQuery || null,
    };

    const queryString = createQueryString(params);
    router.push(`${pathname}?${queryString}`, { scroll: false });

    // Call parent callback if provided
    const activeFilters: Record<string, string> = {};
    Object.entries(params).forEach(([key, value]) => {
      if (value) activeFilters[key] = value;
    });
    onFiltersChange?.(activeFilters);
  }, [selectedGrade, selectedClass, selectedGender, searchQuery, createQueryString, router, pathname, onFiltersChange]);

  // Reset filters
  const resetFilters = useCallback(() => {
    setSelectedGrade("all");
    setSelectedClass("all");
    setSelectedGender("all");
    setSearchQuery("");
    
    const queryString = createQueryString({
      grade: null,
      classId: null,
      gen: null,
      search: null,
    });
    
    router.push(`${pathname}?${queryString}`, { scroll: false });
    onFiltersChange?.({});
  }, [createQueryString, router, pathname, onFiltersChange]);

  // Auto-apply filters when they change
  useEffect(() => {
    applyFilters();
  }, [selectedGrade, selectedClass, selectedGender]);

  // Auto-apply search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      applyFilters();
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchQuery, applyFilters]);

  // Get available classes for selected grade
  const availableClasses = selectedGrade && selectedGrade !== "all" && filterOptions
    ? filterOptions.classesByGrade[selectedGrade] || []
    : filterOptions?.classes || [];

  // Clear class selection when grade changes
  useEffect(() => {
    if (selectedGrade && selectedGrade !== "all" && selectedClass && selectedClass !== "all") {
      const classExists = availableClasses.find(cls => cls._id === selectedClass);
      if (!classExists) {
        setSelectedClass("all");
      }
    }
  }, [selectedGrade, selectedClass, availableClasses]);

  // Count active filters
  const activeFiltersCount = [
    selectedGrade !== "all" ? selectedGrade : null, 
    selectedClass !== "all" ? selectedClass : null, 
    selectedGender !== "all" ? selectedGender : null, 
    searchQuery
  ].filter(Boolean).length;

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Student Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount} active
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              {showFilters ? "Hide" : "Show"}
            </Button>
            {activeFiltersCount > 0 && (
              <Button variant="outline" size="sm" onClick={resetFilters}>
                <RotateCcw className="h-3 w-3 mr-1" />
                Reset
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className={cn("space-y-4", !showFilters && "hidden lg:block")}>
        {/* Search Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Search Students</label>
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, phone, or registration number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  applyFilters();
                }
              }}
              className="pl-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Grade Filter */}
          {/* <div className="space-y-2">
            <label className="text-sm font-medium">Grade</label>
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger>
                <SelectValue placeholder="All Grades" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                {isLoading ? (
                  <SelectItem value="loading" disabled>Loading...</SelectItem>
                ) : (
                  filterOptions?.grades.map((grade) => (
                    <SelectItem key={grade.value} value={grade.value}>
                      {grade.label} ({grade.classes?.length || 0} classes)
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div> */}


          {/* Class Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Grade</label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue placeholder="All Grades" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades </SelectItem>
                {availableClasses.map((cls) => (
                  <SelectItem key={cls._id} value={cls._id}>
                    {cls.name} (Grade {cls.grade})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Gender Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Gender</label>
            <Select value={selectedGender} onValueChange={setSelectedGender}>
              <SelectTrigger>
                <SelectValue placeholder="All Genders" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genders</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 pt-2 border-t">
            <span className="text-sm font-medium text-muted-foreground">Active filters:</span>
            {selectedGrade && selectedGrade !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Grade: {filterOptions?.grades.find(g => g.value === selectedGrade)?.label}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedGrade("all")}
                  className="h-3 w-3 p-0 ml-1"
                >
                  <X className="h-2 w-2" />
                </Button>
              </Badge>
            )}
            {selectedClass && selectedClass !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Class: {availableClasses.find(c => c._id === selectedClass)?.name}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedClass("all")}
                  className="h-3 w-3 p-0 ml-1"
                >
                  <X className="h-2 w-2" />
                </Button>
              </Badge>
            )}
            {selectedGender && selectedGender !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Gender: {selectedGender.charAt(0).toUpperCase() + selectedGender.slice(1)}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedGender("all")}
                  className="h-3 w-3 p-0 ml-1"
                >
                  <X className="h-2 w-2" />
                </Button>
              </Badge>
            )}
            {searchQuery && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Search: &quot;{searchQuery}&quot;
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="h-3 w-3 p-0 ml-1"
                >
                  <X className="h-2 w-2" />
                </Button>
              </Badge>
            )}
          </div>
        )}

        {/* Apply Search Button (for mobile) */}
        {searchQuery !== currentSearch && (
          <Button onClick={applyFilters} className="w-full md:hidden">
            <Search className="h-4 w-4 mr-2" />
            Apply Search
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
