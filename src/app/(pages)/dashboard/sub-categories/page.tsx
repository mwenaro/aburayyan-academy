export const revalidate = 0;
import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { SubCategoryClient } from "@/components/tables/sub-category-tables/client";
import { getData } from "@/libs/get-data";

const getSubCategories = async () => {
  return getData("/sub-category");
};

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "SubCategories", link: "/dashboard/sub-categories" },
];
export default async function page() {
  const myData = await getSubCategories();

  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <SubCategoryClient data={myData} />
      </div>
    </PageContainer>
  );
}
