export const revalidate = 0;
import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { ReportsClient } from "@/components/reports/reports-client";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Reports", link: "/dashboard/reports" },
];

export default async function ReportsPage() {
  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <ReportsClient />
      </div>
    </PageContainer>
  );
}
