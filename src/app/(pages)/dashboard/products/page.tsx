export const revalidate = 0;
import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { ProductClient } from "@/components/tables/products-tables/client";
import { getData } from "@/libs/get-data";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Products", link: "/dashboard/products" },
];
export default async function page() {
  const myData = await getData('/product');

  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <ProductClient data={myData} />
      </div>
    </PageContainer>
  );
}
