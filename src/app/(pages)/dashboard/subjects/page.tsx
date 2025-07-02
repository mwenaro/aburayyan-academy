export const revalidate = 0;
import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { SubjectClient } from "@/components/tables/subjects-tables/client";
import { getData } from "@/libs/get-data";


const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Learning Areas", link: "/dashboard/subjects" },
];
export default async function page({ searchParams }: any) {
 const {
    data,
    meta: { total, totalPages }} = await getData('/v1/subject', searchParams);
  // console.log({myData})

  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <SubjectClient data={data} pageCount={totalPages} total={total} />
      </div>
    </PageContainer>
  );
}
