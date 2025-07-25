import { Breadcrumbs } from "@/components/breadcrumbs";
import { StudentForm } from "@/components/forms/student-form";
import PageContainer from "@/components/layout/page-container";
import { strCapitalize } from "@/libs/str_functions";
import { ClassModel } from "@/models/Class";
import { Student } from "@/models/Student";
import { dbCon } from "@/libs/mongoose/dbCon";

// import { ScrollArea } from '@/components/ui/scroll-area';
import React from "react";

export default async function Page({ params: { id } }: any) {
  await dbCon();
  const initData =
    id !== "new" ? await Student.findById(id) : null;
  
  // Dynamic breadcrumbs based on whether we're creating or editing
  const breadcrumbItems = [
    { title: "Dashboard", link: "/dashboard" },
    { title: "Students", link: "/dashboard/students" },
    { 
      title: id === "new" ? "Create" : `Edit ${initData?.name || 'Student'}`, 
      link: id === "new" ? "/dashboard/students/new" : `/dashboard/students/${id}` 
    },
  ];
  
  // Get all classes for the form select
  let classes: { id: string; name: string }[] = [];
  
  classes = (await ClassModel.find({})).map((cls) => ({
    id: cls._id,
    name: strCapitalize(cls.name),
  }));
  
  return (
    <PageContainer scrollable={true}>
       <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <StudentForm
          classes={classes||[]}
          initialData={initData}
          key={null}
        />
      </div> 
     
    </PageContainer>
  );
}
