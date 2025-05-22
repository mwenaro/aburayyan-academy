"use client";
import { Button } from "@/components/ui/button";
// import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { IStudent } from "@/models/Student";

import { MyDataTable } from "../MyDataTable";

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

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Students (${(data || []).length}/${total})`}
          description="Manage Students (Client side table functionalities.)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/students/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />

      <MyDataTable
        searchKey="name"
        columns={columns}
        data={data}
        pageCount={pageCount}
      />
      {/* <DataTable
        searchKey="name"
        columns={columns}
        data={data}
        pageNo={pageNo}
        pageCount={pageCount}
      /> */}
    </>
  );
};
