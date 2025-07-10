import { Breadcrumbs } from "@/components/breadcrumbs";
import { ExamForm } from "@/components/forms/exam-form";
import PageContainer from "@/components/layout/page-container";
import { ExamDetailsClient } from "@/components/exam-details/exam-details-client";
import { getData } from "@/libs/get-data";

export default async function Page({ params: { id } }: any) {
  // If 'new', show the form to create exam
  if (id === "new") {
    const breadcrumbItems = [
      { title: "Dashboard", link: "/dashboard" },
      { title: "Exams", link: "/dashboard/exams" },
      { title: "Create", link: "/dashboard/exams/new" },
    ];
    
    return (
      <PageContainer scrollable={true}>
        <div className="space-y-4">
          <Breadcrumbs items={breadcrumbItems} />
          <ExamForm initialData={null} key={null} />
        </div>
      </PageContainer>
    );
  }

  // If existing exam ID, show exam details with testing areas
  try {
    const examResponse = await getData(`/v3/exam/${id}`);
    // const testingAreasResponse = await getData(`/v3/exam/${id}/testing-area`);
    
    const exam = examResponse?.data || examResponse;
    // const testingAreas = testingAreasResponse?.data || testingAreasResponse || exam?.testingAreas  || [];
    const testingAreas = exam?.testingAreas|| [];  

    console.log({exam, examResponse, testingAreas});
    // if (!exam) {
    //   throw new Error("Exam not found");
    // }
    
    const breadcrumbItems = [
      { title: "Dashboard", link: "/dashboard" },
      { title: "Exams", link: "/dashboard/exams" },
      { title: exam?.name || "Exam Details", link: `/dashboard/exams/${id}` },
    ];

    return (
      <PageContainer scrollable={true}>
        <div className="space-y-4">
          <Breadcrumbs items={breadcrumbItems} />
          <ExamDetailsClient exam={exam} testingAreas={testingAreas} />
        </div>
      </PageContainer>
    );
  } catch (error) {
    // If exam not found, redirect to exams list
    return (
      <PageContainer scrollable={true}>
        <div className="space-y-4">
          <Breadcrumbs items={[
            { title: "Dashboard", link: "/dashboard" },
            { title: "Exams", link: "/dashboard/exams" },
          ]} />
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold">Exam not found</h3>
            <p className="text-muted-foreground">The exam you&apos;re looking for doesn&apos;t exist.</p>
          </div>
        </div>
      </PageContainer>
    );
  }
}
