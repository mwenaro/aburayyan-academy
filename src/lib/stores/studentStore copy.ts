import { create } from "zustand";
import { persist } from "zustand/middleware";
import { devtools } from "zustand/middleware";

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
  loading: boolean;
  error: string | null;

  fetchStudents: () => Promise<void>;
  addStudent: (student: Student) => Promise<void>;
  updateStudent: (id: string, updatedData: Partial<Student>) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;
  reset: () => void;
}

// Create the Zustand Store
export const useStudentStore = create<StudentState>()(
  devtools(
    persist(
      (set, get) => ({
        students: [],
        loading: false,
        error: null,

        // Fetch students from API
        fetchStudents: async () => {
          set({ loading: true, error: null });
          try {
            const res = await fetch("/api/students");
            const data: Student[] = await res.json();
            set({ students: data, loading: false });
          } catch (err) {
            set({ error: "Failed to fetch students", loading: false });
          }
        },

        // Add new student
        addStudent: async (student) => {
          try {
            const res = await fetch("/api/students", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(student),
            });
            const newStudent = await res.json();
            set((state) => ({ students: [...state.students, newStudent] }));
          } catch (err) {
            set({ error: "Failed to add student" });
          }
        },

        // Update existing student
        updateStudent: async (id, updatedData) => {
          try {
            const res = await fetch(`/api/students/${id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updatedData),
            });
            const updatedStudent = await res.json();
            set((state) => ({
              students: state.students.map((s) =>
                s._id === id ? { ...s, ...updatedData } : s
              ),
            }));
          } catch (err) {
            set({ error: "Failed to update student" });
          }
        },

        // Delete student
        deleteStudent: async (id) => {
          try {
            await fetch(`/api/students/${id}`, { method: "DELETE" });
            set((state) => ({
              students: state.students.filter((s) => s._id !== id),
            }));
          } catch (err) {
            set({ error: "Failed to delete student" });
          }
        },

        // Reset store
        reset: () => set({ students: [], loading: false, error: null }),
      }),
      { name: "student-store" }
    )
  )
);
