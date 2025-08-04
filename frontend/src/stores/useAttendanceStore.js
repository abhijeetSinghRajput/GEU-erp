import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useAttendanceStore = create((set, get) => ({
  attendance: null,
  subjectAttendanceCache: {}, // New cache object
  isLoadingSubjects: false,
  isLoadingSubjectDetails: false,

  getAllAttendanceSubjects: async ({ RegID }) => {
    console.log("all subject attendance fetching...");
    set({ isLoadingSubjects: true });
    try {
      const res = await axiosInstance.get("/attendance", {
        params: { RegID }
      });
      set({ attendance: res.data });
    } catch (error) {
      set({ attendance: null });
      toast.error(error.message);
      console.log(error);
    } finally {
      set({ isLoadingSubjects: false });
    }
  },

  getAttendanceBySubject: async (SubjectID, data) => {
    set({ isLoadingSubjectDetails: true });
    
    try {
      // Check cache first
      const { subjectAttendanceCache } = get();
      const cacheKey = `${SubjectID}-${data.DateFrom}-${data.DateTo}`;
      
      if (subjectAttendanceCache[cacheKey]) {
        return subjectAttendanceCache[cacheKey];
      }

      // Not in cache, fetch from API
      const res = await axiosInstance.post(`/attendance/${SubjectID}`, data);
      
      // Update cache
      set((state) => ({
        subjectAttendanceCache: {
          ...state.subjectAttendanceCache,
          [cacheKey]: res.data
        }
      }));

      return res.data;
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
      return null;
    } finally {
      set({ isLoadingSubjectDetails: false });
    }
  },

  // Clear cache for a specific subject or all
  clearSubjectCache: (subjectId = null) => {
    if (subjectId) {
      set((state) => {
        const newCache = { ...state.subjectAttendanceCache };
        Object.keys(newCache).forEach(key => {
          if (key.startsWith(`${subjectId}-`)) {
            delete newCache[key];
          }
        });
        return { subjectAttendanceCache: newCache };
      });
    } else {
      set({ subjectAttendanceCache: {} });
    }
  }
}));