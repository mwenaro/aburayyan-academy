"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { IClass } from "@/models/Class";
import { MyDataTable } from "../MyDataTable";

interface ClassesClientProps {
  data: IClass[];
  pageCount: number;
  total: number;
}

export const ClassClient: React.FC<ClassesClientProps> = ({
  data,
  pageCount,
  total,
}) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Grades (${(data || []).length}/${total})`}
          description="Manage Classs/Grade (Client side table functionalities.)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/classes/new`)}
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
