export const revalidate = 0;
import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { StudentClient } from "@/components/tables/students-tables/client";
import { getData } from "@/libs/get-data";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Students", link: "/dashboard/students" },
];
export default async function page() {
  const myData = await getData('/v1/student');
  // console.log({myData})

  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <StudentClient data={myData} />
      </div>
    </PageContainer>
  );
}
