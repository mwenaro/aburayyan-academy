import { create } from "zustand";
import { persist } from "zustand/middleware";
import { devtools } from "zustand/middleware";
import { HttpService } from "../HttpService";

// Initialize HttpService
const httpService = new HttpService("/api/v1/Subject");
// const httpService = new HttpService("https://aburayyanacademy.com/api/v1/Subject");

// Define the Subject Type
interface Subject {
  _id: string;
  name: string;
  age: number;
  classId: string;
  marks?: number[];
}

// Zustand Store Interface
interface SubjectState {
  subjects: Subject[];
  loading: boolean;
  error: string | null;

  fetchSubjects: () => Promise<void>;
  addSubject: (subject: Subject) => Promise<void>;
  updateSubject: (id: string, updatedData: Partial<Subject>) => Promise<void>;
  deleteSubject: (id: string) => Promise<void>;
  reset: () => void;
}

// Create the Zustand Store
export const useSubjectStore = create<SubjectState>()(
  devtools(
    persist(
      (set, get) => ({
        subjects: [],
        loading: false,
        error: null,

        // Fetch Subjects from API
        fetchSubjects: async () => {
          set({ loading: true, error: null });
          try {
            const data = await httpService.get<Subject[]>("");
            set({ subjects: data, loading: false });
          } catch (err: any) {
            set({
              error: err.message || "Failed to fetch Subjects",
              loading: false,
            });
          }
        },

        // Add new Subject
        addSubject: async (Subject) => {
          try {
            const newSubject = await httpService.post<Subject>("", Subject);
            set((state) => ({ subjects: [...state.subjects, newSubject] }));
          } catch (err: any) {
            set({ error: err.message || "Failed to add Subject" });
          }
        },

        // Update existing Subject
        updateSubject: async (id, updatedData) => {
          try {
            await httpService.put<Subject>(id, updatedData);
            set((state) => ({
             subjects: state.subjects.map((s) =>
                s._id === id ? { ...s, ...updatedData } : s
              ),
            }));
          } catch (err: any) {
            set({ error: err.message || "Failed to update Subject" });
          }
        },

        // Delete Subject
        deleteSubject: async (id) => {
          try {
            await httpService.delete(id);
            set((state) => ({
             subjects: state.subjects.filter((s) => s._id !== id),
            }));
          } catch (err: any) {
            set({ error: err.message || "Failed to delete Subject" });
          }
        },

        // Reset store
        reset: () => set({ subjects: [], loading: false, error: null }),
      }),
      { name: "subject-store" }
    )
  )
);
