export const revalidate=60
import { dbCon } from "@/libs/mongoose/dbCon";
import { TeacherSubject } from "@/models/TeacherSub";
import React from "react";

interface Subject {
  subjectName: string;
  grade: string;
}

interface Teacher {
  name: string;
  subjects: Subject[];
}

let teachersData: Teacher[] = [
  {
    name: "Mr. Tom Nathan",
    subjects: [
      { subjectName: "Maths", grade: "Grade 4" },
      { subjectName: "Maths", grade: "Grade 5" },
      { subjectName: "Maths", grade: "Grade 6" },
      { subjectName: "Maths", grade: "Grade 7" },
      { subjectName: "Maths", grade: "Grade 8" },
      { subjectName: "Science", grade: "Grade 5" },
    ],
  },
  {
    name: "Md. Maria Mwangangi",
    subjects: [
      { subjectName: "Social", grade: "Grade 5" },
      { subjectName: "Social", grade: "Grade 6" },
      { subjectName: "Social", grade: "Grade 7" },
      { subjectName: "English", grade: "Grade 4" },
      { subjectName: "English", grade: "Grade 6" },
    ],
  },
  // Add other teachers here
];

const TeachersPage: React.FC = async() => {
    await dbCon()
const trs = await TeacherSubject.find() || []
teachersData = (!trs || trs.length<1)?teachersData : trs
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Teachers List</h1>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th  className="flex items-center justify-center p-4">#</th>
                <th className="text-left p-3 border border-gray-200">Name</th>
                <th className="text-left p-3 border border-gray-200">Subjects</th>
              </tr>
            </thead>
            <tbody>
              {teachersData.map((teacher, index) => (
                <tr
                  key={index}
                  className={`border-t ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                    <td className="flex items-center justify-center p-4">{1+index}</td>
                  <td className="p-3 border border-gray-200">{teacher.name}</td>
                  <td className="p-3 border border-gray-200">
                    <ul className="list-disc ml-4">
                      {teacher.subjects.map((subject, idx) => (
                        <li key={idx}>
                          {subject.subjectName} ({subject.grade})
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeachersPage;
