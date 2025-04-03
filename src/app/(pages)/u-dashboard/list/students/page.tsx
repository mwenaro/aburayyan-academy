"use client";

import { useEffect, useState } from "react";
import FormModal from "@/components/u-dashboard/FormModal";
import Pagination from "@/components/u-dashboard/Pagination";
import Table from "@/components/u-dashboard/Table";
import TableSearch from "@/components/u-dashboard/TableSearch";
import Image from "next/image";
import Link from "next/link";
import { useStudentStore } from "@/lib/stores/studentStore";
import { Button } from "@/components/ui/button";
import { IStudent } from "@/models/Student";
import { IClass } from "@/models/Class";
import { strCapitalize } from "@/libs/str_functions";

const columns = [
  { header: "Info", accessor: "info" },
  {
    header: "Student ID",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },
  { header: "Gender", accessor: "gen", className: "hidden md:table-cell" },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
  { header: "Address", accessor: "address", className: "hidden lg:table-cell" },
  { header: "Actions", accessor: "action" },
];

const StudentListPage = () => {
  const { students, fetchStudents } = useStudentStore();

  useEffect(() => {
    fetchStudents();
  }, []);

  const renderRow = (student: IStudent) => (
    <tr
      key={student._id as string}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
    
      <td className="flex items-center gap-4 p-4">
        <Image
          src={student?.photo || `/school/avatars/${student.gen.toLocaleLowerCase().trim()}-student-avatar.png`}
          alt="Student Photo"
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{strCapitalize(student.name)}</h3>
          <p className="text-xs text-gray-500">{(student.class as unknown as IClass).name}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{student._id as string}</td>
      <td className="hidden md:table-cell">{strCapitalize(student.gen) || ''}</td>
      <td className="hidden md:table-cell">{student.contactDetails.phone}</td>
      <td className="hidden md:table-cell">
        {student.address.town}, {student.address.county}
      </td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/students/${student._id}`}>
            <Button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="View" width={16} height={16} />
            </Button>
          </Link>
          <FormModal table="student" type="delete" id={student._id as string} />
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <Button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image
                src="/u-dashboard/filter.png"
                alt="Filter"
                width={14}
                height={14}
              />
            </Button>
            <Button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image
                src="/u-dashboard/sort.png"
                alt="Sort"
                width={14}
                height={14}
              />
            </Button>
            <FormModal table="student" type="create" />
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={students} />
      <Pagination />
    </div>
  );
};

export default StudentListPage;
