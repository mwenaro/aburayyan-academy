export const revalidate = 0;
import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { TeacherClient } from "@/components/tables/teachers-tables/client";
import { getData } from "@/libs/get-data";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Teachers", link: "/dashboard/teachers" },
];
export default async function page() {
  const {data} = await getData('/v1/teacher');

  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <TeacherClient data={data} />
      </div>
    </PageContainer>
  );
}
