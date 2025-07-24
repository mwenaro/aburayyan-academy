import { Breadcrumbs } from "@/components/breadcrumbs";
import { StudentForm } from "@/components/forms/student-form";
import PageContainer from "@/components/layout/page-container";
import { strCapitalize } from "@/libs/str_functions";
import { ClassModel } from "@/models/Class";
import { Student } from "@/models/Student";
import { dbCon } from "@/libs/mongoose/dbCon";
import { notFound } from "next/navigation";

import React from "react";

export default async function EditStudentPage({ params: { id } }: any) {
  await dbCon();
  
  // Fetch the student data for editing
  const initData = await Student.findById(id);
  
  // If student not found, show 404
  if (!initData) {
    notFound();
  }
  
  // Get all classes for the form select
  const classes: { id: string; name: string }[] = (await ClassModel.find({})).map((cls) => ({
    id: cls._id,
    name: strCapitalize(cls.name),
  }));

  const breadcrumbItems = [
    { title: "Dashboard", link: "/dashboard" },
    { title: "Students", link: "/dashboard/students" },
    { title: initData.name, link: `/dashboard/students/${id}/profile` },
    { title: "Edit", link: `/dashboard/students/${id}/edit` },
  ];

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <StudentForm
          classes={classes}
          initialData={initData}
          key={null}
        />
      </div>
    </PageContainer>
  );
}
