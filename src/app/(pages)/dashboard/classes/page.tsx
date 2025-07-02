export const revalidate = 0;
import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { ClassClient } from "@/components/tables/class-tables/client";
import { getData } from "@/libs/get-data";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Grades", link: "/dashboard/classes" },
];
export default async function page({ searchParams }: any) {
  const {
    data,
    meta: { total, totalPages },
  } = await getData("/v1/class",searchParams);

  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <ClassClient data={data} pageCount={totalPages} total={total} />
      </div>
    </PageContainer>
  );
}
