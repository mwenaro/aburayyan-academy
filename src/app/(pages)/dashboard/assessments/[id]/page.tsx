import { Breadcrumbs } from "@/components/breadcrumbs";
import { ExamForm } from "@/components/forms/exam-form";
import PageContainer from "@/components/layout/page-container";
import { Exam } from "@/models/Exam";
// import { ScrollArea } from '@/components/ui/scroll-area';
import React from "react";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Assessments", link: "/dashboard/exams" },
  { title: "Create", link: "/dashboard/exams/create" },
];
export default async function Page({ params: { id } }: any) {
  const initData = id !== "new" ? await Exam.findById(id) : null;
  
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <ExamForm initialData={initData} key={null} />
      </div>
    </PageContainer>
  );
}
