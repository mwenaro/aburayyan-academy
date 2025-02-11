"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ICourseRegistration } from "@/models/CourseRegistration";
const BASE_URL = "/api/v1/ict/courses/march-25";

export default function Dashboard() {
  const [registrations, setRegistrations] = useState<ICourseRegistration[]>([]);

  const fetchRegistrations = async () => {
    const response = await axios.get(BASE_URL);
    setRegistrations(response.data);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this student?")) return;
    await axios.put(`${BASE_URL}/${id}`, { isDeleted: true });
    // await axios.delete(`${BASE_URL}/${id}`);
    setRegistrations((prev) => prev.filter((reg) => reg._id !== id));
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Student Registrations({registrations.length})
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="p-2 border-b">Student Details</th>

              <th className="p-2 border-b hidden md:table-cell">Residence</th>
              <th className="p-2 border-b hidden md:table-cell">DOB</th>
              <th className="p-2 border-b">Gender</th>
              {/* <th className="p-2 border-b">Session Time</th> */}
              <th className="p-2 border-b  hidden lg:table-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg._id as string} className="border-b">
                <td className="p-2">
                  <span className="block">{reg.fullName}</span>
                  <span className="text-sm text-gray-500 hidden sm:inline">{`(${reg.phone})`}</span>
                </td>

                <td className="p-2 hidden md:table-cell">
                  <span className="block">{reg.residence}</span>
                  {/* <span className="text-sm text-gray-500 hidden sm:inline">{`(${reg.email})`}</span> */}
                </td>
                <td className="p-2 hidden md:table-cell">
                  {new Date(reg.dob).toLocaleDateString()}
                </td>
                <td className="p-2">{reg.gender}</td>
                {/* <td className="p-2">{reg.session}</td> */}
                <td className="p-2 hidden lg:table-cell">
                  <button
                  disabled
                    className="bg-red-500 text-white px-3 py-1 mr-2 rounded"
                    onClick={() => handleDelete(reg._id as string)}
                  >
                    Delete
                  </button>
                  {/* <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    // Attach edit functionality as needed
                  >
                    Edit
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
