import { Breadcrumbs } from "@/components/breadcrumbs";
import { CategoryForm } from "@/components/forms/category-form";
import PageContainer from "@/components/layout/page-container";
import { Category } from "@/models/Category";
// import { ScrollArea } from '@/components/ui/scroll-area';
import React from "react";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Categories", link: "/dashboard/categories" },
  { title: "Create", link: "/dashboard/categories/create" },
];
export default async function Page({params:{categoryId}}:any) {
  const initData = categoryId !== 'new' ?await Category.findById(categoryId): null
  // console.log({initData})
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <CategoryForm
          categories={[
            { _id: false, name: "InActive" },
            { _id: true, name: "Active" },
          ]}
          initialData={initData}
          key={null}
        />
      </div>
    </PageContainer>
  );
}
