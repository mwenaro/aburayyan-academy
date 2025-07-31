"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { columns } from "./columns";
import { IStudent } from "@/models/Student";
import { MyDataTable } from "../MyDataTable";
import { StudentFilters } from "./filters";

interface StudentsClientProps {
  data: IStudent[];
  pageCount: number;
  total: number;
}

export const StudentClient: React.FC<StudentsClientProps> = ({
  data,
  pageCount,
  total,
}) => {
  const router = useRouter();
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  const handleFiltersChange = (filters: Record<string, string>) => {
    setActiveFilters(filters);
  };

  const getFilteredCount = () => {
    const hasFilters = Object.keys(activeFilters).length > 0;
    if (hasFilters) {
      return `${(data || []).length} filtered`;
    }
    return `${(data || []).length}`;
  };

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Students (${getFilteredCount()}/${total})`}
          description="Manage Students with advanced filtering capabilities."
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/students/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />

      {/* Enhanced Filters */}
      <StudentFilters 
        onFiltersChange={handleFiltersChange}
        className="mb-6"
      />

              <MyDataTable
          searchKey="regno"
          pageCount={pageCount}
          columns={columns}
          data={data}
          hideSearch={true} // Hide search since we have comprehensive filters
        />
    </>
  );
};
