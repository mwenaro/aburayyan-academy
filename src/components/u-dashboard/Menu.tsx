import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/u-dashboard/home.png",
        label: "Home",
        href: "/u-dashboard/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/u-dashboard/teacher.png",
        label: "Teachers",
        href: "/u-dashboard/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/u-dashboard/student.png",
        label: "Students",
        href: "/u-dashboard/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/u-dashboard/parent.png",
        label: "Parents",
        href: "/u-dashboard/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/u-dashboard/subject.png",
        label: "Subjects",
        href: "/u-dashboard/list/subjects",
        visible: ["admin"],
      },
      {
        icon: "/u-dashboard/class.png",
        label: "Classes",
        href: "/u-dashboard/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/u-dashboard/lesson.png",
        label: "Lessons",
        href: "/u-dashboard/list/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/u-dashboard/exam.png",
        label: "Exams",
        href: "/u-dashboard/list/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/u-dashboard/assignment.png",
        label: "Assignments",
        href: "/u-dashboard/list/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/u-dashboard/result.png",
        label: "Results",
        href: "/u-dashboard/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/u-dashboard/attendance.png",
        label: "Attendance",
        href: "/u-dashboard/list/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/u-dashboard/calendar.png",
        label: "Events",
        href: "/u-dashboard/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/u-dashboard/message.png",
        label: "Messages",
        href: "/u-dashboard/list/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/u-dashboard/announcement.png",
        label: "Announcements",
        href: "/u-dashboard/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/u-dashboard/profile.png",
        label: "Profile",
        href: "/u-dashboard/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/u-dashboard/setting.png",
        label: "Settings",
        href: "/u-dashboard/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/u-dashboard/logout.png",
        label: "Logout",
        href: "/u-dashboard/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = () => {
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
