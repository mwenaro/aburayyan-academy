import { Breadcrumbs } from "@/components/breadcrumbs";
import { SubjectForm } from "@/components/forms/subject-form";
import PageContainer from "@/components/layout/page-container";


import { Subject } from "@/models/Subject";

// import { ScrollArea } from '@/components/ui/scroll-area';
import React from "react";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Learning Areas", link: "/dashboard/subjects" },
  { title: "Create", link: "/dashboard/subjects/create" },
];
export default async function Page({ params: { id } }: any) {
  const initData = id !== "new" ? await Subject.findById(id) : null;
  

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <SubjectForm initialData={initData} key={null} />
      </div>
    </PageContainer>
  );
}
