export const revalidate = 0;
import PageContainer from "@/components/layout/page-container";
import ClassReportClient from "@/components/reports/class-report-client";
import { Breadcrumbs } from "@/components/breadcrumbs";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Reports", link: "/dashboard/reports" },
  { title: "Class Report", link: "/dashboard/reports/class-report" },
];

export default function ClassReportPage() {
  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <ClassReportClient />
      </div>
    </PageContainer>
  );
}
