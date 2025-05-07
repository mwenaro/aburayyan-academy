import { Breadcrumbs } from "@/components/breadcrumbs";
import { StudentForm } from "@/components/forms/student-form";
import PageContainer from "@/components/layout/page-container";
import { ClassModel } from "@/models/Class";

import { Student } from "@/models/Student";

// import { ScrollArea } from '@/components/ui/scroll-area';
import React from "react";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Students", link: "/dashboard/students" },
  { title: "Create", link: "/dashboard/students/create" },
];
export default async function Page({ params: { categoryId } }: any) {
  const initData =
    categoryId !== "new" ? await Student.findById(categoryId) : null;
  const classes = (await ClassModel.find({})).map((cls) => ({
    id: cls._id,
    name: cls.name,
  }));

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <StudentForm
          classes={classes || []}
          initialData={initData}
          key={null}
        />
      </div>
    </PageContainer>
  );
}
