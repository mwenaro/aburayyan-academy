export const revalidate = 0;
import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { ExamClient } from "@/components/tables/exams-tables/client";
import { getData } from "@/libs/get-data";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Exams", link: "/dashboard/exams" },
];

export default async function page({searchParams}:any) {
  const {data=[], meta:{total,  totalPages}} = await getData('/v1/exam',searchParams);

  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <ExamClient data={data} pageCount={totalPages} total={total}  />
      </div>
    </PageContainer>
  );
}
