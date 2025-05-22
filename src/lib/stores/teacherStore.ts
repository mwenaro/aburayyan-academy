import { create } from "zustand";
import { persist } from "zustand/middleware";
import { devtools } from "zustand/middleware";
import { HttpService } from "../HttpService";
import { ResponseData } from "@/contollers/fetchService";

// Initialize HttpService
const httpService = new HttpService("/api/v1/teacher");
// const httpService = new HttpService("https://aburayyanacademy.com/api/v1/Teacher");

// Define the Teacher Type
interface Teacher {
  _id: string;
  name: string;
  age: number;
  classId: string;
  subjects?: number[];
}

// Zustand Store Interface
interface TeacherState {
  teachers: Teacher[];
  loading: boolean;
  total: number;
  error: string | null;

  fetchTeachers: () => Promise<void>;
  addTeacher: (teacher: Teacher) => Promise<void>;
  updateTeacher: (id: string, updatedData: Partial<Teacher>) => Promise<void>;
  deleteTeacher: (id: string) => Promise<void>;
  reset: () => void;
}

// Create the Zustand Store
export const useTeacherStore = create<TeacherState>()(
  devtools(
    persist(
      (set, get) => ({
        teachers: [],
        total: 0,
        loading: false,
        error: null,

        // Fetch Teachers from API
        fetchTeachers: async () => {
          set({ loading: true, error: null });
          try {
            const {
              data,
              meta: { total },
            } = await httpService.get<ResponseData>("");
            set({ teachers: data, loading: false, total });
          } catch (err: any) {
            set({
              error: err.message || "Failed to fetch Teachers",
              loading: false,
            });
          }
        },

        // Add new Teacher
        addTeacher: async (Teacher) => {
          try {
            const newTeacher = await httpService.post<Teacher>("", Teacher);
            set((state) => ({ teachers: [...state.teachers, newTeacher] }));
          } catch (err: any) {
            set({ error: err.message || "Failed to add Teacher" });
          }
        },

        // Update existing Teacher
        updateTeacher: async (id, updatedData) => {
          try {
            await httpService.put<Teacher>(id, updatedData);
            set((state) => ({
              teachers: state.teachers.map((s) =>
                s._id === id ? { ...s, ...updatedData } : s
              ),
            }));
          } catch (err: any) {
            set({ error: err.message || "Failed to update Teacher" });
          }
        },

        // Delete Teacher
        deleteTeacher: async (id) => {
          try {
            await httpService.delete(id);
            set((state) => ({
              teachers: state.teachers.filter((s) => s._id !== id),
            }));
          } catch (err: any) {
            set({ error: err.message || "Failed to delete Teacher" });
          }
        },

        // Reset store
        reset: () => set({ teachers: [], loading: false, error: null }),
      }),
      { name: "teacher-store" }
    )
  )
);
