import { Breadcrumbs } from "@/components/breadcrumbs";
import { StudentForm } from "@/components/forms/student-form";
import PageContainer from "@/components/layout/page-container";
import { strCapitalize } from "@/libs/str_functions";
import { ClassModel } from "@/models/Class";
import { Student } from "@/models/Student";
import { dbCon } from "@/libs/mongoose/dbCon";

// import { ScrollArea } from '@/components/ui/scroll-area';
import React from "react";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Students", link: "/dashboard/students" },
  { title: "Create", link: "/dashboard/students/create" },
];
export default async function Page({ params: { id } }: any) {
  await dbCon();
  const initData =
    id !== "new" ? await Student.findById(id) : null;
  
  // Temporarily simplified - just pass empty array to test
 let classes: { id: string; name: string }[] = [];
  
  // Uncomment this once we fix the main issue:
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
