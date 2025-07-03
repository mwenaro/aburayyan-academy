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
  try {
    // Try v3 API first, fallback to v1 if not available
    const { data = [], meta = { total: 0, totalPages: 1 } } = await getData('/v3/exam', searchParams);

    return (
      <PageContainer>
        <div className="space-y-2">
          <Breadcrumbs items={breadcrumbItems} />
          <ExamClient data={data} pageCount={meta.totalPages} total={meta.total} />
        </div>
      </PageContainer>
    );
  } catch (error) {
    // Fallback to v1 API
    const { data = [], meta: { total = 0, totalPages = 1 } = {} } = await getData('/v1/exam', searchParams);

    return (
      <PageContainer>
        <div className="space-y-2">
          <Breadcrumbs items={breadcrumbItems} />
          <ExamClient data={data} pageCount={totalPages} total={total} />
        </div>
      </PageContainer>
    );
  }
}
