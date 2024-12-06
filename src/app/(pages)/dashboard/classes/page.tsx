export const revalidate = 0;
import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { ClassClient } from "@/components/tables/class-tables/client";
import { getData } from "@/libs/get-data";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Classes", link: "/dashboard/classes" },
];
export default async function page() {
  const myData = await getData('/v1/class');

  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <ClassClient data={myData} />
      </div>
    </PageContainer>
  );
}
