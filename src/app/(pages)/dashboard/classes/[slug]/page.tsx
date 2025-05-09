import { Breadcrumbs } from "@/components/breadcrumbs";
import { ClassForm } from "@/components/forms/class-form";

import PageContainer from "@/components/layout/page-container";
import { ClassModel } from "@/models/Class";
// import { ScrollArea } from '@/components/ui/scroll-area';
import React from "react";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Grades", link: "/dashboard/classes" },
  { title: "Create", link: "/dashboard/classes/create" },
];
export default async function Page({ params: { slug } }: any) {
  const initData = slug !== "new" ? await ClassModel.findById(slug) : null;

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <ClassForm initialData={initData} key={null} />
      </div>
    </PageContainer>
  );
}
