"use client";
// import { AreaGraph } from "@/components/charts/area-graph";
// import { BarGraph } from "@/components/charts/bar-graph";
// import { PieGraph } from "@/components/charts/pie-graph";
// import { CalendarDateRangePicker } from '@/components/date-range-picker';
import PageContainer from "@/components/layout/page-container";
// import { RecentSales } from "@/components/recent-sales";
import { DashboardItemCard } from "@/components/u-dashboard/DashboardItemCard";
// import { Button } from '@/components/ui/button';
import { FaBuildingColumns } from "react-icons/fa6";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";
import { useDashboardStore } from "@/lib/stores/dashboardStore";
import { MdLibraryBooks } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { GraduationCap } from "lucide-react";
import Link from "next/link";

export default function DashboardHomePage() {
  const { stats, fetchDashboardStats, loading, error } = useDashboardStore();

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          {/* <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2> */}
          {/* <div className="hidden items-center space-x-2 md:flex">
            <CalendarDateRangePicker />
            <Button>Download</Button>
          </div> */}
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analytics
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            {loading ? (
              <div>Loading dashboard stats...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* students */}
                <Link href="/dashboard/students">
                  <DashboardItemCard
                    title="No. of Students"
                    value={stats?.totalStudents ?? 0}
                    icon={<GraduationCap />}
                    dev=""
                  />
                </Link>
                {/* classes */}
                <Link href="/dashboard/classes">
                  <DashboardItemCard
                    title="No. of Grades"
                    value={stats?.totalClasses ?? 0}
                    icon={<FaBuildingColumns />}
                    dev=""
                  />
                </Link>
                <Link href="/dashboard/teachers">
                  <DashboardItemCard
                    title="No. of Teachers"
                    value={stats?.totalTeachers ?? 0}
                    icon={<GiTeacher />}
                    dev=""
                  />
                </Link>
                <Link href="/dashboard/subjects">
                  <DashboardItemCard
                    title="No. of Learning Areas"
                    value={stats?.totalSubjects ?? 0}
                    icon={<MdLibraryBooks />}
                    dev=""
                  />
                </Link>
                <Link href="/dashboard/exams">
                  <DashboardItemCard
                    title="Exams"
                    value={stats?.totalExams ?? 0}
                    icon={<MdLibraryBooks />}
                    dev=""
                  />
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
