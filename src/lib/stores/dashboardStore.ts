import { create } from "zustand";
import { persist } from "zustand/middleware";
import { devtools } from "zustand/middleware";
import { HttpService } from "../HttpService";

// Dashboard stats type
export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalSubjects: number;
  totalClasses: number;
  totalExams: number;
  totalUsers: number;
  // Add more fields as needed for your dashboard
}

interface DashboardState {
  stats: DashboardStats | null;
  loading: boolean;
  error: string | null;
  fetchDashboardStats: () => Promise<void>;
  reset: () => void;
}

const httpService = new HttpService("/api/v1/dashboard");

export const useDashboardStore = create<DashboardState>()(
  devtools(
    persist(
      (set) => ({
        stats: null,
        loading: false,
        error: null,
        fetchDashboardStats: async () => {
          set({ loading: true, error: null });
          try {
            const data = await httpService.get<DashboardStats>("");
            set({ stats: data, loading: false });
          } catch (err: any) {
            set({ error: err.message || "Failed to fetch dashboard stats", loading: false });
          }
        },
        reset: () => set({ stats: null, loading: false, error: null }),
      }),
      { name: "dashboard-store" }
    )
  )
);
