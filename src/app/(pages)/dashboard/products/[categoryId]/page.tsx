import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductsForm } from "@/components/forms/products-form";
import PageContainer from "@/components/layout/page-container";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { SubCategory } from "@/models/SubCategory";
// import { ScrollArea } from '@/components/ui/scroll-area';
import React from "react";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Products", link: "/dashboard/products" },
  { title: "Create", link: "/dashboard/products/create" },
];
export default async function Page({ params: { categoryId } }: any) {
  const initData =
    categoryId !== "new" ? await Product.findById(categoryId) : null;
  const [subCategories, categories] = await Promise.all([
    SubCategory.find().select(["_id", "name", "category"]),
    Category.find().select(["_id", "name"]),
  ]);

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <ProductsForm
          statusOptions={[
            { _id: false, name: "InActive" },
            { _id: true, name: "Active" },
          ]}
          categories={categories}
          subCategories={subCategories}
          initialData={initData}
          key={null}
        />
      </div>
    </PageContainer>
  );
}
