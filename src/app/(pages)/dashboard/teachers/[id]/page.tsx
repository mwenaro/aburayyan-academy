import { Breadcrumbs } from "@/components/breadcrumbs";
import { TeacherForm } from "@/components/forms/teacher-form";
import PageContainer from "@/components/layout/page-container";

import { User } from "@/models/User";

// import { ScrollArea } from '@/components/ui/scroll-area';
import React from "react";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Teachers", link: "/dashboard/teachers" },
  { title: "Create", link: "/dashboard/teachers/create" },
];
export default async function Page({ params: { id } }: any) {
  const initData =
    id !== "new" ? await User.findById(id) : null;
  

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <TeacherForm
         
          
          initialData={initData}
          key={null}
        />
      </div>
    </PageContainer>
  );
}
