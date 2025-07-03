import { Breadcrumbs } from "@/components/breadcrumbs";
import { ExamForm } from "@/components/forms/exam-form";
import PageContainer from "@/components/layout/page-container";
import { getData } from "@/libs/get-data";

export default async function EditExamPage({ params: { id } }: any) {
  try {
    const { data: exam } = await getData(`/v3/exam/${id}`);
    
    const breadcrumbItems = [
      { title: "Dashboard", link: "/dashboard" },
      { title: "Exams", link: "/dashboard/exams" },
      { title: exam?.name || "Exam", link: `/dashboard/exams/${id}` },
      { title: "Edit", link: `/dashboard/exams/${id}/edit` },
    ];

    return (
      <PageContainer scrollable={true}>
        <div className="space-y-4">
          <Breadcrumbs items={breadcrumbItems} />
          <ExamForm initialData={exam} key={id} />
        </div>
      </PageContainer>
    );
  } catch (error) {
    const breadcrumbItems = [
      { title: "Dashboard", link: "/dashboard" },
      { title: "Exams", link: "/dashboard/exams" },
    ];
    
    return (
      <PageContainer scrollable={true}>
        <div className="space-y-4">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold">Exam not found</h3>
            <p className="text-muted-foreground">The exam you're trying to edit doesn't exist.</p>
          </div>
        </div>
      </PageContainer>
    );
  }
}
