"use client";
import { AreaGraph } from "@/components/charts/area-graph";
import { BarGraph } from "@/components/charts/bar-graph";
import { PieGraph } from "@/components/charts/pie-graph";
// import { CalendarDateRangePicker } from '@/components/date-range-picker';
import PageContainer from "@/components/layout/page-container";
import { RecentSales } from "@/components/recent-sales";
import { DashboardItemCard } from "@/components/u-dashboard/DashboardItemCard";
// import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useClassStore } from "@/lib/stores/classStore";
import { useStudentStore } from "@/lib/stores/studentStore";
import { useTeacherStore } from "@/lib/stores/teacherStore";
import { PersonIcon } from "@radix-ui/react-icons";
import { GraduationCap, GraduationCapIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function DashboardHomePage() {
  const { fetchStudents, students } = useStudentStore();
  const { teachers, fetchTeachers } = useTeacherStore();
  const { classes, fetchClasses } = useClassStore();

  useEffect(() => {
    fetchStudents();
    fetchTeachers();
    fetchClasses();
  }, [fetchClasses, fetchStudents, fetchTeachers]);
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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* students */}
              <Link href="/dashboard/students">
                <DashboardItemCard
                  title="No. Students"
                  value={students.length}
                  icon={<GraduationCap />}
                />
              </Link>
              {/* classes */}
              <Link href="/dashboard/classes">
                <DashboardItemCard
                  title="No. Classes"
                  value={classes.length}
                  icon={<GraduationCapIcon />}
                />
              </Link>
              <Link href="/dashboard/teachers">
                <DashboardItemCard
                  title="No. Teachers"
                  value={teachers.length}
                  icon={
                    <span>
                      <PersonIcon /> <PersonIcon />
                    </span>
                  }
                />
              </Link>
              <Link href="/dashboard/subjects">
                <DashboardItemCard
                  title="No. Subjects"
                  value={0}
                  icon={<GraduationCap />}
                />
              </Link>
            </div>
            {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-4">
                <BarGraph />
              </div>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>
                    You made 265 sales this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
              <div className="col-span-4">
                <AreaGraph />
              </div>
              <div className="col-span-4 md:col-span-3">
                <PieGraph />
              </div>
            </div> */}
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
