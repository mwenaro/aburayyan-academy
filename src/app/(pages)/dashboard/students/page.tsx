export const revalidate = 0;
import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { StudentClient } from "@/components/tables/students-tables/client";
import { getData } from "@/libs/get-data";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Students", link: "/dashboard/students" },
];
export default async function page({ searchParams }: any) {
console.log(searchParams)
 const data1 = await getData("/v1/student", searchParams)
// console.log({searchParams, data1})
  const {
    data,
    
  } = data1
  

  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <StudentClient data={data} pageCount={2} total={0} />
       {/*  <StudentClient data={data} pageCount={totalPages} total={total} /> */}
      </div>
    </PageContainer>
  );
}
