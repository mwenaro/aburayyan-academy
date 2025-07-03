import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { TestingAreaDetailsClient } from "@/components/testing-area-details/testing-area-details-client";
import { getData } from "@/libs/get-data";

export default async function TestingAreaPage({ 
  params: { id: examId, testingAreaId } 
}: { 
  params: { id: string; testingAreaId: string } 
}) {
  try {
    const { data: exam } = await getData(`/v3/exam/${examId}`);
    const { data: testingAreas = [] } = await getData(`/v3/exam/${examId}/testing-area`);
    
    const testingArea = testingAreas.find((ta: any) => ta._id === testingAreaId);
    
    if (!testingArea) {
      return (
        <PageContainer scrollable={true}>
          <div className="space-y-4">
            <Breadcrumbs items={[
              { title: "Dashboard", link: "/dashboard" },
              { title: "Exams", link: "/dashboard/exams" },
              { title: exam?.name || "Exam", link: `/dashboard/exams/${examId}` },
            ]} />
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold">Testing area not found</h3>
              <p className="text-muted-foreground">The testing area you're looking for doesn't exist.</p>
            </div>
          </div>
        </PageContainer>
      );
    }

    // Get marks for this testing area
    const { data: marks = [] } = await getData(`/v3/exam/${examId}/testing-area/${testingAreaId}/mark`);
    
    const breadcrumbItems = [
      { title: "Dashboard", link: "/dashboard" },
      { title: "Exams", link: "/dashboard/exams" },
      { title: exam?.name || "Exam", link: `/dashboard/exams/${examId}` },
      { title: testingArea.name, link: `/dashboard/exams/${examId}/testing-area/${testingAreaId}` },
    ];

    return (
      <PageContainer scrollable={true}>
        <div className="space-y-4">
          <Breadcrumbs items={breadcrumbItems} />
          <TestingAreaDetailsClient 
            exam={exam}
            testingArea={testingArea}
            marks={marks}
          />
        </div>
      </PageContainer>
    );
  } catch (error) {
    return (
      <PageContainer scrollable={true}>
        <div className="space-y-4">
          <Breadcrumbs items={[
            { title: "Dashboard", link: "/dashboard" },
            { title: "Exams", link: "/dashboard/exams" },
          ]} />
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold">Error loading testing area</h3>
            <p className="text-muted-foreground">Please try again later.</p>
          </div>
        </div>
      </PageContainer>
    );
  }
}
