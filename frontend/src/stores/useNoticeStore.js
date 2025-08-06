import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useNoticeStore = create((set) => ({
  circulars: [],
  allCirculars: [],
  isLoadingCirculars: false,
  isLoadingCircularDetails: false,

  getCirculars: async () => {
    set({ isLoadingCirculars: true });
    try {
      const res = await axiosInstance.get("/circulars");
      const { circular } = res.data;
      set({ circulars: circular || [] });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data.message || "failed to fetch circular");
      set({ circular: [] });
    } finally {
      set({ isLoadingCirculars: false });
    }
  },

  getCircularsDetails: async () => {
    set({ isLoadingCircularDetails: true });
    try {
      const res = await axiosInstance.get("/circulars-detail");
      const { circulars } = res.data;
      set({ allCirculars: circulars || [] });
    } catch (error) {
      set({ allCirculars: [] });
      console.log(error);
      toast.error(
        error?.response?.data.message || "failed to fetch circular deails"
      );
    } finally {
      set({ isLoadingCircularDetails: false });
    }
  },
}));
