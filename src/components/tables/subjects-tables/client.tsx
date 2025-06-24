"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { ISubject } from "@/models/Subject";
import { MyDataTable } from "../MyDataTable";

interface SubjectsClientProps {
  data: ISubject[];
  pageCount: number;
  total: number;
}

export const SubjectClient: React.FC<SubjectsClientProps> = ({
  data,
  pageCount,
  total,
}) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Subjects/Learning Areas (${(data || []).length}/${total})`}
          description="Manage Learning Area(Subject)s (Client side table functionalities.)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/subjects/new`)}
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
    </>
  );
};
