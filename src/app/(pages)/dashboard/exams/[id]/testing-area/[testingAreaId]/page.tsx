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
    const examResponse = await getData(`/v3/exam/${examId}`);
    const exam = examResponse?.data || examResponse;
    
    console.log("Testing area page debug:", { examId, testingAreaId, exam, testingAreas: exam?.testingAreas });
    
    // Get testing area from exam's testingAreas array
    const testingArea = exam?.testingAreas?.find((ta: any) => ta._id?.toString() === testingAreaId);
    
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
              <p className="text-muted-foreground">The testing area you&apos;re looking for doesn&apos;t exist.</p>
            </div>
          </div>
        </PageContainer>
      );
    }

    // Get marks for this testing area
    let marks = [];
    try {
      const marksResponse = await getData(`/v3/exam/${examId}/testing-area/${testingAreaId}/mark`);
      marks = marksResponse?.data || marksResponse || [];
    } catch (error) {
      // If marks API fails, try to get from testingArea.marks
      marks = testingArea?.marks || [];
    }
    
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
    console.error("Error loading testing area:", error);
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
            <div className="mt-4 text-sm text-gray-500">
              <p>Exam ID: {examId}</p>
              <p>Testing Area ID: {testingAreaId}</p>
              <p>Error: {error instanceof Error ? error.message : 'Unknown error'}</p>
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }
}
