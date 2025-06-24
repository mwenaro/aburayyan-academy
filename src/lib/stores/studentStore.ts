import { create } from "zustand";
import { persist } from "zustand/middleware";
import { devtools } from "zustand/middleware";
import { HttpService } from "../HttpService";
import { ResponseData } from "@/contollers/fetchService";

// Initialize HttpService
const httpService = new HttpService("/api/v1/student");
// const httpService = new HttpService("https://aburayyanacademy.com/api/v1/student");

// Define the Student Type
interface Student {
  _id: string;
  name: string;
  age: number;
  classId: string;
  marks?: number[];
}


// Zustand Store Interface
interface StudentState {
  students: Student[];
  total:number;
  loading: boolean;
  error: string | null;

  fetchStudents: () => Promise<void>;
  addStudent: (student: Student) => Promise<void>;
  updateStudent: (id: string, updatedData: Partial<Student>) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;
  reset: () => void;
  setStudents: (students: Student[]) => void;
}

// Create the Zustand Store
export const useStudentStore = create<StudentState>()(
  devtools(
    persist(
      (set, get) => ({
        students: [],
        loading: false,
        total:0,
        error: null,

        // Fetch students from API
        fetchStudents: async () => {
          set({ loading: true, error: null });
          try {
            const { data, meta:{total} } = await httpService.get<ResponseData>("");
            set({ students: data, loading: false , total});
          } catch (err: any) {
            set({
              error: err.message || "Failed to fetch students",
              loading: false,
            });
          }
        },

        // Add new student
        addStudent: async (student) => {
          try {
            const newStudent = await httpService.post<Student>("", student);
            set((state) => ({ students: [...state.students, newStudent] }));
          } catch (err: any) {
            set({ error: err.message || "Failed to add student" });
          }
        },

        // Update existing student
        updateStudent: async (id, updatedData) => {
          try {
            await httpService.put<Student>(id, updatedData);
            set((state) => ({
              students: state.students.map((s) =>
                s._id === id ? { ...s, ...updatedData } : s
              ),
            }));
          } catch (err: any) {
            set({ error: err.message || "Failed to update student" });
          }
        },

        // Delete student
        deleteStudent: async (id) => {
          try {
            await httpService.delete(id);
            set((state) => ({
              students: state.students.filter((s) => s._id !== id),
            }));
          } catch (err: any) {
            set({ error: err.message || "Failed to delete student" });
          }
        },

        // Reset store
        reset: () => set({ students: [], loading: false, error: null }),
        // Set students directly
        setStudents: (students) => set({ students }),
      }),
      { name: "student-store" }
    )
  )
);
