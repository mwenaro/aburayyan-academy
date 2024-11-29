export const revalidate = 0;
import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { InviteClient } from "@/components/tables/invite-tables/client";

import { getData } from "@/libs/get-data";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "invite", link: "/dashboard/invite" },
];
export default async function page() {
  const myData = await getData('/reg/invite');

  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <InviteClient data={myData} />
      </div>
    </PageContainer>
  );
}
