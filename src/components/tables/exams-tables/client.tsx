"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { MyDataTable } from "../MyDataTable";
import { IExam } from "@/models/Exam";

interface ExamsClientProps {
  data: IExam[];
  pageCount: number;
  total: number;
}

export const ExamClient: React.FC<ExamsClientProps> = ({
  data,
  pageCount,
  total,
}) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Exams (${(data || []).length}/${total})`}
          description="Manage Exams (Client side table functionalities.)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/exams/new`)}
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
