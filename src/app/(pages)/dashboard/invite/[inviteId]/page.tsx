import { Breadcrumbs } from "@/components/breadcrumbs";
import { RegistrationInviteForm } from "@/components/forms/registration-invite-form";

import PageContainer from "@/components/layout/page-container";

import { RegistrationInvitation } from "@/models/RegistrationInvite";



import React from "react";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Invitation", link: "/dashboard/invite" },
  { title: "Create", link: "/dashboard/invite/create" },
];
export default async function Page({ params: { inviteId } }: any) {
  const initData =
    inviteId !== "new" ? await RegistrationInvitation.findById(inviteId) : null;

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <RegistrationInviteForm initialData={initData} key={null} />
      </div>
    </PageContainer>
  );
}
