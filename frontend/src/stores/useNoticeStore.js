import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useNoticeStore = create((set, get) => ({
  circulars: [],
  allCirculars: [],
  isLoadingCirculars: false,
  isLoadingCircularDetails: false,
  errors: {
    getCirculars: null,
    getAllCirculars: null,
  },

  getCirculars: async () => {
    set({
      isLoadingCirculars: true,
      errors: { ...get().errors, getCirculars: null },
    });
    try {
      const res = await axiosInstance.get("/circular");
      const { circular } = res.data;
      set({ circulars: circular || [] });
    } catch (error) {
      const message = error?.response?.data.message || "failed to fetch circular";
      // console.log(message, error);
      toast.error(message);
      set({
        circular: [],
        errors: { ...get().errors, getAllCirculars: message },
      });
    } finally {
      set({ isLoadingCirculars: false });
    }
  },

  getAllCirculars: async () => {
    set({
      isLoadingCircularDetails: true,
      errors: { ...get().errors, getAllCirculars: null },
    });
    try {
      const res = await axiosInstance.get("/circular/circulars-detail");
      const { circulars } = res.data;
      set({ allCirculars: circulars || [] });
    } catch (error) {
      const message =
        error?.response?.data.message ||
        "Something went wrong while fetching all notifications";
      // console.log(message, error);
      toast.error(message);
      set({
        allCirculars: [],
        errors: { ...get().errors, getAllCirculars: message },
      });
    } finally {
      set({ isLoadingCircularDetails: false });
    }
  },
}));
