"use client";
import Announcements from "@/components/u-dashboard/Announcements";
import AttendanceChart from "@/components/u-dashboard/AttendanceChart";
import CountChart from "@/components/u-dashboard/CountChart";
import { DashboardItemCard } from "@/components/u-dashboard/DashboardItemCard";
import EventCalendar from "@/components/u-dashboard/EventCalendar";
import FinanceChart from "@/components/u-dashboard/FinanceChart";
import UserCard from "@/components/u-dashboard/UserCard";
import { useStudentStore } from "@/lib/stores/studentStore";
import { GraduationCap, User } from "lucide-react";
import { useEffect } from "react";

const AdminPage = () => {
  const { fetchStudents, students } = useStudentStore();

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="student" num={students.length} />
          <UserCard type="teacher" num={10} />
          <UserCard type="parent" num={10} />
          <UserCard type="staff" num={10} />
          <DashboardItemCard title="No. Students" value={students.length} icon={<GraduationCap />} />
        </div>
        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* COUNT CHART */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>
          {/* ATTENDANCE CHART */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChart />
          </div>
        </div>
        {/* BOTTOM CHART */}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default AdminPage;
