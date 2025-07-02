import { Breadcrumbs } from "@/components/breadcrumbs";
import { SubCategoryForm } from "@/components/forms/sub-category-form";
import PageContainer from "@/components/layout/page-container";
import { Category } from "@/models/Category";
import { SubCategory } from "@/models/SubCategory";
// import { ScrollArea } from '@/components/ui/scroll-area';
import React from "react";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "SubCategories", link: "/dashboard/sub-categories" },
  { title: "Create", link: "/dashboard/sub-categories/create" },
];
export default async function Page({params:{categoryId}}:any) {
  const initData = categoryId !== 'new' ? await SubCategory.findById(categoryId): null
  const categories = await Category.find().select(["_id", 'name'])
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <SubCategoryForm 
          statusOptions={[
            { _id: false, name: "InActive" },
            { _id: true, name: "Active" },
          ]}
          categories={categories}
          initialData={initData}
          key={null}
        />
      </div>
    </PageContainer>
  );
}
