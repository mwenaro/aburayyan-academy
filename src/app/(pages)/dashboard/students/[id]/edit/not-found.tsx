import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Students", link: "/dashboard/students" },
  { title: "Edit", link: "#" },
];

export default function StudentEditNotFound() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <Breadcrumbs items={breadcrumbItems} />
        
        <div className="flex flex-col items-center justify-center py-20">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Student Not Found</h1>
          <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
            The student you&apos;re trying to edit could not be found. They may have been deleted or the ID is invalid.
          </p>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/dashboard/students">
                Back to Students
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard/students/new">
                Add New Student
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
