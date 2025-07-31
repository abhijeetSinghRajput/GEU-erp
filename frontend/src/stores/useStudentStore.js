import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

export const useStudentStore = create((set, get) => ({
  student: null,
  isFetchingProfile: false,

  fetchProfile: async () => {
    set({ isFetchingProfile: true });
    try {
      const res = await axiosInstance.get("/");
      set({student: res.data});
    } catch (error) {
      console.log(error);
    } finally {
      set({ isFetchingProfile: false });
    }
  },
}));
