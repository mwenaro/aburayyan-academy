import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns, IExam } from "./columns";
import { ProductsTable } from "./products-table";


interface ExamsClientProps {
  data: IExam[];
  pageNo: number;
  pageCount: number;
  total: number;
}

export const ExamClient: React.FC<ExamsClientProps> = ({
  data,
  pageNo,
  pageCount,
  total,
}) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Exams (${(data || []).length})`}
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
      <ProductsTable
        searchKey="name"
        columns={columns}
        data={data}
        pageNo={pageNo}
        totalUsers={total}
        pageCount={pageCount}
      />
    </>
  );
};
