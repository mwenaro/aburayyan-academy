import { create } from "zustand";
import { persist } from "zustand/middleware";
import { devtools } from "zustand/middleware";
import { HttpService } from "../HttpService";
import { ResponseData } from "@/contollers/fetchService";

// Initialize HttpService
const httpService = new HttpService("/api/v1/class");
// const httpService = new HttpService("https://aburayyanacademy.com/api/v1/Class");

// Define the Class Type
interface Class {
  _id: string;
  name: string;
  
}

// Zustand Store Interface
interface ClassState {
  classes: Class[];
  loading: boolean;
  total:number
  error: string | null;

  fetchClasses: () => Promise<void>;
  addClass: (Class: Class) => Promise<void>;
  updateClass: (id: string, updatedData: Partial<Class>) => Promise<void>;
  deleteClass: (id: string) => Promise<void>;
  reset: () => void;
}

// Create the Zustand Store
export const useClassStore = create<ClassState>()(
  devtools(
    persist(
      (set, get) => ({
       classes: [],
       total:0,
        loading: false,
        error: null,

        // Fetch Classs from API
        fetchClasses: async () => {
          set({ loading: true, error: null });
          try {
            const { data , meta:{total}} = await httpService.get<ResponseData>("");
            set({ classes: data, loading: false, total });
          } catch (err: any) {
            set({
              error: err.message || "Failed to fetch Classs",
              loading: false,
            });
          }
        },

        // Add new Class
        addClass: async (clas) => {
          try {
            const newClass = await httpService.post<Class>("", clas);
            set((state) => ({ classes: [...state.classes, newClass] }));
          } catch (err: any) {
            set({ error: err.message || "Failed to add Class" });
          }
        },

        // Update existing Class
        updateClass: async (id, updatedData) => {
          try {
            await httpService.put<Class>(id, updatedData);
            set((state) => ({
              classes: state.classes.map((s) =>
                s._id === id ? { ...s, ...updatedData } : s
              ),
            }));
          } catch (err: any) {
            set({ error: err.message || "Failed to update Class" });
          }
        },

        // Delete Class
        deleteClass: async (id) => {
          try {
            await httpService.delete(id);
            set((state) => ({
              classes: state.classes.filter((s) => s._id !== id),
            }));
          } catch (err: any) {
            set({ error: err.message || "Failed to delete Class" });
          }
        },

        // Reset store
        reset: () => set({classes: [], loading: false, error: null }),
      }),
      { name: "class-store" }
    )
  )
);
